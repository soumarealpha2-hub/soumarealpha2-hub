// Editorial learning definitions with fictional examples. Not an exhaustive dictionary.
export const FINANCE_TERMS=[
 {
  "id": "finance-asset",
  "term": "Asset",
  "meaning": "Something with economic value that a person or business controls.",
  "example": "Cash and equipment are assets.",
  "category": "Foundations"
 },
 {
  "id": "finance-liability",
  "term": "Liability",
  "meaning": "An obligation to transfer cash or another resource.",
  "example": "A bank loan is a liability.",
  "category": "Foundations"
 },
 {
  "id": "finance-equity",
  "term": "Equity",
  "meaning": "The residual ownership claim after liabilities.",
  "example": "Assets of 100 less liabilities of 60 leave equity of 40.",
  "category": "Foundations"
 },
 {
  "id": "finance-principal",
  "term": "Principal",
  "meaning": "The original amount lent or invested, excluding interest.",
  "example": "A 1,000 loan begins with principal of 1,000.",
  "category": "Foundations"
 },
 {
  "id": "finance-interest",
  "term": "Interest",
  "meaning": "A financing charge or return calculated on a balance over time.",
  "example": "5% simple annual interest on 1,000 is 50.",
  "category": "Foundations"
 },
 {
  "id": "finance-compound-interest",
  "term": "Compound interest",
  "meaning": "Interest earned on both principal and previously accumulated interest.",
  "example": "1,000 growing at 10% annually becomes 1,210 after two years.",
  "category": "Foundations"
 },
 {
  "id": "finance-present-value--pv",
  "term": "Present value (PV)",
  "meaning": "The value today of a future amount discounted at a specified rate.",
  "example": "110 in one year discounted at 10% has PV of 100.",
  "category": "Foundations"
 },
 {
  "id": "finance-future-value--fv",
  "term": "Future value (FV)",
  "meaning": "The amount a balance grows to under a specified rate and time.",
  "example": "100 at 10% for one year grows to 110.",
  "category": "Foundations"
 },
 {
  "id": "finance-annuity",
  "term": "Annuity",
  "meaning": "Equal payments at regular intervals for a stated period.",
  "example": "Five annual payments of 100 form an ordinary annuity if paid at year-end.",
  "category": "Foundations"
 },
 {
  "id": "finance-perpetuity",
  "term": "Perpetuity",
  "meaning": "Payments assumed to continue indefinitely.",
  "example": "A level annual payment of 10 discounted at 5% has value of 200.",
  "category": "Foundations"
 },
 {
  "id": "finance-inflation",
  "term": "Inflation",
  "meaning": "An increase in the general price level over time.",
  "example": "A basket rising from 100 to 103 records 3% inflation.",
  "category": "Foundations"
 },
 {
  "id": "finance-real-return",
  "term": "Real return",
  "meaning": "An investment return adjusted for inflation.",
  "example": "10% nominal return with 5% inflation gives about 4.76% real return.",
  "category": "Foundations"
 },
 {
  "id": "finance-opportunity-cost",
  "term": "Opportunity cost",
  "meaning": "The value of the best alternative forgone.",
  "example": "Using cash for equipment means it cannot fund another project.",
  "category": "Foundations"
 },
 {
  "id": "finance-liquidity",
  "term": "Liquidity",
  "meaning": "How readily an asset can be exchanged for cash without a large price impact; also a firm's ability to meet near-term obligations.",
  "example": "A thinly traded security may be hard to sell quickly at its quoted price.",
  "category": "Foundations"
 },
 {
  "id": "finance-leverage",
  "term": "Leverage",
  "meaning": "Use of borrowing or other exposures to amplify gains and losses.",
  "example": "Borrowing 50 to invest alongside 50 of equity creates 100 of exposure.",
  "category": "Foundations"
 },
 {
  "id": "finance-stock---share",
  "term": "Stock / share",
  "meaning": "An ownership interest in a company.",
  "example": "Holding 10 of 100 equally voting shares represents 10% of that class.",
  "category": "Markets"
 },
 {
  "id": "finance-bond",
  "term": "Bond",
  "meaning": "A debt security with contractual payment terms.",
  "example": "A bond may pay coupons and repay principal at maturity.",
  "category": "Markets"
 },
 {
  "id": "finance-coupon",
  "term": "Coupon",
  "meaning": "The contractual interest payment on a bond.",
  "example": "A 5% annual coupon on 1,000 face value pays 50 per year.",
  "category": "Markets"
 },
 {
  "id": "finance-maturity",
  "term": "Maturity",
  "meaning": "The date a contractual financial obligation is scheduled to end or be repaid.",
  "example": "A five-year bond matures five years after its issue date.",
  "category": "Markets"
 },
 {
  "id": "finance-yield-to-maturity--ytm",
  "term": "Yield to maturity (YTM)",
  "meaning": "The discount rate equating a bond's price with its promised cash flows, under the model's assumptions.",
  "example": "A bond below par may have YTM above its coupon rate.",
  "category": "Markets"
 },
 {
  "id": "finance-yield-curve",
  "term": "Yield curve",
  "meaning": "A plot of yields against maturities for comparable instruments.",
  "example": "A curve can show two-year and ten-year government yields.",
  "category": "Markets"
 },
 {
  "id": "finance-duration",
  "term": "Duration",
  "meaning": "A bond sensitivity measure; modified duration approximates percentage price change for a small yield change.",
  "example": "Modified duration of 5 implies about a 5% price drop for a one percentage point yield rise, before convexity.",
  "category": "Markets"
 },
 {
  "id": "finance-convexity",
  "term": "Convexity",
  "meaning": "The curvature in the relationship between bond prices and yields.",
  "example": "Convexity improves a duration-only estimate for larger yield changes.",
  "category": "Markets"
 },
 {
  "id": "finance-credit-spread",
  "term": "Credit spread",
  "meaning": "The yield difference relative to a selected benchmark.",
  "example": "A 6% corporate yield versus a 4% comparable benchmark has a 200 basis point spread.",
  "category": "Markets"
 },
 {
  "id": "finance-bid",
  "term": "Bid",
  "meaning": "A price at which a participant is willing to buy.",
  "example": "A dealer quotes a bid of 99.",
  "category": "Markets"
 },
 {
  "id": "finance-ask---offer",
  "term": "Ask / offer",
  "meaning": "A price at which a participant is willing to sell.",
  "example": "A quote of 99 bid and 101 ask has a spread of 2.",
  "category": "Markets"
 },
 {
  "id": "finance-market-order",
  "term": "Market order",
  "meaning": "An instruction to trade promptly at available prices, without a fixed execution-price limit.",
  "example": "A buy market order may execute above the last displayed price.",
  "category": "Markets"
 },
 {
  "id": "finance-limit-order",
  "term": "Limit order",
  "meaning": "An instruction to trade at a specified price or better.",
  "example": "A buy limit of 50 cannot execute above 50.",
  "category": "Markets"
 },
 {
  "id": "finance-short-selling",
  "term": "Short selling",
  "meaning": "Selling borrowed securities with an obligation to return them later.",
  "example": "Selling at 100 and buying back at 90 produces 10 gross profit before costs.",
  "category": "Markets"
 },
 {
  "id": "finance-market-capitalization",
  "term": "Market capitalization",
  "meaning": "Share price multiplied by outstanding shares under the selected share-count convention.",
  "example": "10 per share times 1 million shares gives 10 million market cap.",
  "category": "Markets"
 },
 {
  "id": "finance-dividend",
  "term": "Dividend",
  "meaning": "A distribution by a company to shareholders.",
  "example": "A 0.50 cash dividend on 20 shares pays 10 before tax.",
  "category": "Markets"
 },
 {
  "id": "finance-exchange-traded-fund--etf",
  "term": "Exchange-traded fund (ETF)",
  "meaning": "A pooled investment whose shares trade on an exchange.",
  "example": "An ETF can hold a basket of bonds.",
  "category": "Markets"
 },
 {
  "id": "finance-mutual-fund",
  "term": "Mutual fund",
  "meaning": "A pooled investment vehicle that typically prices purchases and redemptions at calculated net asset value.",
  "example": "A fund combines money from multiple investors.",
  "category": "Markets"
 },
 {
  "id": "finance-net-asset-value--nav",
  "term": "Net asset value (NAV)",
  "meaning": "Assets minus liabilities, often expressed per fund share.",
  "example": "Assets of 110 less liabilities of 10 over 20 shares gives NAV of 5 per share.",
  "category": "Markets"
 },
 {
  "id": "finance-index",
  "term": "Index",
  "meaning": "A rules-based measure tracking a selected group of securities.",
  "example": "An equity index can track a defined set of listed companies.",
  "category": "Markets"
 },
 {
  "id": "finance-benchmark",
  "term": "Benchmark",
  "meaning": "A reference used to evaluate results or risk.",
  "example": "A portfolio can be compared with a suitable market index.",
  "category": "Markets"
 },
 {
  "id": "finance-alpha",
  "term": "Alpha",
  "meaning": "Return relative to what a specified risk model predicts; its meaning depends on the model.",
  "example": "A positive estimated alpha is not proof of lasting skill.",
  "category": "Markets"
 },
 {
  "id": "finance-beta",
  "term": "Beta",
  "meaning": "Sensitivity of returns to a specified market or factor in a model.",
  "example": "Beta of 1.2 suggests greater sensitivity than 1 to that benchmark.",
  "category": "Markets"
 },
 {
  "id": "finance-correlation",
  "term": "Correlation",
  "meaning": "A measure of linear co-movement between variables, from -1 to 1.",
  "example": "Zero correlation does not establish independence.",
  "category": "Markets"
 },
 {
  "id": "finance-sharpe-ratio",
  "term": "Sharpe ratio",
  "meaning": "Excess return over a selected risk-free rate divided by return volatility using consistent periods.",
  "example": "8% excess return divided by 10% volatility gives 0.8.",
  "category": "Markets"
 },
 {
  "id": "finance-derivative",
  "term": "Derivative",
  "meaning": "A contract whose value depends on an underlying asset, rate, or other reference.",
  "example": "An option depends partly on the underlying share price.",
  "category": "Derivatives"
 },
 {
  "id": "finance-forward",
  "term": "Forward",
  "meaning": "A privately negotiated contract to transact on agreed future terms.",
  "example": "Two parties agree today to exchange currency in three months.",
  "category": "Derivatives"
 },
 {
  "id": "finance-futures",
  "term": "Futures",
  "meaning": "A standardized exchange-traded contract with margin and daily settlement arrangements.",
  "example": "A commodity futures position changes in value as prices move.",
  "category": "Derivatives"
 },
 {
  "id": "finance-option",
  "term": "Option",
  "meaning": "A contract giving its holder a right, rather than an obligation, under specified terms.",
  "example": "An equity option can give the right to buy shares at a strike price.",
  "category": "Derivatives"
 },
 {
  "id": "finance-call-option",
  "term": "Call option",
  "meaning": "An option giving the holder a right to buy under its contract terms.",
  "example": "At expiry, a call with strike 100 and spot 110 has intrinsic value 10 per unit.",
  "category": "Derivatives"
 },
 {
  "id": "finance-put-option",
  "term": "Put option",
  "meaning": "An option giving the holder a right to sell under its contract terms.",
  "example": "At expiry, a put with strike 100 and spot 90 has intrinsic value 10 per unit.",
  "category": "Derivatives"
 },
 {
  "id": "finance-strike-price",
  "term": "Strike price",
  "meaning": "The contractual exercise price of an option.",
  "example": "A call strike of 100 specifies its purchase price upon exercise.",
  "category": "Derivatives"
 },
 {
  "id": "finance-option-premium",
  "term": "Option premium",
  "meaning": "The price paid to acquire an option.",
  "example": "A premium of 3 per unit costs 300 for 100 units, before fees.",
  "category": "Derivatives"
 },
 {
  "id": "finance-delta",
  "term": "Delta",
  "meaning": "Approximate change in option value for a small change in the underlying, holding other inputs fixed.",
  "example": "Delta of 0.5 suggests about 0.50 option-price change for a 1 underlying-price rise.",
  "category": "Derivatives"
 },
 {
  "id": "finance-gamma",
  "term": "Gamma",
  "meaning": "Sensitivity of delta to the underlying price.",
  "example": "Higher gamma means delta changes more quickly.",
  "category": "Derivatives"
 },
 {
  "id": "finance-vega",
  "term": "Vega",
  "meaning": "Sensitivity of option value to implied volatility; quoting conventions vary.",
  "example": "A vega quote should specify whether it uses one volatility percentage point.",
  "category": "Derivatives"
 },
 {
  "id": "finance-theta",
  "term": "Theta",
  "meaning": "Sensitivity of option value to the passage of time under a stated convention.",
  "example": "An option may lose time value as expiry approaches.",
  "category": "Derivatives"
 },
 {
  "id": "finance-swap",
  "term": "Swap",
  "meaning": "A contract to exchange cash flows under agreed rules.",
  "example": "An interest-rate swap can exchange fixed for floating payments.",
  "category": "Derivatives"
 },
 {
  "id": "finance-hedging",
  "term": "Hedging",
  "meaning": "Taking an exposure intended to offset some existing risk.",
  "example": "A company can hedge part of a future currency payment.",
  "category": "Derivatives"
 },
 {
  "id": "finance-initial-margin",
  "term": "Initial margin",
  "meaning": "Collateral required when establishing or maintaining a margined position.",
  "example": "Opening a futures position can require an initial collateral deposit.",
  "category": "Derivatives"
 },
 {
  "id": "finance-variation-margin",
  "term": "Variation margin",
  "meaning": "Payments or collateral movements reflecting changes in a position's market value.",
  "example": "A daily adverse price move can require additional cash.",
  "category": "Derivatives"
 },
 {
  "id": "finance-revenue",
  "term": "Revenue",
  "meaning": "Income from ordinary business activities recognized under the applicable framework.",
  "example": "A service performed on credit can create revenue before cash arrives.",
  "category": "Accounting"
 },
 {
  "id": "finance-gross-profit",
  "term": "Gross profit",
  "meaning": "Revenue minus the cost of goods or services sold under the chosen presentation.",
  "example": "Sales of 100 less cost of sales of 60 gives gross profit of 40.",
  "category": "Accounting"
 },
 {
  "id": "finance-gross-margin",
  "term": "Gross margin",
  "meaning": "Gross profit divided by revenue.",
  "example": "Gross profit 40 on revenue 100 gives 40% gross margin.",
  "category": "Accounting"
 },
 {
  "id": "finance-net-income",
  "term": "Net income",
  "meaning": "Profit after recognized expenses, taxes, and other applicable items.",
  "example": "Revenue of 100 less total expenses of 90 gives net income of 10.",
  "category": "Accounting"
 },
 {
  "id": "finance-balance-sheet",
  "term": "Balance sheet",
  "meaning": "A statement of assets, liabilities, and equity at a specified date.",
  "example": "It reports cash held at year-end rather than cash earned during the year.",
  "category": "Accounting"
 },
 {
  "id": "finance-income-statement",
  "term": "Income statement",
  "meaning": "A statement of recognized income and expenses over a period.",
  "example": "A quarterly statement reports that quarter's profit.",
  "category": "Accounting"
 },
 {
  "id": "finance-cash-flow-statement",
  "term": "Cash flow statement",
  "meaning": "A statement explaining cash movements from operating, investing, and financing activities.",
  "example": "Borrowing is normally classified as a financing inflow.",
  "category": "Accounting"
 },
 {
  "id": "finance-accounts-payable",
  "term": "Accounts payable",
  "meaning": "Amounts owed to suppliers for goods or services bought on credit.",
  "example": "An unpaid supplier invoice creates a payable.",
  "category": "Accounting"
 },
 {
  "id": "finance-inventory",
  "term": "Inventory",
  "meaning": "Goods held for sale or production under the applicable accounting rules.",
  "example": "A retailer's unsold goods are inventory.",
  "category": "Accounting"
 },
 {
  "id": "finance-amortization",
  "term": "Amortization",
  "meaning": "Allocation of an intangible asset's cost over its useful life; also scheduled repayment of a loan.",
  "example": "A finite-life software asset can have an amortization charge.",
  "category": "Accounting"
 },
 {
  "id": "finance-goodwill",
  "term": "Goodwill",
  "meaning": "An acquisition accounting residual after relevant identifiable net assets and other required adjustments.",
  "example": "Paying 120 for identifiable net assets of 100 may create 20 goodwill in a simplified acquisition.",
  "category": "Accounting"
 },
 {
  "id": "finance-impairment",
  "term": "Impairment",
  "meaning": "A reduction in an asset's carrying amount when required by the accounting framework.",
  "example": "An asset's recognized value can fall after an impairment review.",
  "category": "Accounting"
 },
 {
  "id": "finance-deferred-revenue",
  "term": "Deferred revenue",
  "meaning": "A liability arising from payment received before the associated performance is fulfilled.",
  "example": "An annual subscription prepaid by a customer may be recognized over the service period.",
  "category": "Accounting"
 },
 {
  "id": "finance-audit",
  "term": "Audit",
  "meaning": "An independent examination to obtain assurance under the relevant standards.",
  "example": "An audit opinion does not guarantee that every error or fraud was found.",
  "category": "Accounting"
 },
 {
  "id": "finance-materiality",
  "term": "Materiality",
  "meaning": "The importance of an omission or misstatement to users' decisions in context.",
  "example": "A small amount may still be material because of its nature.",
  "category": "Accounting"
 },
 {
  "id": "finance-internal-control",
  "term": "Internal control",
  "meaning": "A process intended to provide reasonable assurance toward operational, reporting, or compliance objectives.",
  "example": "Separating payment preparation and approval is a control.",
  "category": "Accounting"
 },
 {
  "id": "finance-return-on-equity--roe",
  "term": "Return on equity (ROE)",
  "meaning": "Net income divided by equity using a specified period and balance convention.",
  "example": "Income 10 divided by average equity 100 gives 10% ROE.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-return-on-assets--roa",
  "term": "Return on assets (ROA)",
  "meaning": "A return measure relative to assets; specify the numerator and balance convention.",
  "example": "Income 10 divided by average assets 200 gives 5% under that definition.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-current-ratio",
  "term": "Current ratio",
  "meaning": "Current assets divided by current liabilities.",
  "example": "120 divided by 80 gives a ratio of 1.5.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-quick-ratio",
  "term": "Quick ratio",
  "meaning": "Liquid current assets relative to current liabilities; definitions vary.",
  "example": "Cash and receivables 80 over current liabilities 40 gives 2 under this definition.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-net-present-value--npv",
  "term": "Net present value (NPV)",
  "meaning": "Discounted future net cash flows including the initial investment.",
  "example": "Paying 100 now for 110 in one year at a 10% discount rate gives NPV of zero.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-internal-rate-of-return--irr",
  "term": "Internal rate of return (IRR)",
  "meaning": "A discount rate at which modeled NPV equals zero; some cash-flow patterns have multiple or no IRRs.",
  "example": "An outflow of 100 followed by 110 a year later has IRR of 10%.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-payback-period",
  "term": "Payback period",
  "meaning": "Time needed to recover an initial investment from cash flows, ignoring discounting unless specified.",
  "example": "A 100 outlay with 25 annual cash inflows has four-year simple payback.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-capital-budgeting",
  "term": "Capital budgeting",
  "meaning": "Evaluating and selecting long-term investment projects.",
  "example": "Compare a new machine's costs and expected cash flows.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-cost-of-equity",
  "term": "Cost of equity",
  "meaning": "The return required by equity investors under a chosen estimation approach.",
  "example": "A valuation may assume an 11% required equity return.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-cost-of-debt",
  "term": "Cost of debt",
  "meaning": "A borrowing return or financing cost under a stated definition.",
  "example": "A company may estimate a 6% pretax marginal cost of borrowing.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-capital-asset-pricing-model--capm",
  "term": "Capital asset pricing model (CAPM)",
  "meaning": "A model estimating expected return from a risk-free rate plus beta times a market risk premium.",
  "example": "3% plus beta 1.2 times a 5% market premium gives 9%.",
  "category": "Corporate finance"
 },
 {
  "id": "finance-comparable-company-analysis",
  "term": "Comparable company analysis",
  "meaning": "Valuation using selected public-company multiples and adjustments.",
  "example": "Compare enterprise-value-to-EBITDA multiples for similar businesses.",
  "category": "Valuation"
 },
 {
  "id": "finance-precedent-transactions",
  "term": "Precedent transactions",
  "meaning": "Valuation evidence from selected previous acquisitions.",
  "example": "A deal multiple may include a control premium and differ from public trading multiples.",
  "category": "Valuation"
 },
 {
  "id": "finance-price-to-earnings-ratio--p-e",
  "term": "Price-to-earnings ratio (P/E)",
  "meaning": "Share price divided by earnings per share using a stated earnings period.",
  "example": "A price of 20 and EPS of 2 gives P/E of 10.",
  "category": "Valuation"
 },
 {
  "id": "finance-sensitivity-analysis",
  "term": "Sensitivity analysis",
  "meaning": "Changing assumptions to see their effect on results.",
  "example": "Compare DCF values at different discount rates.",
  "category": "Valuation"
 },
 {
  "id": "finance-scenario-analysis",
  "term": "Scenario analysis",
  "meaning": "Evaluating coherent sets of assumptions together.",
  "example": "A downside case combines lower sales with higher financing costs.",
  "category": "Valuation"
 },
 {
  "id": "finance-venture-capital--vc",
  "term": "Venture capital (VC)",
  "meaning": "Investment in young companies with substantial growth potential and high uncertainty.",
  "example": "A VC fund may invest in an early-stage software business.",
  "category": "Private markets"
 },
 {
  "id": "finance-private-equity--pe",
  "term": "Private equity (PE)",
  "meaning": "Investment in privately held ownership interests, including buyout and growth strategies.",
  "example": "A buyout fund can acquire a controlling business stake.",
  "category": "Private markets"
 },
 {
  "id": "finance-leveraged-buyout--lbo",
  "term": "Leveraged buyout (LBO)",
  "meaning": "An acquisition financed partly with borrowing.",
  "example": "Debt finances part of a purchase, increasing both equity upside and downside.",
  "category": "Private markets"
 },
 {
  "id": "finance-post-money-valuation",
  "term": "Post-money valuation",
  "meaning": "Company valuation immediately after a financing under specified deal assumptions.",
  "example": "Pre-money 4 million plus 1 million primary funding gives simple post-money value of 5 million.",
  "category": "Private markets"
 },
 {
  "id": "finance-cap-table",
  "term": "Cap table",
  "meaning": "A record of ownership interests and relevant securities.",
  "example": "A fully diluted table may include options and convertible securities.",
  "category": "Private markets"
 },
 {
  "id": "finance-term-sheet",
  "term": "Term sheet",
  "meaning": "A summary of proposed deal terms; binding provisions depend on its wording.",
  "example": "A financing sheet can specify valuation and investor rights.",
  "category": "Private markets"
 },
 {
  "id": "finance-due-diligence",
  "term": "Due diligence",
  "meaning": "Investigation of evidence before a transaction or decision.",
  "example": "Review contracts, accounts, customer data, and risks before investing.",
  "category": "Private markets"
 },
 {
  "id": "finance-carried-interest",
  "term": "Carried interest",
  "meaning": "A share of investment profits allocated under a fund's partnership terms.",
  "example": "Carry depends on the agreed waterfall and any hurdles.",
  "category": "Private markets"
 },
 {
  "id": "finance-limited-partner--lp",
  "term": "Limited partner (LP)",
  "meaning": "An investor participating in a limited partnership under its terms.",
  "example": "A pension fund may be an LP in a private-market fund.",
  "category": "Private markets"
 },
 {
  "id": "finance-general-partner--gp",
  "term": "General partner (GP)",
  "meaning": "A partnership manager with responsibilities defined by the fund structure.",
  "example": "The GP oversees investment decisions under the partnership agreement.",
  "category": "Private markets"
 },
 {
  "id": "finance-moic",
  "term": "MOIC",
  "meaning": "Multiple on invested capital; specify whether gross or net and what values are included.",
  "example": "Receiving 200 from an investment of 100 gives 2 times realized MOIC before fees.",
  "category": "Private markets"
 },
 {
  "id": "finance-exit",
  "term": "Exit",
  "meaning": "A transaction or process used to realize an investment.",
  "example": "An investor may exit through a sale or public offering.",
  "category": "Private markets"
 },
 {
  "id": "finance-collateral",
  "term": "Collateral",
  "meaning": "Assets pledged to support an obligation.",
  "example": "A lender may have a security interest in equipment.",
  "category": "Banking & credit"
 },
 {
  "id": "finance-covenant",
  "term": "Covenant",
  "meaning": "A contractual promise or restriction in a financing agreement.",
  "example": "A loan may require a minimum coverage ratio.",
  "category": "Banking & credit"
 },
 {
  "id": "finance-default",
  "term": "Default",
  "meaning": "Failure to fulfill a contractual obligation under the applicable terms.",
  "example": "Missing a required loan payment may constitute default after any relevant grace period.",
  "category": "Banking & credit"
 },
 {
  "id": "finance-probability-of-default--pd",
  "term": "Probability of default (PD)",
  "meaning": "An estimate of default likelihood over a specified horizon.",
  "example": "A model may estimate one-year PD at 2%.",
  "category": "Banking & credit"
 },
 {
  "id": "finance-loss-given-default--lgd",
  "term": "Loss given default (LGD)",
  "meaning": "The estimated portion of exposure lost conditional on default.",
  "example": "40% LGD on exposure of 100 implies loss of 40 if default occurs under the assumptions.",
  "category": "Banking & credit"
 },
 {
  "id": "finance-exposure-at-default--ead",
  "term": "Exposure at default (EAD)",
  "meaning": "The estimated amount exposed when default occurs.",
  "example": "A drawn loan balance can form part of EAD.",
  "category": "Banking & credit"
 },
 {
  "id": "finance-securitization",
  "term": "Securitization",
  "meaning": "Financing in which asset cash flows support issued securities under a structured arrangement.",
  "example": "Mortgage cash flows can support mortgage-backed securities.",
  "category": "Banking & credit"
 },
 {
  "id": "finance-tranche",
  "term": "Tranche",
  "meaning": "A class of a structured financing with particular payment priority or risk.",
  "example": "A junior tranche absorbs losses before a senior tranche under the waterfall.",
  "category": "Banking & credit"
 },
 {
  "id": "finance-underwriting",
  "term": "Underwriting",
  "meaning": "Evaluating and assuming risk in lending or insurance; also arranging securities issuance.",
  "example": "Loan underwriting evaluates repayment capacity.",
  "category": "Banking & credit"
 },
 {
  "id": "finance-market-risk",
  "term": "Market risk",
  "meaning": "Risk from movements in market prices or rates.",
  "example": "A bond position loses value when its yield rises.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-credit-risk",
  "term": "Credit risk",
  "meaning": "Risk of loss from a borrower or counterparty failing to meet obligations.",
  "example": "A lender faces credit risk if a borrower cannot repay.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-liquidity-risk",
  "term": "Liquidity risk",
  "meaning": "Risk of being unable to meet obligations or transact without unacceptable cost.",
  "example": "An asset may need to be sold at a steep discount during stress.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-value-at-risk--var",
  "term": "Value at risk (VaR)",
  "meaning": "A modeled loss threshold for a stated horizon and confidence level, under specified assumptions.",
  "example": "A 99% one-day VaR does not cap the worst possible loss.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-expected-shortfall",
  "term": "Expected shortfall",
  "meaning": "Average loss beyond a selected risk quantile under the model.",
  "example": "It describes tail severity rather than a guaranteed maximum loss.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-stress-test",
  "term": "Stress test",
  "meaning": "An analysis of exposure under adverse assumptions.",
  "example": "Test whether liquidity survives a severe cash-outflow scenario.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-know-your-customer--kyc",
  "term": "Know your customer (KYC)",
  "meaning": "Processes to identify and understand customers under applicable requirements.",
  "example": "Verify customer identity and relevant ownership information.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-anti-money-laundering--aml",
  "term": "Anti-money laundering (AML)",
  "meaning": "Processes intended to prevent, detect, and report relevant financial crime under applicable rules.",
  "example": "An unusual payment can trigger review rather than prove wrongdoing.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-beneficial-owner",
  "term": "Beneficial owner",
  "meaning": "A person who ultimately owns or controls an entity under the applicable definition.",
  "example": "A company structure can require looking beyond the direct shareholder.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-sanctions-screening",
  "term": "Sanctions screening",
  "meaning": "Checking parties and transactions against applicable restrictions and review procedures.",
  "example": "A name match requires investigation before a supported decision.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-model-risk",
  "term": "Model risk",
  "meaning": "Risk from incorrect models or inappropriate model use.",
  "example": "A valuation can mislead when used outside its assumptions.",
  "category": "Risk & regulation"
 },
 {
  "id": "finance-clearing",
  "term": "Clearing",
  "meaning": "Processes after execution to determine or manage transaction obligations, sometimes through a central counterparty.",
  "example": "A clearing process can calculate net obligations before settlement.",
  "category": "Operations"
 },
 {
  "id": "finance-netting",
  "term": "Netting",
  "meaning": "Offsetting obligations under agreed legal and operational rules.",
  "example": "Mutual eligible payments of 100 and 70 may leave one net payment of 30.",
  "category": "Operations"
 },
 {
  "id": "finance-central-counterparty--ccp",
  "term": "Central counterparty (CCP)",
  "meaning": "An entity that becomes counterparty to cleared transactions under its rules.",
  "example": "A CCP manages member exposure through margin and other controls.",
  "category": "Operations"
 },
 {
  "id": "finance-corporate-action",
  "term": "Corporate action",
  "meaning": "An issuer event affecting securities or their holders.",
  "example": "A stock split or dividend can require record updates.",
  "category": "Operations"
 },
 {
  "id": "finance-straight-through-processing--stp",
  "term": "Straight-through processing (STP)",
  "meaning": "Processing transactions with minimal manual intervention across linked systems.",
  "example": "Validated trade data can flow automatically into downstream systems.",
  "category": "Operations"
 },
 {
  "id": "finance-nostro-account",
  "term": "Nostro account",
  "meaning": "A bank's account held with another bank, viewed from the account-owning bank.",
  "example": "A bank uses its foreign-currency nostro to make payments.",
  "category": "Operations"
 },
 {
  "id": "finance-swift",
  "term": "SWIFT",
  "meaning": "A financial messaging network and standards ecosystem; messaging itself is not settlement.",
  "example": "A payment message can carry instructions while funds move through separate accounts.",
  "category": "Operations"
 },
 {
  "id": "finance-isin",
  "term": "ISIN",
  "meaning": "An international securities identification number used to identify securities.",
  "example": "Two share classes can have different ISINs.",
  "category": "Operations"
 },
 {
  "id": "finance-mark-to-market",
  "term": "Mark-to-market",
  "meaning": "Valuing a position using current market information under a stated method.",
  "example": "A holding bought at 100 may be valued at 105 later.",
  "category": "Operations"
 },
 {
  "id": "finance-regression",
  "term": "Regression",
  "meaning": "A statistical method relating an outcome to explanatory variables.",
  "example": "A return model can estimate market sensitivity using regression.",
  "category": "Quantitative finance"
 },
 {
  "id": "finance-overfitting",
  "term": "Overfitting",
  "meaning": "Fitting noise in training data so a model performs poorly on new observations.",
  "example": "A rule with many tuned parameters may look strong only in its training sample.",
  "category": "Quantitative finance"
 },
 {
  "id": "finance-monte-carlo-simulation",
  "term": "Monte Carlo simulation",
  "meaning": "Repeated random sampling to estimate outcomes under a specified model.",
  "example": "Simulate many possible price paths to study a payoff distribution.",
  "category": "Quantitative finance"
 },
 {
  "id": "finance-stationarity",
  "term": "Stationarity",
  "meaning": "A property in which selected statistical characteristics remain stable over time under the specified definition.",
  "example": "A changing market regime can invalidate a stationary-data assumption.",
  "category": "Quantitative finance"
 },
 {
  "id": "finance-survivorship-bias",
  "term": "Survivorship bias",
  "meaning": "Bias from excluding observations that failed or disappeared.",
  "example": "Testing only today's surviving funds can overstate past performance.",
  "category": "Quantitative finance"
 },
 {
  "id": "finance-slippage",
  "term": "Slippage",
  "meaning": "Difference between an expected execution price and actual execution.",
  "example": "A buy expected at 100 but filled at 100.20 has adverse slippage of 0.20.",
  "category": "Quantitative finance"
 },
 {
  "id": "finance-transaction-costs",
  "term": "Transaction costs",
  "meaning": "Costs associated with trading, including fees and relevant execution costs.",
  "example": "Commissions and spreads reduce a strategy's net return.",
  "category": "Quantitative finance"
 },
 {
  "id": "finance-premium",
  "term": "Premium",
  "meaning": "The payment for insurance coverage under a policy.",
  "example": "A business pays an annual premium for a specified policy.",
  "category": "Insurance"
 },
 {
  "id": "finance-deductible",
  "term": "Deductible",
  "meaning": "The portion of a covered loss borne by the insured under policy terms.",
  "example": "A 500 deductible can reduce a qualifying claim payment by 500.",
  "category": "Insurance"
 },
 {
  "id": "finance-reinsurance",
  "term": "Reinsurance",
  "meaning": "Insurance that transfers some of an insurer's risk to another insurer.",
  "example": "An insurer can cede a defined layer of loss.",
  "category": "Insurance"
 },
 {
  "id": "finance-actuary",
  "term": "Actuary",
  "meaning": "A professional using mathematics and statistics to evaluate financial uncertainty.",
  "example": "An actuary can estimate future claim costs.",
  "category": "Insurance"
 },
 {
  "id": "finance-loan-to-value--ltv",
  "term": "Loan-to-value (LTV)",
  "meaning": "Loan amount divided by the relevant asset value.",
  "example": "A 75 loan on property valued at 100 has 75% LTV.",
  "category": "Property"
 },
 {
  "id": "finance-occupancy-rate",
  "term": "Occupancy rate",
  "meaning": "Occupied space or units divided by total available space or units under a defined measure.",
  "example": "90 occupied units out of 100 gives 90% occupancy.",
  "category": "Property"
 },
 {
  "id": "finance-annual-percentage-rate--apr",
  "term": "Annual percentage rate (APR)",
  "meaning": "An annualized borrowing-cost measure under applicable conventions.",
  "example": "APR and an effective compounded annual rate can differ.",
  "category": "Personal finance"
 },
 {
  "id": "finance-annual-percentage-yield--apy",
  "term": "Annual percentage yield (APY)",
  "meaning": "An annualized yield reflecting compounding under stated assumptions.",
  "example": "A nominal 12% rate compounded monthly has APY of about 12.68%.",
  "category": "Personal finance"
 },
 {
  "id": "finance-asset-allocation",
  "term": "Asset allocation",
  "meaning": "Dividing a portfolio among asset classes according to objectives and constraints.",
  "example": "A sample portfolio assigns 60% to stocks and 40% to bonds.",
  "category": "Personal finance"
 },
 {
  "id": "finance-risk-tolerance",
  "term": "Risk tolerance",
  "meaning": "A person's willingness and ability to bear investment uncertainty, which should be distinguished.",
  "example": "Comfort with volatility does not by itself mean someone can afford a loss.",
  "category": "Personal finance"
 },
 {
  "id": "finance-esg",
  "term": "ESG",
  "meaning": "Environmental, social, and governance factors considered in analysis under a stated approach.",
  "example": "An analyst may examine emissions and governance alongside financial information.",
  "category": "Sustainable finance"
 },
 {
  "id": "finance-impact-investing",
  "term": "Impact investing",
  "meaning": "Investment intended to generate measurable positive social or environmental impact alongside financial return.",
  "example": "A fund can track both cash flows and a defined access-to-services outcome.",
  "category": "Sustainable finance"
 },
 {
  "id": "finance-green-bond",
  "term": "Green bond",
  "meaning": "A bond whose proceeds are intended for eligible environmental projects under its framework.",
  "example": "A green bond may finance renewable infrastructure without guaranteeing project success.",
  "category": "Sustainable finance"
 },
 {
  "id": "finance-open-banking",
  "term": "Open banking",
  "meaning": "Sharing eligible banking data or enabling services through permissioned interfaces under applicable arrangements.",
  "example": "A customer may authorize an app to access specified account data.",
  "category": "Fintech"
 },
 {
  "id": "finance-api",
  "term": "API",
  "meaning": "An application programming interface through which systems exchange requests and responses.",
  "example": "A training app can request market data through an API.",
  "category": "Fintech"
 },
 {
  "id": "finance-blockchain",
  "term": "Blockchain",
  "meaning": "A distributed ledger architecture linking records with cryptographic mechanisms under specified rules.",
  "example": "A transaction record can be replicated among network participants.",
  "category": "Fintech"
 },
 {
  "id": "finance-stablecoin",
  "term": "Stablecoin",
  "meaning": "A digital token designed to track a reference value; mechanisms and risks vary.",
  "example": "A token targeting one dollar can still lose its peg.",
  "category": "Fintech"
 }
];
