/*
// src\components\SerialNumberInput.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/SerialNumberInput.css';
import validateSerialNumber from '../utils/validateSerialNumber';

function SerialNumberInput({ serialNumber, onSerialNumberChange, isDarkMode, showTrackButton }) {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/gi, '');
    if (value.length > 3 && value[3] !== ' ') {
      value = value.slice(0, 3) + ' ' + value.slice(3).replace(/\s/g, '');
    }
    if (value.includes(' ') && value.length > 10) {
      value = value.slice(0, 10);
    } else if (!value.includes(' ') && value.length > 9) {
      value = value.slice(0, 9);
    }

    onSerialNumberChange(value);
  };

  const handleTrack = () => {
    if (validateSerialNumber(serialNumber.replace(/\s/g, ''))) {
      navigate('/track');
    }
  };

  return (
    <div className={`serial-input-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <input
        type="text"
        className="serial-input"
        value={serialNumber}
        onChange={handleInputChange}
        placeholder="Enter Serial Number"
      />
      {showTrackButton && (
        <button
          className="track-button"
          onClick={handleTrack}
          disabled={!validateSerialNumber(serialNumber.replace(/\s/g, ''))}
        >
          Track
        </button>
      )}
    </div>
  );
}

export default SerialNumberInput;
  */
"use strict";