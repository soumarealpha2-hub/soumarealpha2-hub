import {GLOSSARY} from './learning-hub';
import {CAREERS} from './careers';
const words=(s:string)=>s.toLowerCase().match(/[a-z0-9]+/g)?.filter(w=>w.length>2&&!['what','does','this','that','with','about','tell','explain','please','would','could','have','the','and','for','how','are','can'].includes(w))??[];
export function learningAnswer(question:string,previousQuestion=''){
 const followUp=/\b(again|simpler|another example|different example|confused|don't understand|do not understand|what does that mean|more simply)\b/i.test(question);
 const lookup=followUp&&previousQuestion?previousQuestion:question;
 const q=words(lookup);const scored=GLOSSARY.map(t=>({t,score:q.reduce((n,w)=>n+(t.term.toLowerCase().includes(w)?4:0)+(t.meaning.toLowerCase().includes(w)?1:0),0)+(words(t.term).join(' ')===q.join(' ')?20:0)})).filter(x=>x.score>=4).sort((a,b)=>b.score-a.score).slice(0,3);
 const normal=(s:string)=>s.toLowerCase().replaceAll('&','and');const career=CAREERS.find(c=>normal(lookup).includes(normal(c.title)))??CAREERS.find(c=>c.category==='Consulting'&&normal(lookup).includes(normal(c.title).split(' and ')[0]));
 const links:{label:string;to:string}[]=[];let text='';
 if(career){text=`${career.title}\n\nIn everyday words: ${career.overview}\n\nWhat the job looks like: ${career.task}\n\nWhy it matters: The team uses this work to help a business or client make decisions and avoid mistakes.\n\nWant to see it for yourself? Open the practice task below.`;links.push({label:`Explore ${career.title}`,to:`careers/${career.id}`},{label:'Try a work sample',to:career.consulting?`day/${career.id}`:career.track==='operations'?'start/desk':`simulations/${career.track}`});}
 else if(scored.length){const {t}=scored[0];text=`${t.term}\n\nSimply put: ${t.meaning}\n\nReal-life example: ${t.example}\n\nWould you like a step-by-step example? You can also open the glossary to see the full professional explanation.`;links.push({label:'Browse the plain-English glossary',to:'glossary'});}
 else{text='I do not have a dependable answer for that in my learning notes. Try asking about a money word or a finance job, or explore a beginner lesson. If the AI connection is available, you can ask broader questions too.';links.push({label:'Explore learning tracks',to:'learn'},{label:'Explore finance careers',to:'careers'});}
 return {text,links,mode:'library' as const};
}
export function assistantContext(question:string){const answer=learningAnswer(question);return answer.text+`\n\nFirst Seat routes: #start beginner path; #careers ${CAREERS.length} profiles; #quiz career discovery; #learn lessons; #simulations practice workspaces; #cases applied cases; #glossary ${GLOSSARY.length} terms; #resume-match private local resume comparison. Treat all work samples as fictional education.`;}
