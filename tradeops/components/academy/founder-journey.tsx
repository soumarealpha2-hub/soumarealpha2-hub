import {LinkButton} from './common';

const JOURNEY=[
 {place:'Greene Avenue',detail:'Brooklyn, New York',label:'Where I grew up'},
 {place:'Excellence Boys',detail:'My school journey began here.',label:'My foundation'},
 {place:'Uncommon Charter High School',detail:'The next chapter of my education.',label:'Moving forward'},
 {place:'NYU Tandon',detail:'Business & Technology Management',label:'Where I study today'}
];
export function FounderJourney(){return <section className="ac-founder" aria-labelledby="founder-title">
 <div className="ac-founder-intro"><p className="ac-eyebrow">Why I built TradeOps Academy</p><h2 id="founder-title">From Brooklyn.<br/>Built to open doors.</h2><div><p>I’m Alpha Soumaré. Growing up on Greene Avenue in Brooklyn, I didn’t always have the resources or exposure to understand the world of finance. I started exploring its career paths later than I would have liked.</p><p>I built TradeOps Academy for people who are curious about finance but don’t know where to begin, or aren’t sure there’s a place for them in it.</p></div></div>
 <p className="ac-eyebrow ac-journey-label">My journey</p><ol className="ac-founder-roadmap">{JOURNEY.map((step,i)=><li key={step.place}><span className="ac-founder-stop" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><small>{step.label}</small><h3>{step.place}</h3><p>{step.detail}</p></li>)}</ol>
 <div className="ac-founder-purpose"><p>Your starting point shouldn’t decide how far you can go. Explore a career, learn the basics, and try the work at your own pace.</p><LinkButton to="quiz" secondary>Find your starting point</LinkButton></div>
 </section>;}
