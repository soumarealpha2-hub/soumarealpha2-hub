'use client';
import {ArrowRight} from 'lucide-react';
import {TRACKS} from '@/lib/academy/careers';
import {LESSONS} from '@/lib/academy/lessons';
import {useAcademy} from './use-academy';
import {LinkButton} from './common';
import {FounderJourney} from './founder-journey';
import {CareerPreview} from './career-preview';
import {CareerCategories,FoundationDirectory} from './foundation-directory';

export function Home({onTour}:{onTour:()=>void}){
 const {progress}=useAcademy();const resume=LESSONS.find(l=>progress.lessons[l.id]&&!progress.lessons[l.id]?.completed);
 return <>
  <section className="fs-home-hero">
   <div><p className="ac-eyebrow">Your first seat at the table</p><h1>Find your career<br/>in <em>finance.</em></h1><p className="fs-home-deck">Understand the work before choosing the path.</p><p>Explore finance and consulting. Learn the language, try a realistic task, and build from wherever you are today.</p><div className="ac-actions"><LinkButton to={resume?`learn/${resume.id}`:'start'}>{resume?'Resume your lesson':'Find your starting point'}</LinkButton><a className="ac-text-link" href="#careers">Explore careers <ArrowRight size={16}/></a></div><p className="ac-meta">No experience required · No account needed · Learn at your pace</p></div>
   <CareerPreview/>
  </section>
  <section className="fs-editorial-row"><div><p className="ac-eyebrow">01 / Find the work that interests you</p><h2>There’s more than <br/>one way in.</h2></div><div><p>Follow money through a business, investigate a mismatch, analyze data, or help a client solve a problem. Career profiles show the work and the tradeoffs.</p><div className="ac-actions"><LinkButton to="careers" secondary>Explore finance careers</LinkButton><LinkButton to="careers/consulting" secondary>Explore consulting careers</LinkButton></div><a className="ac-text-link" href="#quiz">Not sure yet? Try the career discovery quiz →</a></div></section><CareerCategories/>
  <section className="ac-section"><div className="ac-section-heading"><div><p className="ac-eyebrow">02 / Build a foundation</p><h2>Foundations for every career.</h2></div><a className="ac-text-link" href="#learn">All learning paths →</a></div><FoundationDirectory/><details className="fs-shared-tracks"><summary>Browse the four shared foundation tracks</summary><div className="fs-path-list">{TRACKS.map((t,i)=>{const ls=LESSONS.filter(l=>l.track===t.id&&l.level==='Beginner');const done=ls.filter(l=>progress.lessons[l.id]?.completed).length;return <a key={t.id} href={`#learn/${t.id}`}><span className="ac-index">0{i+1}</span><h3>{t.title}</h3><p>{t.description}</p><span className="ac-meta">{done?`${done} / ${ls.length} beginner lessons complete`:'Beginner to advanced'}</span><ArrowRight size={18}/></a>;})}</div></details></section>
  <section className="fs-consulting-feature"><div><p className="ac-eyebrow">03 / Try a client problem</p><h2>Why are the deliveries late?</h2><p>A retailer spends four days waiting for pickup. Investigate the handoff, calculate the effect of a change, and decide what a pilot should measure.</p><LinkButton to="day/consulting-operations-supply-chain-consulting">Try the consulting work sample</LinkButton></div><div className="fs-process-note"><p className="ac-eyebrow">Operations & supply chain consulting</p><ol><li><span>01</span><div><strong>Understand the problem</strong><p>Look at where the order spends its time.</p></div></li><li><span>02</span><div><strong>Compare the options</strong><p>Consider speed, cost, and service quality.</p></div></li><li><span>03</span><div><strong>Recommend a next step</strong><p>Use evidence and explain what to test.</p></div></li></ol></div></section>
  <section className="fs-editorial-row"><div><p className="ac-eyebrow">Keep your next step close</p><h2>A place to practice. <br/>Room to ask questions.</h2></div><div className="fs-utility-links">{[['simulations','Practice workspaces','Compare records, investigate exceptions, and work with business numbers.'],['resume-match','Resume match','Upload your resume and describe what you want to explore.'],['my-learning','My learning','Resume lessons and see the work you have completed.'],['glossary','Plain-English glossary','Read definitions and examples without losing your place.']].map(([to,title,description])=><a key={to} href={`#${to}`}><div><h3>{title}</h3><p>{description}</p></div><ArrowRight size={17}/></a>)}</div></section>
  <FounderJourney/>
  <section className="ac-next"><div><p className="ac-eyebrow">Take your first seat</p><h2>You can start with one question.</h2><p>Use Ask First Seat for help with a term or a lesson, or take a short guided tour of the website.</p></div><button className="ac-button secondary" onClick={onTour}>Show me around</button></section>
 </>;
}
