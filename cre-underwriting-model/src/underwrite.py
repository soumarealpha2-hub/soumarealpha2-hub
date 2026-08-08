"""Underwrite a fictional commercial real estate acquisition."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


REQUIRED_KEYS = {
    "property_name",
    "units",
    "monthly_rent_per_unit",
    "other_income_annual",
    "vacancy_rate",
    "operating_expenses_annual",
    "purchase_price",
    "acquisition_cost_rate",
    "annual_rent_growth",
    "annual_expense_growth",
    "exit_cap_rate",
    "selling_cost_rate",
    "hold_years",
    "discount_rate",
    "debt_ratio",
    "interest_rate",
    "amortization_years",
}


def validate_assumptions(assumptions: dict[str, Any]) -> None:
    missing = REQUIRED_KEYS.difference(assumptions)
    if missing:
        raise ValueError(f"Missing required assumptions: {', '.join(sorted(missing))}")

    positive = [
        "units",
        "monthly_rent_per_unit",
        "purchase_price",
        "exit_cap_rate",
        "hold_years",
        "amortization_years",
    ]
    if any(float(assumptions[key]) <= 0 for key in positive):
        raise ValueError("Unit, rent, price, hold, amortization, and exit cap values must be positive.")

    rate_keys = [
        "vacancy_rate",
        "acquisition_cost_rate",
        "annual_rent_growth",
        "annual_expense_growth",
        "selling_cost_rate",
        "discount_rate",
        "debt_ratio",
        "interest_rate",
    ]
    if any(not 0 <= float(assumptions[key]) < 1 for key in rate_keys):
        raise ValueError("All percentage assumptions must be expressed as decimals from 0 to 1.")


def annual_debt_service(principal: float, annual_rate: float, amortization_years: int) -> float:
    """Return annual payments for a monthly amortizing loan."""
    if principal == 0:
        return 0.0
    months = amortization_years * 12
    monthly_rate = annual_rate / 12
    if monthly_rate == 0:
        return principal / amortization_years
    monthly_payment = principal * monthly_rate / (1 - (1 + monthly_rate) ** -months)
    return monthly_payment * 12


def remaining_balance(
    principal: float, annual_rate: float, amortization_years: int, elapsed_years: int
) -> float:
    """Return the outstanding loan balance after a whole number of years."""
    if principal == 0:
        return 0.0
    monthly_rate = annual_rate / 12
    total_months = amortization_years * 12
    elapsed_months = min(elapsed_years * 12, total_months)
    if monthly_rate == 0:
        return principal * (1 - elapsed_months / total_months)
    payment = principal * monthly_rate / (1 - (1 + monthly_rate) ** -total_months)
    return principal * (1 + monthly_rate) ** elapsed_months - payment * (
        ((1 + monthly_rate) ** elapsed_months - 1) / monthly_rate
    )


def npv(rate: float, cash_flows: list[float]) -> float:
    return sum(cash_flow / (1 + rate) ** period for period, cash_flow in enumerate(cash_flows))


def irr(cash_flows: list[float], tolerance: float = 1e-7) -> float:
    """Estimate IRR with bisection for a conventional investment cash-flow series."""
    if not cash_flows or cash_flows[0] >= 0 or max(cash_flows[1:], default=0) <= 0:
        raise ValueError("IRR requires an initial outflow followed by at least one positive cash flow.")

    low, high = -0.9999, 10.0
    low_value, high_value = npv(low, cash_flows), npv(high, cash_flows)
    if low_value * high_value > 0:
        raise ValueError("IRR could not be bracketed for these cash flows.")

    for _ in range(300):
        midpoint = (low + high) / 2
        value = npv(midpoint, cash_flows)
        if abs(value) < tolerance:
            return midpoint
        if low_value * value <= 0:
            high = midpoint
            high_value = value
        else:
            low = midpoint
            low_value = value
    return (low + high) / 2


def underwrite(assumptions: dict[str, Any]) -> dict[str, Any]:
    """Calculate operating, debt, and return metrics for a property acquisition."""
    validate_assumptions(assumptions)

    price = float(assumptions["purchase_price"])
    loan_amount = price * float(assumptions["debt_ratio"])
    acquisition_costs = price * float(assumptions["acquisition_cost_rate"])
    initial_equity = price + acquisition_costs - loan_amount
    debt_service = annual_debt_service(
        loan_amount,
        float(assumptions["interest_rate"]),
        int(assumptions["amortization_years"]),
    )

    base_rental_income = (
        float(assumptions["units"]) * float(assumptions["monthly_rent_per_unit"]) * 12
    )
    base_other_income = float(assumptions["other_income_annual"])
    base_expenses = float(assumptions["operating_expenses_annual"])
    vacancy = float(assumptions["vacancy_rate"])
    hold_years = int(assumptions["hold_years"])

    annual_rows: list[dict[str, float | int]] = []
    levered_cash_flows = [-initial_equity]
    for year in range(1, hold_years + 1):
        income_growth = (1 + float(assumptions["annual_rent_growth"])) ** (year - 1)
        expense_growth = (1 + float(assumptions["annual_expense_growth"])) ** (year - 1)
        gross_potential_income = (base_rental_income + base_other_income) * income_growth
        effective_gross_income = gross_potential_income * (1 - vacancy)
        operating_expenses = base_expenses * expense_growth
        noi = effective_gross_income - operating_expenses
        cash_flow_before_sale = noi - debt_service

        annual_rows.append(
            {
                "year": year,
                "effective_gross_income": effective_gross_income,
                "operating_expenses": operating_expenses,
                "noi": noi,
                "debt_service": debt_service,
                "cash_flow_before_sale": cash_flow_before_sale,
            }
        )
        levered_cash_flows.append(cash_flow_before_sale)

    next_year_income_growth = (1 + float(assumptions["annual_rent_growth"])) ** hold_years
    next_year_expense_growth = (1 + float(assumptions["annual_expense_growth"])) ** hold_years
    next_year_noi = (
        (base_rental_income + base_other_income) * next_year_income_growth * (1 - vacancy)
        - base_expenses * next_year_expense_growth
    )
    exit_value = next_year_noi / float(assumptions["exit_cap_rate"])
    selling_costs = exit_value * float(assumptions["selling_cost_rate"])
    loan_balance = remaining_balance(
        loan_amount,
        float(assumptions["interest_rate"]),
        int(assumptions["amortization_years"]),
        hold_years,
    )
    net_sale_proceeds = exit_value - selling_costs - loan_balance
    levered_cash_flows[-1] += net_sale_proceeds

    year_one = annual_rows[0]
    results = {
        "property_name": assumptions["property_name"],
        "purchase_price": price,
        "loan_amount": loan_amount,
        "initial_equity": initial_equity,
        "year_one_noi": year_one["noi"],
        "going_in_cap_rate": year_one["noi"] / price,
        "annual_debt_service": debt_service,
        "year_one_dscr": year_one["noi"] / debt_service if debt_service else float("inf"),
        "year_one_cash_on_cash": year_one["cash_flow_before_sale"] / initial_equity,
        "exit_value": exit_value,
        "remaining_loan_balance": loan_balance,
        "net_sale_proceeds": net_sale_proceeds,
        "levered_npv": npv(float(assumptions["discount_rate"]), levered_cash_flows),
        "levered_irr": irr(levered_cash_flows),
        "annual_projection": annual_rows,
        "levered_cash_flows": levered_cash_flows,
    }
    return results


def money(value: float) -> str:
    return f"${value:,.0f}"


def render_report(results: dict[str, Any]) -> str:
    lines = [
        f"# Underwriting Report: {results['property_name']}",
        "",
        "## Investment summary",
        "",
        f"- Purchase price: **{money(results['purchase_price'])}**",
        f"- Loan amount: **{money(results['loan_amount'])}**",
        f"- Initial equity: **{money(results['initial_equity'])}**",
        f"- Year 1 NOI: **{money(results['year_one_noi'])}**",
        f"- Going-in cap rate: **{results['going_in_cap_rate']:.2%}**",
        f"- Year 1 DSCR: **{results['year_one_dscr']:.2f}x**",
        f"- Year 1 cash-on-cash return: **{results['year_one_cash_on_cash']:.2%}**",
        f"- Levered NPV: **{money(results['levered_npv'])}**",
        f"- Levered IRR: **{results['levered_irr']:.2%}**",
        f"- Exit value: **{money(results['exit_value'])}**",
        "",
        "## Annual projection",
        "",
        "| Year | Effective gross income | Operating expenses | NOI | Debt service | Cash flow before sale |",
        "| ---: | ---: | ---: | ---: | ---: | ---: |",
    ]
    for row in results["annual_projection"]:
        lines.append(
            f"| {row['year']} | {money(row['effective_gross_income'])} | "
            f"{money(row['operating_expenses'])} | {money(row['noi'])} | "
            f"{money(row['debt_service'])} | {money(row['cash_flow_before_sale'])} |"
        )
    lines.extend(
        [
            "",
            "_All assumptions and property details are fictional. This model is for educational use only._",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path, help="Path to an assumptions JSON file")
    parser.add_argument("--output", type=Path, help="Optional Markdown report path")
    args = parser.parse_args()

    assumptions = json.loads(args.input.read_text(encoding="utf-8"))
    report = render_report(underwrite(assumptions))
    if args.output:
        args.output.write_text(report, encoding="utf-8")
        print(f"Report written to {args.output}")
    else:
        print(report)


if __name__ == "__main__":
    main()
