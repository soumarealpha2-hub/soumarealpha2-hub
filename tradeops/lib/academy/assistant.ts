import {GLOSSARY} from './learning-hub';
import {CAREERS} from './careers';
import {employerGuide} from './employers';
const words=(s:string)=>s.toLowerCase().match(/[a-z0-9]+/g)?.filter(w=>w.length>2&&!['what','does','this','that','with','about','tell','explain','please','would','could','have','the','and','for','how','are','can'].includes(w))??[];
export function learningAnswer(question:string){
 const q=words(question);const scored=GLOSSARY.map(t=>({t,score:q.reduce((n,w)=>n+(t.term.toLowerCase().includes(w)?4:0)+(t.meaning.toLowerCase().includes(w)?1:0),0)})).filter(x=>x.score>=4).sort((a,b)=>b.score-a.score).slice(0,3);
 const career=CAREERS.find(c=>question.toLowerCase().includes(c.title.toLowerCase()));
 const links:{label:string;to:string}[]=[];let text='';
 if(career){const guide=employerGuide(career);text=`${career.title}\n${career.overview}\n\nTry the work: ${career.task}\n\nSkills to build: ${career.skills}.\nCompanies to explore: ${guide.firms.map(f=>f.name).join(', ')}. Actual role and team fit vary.`;links.push({label:`Explore ${career.title}`,to:`careers/${career.id}`},{label:'Try the career workspace',to:`career-lab/${career.id}`});}
 else if(scored.length){text=scored.map(({t})=>`${t.term}\n${t.meaning}\nExample: ${t.example}`).join('\n\n');links.push({label:'Browse the finance glossary',to:'glossary'});}
 else{text='I could not find a reliable answer in the First Seat learning library. Try naming a finance term or a career, or use the learning tracks. Open-ended AI answers are available when the AI connection is active.';links.push({label:'Explore learning tracks',to:'learn'},{label:'Explore finance careers',to:'careers'});}
 return {text,links,mode:'library' as const};
}
export function assistantContext(question:string){const answer=learningAnswer(question);return answer.text+'\n\nFirst Seat routes: #start beginner path; #careers 104 profiles; #quiz career discovery; #learn lessons; #simulations practice workspaces; #cases applied cases; #glossary 205 terms; #resume-match private local resume comparison. Treat all work samples as fictional education.';}
