import {CONSULTING_SPECIALTIES,type ConsultingSpecialty} from './consulting';
export type Track = 'operations'|'quant'|'accounting'|'banking';
export const TRACKS: {id:Track;title:string;short:string;description:string}[] = [
 {id:'operations',title:'Sales & Trading Operations',short:'Operations',description:'Follow trades, investigate breaks, and keep the process moving.'},
 {id:'quant',title:'Quantitative Finance',short:'Quant',description:'Explore market data, test ideas, and understand model risk.'},
 {id:'accounting',title:'Accounting',short:'Accounting',description:'Turn business transactions into connected financial statements.'},
 {id:'banking',title:'Investment Banking',short:'Banking',description:'Understand businesses, build valuations, and explain a deal.'},
];
export const DIMENSIONS = {analysis:'Analytical investigation',quant:'Mathematics',code:'Technology and coding',people:'Client and team communication',strategy:'Creative strategy',detail:'Detailed review',risk:'Decisions with uncertainty',pace:'Rapid decisions',lifestyle:'Predictable schedule',leadership:'Leadership ambitions',markets:'Market interest',enterprise:'Business building'};
export type Dimension=keyof typeof DIMENSIONS;
export type Profile=Record<Dimension,number>;
export const DIMS=Object.keys(DIMENSIONS) as Dimension[];
const vector=(values:number[]):Profile=>Object.fromEntries(DIMS.map((d,i)=>[d,values[i]??2])) as Profile;
const groups = [
 {name:'Investment Banking & Advisory',track:'banking' as Track,p:vector([4,2,1,4,4,4,3,3,1,4,2,4]),skills:'Financial modeling, valuation, presentation, research',tools:'Spreadsheets, presentation software, company filings',environment:'Project teams coordinate financial analysis, client materials, and transaction deadlines.',balance:'Deal milestones can make workload unpredictable. Ask about team staffing and peak periods.',pay:'Base salary and discretionary bonus may both matter; deal activity, location, and seniority affect total pay.',progress:'Analyst → associate → senior deal or advisory responsibilities'},
 {name:'Investing & Asset Management',track:'banking' as Track,p:vector([4,3,2,3,4,3,4,2,2,3,4,3]),skills:'Research, valuation, investment judgment, clear writing',tools:'Spreadsheets, research databases, portfolio tools',environment:'Research and investment teams compare evidence and discuss investment decisions.',balance:'Market events, reporting, fundraising, or deal deadlines can create peaks; arrangements vary by strategy.',pay:'Base pay, bonuses, and sometimes long-term incentive arrangements vary widely by employer and role.',progress:'Research or investment analyst → senior analyst → investment, portfolio, or client leadership'},
 {name:'Markets & Quantitative Finance',track:'quant' as Track,p:vector([4,4,4,2,3,4,4,4,1,2,4,1]),skills:'Probability, data analysis, programming, model validation',tools:'Python, SQL, spreadsheets, market data and risk systems',environment:'Researchers, developers, traders, and risk teams work with data and closely reviewed models.',balance:'Market hours, releases, or system incidents can constrain flexibility. Research and execution roles differ.',pay:'Base salary and performance-related incentives vary with role, firm, location, and results.',progress:'Analyst or developer → specialist or senior researcher → team or strategy leadership'},
 {name:'Finance Operations',track:'operations' as Track,p:vector([3,1,2,3,2,4,1,3,3,2,3,1]),skills:'Reconciliation, process analysis, controls, communication',tools:'Spreadsheets, reconciliation platforms, workflow systems, SQL where useful',environment:'Teams coordinate across trading, counterparties, technology, and control functions.',balance:'Settlement cutoffs, reporting cycles, and incidents shape schedules. Coverage models vary.',pay:'Base pay and potential bonuses depend on employer, responsibilities, seniority, and location.',progress:'Operations analyst → specialist or team lead → process, control, or operations management'},
 {name:'Accounting & Corporate Finance',track:'accounting' as Track,p:vector([4,2,1,3,2,4,1,1,4,3,1,3]),skills:'Accounting, financial analysis, spreadsheets, business communication',tools:'Spreadsheets, enterprise accounting systems, reporting tools',environment:'Finance teams work with business partners and documented reporting or planning cycles.',balance:'Month-end, quarter-end, audits, and planning cycles can create busy periods; predictability varies.',pay:'Base salary, potential bonuses, credentials, scope, and location affect compensation.',progress:'Staff accountant or financial analyst → senior specialist → manager → finance leadership'},
 {name:'Banking & Specialized Finance',track:'banking' as Track,p:vector([3,2,2,4,3,3,2,2,3,3,2,4]),skills:'Financial analysis, judgment, communication, sector knowledge',tools:'Spreadsheets, customer systems, analytical and reporting tools',environment:'Teams combine specialist analysis with clients, product partners, or business stakeholders.',balance:'Client demand, regulatory reviews, project deadlines, and coverage needs affect working patterns.',pay:'Compensation varies substantially across these specialties, employers, locations, and seniority levels.',progress:'Analyst or associate → senior specialist → client, product, or functional leadership'},
];
// Profiles are transparent editorial learning heuristics, not measured occupational standards.
const rows:[string,number,string,string,Partial<Profile>?,Track?][]=[
 ['Investment Banking',0,'Help companies raise capital and evaluate transactions.','Update a financial model and check a presentation against company filings.'],
 ['Mergers and Acquisitions',0,'Advise on buying, selling, and combining businesses.','Compare a target valuation with a buyer’s offer and flag assumptions.',{strategy:4,enterprise:4}],
 ['Equity Capital Markets',0,'Support equity issuance and public market transactions.','Summarize valuation, investor demand, and dilution for a proposed share issue.',{markets:4,pace:4}],
 ['Debt Capital Markets',0,'Help issuers structure and raise debt financing.','Compare maturities, interest costs, and refinancing needs.',{markets:4,quant:3}],
 ['Leveraged Finance',0,'Analyze debt financing for more highly leveraged borrowers.','Stress-test debt capacity and interest coverage.',{risk:4,analysis:4}],
 ['Restructuring Advisory',0,'Help stakeholders evaluate options when a business faces financial distress.','Build a liquidity forecast and compare creditor recoveries.',{analysis:4,detail:4,risk:4}],
 ['Financial Advisory',0,'Provide analytical support for business and transaction decisions.','Organize evidence and explain financial options to a client.',{people:4,lifestyle:2}],
 ['Private Equity',1,'Evaluate and support investments in private businesses.','Model an acquisition and investigate cash generation.',{enterprise:4,markets:1,leadership:4,lifestyle:1}],
 ['Venture Capital',1,'Assess young companies, founders, and growth opportunities.','Review customer traction, cash runway, and a startup’s market.',{enterprise:4,people:4,strategy:4,quant:1,detail:2,risk:4}],
 ['Hedge Funds',1,'Research and implement investment strategies with varied mandates.','Test an investment thesis and identify how it could fail.',{markets:4,pace:4,risk:4},'quant'],
 ['Asset Management',1,'Invest client assets within an agreed objective and constraints.','Compare portfolio holdings with mandate and risk limits.',{detail:4,risk:3,enterprise:1},'quant'],
 ['Portfolio Management',1,'Combine investments and manage portfolio-level tradeoffs.','Review allocation, concentration, and exposures.',{quant:4,leadership:4,enterprise:1},'quant'],
 ['Equity Research',1,'Analyze companies and communicate evidence-based investment views.','Forecast earnings and explain a valuation sensitivity.',{analysis:4,detail:4,enterprise:2}],
 ['Credit Research',1,'Evaluate a borrower’s ability and willingness to meet obligations.','Review leverage, cash flow, collateral, and downside scenarios.',{risk:1,detail:4,enterprise:2}],
 ['Investment Research',1,'Study investments and present a reasoned thesis.','Compare a claim with financial evidence and alternative explanations.',{analysis:4,detail:4}],
 ['Wealth Management',1,'Help clients organize investment goals and financial decisions.','Prepare a goals-based discussion and identify missing client information.',{people:4,quant:1,code:0,lifestyle:3,markets:2,enterprise:2}],
 ['Private Banking',1,'Coordinate financial services for private clients.','Prepare a client review covering liquidity, borrowing, and investment needs.',{people:4,quant:1,code:0,lifestyle:3,enterprise:2}],
 ['Sales and Trading',2,'Serve market clients and manage trading exposures within limits.','Review a market change and assess an order against a risk limit.',{people:4,code:2,quant:3,pace:4}],
 ['Quantitative Research',2,'Develop and test mathematical models using financial data.','Test a hypothesis using a clearly separated sample and evaluation period.',{people:1,quant:4,code:4,pace:2,lifestyle:2}],
 ['Quantitative Trading',2,'Apply systematic decision rules while managing trading risk.','Compare a strategy’s net performance with its turnover and drawdown.',{pace:4,quant:4,risk:4}],
 ['Quantitative Development',2,'Build reliable software for research, pricing, or trading.','Validate a data pipeline and test model implementation.',{code:4,quant:3,detail:4,risk:1,markets:3,pace:2,lifestyle:3}],
 ['Derivatives Trading',2,'Quote and manage instruments whose value depends on underlying assets.','Review option valuation and sensitivity to volatility.',{quant:4,risk:4,code:2}],
 ['Financial Structuring',2,'Design financial solutions within client needs and product constraints.','Translate a payoff idea into model inputs and explain its risks.',{strategy:4,people:4,quant:4}],
 ['Market Risk',2,'Measure and challenge exposure to changing market prices.','Investigate a limit breach and document a stress scenario.',{risk:1,detail:4,pace:3,lifestyle:3},'operations'],
 ['Trading Strategy',2,'Research market behavior and communicate trading ideas.','Separate a market hypothesis from evidence and execution costs.',{strategy:4,code:3,people:3}],
 ['Sales and Trading Operations',3,'Process and control the lifecycle of market transactions.','Investigate a failed settlement and coordinate a supported correction.'],
 ['Trade Settlement',3,'Coordinate delivery of cash and securities by the applicable date.','Check funding, inventory, instructions, and unsettled tickets.',{detail:4,pace:4}],
 ['Trade Reconciliation',3,'Compare records and investigate unexplained differences.','Trace a position break through transaction and custody evidence.',{analysis:4,detail:4,pace:2}],
 ['Middle Office',3,'Support trade validation, reporting, and exposure oversight.','Check a booking against source evidence and explain an exception.',{analysis:4,markets:4}],
 ['Treasury Operations',3,'Support payment, funding, and cash management processes.','Reconcile cash movements and flag a projected funding shortfall.',{detail:4,markets:2}],
 ['Financial Risk and Controls',3,'Design and review processes that address financial and operational risks.','Document an incident, its impact, and a preventive control.',{strategy:3,detail:4,risk:0}],
 ['Securities Services',3,'Support custody, asset servicing, and related investor services.','Check an entitlement calculation for a corporate action.',{markets:2,people:4}],
 ['Financial Technology Operations',3,'Keep financial technology processes reliable and controlled.','Investigate a failed workflow and prioritize a safe recovery.',{code:4,strategy:3,analysis:4}],
 ['Financial Accounting',4,'Record transactions and prepare financial reporting.','Post supported journal entries and reconcile balances.',{detail:4,strategy:1}],
 ['Audit',4,'Evaluate evidence supporting financial reports and controls.','Trace a reported balance to documentation and investigate differences.',{analysis:4,people:4,detail:4,lifestyle:2}],
 ['Tax Advisory',4,'Analyze tax obligations and advise within the applicable rules.','Organize transaction facts and identify questions requiring specialist review.',{detail:4,people:4,strategy:3}],
 ['Corporate Finance',4,'Support business funding, investment, and financial decisions.','Compare project cash needs and return assumptions.',{strategy:4,enterprise:4}],
 ['Financial Planning and Analysis',4,'Connect business plans with budgets, forecasts, and performance.','Explain a revenue variance and update a forecast.',{strategy:4,people:4,enterprise:4}],
 ['Treasury',4,'Manage organizational liquidity, funding, and financial exposures.','Stress-test a cash forecast and review financing needs.',{risk:2,markets:3,pace:3}],
 ['Controllership',4,'Oversee reporting integrity, accounting processes, and controls.','Review close exceptions and coordinate a supported adjustment.',{detail:4,leadership:4}],
 ['Corporate Development',4,'Evaluate acquisitions, partnerships, and strategic investments.','Compare a target business with strategic and financial criteria.',{strategy:4,enterprise:4,risk:3,lifestyle:2},'banking'],
 ['Internal Audit',4,'Independently assess processes, controls, and risk management.','Test a control and write a clear finding with evidence.',{analysis:4,people:4,risk:0}],
 ['Corporate Banking',5,'Provide financing and other banking services to larger companies.','Review a borrower and coordinate a financing proposal.',{people:4,analysis:4}],
 ['Commercial Banking',5,'Serve business clients with lending and banking solutions.','Assess a company’s cash flow before recommending a loan review.',{people:4,enterprise:4,lifestyle:3}],
 ['Investment Risk Management',5,'Challenge and monitor investment risks within a mandate.','Review portfolio concentration and stress-test assumptions.',{risk:0,quant:4,detail:4,markets:4},'quant'],
 ['Compliance',5,'Support adherence to applicable rules and firm policies.','Investigate a flagged activity and document an escalation.',{risk:0,detail:4,enterprise:1},'operations'],
 ['Financial Consulting',5,'Help organizations improve financial decisions and processes.','Diagnose a client problem and recommend an evidence-based improvement.',{strategy:4,people:4,enterprise:4}],
 ['Fintech Product Management',5,'Prioritize and improve financial products with users and delivery teams.','Balance customer needs, operational controls, and development effort.',{strategy:4,code:3,people:4,enterprise:4,quant:1,leadership:4},'operations'],
 ['Financial Data Analytics',5,'Use data to explain performance and support financial decisions.','Check data quality and analyze a trend before presenting conclusions.',{analysis:4,code:4,quant:3,detail:4,people:2},'quant'],
 ['Insurance',5,'Analyze and manage risks through insurance products and processes.','Review a risk exposure and identify information needed for underwriting.',{risk:1,detail:4,quant:3},'accounting'],
 ['Actuarial Science',5,'Model uncertain events and their financial consequences.','Estimate expected claims and test sensitivity to assumptions.',{quant:4,code:3,analysis:4,detail:4,people:2,risk:1},'quant'],
 ['Real Estate Finance',5,'Analyze property investments and their financing.','Review property cash flow, debt service, and vacancy assumptions.',{analysis:4,enterprise:4,detail:3}],
 ['Project Finance',5,'Evaluate financing supported by a project’s cash flows.','Stress-test construction, revenue, and debt-service assumptions.',{analysis:4,detail:4,strategy:4}],
 ['Investor Relations',5,'Communicate company performance and strategy to investors.','Prepare an earnings explanation supported by reported results.',{people:4,markets:4,code:0,strategy:4},'accounting'],
 ["Fixed Income Research", 1, "Analyze bond issuers, interest-rate exposure, and relative value.", "Compare issuer cash flows and downside debt-service coverage."],
 ["Foreign Exchange Trading", 2, "Quote currencies and manage currency exposures.", "Review an order against position and loss limits."],
 ["Commodities Trading", 2, "Analyze and trade commodity markets and related contracts.", "Compare demand assumptions with a scenario of weaker prices."],
 ["ETF Capital Markets", 2, "Support exchange-traded fund liquidity and creation or redemption activity.", "Check a basket and investigate a pricing discrepancy."],
 ["Execution Trading", 2, "Implement investment orders within execution and risk constraints.", "Compare execution costs and identify an unusual fill."],
 ["Electronic Trading", 2, "Build and oversee automated market execution processes.", "Investigate a rejected order and check kill-switch controls."],
 ["Prime Brokerage", 3, "Coordinate financing, custody, and trading services for investment clients.", "Review a financing balance and collateral shortfall."],
 ["Securities Lending", 3, "Support temporary lending of securities and associated collateral.", "Check a loan recall, fee, and collateral balance."],
 ["Repo Financing", 2, "Support secured cash financing using securities collateral.", "Calculate the cash advance after a collateral haircut."],
 ["Collateral Management", 3, "Monitor collateral requirements and coordinate supported transfers.", "Investigate a margin call against available collateral."],
 ["Margin Operations", 3, "Calculate and reconcile margin obligations.", "Compare an expected call with a counterparty statement."],
 ["Asset Servicing", 3, "Process income, corporate actions, and investor entitlements.", "Check an entitlement against a position on the record date."],
 ["Fund Accounting", 4, "Calculate and reconcile fund assets, liabilities, and net asset value.", "Reconcile a fund balance with custody and pricing evidence."],
 ["Fund Administration", 3, "Coordinate fund records, investor reporting, and operating processes.", "Review a subscription request and missing documentation."],
 ["Transfer Agency", 3, "Maintain investor ownership records and process investor transactions.", "Reconcile investor units after subscriptions and redemptions."],
 ["Client Onboarding", 3, "Coordinate the evidence and approvals needed to establish a client relationship.", "Identify missing documentation before activating a client."],
 ["Anti-Money Laundering", 3, "Investigate suspicious patterns and follow documented escalation processes.", "Review a fictional transaction alert and document the evidence."],
 ["Know Your Customer", 3, "Verify client information and support risk-based due diligence.", "Compare declared business activity with supplied documentation."],
 ["Sanctions Compliance", 3, "Review potential restrictions and follow specialist escalation procedures.", "Document an ambiguous name match for a compliance review."],
 ["Financial Crime Investigations", 3, "Investigate financial activity using records and corroborating evidence.", "Distinguish a data error from an unexplained transaction pattern."],
 ["Regulatory Reporting", 3, "Prepare and validate financial submissions under applicable reporting rules.", "Reconcile reported totals and document an unexplained difference."],
 ["Operational Risk", 3, "Assess risks arising from people, processes, systems, and external events.", "Prioritize incidents using impact, likelihood, and control evidence."],
 ["Credit Risk", 5, "Challenge borrower risk and monitor potential credit losses.", "Stress-test a borrower’s debt-service coverage."],
 ["Liquidity Risk", 3, "Analyze the ability to meet cash obligations under stress.", "Compare projected outflows with available funding."],
 ["Model Risk", 2, "Challenge model assumptions, implementation, and appropriate use.", "Test a model against an independent calculation and record its limits."],
 ["Risk Model Validation", 2, "Independently assess the performance and limitations of risk models.", "Review missing data, sensitivity, and out-of-sample evidence."],
 ["Financial Services Cybersecurity", 3, "Protect financial systems and support incident response.", "Prioritize a simulated incident and verify recovery controls."],
 ["Financial Examination", 5, "Review financial institutions and their adherence to applicable requirements.", "Assess supporting evidence before recording a review finding."],
 ["Payments Operations", 3, "Support reliable movement and reconciliation of payments.", "Investigate a duplicate payment and hold unsupported resubmission."],
 ["Trade Finance", 5, "Support financing and payment arrangements for commercial trade.", "Review a financing request and missing shipment documentation."],
 ["Retail Banking", 5, "Help individual customers access banking products and services.", "Clarify a customer’s needs and identify missing financial information."],
 ["Mortgage Lending", 5, "Assess mortgage applications and supporting financial evidence.", "Calculate a fictional applicant’s payment and debt-to-income ratio."],
 ["Consumer Credit", 5, "Analyze consumer borrowing capacity and lending risk.", "Review debt payments and identify limits of an affordability estimate."],
 ["Personal Financial Planning", 1, "Help clients organize goals, cash flow, savings, and financial tradeoffs.", "Compare a savings projection with a client’s fictional goal."],
 ["Retirement Planning", 1, "Evaluate retirement goals and the assumptions supporting a savings plan.", "Stress-test a savings projection with a lower assumed return."],
 ["Pension Investment Management", 1, "Manage investment assets in the context of pension obligations.", "Review allocation risk and the limits of return assumptions."],
 ["Institutional Investment Consulting", 1, "Advise institutions on investment policy and manager selection.", "Compare a mandate with portfolio and manager evidence."],
 ["Endowment Management", 1, "Manage long-term assets supporting an institution’s mission.", "Review spending assumptions and investment concentration."],
 ["Impact Investing", 1, "Evaluate financial returns alongside intended social or environmental outcomes.", "Compare an investment thesis with measurable outcome evidence."],
 ["Sustainable Finance", 1, "Integrate environmental and social considerations into financing or investment work.", "Challenge a sustainability claim and identify missing evidence."],
 ["Infrastructure Finance", 5, "Analyze financing for infrastructure assets and long-term projects.", "Stress-test project revenue and debt-service coverage."],
 ["Sovereign Debt Analysis", 1, "Analyze government debt, fiscal capacity, and financing risks.", "Compare debt-service needs with fiscal and external funding assumptions."],
 ["Development Finance", 5, "Support financing intended to advance development objectives.", "Review project cash flows and the intended development outcomes."],
 ["Islamic Finance", 5, "Support financing structures subject to relevant contractual and Sharia governance review.", "Identify assumptions and questions requiring specialist structural review."],
 ["Insurance Underwriting", 5, "Assess proposed insurance exposures and pricing evidence.", "Estimate expected claims and identify missing risk information."],
 ["Reinsurance", 5, "Analyze arrangements that transfer part of an insurer’s risk.", "Compare expected claims with a stress case and documented limits."],
 ["Forensic Accounting", 4, "Investigate financial records and explain supported findings.", "Trace an unusual ledger entry to its source evidence."],
 ["Cost Accounting", 4, "Analyze production costs and support planning and reporting.", "Compare unit costs and explain a budget variance."],
 ["Financial Systems Analysis", 4, "Improve systems that support accounting, planning, and reporting.", "Reconcile a migrated balance and investigate a mapping error."],
 ["Insurance Claims Analysis", 5, "Review claims evidence and support consistent claim handling.", "Identify missing evidence before a fictional claims decision."],
];
export const slug=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
const FINANCE_CAREERS=rows.map(([title,group,overview,task,override,track])=>{
 const g=groups[group];const profile={...g.p,...override};
 const name=title.toLowerCase();
 // Added specialties use explicit editorial preferences instead of inheriting an identical group vector.
 if(/personal financial|retirement planning|pension investment|endowment|institutional investment/.test(name))Object.assign(profile,{people:4,quant:2,code:1,pace:1,lifestyle:3,detail:4,strategy:3,enterprise:2});
 if(/mortgage|consumer credit|credit risk|trade finance|sovereign debt/.test(name))Object.assign(profile,{analysis:4,quant:2,detail:4,risk:1,people:3,pace:2,enterprise:2});
 if(/model risk|risk model validation/.test(name))Object.assign(profile,{analysis:4,quant:4,code:4,detail:4,risk:0,pace:2,lifestyle:3});
 if(/foreign exchange|commodities trading|execution trading|repo financing/.test(name))Object.assign(profile,{quant:3,code:2,people:3,risk:4,pace:4,markets:4});
 if(/electronic trading|cybersecurity|financial systems/.test(name))Object.assign(profile,{analysis:4,code:4,detail:4,quant:3,people:2,strategy:3});
 if(/aml|anti-money|know your|sanctions|crime|examination|operational risk/.test(name))Object.assign(profile,{analysis:4,detail:4,risk:0,people:3,markets:1,enterprise:1,pace:2});
 if(/insurance underwriting|insurance claims|reinsurance/.test(name))Object.assign(profile,{analysis:4,quant:3,detail:4,risk:1,markets:0,enterprise:1,people:3});
 if(/impact investing|development finance|sustainable finance/.test(name))Object.assign(profile,{strategy:4,enterprise:4,analysis:4,people:4,quant:2,markets:2});
 const specialty=/personal financial|retirement|pension|endowment|institutional investment|wealth|private banking/.test(name)?'Wealth, Planning & Institutional Clients':/insurance|actuarial|reinsurance/.test(name)?'Insurance & Actuarial Finance':/compliance|risk|anti-money|know your|sanctions|crime|examination|regulatory/.test(name)?'Risk, Compliance & Financial Regulation':/mortgage|consumer credit|retail banking|credit risk|commercial banking|corporate banking|trade finance/.test(name)?'Banking, Lending & Credit':/impact investing|sustainable finance|development finance|sovereign debt|islamic finance/.test(name)?'Public, Sustainable & Specialized Finance':g.name;
 const foundation=track??(/insurance underwriting|insurance claims|reinsurance/.test(name)?'accounting':/anti-money|know your|sanctions|crime|examination|cybersecurity/.test(name)?'operations':g.track);
 return {id:slug(title),title,category:specialty,overview,task,profile,track:foundation,skills:g.skills,tools:g.tools,environment:g.environment,balance:g.balance,pay:g.pay,progress:g.progress,
   weights:Object.fromEntries(DIMS.map(d=>[d,profile[d]>=3.5||profile[d]<=1?1.5:1])) as Profile};
});
export type Career=(typeof FINANCE_CAREERS[number])&{consulting?:ConsultingSpecialty};
export const CAREERS:Career[] = [...FINANCE_CAREERS, ...CONSULTING_SPECIALTIES.map((c)=>{
 const group=groups.find(g=>g.track===c.track)??groups[0];
 const profile={...group.p,...c.preferences};
 return {id:'consulting-'+slug(c.title),title:c.title,category:'Consulting',overview:c.overview,task:c.clientProblem,profile,track:c.track,skills:c.skills.join(', '),tools:'Spreadsheets, interviews, research and communication tools as relevant',environment:'Project teams investigate a client problem, test evidence, share recommendations and support implementation.',balance:'Client needs and project deadlines vary widely. Ask about travel, working hours and team expectations.',pay:'Compare current published compensation and location-specific role information; packages vary by firm and role.',progress:c.entryTitles.join(' / ')+' → consultant → manager or specialist leadership',weights:Object.fromEntries(DIMS.map(d=>[d,profile[d]>=3.5||profile[d]<=1?1.5:1])) as Profile,consulting:c};
})];

export const CAREER_SOURCE='https://www.cfainstitute.org/programs/cfa-program/careers';
