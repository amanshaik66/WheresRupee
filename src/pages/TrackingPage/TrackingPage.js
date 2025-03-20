//WheresRupeeProject\frontend\src\pages\TrackingPage\TrackingPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TrackingPage.css';
import { saveTrackingData } from '../../utils/trackingUtils'; // Correct import
import MapPlaceholder from '../../components/Map/MapPlaceholder';
import {
  INPUT_STATES,
  HELPER_TEXT,
  UI,
  DEBUG,
  CSS_CLASSES,
  ARIA_LABELS,
} from '../../utils/constants';
import { getSerialState } from '../../utils/validateSerialNumber';
import { normalize, enforceMaxLength } from '../../utils/serialNumberUtils';

function TrackingPage({ isDarkMode = false }) {
  const location = useLocation();
  const navigate = useNavigate();

  // State Variables
  const [serialNumber, setSerialNumber] = useState(location.state?.serialNumber || '');
  const [inputState, setInputState] = useState(INPUT_STATES.VALID);
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingData, setTrackingData] = useState(null); // Holds current and previous locations
  const [markers, setMarkers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch tracking data when the component mounts
  useEffect(() => {
    if (!serialNumber) {
      navigate('/'); // Redirect to HomePage if serial number is missing
      return;
    }
    console.log("Fetching user location...");
    setLoading(true);

    // Get user's current location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          console.log('User location:', userLocation);  // Log the data for debugging


          saveTrackingData(serialNumber, userLocation, setStatusMessage)
            .then((data) => {
              setTrackingData(data);
              setMarkers([ // Set markers for MapPlaceholder
                {
                  coordinates: [data.current_location.longitude, data.current_location.latitude],
                  popupText: `Current Location: ${data.current_location.latitude}, ${data.current_location.longitude}`,
                  title: "Current Location"
                },
                ...(data.previous_locations || []).map((loc) => ({
                  coordinates: [loc.longitude, loc.latitude],
                  popupText: `Previous Location: ${loc.latitude}, ${loc.longitude}`,
                  title: "Previous Location"
                })),
              ]);
            })
            .catch((error) => {
              console.error('Error saving tracking data:', error);
              setStatusMessage('Failed to load tracking data.');
            })
            .finally(() => setLoading(false));
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setStatusMessage('Failed to retrieve your location.');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setStatusMessage('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, [serialNumber, navigate]);

  // Handle serial number input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    const normalizedValue = normalize(value);
    const truncatedValue = enforceMaxLength(normalizedValue);

    setSerialNumber(truncatedValue);

    const { state, message } = getSerialState(normalizedValue);
    setInputState(state);
    setErrorMessage(message || '');

    if (DEBUG.ENABLED) DEBUG.LOG_INPUT_STATE(state, normalizedValue);
  };

  return (
    <div className={`tracking-page ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header Section */}
      <section className={`header-banner ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="banner-content">
          <h1 className="banner-title">WheresRupee?</h1>
          <p className="banner-tagline">Track your currency note with its serial number.</p>

          {/* Input Section */}
          <div className="track-section">
            <label htmlFor="serial-input" className="sr-only">
              {ARIA_LABELS.INPUT}
            </label>
            <div className="input-wrapper">
              <input
                id="serial-input"
                type="text"
                className={`serial-input ${inputState === INPUT_STATES.INVALID ? CSS_CLASSES.INPUT_ERROR : ''}`}
                value={serialNumber}
                onChange={handleInputChange}
                maxLength={UI.MAX_LENGTH}
                placeholder={UI.DEFAULT_SERIAL_FORMAT}
                aria-label={ARIA_LABELS.INPUT}
                aria-live="polite"
              />

              {/* Validation Icon */}
              {(inputState === INPUT_STATES.VALID || inputState === INPUT_STATES.PARTIAL) && (
                <span
                  className={`validation-icon ${CSS_CLASSES.VALIDATION_ICON}`}
                  aria-label={ARIA_LABELS.VALIDATION_ICON}
                >
                  {UI.ICONS.VALID}
                </span>
              )}
              {inputState === INPUT_STATES.INVALID && (
                <span
                  className={`validation-icon ${CSS_CLASSES.VALIDATION_ICON}`}
                  aria-label={ARIA_LABELS.VALIDATION_ICON}
                >
                  {UI.ICONS.INVALID}
                </span>
              )}
            </div>

            {/* Helper Text */}
            <p className="helper-text">
              {inputState === INPUT_STATES.PARTIAL
                ? HELPER_TEXT.PARTIAL
                : inputState === INPUT_STATES.INVALID
                ? HELPER_TEXT.INVALID
                : HELPER_TEXT.DEFAULT}
            </p>
            {errorMessage && (
              <p id="error-message" className="error-message" aria-live="polite">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <h2>Tracking Results</h2>
        {loading && <p>Loading tracking data...</p>}
        {statusMessage && <p className="status-message">{statusMessage}</p>}
        {trackingData && (
          <>
            <div className="current-location">
              <h3>Current Location</h3>
              <p><strong>Coordinates:</strong> {`${trackingData.current_location.latitude}, ${trackingData.current_location.longitude}`}</p>
              <p><strong>Timestamp:</strong> {new Date(trackingData.current_location.timestamp).toLocaleString()}</p>
            </div>
            <MapPlaceholder isDarkMode={isDarkMode} markers={markers} />
          </>
        )}
        {trackingData && trackingData.previous_locations && trackingData.previous_locations.length > 0 && (
          <div className="previous-locations">
            <h3>Previous Locations</h3>
            <ul>
              {trackingData.previous_locations.map((location, index) => (
                <li key={index}>
                  {`${location.latitude}, ${location.longitude} - ${new Date(location.timestamp).toLocaleString()}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default TrackingPage;
