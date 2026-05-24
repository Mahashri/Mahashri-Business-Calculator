// ================================
// Number Formatting Functions
// ================================

// Format number with commas (Indian format)
function formatNumber(value) {

  return Number(value).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

}

// Remove commas and % before calculation
function parseFormattedNumber(value) {

  return parseFloat(
    value.replace(/,/g, '').replace(/%/g, '')
  );

}

// ================================
// Convert Number To Words
// ================================

function numberToWords(num) {

  const ones = [
    "", "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen",
    "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty", "Forty",
    "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  function convert(n) {

    if (n < 20) {
      return ones[n];
    }

    if (n < 100) {

      return tens[Math.floor(n / 10)] +
        (n % 10 ? " " + ones[n % 10] : "");

    }

    if (n < 1000) {

      return ones[Math.floor(n / 100)] +
        " Hundred " +
        (n % 100 ? convert(n % 100) : "");

    }

    if (n < 100000) {

      return convert(Math.floor(n / 1000)) +
        " Thousand " +
        (n % 1000 ? convert(n % 1000) : "");

    }

    if (n < 10000000) {

      return convert(Math.floor(n / 100000)) +
        " Lakh " +
        (n % 100000 ? convert(n % 100000) : "");

    }

    return convert(Math.floor(n / 10000000)) +
      " Crore " +
      (n % 10000000 ? convert(n % 10000000) : "");

  }

  return convert(Math.floor(num));

}

// ================================
// Auto Format Inputs While Typing
// ================================

document.querySelectorAll('input').forEach(input => {

  input.setAttribute("type", "text");

  input.addEventListener('input', function () {

    // Skip percentage inputs
    if (this.classList.contains('percentage-input')) {
      return;
    }

    let value = this.value.replace(/,/g, '');

    // Allow only numbers and decimal
    value = value.replace(/[^\d.]/g, '');

    // Prevent multiple decimal points
    const parts = value.split('.');

    if (parts.length > 2) {

      value =
        parts[0] + '.' + parts.slice(1).join('');

    }

    if (value !== '') {

      if (value.includes('.')) {

        const [integerPart, decimalPart] =
          value.split('.');

        this.value =
          Number(integerPart || 0).toLocaleString('en-IN') +
          '.' +
          decimalPart;

      } else {

        this.value =
          Number(value).toLocaleString('en-IN');

      }

    } else {

      this.value = '';

    }

  });

});

// ================================
// Auto Add % Symbol While Typing
// ================================

document.querySelectorAll('.percentage-input').forEach(input => {

  input.addEventListener('input', function () {

    let value =
      this.value.replace(/%/g, '');

    // Allow only numbers and decimal
    value = value.replace(/[^\d.]/g, '');

    // Prevent multiple decimals
    const parts = value.split('.');

    if (parts.length > 2) {

      value =
        parts[0] + '.' + parts.slice(1).join('');

    }

    if (value !== '') {

      if (value.includes('.')) {

        const [integerPart, decimalPart] =
          value.split('.');

        this.value =
          Number(integerPart || 0).toLocaleString('en-IN') +
          '.' +
          decimalPart +
          '%';

      } else {

        this.value =
          Number(value).toLocaleString('en-IN') +
          '%';

      }

    } else {

      this.value = '';

    }

  });

});

// ================================
// Normal Calculator
// ================================

document.getElementById("calculateNormal")
  .addEventListener("click", function () {

    const amount =
      parseFormattedNumber(
        document.getElementById("normalAmount").value
      );

    const percentage =
      parseFormattedNumber(
        document.getElementById("normalPercentage").value
      );

    const output =
      document.getElementById("normalOutput");

    if (!isNaN(amount) && !isNaN(percentage)) {

      const result =
        (amount * percentage) / 100;

      output.textContent =
        `Final Value: ${formatNumber(result)} (${numberToWords(result)})`;

    } else {

      output.textContent =
        "Please enter valid numbers.";

    }

  });

// ================================
// GST Calculator
// ================================

document.getElementById("calculateGST")
  .addEventListener("click", function () {

    const amount =
      parseFormattedNumber(
        document.getElementById("gstAmount").value
      );

    const gstPercentage =
      parseFormattedNumber(
        document.getElementById("gstPercentage").value
      );

    const output =
      document.getElementById("gstOutput");

    if (!isNaN(amount) && !isNaN(gstPercentage)) {

      const gstAmount =
        (amount * gstPercentage) / 100;

      const finalAmount =
        amount + gstAmount;

      output.innerHTML = `
        GST Amount: ${formatNumber(gstAmount)} (${numberToWords(gstAmount)}) <br>
        Final Amount: ${formatNumber(finalAmount)} (${numberToWords(finalAmount)})
      `;

    } else {

      output.textContent =
        "Please enter valid numbers.";

    }

  });

