// Basic Info Section
// --- On page load, place cursor in first text field. Add "other" job role to the form's inputs and toggle the "other" text input box when selected

// On page load, cursor appears in "Name" field
$(document).ready(() => {
    $('#name').focus();
});

// Initially hide other job role text field
const jobRoleSelect = $('#title');
const otherJobRole = $('#other-title');
otherJobRole.hide();

// If job role of "other" is selected, reveal "Other" input text field
jobRoleSelect.change(() => {
    let jobRoleSelection = jobRoleSelect.find(':selected').attr('value');
    if (jobRoleSelection === 'other') {
        otherJobRole.toggle();
    } else {
        otherJobRole.hide();
    }
});

// T-Shirt Info Section
// ---Require design selection before color selection is made available, then refine available colors by input option user selected

// Disable and hide "Select Theme" from Design Options Select
const designSelect = $('#design');
designSelect.children()[0].setAttribute('disabled', true);
designSelect
    .children()
    .first()
    .hide();

// Shirt Color option disabled on load
const shirtColorSelect = $('#color');
shirtColorSelect.attr('disabled', true);
// Add "Please Select T-Shirt" prompt in greyed out "Color" select
const colorSelect = $('#color');
colorSelect.prepend('<option>Please select T-shirt theme</option>');
const colorInputs = colorSelect.children();
// Set first input in Design list as selected by default (on load only);
colorInputs[0].selected = true;

// Declare arrays to include indexes of shirt colors to correspond with design theme
let JSPunsArray = [];
let iHeartJSArray = [];

// Categorize shirts and push array index into corresponding arrays
colorInputs.each(function(index) {
    if (
        $(this)
            .text()
            .includes('JS Puns')
    ) {
        JSPunsArray.push(index);
    } else if (
        $(this)
            .text()
            .includes('JS shirt')
    ) {
        iHeartJSArray.push(index);
    }
});

// Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
const colorField = $('#colors-js-puns');
colorField.hide();

// Show corresponding color input when design theme is selected
designSelect.change(() => {
    // Find the selected design input and capture the attributes value
    let designSelection = designSelect.find(':selected').attr('value');
    // When input is selected, use value above to toggle the shirt's visibility according to type determined in arrays listed above
    if (designSelection === 'js puns' || designSelection === 'heart js') {
        // Enable shirt color select
        shirtColorSelect.attr('disabled', false);
        colorField.show();
        // First hide all inputs
        colorInputs.each(function() {
            $(this).hide();
        });
        // Then toggle each input that corresponds with the design theme type. e.g. 'js puns' shirt will enable shirts that have "JS Puns shirt only" in the text
        if (designSelection === 'js puns') {
            colorInputs.each(function(index) {
                if (JSPunsArray.includes(index)) {
                    $(this).toggle();
                }
            });
            colorInputs[JSPunsArray[0]].selected = true;
        }
        if (designSelection === 'heart js') {
            colorInputs.each(function(index) {
                if (iHeartJSArray.includes(index)) {
                    $(this).toggle();
                }
            });
            colorInputs[iHeartJSArray[0]].selected = true;
        }
    }
});

// Activities Section
// ---Create a total cost element and append to DOM beneath input options. Then set initial activities cost to $0. On input change, add or subtract activity's cost and update total cost. On input change, prevent conflicting activities by comparing the day and time attributes given in each input.

// Create a total cost and append below all activity options
const totalCost = document.createElement('h3');
totalCost.textContent = 'Total Cost: $0';
$('.activities').append(totalCost);

// Set the initial activity cost to 0;
let totalActivityCost = 0;

// Event Handler for the Activities Section. On input check/de-check...
$('.activities').change(e => {
    // Local variable for selected input
    let clicked = e.target;

    // Take the clicked input's data-cost value
    let inputCost = clicked.dataset.cost;
    // Remove the dollar sign by replacing $ with an empty string
    inputCost = inputCost.replace('$', '');
    // Take the string and run parseInt to convert to integer
    inputCost = parseInt(inputCost, 10);
    // If the input is checked, add its value to totalActivity Cost, otherwise subtract the value
    if (clicked.checked) {
        totalActivityCost += inputCost;
    } else {
        totalActivityCost -= inputCost;
    }
    // Change the text content of the total cost h3 tag added to DOM above
    document.querySelector('.activities h3').textContent = `Total Cost: $${totalActivityCost}`;

    // If item is selected with a given date, disable conflicting dates
    // Define the clicked items day and time data- attribute
    let clickedDate = e.target.dataset.dayAndTime;
    // Variable to store all activities checkbox inputs
    const checkboxes = document.querySelectorAll('.activities input');
    // Loop compares the clicked input's day and time and compares with all other day and time inputs. If match, disable checkbox, otherwise enable checkbox.
    for (i = 0; i < checkboxes.length; i++) {
        let inputsDate = checkboxes[i].dataset.dayAndTime;
        if (clickedDate === inputsDate && clicked !== checkboxes[i]) {
            if (clicked.checked) {
                checkboxes[i].disabled = true;
            } else {
                checkboxes[i].disabled = false;
            }
        }
    }
});

