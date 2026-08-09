# ◈ NexusOps

**Operations Intelligence Platform for supply chain and operations analysts**

NexusOps is an interactive control tower that turns operational data into decision-ready signals. It is designed around the questions an operations analyst actually asks: Where is service deteriorating? Which supplier is creating risk? Where is inventory too thin? What happens if demand spikes or a supplier fails?

## What the product does

- Monitors revenue, margin, on-time delivery, fill rate, and lead time
- Calculates supplier risk using service, lead-time, and defect signals
- Surfaces inventory and margin alerts automatically
- Compares regional service performance
- Runs demand, lead-time, and supplier-disruption scenarios
- Includes an Operations Analyst Copilot that converts business questions into concise analytical recommendations
- Uses reproducible synthetic data, so the project runs immediately without private company data

## Why I built it

Operations teams often have the data they need but not a fast way to convert it into priorities. NexusOps demonstrates how I think about operations analytics: connect KPIs to business decisions, identify root causes, quantify risk, and make tradeoffs visible.

## Tech stack

`Python` · `Streamlit` · `Pandas` · `NumPy` · `Plotly`

## Run locally

```bash
pip install -r requirements.txt
streamlit run app.py
```

## Key analytical logic

Supplier risk combines delivery reliability, average lead time, and defect rate into a 0-100 score. Inventory coverage below 14 days is flagged as exposure. The Scenario Lab estimates the service and cost impact of demand changes, lead-time shocks, and supplier disruptions. These thresholds are illustrative and can be replaced with company-specific targets.

## Example business questions

- Which supplier is creating the most operational risk?
- Which product has the lowest margin?
- Where are we most exposed to stockouts?
- What happens to fill rate if demand increases 20%?
- How expensive is a two-day lead-time shock?

## Portfolio note

This project uses synthetic data and is intended to demonstrate operations strategy, analytics, dashboard design, scenario modeling, and decision support.

---

Built by **Alpha Soumaré** · NYU Tandon · Business & Technology Management
