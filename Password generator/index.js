// Set an initial value of 10 to the input field with ID 'textInput'
document.getElementById('textInput').value = 10;

// Function to update the input field value based on the range input
function updateTextInput(val) {
  document.getElementById('textInput').value = val;
  generateNewPassword(); // Generate a new password whenever the input value changes
}

// Function to update the range input value based on the input field
function updateRangeInput(val) {
  document.getElementById('rangeInput').value = val;
  generateNewPassword(); // Generate a new password whenever the range input value changes
}

// Function to generate a new password based on user preferences
function generateNewPassword() {
  const length = parseInt(document.getElementById('textInput').value);
  const useUppercase = document.getElementById('uppercase').checked;
  const useLowercase = document.getElementById('lowercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSymbols = document.getElementById('symbols').checked;

  // Define character sets for password generation
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  // Combine selected character sets
  let allChars = '';
  if (useUppercase) allChars += uppercaseChars;
  if (useLowercase) allChars += lowercaseChars;
  if (useNumbers) allChars += numberChars;
  if (useSymbols) allChars += symbolChars;

  // Generate the password
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  // Display the generated password in the input field with ID 'generatedPassword'
  document.getElementById('generatedPassword').value = password;
}

// Function to copy the generated password to the clipboard
function copyPassword() {
  const passwordField = document.getElementById('generatedPassword');
  navigator.clipboard.writeText(passwordField.value);
  alert('Password copied to clipboard!');
}

