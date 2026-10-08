'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, BookOpen, Check, CheckCircle2, CircleHelp, Clock3, Compass, GraduationCap, Lightbulb, Play, RotateCcw, ShieldCheck, Target, Trophy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CONCEPTS, LESSONS, SOURCES, canComplete, completeLesson, emptyLesson, emptyPractice, feedbackFor, quizScore, recommendLesson, recordAnswer, type LearningLevel, type LearningProgress, type Lesson, type LessonProgress, type PracticeState, type WorkspaceView } from '@/lib/learning';
import { PracticeLab, TradeFlow } from './practice-lab';

const PATHS:{id:LearningLevel;title:string;description:string;icon:typeof BookOpen}[]=[
  {id:'beginner',title:'Beginner',description:'Markets, terminology, and your first trade.',icon:BookOpen},
  {id:'intermediate',title:'Intermediate',description:'Matching, reconciliation, and resolving breaks.',icon:Target},
  {id:'advanced',title:'Advanced',description:'Controls, escalation, and decisions under pressure.',icon:ShieldCheck},
];
type UpdateLesson=(id:string,update:(lp:LessonProgress)=>LessonProgress)=>void;
type Props={progress:LearningProgress;onLevel:(level:LearningLevel)=>void;updateLesson:UpdateLesson;onExplain:(concept:string)=>void;onWorkspace:(view:WorkspaceView)=>void;onRestartTour:()=>void;saved:boolean};

function StatusLabel({lesson,lp}:{lesson:Lesson;lp?:LessonProgress}) {
  return <span className={`course-status ${lp?.completed?'completed':lp?'started':''}`}>{lp?.completed?<><CheckCircle2 size={13}/>Completed · {lp.bestScore}% best</>:lp?<><Play size={12}/>In progress</>:<><Clock3 size={12}/>{lesson.minutes} min</>}</span>;
}

