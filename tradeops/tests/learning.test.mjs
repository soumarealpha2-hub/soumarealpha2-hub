import test from 'node:test';
import assert from 'node:assert/strict';
import { CONCEPTS, LESSONS, canComplete, completeLesson, emptyLesson, emptyProgress, feedbackFor, parseProgress, quizScore, recommendLesson, recordAnswer } from '../lib/learning.ts';

const answered=(lesson,lp=emptyLesson())=>lesson.questions.reduce((p,q)=>recordAnswer(lesson,p,q.id,q.answer),lp);
const finished=lesson=>completeLesson(lesson,answered(lesson,{...emptyLesson(),practice:{stage:lesson.exercise.stages,input:'',checks:[]}}));

test('a badge requires both the completed exercise and understood quiz answers',()=>{
  for(const lesson of LESSONS){
    const blank=emptyLesson();
    assert.equal(canComplete(lesson,blank),false);
    assert.strictEqual(completeLesson(lesson,blank),blank);
    const onlyQuiz=answered(lesson);
    assert.equal(canComplete(lesson,onlyQuiz),false);
    assert.equal(completeLesson(lesson,onlyQuiz).completed,false);
    const onlyCase={...blank,practice:{...blank.practice,stage:lesson.exercise.stages}};
    assert.equal(canComplete(lesson,onlyCase),false);
    const lp=finished(lesson);
    assert.equal(lp.completed,true);
    assert.equal(lp.section,3);
    assert.equal(lp.bestScore,100);
  }
});

test('correction teaches the answer without inflating first-attempt performance',()=>{
  const lesson=LESSONS[0],question=lesson.questions[0];
  let lp={...emptyLesson(),practice:{stage:lesson.exercise.stages,input:'',checks:[]}};
  lp=recordAnswer(lesson,lp,question.id,(question.answer+1)%question.choices.length);
  assert.equal(lp.answers[question.id].correct,false);
  lp=recordAnswer(lesson,lp,question.id,question.answer);
  assert.equal(lp.answers[question.id].attempts,2);
  assert.equal(lp.answers[question.id].correct,true);
  assert.equal(lp.answers[question.id].firstCorrect,false);
  for(const q of lesson.questions.slice(1))lp=recordAnswer(lesson,lp,q.id,q.answer);
  lp=completeLesson(lesson,lp);
  assert.equal(quizScore(lesson,lp),67);
  assert.equal(lp.lastScore,67);
  assert.deepEqual(feedbackFor(lesson,lp).improve,[question.skill]);
  assert.ok(feedbackFor(lesson,lp).strengths.includes(lesson.questions[1].skill));
  assert.strictEqual(recordAnswer(lesson,lp,question.id,0),lp);
  assert.strictEqual(recordAnswer(lesson,lp,'unknown',0),lp);
  assert.strictEqual(recordAnswer(lesson,lp,lesson.questions[1].id,99),lp);
});

test('retaking preserves the earned badge and best score through save and reload',()=>{
  const lesson=LESSONS[2];
  const old=finished(lesson);
  const retaking={...old,section:2,answers:{}};
  const progress={...emptyProgress(),lastLesson:lesson.id,lessons:{[lesson.id]:retaking}};
  const restored=parseProgress(JSON.stringify(progress));
  assert.equal(restored.lessons[lesson.id].completed,true);
  assert.equal(restored.lessons[lesson.id].bestScore,100);
  assert.equal(canComplete(lesson,restored.lessons[lesson.id]),false);
  const question=lesson.questions[0];
  let lp=recordAnswer(lesson,retaking,question.id,(question.answer+1)%3);
  lp=completeLesson(lesson,answered(lesson,lp));
  assert.equal(lp.lastScore,67);
  assert.equal(lp.bestScore,100);
});

