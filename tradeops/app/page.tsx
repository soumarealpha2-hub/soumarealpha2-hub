'use client';
import {lazy,Suspense,useSyncExternalStore,useState,useEffect,useRef} from 'react';
import {ArrowRight,BookOpen,Compass,Menu,X} from 'lucide-react';
import {MotionConfig,motion} from 'framer-motion';
import {Analytics} from '@vercel/analytics/react';
import {TRACKS,CAREERS} from '@/lib/academy/careers';
import {LESSONS} from '@/lib/academy/lessons';
import {useAcademy} from '@/components/academy/use-academy';
import {LinkButton} from '@/components/academy/common';
import {GlossaryButton,GlossaryPage} from '@/components/academy/glossary';
import {Home} from '@/components/academy/home';
import {SpotlightTour} from '@/components/academy/spotlight-tour';
import type {WorkspaceView} from '@/lib/learning';
const FinanceChat=lazy(()=>import('@/components/academy/career-assistant').then(m=>({default:m.FinanceChat})));
const ResumeMatcher=lazy(()=>import('@/components/academy/career-assistant').then(m=>({default:m.ResumeMatcher})));
const StartHere=lazy(()=>import('@/components/academy/beginner-start').then(m=>({default:m.BeginnerStart})));
const Portfolio=lazy(()=>import('@/components/academy/learning-hub').then(m=>({default:m.Portfolio})));
const InterviewStudio=lazy(()=>import('@/components/academy/learning-hub').then(m=>({default:m.InterviewStudio})));
const AfricaScenarios=lazy(()=>import('@/components/academy/learning-hub').then(m=>({default:m.AfricaScenarios})));
const CapstoneCenter=lazy(()=>import('@/components/academy/capstone-center').then(m=>({default:m.CapstoneCenter})));
const PlatformReview=lazy(()=>import('@/components/academy/platform-review').then(m=>({default:m.PlatformReview})));
const CareerLab=lazy(()=>import('@/components/academy/career-lab').then(m=>({default:m.CareerLab})));
const Careers=lazy(()=>import('@/components/academy/discovery').then(m=>({default:m.Careers})));
const CareerQuiz=lazy(()=>import('@/components/academy/discovery').then(m=>({default:m.CareerQuiz})));
const Learning=lazy(()=>import('@/components/academy/learning').then(m=>({default:m.Learning})));
const MyLearning=lazy(()=>import('@/components/academy/learning').then(m=>({default:m.MyLearning})));
const DayTrial=lazy(()=>import('@/components/academy/learning').then(m=>({default:m.DayTrial})));
const Simulations=lazy(()=>import('@/components/academy/workspaces').then(m=>({default:m.Simulations})));
const OperationsWorkspace=lazy(()=>import('@/components/operations-workspace'));
const NAV=[['home','Home'],['careers','Careers'],['start','Start here'],['learn','Lessons'],['simulations','Practice'],['resume-match','Resume match'],['my-learning','My learning'],['glossary','Glossary']];
function subscribeRoute(fn:()=>void){window.addEventListener('hashchange',fn);return()=>window.removeEventListener('hashchange',fn);}
const readRoute=()=>window.location.hash.slice(1)||'home';
export default function Academy(){
 const route=useSyncExternalStore(subscribeRoute,readRoute,()=> 'home');const [page,id]=route.split('/');const {progress,ready,saved,update}=useAcademy();const [menu,setMenu]=useState(false),[tour,setTour]=useState<number|null>(null);const main=useRef<HTMLElement>(null);const active=page==='operations'||page==='day'||page==='career-lab'||page==='cases'||page==='africa'?'simulations':['review','portfolio','interviews'].includes(page)?'my-learning':page==='quiz'?'careers':page;
 useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});main.current?.focus({preventScroll:true});},[route]);
 return <MotionConfig reducedMotion="user"><Analytics route={`/${page}`} path={`/${route.split("?")[0]}`} /><div className="academy"><a className="ac-skip" href="#main-content" onClick={e=>{e.preventDefault();main.current?.focus();}}>Skip to content</a><header className="ac-header"><a href="#home" className="ac-brand" onClick={()=>setMenu(false)}><img src="/first-seat-logo.svg" alt="" width={44} height={44}/><span className="ac-brand-wordmark"><span>First Seat</span><strong>Academy</strong></span></a><span className="ac-training-label">Find your career in finance.</span><button className="ac-menu-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X size={21}/>:<Menu size={21}/>}</button><a href="#my-learning" className="ac-header-learning">My learning<ArrowRight size={15}/></a><GlossaryButton label="Explain a term"/></header><nav className={`ac-main-nav ${menu?'open':''}`} aria-label="Main navigation">{NAV.map(([path,label])=><a key={path} href={`#${path}`} aria-current={path===active?'page':undefined} onClick={()=>setMenu(false)}>{label}</a>)}</nav><main id="main-content" ref={main} tabIndex={-1} className={page==='operations'?'ac-main ac-operations':'ac-main'}>{!saved&&<p className="ac-feedback" role="status">Your browser could not save progress. Changes will last for this visit only.</p>}<Suspense fallback={<p className="ac-loading" role="status">Opening your workspace…</p>}>
 {page==='resume-match'?<ResumeMatcher/>:page==='start'?<StartHere id={id}/>:page==='portfolio'?<Portfolio/>:page==='interviews'?<InterviewStudio id={id}/>:page==='africa'?<AfricaScenarios id={id}/>:page==='glossary'?<GlossaryPage/>:page==='cases'?<CapstoneCenter key={id} id={id}/>:page==='review'?<PlatformReview/>:page==='career-lab'?<CareerLab key={id} id={id}/>:page==='careers'?<Careers key={id??'all'} id={id}/>:page==='quiz'?<CareerQuiz/>:page==='learn'?<Learning id={id}/>:page==='my-learning'?<MyLearning/>:page==='day'?<DayTrial key={id} careerId={id??'sales-and-trading-operations'}/>:page==='simulations'?<Simulations key={id} id={id}/>:page==='operations'?<div className="operations-embedded"><OperationsWorkspace key={id} initialView={(['overview','trades','exceptions','simulator','learning'].includes(id)?id:'overview') as WorkspaceView}/></div>:<Home onTour={()=>setTour(0)}/>}
 </Suspense></main><footer className="ac-footer"><span>First Seat Academy · Built by Alpha Soumaré</span><div><button onClick={()=>setTour(0)}>Restart platform tour</button><a href="#my-learning">Progress & privacy</a><a href="#review">Review the platform</a><a href="#start">Onboarding & starting point</a><a href="#glossary">Glossary</a></div><small>Independent educational project · Fictional training data</small></footer>{ready&&page==='home'&&progress.onboarding==='new'&&tour===null&&<div className="ac-welcome" role="region" aria-label="Optional introduction"><div><strong>New here?</strong><span>Answer three simple questions, then try a small task.</span></div><a className="ac-button" href="#start">Find my starting point</a><button className="ac-link" onClick={()=>update(p=>({...p,onboarding:'done'}))}>Skip onboarding</button></div>}{tour!==null&&<SpotlightTour step={tour} onStep={setTour} onClose={()=>{setTour(null);update(p=>({...p,onboarding:'done'}));}}/>}<Suspense fallback={null}><FinanceChat/></Suspense></div></MotionConfig>;
}