export function LearningCenter({progress,onLevel,updateLesson,onExplain,onWorkspace,onRestartTour,saved}:Props) {
  const [activeId,setActiveId]=useState<string|null>(null);
  const [filter,setFilter]=useState<LearningLevel|'all'>(progress.level);
  const [practiceId,setPracticeId]=useState<string|null>(null);
  const [practiceTopic,setPracticeTopic]=useState('lifecycle');
  const heading=useRef<HTMLDivElement>(null);
  const active=LESSONS.find(l=>l.id===activeId);
  const practice=LESSONS.find(l=>l.id===practiceId);
  const completed=LESSONS.filter(l=>progress.lessons[l.id]?.completed);
  const scores=completed.map(l=>progress.lessons[l.id].bestScore??0);
  const average=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):null;
  const recommendation=recommendLesson(progress);
  const openLesson=(id:string)=>{updateLesson(id,lp=>lp);setActiveId(id);requestAnimationFrame(()=>{heading.current?.scrollIntoView({block:'start',behavior:'instant'});heading.current?.focus();});};
  return <div className="learning-center" ref={heading} tabIndex={-1}>
    {active?<LessonReader key={active.id} lesson={active} lp={progress.lessons[active.id]??emptyLesson()} update={fn=>updateLesson(active.id,fn)} onBack={()=>setActiveId(null)} onExplain={onExplain} onPractice={()=>setPracticeId(active.id)} onWorkspace={()=>onWorkspace(active.workspace)}/>:<>
      <section className="learning-hero" data-tour="learning-recommendation">
        <div className="learning-hero-copy"><span className="learning-kicker"><Compass size={16}/>YOUR NEXT STEP</span><h2>{recommendation.lesson.title}</h2><p>{recommendation.reason}</p><div className="learning-hero-actions"><button className="button primary" onClick={()=>openLesson(recommendation.lesson.id)}>{progress.lessons[recommendation.lesson.id]?.completed?'Review tutorial':progress.lessons[recommendation.lesson.id]?'Continue learning':'Start learning'}<ArrowRight size={16}/></button><button className="learning-hero-link" onClick={onRestartTour}><RotateCcw size={14}/>Restart Tutorial</button></div></div>
        <div className="learning-hero-visual" aria-hidden="true"><div className="hero-orbit"><GraduationCap size={43}/></div><span className="hero-tag"><CheckCircle2 size={14}/>Learn</span><span className="hero-tag"><Play size={13}/>Practice</span><span className="hero-tag"><Award size={14}/>Grow</span></div>
      </section>
      <section className="learning-stats" aria-label="Your learning progress"><div><span><BookOpen size={16}/>Tutorials completed</span><strong>{completed.length}<small> / {LESSONS.length}</small></strong><div className="learning-progress-track" role="progressbar" aria-label="Overall learning progress" aria-valuenow={Math.round(completed.length/LESSONS.length*100)} aria-valuemin={0} aria-valuemax={100}><i style={{width:`${completed.length/LESSONS.length*100}%`}}/></div></div><div><span><Target size={16}/>Average best quiz score</span><strong>{average===null?'—':`${average}%`}</strong><small>First-attempt answers within each quiz run</small></div><div><span><Trophy size={16}/>Module badges earned</span><strong>{completed.length.toString().padStart(2,'0')}</strong><small>{completed.length?'Your effort is building useful skills.':'Complete a case and quiz to earn your first.'}</small></div></section>
      <div className="learning-section-heading"><div><h2>Choose your learning path</h2><p>You can change your level anytime. Every tutorial stays available.</p></div><span className={`save-status ${saved?'':'save-unavailable'}`}><CheckCircle2 size={14}/>{saved?'Progress saved in this browser':'Progress cannot be saved in this browser'}</span></div>
      <div className="learning-paths" role="group" aria-label="Experience level">{PATHS.map(path=>{const PathIcon=path.icon;const list=LESSONS.filter(l=>l.level===path.id);const count=list.filter(l=>progress.lessons[l.id]?.completed).length;return <button key={path.id} className={`learning-path ${progress.level===path.id?'active':''}`} aria-pressed={progress.level===path.id} onClick={()=>{onLevel(path.id);setFilter(path.id);}}><span className="path-icon"><PathIcon size={21}/></span><div><strong>{path.title}{progress.level===path.id&&<CheckCircle2 size={16}/>}</strong><p>{path.description}</p><small>{count} / {list.length} complete</small></div></button>;})}</div>
      <div className="learning-section-heading course-library-heading"><div><h2>Short lessons. Real decisions.</h2><p>Read a little, work through a case, and check what you learned.</p></div><button className="text-button" onClick={()=>setFilter(filter==='all'?progress.level:'all')}>{filter==='all'?'Show my path':'View all tutorials'}<ArrowRight size={14}/></button></div>
      <div className="course-grid">{LESSONS.filter(l=>filter==='all'||l.level===filter).map((lesson,i)=>{const lp=progress.lessons[lesson.id];return <article className="panel course-card" key={lesson.id}><div className="course-card-top"><span className={`level-tag ${lesson.level}`}>{lesson.level}</span><StatusLabel lesson={lesson} lp={lp}/></div><div className="course-number">{String(LESSONS.indexOf(lesson)+1).padStart(2,'0')}<span>{['UNDERSTAND','APPLY','BUILD CONFIDENCE'][i%3]}</span></div><h3>{lesson.title}</h3><p>{lesson.summary}</p><div className="course-meta"><span><Clock3 size={14}/>{lesson.minutes} min</span><span><Target size={14}/>Case + 3 questions</span></div><div className="course-card-actions"><button className="button" onClick={()=>openLesson(lesson.id)}>{lp?.completed?'Review lesson':lp?'Resume lesson':'Start lesson'}<ArrowRight size={15}/></button>{lp?.completed&&<button className="icon-button" aria-label={`Independent practice: ${lesson.title}`} onClick={()=>setPracticeId(lesson.id)}><Play size={17}/></button>}</div></article>;})}</div>
      <div className="learning-bottom-grid"><section className="panel badges-panel"><div className="panel-head"><div><h2>Your badges</h2><p>Earned by finishing a hands-on case and quiz.</p></div><Award size={21}/></div><div className="badge-grid">{LESSONS.map(lesson=>{const earned=progress.lessons[lesson.id]?.completed;return <div key={lesson.id} className={`learning-badge ${earned?'earned':''}`}><span><Award size={22}/></span><div><strong>{lesson.badge}</strong><small>{earned?'Earned':`Complete ${lesson.title.toLowerCase()}`}</small></div>{earned&&<CheckCircle2 size={15}/>}</div>;})}</div>{PATHS.some(path=>LESSONS.filter(l=>l.level===path.id).every(l=>progress.lessons[l.id]?.completed))&&<div className="path-awards">{PATHS.filter(path=>LESSONS.filter(l=>l.level===path.id).every(l=>progress.lessons[l.id]?.completed)).map(path=><span key={path.id}><Trophy size={15}/>{path.title} path completed</span>)}</div>}</section>
        <section className="panel learning-practice-panel"><span className="practice-panel-icon"><GraduationCap size={26}/></span><h2>Build confidence on your own.</h2><p>Choose a topic and try a fresh simulated case. Use hints when you need them. Practice leaves your quiz scores and badges intact.</p><label htmlFor="practice-topic">Practice topic</label><select id="practice-topic" value={practiceTopic} onChange={e=>setPracticeTopic(e.target.value)}>{LESSONS.map(l=><option key={l.id} value={l.id}>{l.title}</option>)}</select><button className="button primary" onClick={()=>setPracticeId(practiceTopic)}><Play size={15}/>Open practice lab</button><button className="text-button" onClick={()=>onExplain('trade')}><CircleHelp size={15}/>Browse plain-language explanations</button></section></div>
      <p className="learning-footnote">Tutorials are optional. Training uses fictional trades and illustrative policies. Learning progress belongs to this browser and device.</p>
    </>}
    {practice&&<IndependentPractice lesson={practice} onClose={()=>setPracticeId(null)} onExplain={onExplain}/ >}
  </div>;
}

