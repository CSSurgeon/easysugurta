
/**
 * Updates the step progress bar based on current step
 * @param {number} currentStep - The current step number (1, 2, or 3)
 */
function updateStepProgress(currentStep) {
    const stepItems = document.querySelectorAll('.step-item');
    const stepLines = document.querySelectorAll('.step-line');

    stepItems.forEach((item, index) => {
        const stepNumber = index + 1;

        // Remove all states
        item.classList.remove('active', 'completed');

        // Add appropriate state
        if (stepNumber < currentStep) {
            item.classList.add('completed');
        } else if (stepNumber === currentStep) {
            item.classList.add('active');
        }
    });

    // Update progress lines
    stepLines.forEach((line, index) => {
        const lineNumber = index + 1;

        // Fill line if the step before it is completed
        if (lineNumber < currentStep) {
            line.classList.add('filled');
        } else {
            line.classList.remove('filled');
        }
    });
}

// Call on page load to set initial state
document.addEventListener('DOMContentLoaded', function () {
    updateStepProgress(1); // Start at step 1
});
