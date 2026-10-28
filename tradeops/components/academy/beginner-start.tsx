'use client';
import {useState} from 'react';
import {useAcademy,useLab} from './use-academy';
import {PageTitle,LinkButton,go} from './common';
import {LESSONS as OPERATIONS,emptyPractice,type PracticeState} from '@/lib/learning';
import {PracticeLab} from '@/components/learning/practice-lab';
import {TermExplain} from './term-explain';
import {CAREERS} from '@/lib/academy/careers';
import {record} from '@/lib/academy/learning-hub';
import {DeskChallenge} from './desk-challenge';

const questions=[
 {key:'interest',title:'What would you like to explore?',options:['How money and trades move','How a business earns and spends money','How data helps people decide','How consultants solve client problems','I’m not sure yet']},
 {key:'goal',title:'What would make this useful for you?',options:['Understand the basics','Explore a possible career','Try tasks for an internship or job','I’m not sure yet']},
 {key:'experience',title:'Where are you starting?',options:['I’m completely new','I know a few terms','I have studied or tried this work']}
] as const;
const defaults={interest:'',goal:'',experience:'',step:0,done:false};
export function BeginnerStart({id}:{id?:string}){
 const {update}=useAcademy();
 const [p,set]=useLab('onboarding-profile',defaults,v=>{const x=record(v);return {...defaults,...Object.fromEntries(questions.map(q=>[q.key,q.options.some(o=>o===x[q.key])?x[q.key]:''])),step:typeof x.step==='number'?Math.max(0,Math.min(2,Math.floor(x.step))):0,done:x.done===true};});
 if(id==='task')return <FirstTask/>;
 if(id==='desk')return <DeskChallenge/>;
 const consulting=p.interest===questions[0].options[3];
 const consultingCase=`day/${CAREERS.find(c=>c.title==='Strategy & management consulting')!.id}`;
 const wantsPractice=p.goal===questions[1].options[2]&&p.experience!==questions[2].options[0];
 const recommendation=p.interest===questions[0].options[1]
  ? {title:'Understand how businesses use money.',why:'Accounting teaches you what a company earns, spends, owns, and owes.',path:wantsPractice?'simulations/accounting':'learn/accounting',action:wantsPractice?'Try an accounting workspace':'Begin an accounting lesson',related:'learn/accounting'}
  :p.interest===questions[0].options[2]
  ? {title:'Explore what data can tell you.',why:'Start with the questions analysts ask before trusting numbers or models.',path:wantsPractice?'simulations/quant':'learn/quant',action:wantsPractice?'Try a data workspace':'Begin a data lesson',related:'learn/quant'}
  :consulting
  ? {title:'Try solving a client problem.',why:'Consultants use evidence to understand a challenge and recommend a next step.',path:consultingCase,action:'Try your first client case',related:'careers/consulting'}
  : {title:'Start with one small trade.',why:'A trade is a simple introduction to money, records, and checking your work.',path:wantsPractice?'start/desk':'start/task',action:wantsPractice?'Try the operations desk':'Start your first trade',related:'learn/operations'};
 const finish=()=>{set({...p,done:true});update(s=>({...s,onboarding:'done'}));};
 if(p.done)return <div className="ac-start-layout"><section><PageTitle eyebrow="Your recommended starting point" title={recommendation.title}>{recommendation.why}</PageTitle><p className="ac-note"><strong>Why this fits:</strong> You chose “{p.interest}” and “{p.goal}.” {p.experience===questions[2].options[0]?'We recommend a beginner explanation before a bigger workspace.':'You can use the explanations or go straight to practice.'} This is a starting suggestion, not a career judgment.</p><div className="ac-actions"><LinkButton to={recommendation.path}>{recommendation.action}</LinkButton><LinkButton to={recommendation.related} secondary>Explore the learning path</LinkButton></div><button className="ac-link" onClick={()=>set({...defaults})}>Change my answers</button></section><aside className="ac-start-aside"><p className="ac-eyebrow">Your first three steps</p><ol className="ac-simple-list"><li>Understand a concept in everyday language.</li><li>See an example with realistic, fictional data.</li><li>Make a decision and learn from the feedback.</li></ol><p>You can change subjects whenever you like. Your progress stays on this device.</p><a className="ac-text-link" href="#quiz">Explore the optional career quiz →</a></aside></div>;
 const q=questions[p.step];
 return <div className="ac-start-layout"><section><PageTitle eyebrow={`Start here · ${p.step+1} of 3`} title={q.title}>Choose what fits today. There is no wrong answer, and you can change your mind later.</PageTitle><div className="fs-onboarding-progress" role="progressbar" aria-label="Onboarding progress" aria-valuemin={0} aria-valuemax={3} aria-valuenow={p.step+1}><span style={{width:`${((p.step+1)/3)*100}%`}}/></div><fieldset className="ac-answers"><legend className="sr-only">{q.title}</legend>{q.options.map(o=><label key={o} className={p[q.key]===o?'selected':''}><input type="radio" name={q.key} checked={p[q.key]===o} onChange={()=>set({...p,[q.key]:o})}/>{o}</label>)}</fieldset><div className="ac-actions">{p.step>0&&<button className="ac-button secondary" onClick={()=>set({...p,step:p.step-1})}>Back</button>}<button className="ac-button" disabled={!p[q.key]} onClick={()=>p.step===2?finish():set({...p,step:p.step+1})}>{p.step===2?'Show my starting point':'Continue'}</button><button className="ac-link" onClick={()=>{update(s=>({...s,onboarding:'done'}));go('start/task');}}>Skip onboarding</button></div></section><aside className="ac-start-aside"><p className="ac-eyebrow">A place to begin</p><h2>You don’t need to know the language yet.</h2><p>Finance is about how people and organizations use money. Consulting is helping an organization solve a problem.</p><p>We’ll explain the terms as you use them. These answers guide your starting point; they don’t limit which careers you can explore.</p><p className="ac-meta">No account needed. Saved in this browser. Restart from Start here at any time.</p></aside></div>;
}