// Payment Info Section
// ---Hide "Select Payment Method" from payment options 'select' options.

// Display payment sections based on the payment option chosen in the select menu.
const paymentInput = $('#payment');
const paymentSelections = $('#payment option');
// Disabled "Select Payment Method" from options list
paymentInput
    .children()
    .first()
    .hide();
// Make "Credit Card" the default selected payment method
paymentSelections[1].selected = true;

// Hide alternate payment paragraph details by default
$('#paypal').hide();
$('#bitcoin').hide();

// Payment Method Input Change Event Handler
paymentInput.change(() => {
    let currentPaymentMethod = paymentInput.find(':selected').attr('value');
    if (currentPaymentMethod === 'Credit Card') {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    } else if (currentPaymentMethod === 'PayPal') {
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    } else if (currentPaymentMethod === 'Bitcoin') {
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();
    }
});

// Form Validation Section

// Validate Form to ultimately return a boolean. If false, prevent form submission in event handler below. If true, allow form submission in event handler below
const isFormValid = () => {
    // Name Validator: 1) find value of input. 2) return true if valid. 3) if invalid, show error message
    let name = $('#name').val();
    const isValidName = name => /^[a-zA-Z]+\s*[a-zA-z\s]*$/.test(name);

    if (!isValidName(name)) {
        $('._name').show();
    } else {
        $('._name').hide();
    }

    // Email Validator: 1) find value of input. 2) return true if valid. 3) if invalid show error message
    let email = $('#mail').val();
    const isValidEmail = email => /^[^@]+@[^@.]+\.[a-z]+$/.test(email);
    if (!isValidEmail(email)) {
        $('._email').show();
    } else {
        $('._email').hide();
    }

    // Activity Validator: 1) select all checkbox inputs. 2) return true if at least one box is checked. 3) if invalid show error message
    const isValidActivity = () => {
        // If at least one activity input is checked, return true (..or 'valid');
        let activities = $('.activities input');
        for (i = 0; i < activities.length; i++) {
            if (activities[i].checked) {
                return true;
            }
        }
    };
    if (!isValidActivity()) {
        $('._activity').show();
    } else {
        $('._activity').hide();
    }

    // Credit Card Validator: 1) only execute if current payment method is 'Credit Card', otherwise return true. 2) return true if each of the form fields (cc#, zip, cvv) is valid. 3) if invalid show error message
    const isValidCreditCard = () => {
        let currentPaymentMethod = paymentInput.find(':selected').attr('value');
        if (currentPaymentMethod === 'Credit Card') {
            let cardnumber = $('#cc-num').val();
            let zipcode = $('#zip').val();
            let cvv = $('#cvv').val();

            // Validate Credit Card, zipcode, and cvv
            return /\d{13,16}/.test(cardnumber) && /\d{5}/.test(zipcode) && /\d{3}/.test(cvv);
        }
        return true;
    };
    if (!isValidCreditCard()) {
        $('._credit-card').show();
    } else {
        $('._credit-card').hide();
    }

    // Check each validator. If ALL validators return true, return true for entire function isFormValid(), else return false
    if (isValidName(name) && isValidEmail(email) && isValidActivity() && isValidCreditCard()) {
        return true;
    }
    return false;
};

// Create error messages for each required input and append to the DOM in each respective area. Then, hide each error message.
const nameError = '<div class="_name error">Please enter your first and last name.</div>';
$(nameError).insertAfter('#name');
const emailError = '<div class="_email error">Please enter a valid email address.</div>';
$(emailError).insertAfter('#mail');
const activityError = '<div class="_activity error">Please check at least one activity.</div>';
$(activityError).insertBefore($('.activities h3'));
const creditCardError = '<div class="_credit-card error">Please enter a valid credit card.</div>';
$(creditCardError).insertAfter('#exp-year');
$('.error').hide();

// Select the submit button and add event handler to prevent or allow form submission
const submitButton = $('button[type="submit"]');
// If all form validators return true, allow form submission. If any validator is false, false boolean is returned to event handler and default behavior is prevented
submitButton.click(e => {
    if (!isFormValid()) {
        e.preventDefault();
    }
});
