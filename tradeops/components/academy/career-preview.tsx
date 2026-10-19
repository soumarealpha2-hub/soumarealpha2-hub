'use client';
import {useState} from 'react';
import {ArrowRight,Compass,Check} from 'lucide-react';

const PREVIEWS=[
 {label:'Consulting',role:'Client problem solver',prompt:'Orders arrive late. Where would you investigate first?',facts:[['Waiting for pickup','4 days'],['Packing','1 day'],['Delivery','1 day']],choices:['The pickup delay','The delivery route'],answer:0,success:'You found the bottleneck. Pickup takes most of the time, so start by investigating that handoff.',hint:'Compare the three times. Which step accounts for the biggest delay?',to:'day/consulting-operations-supply-chain-consulting',cta:'Try the full client case'},
 {label:'Banking',role:'Business analyst',prompt:'Before valuing this business, how much is left after these costs?',facts:[['Revenue','$120m'],['Operating costs','$90m'],['Period','1 year']],choices:['$30m operating profit','$120m operating profit'],answer:0,success:'Exactly. Revenue minus operating costs leaves $30m of operating profit in this simplified example.',hint:'Revenue is what comes in. Subtract the operating costs to find what is left.',to:'day/investment-banking',cta:'Explore a banking workday'},
 {label:'Markets',role:'Trade investigator',prompt:'Two records disagree. What should you do before moving ahead?',facts:[['Agreed purchase','100 shares'],['Booked purchase','120 shares'],['Difference','20 shares']],choices:['Approve the larger amount','Compare with the original agreement'],answer:1,success:'Good call. Check the original agreement and resolve the mismatch before proceeding.',hint:'The records disagree. A larger number is not evidence that it is correct.',to:'day/sales-and-trading-operations',cta:'Explore the Operations desk'}
] as const;

export function CareerPreview(){
 const [role,setRole]=useState(0),[choice,setChoice]=useState<number|null>(null);
 const preview=PREVIEWS[role];const correct=choice===preview.answer;
 const chooseRole=(index:number)=>{setRole(index);setChoice(null);};
 return <aside className="fs-career-preview" aria-labelledby="career-preview-title">
  <div className="fs-preview-heading"><span className="fs-preview-kicker"><Compass size={16} aria-hidden="true"/> YOUR CAREER, TEST DRIVE INCLUDED</span><h2 id="career-preview-title">Take the seat.<br/>Make the call.</h2><p>Try a career in 30 seconds.</p></div>
  <div className="fs-preview-body">
   <div className="fs-preview-roles" role="group" aria-label="Choose a career preview">{PREVIEWS.map((p,i)=><button type="button" key={p.label} aria-pressed={i===role} onClick={()=>chooseRole(i)}>{p.label}</button>)}</div>
   <p className="fs-preview-role">YOUR ROLE <strong>{preview.role}</strong></p>
   <dl className="fs-preview-facts">{preview.facts.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
   <fieldset className="fs-preview-choices"><legend>{preview.prompt}</legend>{preview.choices.map((label,i)=><button type="button" key={label} disabled={correct} aria-pressed={choice===i} onClick={()=>setChoice(i)}><span className="fs-preview-letter" aria-hidden="true">{correct&&i===choice?<Check size={14}/>:i===0?'A':'B'}</span>{label}<ArrowRight size={15} aria-hidden="true"/></button>)}</fieldset>
   <div className="fs-preview-feedback" aria-live="polite" aria-atomic="true">{choice!==null?<><p><strong>{correct?'That’s the idea.':'Take another look.'}</strong> {correct?preview.success:preview.hint}</p>{correct&&<a href={`#${preview.to}`}>{preview.cta}<ArrowRight size={16}/></a>}</>:<p>Choose a role, then make your first decision. We’ll explain the reasoning.</p>}</div>
   <div className="fs-preview-bottom"><span>Fictional scenarios · No signup</span>{choice!==null&&<button type="button" onClick={()=>chooseRole((role+1)%PREVIEWS.length)}>Try another role →</button>}</div>
  </div>
 </aside>;
}
