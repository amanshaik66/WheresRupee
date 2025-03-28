
/**
 * src\utils\validateSerialNumber.js
 * Utility functions for validating serial numbers.
 */
import { normalize } from './serialNumberUtils'; // Ensure this import exists
// Constants for regex patterns
const FULL_SERIAL_REGEX = /^[0-9][A-Z]{2}[0-9]{6}$/; // Full serial validation
const PARTIAL_REGEX = [
  /^[0-9]$/,                // 1st: digit
  /^[0-9][A-Z]$/,           // 1st + 2nd: digit + uppercase letter
  /^[0-9][A-Z]{2}$/,        // 1st-3rd: digit + 2 uppercase letters
  /^[0-9][A-Z]{2}[0-9]$/,   // 1st-4th: prefix + 1 digit
  /^[0-9][A-Z]{2}[0-9]{2}$/, // 1st-5th: prefix + 2 digits
  /^[0-9][A-Z]{2}[0-9]{3}$/, // 1st-6th: prefix + 3 digits
  /^[0-9][A-Z]{2}[0-9]{4}$/, // 1st-7th: prefix + 4 digits
  /^[0-9][A-Z]{2}[0-9]{5}$/, // 1st-8th: prefix + 5 digits
  FULL_SERIAL_REGEX,         // Complete valid serial
];
/**
 * Validates the full serial number format.
 * Accepted formats: "1AA 123456" or "1AA123456".
 * @param {string} serialNumber - The serial number to validate.
 * @returns {boolean} True if valid; otherwise false.
 * @example
 * validateFullSerial('1AA123456'); // true
 * validateFullSerial('XYZ123');   // false
 */
export function validateFullSerial(serialNumber) {
  const cleaned = normalize(serialNumber);
  return cleaned ? FULL_SERIAL_REGEX.test(cleaned) : false;
}
/**
 * Validates the serial number incrementally as the user types.
 * Handles both space-inclusive and space-free formats.
 * @param {string} serialNumber - The serial number to validate partially.
 * @returns {boolean} True if valid so far; otherwise false.
 * @example
 * validatePartialSerial('1A'); // true (valid partial input)
 * validatePartialSerial('123'); // false (invalid format at 3rd character)
 */
export function validatePartialSerial(serialNumber) {
  const cleaned = normalize(serialNumber);
  if (!cleaned || cleaned.length > 9) return false;
  // Check against partial regex based on current length
  return PARTIAL_REGEX[cleaned.length - 1]?.test(cleaned) || false;
}
/**
 * Checks if the serial number input is complete and valid.
 * @param {string} serialNumber - The serial number to check.
 * @returns {boolean} True if complete and valid; otherwise false.
 * @example
 * isSerialComplete('1AA123456'); // true
 * isSerialComplete('1AA12345');  // false (incomplete serial)
 */
export function isSerialComplete(serialNumber) {
  const cleaned = normalize(serialNumber);
  return cleaned && cleaned.length === 9 && FULL_SERIAL_REGEX.test(cleaned);
}
/**
 * Determines the state of the serial number and provides an error message if needed.
 * States: "valid", "partial", "invalid", "empty".
 * @param {string} serialNumber - The serial number to evaluate.
 * @returns {object} An object containing the state and optional error message.
 * @example
 * getSerialState('1AA12345'); 
 * // { state: 'partial', message: null }
 * getSerialState('XYZ123');  
 * // { state: 'invalid', message: 'Serial number must start with a digit.' }
 */
export function getSerialState(serialNumber) {
  const cleaned = normalize(serialNumber);
  if (!cleaned) {
    return { state: 'empty', message: null }; // Empty input
  }
  if (validateFullSerial(cleaned)) {
    return { state: 'valid', message: null }; // Fully valid input
  }
  if (validatePartialSerial(cleaned)) {
    return { state: 'partial', message: null }; // Partially valid input
  }
  // Provide contextual error messages for invalid input
  const errors = [];
  if (!/^[0-9]/.test(cleaned)) {
    errors.push('Serial number must start with a digit.');
  }
  if (!/^.{1}[A-Z]{0,2}/.test(cleaned)) {
    errors.push('Prefix must include two uppercase letters.');
  }
  if (cleaned.length > 9) {
    errors.push('Serial number must not exceed 9 characters.');
  }
  return { state: 'invalid', message: errors.join(' ') || 'Invalid serial number format.' };
}
