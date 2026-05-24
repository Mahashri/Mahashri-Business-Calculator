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

// Remove commas before calculation
function parseFormattedNumber(value) {
  return parseFloat(value.replace(/,/g, ''));
}

// ================================
// Auto Format Inputs While Typing
// ================================

document.querySelectorAll('input').forEach(input => {

  // Change number inputs to text inputs for formatting
  input.setAttribute("type", "text");

  input.addEventListener('input', function () {

    let value = this.value.replace(/,/g, '');

    // Allow only numbers and decimal point
    value = value.replace(/[^\d.]/g, '');

    // Prevent multiple decimal points
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    if (value !== '') {

      if (value.includes('.')) {

        const [integerPart, decimalPart] = value.split('.');

        this.value =
          Number(integerPart || 0).toLocaleString('en-IN') +
          '.' +
          decimalPart;

      } else {

        this.value = Number(value).toLocaleString('en-IN');

      }

    } else {
      this.value = '';
    }

  });

});

// ================================
// Normal Calculator
// ================================

document.getElementById("calculateNormal").addEventListener("click", function () {

  const amount = parseFormattedNumber(
    document.getElementById("normalAmount").value
  );

  const percentage = parseFormattedNumber(
    document.getElementById("normalPercentage").value
  );

  const output = document.getElementById("normalOutput");

  if (!isNaN(amount) && !isNaN(percentage)) {

    const result = (amount * percentage) / 100;

    output.textContent =
      `Final Value: ${formatNumber(result)}`;

  } else {

    output.textContent = "Please enter valid numbers.";

  }

});

// ================================
// GST Calculator
// ================================

document.getElementById("calculateGST").addEventListener("click", function () {

  const amount = parseFormattedNumber(
    document.getElementById("gstAmount").value
  );

  const gstPercentage = parseFormattedNumber(
    document.getElementById("gstPercentage").value
  );

  const output = document.getElementById("gstOutput");

  if (!isNaN(amount) && !isNaN(gstPercentage)) {

    const gstAmount = (amount * gstPercentage) / 100;

    const finalAmount = amount + gstAmount;

    output.innerHTML = `
      GST Amount: ${formatNumber(gstAmount)} <br>
      Final Amount: ${formatNumber(finalAmount)}
    `;

  } else {

    output.textContent = "Please enter valid numbers.";

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
    parseFormattedNumber(percentageFromInput.value);

  const to =
    parseFormattedNumber(percentageToInput.value);

  if (!isNaN(from) && !isNaN(to) && from !== 0) {

    const difference = ((to - from) / from) * 100;

    percentageResult.textContent =
      `Percentage Difference: ${difference.toFixed(2)}%`;

  } else {

    percentageResult.textContent =
      "Please enter valid numbers.";

  }

}

function swapValues() {

  let fromValue = percentageFromInput.value;

  let toValue = percentageToInput.value;

  percentageFromInput.value = toValue;

  percentageToInput.value = fromValue;

  // Auto calculate after swap
  calculatePercentageDifference();

}

document.getElementById("swapBtn")
  .addEventListener("click", swapValues);

document.getElementById("calculatePercentageDifference")
  .addEventListener("click", calculatePercentageDifference);

// ================================
// Discount Calculator
// ================================

document.getElementById("calculateDiscount").addEventListener("click", function () {

  const originalPrice = parseFormattedNumber(
    document.getElementById("originalPrice").value
  );

  const discountPercentage = parseFormattedNumber(
    document.getElementById("discountPercentage").value
  );

  const output = document.getElementById("discountOutput");

  if (!isNaN(originalPrice) && !isNaN(discountPercentage)) {

    const discountAmount =
      (originalPrice * discountPercentage) / 100;

    const finalPrice =
      originalPrice - discountAmount;

    output.innerHTML = `
      Discount Amount: ${formatNumber(discountAmount)} <br>
      Final Amount: ${formatNumber(finalPrice)}
    `;

  } else {

    output.textContent = "Please enter valid numbers.";

  }

});

// ================================
// Profit Percentage Calculator
// ================================

document.getElementById("calculateProfit").addEventListener("click", function () {

  const invested = parseFormattedNumber(
    document.getElementById("investedAmount").value
  );

  const profit = parseFormattedNumber(
    document.getElementById("profitAmount").value
  );

  const output = document.getElementById("profitOutput");

  if (!isNaN(invested) && !isNaN(profit) && invested !== 0) {

    const profitPercentage =
      (profit / invested) * 100;

    output.innerHTML = `
      Profit: ${formatNumber(profit)} <br>
      Profit Percentage: ${profitPercentage.toFixed(2)}%
    `;

  } else {

    output.textContent = "Please enter valid numbers.";

  }

});
