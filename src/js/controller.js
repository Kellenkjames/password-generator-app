import { evaluatePasswordStrength, generatePassword } from './model.js';
import {
  getPasswordText,
  renderCopiedMessage,
  renderErrorState,
  renderPassword,
  renderPasswordStrength,
  renderSliderValue,
} from './view.js';

/** @type {HTMLFormElement} */
const form = document.querySelector('.form');

/** @type {HTMLInputElement} */
const slider = form.querySelector('.form__slider-input');

/** @type {HTMLInputElement} */
const uppercaseCheckbox = form.querySelector('#uppercase');

/** @type {HTMLInputElement} */
const lowercaseCheckbox = form.querySelector('#lowercase');

/** @type {HTMLInputElement} */
const numbersCheckbox = form.querySelector('#numbers');

/** @type {HTMLInputElement} */
const symbolsCheckbox = form.querySelector('#symbols');

/** @type {HTMLButtonElement} */
const generateBtn = form.querySelector('.button');

/** @type {HTMLButtonElement} */
const copyBtn = document.querySelector('.output__copy');

/**
 * Gets the current value from the slider as a number.
 * @returns {number} Password length selected by the user.
 */
const getPasswordLength = () => Number(slider.value);

/**
 * Gathers checkbox states into a structured options object.
 * @returns {{
 *   useUppercase: boolean,
 *   useLowercase: boolean,
 *   useNumbers: boolean,
 *   useSymbols: boolean
 * }} User preferences for password character types.
 */
const getUserOptions = () => ({
  useUppercase: uppercaseCheckbox.checked,
  useLowercase: lowercaseCheckbox.checked,
  useNumbers: numbersCheckbox.checked,
  useSymbols: symbolsCheckbox.checked,
});

/**
 * Handles click on the Generate button:
 * - Extracts user input
 * - Calls password generator
 * - Handles valid or invalid states
 */
generateBtn.addEventListener('click', e => {
  e.preventDefault();
  const length = getPasswordLength();
  const options = getUserOptions();

  // Validate: Minimum length
  if (length < 4) {
    renderErrorState('Password must be at least 4 characters');
    return;
  }

  // Validate: At least one option selected
  const noOptionsSelected =
    !options.useUppercase &&
    !options.useLowercase &&
    !options.useNumbers &&
    !options.useSymbols;

  if (noOptionsSelected) {
    renderErrorState('Please select at least one character type.');
    return;
  }

  const password = generatePassword(length, options);

  if (!password) return renderErrorState();
  renderPassword(password);

  const strengthLevel = evaluatePasswordStrength(password);
  renderPasswordStrength(strengthLevel);
});

/**
 * Syncs slider UI label with initial value on page load.
 */
renderSliderValue(getPasswordLength());

/**
 * Updates the character count label when the slider is moved.
 * @param {Event} e
 */
slider.addEventListener('input', () => {
  renderSliderValue(getPasswordLength());
});

copyBtn.addEventListener('click', () => {
  const password = getPasswordText();
  if (!password) return;

  navigator.clipboard
    .writeText(password)
    .then(renderCopiedMessage)
    .catch(err => console.error('Failed to copy:', err));
});
