'use client';
import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {motion,useReducedMotion} from 'framer-motion';
import {X,ArrowUp} from 'lucide-react';

const STEPS=[
 {route:'quiz',selector:'.ac-quiz-intro button, .ac-quiz .ac-answers, .ac-results',title:'Start with your interests',text:'This is where you start the career assessment. Answer at your own pace to discover careers that fit your interests. Your current skills do not limit your options.'},
 {route:'learn',selector:'.ac-track-directory > a',title:'Choose a learning track',text:'Select one of these tracks to open its beginner, intermediate, and advanced lessons. Each lesson includes an explanation, practice, and feedback.'},
 {route:'simulations',selector:'.ac-track-directory > a',title:'Try the actual work',text:'This opens the Operations desk. The other workspaces let you test a strategy, post journal entries, or build a valuation with fictional data.'},
 {route:'my-learning',selector:'.ac-stat-strip',title:'Pick up where you left off',text:'Your progress appears here. Below, you can resume lessons, organize your roadmap, and compare saved career results.'}
];
type Box={left:number;top:number;width:number;height:number;viewportWidth:number;viewportHeight:number};
export function SpotlightTour({step,onStep,onClose}:{step:number;onStep:(n:number)=>void;onClose:()=>void}){
 const s=STEPS[step],reduced=useReducedMotion();const [box,setBox]=useState<Box|null>(null);const panel=useRef<HTMLDivElement>(null);const closeRef=useRef(onClose);
 useEffect(()=>{closeRef.current=onClose;},[onClose]);
 useEffect(()=>{
  const previous=document.activeElement as HTMLElement|null;
  return()=>{if(previous?.isConnected)previous.focus({preventScroll:true});};
 },[]);
 useEffect(()=>{
  let target:HTMLElement|null=null,frame=0,tries=0;let observer:ResizeObserver|undefined;
  const measure=()=>{if(!target)return;const b=target.getBoundingClientRect();setBox({left:b.left-8,top:b.top-8,width:b.width+16,height:b.height+16,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight});};
  const locate=()=>{
   if(window.location.hash!==`#${s.route}`){if(tries++<300)frame=requestAnimationFrame(locate);return;}
   target=document.querySelector<HTMLElement>(`main ${s.selector.split(', ').join(', main ')}`);
   if(!target){if(tries++<300)frame=requestAnimationFrame(locate);return;}
   target.classList.add('ac-spotlight-target');target.scrollIntoView({block:'center',behavior:'instant'});
   observer=new ResizeObserver(measure);observer.observe(target);measure();panel.current?.focus({preventScroll:true});
  };
  window.location.hash=s.route;frame=requestAnimationFrame(locate);
  window.addEventListener('scroll',measure,{passive:true});window.addEventListener('resize',measure);
  const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();closeRef.current();}};window.addEventListener('keydown',escape);
  return()=>{cancelAnimationFrame(frame);observer?.disconnect();target?.classList.remove('ac-spotlight-target');window.removeEventListener('scroll',measure);window.removeEventListener('resize',measure);window.removeEventListener('keydown',escape);};
 },[s]);
 const mobile=box?box.viewportWidth<768:false;
 const width=box?Math.min(370,box.viewportWidth-24):370;
 let left=box?Math.max(12,Math.min(box.left,box.viewportWidth-width-12)):12;
 let top=box?box.top+box.height+18:80;
 if(box&&!mobile&&box.left+box.width+width+28<box.viewportWidth){left=box.left+box.width+20;top=Math.max(12,box.top);}
 const below=box&&top+270>box.viewportHeight;
 if(box&&below)top=Math.max(12,box.top-280);
 return typeof document==='undefined'?null:createPortal(<div className="academy ac-spotlight-root">
  {box?<div className="ac-spotlight-ring" style={{left:box.left,top:box.top,width:box.width,height:box.height}} aria-hidden="true"/>:<div className="ac-spotlight-loading"/>}
  <motion.div ref={panel} role="dialog" aria-label={`Platform tour: ${s.title}`} aria-describedby="spotlight-description" tabIndex={-1} className="ac-spotlight-panel" style={{left,top,width}} initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.18}} key={step}>
   <button className="ac-close" aria-label="Skip Tutorial" onClick={onClose}><X size={18}/></button>
   <p className="ac-eyebrow">Platform tour · {step+1} of {STEPS.length}</p>
   {box&&<span className="ac-spotlight-cue"><ArrowUp size={15}/>Highlighted feature</span>}
   <h2>{s.title}</h2><p id="spotlight-description">{s.text}</p>
   <div className="ac-actions"><button className="ac-link" onClick={onClose}>Skip</button><button className="ac-link" onClick={()=>onStep(0)}>Restart</button>{step>0&&<button className="ac-button secondary" onClick={()=>onStep(step-1)}>Back</button>}<button className="ac-button" onClick={()=>step<STEPS.length-1?onStep(step+1):onClose()}>{step<STEPS.length-1?'Next':'Finish'}</button></div>
   <button className="ac-spotlight-use" onClick={onClose}>Close tour and try this feature</button>
  </motion.div>
 </div>,document.body);
}
