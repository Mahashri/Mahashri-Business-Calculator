document.addEventListener('DOMContentLoaded', function () {
    const normalAmountInput = document.getElementById('normalAmount');
    const normalPercentageInput = document.getElementById('normalPercentage');
    const gstAmountInput = document.getElementById('gstAmount');
    const gstPercentageInput = document.getElementById('gstPercentage');
    const percentageFromInput = document.getElementById('percentageFrom');
    const percentageToInput = document.getElementById('percentageTo');
    const originalPriceInput = document.getElementById('originalPrice');
    const discountPercentageInput = document.getElementById('discountPercentage');

    const calculateNormalButton = document.getElementById('calculateNormal');
    const calculateGSTButton = document.getElementById('calculateGST');
    const calculatePercentageDifferenceButton = document.getElementById('calculatePercentageDifference');
    const calculateDiscountButton = document.getElementById('calculateDiscount');
    const swapButton = document.getElementById('swapValues');

    const normalOutput = document.getElementById('normalOutput');
    const gstOutput = document.getElementById('gstOutput');
    const percentageDifferenceOutput = document.getElementById('percentageDifference');
    const discountOutput = document.getElementById('discountOutput');

    calculateNormalButton.addEventListener('click', calculateNormalPercentage);
    calculateGSTButton.addEventListener('click', calculateGST);
    calculatePercentageDifferenceButton.addEventListener('click', calculatePercentageDifference);
    calculateDiscountButton.addEventListener('click', calculateDiscountPrice);
    swapButton.addEventListener('click', swapValues);

    function calculateNormalPercentage() {
        const amount = parseFloat(normalAmountInput.value);
        const percentage = parseFloat(normalPercentageInput.value);
        if (!isNaN(amount) && !isNaN(percentage)) {
            const finalAmount = amount + (amount * (percentage / 100));
            normalOutput.textContent = "Final Value: " + finalAmount.toFixed(2);
            normalOutput.style.display = 'block';
            hideOtherOutputs(normalOutput);
        } else {
            alert('Please enter valid numbers for both the original amount and the percentage');
        }
    }

    function calculateGST() {
        const amount = parseFloat(gstAmountInput.value);
        const gstPercentage = parseFloat(gstPercentageInput.value);
        if (!isNaN(amount) && !isNaN(gstPercentage)) {
            const gstAmount = (amount * gstPercentage) / 100;
            const total = amount + gstAmount;
            gstOutput.textContent = "Final Amount: " + total.toFixed(2);
            gstOutput.style.display = 'block';
            hideOtherOutputs(gstOutput);
        } else {
            alert('Please enter valid numbers');
        }
    }

    function calculatePercentageDifference() {
        const from = parseFloat(percentageFromInput.value);
        const to = parseFloat(percentageToInput.value);
        if (!isNaN(from) && !isNaN(to) && from !== 0) {
            const difference = ((to - from) / Math.abs(from)) * 100;
            percentageDifferenceOutput.textContent = "Percentage Difference: " + difference.toFixed(2) + "%";
            percentageDifferenceOutput.style.display = 'block';
            hideOtherOutputs(percentageDifferenceOutput);
        } else {
            alert('Please enter valid numbers (and make sure "From" is not zero)');
        }
    }

    function calculateDiscountPrice() {
        const originalPrice = parseFloat(originalPriceInput.value);
        const discountPercentage = parseFloat(discountPercentageInput.value);
        if (!isNaN(originalPrice) && !isNaN(discountPercentage)) {
            const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
            discountOutput.textContent = "Final Amount: " + discountedPrice.toFixed(2);
            discountOutput.style.display = 'block';
            hideOtherOutputs(discountOutput);
        } else {
            alert('Please enter valid numbers');
        }
    }

    function swapValues() {
        let fromValue = percentageFromInput.value;
        let toValue = percentageToInput.value;
        percentageFromInput.value = toValue;
        percentageToInput.value = fromValue;

        // Automatically calculate after swapping
        calculatePercentageDifference();
    }

    function hideOtherOutputs(currentOutput) {
        const outputs = document.querySelectorAll('.output');
        outputs.forEach(output => {
            if (output !== currentOutput) {
                output.style.display = 'none';
            }
        });
    }
});
