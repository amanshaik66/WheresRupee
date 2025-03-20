// src\utils\trackingUtils.js
import axios from 'axios';

// Axios instance for consistent API calls
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '/';
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
export const saveTrackingData = async (serialNumber, location, setStatus) => {
  try {
    // Input validation
    if (!serialNumber || typeof serialNumber !== 'string' || !serialNumber.trim()) {
      throw new Error('Invalid serial number provided.');
    }

    if (
      !location ||
      typeof location.latitude !== 'number' ||
      typeof location.longitude !== 'number' ||
      typeof location.accuracy !== 'number'
    ) {
      throw new Error('Invalid location data provided. Latitude, longitude, and accuracy must be numbers.');
    }

    // Normalize input
    const payload = {
      serialNumber: serialNumber.trim().toUpperCase(),
      location: {
        latitude: parseFloat(location.latitude.toFixed(5)),
        longitude: parseFloat(location.longitude.toFixed(5)),
        accuracy: location.accuracy,
      },
    };

    // Debug logs
    console.log('API Base URL:', axiosInstance.defaults.baseURL);
    console.log('Payload being sent:', payload);
    console.log('The API is formed', axiosInstance.post);

    // Send POST request to backend
    const response = await axiosInstance.post('/api/track', payload);

    // Update status in the UI
    if (typeof setStatus === 'function') {
      setStatus(response.data.message || 'Location tracked and saved successfully.');
    }

    // Return response data
    return response.data;
  } catch (error) {
    const errorMessage = error.response
      ? `Error ${error.response.status}: ${error.response.data.message || 'Failed to save tracking data.'}`
      : 'Unable to connect to the server. Please check your internet connection or backend server.';
    console.error(`[ERROR] Failed to save tracking data for serial: ${serialNumber}`, error);

    if (typeof setStatus === 'function') {
      setStatus(errorMessage);
    }

    throw new Error(errorMessage);
  }
};

export default axiosInstance;
