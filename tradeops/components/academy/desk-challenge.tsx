'use client';
import {useState} from 'react';
import {LinkButton,PageTitle} from './common';
import {useLab} from './use-academy';

type DeskProgress={step:number;complete:boolean};
const defaults:DeskProgress={step:0,complete:false};
function validate(value:unknown):DeskProgress{
 const v=value&&typeof value==='object'?value as Partial<DeskProgress>:{};
 const step=typeof v.step==='number'&&Number.isFinite(v.step)?Math.max(0,Math.min(3,Math.floor(v.step))):0;
 return {step,complete:v.complete===true&&step===3};
}
const tasks=[
 {label:'Trade matching',title:'Two sides. One disagreement.',intro:'A trade is an agreement to buy or sell a financial asset. Both sides should record the same details.',heads:['Field','Buyer record','Seller record'],rows:[['Security','AAPL shares','AAPL shares'],['Quantity','100 shares','110 shares'],['Price','$250 per share','$250 per share']],question:'What should you flag before matching this trade?',choices:[['price','A price difference'],['quantity','The 10-share quantity difference'],['symbol','A different stock symbol']],answer:'quantity',feedback:'Both sides agree on the stock and price, but disagree on the number of shares. Investigate and correct the quantity with evidence before treating the records as matched.',term:'Matching',definition:'Comparing the two sides of a trade to make sure important details agree.'},
 {label:'Reconciliation',title:'Your records do not agree.',intro:'Reconciliation means comparing two sources of information and explaining any differences.',heads:['Record','Shares held','Source'],rows:[['Internal ledger','250 shares','Your company'],['Custody report','230 shares','External custodian']],question:'What should an analyst do about the difference?',choices:[['overwrite','Change the ledger to 230 without checking'],['investigate','Investigate the 20-share difference using evidence'],['ignore','Ignore it because both records are close']],answer:'investigate',feedback:'250 minus 230 equals a 20-share difference. Check transactions and timing, identify the cause, and document an approved correction. Never change a record just to make totals match.',term:'Reconciliation',definition:'Checking whether two sets of records agree and investigating any differences.'},
 {label:'Exception control',title:'An instruction needs verification.',intro:'An exception is something that needs attention because a normal check did not pass.',heads:['Control','Current status'],rows:[['Approved settlement instructions','Missing'],['Unverified email','Requests a new account'],['Trade status','Not yet settled']],question:'What is the safest next step?',choices:[['email','Use the account in the email immediately'],['settle','Mark the transaction settled'],['escalate','Hold the change and verify through an approved channel']],answer:'escalate',feedback:'Settlement instructions tell teams where cash or securities should be delivered. Verify them through approved procedures, document the break, and escalate before releasing a change.',term:'Exception',definition:'A mismatch, missing detail, or control issue that must be investigated before the process continues.'}
] as const;

export function DeskChallenge(){
 const [progress,setProgress]=useLab<DeskProgress>('first-ops-desk',defaults,validate);
 const [answer,setAnswer]=useState('');
 const [checked,setChecked]=useState(false);
 const task=tasks[Math.min(progress.step,2)];
 const correct=answer===task.answer;
 const advance=()=>{if(!correct)return;setProgress({step:Math.min(3,progress.step+1),complete:progress.step===2});setAnswer('');setChecked(false);};
 return <div className="fs-desk"><a className="ac-back" href="#simulations">← All practice workspaces</a>
 <PageTitle eyebrow="Interactive lesson · 5 minutes · fictional data" title="Your first day on the operations desk.">Make three decisions: check a trade, reconcile a record, and handle an exception. We explain each concept before you try it.</PageTitle>
 <ol className="fs-desk-progress" aria-label="Challenge progress">{tasks.map((t,i)=><li key={t.label} className={i<progress.step?'is-done':i===progress.step?'is-current':''}>{i+1}. {t.label}{i<progress.step?' ✓':''}</li>)}</ol>
 {progress.complete?<section className="fs-desk-done" role="status"><p className="ac-eyebrow">Challenge completed</p><h2>You made three careful operations decisions.</h2><p>You matched trade records, investigated a holdings difference, and protected an unverified settlement-instruction change. Your completion is saved on this device.</p><div className="ac-actions"><LinkButton to="my-learning">See my progress</LinkButton><LinkButton to="operations/learning" secondary>Keep learning operations</LinkButton><button className="ac-button secondary" onClick={()=>{setProgress(defaults);setAnswer('');setChecked(false);}}>Practice again</button></div></section>:
 <section className="fs-desk-card" aria-labelledby="fs-desk-title"><p className="ac-eyebrow">Task {progress.step+1} of 3 · {task.label}</p><h2 id="fs-desk-title">{task.title}</h2><p className="fs-desk-lede">{task.intro}</p>
 <div className="ac-table-wrap"><table className="fs-desk-data"><thead><tr>{task.heads.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{task.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>
 <details className="fs-desk-definition"><summary>What does “{task.term}” mean?</summary><p>{task.definition}</p></details>
 <fieldset className="fs-desk-options"><legend>{task.question}</legend>{task.choices.map(([value,label])=><label key={value}><input type="radio" name="desk-choice" value={value} checked={answer===value} onChange={()=>{setAnswer(value);setChecked(false);}}/>{label}</label>)}</fieldset>
 {checked&&<div className="fs-desk-feedback" role="status" aria-live="polite"><strong>{correct?'Correct decision.':"Not yet. Look at the evidence and try again."}</strong><p>{correct?task.feedback:'A good operations analyst checks the underlying records instead of assuming, ignoring, or overriding an issue. Compare the facts above and choose the next safe action.'}</p></div>}
 <div className="ac-actions">{checked&&correct?<button className="ac-button" onClick={advance}>{progress.step===2?'Finish challenge':'Continue to next task'}</button>:<button className="ac-button" disabled={!answer} onClick={()=>setChecked(true)}>Check my decision</button>}<LinkButton to="glossary" secondary>Open glossary</LinkButton></div>
 </section>}
 <p className="ac-footnote">Educational simulation only. No live market data, accounts, or real trades are used.</p></div>;
}
