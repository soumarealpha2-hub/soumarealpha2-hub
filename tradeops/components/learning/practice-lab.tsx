'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Clock3, Lightbulb, Pause, Play, ShieldCheck } from 'lucide-react';
import type { Lesson, PracticeState } from '@/lib/learning';

export function TradeFlow({steps,current=-1}:{steps:string[];current?:number}) {
  return <ol className="learning-flow" aria-label="Trade flow diagram">{steps.map((step,i)=><li key={step} className={current<0?'':i<current?'complete':i===current?'current':''}><span className="flow-number">{i<current?<Check size={13}/>:i+1}</span><span>{step}</span>{i<steps.length-1&&<ArrowRight size={15} aria-hidden="true"/>}</li>)}</ol>;
}

export function practiceNumbers(kind:string,variation=0) {
  const v=variation%4;
  const quantity=kind==='notional'?100+20*v:20+5*v;
  const price=kind==='notional'?50+5*v:100;
  const cashNeeded=quantity*price;
  const gap=500+100*v;
  const booked=500+100*v;
  const internal=1000+200*v;
  const missing=50+10*v;
  return {quantity,price,cashNeeded,cashAvailable:cashNeeded-gap,gap,booked,confirmed:booked+50,internal,custody:internal-missing,missing};
}

const dollars=(n:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);