// ================================
// Percentage Calculator
// ================================

const percentageFromInput =
  document.getElementById("percentageFrom");

const percentageToInput =
  document.getElementById("percentageTo");

const percentageResult =
  document.getElementById("percentageResult");

function calculatePercentageDifference() {

  const from =
    parseFormattedNumber(
      percentageFromInput.value
    );

  const to =
    parseFormattedNumber(
      percentageToInput.value
    );

  if (!isNaN(from) &&
    !isNaN(to) &&
    from !== 0) {

    const difference =
      ((to - from) / from) * 100;

    percentageResult.textContent =
      `Percentage Difference: ${difference.toFixed(2)}%`;

  } else {

    percentageResult.textContent =
      "Please enter valid numbers.";

  }

}

function swapValues() {

  let fromValue =
    percentageFromInput.value;

  let toValue =
    percentageToInput.value;

  percentageFromInput.value =
    toValue;

  percentageToInput.value =
    fromValue;

  calculatePercentageDifference();

}

document.getElementById("swapBtn")
  .addEventListener("click", swapValues);

document.getElementById("calculatePercentageDifference")
  .addEventListener(
    "click",
    calculatePercentageDifference
  );

// ================================
// Discount Calculator
// ================================

document.getElementById("calculateDiscount")
  .addEventListener("click", function () {

    const originalPrice =
      parseFormattedNumber(
        document.getElementById("originalPrice").value
      );

    const discountPercentage =
      parseFormattedNumber(
        document.getElementById("discountPercentage").value
      );

    const output =
      document.getElementById("discountOutput");

    if (!isNaN(originalPrice) &&
      !isNaN(discountPercentage)) {

      const discountAmount =
        (originalPrice * discountPercentage) / 100;

      const finalPrice =
        originalPrice - discountAmount;

      output.innerHTML = `
        Discount Amount: ${formatNumber(discountAmount)} (${numberToWords(discountAmount)}) <br>
        Final Amount: ${formatNumber(finalPrice)} (${numberToWords(finalPrice)})
      `;

    } else {

      output.textContent =
        "Please enter valid numbers.";

    }

  });

// ================================
// Profit Percentage Calculator
// ================================

document.getElementById("calculateProfit")
  .addEventListener("click", function () {

    const invested =
      parseFormattedNumber(
        document.getElementById("investedAmount").value
      );

    const profit =
      parseFormattedNumber(
        document.getElementById("profitAmount").value
      );

    const output =
      document.getElementById("profitOutput");

    if (!isNaN(invested) &&
      !isNaN(profit) &&
      invested !== 0) {

      const profitPercentage =
        (profit / invested) * 100;

      output.innerHTML = `
        Profit: ${formatNumber(profit)} (${numberToWords(profit)}) <br>
        Profit Percentage: ${profitPercentage.toFixed(2)}%
      `;

    } else {

      output.textContent =
        "Please enter valid numbers.";

    }

  });
  
  
  
  // ================================
// Stock Profit Calculator
// ================================

document.getElementById("calculateStockProfit")
  .addEventListener("click", function () {

    const buyPrice =
      parseFormattedNumber(
        document.getElementById("buyPrice").value
      );

    const sellPrice =
      parseFormattedNumber(
        document.getElementById("sellPrice").value
      );

    const quantity =
      parseFormattedNumber(
        document.getElementById("stockQuantity").value
      );

    const output =
      document.getElementById("stockProfitOutput");

    if (
      !isNaN(buyPrice) &&
      !isNaN(sellPrice) &&
      !isNaN(quantity)
    ) {

      const totalInvestment =
        buyPrice * quantity;

      const finalValue =
        sellPrice * quantity;

      const profitLoss =
        finalValue - totalInvestment;

      const profitPercentage =
        (profitLoss / totalInvestment) * 100;

      const status =
        profitLoss >= 0
          ? "Profit"
          : "Loss";

      output.innerHTML = `
        Total Investment:
        ${formatNumber(totalInvestment)}
        (${numberToWords(totalInvestment)})
        <br><br>

        ${status}:
        ${formatNumber(Math.abs(profitLoss))}
        (${numberToWords(Math.abs(profitLoss))})
        <br><br>

        Profit %:
        ${profitPercentage.toFixed(2)}%
        <br><br>

        Final Value:
        ${formatNumber(finalValue)}
        (${numberToWords(finalValue)})
      `;

    } else {

      output.textContent =
        "Please enter valid numbers.";

    }

  });
  
  
  // ================================
// SIP Calculator
// ================================

