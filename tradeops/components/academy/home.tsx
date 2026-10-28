'use client';
import {useState} from 'react';
import {ArrowRight,ArrowDown} from 'lucide-react';
import {TRACKS} from '@/lib/academy/careers';
import {LESSONS} from '@/lib/academy/lessons';
import {useAcademy} from './use-academy';
import {LinkButton} from './common';
import {CareerPreview} from './career-preview';
import {CareerCategories,FoundationDirectory} from './foundation-directory';

export function Home({onTour}:{onTour:()=>void}){
 const {progress}=useAcademy();
 return <div className="fs-home-sections">
  <section className="fs-home-hero">
   <div className="fs-work-hero-copy">
    <p className="ac-eyebrow">Your first seat at the table</p>
    <h1>Your first seat<br/>in <em>finance</em> starts here.</h1>
    <p className="fs-home-deck">Not sure which finance career is for you? Start with 8 quick questions.</p>
    <p>Discover careers that match what interests you, then try the actual work to see what feels right.</p>
    <div className="ac-actions"><LinkButton to="quiz">Take the 8-question career quiz</LinkButton></div>
    <a className="ac-text-link" href="#start">Completely new to finance? Start learning here <ArrowRight size={16}/></a>
    <div className="fs-direct-work" aria-labelledby="fs-direct-work-title">
     <h2 id="fs-direct-work-title">Choose the work you want to try</h2>
     <div className="fs-work-link-list">
      <a href="#start/desk"><span>Sales &amp; Trading Operations</span><strong>Investigate a trade mismatch</strong><ArrowRight size={16} aria-hidden="true"/></a>
      <a href="#simulations/banking"><span>Investment Banking</span><strong>Build a business valuation</strong><ArrowRight size={16} aria-hidden="true"/></a>
      <a href="#simulations/accounting"><span>Accounting</span><strong>Record a business transaction</strong><ArrowRight size={16} aria-hidden="true"/></a>
      <a href="#simulations/quant"><span>Quantitative Finance</span><strong>Test a trading strategy</strong><ArrowRight size={16} aria-hidden="true"/></a>
      <a href="#day/consulting-operations-supply-chain-consulting"><span>Operations Consulting</span><strong>Solve a client delivery problem</strong><ArrowRight size={16} aria-hidden="true"/></a>
     </div>
    </div>
    <p className="ac-meta">Fictional training data · No experience or account required</p>
   </div>
   <CareerPreview/>
  </section>
  <FounderCareerIntro/>
  <section className="fs-first-steps" aria-labelledby="fs-first-steps-title"><div className="fs-first-steps-heading"><p className="ac-eyebrow">A simple way in</p><h2 id="fs-first-steps-title">Start with curiosity. Build with practice.</h2><p>Three small steps. No finance background needed.</p></div><div className="fs-first-steps-list"><a href="#start"><span>01 / DISCOVER</span><strong>Find your starting point</strong><p>Answer three questions. Get a path that fits your interests.</p><ArrowRight size={18}/></a><a href="#start/desk"><span>02 / PRACTICE</span><strong>Make a real decision</strong><p>Compare a trade, reconcile records, and handle an exception.</p><ArrowRight size={18}/></a><a href="#my-learning"><span>03 / GROW</span><strong>Keep your progress</strong><p>Pick up lessons and work samples from this device.</p><ArrowRight size={18}/></a></div></section>
  <section className="fs-home-careers" aria-label="Explore career paths"><div className="fs-editorial-row"><div><p className="ac-eyebrow">Find the work that interests you</p><h2>There’s more than <br/>one way in.</h2></div><div><p>Follow money through a business, investigate a mismatch, analyze data, or help a client solve a problem. Career profiles show the work and the tradeoffs.</p><div className="ac-actions"><LinkButton to="careers" secondary>Explore finance careers</LinkButton><LinkButton to="careers/consulting" secondary>Explore consulting careers</LinkButton></div><a className="ac-text-link" href="#quiz">Not sure yet? Try the career discovery quiz →</a></div></div><CareerCategories/></section>
  <section className="ac-section"><div className="ac-section-heading"><div><p className="ac-eyebrow">Build a foundation</p><h2>Foundations for every career.</h2></div><a className="ac-text-link" href="#learn">All learning paths →</a></div><FoundationDirectory/><details className="fs-shared-tracks"><summary>Browse the four shared foundation tracks</summary><div className="fs-path-list">{TRACKS.map((t,i)=>{const ls=LESSONS.filter(l=>l.track===t.id&&l.level==='Beginner');const done=ls.filter(l=>progress.lessons[l.id]?.completed).length;return <a key={t.id} href={`#learn/${t.id}`}><span className="ac-index">0{i+1}</span><h3>{t.title}</h3><p>{t.description}</p><span className="ac-meta">{done?`${done} / ${ls.length} beginner lessons complete`:'Beginner to advanced'}</span><ArrowRight size={18}/></a>;})}</div></details></section>
  <section className="fs-consulting-feature"><div><p className="ac-eyebrow">Try a client problem</p><h2>Why are the deliveries late?</h2><p>A retailer spends four days waiting for pickup. Investigate the handoff, calculate the effect of a change, and decide what a pilot should measure.</p><LinkButton to="day/consulting-operations-supply-chain-consulting">Try the consulting work sample</LinkButton></div><div className="fs-process-note"><p className="ac-eyebrow">Operations & supply chain consulting</p><ol><li><span>01</span><div><strong>Understand the problem</strong><p>Look at where the order spends its time.</p></div></li><li><span>02</span><div><strong>Compare the options</strong><p>Consider speed, cost, and service quality.</p></div></li><li><span>03</span><div><strong>Recommend a next step</strong><p>Use evidence and explain what to test.</p></div></li></ol></div></section>
  <section className="fs-editorial-row fs-tools-section"><div><p className="ac-eyebrow">Your learning toolkit</p><h2>A place to practice. <br/>Room to ask questions.</h2></div><div className="fs-utility-links">{[['start/desk','First day on the operations desk','Solve three short matching, reconciliation, and exception-management tasks.'],['simulations','Practice workspaces','Compare records, investigate exceptions, and work with business numbers.'],['resume-match','Resume match','Upload your resume and describe what you want to explore.'],['my-learning','My learning','Resume lessons and see the work you have completed.'],['glossary','Plain-English glossary','Read definitions and examples without losing your place.']].map(([to,title,description])=><a key={to} href={`#${to}`}><div><h3>{title}</h3><p>{description}</p></div><ArrowRight size={17}/></a>)}</div></section>
  <section className="ac-next"><div><p className="ac-eyebrow">Take your first seat</p><h2>You can start with one question.</h2><p>Use Ask First Seat for help with a term or a lesson, or take a short guided tour of the website.</p></div><button className="ac-button secondary" onClick={onTour}>Show me around</button></section>
 </div>;
}

