/**
 * Shuffles the elements of an array in place using the Fisher-Yates (Knuth) shuffle algorithm.
 *
 * @param {Array<any>} arr - The array to be shuffled.
 * @returns {Array<any>} The shuffled array (the same array instance passed in).
 */
export const shuffleArray = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
