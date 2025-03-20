// src\pages\HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../HomePage/HomePage.css';
import {
  INPUT_STATES,
  ERROR_MESSAGES,
  HELPER_TEXT,
  UI,
  DEBUG,
  ARIA_LABELS,
  GENERIC,
  CSS_CLASSES,
} from '../../utils/constants';
import { getSerialState } from '../../utils/validateSerialNumber';
import { normalize, enforceMaxLength } from '../../utils/serialNumberUtils';
import Button from '../../components/Button/Button';
function HomePage({ isDarkMode }) {
  const [serialNumber, setSerialNumber] = useState('');
  const [inputState, setInputState] = useState(INPUT_STATES.EMPTY);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Handle input change and validation
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
  // Handle field blur
  const handleInputBlur = () => {
    if (inputState === INPUT_STATES.EMPTY) {
      setErrorMessage(ERROR_MESSAGES.EMPTY);
    } else if (inputState === INPUT_STATES.INVALID) {
      setErrorMessage(ERROR_MESSAGES.INVALID);
    }
  };
  // Handle track button click
  const handleTrack = async () => {
    if (inputState === INPUT_STATES.VALID) {
      setLoading(true);
      try {
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve({ isValid: true }), GENERIC.NETWORK_DELAY)
        );
        if (response.isValid) {
          navigate('/track', { state: { serialNumber } });
        } else {
          setErrorMessage(ERROR_MESSAGES.SERVER_ERROR);
        }
      } catch (error) {
        setErrorMessage(ERROR_MESSAGES.SERVER_ERROR);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className={`homepage ${isDarkMode ? 'dark' : 'light'}`}>
      <section className={`header-banner ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="banner-content">
          <h1 className="banner-title">{GENERIC.APP_NAME}</h1>
          <p className="banner-tagline">Track your currency note with its serial number.</p>
          <div className="track-section">
            <label htmlFor="serial-input" className="sr-only">
              {ARIA_LABELS.INPUT}
            </label>
            <div className="input-wrapper">
              <input
                id="serial-input"
                type="text"
                className={`serial-input ${
                  inputState === INPUT_STATES.INVALID ? CSS_CLASSES.INPUT_ERROR : ''
                }`}
                value={serialNumber}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                maxLength={UI.MAX_LENGTH}
                placeholder={UI.DEFAULT_SERIAL_FORMAT}
                aria-label={ARIA_LABELS.INPUT}
                aria-live="polite"
              />
              {/* Dynamic Serial Overlay */}
              <div className="serial-overlay">
                {Array.from(UI.DEFAULT_SERIAL_FORMAT).map((char, index) => (
                  <span
                    key={index}
                    className={`overlay-char ${serialNumber[index] ? 'hidden' : ''}`}
                  >
                    {char}
                  </span>
                ))}
              </div>
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
            {/* Helper and Error Messages */}
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
            {/* Track Button */}
            <Button
              label="Track"
              onClick={handleTrack}
              disabled={inputState !== INPUT_STATES.VALID}
              loading={loading}
              className={`track-button ${
                inputState !== INPUT_STATES.VALID ? CSS_CLASSES.BUTTON_DISABLED : ''
              }`}
              ariaLabel={ARIA_LABELS.BUTTON}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;