function LessonReader({lesson,lp,update,onBack,onExplain,onPractice,onWorkspace}:{lesson:Lesson;lp:LessonProgress;update:(fn:(lp:LessonProgress)=>LessonProgress)=>void;onBack:()=>void;onExplain:(id:string)=>void;onPractice:()=>void;onWorkspace:()=>void}) {
  const stage=lp.section;
  const practiceDone=lp.practice.stage>=lesson.exercise.stages;
  const feedback=feedbackFor(lesson,lp);
  const setSection=(section:number)=>update(p=>({...p,section}));
  const retake=()=>update(p=>({...p,section:2,answers:{}}));
  return <div className="lesson-reader">
    <button className="text-button lesson-back" onClick={onBack}><ArrowLeft size={16}/>Learning Center</button>
    <div className="lesson-title"><span className={`level-tag ${lesson.level}`}>{lesson.level}</span><h2>{lesson.title}</h2><p>{lesson.summary}</p></div>
    <nav className="lesson-step-nav" aria-label="Lesson sections">{['Learn','Hands-on case','Knowledge check','Results'].map((label,i)=><button key={label} className={stage===i?'active':''} aria-current={stage===i?'step':undefined} disabled={i===2&&!practiceDone||i===3&&(!lp.completed||!canComplete(lesson,lp))} onClick={()=>setSection(i)}><span>{i===1&&practiceDone||i===3&&lp.completed?<Check size={13}/>:i+1}</span>{label}</button>)}</nav>
    <div className="lesson-body">
      {stage===0&&<>
        <section className="panel lesson-reading"><div className="lesson-section-kicker"><BookOpen size={16}/>START WITH THE BASICS</div><h3>A few terms to know</h3><p className="muted">Tap a term for its meaning, a practical example, and what an analyst does.</p><dl className="lesson-terms">{lesson.terms.map(id=>{const concept=CONCEPTS.find(c=>c.id===id);return concept&&<div key={id}><dt><button onClick={()=>onExplain(id)}>{concept.term}<CircleHelp size={14}/></button></dt><dd>{concept.meaning}</dd></div>;})}</dl><div className="lesson-points">{lesson.points.map((point,i)=><section key={point.title}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{point.title}</h3><p>{point.text}</p></div></section>)}</div><h3 className="flow-heading">See how it fits together</h3><TradeFlow steps={lesson.flow}/>{lesson.sources.length>0&&<details className="lesson-sources"><summary>Read the source explanations</summary>{lesson.sources.map(id=>{const source=SOURCES[id as keyof typeof SOURCES];return <a key={id} className="learning-source" href={source.url} target="_blank" rel="noreferrer">{source.title}<ArrowUpRight size={14}/></a>;})}</details>}</section>
        <div className="lesson-next"><span><ShieldCheck size={15}/>Now apply it to a simulated trade.</span><button className="button primary" onClick={()=>setSection(1)}>Try the hands-on case<ArrowRight size={16}/></button></div>
      </>}
      {stage===1&&<><PracticeLab lesson={lesson} state={lp.practice} onChange={practice=>update(p=>({...p,practice}))}/><div className="lesson-next"><button className="text-button" onClick={()=>setSection(0)}><ArrowLeft size={15}/>Review the lesson</button><button className="button primary" disabled={!practiceDone} onClick={()=>setSection(2)}>Continue to knowledge check<ArrowRight size={16}/></button></div>{!practiceDone&&<p className="learning-footnote">Finish the case to unlock your three-question knowledge check.</p>}</>}
      {stage===2&&<LessonQuiz lesson={lesson} lp={lp} update={update}/ >}
      {stage===3&&<section className="panel lesson-result"><div className="result-badge"><Award size={39}/></div><span className="learning-kicker">MODULE COMPLETE</span><h3>You earned “{lesson.badge}”.</h3><p>You completed the case and worked through every quiz answer.</p><div className="quiz-score-grid"><div><strong>{lp.lastScore??quizScore(lesson,lp)}%</strong><span>Latest first-attempt score</span></div><div><strong>{lp.bestScore}%</strong><span>Best quiz run</span></div><div><strong>{lesson.questions.length} / {lesson.questions.length}</strong><span>Answers understood after feedback</span></div></div><div className="learning-feedback"><div><h4><CheckCircle2 size={16}/>Strengths</h4><p>{feedback.strengths.length?feedback.strengths.join(' · '):'You persisted, reviewed the feedback, and corrected each answer.'}</p></div><div><h4><Target size={16}/>Keep practicing</h4><p>{feedback.improve.length?feedback.improve.join(' · '):'Try an independent case to apply these skills to a fresh situation.'}</p></div></div><div className="result-actions"><button className="button primary" onClick={onPractice}><Play size={15}/>Practice independently</button><button className="button" onClick={retake}><RotateCcw size={15}/>Retake quiz</button><button className="text-button" onClick={onWorkspace}>Explore this in the workspace<ArrowUpRight size={15}/></button></div><p className="learning-footnote">A corrected answer completes learning; your score remembers which answers were right on their first attempt. Retaking can improve your best score.</p></section>}
    </div>
  </div>;
}