document.getElementById("calculateSIP")
  .addEventListener("click", function () {

    const monthlyInvestment =
      parseFormattedNumber(
        document.getElementById("sipMonthlyInvestment").value
      );

    const years =
      parseFormattedNumber(
        document.getElementById("sipYears").value
      );

    const annualReturn =
      parseFormattedNumber(
        document.getElementById("sipReturn").value
      );

    const output =
      document.getElementById("sipOutput");

    if (
      !isNaN(monthlyInvestment) &&
      !isNaN(years) &&
      !isNaN(annualReturn)
    ) {

      const monthlyRate =
        annualReturn / 12 / 100;

      const months =
        years * 12;

      const finalCorpus =
        monthlyInvestment *
        (((Math.pow(1 + monthlyRate, months)) - 1)
          / monthlyRate) *
        (1 + monthlyRate);

      const investedAmount =
        monthlyInvestment * months;

      const wealthGained =
        finalCorpus - investedAmount;

     // ================================
// SIP Chart Calculation
// ================================

const investedPercent =
  (investedAmount / finalCorpus) * 100;

const wealthPercent =
  (wealthGained / finalCorpus) * 100;

// Chart width update
document.getElementById("investedBar")
  .style.width = investedPercent + "%";

document.getElementById("wealthBar")
  .style.width = wealthPercent + "%";

// Tooltip values
document.getElementById("investedBar")
  .title =
  `Invested: ${investedPercent.toFixed(2)}%
Value: ${formatNumber(investedAmount)}`;

document.getElementById("wealthBar")
  .title =
  `Wealth Gain: ${wealthPercent.toFixed(2)}%
Value: ${formatNumber(wealthGained)}`;


// Show chart only after calculation
document.getElementById("sipChartContainer")
  .style.display = "block";


// Output
output.innerHTML = `
  Invested Amount:
  ${formatNumber(investedAmount)}
  (${numberToWords(investedAmount)})
  <br><br>

  Wealth Gained:
  ${formatNumber(wealthGained)}
  (${numberToWords(wealthGained)})
  <br><br>

  Final Corpus:
  ${formatNumber(finalCorpus)}
  (${numberToWords(finalCorpus)})
`;

    } else {

      output.textContent =
        "Please enter valid numbers.";

    }

  });

// ================================
// Inflation Toggle
// ================================

document.getElementById("adjustInflation")
  .addEventListener("change", function () {

    const inflationContainer =
      document.getElementById("inflationContainer");

    if (this.value === "yes") {

      inflationContainer.style.display = "block";

    } else {

      inflationContainer.style.display = "none";

    }

  });

// ================================
// Wealth Calculator
// ================================

document.getElementById("calculateWealth")
  .addEventListener("click", function () {

    const frequency =
      document.getElementById("investmentFrequency").value;

    let targetWealth =
      parseFormattedNumber(
        document.getElementById("targetWealth").value
      );

    const annualReturn =
      parseFormattedNumber(
        document.getElementById("wealthReturn").value
      );

    const years =
      parseFormattedNumber(
        document.getElementById("wealthYears").value
      );

    const inflationChoice =
      document.getElementById("adjustInflation").value;

    const inflationRate =
      parseFormattedNumber(
        document.getElementById("inflationRate").value || "0"
      );

    const output =
      document.getElementById("wealthOutput");

    if (
      !isNaN(targetWealth) &&
      !isNaN(annualReturn) &&
      !isNaN(years)
    ) {

      // Inflation Adjustment
      if (inflationChoice === "yes") {

        targetWealth =
          targetWealth *
          Math.pow(
            1 + (inflationRate / 100),
            years
          );

      }

      let requiredInvestment;

      if (frequency === "monthly") {

        const monthlyRate =
          annualReturn / 12 / 100;

        const months =
          years * 12;

        requiredInvestment =
          targetWealth /
          (
            (((Math.pow(1 + monthlyRate, months)) - 1)
              / monthlyRate)
            * (1 + monthlyRate)
          );

      } else {

        const yearlyRate =
          annualReturn / 100;

        requiredInvestment =
          targetWealth /
          (
            ((Math.pow(1 + yearlyRate, years)) - 1)
            / yearlyRate
          );

      }

      output.innerHTML = `
        Inflation Adjusted Wealth:
        ${formatNumber(targetWealth)}
        (${numberToWords(targetWealth)})
        <br><br>

        Required ${frequency === "monthly" ? "Monthly" : "Yearly"} Investment:
        ${formatNumber(requiredInvestment)}
        (${numberToWords(requiredInvestment)})
      `;

    } else {

      output.textContent =
        "Please enter valid numbers.";

    }

  });
