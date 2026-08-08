# Commercial Real Estate Underwriting Model

A transparent Python model for evaluating a commercial real estate acquisition from operating assumptions through exit.

The sample property and every number in the included JSON file are fictional. The project demonstrates the mechanics of underwriting without using investor, tenant, or employer data.

## Model outputs

- Year 1 effective gross income and net operating income
- Going-in capitalization rate
- Annual debt service and debt service coverage ratio
- Initial cash-on-cash return
- Projected annual cash flows
- Exit value and net sale proceeds
- Levered net present value and internal rate of return

## Run the model

```bash
python src/underwrite.py --input data/sample_property.json --output underwriting_report.md
```

Run the tests:

```bash
python -m pytest
```

See the [sample generated underwriting report](examples/sample_report.md) for the result produced by the included fictional property.

## Decision frame

The model keeps the assumptions visible and the calculations inspectable. That matters because underwriting is not just about producing an IRR. It is about understanding which assumptions drive the result and whether the operating story is credible.

## Project structure

```text
cre-underwriting-model/
├── data/sample_property.json
├── examples/sample_report.md
├── src/underwrite.py
├── tests/test_underwrite.py
├── requirements.txt
└── README.md
```

## Important note

This is an educational portfolio project, not investment advice.
