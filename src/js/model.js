import { passwordCharSets } from './constants/characterPools.js';
import { getRandomChar } from './utils/getRandomChar.js';
import { shuffleArray } from './utils/shuffleArray.js';

/**
 * Generates a secure password based on user-defined criteria.
 *
 * @param {number} length - Desired password length.
 * @param {Object} options - Configuration for character types.
 * @param {boolean} options.useUppercase
 * @param {boolean} options.useLowercase
 * @param {boolean} options.useNumbers
 * @param {boolean} options.useSymbols
 * @returns {string|null} - Generated password or null if invalid input.
 */
export const generatePassword = (length, options) => {
  // 1. Validate inputs
  const selectedTypesCount = Object.values(options).filter(Boolean).length;
  if (length === 0 || selectedTypesCount === 0) return null;

  // 2. Build pools based on the user's checkboxes
  const selectedPools = [];
  const { useUppercase, useLowercase, useNumbers, useSymbols } = options;

  if (useUppercase) selectedPools.push(passwordCharSets.uppercaseLetters);
  if (useLowercase) selectedPools.push(passwordCharSets.lowercaseLetters);
  if (useNumbers) selectedPools.push(passwordCharSets.numbers);
  if (useSymbols) selectedPools.push(passwordCharSets.symbols);

  // Phase 2a: Guarantee 1 char from each
  const result = [];
  selectedPools.forEach(pool => {
    result.push(getRandomChar(pool));
  });

  // Phase 2b: Fill Remaining Characters
  const combinedPool = selectedPools.flat();

  while (result.length < length) result.push(getRandomChar(combinedPool));

  return shuffleArray(result).join('');
};

/**
 * Evaluates password strength based on length and character diversity.
 *
 * @param {string} password - The generated password.
 * @returns {'too-weak' | 'weak' | 'medium' | 'strong'} Semantic strength label.
 */
export const evaluatePasswordStrength = password => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return 'too-weak';
  if (score === 2) return 'weak';
  if (score === 3) return 'medium';
  return 'strong';
};
