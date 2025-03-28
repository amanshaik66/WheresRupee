
/**
 * src\utils\serialNumberUtils.js
 * Utility functions for processing and validating serial numbers.
 */
// Regex patterns for validation
const PREFIX_PATTERN = /^[0-9][A-Z]{2}$/; // 1 digit followed by 2 letters
const NUMERIC_PART_PATTERN = /^[0-9]{6}$/; // 6 digits
const FULL_SERIAL_PATTERN = /^[0-9][A-Z]{2}[0-9]{6}$/; // Complete serial number
/**
 * Normalizes a serial number by removing spaces and converting to uppercase.
 * @param {string} serialNumber - The serial number to normalize.
 * @returns {string|null} The normalized serial number or null if input is invalid.
 * @example
 * normalize(' 1aa123456 ') // '1AA123456'
 */
export function normalize(serialNumber) {
  if (typeof serialNumber !== 'string') {
    console.error('Serial number must be a string.');
    return null;
  }
  return serialNumber.replace(/\s+/g, '').toUpperCase();
}
/**
 * Formats the serial number to include a space after the prefix.
 * Example: "1AA123456" -> "1AA 123456".
 * @param {string} serialNumber - The serial number to format.
 * @returns {string|null} The formatted serial number or null if input is invalid.
 * @example
 * formatSerialNumber('1AA123456') // '1AA 123456'
 */
export function formatSerialNumber(serialNumber) {
  const cleaned = normalize(serialNumber);
  if (!cleaned || cleaned.length < 9) {
    return cleaned; // Return as-is if not complete but still valid
  }
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
}
/**
 * Validates whether the serial number contains valid components (prefix and numeric part).
 * @param {string} serialNumber - The serial number to validate.
 * @returns {boolean} True if valid; otherwise false.
 * @example
 * isValidSerial('1AA123456') // true
 * isValidSerial('XYZ123456') // false
 */
export function isValidSerial(serialNumber) {
  const cleaned = normalize(serialNumber);
  if (!cleaned) return false;
  const components = extractSerialComponents(cleaned);
  if (!components) return false;
  const { prefix, numericPart } = components;
  return PREFIX_PATTERN.test(prefix) && NUMERIC_PART_PATTERN.test(numericPart);
}
/**
 * Extracts the prefix and numeric part of a serial number.
 * Prefix: 1 digit + 2 letters.
 * Numeric Part: 6 digits.
 * @param {string} serialNumber - The serial number to extract components from.
 * @returns {object|null} An object with `prefix` and `numericPart` or null if invalid.
 * @example
 * extractSerialComponents('1AA123456') // { prefix: '1AA', numericPart: '123456' }
 */
export function extractSerialComponents(serialNumber) {
  const cleaned = normalize(serialNumber);
  if (!cleaned || cleaned.length < 9) {
    console.warn(`Invalid serial number structure: "${serialNumber}"`);
    return null;
  }
  return {
    prefix: cleaned.slice(0, 3), // First 3 characters
    numericPart: cleaned.slice(3), // Remaining 6 characters
  };
}
/**
 * Enforces a maximum length of 9 characters for serial numbers.
 * Example: "1AA 123456" or "1AA123456".
 * @param {string} serialNumber - The serial number to enforce length on.
 * @returns {string} The serial number truncated to the maximum allowed length.
 * @example
 * enforceMaxLength('1AA123456789') // '1AA123456'
 */
export function enforceMaxLength(serialNumber) {
  const cleaned = normalize(serialNumber);
  return cleaned ? cleaned.slice(0, 9) : '';
}
/**
 * Checks if a serial number is complete and properly formatted.
 * @param {string} serialNumber - The serial number to check.
 * @returns {boolean} True if complete and formatted; otherwise false.
 * @example
 * isFormattedSerial('1AA123456') // true
 * isFormattedSerial('1AA 12345') // false
 */
export function isFormattedSerial(serialNumber) {
  const cleaned = normalize(serialNumber);
  return FULL_SERIAL_PATTERN.test(cleaned);
}
