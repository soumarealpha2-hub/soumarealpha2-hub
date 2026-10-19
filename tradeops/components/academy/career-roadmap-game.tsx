'use client';
import {useState} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {Check,Lock,Flag,ArrowRight} from 'lucide-react';
import {CAREERS,TRACKS} from '@/lib/academy/careers';
import {useLab} from './use-academy';

const categories=[...new Set(CAREERS.map(c=>c.category))];
const stops=['Discovery Plaza','Career Studio','Skills Library','Practice Lab','Goal Tower'];
const missions=['Follow your curiosity','Choose a direction','Learn one useful idea','Make your first call','Set your next milestone'];
type Journey={category:string;career:string;done:number;goal:string};
const initial:Journey={category:'',career:'',done:0,goal:''};
function validate(value:unknown):Journey{
 const p=(value&&typeof value==='object'?value:{}) as Partial<Journey>;
 const career=CAREERS.find(c=>c.id===p.career&&c.category===p.category);
 const category=categories.includes(p.category??'')?p.category!:'';
 return {category,career:career?.id??'',done:Math.min(category?(career?5:1):0,typeof p.done==='number'&&Number.isFinite(p.done)?Math.max(0,Math.floor(p.done)):0),goal:typeof p.goal==='string'?p.goal.slice(0,180):''};
}
const challenges={
 operations:{concept:'Reconciliation means comparing records and investigating differences before you proceed.',question:'The agreement says 100 shares. The booking says 120. What comes first?',choices:['Approve the larger number','Check the agreement and investigate'],answer:1,feedback:'Use the original evidence to resolve the 20-share difference before proceeding.'},
 banking:{concept:'Operating profit is revenue minus operating costs in this simplified example.',question:'A business earns $120 and spends $90 on operations. What is left?',choices:['$30 of operating profit','$120 of operating profit'],answer:0,feedback:'$120 − $90 = $30. Revenue and profit measure different things.'},
 quant:{concept:'A fair model test uses data that was not used to build or tune the model.',question:'Your model looks great on its training data. What should you do next?',choices:['Promise the same future returns','Test it on separate, unseen data'],answer:1,feedback:'Unseen data helps test whether a model generalizes. No test guarantees future returns.'},
 accounting:{concept:'Profit and cash are different. A recorded sale may not have been paid yet.',question:'A customer owes $500 for work already delivered. What is the unpaid amount?',choices:['A receivable','Cash already in the bank'],answer:0,feedback:'A receivable is money owed to the business. It becomes cash when collected.'},
 consulting:{concept:'A useful recommendation starts with evidence about the problem, then tests a possible improvement.',question:'Orders wait four days for pickup but only one day in transit. Where do you investigate?',choices:['The pickup handoff','The delivery vehicle’s color'],answer:0,feedback:'The pickup delay is the larger bottleneck. Investigate its cause before recommending a change.'}
};
function Building({index,complete}:{index:number;complete:boolean}){
 const heights=[48,70,55,62,90];const h=heights[index];
 return <svg viewBox="0 0 140 125" className="fs-city-building" aria-hidden="true"><ellipse cx="70" cy="112" rx="52" ry="10" fill="#dce8f5"/><path d={`M37 ${108-h} L83 ${98-h} L108 ${111-h} L62 ${121-h} Z`} fill={complete?'#a6c6ff':'#d3e2f4'}/><path d={`M37 ${108-h} L62 ${121-h} V112 L37 99 Z`} fill="#8eadd4"/><path d={`M62 ${121-h} L108 ${111-h} V102 L62 112 Z`} fill={complete?'#2563eb':'#416c9d'}/>{[0,1,2].map(row=><g key={row}>{[0,1,2].map(col=><rect key={col} x={70+col*11} y={124-h+row*13} width="6" height="7" rx="1" fill={complete?'#e7f1ff':'#bcd6f5'} transform="skewY(-10) translate(0 13)"/>)}</g>)}<path d="M78 109 V95 L90 92 V106" fill="#163857"/>{index===4&&<><path d="M83 8 V-2" stroke="#225de0" strokeWidth="2"/><path d="M84 0 H107 L101 6 H84Z" fill="#225de0"/></>}<circle cx="23" cy="93" r="10" fill="#c4d8e9"/><path d="M23 96V109" stroke="#6c8ba9" strokeWidth="3"/></svg>;
}
export function CareerRoadmapGame(){
 const [journey,setJourney]=useLab('career-city-v1',initial,validate);
 const [selected,setSelected]=useState<number|null>(null),[choice,setChoice]=useState<number|null>(null);
 const reduced=useReducedMotion();const step=selected??Math.min(journey.done,4);
 const career=CAREERS.find(c=>c.id===journey.career);const track=TRACKS.find(t=>t.id===career?.track);
 const challenge=challenges[career?.consulting?'consulting':career?.track??'operations'];
 const finished=journey.done===5;const passed=choice===challenge.answer;
 const visit=(i:number)=>{setSelected(i);setChoice(null);};
 const advance=()=>{setJourney({...journey,done:Math.max(journey.done,step+1)});setSelected(Math.min(step+1,4));setChoice(null);};
 return <section className="fs-career-city" aria-labelledby="career-city-title">
  <header className="fs-city-header"><div><p className="ac-eyebrow">Your career, one stop at a time</p><h2 id="career-city-title">Build your route to a first seat.</h2><p>Explore the city with your First Seat character. Find a niche worth trying, then choose your next move.</p></div><span className="fs-city-progress"><Flag size={16}/>{journey.done}/5 milestones</span></header>
  <div className="fs-city-map" aria-label="Career roadmap buildings">
   <div className="fs-city-sky" aria-hidden="true">FIRST SEAT CITY <span>Curiosity → clarity</span></div>
   <div className="fs-city-stops">{stops.map((name,i)=>{const complete=journey.done>i,locked=i>journey.done;return <button type="button" key={name} className={`fs-city-stop ${step===i?'is-current':''} ${complete?'is-complete':''}`} disabled={locked} aria-label={`${name}: ${complete?'complete':locked?'locked': 'ready to explore'}`} aria-current={step===i?'step':undefined} onClick={()=>visit(i)}>
    <span className="fs-city-stepno">{complete?<Check size={13}/>:locked?<Lock size={12}/>:String(i+1).padStart(2,'0')}</span><Building index={i} complete={complete}/>
    {step===i&&<motion.span layoutId="first-seat-city-character" className="fs-city-character" transition={{duration:reduced?0:.35}}><img src="/first-seat-logo.svg" alt="Your First Seat character" width="32" height="32"/><span aria-hidden="true" className="fs-city-character-shadow"/></motion.span>}
    <strong>{name}</strong><small>{complete?'Milestone complete':missions[i]}</small>
   </button>;})}</div>
  </div>
  <div className="fs-city-mission" aria-live="polite">
   <div className="fs-city-guide"><img src="/first-seat-logo.svg" alt="" width="44" height="44"/><div><small>{finished&&step===4?'Route unlocked':`Stop ${step+1} · ${stops[step]}`}</small><h3>{finished&&step===4?'You have a direction. Make it real.':missions[step]}</h3></div></div>
   {step===0&&<><p>Which part of finance or consulting makes you curious? You can explore every career here—this is a starting point, not a permanent choice.</p><label className="ac-field"><span>Choose an area to explore</span><select value={journey.category} onChange={e=>setJourney({...initial,category:e.target.value})}><option value="">Select your area</option>{categories.map(c=><option key={c}>{c}</option>)}</select></label><button className="ac-button" disabled={!journey.category} onClick={advance}>Visit Career Studio <ArrowRight size={16}/></button><a className="fs-city-help" href="#quiz">Not sure? Take the career discovery quiz</a></>}
   {step===1&&<><p>Pick one role to investigate. Your niche can change as you learn what the work actually feels like.</p><label className="ac-field"><span>Your career to explore</span><select value={journey.career} onChange={e=>{setJourney({...journey,career:e.target.value,done:1,goal:''});setChoice(null);}}><option value="">Choose a career</option>{CAREERS.filter(c=>c.category===journey.category).map(c=><option key={c.id} value={c.id}>{c.title}</option>)}</select></label>{career&&<div className="fs-city-brief"><strong>{career.title}</strong><p>{career.overview}</p><small>Try this kind of work: {career.task}</small><a href={`#careers/${career.id}`}>Read the career profile ↗</a></div>}<button className="ac-button" disabled={!career} onClick={advance}>Visit Skills Library <ArrowRight size={16}/></button></>}
   {step===2&&<><p className="fs-city-concept">{challenge.concept}</p><p>Keep this idea in mind. You’ll use it in the next building.</p><button className="ac-button" onClick={advance}>Try the mini challenge <ArrowRight size={16}/></button><a className="fs-city-help" href={`#learn/${career?.track??'operations'}?level=beginner`}>Explore {track?.title??'Operations'} foundation lessons ↗</a></>}
   {step===3&&<><fieldset className="fs-city-challenge"><legend>{challenge.question}</legend>{challenge.choices.map((text,i)=><button type="button" key={text} aria-pressed={choice===i} onClick={()=>setChoice(i)}>{String.fromCharCode(65+i)}<span>{text}</span>{choice===i&&passed&&<Check size={16}/>}</button>)}</fieldset>{choice!==null&&<p className="fs-city-feedback" role="status">{passed?challenge.feedback:'Take another look at the idea from the Skills Library, then try again.'}</p>}<button className="ac-button" disabled={!passed&&journey.done<4} onClick={advance}>Unlock Goal Tower <ArrowRight size={16}/></button><small className="fs-city-disclaimer">A fictional mini challenge—not a qualification or a full career assessment.</small></>}
   {step===4&&<>{finished?<div className="fs-city-award"><span aria-hidden="true">✦</span><div><strong>First Seat Explorer</strong><p>You explored {career?.title} and completed your five-stop route.</p></div></div>:<p>What will you try next to see whether {career?.title} fits you?</p>}<label className="ac-field"><span>My next career goal</span><input maxLength={180} value={journey.goal} placeholder="Example: Try this career’s work sample this week" onChange={e=>setJourney({...journey,goal:e.target.value,done:4})}/></label><button className="ac-button" disabled={journey.goal.trim().length<10} onClick={()=>setJourney({...journey,goal:journey.goal.trim(),done:5})}>{finished?'Goal saved':'Save my goal & finish'}</button>{finished&&<div className="fs-city-next"><a href={`#day/${career?.id}`}>Try my career’s work sample <ArrowRight size={16}/></a><a href={`#learn/${career?.track}?level=beginner`}>Build my foundations <ArrowRight size={16}/></a><p>Your goal: {journey.goal}</p></div>}</>}
   <footer className="fs-city-footer"><span>Game progress saved on this device · {journey.category||'All career areas welcome'}</span>{step>0&&<button type="button" onClick={()=>visit(step-1)}>← Previous stop</button>}{finished&&<button type="button" onClick={()=>visit(0)}>Explore another direction</button>}</footer>
  </div>
 </section>;
}
