import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
// Compile pure domain modules for Node; production still uses Vite's TypeScript pipeline.
const dir=mkdtempSync(join(tmpdir(),'tradeops-domain-'));
for(const name of ['careers','assessment','models','lessons','trials','progress']){
 const source=readFileSync(new URL(`../lib/academy/${name}.ts`,import.meta.url),'utf8');
 const out=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/from '(\.\/[^']+)'/g,"from '$1.mjs'");
 writeFileSync(join(dir,`${name}.mjs`),out);
}
const {CAREERS,DIMS}=await import(pathToFileURL(join(dir,'careers.mjs')));
const {QUESTIONS,assess,answerVector,validAnswer}=await import(pathToFileURL(join(dir,'assessment.mjs')));
const {dcf,DEFAULT_DCF,blackScholes,quantModel,TRANSACTIONS,statements,operatingForecast,lbo}=await import(pathToFileURL(join(dir,'models.mjs')));
const {LESSONS,roadmap}=await import(pathToFileURL(join(dir,'lessons.mjs')));
const {trialFor}=await import(pathToFileURL(join(dir,'trials.mjs')));
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
test('54 career profiles and 30 distinct questions map to functioning learning/trials',()=>{
 assert.equal(CAREERS.length,54);assert.equal(QUESTIONS.length,30);assert.equal(new Set(QUESTIONS.map(q=>q.id)).size,30);assert.equal(new Set(LESSONS.map(l=>l.id)).size,LESSONS.length);
 for(const c of CAREERS){assert.ok(roadmap(c.track).length);assert.equal(trialFor(c).steps.length,3);assert.deepEqual(Object.keys(c.profile),DIMS);}
 for(const l of LESSONS){assert.ok(l.choices[l.answer]);assert.ok(Number.isFinite(l.practice.answer));}
});
test('insufficient or skipped evidence does not invent career results',()=>{assert.equal(assess({}).ranked.length,0);assert.equal(assess({math:[4]}).ranked.length,0);assert.equal(assess({math:[],coding:[]}).answered,0);});
test('contrasting fictional interests produce distinct recommendations and broad dimensions',()=>{
 const quant=fictional(CAREERS.find(c=>c.id==='quantitative-research').profile),ops=fictional(CAREERS.find(c=>c.id==='trade-reconciliation').profile),venture=fictional(CAREERS.find(c=>c.id==='venture-capital').profile);
 const results=[quant,ops,venture].map(a=>assess(a));
 for(const r of results){assert.equal(r.enough,true);assert.ok(r.covered.length>=10);assert.equal(r.ranked.length,54);assert.ok(r.ranked.every(x=>x.score>=0&&x.score<=100));}
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
});
test('Black-Scholes matches reference values, put-call parity, and expiry cases',()=>{const p=blackScholes(100,100,1,.05,.2);close(p.call,10.45058357,.0001);close(p.put,5.57352602,.0001);close(p.call-p.put,100-100*Math.exp(-.05),1e-7);assert.deepEqual(blackScholes(90,100,0,.05,.2),{call:0,put:10});close(blackScholes(100,100,1,.05,0).call,100-100*Math.exp(-.05));assert.throws(()=>blackScholes(-1,100,1,.05,.2));});
test('backtest respects its information lag and costs reduce net wealth',()=>{const free=quantModel(3,0,.6),cost=quantModel(3,25,.6);assert.equal(free.rows.length,30);assert.ok(free.rows.slice(0,3).every(x=>x.position===0));assert.ok(cost.total<free.total);assert.ok(cost.drawdown>=0);assert.ok(cost.minVarianceWeight>=0&&cost.minVarianceWeight<=1);assert.throws(()=>quantModel(0,5,.6));assert.throws(()=>quantModel(2,5,1.2));});
test('LBO bridges enterprise and debt to equity and compounds terminal cash flows',()=>{const v=lbo(100,10,.6,0,10,200,5);assert.equal(v.entryEquity,400);assert.equal(v.exitEquity,600);close(v.moic,1.5);close(v.irr,1.5**.2-1);assert.throws(()=>lbo(100,10,1,0,10,200,5));});
test('storage respects assessment opt-in and survives malformed saved content',()=>{const p=emptyProgress();p.answers={math:[4]};p.quizStarted=true;p.path=['returns-and-descriptive-statistics'];assert.deepEqual(JSON.parse(serializeProgress(p)).answers,{});assert.equal(parseProgress(serializeProgress(p)).path.length,1);p.saveQuiz=true;assert.deepEqual(parseProgress(serializeProgress(p)).answers.math,[4]);assert.deepEqual(parseProgress('{'),emptyProgress());assert.equal(parseProgress(JSON.stringify({version:2,quizIndex:999,history:[null,{},'oops']})).quizIndex,29);});