function LessonQuiz({lesson,lp,update}:{lesson:Lesson;lp:LessonProgress;update:(fn:(lp:LessonProgress)=>LessonProgress)=>void}) {
  const firstUnanswered=lesson.questions.findIndex(q=>!lp.answers[q.id]?.correct);
  const [index,setIndex]=useState(firstUnanswered<0?0:firstUnanswered);
  const [selection,setSelection]=useState<number|null>(null);
  const [hint,setHint]=useState(false);
  const question=lesson.questions[index];
  const answer=lp.answers[question.id];
  const checked=answer && (selection===null||selection===answer.choice);
  const correct=answer?.correct===true;
  const choose=(choice:number)=>{if(!correct)setSelection(choice);};
  const next=(nextIndex:number)=>{setIndex(nextIndex);setSelection(null);setHint(false);};
  return <section className="panel lesson-quiz">
    <div className="practice-kicker"><span><Target size={15}/>KNOWLEDGE CHECK</span><span>Question {index+1} / {lesson.questions.length}</span></div><div className="quiz-progress-dots" aria-label={`${lesson.questions.filter(q=>lp.answers[q.id]?.correct).length} of ${lesson.questions.length} questions understood`}>{lesson.questions.map((q,i)=><span key={q.id} className={`${lp.answers[q.id]?.correct?'correct':''} ${i===index?'current':''}`}/>)}</div><h3>{question.prompt}</h3>
    <fieldset className="quiz-choices"><legend className="sr-only">Choose an answer</legend>{question.choices.map((choice,i)=><label key={choice} className={`${(selection??answer?.choice)===i?'selected':''} ${correct&&i===question.answer?'correct':''}`}><input type="radio" name={`quiz-${question.id}`} value={i} checked={(selection??answer?.choice)===i} disabled={correct} onChange={()=>choose(i)}/><span className="answer-letter">{String.fromCharCode(65+i)}</span><span>{choice}</span>{correct&&i===question.answer&&<CheckCircle2 size={17}/>}</label>)}</fieldset>
    {checked&&<div className={`answer-feedback ${answer.correct?'correct':'incorrect'}`} role="status"><strong>{answer.correct?'That’s right.':'Let’s work through it.'}</strong><p>{question.explanations[answer.choice]}</p>{!answer.correct&&<span>Choose another answer and try again. Your first attempt remains in this run’s score.</span>}</div>}
    <div className="hint-row"><button className="text-button" onClick={()=>setHint(h=>!h)}><Lightbulb size={15}/>{hint?'Hide hint':'Show hint'}</button><span>Your answers and progress are saved.</span></div>{hint&&<div className="practice-hint">{question.hint}</div>}
    <div className="quiz-navigation">{index>0?<button className="button" onClick={()=>next(index-1)}><ArrowLeft size={15}/>Previous question</button>:<span/>}{correct?index<lesson.questions.length-1?<button className="button primary" onClick={()=>next(index+1)}>Next question<ArrowRight size={15}/></button>:<button className="button primary" disabled={!canComplete(lesson,lp)} onClick={()=>update(p=>completeLesson(lesson,p))}>Finish tutorial<Award size={16}/></button>:<button className="button primary" disabled={selection===null} onClick={()=>{if(selection!==null){update(p=>recordAnswer(lesson,p,question.id,selection));setSelection(null);}}}>Check answer<Check size={15}/></button>}</div>
    <p className="learning-footnote">Three short questions. Incorrect answers include an explanation and can be retried.</p>
  </section>;
}

