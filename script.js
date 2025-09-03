// Normal Calculator
document.getElementById("calculateNormal").addEventListener("click", function () {
  const amount = parseFloat(document.getElementById("normalAmount").value);
  const percentage = parseFloat(document.getElementById("normalPercentage").value);
  const output = document.getElementById("normalOutput");

  if (!isNaN(amount) && !isNaN(percentage)) {
    const result = amount + (amount * percentage) / 100;
    output.textContent = `Total Value: ${result.toFixed(2)}`;
  } else {
    output.textContent = "Please enter valid numbers.";
  }
});

// GST Calculator
document.getElementById("calculateGST").addEventListener("click", function () {
  const amount = parseFloat(document.getElementById("gstAmount").value);
  const gstPercentage = parseFloat(document.getElementById("gstPercentage").value);
  const output = document.getElementById("gstOutput");

  if (!isNaN(amount) && !isNaN(gstPercentage)) {
    const gstAmount = (amount * gstPercentage) / 100;
    const finalAmount = amount + gstAmount;
    output.textContent = `Final Amount: ${finalAmount.toFixed(2)}`;
  } else {
    output.textContent = "Please enter valid numbers.";
  }
});

// Percentage Calculator
const percentageFromInput = document.getElementById("percentageFrom");
const percentageToInput = document.getElementById("percentageTo");
const percentageResult = document.getElementById("percentageResult");

function calculatePercentageDifference() {
  const from = parseFloat(percentageFromInput.value);
  const to = parseFloat(percentageToInput.value);

  if (!isNaN(from) && !isNaN(to) && from !== 0) {
    const difference = ((to - from) / from) * 100;
    percentageResult.textContent = `Percentage Difference: ${difference.toFixed(2)}%`;
  } else {
    percentageResult.textContent = "Please enter valid numbers.";
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

document.getElementById("calculatePercentageDifference").addEventListener("click", calculatePercentageDifference);

// Discount Calculator
document.getElementById("calculateDiscount").addEventListener("click", function () {
  const originalPrice = parseFloat(document.getElementById("originalPrice").value);
  const discountPercentage = parseFloat(document.getElementById("discountPercentage").value);
  const output = document.getElementById("discountOutput");

  if (!isNaN(originalPrice) && !isNaN(discountPercentage)) {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discountAmount;
    output.textContent = `Final Amount: ${finalPrice.toFixed(2)}`;
  } else {
    output.textContent = "Please enter valid numbers.";
  }
});
