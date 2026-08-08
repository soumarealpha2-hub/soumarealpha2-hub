"""Analyze a synthetic delivery dataset and produce an executive KPI report."""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Any

import pandas as pd


REQUIRED_COLUMNS = {
    "delivery_id",
    "region",
    "promised_at",
    "delivered_at",
    "distance_miles",
    "driver_hours",
    "labor_cost_usd",
    "fuel_cost_usd",
}


def prepare_deliveries(frame: pd.DataFrame) -> pd.DataFrame:
    """Validate and enrich delivery records with time and cost measures."""
    missing = REQUIRED_COLUMNS.difference(frame.columns)
    if missing:
        raise ValueError(f"Missing required columns: {', '.join(sorted(missing))}")
    if frame.empty:
        raise ValueError("The delivery dataset is empty.")

    deliveries = frame.copy()
    deliveries["promised_at"] = pd.to_datetime(deliveries["promised_at"], utc=True)
    deliveries["delivered_at"] = pd.to_datetime(deliveries["delivered_at"], utc=True)

    numeric_columns = [
        "distance_miles",
        "driver_hours",
        "labor_cost_usd",
        "fuel_cost_usd",
    ]
    deliveries[numeric_columns] = deliveries[numeric_columns].apply(
        pd.to_numeric, errors="raise"
    )
    if (deliveries[numeric_columns] < 0).any().any():
        raise ValueError("Distance, time, and cost values cannot be negative.")
    if deliveries["distance_miles"].sum() <= 0:
        raise ValueError("Total distance must be greater than zero.")
    if deliveries["driver_hours"].sum() <= 0:
        raise ValueError("Total driver hours must be greater than zero.")

    deliveries["delay_minutes"] = (
        deliveries["delivered_at"] - deliveries["promised_at"]
    ).dt.total_seconds() / 60
    deliveries["is_on_time"] = deliveries["delay_minutes"] <= 0
    deliveries["total_cost_usd"] = (
        deliveries["labor_cost_usd"] + deliveries["fuel_cost_usd"]
    )
    return deliveries


def summarize_operations(frame: pd.DataFrame) -> dict[str, Any]:
    """Return network-level and regional operating KPIs."""
    deliveries = prepare_deliveries(frame)
    late = deliveries.loc[~deliveries["is_on_time"], "delay_minutes"]

    overview = {
        "deliveries": int(len(deliveries)),
        "on_time_rate_pct": round(float(deliveries["is_on_time"].mean() * 100), 1),
        "average_late_delay_minutes": round(float(late.mean()), 1) if not late.empty else 0.0,
        "average_cost_per_delivery_usd": round(float(deliveries["total_cost_usd"].mean()), 2),
        "cost_per_mile_usd": round(
            float(deliveries["total_cost_usd"].sum() / deliveries["distance_miles"].sum()),
            2,
        ),
        "deliveries_per_driver_hour": round(
            float(len(deliveries) / deliveries["driver_hours"].sum()), 2
        ),
    }

    regional = (
        deliveries.groupby("region", as_index=False)
        .agg(
            deliveries=("delivery_id", "count"),
            on_time_rate_pct=("is_on_time", lambda values: values.mean() * 100),
            average_delay_minutes=("delay_minutes", lambda values: values.clip(lower=0).mean()),
            average_cost_usd=("total_cost_usd", "mean"),
        )
        .sort_values(["on_time_rate_pct", "average_cost_usd"], ascending=[True, False])
    )
    regional = regional.round(
        {"on_time_rate_pct": 1, "average_delay_minutes": 1, "average_cost_usd": 2}
    )

    return {"overview": overview, "regional": regional.to_dict(orient="records")}


def build_recommendations(summary: dict[str, Any], target_on_time_rate: float = 90.0) -> list[str]:
    """Translate KPI gaps into concise operating recommendations."""
    recommendations: list[str] = []
    weak_regions = [
        row for row in summary["regional"] if row["on_time_rate_pct"] < target_on_time_rate
    ]

    if weak_regions:
        worst = weak_regions[0]
        recommendations.append(
            f"Prioritize a route-level review in {worst['region']}, where on-time performance "
            f"is {worst['on_time_rate_pct']:.1f}% against a {target_on_time_rate:.0f}% target."
        )
    else:
        recommendations.append(
            "All regions meet the on-time target. Shift the next review toward cost and capacity."
        )

    if summary["overview"]["deliveries_per_driver_hour"] < 0.8:
        recommendations.append(
            "Test tighter route clustering or dispatch windows to improve deliveries per driver hour."
        )
    else:
        recommendations.append(
            "Driver-hour productivity is healthy. Protect it while testing reliability improvements."
        )

    highest_cost = max(summary["regional"], key=lambda row: row["average_cost_usd"])
    recommendations.append(
        f"Audit the cost mix in {highest_cost['region']}, the highest-cost region at "
        f"${highest_cost['average_cost_usd']:.2f} per delivery."
    )
    return recommendations


def render_markdown(summary: dict[str, Any]) -> str:
    """Render a compact management report in Markdown."""
    overview = summary["overview"]
    lines = [
        "# Delivery Operations Report",
        "",
        "## Network overview",
        "",
        f"- Deliveries: **{overview['deliveries']}**",
        f"- On-time rate: **{overview['on_time_rate_pct']:.1f}%**",
        f"- Average delay among late deliveries: **{overview['average_late_delay_minutes']:.1f} minutes**",
        f"- Average cost per delivery: **${overview['average_cost_per_delivery_usd']:.2f}**",
        f"- Cost per mile: **${overview['cost_per_mile_usd']:.2f}**",
        f"- Deliveries per driver hour: **{overview['deliveries_per_driver_hour']:.2f}**",
        "",
        "## Regional performance",
        "",
        "| Region | Deliveries | On-time rate | Avg. positive delay | Avg. cost |",
        "| --- | ---: | ---: | ---: | ---: |",
    ]
    for row in summary["regional"]:
        lines.append(
            f"| {row['region']} | {row['deliveries']} | {row['on_time_rate_pct']:.1f}% | "
            f"{row['average_delay_minutes']:.1f} min | ${row['average_cost_usd']:.2f} |"
        )

    lines.extend(["", "## Recommended actions", ""])
    lines.extend(f"- {item}" for item in build_recommendations(summary))
    lines.extend(["", "_Source: synthetic portfolio dataset._", ""])
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path, help="Path to a delivery CSV file")
    parser.add_argument("--output", type=Path, help="Optional Markdown report path")
    args = parser.parse_args()

    summary = summarize_operations(pd.read_csv(args.input))
    report = render_markdown(summary)
    if args.output:
        args.output.write_text(report, encoding="utf-8")
        print(f"Report written to {args.output}")
    else:
        print(report)


if __name__ == "__main__":
    main()
