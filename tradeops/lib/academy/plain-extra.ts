/** Extra-simple explanations for complex finance terms. Technical definitions remain available in the glossary. */
export const PLAIN_EXTRA_TERMS: Record<string,{meaning:string;example:string}> = Object.fromEntries(
[
  [
    "WACC",
    "The average return a business needs to earn to make both its lenders and owners willing to provide money.",
    "A shop uses a bank loan and money from its owners. It needs to earn enough to make both sources of money worthwhile."
  ],
  [
    "EBITDA",
    "A way to compare how much a business earns from its main work before certain costs are counted. It is not the same as cash in the bank.",
    "Two restaurants compare earnings from serving food before looking at loan interest, taxes, and some accounting charges."
  ],
  [
    "EBIT",
    "Profit from running a business before counting loan interest and income taxes.",
    "A cafe sells $500 of food and has $350 of running costs. Its operating profit is $150."
  ],
  [
    "NOPAT",
    "The profit from running a business after a simplified tax charge, without subtracting loan interest.",
    "A shop earns $100 from operations. At a 25% example tax rate, $75 remains."
  ],
  [
    "Free cash flow to the firm (FCFF)",
    "Cash left from running a business after taxes and money needed to keep it operating and growing, before payments to lenders or owners.",
    "A bakery collects money, pays its bills and taxes, buys a needed oven, and has $200 left for the people who fund it."
  ],
  [
    "Operating working capital",
    "Money tied up in day-to-day things like products waiting to sell and customers who have not paid, after certain bills the business still owes.",
    "A shop has shelves full of shoes and is waiting for customers to pay. That money is not ready to spend yet."
  ],
  [
    "Discounted cash flow (DCF)",
    "A way of estimating what a business is worth today by looking at the cash it may bring in in the future.",
    "A buyer estimates the cash a bakery might produce in coming years and works out what those amounts are worth today."
  ],
  [
    "Enterprise value",
    "An estimate of what the whole business is worth to everyone who supplied its money, including lenders and owners.",
    "A buyer values an entire bakery first, then considers loans and cash to work out the owners' portion."
  ],
  [
    "Equity value",
    "The part of a company's value that belongs to its owners after allowing for debts and other relevant adjustments.",
    "If a shop is worth $1,000, owes $300, and has $80 extra cash, a simplified owners' value is $780."
  ],
  [
    "Terminal value",
    "An estimate of how much future cash a business may generate after the years in your forecast.",
    "You predict a restaurant's money for five years, then estimate the value of all the years after that."
  ],
  [
    "Pre-money valuation",
    "What a startup is thought to be worth just before new investors put money in.",
    "A startup is valued at $4 million before it receives another $1 million from an investor."
  ],
  [
    "Net present value (NPV)",
    "A way to see whether the money a project may bring in is worth more today than the money you must spend on it.",
    "You pay $100 now for a project. If its future cash is worth $120 today, the difference is a positive $20."
  ],
  [
    "Internal rate of return (IRR)",
    "The yearly growth rate that makes a project's money coming in balance the money spent, after allowing for timing.",
    "Spend $100 today and collect $110 one year later. In this simple example, the rate is 10%."
  ],
  [
    "Capital asset pricing model (CAPM)",
    "A model for estimating the return an investor might expect based on how an investment moves with the wider market.",
    "An analyst starts with a safer interest rate, then adds an amount for taking extra stock-market risk."
  ],
  [
    "Capital budgeting",
    "Choosing which big projects are worth spending money on.",
    "A bakery compares buying another oven with opening a second location."
  ],
  [
    "Cost of equity",
    "The return owners or stock investors expect for risking their money in a business.",
    "An investor may want a higher possible return from a risky new shop than from a safer investment."
  ],
  [
    "Cost of debt",
    "What borrowing money costs a business, usually expressed as an interest rate.",
    "A shop borrows $1,000 at 6% yearly simple interest and owes $60 in interest after a year."
  ],
  [
    "Yield to maturity (YTM)",
    "An estimate of the yearly return from buying a bond at today's price and keeping it until its final scheduled payment, assuming promised payments arrive.",
    "If a bond costs $90 today but is due to repay $100 later, the extra $10 helps raise its possible return."
  ],
  [
    "Duration",
    "A measure of how much a bond's price may change when interest rates move.",
    "If interest rates rise, bond prices often fall. Some bonds fall more than others; duration helps estimate how much."
  ],
  [
    "Convexity",
    "An extra adjustment that helps make estimates of bond-price changes more accurate when interest rates move a lot.",
    "A small rate change may be easy to estimate. A much bigger change needs a more careful calculation."
  ],
  [
    "Credit spread",
    "The extra interest investors ask for when they think a borrower may be riskier than a comparison borrower.",
    "If a government bond offers 4% and a similar company bond offers 6%, the gap is 2 percentage points."
  ],
  [
    "Alpha",
    "A model's estimate of whether an investment did better or worse than expected after allowing for certain risks.",
    "A fund earns more than a model predicted. The extra amount is called estimated alpha, not a promise it will happen again."
  ],
  [
    "Beta",
    "A number showing how strongly an investment has tended to move compared with a chosen market.",
    "If the stock market rises or falls, a stock with a beta above 1 has tended to move more strongly in the same direction."
  ],
  [
    "Sharpe ratio",
    "A way to compare how much extra return an investment delivered with how bumpy its returns were.",
    "Two funds earned about the same return, but one had steadier results. It may have the higher Sharpe ratio."
  ],
  [
    "Delta",
    "An estimate of how much an option's price changes when the share or other thing it depends on changes a little.",
    "If a share price goes up $1, an option with a delta of 0.5 may rise about 50 cents, with other things unchanged."
  ],
  [
    "Gamma",
    "A number showing how quickly an option's delta changes when its related share price changes.",
    "An option might react a little to a $1 share move today and react more strongly after another move."
  ],
  [
    "Vega",
    "A measure of how an option's price may change when people expect bigger or smaller future price swings.",
    "If traders expect a stock's price to jump around more, some options become more expensive."
  ],
  [
    "Theta",
    "A measure of how an option's price changes as time passes, with other things held steady.",
    "A ticket giving you the right to buy at a fixed price may lose value as its expiration day gets closer."
  ],
  [
    "Correlation",
    "A number that shows whether two things tend to move together, move opposite ways, or have little consistent pattern.",
    "If umbrella sales rise when rainy days increase, those two things tend to move together."
  ],
  [
    "Comparable company analysis",
    "Estimating a company's value by looking at how similar companies are priced.",
    "To estimate a bakery's value, you study prices paid by investors for other similar bakeries."
  ],
  [
    "Precedent transactions",
    "Looking at what buyers paid in past deals to help estimate what a business might be worth.",
    "Before buying a small delivery business, you check prices paid for similar businesses."
  ],
  [
    "Price-to-earnings ratio (P/E)",
    "A way to compare a stock's price with how much profit the company earns for each share.",
    "If a share costs $20 and the company earns $2 per share a year, its price is 10 times that yearly profit."
  ],
  [
    "Return on equity (ROE)",
    "How much profit a company made compared with the owners' money tied up in it.",
    "A shop makes $10 of profit for every $100 of average owner money: 10% in this simple example."
  ],
  [
    "Return on assets (ROA)",
    "How much profit a business makes compared with the value of the things it uses to operate.",
    "A company earns $5 for each $100 of average assets in a simple example."
  ],
  [
    "Current ratio",
    "A quick comparison of things a business can turn into cash soon with bills due soon.",
    "A shop has $150 in short-term resources and $100 of bills due soon. Its ratio is 1.5."
  ],
  [
    "Quick ratio",
    "A stricter check of whether a business could cover bills due soon without needing to sell its inventory.",
    "A store checks its cash and money customers owe, instead of counting shoes sitting on shelves."
  ],
  [
    "Market capitalization",
    "The value of all a company's shares at their current stock price.",
    "If there are 1,000 shares and each costs $10, their total market value is $10,000."
  ],
  [
    "Gross margin",
    "The percentage of sales money left after paying the direct cost of what was sold.",
    "Sell a cake for $10. If its ingredients and other direct costs are $6, $4 is left: a 40% gross margin."
  ],
  [
    "Reconciliation",
    "Checking two lists of money or transactions against each other to see what matches and what needs checking.",
    "You compare your bank statement with your own spending list and spot a $20 charge you forgot to write down."
  ],
  [
    "Exception management",
    "Finding a problem in a normal work process, checking what caused it, and making sure it gets fixed.",
    "An order says five boxes were sent, but the delivery note says four. Someone checks the records and corrects the problem."
  ],
  [
    "Trade settlement",
    "The final handoff after a financial purchase: the buyer gets what they bought and the seller gets paid.",
    "You buy shares. Settlement is when the shares are delivered to you and the seller receives the money."
  ],
  [
    "Derivative",
    "A financial agreement whose value depends on the price or value of something else.",
    "A farmer agrees on a future corn price to help manage what happens if prices change."
  ],
  [
    "Accrual accounting",
    "Recording money earned or bills owed when the work or purchase happens, even if payment comes later.",
    "A plumber fixes a sink on Monday and gets paid Friday. The sale is recorded when the job is done."
  ],
  [
    "Value at risk (VaR)",
    "An estimate of how much money an investment could lose over a chosen time in most situations, based on a model. Bigger losses are still possible.",
    "A model says daily losses should usually stay under $100, but a particularly bad day could still lose more."
  ],
  [
    "Expected shortfall",
    "An estimate of the average loss on the very bad days that go past a chosen risk limit.",
    "If losses sometimes go beyond $100, this number looks at how large those worst losses tend to be."
  ],
  [
    "Regression",
    "A way to use past numbers to estimate how one thing changes with another.",
    "A shop studies whether warmer weather usually goes with higher ice-cream sales."
  ],
  [
    "Monte Carlo simulation",
    "Using lots of pretend possible outcomes to understand what might happen.",
    "A shop runs 1,000 made-up sales scenarios to see how often it might run out of cash."
  ],
  [
    "Securitization",
    "Turning a group of loans or other payments into an investment that people can buy.",
    "A bank groups many home loans together and sells investments linked to the borrowers' payments."
  ],
  [
    "Tranche",
    "One slice of a larger investment deal, with its own rules for who gets paid and who takes losses first.",
    "A loan package is divided into groups. One group gets paid before another but often has a different return."
  ],
  [
    "Nostro account",
    "Money a bank keeps in an account with another bank, often in another country, to make payments.",
    "A New York bank keeps euros with a European bank to help send euro payments."
  ],
  [
    "SWIFT",
    "A worldwide messaging network banks use to send secure instructions about payments and other financial activity. It does not itself move the money.",
    "A bank uses a SWIFT message to tell another bank where a payment should go."
  ],
  [
    "ISIN",
    "An international code used to identify a particular stock, bond, or other investment.",
    "Two companies may have similar names, so the code helps make sure a bank selects the correct security."
  ],
  [
    "MOIC",
    "How many times the money put into an investment came back, before deciding what the yearly return was.",
    "If you invest $100 and later receive $200 in total, you got two times your money back."
  ],
  [
    "Post-money valuation",
    "What a startup is valued at just after new investment money comes in.",
    "A startup is worth $4 million before a new $1 million investment. In a simple deal, its new value is $5 million."
  ],
  [
    "Cap table",
    "A list showing who owns what percentage of a company.",
    "A startup's list shows the founders own 80% and an investor owns 20%."
  ],
  [
    "Term sheet",
    "A document laying out the main proposed rules of a deal before everyone finishes the full agreement.",
    "An investor and founder write down a proposed investment amount and ownership percentage."
  ],
  [
    "Clearing",
    "Checking and arranging what each side must deliver or pay after a trade before the final handoff.",
    "After two people agree to exchange shares for money, the process confirms what each side owes."
  ],
  [
    "Netting",
    "Combining several amounts owed between parties so fewer payments are needed.",
    "You owe someone $50 and they owe you $30. Instead of two payments, you may settle a net $20, if the rules allow it."
  ],
  [
    "Straight-through processing (STP)",
    "Letting a transaction move through computer systems with little or no manual retyping.",
    "A payment goes from the customer to the bank system without an employee copying each detail by hand."
  ],
  [
    "Mark-to-market",
    "Updating an investment's recorded value using a current market price.",
    "A share you bought for $10 now trades at $12, so your records show its current $12 market value."
  ],
  [
    "Probability of default (PD)",
    "An estimate of the chance a borrower will not meet their required payments during a set time.",
    "A lender estimates that two out of 100 similar borrowers may fail to pay over the next year."
  ],
  [
    "Loss given default (LGD)",
    "The share of money a lender may lose if a borrower fails to pay, after expected recoveries.",
    "If someone owes $100 and the lender expects to recover $60, the expected loss after a failure is $40, or 40%."
  ],
  [
    "Exposure at default (EAD)",
    "The amount of money a lender expects to be owed when a borrower stops paying.",
    "A lender estimates that $5,000 will still be outstanding if the borrower fails to pay."
  ]
].map(([term,meaning,example])=>[term.toLowerCase(),{meaning,example}])
);
