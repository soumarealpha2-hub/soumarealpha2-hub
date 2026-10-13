import {CAREERS,type Career} from './careers';
const SKILLS:Record<string,string[]>={
 excel:['excel','spreadsheets','spreadsheet'],modeling:['financial modeling','financial modelling','valuation','dcf','lbo'],accounting:['accounting','journal entries','balance sheet','bookkeeping'],analysis:['analysis','analytical','research','data analysis'],python:['python'],sql:['sql'],coding:['javascript','typescript','c++','java','software','programming'],statistics:['statistics','statistical','probability','regression'],communication:['presentation','presentations','communication','client','stakeholder'],operations:['operations','reconciliation','settlement','workflow'],controls:['control','controls','compliance','risk','audit'],business:['strategy','startup','startups','entrepreneurship','product','business development'],credit:['credit','lending','debt','underwriting'],insurance:['insurance','actuarial','claims','reinsurance'],property:['property','real estate','mortgage'],markets:['trading','markets','portfolio','investment','investments'],planning:['budget','budgeting','forecast','forecasting','fp&a'],leadership:['leadership','led','managed','mentored','coordinated']
};
export const normalize=(s:string)=>s.toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9+#&]+/g,' ').trim();
function includesPhrase(text:string,phrase:string){return (` ${text} `).includes(` ${normalize(phrase)} `);}
export function roleSkills(c:Career){const n=c.title.toLowerCase();const common=['analysis','communication'];
 if(/insurance|actuarial|reinsurance/.test(n))return [...common,'insurance','statistics','excel'];
 if(/real estate|mortgage/.test(n))return [...common,'property','credit','modeling','excel'];
 if(/quant|data|electronic|cybersecurity|financial systems/.test(n))return [...common,'python','sql','coding','statistics'];
 if(/accounting|audit|tax|controllership/.test(n))return [...common,'accounting','excel','controls'];
 if(/planning|corporate finance|treasury$|cost accounting/.test(n))return [...common,'planning','excel','accounting'];
 if(/operations|settlement|reconciliation|office|collateral|margin|onboarding|fund administration|transfer agency|asset servicing|securities services|crime|sanctions|compliance|risk|examination|regulatory/.test(n))return [...common,'operations','controls','excel'];
 if(/credit|lending|banking|debt|trade finance/.test(n))return [...common,'credit','modeling','excel'];
 if(/venture|private equity|development|advisory|mergers/.test(n))return [...common,'business','modeling','excel'];
 if(/fintech|product|consulting/.test(n))return [...common,'business','coding','leadership'];
 return [...common,'markets','modeling','excel'];}
export type ResumeResult={career:Career;coverage:number;found:string[];missing:string[];evidence:{skill:string;line:string}[]};
const GOAL_ALIASES:Record<string,string[]>={
 'investment-banking':['investment banker','ib internship'],
 'venture-capital':['vc internship','venture capitalist'],
 'quantitative-research':['quant research','quant researcher'],
 'financial-planning-and-analysis':['fp&a'],
 'sales-and-trading-operations':['trade operations','trading operations'],
};
export function goalCareers(goal:string):Career[]{
 const text=normalize(goal);if(!text)return [];
 const exact=CAREERS.filter(c=>[c.title,...(GOAL_ALIASES[c.id]??[])].some(p=>includesPhrase(text,p)));
 // Prefer a complete specific role over a title contained inside that role.
 if(exact.length)return exact.filter(c=>!exact.some(other=>other!==c&&normalize(other.title).includes(normalize(c.title))));
 const generic=new Set(['finance','financial','and','of','the']);
 const tokens=text.split(' ').filter(t=>!generic.has(t)&&t.length>2);
 return CAREERS.filter(c=>normalize(c.title).split(' ').filter(t=>!generic.has(t)).some(t=>tokens.includes(t)));
}
export function matchResume(resume:string,job=''){
 const text=normalize(resume);const found=Object.keys(SKILLS).filter(k=>SKILLS[k].some(p=>includesPhrase(text,p)));
 const targets=goalCareers(job),targetIds=new Set(targets.map(c=>c.id));
 const rank=CAREERS.map(c=>{const skills=roleSkills(c);const matched=skills.filter(k=>found.includes(k));const evidence=matched.map(skill=>({skill,line:resume.split(/[\n.!?]/).find(line=>SKILLS[skill].some(p=>includesPhrase(normalize(line),p)))?.trim().slice(0,240)??''}));return {career:c,coverage:Math.round(matched.length/skills.length*100),found:matched,missing:skills.filter(k=>!matched.includes(k)),evidence};}).sort((a,b)=>Number(targetIds.has(b.career.id))-Number(targetIds.has(a.career.id))||b.coverage-a.coverage||a.career.title.localeCompare(b.career.title));
 const explicitSkills=job.trim()?Object.keys(SKILLS).filter(k=>SKILLS[k].some(p=>includesPhrase(normalize(job),p))):[];
 const jobSkills=[...new Set([...explicitSkills,...targets.flatMap(roleSkills)])];
 return {found,targets:targets.map(c=>c.title),rank:found.length||targets.length?rank.slice(0,5):[],job:jobSkills.length?{found:jobSkills.filter(k=>found.includes(k)),missing:jobSkills.filter(k=>!found.includes(k)),coverage:Math.round(jobSkills.filter(k=>found.includes(k)).length/jobSkills.length*100)}:null};
}
export const skillLabel=(s:string)=>({excel:'Excel / spreadsheets',modeling:'Financial modeling / valuation',sql:'SQL',python:'Python',coding:'Programming',statistics:'Statistics / probability',communication:'Communication / stakeholders',operations:'Operations / reconciliation',controls:'Risk / controls',business:'Business / product strategy',credit:'Credit / lending',property:'Property finance',markets:'Markets / investing',planning:'Budgeting / forecasting',leadership:'Leadership',analysis:'Analysis / research',accounting:'Accounting',insurance:'Insurance / actuarial'}[s]??s);
