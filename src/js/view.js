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
  passwordOutput.classList.add('visible');
  clearErrorState();
};

/**
 * Display an error message or visual state when password generation fails
 * @param {string} message
 */
export const renderErrorState = () => {
  passwordOutput.textContent = ''; // Clear previous output
  if (errorMessage) {
    errorMessage.textContent = 'Please select at least one character type.';
    errorMessage.classList.remove('hidden');
    errorMessage.classList.add('visible');
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
export const renderCopiedMessage = () => {
  const copiedEl = document.querySelector('.output__copied');
  if (!copiedEl) return;

  copiedEl.classList.add('visible');

  setTimeout(() => {
    copiedEl.classList.remove('visible');
  }, 3000);
};

/**
 * Retrieves the currently displayed password text from the UI.
 * @returns {string} The password string, or an empty string if none is present.
 */
export const getPasswordText = () =>
  document.querySelector('.output__value')?.textContent || '';

/**
 * Renders the password strength level visually.
 * Adds BEM modifier class and label, and ensures visibility.
 *
 * @param {"too-weak" | "weak" | "medium" | "strong"} level - Password strength category
 */
export const renderPasswordStrength = level => {
  const meter = document.querySelector('.strength-meter');
  const desc = meter.querySelector('.strength-meter__desc');

  desc.textContent = level;
  desc.classList.add('visible');

  // Clean up previous strength modifier class
  meter.classList.remove(
    'strength-meter--too-weak',
    'strength-meter--weak',
    'strength-meter--medium',
    'strength-meter--strong'
  );

  if (level)
    meter.classList.add(
      `strength-meter--${level.toLowerCase().replace(/\s/g, '-')}`
    );
};
