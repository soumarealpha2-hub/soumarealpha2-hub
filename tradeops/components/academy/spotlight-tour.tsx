'use client';
import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {motion,useReducedMotion} from 'framer-motion';
import {X,ChevronDown} from 'lucide-react';

const STEPS=[
 {route:'quiz',selector:'.ac-quiz-intro button, .ac-quiz .ac-answers, .ac-quiz .ac-ranking, .ac-results h2 a',title:'Find your direction',text:'Start with your interests. This quiz helps you explore careers that could fit.'},
 {route:'learn',selector:'a[href="#learn/operations"] h2',title:'Build your foundations',text:'Pick a track, start with the basics, and learn at your own pace.'},
 {route:'simulations',selector:'a[href="#operations/overview"]',title:'Try the work',text:'Step into a practice workspace. Every task uses fictional data, so you can experiment.'},
 {route:'my-learning',selector:'.ac-stat-strip',title:'Keep your place',text:'Your lessons and progress live here. Come back anytime to pick up where you left off.'}
];
type Box={left:number;top:number;width:number;height:number;viewportWidth:number;viewportHeight:number};
export function SpotlightTour({step,onStep,onClose}:{step:number;onStep:(n:number)=>void;onClose:()=>void}){
 const s=STEPS[step],reduced=useReducedMotion();const [box,setBox]=useState<Box|null>(null);const [minimized,setMinimized]=useState(false);const panel=useRef<HTMLDivElement>(null);const closeRef=useRef(onClose);
 useEffect(()=>{closeRef.current=onClose;},[onClose]);
 useEffect(()=>{
  const previous=document.activeElement as HTMLElement|null;
  return()=>{if(previous?.isConnected)previous.focus({preventScroll:true});};
 },[]);
 useEffect(()=>{
  setBox(null);setMinimized(false);
  let target:HTMLElement|null=null,frame=0,tries=0;let observer:ResizeObserver|undefined;
  const measure=()=>{if(!target)return;const b=target.getBoundingClientRect();setBox({left:b.left-8,top:b.top-8,width:b.width+16,height:b.height+16,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight});};
  const locate=()=>{
   if(window.location.hash!==`#${s.route}`){if(tries++<300)frame=requestAnimationFrame(locate);return;}
   target=Array.from(document.querySelectorAll<HTMLElement>(`main ${s.selector.split(', ').join(', main ')}`)).find(el=>el.getBoundingClientRect().height>0)??null;
   if(!target){if(tries++<300)frame=requestAnimationFrame(locate);return;}
   target.scrollIntoView({block:'center',behavior:'instant'});
   const bounds=target.getBoundingClientRect();
   const freeHeight=window.innerHeight-(panel.current?.offsetHeight??210)-48;
   window.scrollBy({top:bounds.top-Math.max(24,(freeHeight-bounds.height)/2),behavior:'instant'});
   observer=new ResizeObserver(measure);observer.observe(target);if(panel.current)observer.observe(panel.current);measure();panel.current?.focus({preventScroll:true});
  };
  window.location.hash=s.route;frame=requestAnimationFrame(locate);
  window.addEventListener('scroll',measure,{passive:true});window.addEventListener('resize',measure);
  const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();closeRef.current();}};window.addEventListener('keydown',escape);
  return()=>{cancelAnimationFrame(frame);observer?.disconnect();target?.classList.remove('ac-spotlight-target');window.removeEventListener('scroll',measure);window.removeEventListener('resize',measure);window.removeEventListener('keydown',escape);};
 },[s]);
 return typeof document==='undefined'?null:createPortal(<div className="academy ac-spotlight-root" style={{background:'transparent'}}>
  {box&&!minimized&&<div className="ac-spotlight-ring fs-guide-ring" style={{left:box.left,top:box.top,width:box.width,height:box.height}} aria-hidden="true"/>}
  <motion.div ref={panel} role="dialog" aria-label={`First Seat guide: ${s.title}`} aria-describedby={minimized?undefined:'spotlight-description'} tabIndex={-1} className={`fs-tour-guide ${minimized?'is-minimized':''}`} initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.18}}>
   <div className="fs-guide-top">
    <button className="fs-guide-avatar" aria-label={minimized?'Expand tour guide':'Minimize tour guide'} aria-expanded={!minimized} onClick={()=>setMinimized(!minimized)}>
     <motion.img src="/first-seat-logo.svg" alt="" width={36} height={36} animate={reduced?{}:{y:[0,-3,0]}} transition={{duration:2.4,repeat:Infinity,ease:'easeInOut'}}/>
     <span aria-hidden="true"/>
    </button>
    {!minimized&&<><div><strong>Your First Seat guide</strong><small>Showing you around · {step+1}/{STEPS.length}</small></div><button className="fs-guide-icon" aria-label="Minimize tour guide" onClick={()=>setMinimized(true)}><ChevronDown size={16}/></button><button className="fs-guide-icon" aria-label="Close tour" onClick={onClose}><X size={16}/></button></>}
   </div>
   {!minimized&&<><div className="fs-guide-message" key={step} aria-live="polite"><h2>{s.title}</h2><p id="spotlight-description">{s.text}</p></div>
   <div className="fs-guide-actions"><button className="fs-guide-try" onClick={onClose}>Let me try</button><div>{step>0&&<button className="fs-guide-back" onClick={()=>onStep(step-1)}>Back</button>}<button className="fs-guide-next" onClick={()=>step<STEPS.length-1?onStep(step+1):onClose()}>{step<STEPS.length-1?'Next →':'Done'}</button></div></div></>}
  </motion.div>
 </div>,document.body);
}
