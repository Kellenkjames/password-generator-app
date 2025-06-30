/**
 * Returns a random character from the provided pool of characters.
 *
 * @param {Array<string>} pool - An array of characters from which to pick a random character.
 * @returns {string} A randomly selected character from the pool.
 */
export const getRandomChar = pool => {
  const randIndex = Math.floor(Math.random() * pool.length);
  return pool[randIndex];
};
