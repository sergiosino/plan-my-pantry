/**
 * Check if a string is null or white space
 * @param {string} text
 * @returns {bool}
 */
export function isNullOrWhiteSpace (text) {
  return !text || !text.trim()
}
