# Mahashri Business Calculator

A collection of browser-based calculators for common business, percentage and personal-finance calculations.

## Features visible in the source
- Percentage and amount calculations.
- GST calculation.
- Percentage difference and value swapping.
- Discount calculation.
- Profit percentage calculation.
- Stock profit/loss calculation.
- SIP future-value estimation.
- Wealth-target and inflation-adjusted investment estimation.
- Indian number formatting and number-to-words output.

## Technology stack
- HTML5
- CSS3
- Vanilla JavaScript

## Run locally
1. Clone the repository.
2. Open `index.html` in a modern browser, or serve the folder using a local development server.
3. Select a calculator, enter sample values and calculate.

No backend is required for the calculations shown in the client-side script.

## Calculation considerations
The outputs depend on the formulas and assumptions entered by the user. SIP and wealth projections are illustrations, not guaranteed returns. Review zero-interest cases, negative values, very large inputs, rounding, and input validation before relying on results. The SIP formula currently needs an explicit zero-rate path to avoid division by zero.

## Future improvements
- Add unit tests for every formula and boundary case.
- Explain whether SIP contributions are assumed at the beginning or end of each period.
- Add validation and clear assumptions beside each result.
- Improve accessibility and responsive layouts.
- Add a calculation-methodology page.

## Disclaimer
This tool is for educational calculations only. It does not provide tax, accounting or investment advice.


---

## Live Demo

[Open the deployed application](https://mahashri.github.io/Mahashri-Business-Calculator/)
