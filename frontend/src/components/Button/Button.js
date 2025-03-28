// src/components/Button/Button.js
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  loadingText = 'Loading...',
  className = '',
  ariaLabel = '',
}) => {
  const isDisabled = disabled || loading;
  const computedAriaLabel = ariaLabel || label;

  const baseClass = `button button-${variant} button-${size}`;
  const stateClass = isDisabled ? 'button-disabled' : '';
  const fullClassName = `${baseClass} ${stateClass} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={fullClassName}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      aria-label={computedAriaLabel}
    >
      {loading ? (
        <span className="button-loading">
          <span className="spinner" aria-hidden="true" />
          {loadingText && <span className="loading-text">{loadingText}</span>}
        </span>
      ) : (
        <>
          {icon && <span className="button-icon">{icon}</span>}
          {label && (
            <span className="button-label" aria-hidden={loading}>
              {label}
            </span>
          )}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'success', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.element,
  loadingText: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
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
