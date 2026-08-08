import json
from pathlib import Path
import sys

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from underwrite import annual_debt_service, irr, underwrite


ROOT = Path(__file__).resolve().parents[1]


def load_sample() -> dict:
    return json.loads((ROOT / "data" / "sample_property.json").read_text(encoding="utf-8"))


def test_irr_for_one_period_investment() -> None:
    assert irr([-100, 110]) == pytest.approx(0.10, abs=1e-6)


def test_zero_debt_has_no_debt_service() -> None:
    assert annual_debt_service(0, 0.06, 30) == 0


def test_sample_underwriting_returns_complete_projection() -> None:
    assumptions = load_sample()
    results = underwrite(assumptions)

    assert len(results["annual_projection"]) == assumptions["hold_years"]
    assert len(results["levered_cash_flows"]) == assumptions["hold_years"] + 1
    assert results["year_one_noi"] > 0
    assert results["year_one_dscr"] > 1
    assert results["net_sale_proceeds"] > 0
    assert results["levered_irr"] > 0


def test_missing_assumptions_raise_clear_error() -> None:
    with pytest.raises(ValueError, match="Missing required assumptions"):
        underwrite({"property_name": "Incomplete"})
