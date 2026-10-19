import {consultingDetail} from './consulting-details';
import {DIMENSIONS,DIMS,type Career,type Dimension} from './careers';
type Employer={name:string;url:string;focus:string};
const firms:Record<string,Employer>={
 gs:{name:'Goldman Sachs',url:'https://www.goldmansachs.com/careers/our-firm',focus:'Investment banking, markets, asset management, and operations'},
 jp:{name:'JPMorganChase',url:'https://www.jpmorganchase.com/careers/explore-opportunities',focus:'Banking, payments, finance, technology, risk, and compliance'},
 br:{name:'BlackRock',url:'https://careers.blackrock.com/',focus:'Investment management, investment products, and financial technology'},
 ey:{name:'EY',url:'https://www.ey.com/en_us/careers/students-and-entry-level-professionals',focus:'Assurance, tax, consulting, and transaction advisory'},
 js:{name:'Jane Street',url:'https://www.janestreet.com/join-jane-street/overview/',focus:'Quantitative trading, research, machine learning, and engineering'},
 sr:{name:'Swiss Re',url:'https://www.swissre.com/careers.html',focus:'Reinsurance, underwriting, actuarial analysis, and insurance operations'},
 vc:{name:'Partech',url:'https://partechpartners.com/team',focus:'Venture investing, including African technology startups'},
 fdic:{name:'FDIC',url:'https://www.fdic.gov/careers',focus:'Financial institution supervision and bank examination'},
 ifc:{name:'International Finance Corporation',url:'https://www.worldbank.org/ext/en/careers',focus:'Private-sector development investment and advisory work'},
 isdb:{name:'Islamic Development Bank',url:'https://careers.isdb.org/',focus:'Development finance and Islamic financing structures'},
 bx:{name:'Blackstone',url:'https://www.blackstone.com/careers/careers-blackstone/',focus:'Private equity, real estate, credit, and infrastructure investment'}
};
export function employerGuide(c:Career){
 const n=c.title.toLowerCase();let ids:string[],setting:string;
 const consulting=consultingDetail(c.title);
 if(consulting){return {firms:[consulting.employer],setting:'Consulting and specialist advisory teams',interests:DIMS.filter(d=>c.profile[d]>=3.5).slice(0,4),roleSearch:'consulting' in c&&c.consulting?c.consulting.entryTitles.join(', '):c.title,questions:['What work do entry-level colleagues do each week?','How much travel and client-site work is expected?','How are new colleagues trained and their work reviewed?']};}
 if(/financial examination/.test(n)){ids=['fdic'];setting='Public financial regulators and supervisory agencies';}
 else if(/islamic/.test(n)){ids=['isdb'];setting='Islamic financial institutions and specialist structuring teams';}
 else if(/development|impact|sustainable|project finance|infrastructure|sovereign/.test(n)){ids=['ifc','br'];setting='Development institutions, project-finance teams, and investment managers';}
 else if(/venture/.test(n)){ids=['vc'];setting='Venture funds and startup investment teams';}
 else if(/insurance|actuarial|reinsurance/.test(n)){ids=['sr'];setting='Insurers, reinsurers, and specialist advisory teams';}
 else if(/private equity|real estate/.test(n)){ids=['bx','br'];setting='Private-market investment managers and specialist finance teams';}
 else if(/quantitative|electronic trading|trading strategy/.test(n)){ids=['js','gs'];setting='Quantitative trading firms, market-making teams, and bank research groups';}
 else if(/accounting|audit|tax|consulting|restructuring|financial advisory/.test(n)){ids=['ey','jp'];setting='Professional-services firms and in-house finance teams';}
 else if(/fund |transfer agency|asset servicing|securities services|settlement|reconciliation|operations|middle office|collateral|margin|onboarding|regulatory reporting|anti-money|know your|sanctions|crime|liquidity risk|operational risk/.test(n)){ids=['jp','gs'];setting='Banks, custody providers, fund administrators, and financial operations teams';}
 else if(/asset management|portfolio|research|hedge|pension|endowment|institutional|investment risk|etf/.test(n)){ids=['br','gs'];setting='Investment managers, institutional asset owners, and research teams';}
 else if(/investment banking|mergers|capital markets|leveraged|sales and trading|derivatives|structuring|foreign exchange|commodities|execution|repo|prime brokerage|securities lending/.test(n)){ids=['gs','jp'];setting='Investment banks, market intermediaries, and specialist advisory firms';}
 else{ids=['jp','gs'];setting='Banks and in-house finance, client-service, product, or control teams';}
 const interests=DIMS.filter(d=>c.profile[d]>=3.5).sort((a,b)=>c.profile[b]-c.profile[a]).slice(0,4);
 return {firms:ids.map(id=>firms[id]),setting,interests,roleSearch:c.title,questions:['What does an entry-level colleague do each week?','How are work reviewed, mistakes handled, and juniors supported?','What are the actual hours, busy periods, and location requirements?']};
}
export function personalEmployerFit(c:Career,reasons:Dimension[]){
 const guide=employerGuide(c);const overlap=reasons.filter(d=>guide.interests.includes(d));
 return overlap.length?`Your reported interest in ${overlap.map(d=>DIMENSIONS[d].toLowerCase()).join(', ')} is a reason to explore these related teams. Ask how those activities appear in the actual role.`:'Explore these teams through the work sample and a conversation about daily responsibilities.';
}