export function PracticeLab({lesson,state,onChange,independent=false,variation=0}:{lesson:Lesson;state:PracticeState;onChange:(s:PracticeState)=>void;independent?:boolean;variation?:number}) {
  const [feedback,setFeedback]=useState<{text:string;ok:boolean}|null>(null);
  const [hint,setHint]=useState(false);
  const [stuck,setStuck]=useState(false);
  const [timed,setTimed]=useState(false);
  const [seconds,setSeconds]=useState(120);
  const kind=lesson.exercise.kind;
  const n=practiceNumbers(kind,variation);
  const v=variation%4;
  const approvedAccount=`ACCT-${String(14+v*10).padStart(3,'0')}`;
  const ticketAccount=`ACCT-${String(41+v*10).padStart(3,'0')}`;
  const analyst=['Jordan','Casey','Morgan','Riley'][v];
  const reviewer=['Priya','Avery','Sam','Taylor'][v];
  const stage=state.stage;
  const done=stage>=lesson.exercise.stages;
  useEffect(()=>{
    if(done)return;
    const timer=setTimeout(()=>setStuck(true),30000);
    return ()=>clearTimeout(timer);
  },[done,stage]);
  useEffect(()=>{
    if(!timed || done)return;
    const timer=setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000);
    return ()=>clearInterval(timer);
  },[timed,done]);
  const move=(next:number)=>{setFeedback(null);setStuck(false);onChange({...state,stage:next,input:'',checks:[]});};
  const check=(id:string)=>onChange({...state,checks:state.checks.includes(id)?state.checks.filter(x=>x!==id):[...state.checks,id]});
  const decide=(answer:number,correct:number,wrong:string[],next:number)=>{
    if(answer===correct){move(next);return;}
    setFeedback({ok:false,text:wrong[answer]});
  };
  const numberCheck=(expected:number,next:number,wrong:string)=>{
    const raw=state.input.replace(/[$,\s]/g,'');
    if(raw && Number.isFinite(Number(raw)) && Math.abs(Number(raw)-expected)<0.005){move(next);return;}
    setFeedback({ok:false,text:wrong});
  };
  const numberForm=(label:string,expected:number,next:number,wrong:string,unit:string)=> <form className="practice-answer" onSubmit={e=>{e.preventDefault();numberCheck(expected,next,wrong);}}><label htmlFor={`practice-${lesson.id}`}>{label}</label><div><input id={`practice-${lesson.id}`} inputMode="decimal" autoComplete="off" value={state.input} onChange={e=>{onChange({...state,input:e.target.value});setFeedback(null);}} placeholder={`Enter ${unit}`} required/><button type="submit" className="button primary">Check answer<ArrowRight size={15}/></button></div></form>;
  const choices=(prompt:string,options:string[],correct:number,wrong:string[],next:number)=> <div className="practice-decisions"><h3>{prompt}</h3>{options.map((choice,i)=><button key={choice} onClick={()=>decide(i,correct,wrong,next)}><span className="answer-letter">{String.fromCharCode(65+i)}</span>{choice}<ArrowRight size={15}/></button>)}</div>;
  const checks=(items:{id:string;label:string}[])=> <div className="practice-checks">{items.map(item=><label key={item.id}><input type="checkbox" checked={state.checks.includes(item.id)} onChange={()=>check(item.id)}/><span>{item.label}</span></label>)}</div>;
  const facts=(rows:[string,string][])=> <dl className="practice-facts">{rows.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
  const compare=(rows:[string,string,string][])=> <div className="practice-comparison"><table><caption>{kind==='reconciliation'?'Same instrument and account, two records':'Trade details from two sources'}</caption><thead><tr><th>Field</th><th>{kind==='reconciliation'?'Internal ledger':'Booking'}</th><th>{kind==='reconciliation'?'Custody record':'Confirmation'}</th></tr></thead><tbody>{rows.map(([field,a,b])=><tr key={field}><th scope="row">{field}</th><td>{a}</td><td>{b}</td></tr>)}</tbody></table></div>;

  return <section className="practice-lab" aria-label={`${independent?'Independent practice':'Guided exercise'}: ${lesson.title}`}>
    <div className="practice-kicker"><span><ShieldCheck size={15}/> {independent?'INDEPENDENT CASE':'GUIDED EXERCISE'}</span><span>{done?'Complete':`Step ${stage+1} of ${lesson.exercise.stages}`}</span></div>
    <h2>{lesson.exercise.title}</h2>
    <p className="practice-brief">{variation===0?lesson.exercise.brief:kind==='cutoff'?'A fresh simulated handoff queue. Apply the same controls and prioritization principles.':kind==='controls'?'An urgent sample account change. Apply independent review and retain the evidence.':kind==='exceptions'?'A fresh sample routing discrepancy. Check the approved reference before releasing it.':'A fresh sample ticket. Use the values below to complete the case.'}</p>
    {kind==='cutoff'&&independent&&!done&&<div className="practice-timer"><Clock3 size={16}/><strong>{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}</strong><button className="text-button" onClick={()=>setTimed(t=>!t)}>{timed?<><Pause size={14}/>Pause timer</>:<><Play size={14}/>{seconds===120?'Try timed practice':'Resume timer'}</>}</button><span>{seconds===0?'Time elapsed. You can still finish and learn.':timed?'Fictional desk deadline':'Timer is optional'}</span></div>}
    {done?<div className="practice-done" role="status"><CheckCircle2 size={31}/><h3>Case completed</h3><p>{kind==='lifecycle'||kind==='settlement'?'The sample cash and securities exchange is complete.':kind==='cutoff'?'The due-today funding blocker has an owner and a clear escalation. It remains on hold pending a verified funding outcome.':kind==='matching'?'The quantity discrepancy was identified and the confirmed details corrected using the approved execution record.':kind==='reconciliation'?'A verified delivery record explains the difference. The sample evidence and outcome are documented.':kind==='notional'?'You calculated the stock trade value and identified the operations check.':'The sample change has a verified source, a separate review, and a recorded outcome.'}</p><span className="subtle-pill">Simulated data · No real funds or trades</span></div>:<>
      {kind==='notional'&&<>
        {facts([['Instrument','NOVA stock'],['Side','Buy'],['Shares',String(n.quantity)],['Price per share',dollars(n.price)]])}
        {stage===0?numberForm('What is the trade notional in dollars?',n.cashNeeded,1,`Trade value is shares × price. Multiply ${n.quantity} by ${n.price}; this is not a profit calculation.`,'dollars'):choices('What does operations do next?',['Check the booking against the agreed trade','Promise the client a profit','Choose a different stock for the client'],0,['','A trade’s notional is not a promised profit. Operations helps process the agreed transaction.','Investment selection is different from checking an executed trade.'],2)}
      </>}
      {kind==='lifecycle'&&<>
        <TradeFlow steps={['Booked','Matched','Ready','Settled']} current={stage}/>
        {facts([['Ticket','LEARN-NOVA'],['Shares',String(n.quantity)],['Price',dollars(n.price)],['Cash required',dollars(n.cashNeeded)],['Both trade records','Instrument, quantity, price, dates agree']])}
        {stage===0?choices('The booking and counterparty details agree. What comes first?',['Mark it settled immediately','Match the sample trade details','Ignore the booking'],1,['Delivery has not happened. Matching is the agreement step.','','The recorded terms are needed for processing.'],1):stage===1?<><div className="practice-evidence">Simulated readiness evidence: {dollars(n.cashNeeded)} cash is available and the seller has all {n.quantity} shares.</div>{checks([{id:'cash',label:'I verified the required cash is available'},{id:'stock',label:'I verified the required securities are available'}])}<button className="button primary" disabled={!['cash','stock'].every(c=>state.checks.includes(c))} onClick={()=>move(2)}>Record readiness checks<Check size={15}/></button></>:<><div className="practice-evidence">Trade details agree. Cash and securities are ready. The verified sample instructions are in place.</div><button className="button primary" onClick={()=>move(3)}>Simulate cash and securities exchange<ArrowRight size={15}/></button></>}
      </>}
      {kind==='settlement'&&<>
        <TradeFlow steps={['Find shortfall','Request funding','Check + settle']} current={stage}/>
        {facts([['Shares',String(n.quantity)],['Price per share',dollars(n.price)],['Buyer’s cash available',dollars(stage>=2?n.cashNeeded:n.cashAvailable)],['Seller’s stock available',`${n.quantity} shares`],['Ticket status',stage>=2?'Funding confirmed in simulation':'Matched · funding hold']])}
        {stage===0?numberForm('How many additional dollars are needed?',n.gap,1,`First calculate ${n.quantity} shares × ${dollars(n.price)}, then subtract ${dollars(n.cashAvailable)} available.`,'dollars'):stage===1?<><div className="practice-evidence">The ticket needs {dollars(n.gap)} more cash. In a real role, the appropriate team must verify the funding allocation.</div><button className="button primary" onClick={()=>move(2)}>Request and simulate verified funding<ArrowRight size={15}/></button></>:<>{checks([{id:'cash',label:`Verified sample cash: ${dollars(n.cashNeeded)}`},{id:'stock',label:`Verified sample securities: ${n.quantity} shares`}])}<button className="button primary" disabled={!['cash','stock'].every(c=>state.checks.includes(c))} onClick={()=>move(3)}>Settle the simulated trade<CheckCircle2 size={16}/></button></>}
      </>}
      {kind==='matching'&&<>
        {compare([['Instrument','NOVA','NOVA'],['Side','Buy','Buy'],['Quantity',String(n.booked),String(n.confirmed)],['Price','$100','$100'],['Settlement date','Next business day','Next business day']])}
        {stage===0?choices('Which field needs investigation?',['Price','Quantity','Instrument'],1,['The price agrees at $100 on both records.','','Both records identify NOVA.'],1):<><div className="practice-evidence">Approved execution record: {n.booked} shares. The counterparty has verified that its confirmation quantity was recorded incorrectly.</div>{numberForm('What quantity belongs on the corrected confirmation?',n.booked,2,`Use the approved ${n.booked}-share execution record. Do not average the two records or copy an unverified value.`,'shares')}</>}
      </>}
      {kind==='reconciliation'&&<>
        {compare([['Instrument','NOVA','NOVA'],['Account','SIM-001','SIM-001'],['As-of date','Sample business day','Sample business day'],['Shares',String(n.internal),String(n.custody)]])}
        {stage===0?numberForm('How many shares need investigation?',n.missing,1,`Keep the units as shares. Subtract ${n.custody} from ${n.internal}; a difference needs an explanation.`,'shares'):<><div className="practice-evidence">The custody team supplies a verified delivery receipt for the missing {n.missing} shares. Its as-of snapshot preceded that delivery.</div>{choices('How do you close the sample break?',['Delete the custody snapshot','Document the timing difference and verify the updated balance','Overwrite the balance without recording why'],1,['Keep the original snapshot as evidence of the timing difference.','','Changing a number without evidence can hide a genuine problem.'],2)}</>}
      </>}
      {kind==='exceptions'&&<>
        {facts([['Trade','SIM-ROUTE'],['Ticket destination',ticketAccount],['Approved reference',approvedAccount],['Email request','Release immediately'],['Training rule','Verified source + independent review']])}
        {stage===0?choices('What is your next step?',['Use the urgent email as approval',`Verify ${approvedAccount} against the approved instruction source`,`Release to ${ticketAccount} because it looks similar`],1,['Urgency does not verify the destination or replace the training rule.','','Similar-looking accounts can route assets incorrectly.'],1):<><div className="practice-evidence">The approved reference confirms {approvedAccount}. A separate simulated reviewer has checked the corrected instruction.</div>{checks([{id:'source',label:'Approved source verified'},{id:'reviewer',label:'Separate reviewer’s sample approval verified'},{id:'audit',label:'Reason and evidence recorded in the sample case'}])}<button className="button primary" disabled={!['source','reviewer','audit'].every(c=>state.checks.includes(c))} onClick={()=>move(2)}>Record verified correction<Check size={15}/></button></>}
      </>}
      {kind==='controls'&&<>
        {facts([['Sample change','Destination account amended'],['Changed by',`Analyst ${analyst}`],['Proposed reviewer',`Analyst ${analyst}`],['Pressure','Fictional deadline approaching'],['Training policy','Reviewer must be a different person']])}
        {stage===0?choices('Which response protects the control?',[`Let ${analyst} approve their own change`,'Hold release and request an independent reviewer','Hide the change until after the cutoff'],1,['The same person is not an independent reviewer under this training rule.','','Hiding the change removes transparency and does not fix the control.'],1):<><div className="practice-evidence">Simulated reviewer {reviewer} checks the approved source and verifies the change. {analyst} remains responsible for the documented handoff.</div>{checks([{id:'reviewer',label:'Separate review and approved source verified'},{id:'audit',label:'Change reason, deadline, owner, and evidence recorded'}])}<button className="button primary" disabled={!['reviewer','audit'].every(c=>state.checks.includes(c))} onClick={()=>move(2)}>Record the controlled handoff<Check size={15}/></button></>}
      </>}
      {kind==='cutoff'&&<>
        {stage===0?<div className="practice-queue"><h3>Which ticket do you investigate first?</h3>{[{id:'SIM-301',title:'Funding shortfall',size:dollars(250000+50000*v),date:'Due today · unresolved',priority:'High',wrong:''},{id:'SIM-302',title:'Quantity query',size:dollars(20000+10000*v),date:'Due tomorrow',priority:'Medium',wrong:'This case still needs follow-up, but the due-today funding blocker has less time and higher impact in this queue.'},{id:'SIM-303',title:'Completed delivery',size:dollars(500000+150000*v),date:'Settled · no open issue',priority:'Closed',wrong:'This larger trade is already settled. Notional alone does not make it the urgent open case.'}].map((ticket,i)=><button key={ticket.id} onClick={()=>decide(i,0,['', 'The due-today funding blocker has less time and higher impact in this queue.','The larger trade is already settled. Investigate the open due-today blocker.'],1)}><span className={`priority-badge ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span><strong>{ticket.title}</strong><small>{ticket.id} · {ticket.size}</small><span>{ticket.date}</span></button>)}</div>:<><div className="practice-evidence">SIM-301 has a verified cash shortfall due today. The release is on hold. Your handoff needs an owner and a specific action.</div>{choices('Where do you route the blocker?',['Mark it settled to clear the queue','Escalate funding to Treasury, assign an owner, and keep release on hold','Only add processing capacity'],1,['Changing a status does not supply the missing cash or confirm delivery.','','Capacity helps workload; it does not fund this purchase.'],2)}</>}
      </>}
      {feedback&&<div className={`answer-feedback ${feedback.ok?'correct':'incorrect'}`} role="status">{feedback.text}</div>}
      <div className="hint-row"><button className="text-button" onClick={()=>setHint(h=>!h)}><Lightbulb size={15}/>{hint?'Hide hint':'Show hint'}</button>{stuck&&!hint&&<span>Need a hand? A hint is available.</span>}</div>
      {hint&&<div className="practice-hint">{variation>0&&['notional','settlement','matching','reconciliation','exceptions','controls'].includes(kind)?kind==='notional'?'Multiply the displayed share quantity by the displayed price.':kind==='settlement'?'Find the trade value, then subtract the displayed available cash.':kind==='matching'?'Compare quantities and use the approved execution record to verify a correction.':kind==='exceptions'?'Check the displayed approved instruction reference, require a separate reviewer, and record the evidence.':kind==='controls'?'The person making a change cannot act as its independent reviewer under this training rule.':'Subtract the custody quantity from the internal quantity. Keep the original records and explain the difference.':lesson.exercise.hint}</div>}
    </>}
  </section>;
}
