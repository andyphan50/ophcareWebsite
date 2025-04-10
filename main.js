//function for input validation of text fields
function inputValidation(text) {
    //regex pattern that only accepts alphanumeric values, whitespaces, and common punctuations
    const pattern = /^[a-zA-Z0-9\s.,!?'"-@]+$/; 
    if (pattern.test(text)) {
        return true;
    } else {
        return false; 
    }
}
//function for input validation of email text field
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function extractFormData(name, email, message) {
    const jsonData = {
        'name': name, 
        'email': email, 
        'message': message
    }
    return jsonData; 
}

async function sendPost(jsonData) {
    try {
        const response = await fetch('http://localhost:3000/submit-form', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify(jsonData), 
        }); 
        if (response.ok) {
            console.log('Data sent successfully:', await response.text()); 
        } else {
            console.error('Error sending data:', response.statusText); 
        }
    } catch (error) {
        console.error('Network error:', error); 
    }
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

            //checks fields for missing data, tells user to try again if missing data
            if (!nameField || !emailField || !messageField || !submitBtn || !confirmationText) {
                confirmationText.textContent ="Required elements are missing from the document.";
                confirmationText.hidden = false;
                return;
            }
            
            //functions for input validation of fields 
            if(inputValidation(nameInput)&& validateEmail(emailInput)&& inputValidation(messageInput)) {
                const data = extractFormData(nameInput, emailInput, messageInput); 
                sendPost(data); 
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