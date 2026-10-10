'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Compass, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { WorkspaceView } from '@/lib/learning';

export const TOUR_STEPS:{title:string;text:string;why:string;target:string;view:WorkspaceView;action?:string}[]=[
  {title:'Your desk at a glance',text:'These cards show sample trade size, settlement completion, and open exceptions.',why:'Start here to see which work remains. Notional describes trade value, not profit or expected loss.',target:'overview-metrics',view:'overview'},
  {title:'Find and inspect a trade',text:'The blotter lists the sample trades. Search, filter, and open a ticket to see its details and lifecycle.',why:'A clear trade record helps you verify what was agreed before taking an action.',target:'trade-table',view:'trades',action:'Try searching for AAPL'},
  {title:'Investigate exceptions',text:'A break needs a closer look. Read the issue, priority, owner, and suggested next step.',why:'Fix the verified cause. Clearing an exception is separate from confirming settlement.',target:'exception-queue',view:'exceptions'},
  {title:'Explore a volume spike',text:'Change workload, processing capacity, and exception rate. The projected backlog responds immediately.',why:'This illustrative model shows why clean processing and enough capacity both matter.',target:'scenario-controls',view:'simulator',action:'Try the volume spike'},
  {title:'Get an explanation in place',text:'Explain This opens short definitions and practical examples without leaving your current workflow.',why:'You can look up unfamiliar terminology before making a decision.',target:'context-help',view:'overview',action:'Explain settlement'},
  {title:'Choose your learning path',text:'The Learning Center has short lessons, interactive cases, quizzes, and independent practice.',why:'Your progress is saved in this browser. Start as a beginner or choose another path at any time.',target:'learning-recommendation',view:'learning'},
];

export function WelcomeTutorial({open,onStart,onSkip}:{open:boolean;onStart:()=>void;onSkip:()=>void}) {
  return <Dialog open={open} onOpenChange={o=>{if(!o)onSkip();}}><DialogContent className="welcome-tutorial" showCloseButton={false}>
    <div className="welcome-icon"><Compass size={29}/></div>
    <DialogHeader><div className="eyebrow">WELCOME TO TRADEOPS ACADEMY</div><DialogTitle>Your first day on the desk.</DialogTitle><DialogDescription>You do not need a finance background. We’ll show you the workspace, then help you learn by doing.</DialogDescription></DialogHeader>
    <div className="welcome-features"><span><CheckCircle2 size={17}/>A quick tour of the real tools</span><span><BookOpen size={17}/>Short lessons and sample trade cases</span><span><Compass size={17}/>Optional, at your own pace</span></div>
    <button className="button primary" onClick={onStart}>Start guided walkthrough<ArrowRight size={17}/></button>
    <button className="text-button" onClick={onSkip}>Skip Tutorial</button>
    <p className="learning-footnote">Restart the tutorial anytime from the header or Academy.</p>
  </DialogContent></Dialog>;
}

export function GuidedTour({step,onNext,onBack,onSkip,onAction}:{step:number;onNext:()=>void;onBack:()=>void;onSkip:()=>void;onAction:()=>void}) {
  const current=TOUR_STEPS[step];
  const [rect,setRect]=useState<DOMRect|null>(null);
  const card=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    card.current?.focus();
    let element=document.querySelector(`[data-tour="${current.target}"]`);
    const measure=()=>setRect(element?.getBoundingClientRect()??null);
    element?.scrollIntoView({block:'center',behavior:'instant'});
    const frame=requestAnimationFrame(measure);
    const observer=new ResizeObserver(measure); if(element)observer.observe(element);
    // The Learning Center loads on demand; highlight it as soon as its target mounts.
    const mounts=new MutationObserver(()=>{
      if(element?.isConnected)return;
      element=document.querySelector(`[data-tour="${current.target}"]`);
      if(element){observer.observe(element);element.scrollIntoView({block:'center',behavior:'instant'});measure();}
    });
    mounts.observe(document.body,{childList:true,subtree:true});
    window.addEventListener('resize',measure);window.addEventListener('scroll',measure,true);
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();mounts.disconnect();window.removeEventListener('resize',measure);window.removeEventListener('scroll',measure,true);};
  },[current.target]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')onSkip();};window.addEventListener('keydown',key);return ()=>window.removeEventListener('keydown',key);},[onSkip]);
  const spotlight:CSSProperties|undefined=rect?{top:Math.max(4,rect.top-6),left:Math.max(4,rect.left-6),width:Math.min(rect.width+12,window.innerWidth-8),height:Math.min(rect.height+12,window.innerHeight-8)}:undefined;
  return <div className="tour-layer">
    {rect?<div className="tour-spotlight" style={spotlight}/>:<div className="tour-fallback-shade"/>}
    <div className="tour-coach" role="dialog" aria-label="Guided workspace walkthrough" tabIndex={-1} ref={card}>
      <div className="tour-topline"><span>WORKSPACE TOUR · {step+1} / {TOUR_STEPS.length}</span><button className="icon-button" aria-label="Skip Tutorial" onClick={onSkip}><X size={17}/></button></div>
      <div className="tour-dots" aria-hidden="true">{TOUR_STEPS.map((_,i)=><i key={i} className={i<=step?'done':''}/>)}</div>
      <h2>{current.title}</h2><p>{current.text}</p><div className="tour-why"><strong>Why it matters</strong><p>{current.why}</p></div>
      {current.action&&<button className="tour-action" onClick={onAction}>{current.action}<ArrowRight size={15}/></button>}
      <div className="tour-navigation"><button className="text-button" onClick={onSkip}>Skip Tutorial</button><div>{step>0&&<button className="button" aria-label="Previous tutorial step" onClick={onBack}><ArrowLeft size={16}/></button>}<button className="button primary" onClick={onNext}>{step===TOUR_STEPS.length-1?'Finish tour':'Next'}<ArrowRight size={16}/></button></div></div>
    </div>
  </div>;
}