const FOUNDER_EXPERIENCES = [
  {
    "organization": "First Seat Academy",
    "role": "Founder",
    "date": "Oct 2026 – Present",
    "detail": "Built a free platform where beginners can explore finance and consulting careers through lessons and realistic work samples.",
    "logo": "/first-seat-logo.svg"
  },
  {
    "organization": "Goldman Sachs",
    "role": "Incoming Operations Summer Analyst",
    "date": "Summer 2027 · New York",
    "detail": "Incoming analyst in FICC & Equities / Sales & Trading Operations.",
    "logo": "/journey/orgs/goldman.svg"
  },
  {
    "organization": "National Society of Black Engineers · NYU",
    "role": "Finance Chair",
    "date": "May 2026 – Present",
    "detail": "Manage chapter budgeting and funding to support student programming and events.",
    "logo": "/journey/orgs/nsbe.png"
  },
  {
    "organization": "NYU Tandon School of Engineering",
    "role": "Undergraduate Teaching Assistant",
    "date": "Aug 2025 – Present",
    "detail": "Support engineering students with technical assignments, labs, and hands-on instruction.",
    "logo": "/journey/orgs/nyu.svg"
  },
  {
    "organization": "Bissapio",
    "role": "Founding Team Member · Strategy & Operations",
    "date": "Jun 2022 – Present",
    "detail": "Help grow a West African hibiscus beverage brand through operations, strategy, and community-focused initiatives.",
    "logo": "/journey/orgs/bissapio-logo.png"
  },
  {
    "organization": "NYU Vertically Integrated Projects",
    "role": "Tech Catalyst · Innovation & Emerging Products",
    "date": "Jan 2026 – Present",
    "detail": "Work on emerging technology research, product development, and collaborative student projects.",
    "logo": "/journey/orgs/nyu-vip.webp"
  },
  {
    "organization": "Handshake AI",
    "role": "Artificial Intelligence Researcher",
    "date": "Jan – Sep 2026",
    "detail": "Evaluated reasoning and automation behavior in AI research tasks.",
    "logo": "/journey/orgs/handshake.svg"
  },
  {
    "organization": "Same Day Delivery",
    "role": "Strategy & Operations Intern",
    "date": "Jun – Aug 2026",
    "detail": "Improved hiring workflows and explored logistics technology for a fleet of more than 100 vehicles.",
    "logo": "/journey/orgs/same-day-delivery-official.png"
  },
  {
    "organization": "BGO × Project Destined",
    "role": "AI Commercial Real Estate Fellow",
    "date": "Feb – May 2026",
    "detail": "Used data and AI tools to study commercial real estate investment portfolios.",
    "logo": "/journey/orgs/bgo.svg"
  },
  {
    "organization": "Project Destined",
    "role": "Asset Management Program",
    "date": "Jan – May 2026",
    "detail": "Studied how real estate investments are managed and how property performance is evaluated.",
    "logo": "/journey/orgs/destined.png"
  },
  {
    "organization": "Project Destined",
    "role": "Real Estate Private Equity Intern",
    "date": "Sep – Oct 2025",
    "detail": "Built foundational skills in private equity and commercial real estate analysis.",
    "logo": "/journey/orgs/destined.png"
  },
  {
    "organization": "Beats by Dre × Extern",
    "role": "Marketing & Brand Strategy Extern",
    "date": "Jun – Jul 2025",
    "detail": "Researched Gen Z consumer insights, product innovation, and digital engagement.",
    "logo": "/journey/orgs/beats-symbol.webp"
  },
  {
    "organization": "Ubiq",
    "role": "Insider Program",
    "date": "Apr – May 2025",
    "detail": "Explored product management, business strategy, and operations.",
    "logo": null
  },
  {
    "organization": "EY",
    "role": "Expedition EY Program",
    "date": "Jan – May 2025",
    "detail": "Participated in professional development and learned about business career pathways.",
    "logo": "/journey/orgs/ey.png"
  },
  {
    "organization": "GO Project",
    "role": "Go Getter Intern",
    "date": "Jun – Aug 2024",
    "detail": "Supported fifth-grade students in English-language and mathematics learning.",
    "logo": "https://assets.classy.org/33417895/9f9a3208-a8f1-11ef-a102-0e6a9168ca03.png"
  }
];