export function FirstTask(){
 const lesson=OPERATIONS.find(l=>l.id==='markets')!;
 const [p,set]=useLab('first-trade',{practice:emptyPractice(),variation:0,finished:0},v=>{const x=record(v),a=record(x.practice);return {practice:{stage:typeof a.stage==='number'?Math.min(2,Math.max(0,a.stage)):0,input:typeof a.input==='string'?a.input.slice(0,30):'',checks:[]} as PracticeState,variation:typeof x.variation==='number'?Math.max(0,Math.floor(x.variation)):0,finished:typeof x.finished==='number'?Math.max(0,Math.floor(x.finished)):0};});
 const [showGuide,setShowGuide]=useState(false);const done=p.practice.stage>=lesson.exercise.stages;
 return <div className="ac-lesson-reader"><a className="ac-back" href="#start">← Your starting point</a><PageTitle eyebrow="Beginner · fictional training data" title="Your first trade.">A buyer purchases shares. Work out the cost, then choose what to check before the exchange.</PageTitle><div className="ac-first-explanation"><h2>One idea before you begin</h2><p>A share represents a small ownership stake in a company. A trade is a purchase or sale, such as buying 10 shares at $5 each.</p><p>That purchase costs 10 shares × $5 per share = $50. The × symbol means multiply. The result is the purchase amount, not a profit.</p><p><strong>Why it matters:</strong> the buyer needs enough money, and both sides need the same details in their records.</p><TermExplain term="Trade"/><TermExplain term="Trade settlement"/></div><button className="ac-text-link" onClick={()=>setShowGuide(!showGuide)}>{showGuide?'Hide the quick guide':'Show me where to begin'}</button>{showGuide&&!done&&<p className="ac-inline-coach" role="status">{p.practice.stage===0?'Use the Shares and Price per share fields in the ticket below. Type their product into the answer field and select Check answer.':'Choose the action below that checks the recorded purchase.'}</p>}<PracticeLab key={p.variation} lesson={lesson} state={p.practice} onChange={practice=>set({...p,practice,finished:practice.stage===lesson.exercise.stages?p.finished+1:p.finished})} variation={p.variation} independent={p.variation>0}/>{done&&<section className="ac-section"><h2>You practiced a real workplace decision.</h2><p>Your practice is saved. Next, learn how the buyer’s money and seller’s shares are exchanged.</p><div className="ac-actions"><LinkButton to="start/desk">Try the operations desk challenge</LinkButton><LinkButton to="learn/operations-lifecycle" secondary>Learn how a trade settles</LinkButton><button className="ac-button secondary" onClick={()=>set({...p,practice:emptyPractice(),variation:p.variation+1})}>Try a different ticket</button></div><LinkButton to="careers" secondary>Explore related careers</LinkButton></section>}</div>;
}
