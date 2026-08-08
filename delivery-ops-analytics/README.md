# Delivery Operations Analytics

A recruiter-friendly Python project that turns raw delivery records into operating KPIs and clear management recommendations.

The included dataset is fully synthetic. It was created to demonstrate the analytical approach without exposing customer, driver, or company information.

## Business question

Where is delivery performance breaking down, what does it cost, and which operating area should a manager address first?

## KPIs

- On-time delivery rate
- Average delay among late deliveries
- Average cost per delivery
- Cost per mile
- Deliveries per driver hour
- Regional volume, reliability, and cost performance

## Run the analysis

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python src/analyze_operations.py --input data/sample_deliveries.csv --output report.md
```

Run the tests:

```bash
pytest
```

See the [sample generated report](examples/sample_report.md) for the output produced by the included dataset.

## Example insight

The workflow identifies regions below the target on-time rate and compares them with cost and driver-hour efficiency. The generated report separates the numbers from the recommendation, so an operations manager can trace each decision back to a KPI.

## Project structure

```text
delivery-ops-analytics/
├── data/sample_deliveries.csv
├── examples/sample_report.md
├── src/analyze_operations.py
├── tests/test_metrics.py
├── requirements.txt
└── README.md
```

## Why this project matters

Operations teams rarely need another dashboard without a decision attached. This project focuses on the bridge between analysis and action: measure performance, locate the constraint, and propose the next operational test.
