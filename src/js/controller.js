import { generatePassword } from './model.js';
import { renderErrorState, renderPassword } from './view.js';

/** @type {HTMLInputElement} */
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

/**
 * Gets the current value from the slider as a number.
 * @returns {number} Password length selected by the user.
 */
const getSliderValue = () => Number(slider.value);

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
  const sliderLength = getSliderValue();
  const options = getUserOptions();
  const password = generatePassword(sliderLength, options);
  console.log(password);

  if (!password) return renderErrorState();

  renderPassword(password);
});
