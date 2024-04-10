document.addEventListener('DOMContentLoaded', function() {
    const normalAmountInput = document.getElementById('normalAmount'); // Corrected variable name
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
    const percentageDifferenceOutput = document.getElementById('percentageDifference');
    const normalOutput = document.getElementById('normalOutput');
    const gstOutput = document.getElementById('gstOutput');
    const discountOutput = document.getElementById('discountOutput');

    calculateNormalButton.addEventListener('click', calculateNormalPercentage);
    calculateGSTButton.addEventListener('click', calculateGST);
    calculatePercentageDifferenceButton.addEventListener('click', calculatePercentageDifference);
    calculateDiscountButton.addEventListener('click', calculateDiscountPrice);

    function calculateNormalPercentage() {
        const amount = parseFloat(normalAmountInput.value);
        const percentage = parseFloat(normalPercentageInput.value);
        if (!isNaN(amount) && !isNaN(percentage)) {
            const change = amount * (percentage / 100);
            const finalAmount = change;
            normalOutput.textContent = "Final Value: " + finalAmount.toFixed(2);
            normalOutput.style.display = 'block'; // Display the output
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
            gstOutput.style.display = 'block'; // Display the output
            hideOtherOutputs(gstOutput);
        } else {
            alert('Please enter valid numbers');
        }
    }

    function calculatePercentageDifference() {
        const from = parseFloat(percentageFromInput.value);
        const to = parseFloat(percentageToInput.value);
        if (!isNaN(from) && !isNaN(to)) {
            const difference = ((to - from) / Math.abs(from)) * 100;
            percentageDifferenceOutput.textContent = "Percentage Difference: " + difference + "%";
            percentageDifferenceOutput.style.display = 'block'; // Display the output
            hideOtherOutputs(percentageDifferenceOutput);
        } else {
            alert('Please enter valid numbers');
        }
    }

    function calculateDiscountPrice() {
        const originalPrice = parseFloat(originalPriceInput.value);
        const discountPercentage = parseFloat(discountPercentageInput.value);
        if (!isNaN(originalPrice) && !isNaN(discountPercentage)) {
            const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
            discountOutput.textContent = "Final Amount: " + discountedPrice.toFixed(2);
            discountOutput.style.display = 'block'; // Display the output
            hideOtherOutputs(discountOutput);
        } else {
            alert('Please enter valid numbers');
        }
    }

    function hideOtherOutputs(currentOutput) {
        const outputs = document.querySelectorAll('.output');
        outputs.forEach(output => {
            if (output !== currentOutput) {
                output.style.display = 'none';
            }
        });
    }

    // Display the respective final amount section after clicking calculate buttons
    calculateNormalButton.addEventListener('click', function() {
        document.getElementById('finalAmountNormal').style.display = 'block';
    });

    calculateGSTButton.addEventListener('click', function() {
        document.getElementById('finalAmountGST').style.display = 'block';
    });

    calculateDiscountButton.addEventListener('click', function() {
        document.getElementById('finalAmountDiscount').style.display = 'block';
    });
});