const NavigationMenu = document.querySelector('.mobile-img');
const hamburgeurMenu = document.querySelector('#header-menu');
const headerMenu = document.querySelector('.remove');

document.querySelectorAll('.link').forEach((a) => a.addEventListener('click', () => {
  hamburgeurMenu.classList.remove('hamburgeur');
}));

function menubar() {
  hamburgeurMenu.classList.toggle('hamburgeur');
}

NavigationMenu.addEventListener('click', menubar);
headerMenu.addEventListener('click', menubar);

// form validation

const form = document.querySelector('form');
const clientName = document.getElementById('name');// get the name
const email = document.getElementById('email');// get the email
const messageType = document.querySelector('.errorMessage');// get the message
const emailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const comment = document.getElementById('comment');
let counter = 0;
const ParagraphError = document.querySelector('.Paragraph-errors');

// for setting errors for name
const setError = (element, message) => {
  messageType.textContent = message;
  clientName.classList.add('error');
  clientName.classList.remove('success');
  ParagraphError.style.display = 'block';
};

// for setting errors for email
const setErrorEmail = (element, message) => {
  messageType.textContent = message;
  email.classList.add('error');
  email.classList.remove('success');
  ParagraphError.style.display = 'block';
};
// for setting errors for comment
const setErrorComment = (element, message) => {
  messageType.textContent = message;
  comment.classList.add('error');
  comment.classList.remove('success');
  ParagraphError.style.display = 'block';
};

// HERE I STARTED
// HERE I STARTED
// HERE I STARTED

// for setting the the success message
const setSuccess = () => {
  messageType.textContent = '';
  clientName.classList.add('success');
  clientName.classList.remove('error');
  email.classList.add('success');
  email.classList.remove('error');
  ParagraphError.style.display = 'block';
};

const validateInputs = () => {
  const usernameValue = clientName.value.trim();
  const emailValue = email.value.trim();
  const messageValue = comment.value.trim();

  // name validation
  if (usernameValue === '') {
    setError(clientName, 'Username is required');
    return;
  } if (usernameValue.length > 30) {
    setError(clientName, 'Username should not exceed 30 characters or be less than 3');
    return;
  }
  if (usernameValue.length < 3) {
    setError(clientName, 'Username should not be less than 3');
    return;
  }
  setSuccess(clientName);
  counter += 1;

  // email validation
  if (emailValue === '') {
    setErrorEmail(email, 'Email is required');
    return;
  }
  if (emailValue !== emailValue.toLowerCase()) {
    setErrorEmail(email, 'Email should be in lowercase');
    return;
  }

  if (!emailRegex.test(emailValue)) {
    setErrorEmail(email, 'Please enter a valide email adress');
    return;
  }

  setSuccess(email);
  counter += 1;

  // comment validation
  if (messageValue === '') {
    setErrorComment(Comment, 'Please add a message');
  } else if (messageValue.split('').length > 500) {
    setErrorComment(Comment, 'Message should be short and do not exceed 500 characters');
  } else {
    setSuccess(Comment);
    counter += 1;
  }
};

form.addEventListener('submit', (e) => {
  // prevent sumitting

  validateInputs();// tocheck the form for validation

  // making decisions
  if (counter === 3) {
    messageType.classList.replace('errorMessage', 'submitted');
    messageType.textContent = 'Submitted';
    ParagraphError.style.display = 'block';
  } else {
    counter = 0;
    e.preventDefault();
  }
});

// Storing data Client side local storage

function createStorage() {
  const FormData = {
    username: clientName.value,
    userEmail: email.value,
    userMessage: messageType.value,
  };

  localStorage.setItem('data', JSON.stringify(FormData));
}
document.addEventListener('DOMContentLoaded', () => {
  const getStoragevalue = localStorage.getItem('data');
  if (getStoragevalue) {
    const formObject = JSON.parse(getStoragevalue);
    clientName.value = formObject.username;
    email.value = formObject.userEmail;
    messageType.value = formObject.messageType;
  }
});
clientName.onchange = createStorage;
email.onchange = createStorage;
messageType.onchange = createStorage;

// Get a reference to the Download CV button
const downloadCVButton = document.getElementById('downloadCVButton');

// Add a click event listener to the button
downloadCVButton.addEventListener('click', () => {
  // Define the URL of the CV PDF
  const cvUrl = './kishore.pdf';

  // Create a hidden anchor element to trigger the download
  const downloadLink = document.createElement('a');
  downloadLink.href = cvUrl;
  downloadLink.download = './kishore.pdf';

  // Simulate a click on the anchor element to trigger the download
  downloadLink.click();
});