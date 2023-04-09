/**
 * Capitalizes and deletes white speces of a string
 * @param {string} text
 * @returns {string}
 */
export function capitalizeString (text) {
  const newText = text.trim()
  return newText.trim().charAt(0).toUpperCase() + newText.slice(1)
}