function IndependentPractice({lesson,onClose,onExplain}:{lesson:Lesson;onClose:()=>void;onExplain:(id:string)=>void}) {
  const [state,setState]=useState<PracticeState>(emptyPractice);
  const [variation,setVariation]=useState(1);
  return <Dialog open onOpenChange={open=>{if(!open)onClose();}}><DialogContent className="independent-practice-dialog"><DialogHeader><div className="eyebrow">PRACTICE LAB</div><DialogTitle>{lesson.title}</DialogTitle><DialogDescription>A fresh simulated case. Practice at your own pace without changing your saved quiz score.</DialogDescription></DialogHeader><div className="independent-practice-body"><div className="term-chips">{lesson.terms.slice(0,3).map(id=><button key={id} onClick={()=>onExplain(id)}>{CONCEPTS.find(c=>c.id===id)?.term}<CircleHelp size={13}/></button>)}</div><PracticeLab key={`${lesson.id}-${variation}`} lesson={lesson} state={state} onChange={setState} independent variation={variation}/><div className="independent-actions"><button className="button" onClick={()=>{setState(emptyPractice());setVariation(v=>v+1);}}><RotateCcw size={15}/>New case</button><button className="button primary" onClick={onClose}>Back to learning<ArrowRight size={15}/></button></div></div></DialogContent></Dialog>;
}
