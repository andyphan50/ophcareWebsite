
function inputValidation(text) {
    //regex pattern that only accepts alphanumeric values, whitespaces, and common punctuations
    const pattern = /^[a-zA-Z0-9\s.,!?'"-@]+$/; 
    if (pattern.test(text)) {
        return true;
    } else {
        return false; 
    }
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function main() {
    const nameField = document.getElementById('name')
    const emailField = document.getElementById('email')
    const messageField = document.getElementById('message') 
    const confirmationText = document.getElementById('confirmationMessage')
    const submitBtn = document.getElementById('submitBtn')

    document.addEventListener("DOMContentLoaded", function() {
        submitBtn.addEventListener('click', function(event) {
            //prevent default behavior of going to the top of the page
            event.preventDefault(); 
            const nameInput = nameField.value;
            const emailInput = emailField.value;
            const messageInput = messageField.value;

            if (!nameField || !emailField || !messageField || !submitBtn || !confirmationText) {
                confirmationText.textContent ="Required elements are missing from the document.";
                confirmationText.hidden = false;
                return;
            }
            
            if(inputValidation(nameInput)&& validateEmail(emailInput)&& inputValidation(messageInput)) {
                confirmationText.textContent = 'Thank you. Confirmation email sent to your email.';
                confirmationText.hidden = false;
            } else {
                confirmationText.textContent = 'Information provided not valid please try again';
                confirmationText.hidden = false;
            }
        })
    });

}







main();