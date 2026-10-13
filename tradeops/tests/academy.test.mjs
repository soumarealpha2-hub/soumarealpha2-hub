import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
// Compile pure domain modules for Node; production still uses Vite's TypeScript pipeline.
const dir=mkdtempSync(join(tmpdir(),'tradeops-domain-'));
for(const name of ['careers','assessment','models','lessons','trials','progress','career-tools','capstones','learning-hub','finance-glossary','employers']){
 const source=readFileSync(new URL(`../lib/academy/${name}.ts`,import.meta.url),'utf8');
 const out=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/from '(\.\/[^']+)'/g,"from '$1.mjs'");
 writeFileSync(join(dir,`${name}.mjs`),out.replace("from '../learning'", "from './legacy-learning.mjs'"));
}
writeFileSync(join(dir,'legacy-learning.mjs'),ts.transpileModule(readFileSync(new URL('../lib/learning.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText);
const {GLOSSARY,AFRICA_CASES,answerMatches,portfolioItems,portfolioMarkdown}=await import(pathToFileURL(join(dir,'learning-hub.mjs')));
const {employerGuide,personalEmployerFit}=await import(pathToFileURL(join(dir,'employers.mjs')));
const {CAREERS,DIMS}=await import(pathToFileURL(join(dir,'careers.mjs')));
const {QUESTIONS,assess,answerVector,validAnswer}=await import(pathToFileURL(join(dir,'assessment.mjs')));
const {dcf,DEFAULT_DCF,blackScholes,quantModel,TRANSACTIONS,statements,operatingForecast,lbo}=await import(pathToFileURL(join(dir,'models.mjs')));
const {LESSONS,roadmap}=await import(pathToFileURL(join(dir,'lessons.mjs')));
const {trialFor}=await import(pathToFileURL(join(dir,'trials.mjs')));
const {CAPSTONES,workbook,workbookCsv}=await import(pathToFileURL(join(dir,'capstones.mjs')));
const {CAREER_TOOLS,calculateTool,toolFor}=await import(pathToFileURL(join(dir,'career-tools.mjs')));
const {emptyProgress,parseProgress,serializeProgress}=await import(pathToFileURL(join(dir,'progress.mjs')));
process.on('exit',()=>rmSync(dir,{recursive:true,force:true}));
const close=(x,y,tol=1e-6)=>assert.ok(Math.abs(x-y)<=tol,`${x} != ${y}`);
function fictional(target){return Object.fromEntries(QUESTIONS.map(q=>{
 const distance=i=>Object.entries(answerVector(q,[i])).reduce((s,[key,v])=>s+(v-target[key])**2,0);
 if(q.kind==='rank'){
  const rank=q.options.map((o,i)=>({i,value:Object.entries(o.scores).reduce((s,[d,v])=>s+target[d]*v,0)})).sort((a,b)=>b.value-a.value).map(x=>x.i);return [q.id,rank];
 }
 return [q.id,[q.options.map((_,i)=>({i,d:distance(i)})).sort((a,b)=>a.d-b.d)[0].i]];
}));}
test('Expanded career profiles and 30 distinct questions map to functioning learning/trials',()=>{
 assert.ok(CAREERS.length>=100);assert.equal(new Set(CAREERS.map(c=>c.id)).size,CAREERS.length);assert.equal(QUESTIONS.length,30);assert.equal(new Set(QUESTIONS.map(q=>q.id)).size,30);assert.equal(new Set(LESSONS.map(l=>l.id)).size,LESSONS.length);
 for(const c of CAREERS){assert.ok(roadmap(c.track).length);assert.equal(trialFor(c).steps.length,3);assert.deepEqual(Object.keys(c.profile),DIMS);}
 for(const l of LESSONS){assert.ok(l.choices[l.answer]);assert.ok(Number.isFinite(l.practice.answer));}
});
test('insufficient or skipped evidence does not invent career results',()=>{assert.equal(assess({}).ranked.length,0);assert.equal(assess({math:[4]}).ranked.length,0);assert.equal(assess({math:[],coding:[]}).answered,0);});
test('contrasting fictional interests produce distinct recommendations and broad dimensions',()=>{
 const quant=fictional(CAREERS.find(c=>c.id==='quantitative-research').profile),ops=fictional(CAREERS.find(c=>c.id==='trade-reconciliation').profile),venture=fictional(CAREERS.find(c=>c.id==='venture-capital').profile);
 const results=[quant,ops,venture].map(a=>assess(a));
 for(const r of results){assert.equal(r.enough,true);assert.ok(r.covered.length>=10);assert.equal(r.ranked.length,CAREERS.length);assert.ok(r.ranked.every(x=>x.score>=0&&x.score<=100));}
 assert.ok(results[0].ranked.slice(0,5).some(r=>r.career.track==='quant'));
 assert.ok(results[1].ranked.slice(0,5).some(r=>r.career.track==='operations'||r.career.track==='accounting'));
 assert.notDeepEqual(results[0].ranked.slice(0,5).map(r=>r.career.id),results[2].ranked.slice(0,5).map(r=>r.career.id));
 console.log('Fictional profile leaders:',results.map(r=>r.ranked.slice(0,3).map(x=>x.career.title).join(', ')).join(' | '));
});
test('skill proficiency never changes career alignment and one answer cannot dominate',()=>{
 const a=fictional(CAREERS[0].profile),before=assess(a).ranked;
 assert.deepEqual(assess({...a,proficiency:[4],support:[0,2]}).ranked,before);
 const after=assess({...a,math:[a.math[0]===4?0:4]}).ranked;
 for(const x of before)assert.ok(Math.abs(x.score-after.find(y=>y.career.id===x.career.id).score)<12);
});
test('duplicate multiple selections, incomplete rankings, and invalid values are handled',()=>{
 const q=QUESTIONS.find(q=>q.id==='reward');assert.deepEqual(validAnswer(q,[1,1,-2,900,2]),[1,2]);
 const rank=QUESTIONS.find(q=>q.kind==='rank');assert.deepEqual(answerVector(rank,[1]),{});
 for(const v of Object.values(answerVector(rank,[3,2,1,0])))assert.ok(v>=0&&v<=4);
});
test('journal produces reconciled income, cash flows, and balance sheet',()=>{
 const entries=TRANSACTIONS.map(([,amount,debit,credit],transaction)=>({transaction,amount,debit,credit}));
 for(let i=0;i<=entries.length;i++){const s=statements(entries.slice(0,i));close(s.difference,0);close(s.cash,s.operating+s.investing+s.financing);}
 const s=statements(entries);assert.equal(s.cash,10700);assert.equal(s.income,2700);assert.equal(s.assets,14900);assert.equal(s.liabilities,2200);assert.equal(s.equity,12700);assert.equal(s.operating,1700);
});
test('three-statement model balances after changing revenue, costs, and investment',()=>{for(const inputs of [[4000,.4,500],[0,0,0],[15000,.8,4000],[300,.9,20000]])close(operatingForecast(...inputs).difference,0);assert.ok(operatingForecast(300,.9,20000).endingCash<0);});
test('DCF agrees with a level perpetuity and rejects an invalid terminal spread',()=>{
 const p={...DEFAULT_DCF,revenue:100,growth:0,margin:.2,tax:0,depreciation:0,capex:0,workingCapital:0,costEquity:.1,equityWeight:1,terminalGrowth:0,debt:0,cash:0,shares:10};const v=dcf(p);close(v.enterprise,200);close(v.perShare,20);
 close(dcf({...p,equityWeight:.5,costDebt:.06,tax:.25}).wacc,.0725);
 assert.throws(()=>dcf({...p,terminalGrowth:.1}),/greater/);assert.throws(()=>dcf({...p,shares:0}));assert.throws(()=>dcf({...p,revenue:NaN}));
 assert.ok(dcf({...DEFAULT_DCF,costEquity:.15}).enterprise<dcf(DEFAULT_DCF).enterprise);
 close(dcf({...DEFAULT_DCF,note:'Analyst reasoning',decision:'Continue diligence',offer:1800}).enterprise,dcf(DEFAULT_DCF).enterprise);
});
test('Black-Scholes matches reference values, put-call parity, and expiry cases',()=>{const p=blackScholes(100,100,1,.05,.2);close(p.call,10.45058357,.0001);close(p.put,5.57352602,.0001);close(p.call-p.put,100-100*Math.exp(-.05),1e-7);assert.deepEqual(blackScholes(90,100,0,.05,.2),{call:0,put:10});close(blackScholes(100,100,1,.05,0).call,100-100*Math.exp(-.05));assert.throws(()=>blackScholes(-1,100,1,.05,.2));});
test('backtest respects its information lag and costs reduce net wealth',()=>{const free=quantModel(3,0,.6),cost=quantModel(3,25,.6);assert.equal(free.rows.length,30);assert.ok(free.rows.slice(0,3).every(x=>x.position===0));assert.ok(cost.total<free.total);assert.ok(cost.drawdown>=0);assert.ok(cost.minVarianceWeight>=0&&cost.minVarianceWeight<=1);assert.throws(()=>quantModel(0,5,.6));assert.throws(()=>quantModel(2,5,1.2));});
test('LBO bridges enterprise and debt to equity and compounds terminal cash flows',()=>{const v=lbo(100,10,.6,0,10,200,5);assert.equal(v.entryEquity,400);assert.equal(v.exitEquity,600);close(v.moic,1.5);close(v.irr,1.5**.2-1);assert.throws(()=>lbo(100,10,1,0,10,200,5));});
test('storage respects assessment opt-in and survives malformed saved content',()=>{const p=emptyProgress();p.answers={math:[4]};p.quizStarted=true;p.path=['returns-and-descriptive-statistics'];assert.deepEqual(JSON.parse(serializeProgress(p)).answers,{});assert.equal(parseProgress(serializeProgress(p)).path.length,1);p.saveQuiz=true;assert.deepEqual(parseProgress(serializeProgress(p)).answers.math,[4]);assert.deepEqual(parseProgress('{'),emptyProgress());assert.equal(parseProgress(JSON.stringify({version:2,quizIndex:999,history:[null,{},'oops']})).quizIndex,29);});

test('every profession has a valid specialist tool with finite default results',()=>{
 for(const c of CAREERS)assert.ok(CAREER_TOOLS.includes(toolFor(c)));
 for(const tool of CAREER_TOOLS){const p=Object.fromEntries(tool.fields.map(f=>[f.key,f.value]));assert.ok(calculateTool(tool.id,p).every(([,v])=>Number.isFinite(v)));assert.throws(()=>calculateTool(tool.id,{...p,[tool.fields[0].key]:NaN}));}
});
test('specialist loan amortization and credit loss agree with known cases',()=>{
 const p={principal:1200,rate:0,years:1,cash:2400,pd:2,lgd:40};const rows=calculateTool('credit',p);close(rows[0][1],100);close(rows[2][1],2);close(rows[3][1],9.6);
 const x=calculateTool('credit',{...p,principal:100000,rate:6,years:5});close(x[0][1],1933.2801529428275);
});
test('startup ownership and runway respond to funding and burn',()=>{
 const rows=calculateTool('venture',{cash:600000,receipts:80000,costs:180000,valuation:8000000,funding:2000000});close(rows[1][1],6);close(rows[3][1],20);
 close(calculateTool('venture',{cash:600000,receipts:180000,costs:180000,valuation:8000000,funding:0})[1][1],0);
});
test('property coverage, insurance stress, and cash-only planning reconcile',()=>{
 const property=calculateTool('property',{rent:500000,vacancy:10,expenses:150000,cap:6,debt:200000});close(property[0][1],300000);close(property[1][1],5000000);close(property[2][1],1.5);
 const insurance=calculateTool('insurance',{exposures:1000,frequency:5,severity:10000,premium:800000,expenses:180000});close(insurance[0][1],500000);close(insurance[2][1],85);close(insurance[3][1],750000);
 const plan=calculateTool('planning',{balance:1000,saving:200,years:1,return:0,goal:3400});close(plan[0][1],3400);close(plan[2][1],0);
});
test('budget price and volume bridge exactly equals variance; controls remain explicit',()=>{
 const rows=calculateTool('budget',{budgetUnits:10000,budgetPrice:20,actualUnits:9000,actualPrice:21,unitCost:12});close(rows[2][1],-11000);close(rows[3][1]+rows[4][1],rows[2][1]);close(rows[5][1],81000);
 const risk=calculateTool('controls',{impact:4,likelihood:3,effectiveness:50});close(risk[0][1],12);close(risk[1][1],6);
});

test('every applied case starts with a documented, detectable workbook error',()=>{
 for(const c of CAPSTONES){assert.ok(c.documents.length>=4);assert.ok(!workbook(c.id,c.seeds).correct);assert.ok(workbook(c.id,c.seeds).rows.every(r=>r.every(Number.isFinite)));}
});
test('operations workbook distinguishes reconciliation from settlement',()=>{
 const cells=CAPSTONES[0].seeds.map(r=>[...r]);close(workbook('operations',cells).rows[1][6],300);cells[1][0]=200;const r=workbook('operations',cells);assert.ok(r.correct);close(r.summary[0][1],23000);close(r.summary[2][1],0);assert.equal(CAPSTONES[0].correct,1);
});
test('accounting case reconciles supported journals and the balance sheet',()=>{
 const cells=CAPSTONES[1].seeds.map(r=>[...r]);cells[3][0]=800;const r=workbook('accounting',cells);assert.ok(r.correct);close(r.summary[0][1],17800);close(r.summary[2][1],6200);close(r.summary[3][1],3200);close(r.summary[4][1],13200);close(r.summary[6][1],0);
 cells[3]=[900,900];assert.equal(workbook('accounting',cells).correct,false);
});
test('banking workbook matches the independent DCF implementation',()=>{
 const cells=CAPSTONES[2].seeds.map(r=>[...r]);cells[0][2]=4;const r=workbook('banking',cells);assert.ok(r.correct);const d=dcf({...DEFAULT_DCF,costEquity:.09,equityWeight:1});close(r.summary[1][1],d.enterprise);close(r.summary[3][1],d.perShare);assert.ok(workbookCsv('banking',r.rows).includes('Revenue ($m)'));
});
test('quant case includes lagged positions, turnover and final liquidation',()=>{
 const cells=CAPSTONES[3].seeds.map(r=>[...r]);cells[0][0]=1;const r=workbook('quant',cells);assert.ok(r.correct);close(r.rows[0][5],(99/101-1)*100-.05);close(r.summary[1][1],(109/101-1)*100);const free=workbook('quant',cells.map(([pos])=>[pos,0]));assert.ok(free.summary[0][1]>r.summary[0][1]);assert.throws(()=>workbook('quant',cells.map(([pos,cost],i)=>[i===0?.5:pos,cost])),/0 or 1/);
});

test('glossary has unique searchable terms and complete explanations',()=>{
 assert.ok(GLOSSARY.length>=50);assert.equal(new Set(GLOSSARY.map(t=>t.id)).size,GLOSSARY.length);for(const term of GLOSSARY){assert.ok(term.meaning.length>20);assert.ok(term.example.length>20);}
});
test('Africa case checks agree with independent calculations and reject blank or invalid answers',()=>{
 const [startup,energy,payment]=AFRICA_CASES;close(startup.checks[0].answer,300000/(100000-25000));close(startup.checks[1].answer,900000/(3600000+900000)*100);close(energy.checks[0].answer,(1100000-400000)/500000);close(energy.checks[1].answer,(1100000*.8-400000)/500000);close(payment.checks[1].answer,1000000*.99*.4);
 assert.ok(answerMatches('396,000',396000));assert.equal(answerMatches('',0),false);assert.equal(answerMatches('Infinity',4),false);
});
test('portfolio includes verified completed work and rejects stale worksheet results',()=>{
 const p=emptyProgress();assert.equal(portfolioItems(p).length,0);const cells=CAPSTONES[0].seeds.map(r=>[...r]);cells[1][0]=200;p.labs['case-operations']={completed:true,checked:true,decision:1,note:'Documented fictional review with the supported booking correction and remaining evidence required before settlement confirmation.',cells};assert.equal(portfolioItems(p).length,1);assert.ok(portfolioItems(p)[0].csv.includes('2,200,30'));cells[1][0]=210;assert.equal(portfolioItems(p).length,0);
});
test('Africa completion creates an honest educational portfolio entry and exports',()=>{
 const p=emptyProgress();p.labs['africa-dakar-startup']={completed:true,decision:1,answers:['4','20'],note:'Fictional diligence memo: check customer retention and cash evidence before evaluating a proposed funding decision. The valuation is an exercise assumption.'};const items=portfolioItems(p);assert.equal(items.length,1);assert.ok(portfolioMarkdown(items,'My projects','Learning finance').includes('not employment experience'));p.labs['africa-dakar-startup'].answers[0]='40';assert.equal(portfolioItems(p).length,0);
});

test('expanded glossary retains old bookmarks and broad topic coverage',()=>{
 assert.ok(GLOSSARY.length>=190);
 assert.equal(new Set(GLOSSARY.map(t=>t.id)).size,GLOSSARY.length);
 for(const id of ['wacc','settlement','runway'])assert.ok(GLOSSARY.some(t=>t.id===id));
 for(const category of ['Derivatives','Insurance','Fintech','Personal finance','Quantitative finance'])assert.ok(GLOSSARY.some(t=>t.category===category));
 assert.ok(GLOSSARY.every(t=>t.meaning.length>15&&t.example.length>15));
});
test('employer guides cover careers without replacing assessment signals',()=>{
 for(const c of CAREERS){const g=employerGuide(c);assert.ok(g.firms.length&&g.interests.length);assert.ok(g.firms.every(f=>f.url.startsWith('https://')&&f.focus));}
 const get=title=>CAREERS.find(c=>c.title===title);
 assert.equal(employerGuide(get('Venture Capital')).firms[0].name,'Partech');
 assert.equal(employerGuide(get('Actuarial Science')).firms[0].name,'Swiss Re');
 assert.equal(employerGuide(get('Financial Examination')).firms[0].name,'FDIC');
 assert.equal(employerGuide(get('Quantitative Research')).firms[0].name,'Jane Street');
 assert.match(personalEmployerFit(get('Venture Capital'),['people']),/reported interest/);
 assert.match(personalEmployerFit(get('Venture Capital'),[]),/work sample/);
});
