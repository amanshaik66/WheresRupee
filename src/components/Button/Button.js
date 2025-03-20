// src\components\Button\Button.js
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  label,
  onClick = () => {}, // Default no-op function
  type = 'button',
  variant = 'primary', // Added variant prop
  size = 'medium', // Added size prop
  disabled = false,
  loading = false,
  icon = null, // Support for an icon
  loadingText = 'Loading...', // Default loading text
  className = '',
  ariaLabel = '', // Support for aria-label for better accessibility
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button-${variant} button-${size} ${disabled ? 'button-disabled' : ''} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      aria-label={ariaLabel || label} // Use ariaLabel if provided
    >
      {loading ? (
        <span className="button-loading">
          <span className="spinner" />
          {loadingText && <span className="loading-text">{loadingText}</span>}
        </span>
      ) : (
        <>
          {icon && <span className="button-icon">{icon}</span>}
          {label && <span className="button-label">{label}</span>}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'success', 'text']), // Added more variants
  size: PropTypes.oneOf(['small', 'medium', 'large']), // Added size prop
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.element, // Icon as a React element
  loadingText: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string, // Accessibility support
};

Button.defaultProps = {
  label: '',
  onClick: () => {},
  type: 'button',
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  icon: null,
  loadingText: 'Loading...',
  className: '',
  ariaLabel: '',
};

export default Button;
