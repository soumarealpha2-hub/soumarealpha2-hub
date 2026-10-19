'use client';
import {useId,useState, type CSSProperties} from 'react';

type Role={title:string;date:string;type:string;location:string;detail:string};
type Companion={name:string;short:string;logo:string;roles:Role[]};
const role=(title:string,date:string,type:string,location:string,detail:string):Role=>({title,date,type,location,detail});
const ORGS:Companion[]=[
 {name:'First Seat Academy',short:'First Seat',logo:'/first-seat-logo.svg',roles:[role('Founder','Oct 2026 – Present','Full-time','New York · On-site','Free interactive simulations for aspiring finance professionals.')]},
 {name:'Goldman Sachs',short:'Goldman Sachs',logo:'goldman.svg',roles:[role('Incoming 2027 Operations Summer Analyst','Incoming · Summer 2027','Internship','New York · On-site','Global Banking & Markets.')]},
 {name:'National Society of Black Engineers',short:'NSBE',logo:'nsbe.png',roles:[role('Finance Chair','May 2026 – Present','Full-time','New York · On-site','NYU Chapter.')]},
 {name:'NYU Tandon School of Engineering',short:'NYU Tandon',logo:'nyu.svg',roles:[role('General Engineering Undergraduate Teaching Assistant','Aug 2025 – Present','Full-time','Brooklyn · On-site','Intro to Engineering and Design.')]},
 {name:'Bissapio',short:'Bissapio',logo:'bissapio-logo.png',roles:[role('Founding Team Member','Jun 2022 – Present','Part-time','New York · On-site','Back-end strategy and operations.')]},
 {name:'NYU Vertically Integrated Projects (VIP)',short:'NYU VIP',logo:'nyu.svg',roles:[role('Tech Catalyst – Innovation and Emerging Products','Jan 2026 – Present','Part-time','New York · On-site','Optics Team: venture insights, emerging technology research and development.')]},
 {name:'Handshake AI',short:'Handshake AI',logo:'handshake.svg',roles:[role('Artificial Intelligence Researcher','Jan 2026 – Sep 2026','Part-time','','Project Hedgehong / LLM research: logic gaps and automation.')]},
 {name:'Same Day Delivery Inc.',short:'Same Day Delivery',logo:'same-day-delivery-official.png',roles:[role('Strategy and Operations Intern','Jun 2026 – Aug 2026','Internship','United States · Hybrid','AI-driven logistics and fleet technology development.')]},
 {name:'BGO × Project Destined',short:'BGO × Project Destined',logo:'bgo.svg',roles:[role('AI Commercial Real Estate Fellow','Feb 2026 – May 2026','Part-time','New York · Hybrid','Joint fellowship with BGO and Project Destined, focused on AI in industrial and commercial real estate.')]},
 {name:'Project Destined',short:'Project Destined',logo:'destined.png',roles:[role('Asset Management Program','Jan 2026 – May 2026','Part-time','New York City metropolitan area · Remote','Asset management and development fundamentals.'),role('Real Estate Private Equity Intern','Sep 2025 – Oct 2025','Internship','United States · Remote','Real estate private equity fundamentals.')]},
 {name:'Beats by Dre × Extern',short:'Beats by Dre × Extern',logo:'beats.png',roles:[role('Marketing and Brand Strategy Extern','Jun 2025 – Jul 2025','Externship','United States','Joint program with Beats by Dre and Extern, focused on Gen Z-driven product innovation and digital engagement.')]},
 {name:'Ubiq',short:'Ubiq',logo:'ubiq-official.png',roles:[role('Insider Program','Apr 2025 – May 2025','Apprenticeship','New York · Hybrid','Product management, strategy and operations.')]},
 {name:'EY',short:'EY',logo:'ey.png',roles:[role('Expedition EY Program','Jan 2025 – May 2025','Apprenticeship','New York · Remote','Professional development.')]},
 {name:'GO Project',short:'GO Project',logo:'https://assets.classy.org/33417895/9f9a3208-a8f1-11ef-a102-0e6a9168ca03.png',roles:[role('Go Getter Intern','Jun 2024 – Aug 2024','Internship','United States · On-site','Fifth-grade English language and math development.')]}
];
function OrgMark({org}:{org:Companion}){
 const [failed,setFailed]=useState(false);const clipId=useId();
 if(org.logo==='ubiq-official.png'&&!failed)return <svg viewBox="435 75 650 305" width={76} height={52} style={{display:'block',width:'100%',height:'100%',overflow:'visible'}} aria-hidden="true"><defs><clipPath id={clipId}><path d="M449 228 L541 136 H587 V181 H633 V136 H679 V182 L701 161 V90 H748 V136 H840 V183 L875 136 H921 V183 L968 136 H1070 V274 L978 366 H871 V321 L826 366 H771 V277 L682 366 H449 Z"/></clipPath></defs><image href="/journey/orgs/ubiq-official.png" width="1519" height="1170" clipPath={`url(#${clipId})`}/></svg>;
 if(org.logo==='bissapio-logo.png'&&!failed)return <svg viewBox="140 90 830 850" width={76} height={52} style={{display:'block',width:'100%',height:'100%'}} aria-hidden="true"><image href="/journey/orgs/bissapio-logo.png" width="1080" height="1080"/></svg>;
 return org.logo&&!failed?<img src={org.logo.startsWith('/')||org.logo.startsWith('https:')?org.logo:`/journey/orgs/${org.logo}`} style={org.logo==='same-day-delivery-official.png'||org.logo==='bissapio-logo.png'?{background:'#fff',borderRadius:6,padding:3,boxSizing:'border-box'}:undefined} alt="" width={76} height={52} loading="lazy" onError={()=>setFailed(true)}/>:<span className="fs-companion-monogram">{org.short}</span>;
}
export function JourneyCompanions(){
 const [selected,setSelected]=useState(0),[paused,setPaused]=useState(false);
 const org=ORGS[selected];
 return <section className={`fs-companions ${paused?'is-paused':''}`} aria-labelledby="companions-title">
  <div className="fs-companions-heading"><div><p className="ac-eyebrow">People, places & possibilities</p><h3 id="companions-title">Meet the characters in my career story.</h3><p>Every experience is another chapter. Tap a character to explore where I’ve been and what’s next.</p></div><button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?'Resume motion':'Pause motion'}</button></div>
  <div className="fs-companion-cast" aria-label="Organizations in Alpha’s experience">{ORGS.map((item,i)=><button type="button" key={item.name} aria-label={`Meet ${item.name}`} aria-pressed={selected===i} aria-controls="companion-experience" onClick={()=>setSelected(i)} className={`fs-companion ${selected===i?'is-selected':''}`} style={{'--delay':`${-i*.37}s`} as CSSProperties}>
   <span className="fs-companion-body" aria-hidden="true"><span className="fs-companion-arm"/><span className="fs-companion-badge"><OrgMark org={item}/></span><span className="fs-companion-eyes">••</span><span className="fs-companion-feet"/></span><strong>{item.short}</strong>{i===1&&<small>Incoming 2027</small>}
  </button>)}</div>
  <div id="companion-experience" className="fs-companion-experience" aria-live="polite" aria-atomic="true"><div className="fs-companion-profile"><span className="fs-companion-profile-logo"><OrgMark key={org.name} org={org}/></span><p className="ac-eyebrow">My experience</p><h4>{org.name}</h4></div><div className="fs-companion-roles">{org.roles.map(r=><article key={r.title}><p className="fs-companion-date">{r.date}</p><h4>{r.title}</h4><p className="fs-companion-meta">{[r.type,r.location].filter(Boolean).join(' · ')}</p><p>{r.detail}</p></article>)}</div></div>
 </section>;
}
