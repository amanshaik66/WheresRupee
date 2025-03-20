"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.saveTrackingData = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// src\utils\trackingUtils.js
// Axios instance for consistent API calls
var API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '/';

var axiosInstance = _axios["default"].create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
/** 
 * Save tracking data by sending a POST request to the backend.
 * Adds the current location to the tracking history for the given serial number.
 * @param {string} serialNumber - The serial number to track.
 * @param {object} location - Object containing latitude, longitude, and accuracy of the location.
 * @param {function} setStatus - Function to update the status message in the UI.
 * @returns {Promise<object>} - Resolves to the current and historical tracking data.
 * @throws {Error} - Throws an error if the API call fails.
 */


var saveTrackingData = function saveTrackingData(serialNumber, location, setStatus) {
  var payload, response, errorMessage;
  return regeneratorRuntime.async(function saveTrackingData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!(!serialNumber || typeof serialNumber !== 'string' || !serialNumber.trim())) {
            _context.next = 3;
            break;
          }

          throw new Error('Invalid serial number provided.');

        case 3:
          if (!(!location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number' || typeof location.accuracy !== 'number')) {
            _context.next = 5;
            break;
          }

          throw new Error('Invalid location data provided. Latitude, longitude, and accuracy must be numbers.');

        case 5:
          // Normalize input
          payload = {
            serialNumber: serialNumber.trim().toUpperCase(),
            location: {
              latitude: parseFloat(location.latitude.toFixed(5)),
              longitude: parseFloat(location.longitude.toFixed(5)),
              accuracy: location.accuracy
            }
          }; // Debug logs

          console.log('API Base URL:', axiosInstance.defaults.baseURL);
          console.log('Payload being sent:', payload);
          console.log('The API is formed', axiosInstance.post); // Send POST request to backend

          _context.next = 11;
          return regeneratorRuntime.awrap(axiosInstance.post('/api/track', payload));

        case 11:
          response = _context.sent;

          // Update status in the UI
          if (typeof setStatus === 'function') {
            setStatus(response.data.message || 'Location tracked and saved successfully.');
          } // Return response data


          return _context.abrupt("return", response.data);

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          errorMessage = _context.t0.response ? "Error ".concat(_context.t0.response.status, ": ").concat(_context.t0.response.data.message || 'Failed to save tracking data.') : 'Unable to connect to the server. Please check your internet connection or backend server.';
          console.error("[ERROR] Failed to save tracking data for serial: ".concat(serialNumber), _context.t0);

          if (typeof setStatus === 'function') {
            setStatus(errorMessage);
          }

          throw new Error(errorMessage);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.saveTrackingData = saveTrackingData;
var _default = axiosInstance;
exports["default"] = _default;