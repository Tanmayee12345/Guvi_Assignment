var form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var contact = document.getElementById('contact').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();
    // Validation
    var nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    var contactRegex = /^\d{10}$/; // 10 digits for contact number
    if (!name || !nameRegex.test(name)) {
        alert('Please enter a valid name (only letters and spaces allowed).');
        return;
    }
    if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    if (!contact || !contactRegex.test(contact)) {
        alert('Please enter a valid contact number (10 digits).');
        return;
    }
    if (!subject) {
        alert('Please enter a subject.');
        return;
    }
    if (!message) {
        alert('Please enter a message.');
        return;
    }
    var formData = {
        name: name,
        email: email,
        contact: contact,
        subject: subject,
        message: message,
    };
    fetch('https://6713b118690bf212c75f69ee.mockapi.io/contactform', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong!');
    })
        .then(function (data) {
        console.log('Success:', data);
        alert('Form Submitted Successfully');
        form.reset();
    })
        .catch(function (error) {
        console.error('Error:', error);
        alert('Submission Failed');
    });
});
