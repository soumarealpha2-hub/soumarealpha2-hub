import {QUESTIONS,validAnswer,careerScope,type CareerScope,type Answers} from './assessment';
export const ACADEMY_KEY='tradeops.academy.v2';
export type SavedAssessment={date:string;answers:Answers;scope?:CareerScope};
export type LessonState={step:number;input:string;numericPassed:boolean;choice:number|null;completed:boolean;attempts:number;firstCorrect:boolean};
export type TrialState={step:number;choices:Record<string,number>;completed:boolean;note:string};
export type AcademyProgress={version:2;saveQuiz:boolean;answers:Answers;quizIndex:number;quizStarted:boolean;quizComplete:boolean;history:SavedAssessment[];lessons:Record<string,LessonState>;trials:Record<string,TrialState>;path:string[];explored:string[];labs:Record<string,unknown>;gamification:boolean;onboarding:'new'|'done'};
export const emptyLesson=():LessonState=>({step:0,input:'',numericPassed:false,choice:null,completed:false,attempts:0,firstCorrect:true});
export const emptyTrial=():TrialState=>({step:0,choices:{},completed:false,note:''});
export const emptyProgress=():AcademyProgress=>({version:2,saveQuiz:false,answers:{},quizIndex:0,quizStarted:false,quizComplete:false,history:[],lessons:{},trials:{},path:[],explored:[],labs:{},gamification:false,onboarding:'new'});
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const number=(x:unknown,max:number)=>typeof x==='number'&&Number.isFinite(x)?Math.min(max,Math.max(0,Math.floor(x))):0;
export function cleanAnswers(value:unknown):Answers{if(!record(value))return {};return Object.fromEntries(QUESTIONS.map(q=>[q.id,validAnswer(q,value[q.id])]));}
export function parseProgress(raw:string|null):AcademyProgress{
 const out=emptyProgress();if(!raw)return out;
 try{const p:unknown=JSON.parse(raw);if(!record(p)||p.version!==2)return out;
  out.saveQuiz=p.saveQuiz===true;out.answers=cleanAnswers(p.answers);out.quizIndex=number(p.quizIndex,QUESTIONS.length-1);out.quizStarted=p.quizStarted===true;out.quizComplete=p.quizComplete===true;out.onboarding=p.onboarding==='done'?'done':'new';out.gamification=p.gamification===true;
  out.path=Array.isArray(p.path)?[...new Set(p.path.filter((x):x is string=>typeof x==='string'&&x.length<100))].slice(0,200):[];
  out.explored=Array.isArray(p.explored)?[...new Set(p.explored.filter((x):x is string=>typeof x==='string'&&x.length<100))].slice(0,200):[];
  if(Array.isArray(p.history))out.history=p.history.filter(record).filter(h=>typeof h.date==='string'&&!Number.isNaN(Date.parse(h.date))).slice(-5).map(h=>({date:String(h.date),answers:cleanAnswers(h.answers),scope:careerScope(h.scope)}));
  if(record(p.lessons))for(const [id,l] of Object.entries(p.lessons).slice(0,200)){if(!record(l))continue;out.lessons[id]={step:number(l.step,3),input:typeof l.input==='string'?l.input.slice(0,30):'',numericPassed:l.numericPassed===true,choice:typeof l.choice==='number'?number(l.choice,10):null,completed:l.completed===true,attempts:number(l.attempts,999),firstCorrect:l.firstCorrect===true};}
  if(record(p.trials))for(const [id,t] of Object.entries(p.trials).slice(0,200)){if(!record(t))continue;out.trials[id]={step:number(t.step,3),choices:record(t.choices)?Object.fromEntries(Object.entries(t.choices).filter(([,v])=>typeof v==='number'&&v>=0&&v<10)): {},completed:t.completed===true,note:typeof t.note==='string'?t.note.slice(0,3000):''} as TrialState;}
  if(record(p.labs))out.labs=p.labs;
  return out;
 }catch{return out;}
}
export function serializeProgress(p:AcademyProgress){return JSON.stringify(p.saveQuiz?p:{...p,answers:{},quizIndex:0,quizStarted:false,quizComplete:false,history:[]});}
