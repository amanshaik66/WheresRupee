import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({
  label,
  value = '',
  onChange,
  placeholder = 'Enter serial number',
  error = false,
  errorMessage = '',
  helperText = '',
  maxLength = 10,
  className = '',
}) => {
  const [overlay, setOverlay] = useState(value);

  const handleChange = (e) => {
    const newValue = e?.target?.value || ''; // Safely handle undefined
    setOverlay(newValue);
    if (onChange) {
      onChange(newValue); // Call the parent onChange function
    }
  };

  return (
    <div className={`input-container ${className}`}>
      {overlay && (
        <div className="input-overlay">
          <span>{overlay}</span>
        </div>
      )}
      {label && <label htmlFor="input-field" className="input-label">{label}</label>}
      <input
        id="input-field"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`input-field ${error ? 'input-error' : ''}`}
        aria-invalid={error}
        aria-describedby={error ? 'input-error-message' : null}
        aria-label={label || placeholder}
      />
      {helperText && !error && <p id="helper-text" className="helper-text">{helperText}</p>}
      {error && errorMessage && <p id="input-error-message" className="error-message">{errorMessage}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  onChange: () => {}, // Default no-op function
};

export default Input;
