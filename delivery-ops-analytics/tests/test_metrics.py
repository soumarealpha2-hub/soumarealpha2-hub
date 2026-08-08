from pathlib import Path
import sys

import pandas as pd
import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from analyze_operations import build_recommendations, summarize_operations


def sample_frame() -> pd.DataFrame:
    return pd.DataFrame(
        {
            "delivery_id": ["D1", "D2"],
            "region": ["Brooklyn", "Brooklyn"],
            "promised_at": ["2026-07-01T12:00:00Z", "2026-07-01T13:00:00Z"],
            "delivered_at": ["2026-07-01T11:50:00Z", "2026-07-01T13:20:00Z"],
            "distance_miles": [10, 5],
            "driver_hours": [1.0, 0.5],
            "labor_cost_usd": [24, 12],
            "fuel_cost_usd": [6, 3],
        }
    )


def test_summary_calculates_core_kpis() -> None:
    summary = summarize_operations(sample_frame())

    assert summary["overview"]["deliveries"] == 2
    assert summary["overview"]["on_time_rate_pct"] == 50.0
    assert summary["overview"]["average_late_delay_minutes"] == 20.0
    assert summary["overview"]["average_cost_per_delivery_usd"] == 22.5
    assert summary["overview"]["cost_per_mile_usd"] == 3.0


def test_recommendation_names_underperforming_region() -> None:
    recommendations = build_recommendations(summarize_operations(sample_frame()))
    assert "Brooklyn" in recommendations[0]


def test_missing_columns_raise_clear_error() -> None:
    with pytest.raises(ValueError, match="Missing required columns"):
        summarize_operations(pd.DataFrame({"delivery_id": ["D1"]}))
