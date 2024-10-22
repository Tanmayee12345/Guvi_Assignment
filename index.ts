interface CustomFormData {
  name: string;
  email: string;
  contact: string;  
  subject: string;
  message: string;
}
const form = document.querySelector('.form') as HTMLFormElement;
form.addEventListener('submit', function(event: Event) {
  event.preventDefault();
  const name = (document.getElementById('name') as HTMLInputElement).value.trim();
  const email = (document.getElementById('email') as HTMLInputElement).value.trim();
  const contact = (document.getElementById('contact') as HTMLInputElement).value.trim();
  const subject = (document.getElementById('subject') as HTMLInputElement).value.trim();
  const message = (document.getElementById('message') as HTMLTextAreaElement).value.trim();

  // Validation
  const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
  const contactRegex = /^\d{10}$/; // 10 digits for contact number

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
  const formData: CustomFormData = {
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
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong!');
  })
  .then(data => {
    console.log('Success:', data); 
    alert('Form Submitted Successfully'); 
    form.reset();
  })
  .catch(error => {
    console.error('Error:', error); 
    alert('Submission Failed'); 
  });
});
