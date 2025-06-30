import { passwordCharSets } from './constants/characterPools';
import { getRandomChar } from './utils/getRandomChar';
import { shuffleArray } from './utils/shuffleArray';

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
