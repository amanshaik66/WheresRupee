"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFullSerial = validateFullSerial;
exports.validatePartialSerial = validatePartialSerial;
exports.isSerialComplete = isSerialComplete;

var _serialNumberUtils = require("./serialNumberUtils");

/**
 * src\utils\validateSerialNumber.js
 * Utility functions for validating serial numbers.
 */
// Ensure this import exists

/**
 * Validates the full serial number format.
 * Accepted formats: "1AA 123456" or "1AA123456".
 * @param {string} serialNumber - The serial number to validate.
 * @returns {boolean} True if valid; otherwise false.
 */
function validateFullSerial(serialNumber) {
  var cleaned = (0, _serialNumberUtils.normalize)(serialNumber);
  return cleaned ? /^[0-9][A-Z]{2}[0-9]{6}$/.test(cleaned) : false;
}
/**
 * Validates the serial number incrementally as the user types.
 * Handles both space-inclusive and space-free formats.
 * @param {string} serialNumber - The serial number to validate partially.
 * @returns {boolean} True if valid so far; otherwise false.
 */


function validatePartialSerial(serialNumber) {
  var cleaned = (0, _serialNumberUtils.normalize)(serialNumber);
  if (!cleaned) return false; // Regex rules for each step in typing the serial number

  var partialRegex = [/^[0-9]$/, // 1st: digit
  /^[0-9][A-Z]$/, // 1st + 2nd: digit + uppercase letter
  /^[0-9][A-Z]{2}$/, // 1st-3rd: digit + 2 uppercase letters
  /^[0-9][A-Z]{2}[0-9]$/, // 1st-4th: prefix + numeric
  /^[0-9][A-Z]{2}[0-9]{2}$/, // 1st-5th: prefix + 2 digits
  /^[0-9][A-Z]{2}[0-9]{3}$/, // 1st-6th: prefix + 3 digits
  /^[0-9][A-Z]{2}[0-9]{4}$/, // 1st-7th: prefix + 4 digits
  /^[0-9][A-Z]{2}[0-9]{5}$/, // 1st-8th: prefix + 5 digits
  /^[0-9][A-Z]{2}[0-9]{6}$/ // Complete valid serial
  ]; // Validate each character incrementally

  return partialRegex.some(function (regex) {
    return regex.test(cleaned);
  });
}
/**
 * Checks if the serial number input is complete and valid.
 * @param {string} serialNumber - The serial number to check.
 * @returns {boolean} True if complete; otherwise false.
 */


function isSerialComplete(serialNumber) {
  var cleaned = (0, _serialNumberUtils.normalize)(serialNumber);
  return validateFullSerial(cleaned) && cleaned.length === 9;
}