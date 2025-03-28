/**
 * src/utils/constants.js
 * Centralized constants for the Serial Number Tracking Application.
 */

// === Validation Regex Patterns ===
export const REGEX = {
    FULL_SERIAL: /^[0-9][A-Z]{2}[0-9]{6}$/, // Full serial number format: "1AA123456"
    PREFIX: /^[0-9][A-Z]{2}$/,              // Prefix format: 1 digit + 2 uppercase letters
    NUMERIC_PART: /^[0-9]{6}$/,             // Numeric part: 6 digits
    PARTIAL: [
      /^[0-9]$/,                // 1st: digit
      /^[0-9][A-Z]$/,           // 1st + 2nd: digit + uppercase letter
      /^[0-9][A-Z]{2}$/,        // 1st-3rd: digit + 2 uppercase letters
      /^[0-9][A-Z]{2}[0-9]$/,   // 1st-4th: prefix + 1 digit
      /^[0-9][A-Z]{2}[0-9]{2}$/, // 1st-5th: prefix + 2 digits
      /^[0-9][A-Z]{2}[0-9]{3}$/, // 1st-6th: prefix + 3 digits
      /^[0-9][A-Z]{2}[0-9]{4}$/, // 1st-7th: prefix + 4 digits
      /^[0-9][A-Z]{2}[0-9]{5}$/, // 1st-8th: prefix + 5 digits
      /^[0-9][A-Z]{2}[0-9]{6}$/, // Complete valid serial
    ],
  };
  
  // === Validation States ===
  export const INPUT_STATES = {
    EMPTY: 'empty',       // Field is empty
    PARTIAL: 'partial',   // Partially valid input
    INVALID: 'invalid',   // Invalid input format
    VALID: 'valid',       // Fully valid input
  };
  
  // === Error Messages ===
  export const ERROR_MESSAGES = {
    EMPTY: 'Field cannot be empty.',                             // Shown when the input is empty
    INVALID: 'Invalid serial number format. Please check your note.', // Shown for invalid input
    PARTIAL: 'The serial number is incomplete.',                 // Shown for partial input
    SERVER_ERROR: 'Error connecting to the server. Please try again.', // Generic server error
    TRACK_DISABLED: 'The Track button is disabled until the input is valid.', // Specific for disabled button state
  };
  
  // === Helper Text ===
  export const HELPER_TEXT = {
    DEFAULT: 'Format: 1 digit, 2 letters, 6 digits (e.g., 1AA 123456)', // Default input guide
    PARTIAL: 'Keep typing to complete the serial number.',             // Shown for partial input
    INVALID: 'Check your serial number and re-enter it.',              // Shown for invalid input
  };
  
  // === UI Constants ===
  export const UI = {
    MAX_LENGTH: 9,                       // Maximum allowed length for the serial number
    DEFAULT_SERIAL_FORMAT: '1AA123456', // Placeholder or overlay text
    ICONS: {
      VALID: '✔',       // Icon for valid input
      INVALID: '❌',     // Icon for invalid input
    },
  };
  
  // === API Endpoints ===
  export const API = {
    VALIDATE: '/api/validate', // Endpoint to validate serial numbers
    TRACK: '/api/track',       // Endpoint to track serial numbers
  };
  
  // === Animation/Transition Timings ===
  export const ANIMATION_TIMINGS = {
    INPUT_FOCUS: 300,    // Input focus transition duration (ms)
    BUTTON_LOADING: 500, // Button loading spinner duration (ms)
  };
  
  // === Accessibility Labels ===
  export const ARIA_LABELS = {
    INPUT: 'Enter the serial number of your currency note',  // For the input field
    BUTTON: 'Click to track the serial number',             // For the Track button
    VALIDATION_ICON: 'Validation status of input',          // For tick/cross icons
  };
  
  // === CSS Classes ===
  export const CSS_CLASSES = {
    INPUT_ERROR: 'input-error',       // Applied to inputs with errors
    INPUT_SUCCESS: 'input-success',   // Applied to valid inputs
    BUTTON_DISABLED: 'button-disabled', // Applied to disabled buttons
    VALIDATION_ICON: 'validation-icon', // Applied to validation tick/cross icons
  };
  
  // === Generic Constants ===
  export const GENERIC = {
    APP_NAME: "WheresRupee?",         // Application name
    NETWORK_DELAY: 1000,                 // Simulated network delay (ms)
    AUTHOR: 'Aman Shaik',            // Attribution or team name
  };
  
  // === User Interaction Constants ===
  export const INTERACTIONS = {
    INITIAL_INPUT_STATE: INPUT_STATES.EMPTY, // Default input state on page load
    FOCUS_OUT_EMPTY: ERROR_MESSAGES.EMPTY,   // Message shown on losing focus with empty input
    FOCUS_OUT_INVALID: ERROR_MESSAGES.INVALID, // Message shown on losing focus with invalid input
  };
  
  // === Debugging ===
  export const DEBUG = {
    ENABLED: true, // Enable or disable console logs for debugging
    LOG_INPUT_STATE: (state, value) => {
      if (DEBUG.ENABLED) {
        console.log(`Input State: ${state}, Value: "${value}"`);
      }
    },
  };
  