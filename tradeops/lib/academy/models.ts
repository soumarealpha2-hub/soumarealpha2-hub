export const SAMPLE_PRICES=[100,101,99,102,103,101,104,106,105,103,107,109,108,110,107,111,113,112,114,110,109,112,115,114,116,118,115,117,119,116,120];
export const SAMPLE_BOND=[100,100.2,100.4,100.3,100.6,100.8,100.7,100.5,100.9,101.2,101.1,101.0,101.3,101.5,101.8,101.7,101.4,101.8,102,102.2,102.1,102.3,102.5,102.3,102.1,102.6,102.8,102.7,102.5,102.9,103];
const mean=(a:number[])=>a.reduce((x,y)=>x+y,0)/a.length;
const variance=(a:number[])=>a.length>1?a.reduce((s,x)=>s+(x-mean(a))**2,0)/(a.length-1):0;
export const returns=(prices:number[])=>prices.slice(1).map((p,i)=>p/prices[i]-1);
export function quantModel(lookback:number,costBps:number,allocation:number){
 if(!Number.isInteger(lookback)||lookback<1||lookback>10||!Number.isFinite(costBps)||costBps<0||costBps>100||!Number.isFinite(allocation)||allocation<0||allocation>1)throw Error('Use a 1–10 day lookback, costs of 0–100 basis points, and an allocation from 0 to 100%.');
 const r=returns(SAMPLE_PRICES),b=returns(SAMPLE_BOND);let wealth=1,buyHold=1,peak=1,drawdown=0,previous=0,turnover=0;
 const rows=r.map((ret,i)=>{const t=i+1;const position=t>lookback&&SAMPLE_PRICES[t-1]>SAMPLE_PRICES[t-1-lookback]?1:0;const change=Math.abs(position-previous);turnover+=change;const net=position*ret-change*costBps/10000;wealth*=1+net;buyHold*=1+ret;peak=Math.max(peak,wealth);drawdown=Math.max(drawdown,1-wealth/peak);previous=position;return {day:t,price:SAMPLE_PRICES[t],return:ret,position,net,wealth,buyHold};});
 // Liquidate the final position and account for its cost.
 if(previous){wealth*=1-costBps/10000;turnover++;rows[rows.length-1].wealth=wealth;drawdown=Math.max(drawdown,1-wealth/peak);}
 const cov=r.reduce((s,x,i)=>s+(x-mean(r))*(b[i]-mean(b)),0)/(r.length-1);const va=variance(r),vb=variance(b);
 const denominator=va+vb-2*cov;const minVarianceWeight=denominator>1e-12?Math.max(0,Math.min(1,(vb-cov)/denominator)):0.5;
 const portfolioReturns=r.map((x,i)=>allocation*x+(1-allocation)*b[i]);
 return {rows,total:wealth-1,buyHold:buyHold-1,volatility:Math.sqrt(va),mean:mean(r),drawdown,turnover,portfolioMean:mean(portfolioReturns),portfolioVol:Math.sqrt(variance(portfolioReturns)),minVarianceWeight};
}
function normalCdf(x:number){const sign=x<0?-1:1;const z=Math.abs(x)/Math.sqrt(2);const t=1/(1+.3275911*z);const erf=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-z*z);return .5*(1+sign*erf);}
export function blackScholes(spot:number,strike:number,years:number,rate:number,vol:number){
 if(![spot,strike,years,rate,vol].every(Number.isFinite)||spot<=0||strike<=0||years<0||vol<0)throw Error('Spot and strike must be positive. Time and volatility cannot be negative.');
 if(years===0)return {call:Math.max(spot-strike,0),put:Math.max(strike-spot,0)};
 const discounted=strike*Math.exp(-rate*years);
 if(vol===0)return {call:Math.max(spot-discounted,0),put:Math.max(discounted-spot,0)};
 const d1=(Math.log(spot/strike)+(rate+vol*vol/2)*years)/(vol*Math.sqrt(years));const d2=d1-vol*Math.sqrt(years);
 return {call:spot*normalCdf(d1)-discounted*normalCdf(d2),put:discounted*normalCdf(-d2)-spot*normalCdf(-d1)};
}
export type DcfInputs={revenue:number;growth:number;margin:number;tax:number;depreciation:number;capex:number;workingCapital:number;costEquity:number;costDebt:number;equityWeight:number;terminalGrowth:number;debt:number;cash:number;shares:number};
export const DEFAULT_DCF:DcfInputs={revenue:1000,growth:.08,margin:.2,tax:.25,depreciation:.03,capex:.04,workingCapital:.1,costEquity:.11,costDebt:.05,equityWeight:.7,terminalGrowth:.025,debt:300,cash:80,shares:100};
export function dcf(p:DcfInputs){
 if(!Object.values(p).every(Number.isFinite))throw Error('Enter a number in every assumption.');
 if(p.revenue<=0||p.shares<=0||p.growth<=-1||p.growth>1||p.terminalGrowth<=-1||p.tax<0||p.tax>1||p.equityWeight<0||p.equityWeight>1||p.costEquity<=0||p.costDebt<0||p.depreciation<0||p.capex<0||p.workingCapital<0||p.debt<0||p.cash<0||p.margin<0||p.margin>1)throw Error('Check the assumptions: use positive revenue and shares, valid percentages, and nonnegative debt and cash.');
 const wacc=p.equityWeight*p.costEquity+(1-p.equityWeight)*p.costDebt*(1-p.tax);
 if(wacc<=p.terminalGrowth)throw Error('WACC must be greater than terminal growth for this perpetual-growth model.');
 let prior=p.revenue;
 const rows=Array.from({length:5},(_,i)=>{const revenue=prior*(1+p.growth),ebit=revenue*p.margin,da=revenue*p.depreciation,capex=revenue*p.capex,changeNwc=(revenue-prior)*p.workingCapital;prior=revenue;const fcff=ebit*(1-p.tax)+da-capex-changeNwc;return {year:i+1,revenue,ebit,da,capex,changeNwc,fcff,pv:fcff/(1+wacc)**(i+1)};});
 const terminalValue=rows[4].fcff*(1+p.terminalGrowth)/(wacc-p.terminalGrowth),pvTerminal=terminalValue/(1+wacc)**5,enterprise=rows.reduce((s,x)=>s+x.pv,0)+pvTerminal,equity=enterprise-p.debt+p.cash;
 return {rows,wacc,terminalValue,pvTerminal,enterprise,equity,perShare:equity/p.shares};
}
export function lbo(entryEbitda:number,entryMultiple:number,debtPercent:number,ebitdaGrowth:number,exitMultiple:number,debtPaydown:number,years:number){
 if(![entryEbitda,entryMultiple,debtPercent,ebitdaGrowth,exitMultiple,debtPaydown,years].every(Number.isFinite)||entryEbitda<=0||entryMultiple<=0||debtPercent<0||debtPercent>=1||ebitdaGrowth<=-1||exitMultiple<=0||debtPaydown<0||years<=0)throw Error('Use positive EBITDA, multiples and years, debt below 100%, and nonnegative debt repayment.');
 const entryEv=entryEbitda*entryMultiple,initialDebt=entryEv*debtPercent,entryEquity=entryEv-initialDebt,exitDebt=Math.max(0,initialDebt-debtPaydown),exitEv=entryEbitda*(1+ebitdaGrowth)**years*exitMultiple,exitEquity=Math.max(0,exitEv-exitDebt),moic=exitEquity/entryEquity;
 return {entryEv,initialDebt,entryEquity,exitEv,exitDebt,exitEquity,moic,irr:moic**(1/years)-1};
}
export const ACCOUNTS=['Cash','Accounts receivable','Equipment','Accumulated depreciation','Loan payable','Accrued wages','Owner capital','Revenue','Rent expense','Depreciation expense','Wage expense'] as const;
export type Account=typeof ACCOUNTS[number];
export const TRANSACTIONS:[string,number,Account,Account,string][]=[
 ['Owner invests cash',10000,'Cash','Owner capital','Cash is an asset. Owner capital records the owner’s claim, not revenue.'],
 ['Buy equipment for cash',3000,'Equipment','Cash','Exchange one asset for another; the full purchase is not an immediate operating expense.'],
 ['Deliver services on credit',4000,'Accounts receivable','Revenue','Recognize the service revenue and a receivable when earned in this simplified example.'],
 ['Collect part of the customer balance',2500,'Cash','Accounts receivable','Collection changes the asset mix. It does not create new revenue.'],
 ['Pay monthly rent',800,'Rent expense','Cash','Rent reduces income and cash in this example.'],
 ['Record monthly depreciation',300,'Depreciation expense','Accumulated depreciation','Depreciation reduces income and the net carrying value of equipment without a new cash payment.'],
 ['Receive a bank loan',2000,'Cash','Loan payable','Borrowing creates cash and a liability, not revenue.'],
 ['Accrue wages owed',200,'Wage expense','Accrued wages','Record this month’s expense and a liability even though payment is next month.'],
];
export type Entry={transaction:number;debit:Account;credit:Account;amount:number};
export function statements(entries:Entry[]){
 const ledger=Object.fromEntries(ACCOUNTS.map(a=>[a,0])) as Record<Account,number>;let operating=0,investing=0,financing=0;
 for(const e of entries){if(!ACCOUNTS.includes(e.debit)||!ACCOUNTS.includes(e.credit)||!Number.isFinite(e.amount)||e.amount<=0)throw Error('Each entry needs valid accounts and a positive amount.');ledger[e.debit]+=e.amount;ledger[e.credit]-=e.amount;
 const cash=e.debit==='Cash'?e.amount:e.credit==='Cash'?-e.amount:0;const other=e.debit==='Cash'?e.credit:e.debit;if(other==='Equipment')investing+=cash;else if(other==='Owner capital'||other==='Loan payable')financing+=cash;else operating+=cash;
 }
 const revenue=-ledger.Revenue,expenses=ledger['Rent expense']+ledger['Depreciation expense']+ledger['Wage expense'],income=revenue-expenses,cash=ledger.Cash,assets=cash+ledger['Accounts receivable']+ledger.Equipment+ledger['Accumulated depreciation'],liabilities=-ledger['Loan payable']-ledger['Accrued wages'],equity=-ledger['Owner capital']+income;
 return {ledger,revenue,expenses,income,cash,assets,liabilities,equity,operating,investing,financing,difference:assets-liabilities-equity};
}
export function operatingForecast(revenue:number,costRatio:number,capex:number){
 if(![revenue,costRatio,capex].every(Number.isFinite)||revenue<0||costRatio<0||costRatio>1||capex<0)throw Error('Use nonnegative revenue and capital expenditure, and a cost ratio between 0% and 100%.');
 const depreciation=300,openingCash=10000,openingPpe=3000,debt=2000,openingEquity=11000,receivables=revenue*.2,income=revenue*(1-costRatio)-depreciation,cfo=income+depreciation-receivables,endingCash=openingCash+cfo-capex,ppe=openingPpe+capex-depreciation,equity=openingEquity+income;
 return {income,cfo,endingCash,receivables,ppe,debt,equity,assets:endingCash+receivables+ppe,difference:endingCash+receivables+ppe-debt-equity};
}
