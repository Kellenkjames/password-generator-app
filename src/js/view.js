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
export const clearErrorState = () => {
  if (errorMessage) {
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
  }
};

/**
 * Renders the slider input value in the DOM
 *
 * @param {Number} value the slider input value
 */
export const renderSliderValue = value => {
  const sliderValue = document.querySelector('.form__characters-value');
  sliderValue.textContent = value;
};

/**
 * Temporarily shows a visual "Copied" feedback state on the clipboard button.
 * Adds the `copied` class for styling, then removes it after a short delay.
 */
export const showCopiedState = () => {
  const copyBtn = document.querySelector('.output__copy');
  copyBtn.classList.add('copied');
  setTimeout(() => copyBtn.classList.remove('copied'), 1500);
};

/**
 * Retrieves the currently displayed password text from the UI.
 * @returns {string} The password string, or an empty string if none is present.
 */
export const getPasswordText = () =>
  document.querySelector('.output__value')?.textContent || '';
