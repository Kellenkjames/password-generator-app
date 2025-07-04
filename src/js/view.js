/** @type {HTMLElement} */
const passwordOutput = document.querySelector('.output__value');

/** @type {HTMLElement} */
const errorMessage = document.querySelector('.form__error'); // Optional element

/**
 * Render the generated password into the UI
 * @param {string} password
 */
export const renderPassword = password => {
  passwordOutput.textContent = password;
  clearErrorState();
};

/**
 * Display an error message or visual state when password generation fails
 */
export const renderErrorState = () => {
  passwordOutput.textContent = ''; // Clear previous output
  if (errorMessage) {
    errorMessage.textContent = 'Please select at least one character type.';
    errorMessage.classList.remove('hidden');
  }
};

/**
 * Clear any previously rendered error state
 */
export function clearErrorState() {
  if (errorMessage) {
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
  }
}