test('a partial case, input, and quiz checkpoint survive reload independently',()=>{
  const lesson=LESSONS[1],blank=emptyLesson();
  const progress={...emptyProgress(),level:'intermediate',tour:{status:'skipped',step:2},lastLesson:lesson.id,lessons:{[lesson.id]:{...blank,section:1,practice:{stage:1,input:'20',checks:['cash']}}}};
  assert.deepEqual(parseProgress(JSON.stringify(progress)),progress);
  assert.equal(parseProgress(null).tour.status,'new');
});

test('malformed and out-of-date saved progress recover; invalid checkpoints are bounded',()=>{
  for(const raw of ['', '{', 'null', '[]', JSON.stringify({version:2}), 'x'.repeat(80001)])assert.deepEqual(parseProgress(raw),emptyProgress());
  const lesson=LESSONS[0],question=lesson.questions[0];
  const raw={version:1,level:'expert',tour:{status:'unknown',step:999},lastLesson:'absent',lessons:{absent:finished(lesson),[lesson.id]:{section:99,completed:true,bestScore:'100',lastScore:-20,practice:{stage:-10,input:123,checks:['cash','malicious']},answers:{[question.id]:{choice:question.answer,correct:false,firstCorrect:true,attempts:-5},fake:{choice:0}}}}};
  const restored=parseProgress(JSON.stringify(raw));
  assert.equal(restored.level,'beginner');
  assert.equal(restored.tour.status,'new');
  assert.equal(restored.tour.step,5);
  assert.equal(restored.lastLesson,null);
  assert.equal(restored.lessons.absent,undefined);
  const lp=restored.lessons[lesson.id];
  assert.equal(lp.practice.stage,0);
  assert.equal(lp.section,1);
  assert.equal(lp.completed,false);
  assert.equal(lp.bestScore,null);
  assert.equal(lp.lastScore,0);
  assert.deepEqual(lp.practice.checks,['cash']);
  assert.equal(lp.answers[question.id].correct,true);
  assert.equal(lp.answers[question.id].attempts,1);
  assert.equal(lp.answers.fake,undefined);
});

test('recommendations use experience, unfinished work, and observed quiz performance',()=>{
  const progress={...emptyProgress(),level:'advanced'};
  assert.equal(recommendLesson(progress).lesson.id,'controls');
  progress.lastLesson='reconciliation';progress.lessons.reconciliation=emptyLesson();
  assert.equal(recommendLesson(progress).lesson.id,'reconciliation');
  const lesson=LESSONS[0];let weak={...emptyLesson(),practice:{stage:lesson.exercise.stages,input:'',checks:[]}};
  for(const q of lesson.questions)weak=recordAnswer(lesson,weak,q.id,(q.answer+1)%3);
  weak=completeLesson(lesson,answered(lesson,weak));
  progress.lessons.reconciliation=finished(LESSONS[4]);progress.lessons.markets=weak;
  assert.equal(recommendLesson(progress).lesson.id,'markets');
  assert.match(recommendLesson(progress).reason,/0%/);
  for(const lesson of LESSONS)progress.lessons[lesson.id]=finished(lesson);
  assert.match(recommendLesson(progress).reason,/independent case/);
});

test('every tutorial provides a real scenario and feedback for every quiz choice',()=>{
  assert.equal(LESSONS.length,8);
  assert.equal(new Set(LESSONS.map(l=>l.exercise.kind)).size,8);
  const terms=new Set(CONCEPTS.map(c=>c.id));
  for(const lesson of LESSONS){
    assert.equal(lesson.questions.length,3);
    assert.ok(lesson.exercise.stages>=2);
    assert.equal(new Set(lesson.questions.map(q=>q.id)).size,lesson.questions.length);
    for(const term of lesson.terms)assert.ok(terms.has(term));
    for(const question of lesson.questions){
      assert.equal(question.choices.length,question.explanations.length);
      assert.ok(question.answer>=0 && question.answer<question.choices.length);
      for(const explanation of question.explanations)assert.ok(explanation.length>15);
      assert.ok(question.hint.length>15);
    }
  }
  for(const concept of CONCEPTS)for(const related of concept.related)assert.ok(terms.has(related));
});