function FounderCareerIntro(){
 return <section id="my-story" className="fs-founder-career" aria-labelledby="fs-founder-career-title">
  <div className="fs-founder-career-intro">
   <div className="fs-founder-career-copy">
    <p className="ac-eyebrow">Meet the founder</p>
    <h2 id="fs-founder-career-title">From Brooklyn to finance. <em>Here’s my story.</em></h2>
    <p className="fs-founder-career-lead">I’m Alpha Soumaré, a student at NYU Tandon and the founder of First Seat Academy.</p>
    <p>I grew up on Greene Avenue in Brooklyn, raised by immigrant parents who came to the United States to build a better future for our family. Growing up, I wasn’t surrounded by people working on Wall Street, in consulting, or at major technology companies. I didn’t have many people I could turn to who could explain what an investment banker, financial analyst, or consultant actually did, let alone how to become one.</p>
    <p>As I got older and eventually made my way to NYU Tandon, I started exploring these industries through internships, professional programs, and conversations with people working in finance and technology. Those experiences opened my eyes to careers I barely knew existed growing up. I realized that talent and ambition aren’t always the problem. Sometimes, students simply don’t know what opportunities are out there or where to begin.</p>
    <p>That’s why I created <strong>First Seat Academy</strong>. I wanted to build the resource I wish I had growing up in Brooklyn: a free platform where students, especially those from immigrant families and communities with limited corporate exposure, can explore careers, understand financial concepts in simple language, and experience what the work actually looks like before choosing a path.</p>
    <p><strong>Because your background shouldn’t determine which opportunities you get to discover.</strong></p>
    <a className="ac-text-link" href="#my-experience">Explore my experience <ArrowDown size={16}/></a>
   </div>
   <figure className="fs-founder-career-portrait">
    <img src="/journey/alpha-soumare-story.jpg" alt="Alpha Soumaré speaking with other students at a professional event" width={512} height={512} loading="lazy" decoding="async"/>
    <figcaption>Alpha Soumaré <span>Founder · First Seat Academy</span></figcaption>
   </figure>
  </div>
  <div className="fs-founder-experience" id="my-experience">
   <div className="fs-founder-experience-header">
    <div><p className="ac-eyebrow">My experience</p><h3>Learning by doing.</h3></div>
    <p>From teaching and building businesses to finance, technology, investing, and operations, here’s the work that shaped First Seat Academy.</p>
    <span>15 roles and programs</span>
   </div>
   <div className="fs-founder-experience-list">
    {FOUNDER_EXPERIENCES.map(item=><article className="fs-founder-experience-item" key={item.organization+item.role}>
     <CompanyMark name={item.organization} logo={item.logo}/>
     <div className="fs-founder-experience-content">
      <p className="fs-founder-experience-date">{item.date}</p>
      <h4>{item.organization}</h4>
      <strong>{item.role}</strong>
      <p>{item.detail}</p>
     </div>
    </article>)}
   </div>
  </div>
 </section>;
}

function CompanyMark({name,logo}:{name:string;logo:string|null}){
 const [imageError,setImageError]=useState(false);
 const treatment=name==='NYU Tandon School of Engineering'?'nyu':name==='Project Destined'?'destined':name==='BGO × Project Destined'?'wide':name==='Same Day Delivery'?'wide':name==='Beats by Dre × Extern'?'beats':name==='GO Project'?'go-project':name==='Ubiq'?'ubiq':name==='Goldman Sachs'?'goldman':name==='Bissapio'?'bissapio':'standard';
 const fallback=name==='Beats by Dre × Extern'?'beats':name==='Ubiq'?'Ubiq':name==='GO Project'?'GO':name==='Goldman Sachs'?'GS':name==='National Society of Black Engineers · NYU'?'NSBE':name.split(' ').slice(0,2).map(word=>word[0]).join('').toUpperCase();
 return <div className={`fs-founder-experience-mark is-${treatment}`} aria-hidden="true">
  {logo&&!imageError?<img src={logo} alt="" width={96} height={64} loading="lazy" decoding="async" onError={()=>setImageError(true)}/>:<span>{fallback}</span>}
 </div>;
}
