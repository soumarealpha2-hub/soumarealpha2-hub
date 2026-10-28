import {CAREERS,DIMS,DIMENSIONS,type Dimension,type Profile} from './careers';
export type Option={label:string;scores:Partial<Profile>};
export type AssessmentQuestion={id:string;category:string;prompt:string;kind:'single'|'multi'|'scale'|'rank';options:Option[];hint?:string;skill?:string};
const o=(label:string,scores:Partial<Profile>):Option=>({label,scores});
const q=(id:string,category:string,prompt:string,kind:AssessmentQuestion['kind'],options:Option[],hint?:string):AssessmentQuestion=>({id,category,prompt,kind,options,hint});
const scale=(id:string,category:string,prompt:string,scores:Partial<Profile>,reverse=false)=>q(id,category,prompt,'scale',['Strongly disagree','Disagree','Mixed / unsure','Agree','Strongly agree'].map((s,i)=>o(s,Object.fromEntries(Object.keys(scores).map(d=>[d,reverse?4-i:i])))));
// A focused career-discovery quiz. Keep enough variety for useful, exploratory comparisons.
const SHORT_QUIZ_IDS=new Set(['problem','reward','curiosity','coding','rhythm','reading','decade','boundaries']);
export const QUESTIONS:AssessmentQuestion[]=[
 q('problem','Working style','A project stalls because two reports disagree. What do you do first?','single',[o('Trace the figures back to their sources.',{analysis:4,detail:4,people:1,strategy:2}),o('Bring the contributors together to understand the difference.',{analysis:2,detail:2,people:4,strategy:3}),o('Map the process and find where the handoff failed.',{analysis:3,detail:3,people:2,strategy:4}),o('Write a small check to locate the mismatch.',{analysis:4,detail:3,people:1,strategy:2,code:4})]),
 q('reward','Motivation','Which outcomes would make a week feel worthwhile? Choose up to three.','multi',[o('Helping someone make a clearer decision.',{people:4,strategy:3}),o('Discovering a pattern in messy evidence.',{analysis:4,quant:3}),o('Making a process reliable.',{detail:4,risk:0}),o('Helping a young business grow.',{enterprise:4,strategy:4}),o('Building a tool that others can use.',{code:4,strategy:3})]),
 scale('persuasion','Communication','I enjoy explaining a recommendation and responding to thoughtful pushback.',{people:4}),
 q('curiosity','Interests','You have an afternoon to investigate something. Which question draws you in?','single',[o('Why is this company losing cash despite growing sales?',{analysis:4,enterprise:4,markets:1}),o('Why did prices move after new information?',{analysis:3,markets:4,enterprise:1}),o('Why are these records failing to match?',{analysis:4,detail:4,markets:2}),o('What makes customers stay with a product?',{strategy:4,enterprise:4,people:3})]),
 scale('math','Technical interests','I would enjoy spending time understanding a difficult mathematical idea.',{quant:4}),
 scale('coding','Willingness to learn','I would be willing to learn programming, including debugging mistakes.',{code:4}),
 scale('predictable','Lifestyle','Having a predictable schedule is a major priority for me.',{lifestyle:4}),
 q('structure','Working style','Which assignment format helps you do your best work?','single',[o('Clear steps, evidence standards, and a definite deadline.',{detail:4,strategy:1,risk:1}),o('A broad question with space to design the approach.',{strategy:4,risk:4,detail:2}),o('An evolving brief shaped through conversations.',{people:4,strategy:3,risk:3}),o('A measurable problem I can model and test.',{quant:4,analysis:4,strategy:2})]),
 q('future','Long-term direction','Rank these future responsibilities from most to least appealing.','rank',[o('Lead a team and develop other people.',{leadership:4,people:4}),o('Become a deeply skilled technical expert.',{quant:4,code:4}),o('Advise people on important decisions.',{people:4,strategy:3}),o('Allocate resources to promising businesses.',{enterprise:4,risk:4})]),
 q('startup','Interests','A friend shows you a new business idea. What would you most want to investigate?','single',[o('Whether customers need it and will pay.',{enterprise:4,strategy:4,people:3}),o('Whether the numbers and cash needs hold together.',{analysis:4,detail:4,enterprise:3}),o('Whether the underlying technology can work.',{code:4,quant:3,enterprise:2}),o('Whether the operating process can be reliable.',{detail:4,strategy:3,risk:1})]),
 q('deadlines','Work environment','Several deadlines arrive together. Which approach feels most natural?','single',[o('Triage impact, set owners, and communicate risks.',{pace:4,people:4,detail:3}),o('Protect time for the highest-value analysis.',{analysis:4,pace:2,people:1}),o('Use a checklist and escalate conflicts early.',{detail:4,risk:1,pace:2}),o('Reframe the plan with the team as new information arrives.',{strategy:4,people:4,pace:3})]),
 scale('model','Technical interests','I would enjoy building a spreadsheet where assumptions connect to a business forecast.',{analysis:4,enterprise:4,detail:4}),
 q('rhythm','Work environment','Which work rhythm appeals most?','single',[o('A few deep projects over several weeks.',{pace:0,analysis:4,lifestyle:3}),o('Frequent decisions with immediate feedback.',{pace:4,risk:4,markets:4}),o('A regular cycle with clear review checkpoints.',{pace:1,detail:4,lifestyle:4}),o('A mix of meetings, analysis, and changing priorities.',{pace:3,people:4,strategy:3})]),
 q('values','Motivation','Rank what you would prioritize when comparing two otherwise similar roles.','rank',[o('Intellectual challenge and learning.',{quant:4,analysis:4}),o('Time predictability and stability.',{lifestyle:4,risk:0}),o('Building something with long-term impact.',{enterprise:4,strategy:4}),o('Leadership opportunity and performance-linked upside.',{leadership:4,risk:4})]),
 scale('clients','Communication','Regular client or stakeholder conversations would energize me.',{people:4}),
 scale('uncertainty','Judgment','I am comfortable making a reversible decision with incomplete evidence, then updating it.',{risk:4}),
 q('break','Problem solving','A transaction is delayed and the cause is unclear. What part would you enjoy?','single',[o('Following each record until I identify the cause.',{detail:4,analysis:4,risk:1}),o('Coordinating the people who can resolve it.',{people:4,leadership:4,pace:3}),o('Building an automated check to prevent repeats.',{code:4,strategy:4,detail:3}),o('Assessing the wider financial exposure.',{quant:3,analysis:4,markets:4})]),
 q('reading','Interests','Which two or three topics would you choose to read about?','multi',[o('How businesses compete and grow.',{enterprise:4,strategy:4}),o('Why markets change.',{markets:4,risk:3}),o('How software and data tools work.',{code:4,quant:3}),o('How financial records tell a business story.',{detail:4,analysis:4}),o('How people make important decisions.',{people:4,strategy:3})]),
 q('develop','Learning goals','Choose up to three skills you would like to build, regardless of your current ability.','multi',[o('Programming and data analysis.',{code:4,quant:4}),o('Presenting ideas and advising others.',{people:4,leadership:3}),o('Financial modeling and investigation.',{analysis:4,detail:4}),o('Product and business strategy.',{enterprise:4,strategy:4}),o('Process design and risk controls.',{detail:4,risk:0})]),
 q('decade','Long-term direction','What would you most like your professional responsibilities to include in ten years?','single',[o('Leading an organization or building a business.',{leadership:4,enterprise:4,strategy:4}),o('Being the expert others consult on difficult models.',{quant:4,code:4,analysis:4,leadership:1}),o('Developing trusted client relationships.',{people:4,leadership:3,enterprise:3}),o('Overseeing reliable reporting and sound controls.',{detail:4,risk:0,leadership:3})]),
 q('quality','Working style','A polished presentation contains one number you cannot substantiate. What work appeals to you?','single',[o('Trace and verify the calculation.',{detail:4,analysis:4}),o('Explain the uncertainty clearly to its audience.',{people:4,strategy:3}),o('Design a review process to catch it next time.',{strategy:4,detail:4}),o('Build a test that checks related figures too.',{code:4,detail:4})]),
 scale('rapid','Work environment','Frequent, time-sensitive changes would keep me engaged.',{pace:4}),
 q('collaboration','Communication','Rank the types of collaboration you would most enjoy.','rank',[o('Discuss a client’s needs and propose options.',{people:4,enterprise:3}),o('Review a technical model with a small team.',{quant:4,code:3}),o('Coordinate a process across several teams.',{people:3,detail:4,leadership:3}),o('Debate a business strategy using evidence.',{strategy:4,analysis:4,enterprise:4})]),
 q('uncertain-data','Judgment','An early experiment looks promising but the dataset is small. What interests you most?','single',[o('Find out whether the result holds in a new sample.',{analysis:4,quant:4,detail:4}),o('Design a limited trial with clear stop conditions.',{strategy:4,risk:3}),o('Understand who would use the result and why.',{people:4,enterprise:4}),o('Document the evidence limits before proceeding.',{detail:4,risk:0})]),
 q('tradeoffs','Motivation','Which job features would you actively seek? Choose up to three.','multi',[o('A stable schedule most weeks.',{lifestyle:4}),o('Exposure to changing markets.',{markets:4,pace:4}),o('Room to build new products or businesses.',{enterprise:4,strategy:4}),o('Deep technical study.',{quant:4,code:4}),o('Frequent relationships and team leadership.',{people:4,leadership:4})]),
 q('review','Working style','Rank the parts of a team deliverable you would most like to own.','rank',[o('Validate the evidence and calculations.',{detail:4,analysis:4}),o('Build the analytical tool.',{code:4,quant:4}),o('Develop the recommendation.',{strategy:4,enterprise:4}),o('Present and coordinate next steps.',{people:4,leadership:4})]),
 q('proficiency','Current experience','Which tools have you already practiced? Select any that apply.','multi',[o('Spreadsheets and formulas.',{}),o('Programming or SQL.',{}),o('Financial statements.',{}),o('Presentations or stakeholder discussions.',{}),o('I am starting from the basics.',{})],'This helps choose a starting lesson. It does not lower career alignment scores.'),
 q('support','Learning preferences','What would help you learn an unfamiliar topic? Choose up to three.','multi',[o('A worked example before I try.',{}),o('A short reading with definitions.',{}),o('A dataset or tool to experiment with.',{}),o('A realistic scenario with feedback.',{})],'Used for learning advice, not career ranking.'),
 q('impact','Motivation','Which contribution feels most meaningful to you?','single',[o('Help a business fund and execute a growth plan.',{enterprise:4,strategy:4,people:3}),o('Help people make informed financial decisions.',{people:4,analysis:3}),o('Make a complex system more reliable.',{detail:4,code:3,risk:0}),o('Discover a useful idea through research.',{analysis:4,quant:4,strategy:3})]),
 q('boundaries','Lifestyle','A role is intellectually exciting but its busy periods are unpredictable. Which is closest to your preference?','single',[o('I would seek a more predictable role.',{lifestyle:4,pace:1}),o('I would consider it if busy periods are limited and planned.',{lifestyle:3,pace:2}),o('I could accept unpredictability for work I enjoy.',{lifestyle:1,pace:4}),o('I am unsure and would want to try the work first.',{lifestyle:2,pace:2})]),
].filter(question=>SHORT_QUIZ_IDS.has(question.id));
export type Answers=Record<string,number[]>;
export function validAnswer(question:AssessmentQuestion,value:unknown):number[]{
 if(!Array.isArray(value))return [];
 const a=[...new Set(value.filter((n):n is number=>Number.isInteger(n)&&n>=0&&n<question.options.length))];
 return a.slice(0,question.kind==='rank'?question.options.length:question.kind==='multi'?question.id==='proficiency'?5:3:1);
}
export function answerVector(question:AssessmentQuestion,answer:number[]):Partial<Profile>{
 const a=validAnswer(question,answer);if(!a.length||question.kind==='rank'&&a.length!==question.options.length)return {};
 const axes=[...new Set(question.options.flatMap(o=>Object.keys(o.scores)))] as Dimension[];
 return Object.fromEntries(axes.map(d=>{
  if(question.kind==='rank'){
   // Compare the position of options that positively express each preference.
   const scored=a.map((n,i)=>({strength:question.options[n].scores[d]??0,value:4*(a.length-1-i)/(a.length-1)})).filter(x=>x.strength>0);
   return [d,scored.length?scored.reduce((s,x)=>s+x.value*x.strength,0)/scored.reduce((s,x)=>s+x.strength,0):2];
  }
  return [d,a.reduce((s,n)=>s+(question.options[n].scores[d]??2),0)/a.length];
 }));
}
export type CareerScope='all'|'finance'|'consulting';
export function careerScope(value:unknown):CareerScope{return value==='finance'||value==='consulting'?value:'all';}
export function assess(answers:Answers,scope:unknown='all'){
 const observations=Object.fromEntries(DIMS.map(d=>[d,[] as number[]])) as Record<Dimension,number[]>;
 let answered=0;
 for(const question of QUESTIONS){const a=validAnswer(question,answers[question.id]);if(!a.length||question.kind==='rank'&&a.length!==question.options.length)continue;answered++;
  for(const [d,value] of Object.entries(answerVector(question,a)))observations[d as Dimension].push(value);
 }
 const profile=Object.fromEntries(DIMS.map(d=>[d,observations[d].length?observations[d].reduce((a,b)=>a+b,0)/observations[d].length:2])) as Profile;
 const covered=DIMS.filter(d=>observations[d].length>=2);
 const enough=answered>=6&&covered.length>=4;
 const ranked=enough?CAREERS.filter(c=>scope==='consulting'?c.category==='Consulting':scope==='finance'?c.category!=='Consulting':true).map(c=>{let distance=0,weights=0;for(const d of DIMS){if(!observations[d].length)continue;const w=c.weights[d];distance+=w*Math.abs(profile[d]-c.profile[d])/4;weights+=w;}
  const score=Math.round(100*(1-distance/weights));
  const reasons=covered.filter(d=>profile[d]>=2.6&&c.profile[d]>=3).sort((a,b)=>profile[b]-profile[a]).slice(0,3);
  const tradeoffs=covered.filter(d=>Math.abs(profile[d]-c.profile[d])>=1.1).sort((a,b)=>Math.abs(profile[b]-c.profile[b])-Math.abs(profile[a]-c.profile[a])).slice(0,2);
  return {career:c,score,reasons,tradeoffs};
 }).sort((a,b)=>b.score-a.score||a.career.title.localeCompare(b.career.title)):[];
 const mixed=covered.filter(d=>{const v=observations[d];return v.length>=3&&v.some(n=>n>=3.5)&&v.some(n=>n<=.5);});
 return {profile,answered,covered,ranked,mixed,enough,themes:covered.filter(d=>profile[d]>=2.7).sort((a,b)=>profile[b]-profile[a]).slice(0,4).map(d=>DIMENSIONS[d])};
}
