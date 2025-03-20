// src\layouts\Footer.js
import React from 'react';
import PropTypes from 'prop-types';
import '../Footer/Footer.css';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/twitter.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
function Footer({ isDarkMode = false }) {
  return (
    <footer className={`footer ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      {/* Navigation Links */}
      <nav className="footer-links" aria-label="Footer Navigation">
        <a href="/privacy" className="footer-link">
          Privacy Policy
        </a>
        <span className="footer-separator" aria-hidden="true">|</span>
        <a href="/terms" className="footer-link">
          Terms of Service
        </a>
      </nav>
      {/* Social Media Icons */}
      <div className="footer-social">
        <a
          href="https://linkedin.com"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="social-icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </a>
        <a
          href="https://twitter.com"
          aria-label="Twitter"
          title="Twitter"
          className="social-icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </a>
        <a
          href="mailto:contact@WheresRupee.com"
          aria-label="Email"
          title="Email"
          className="social-icon"
        >
          <EmailIcon />
        </a>
      </div>
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <p className="newsletter-prompt">Subscribe to our newsletter:</p>
        <form className="newsletter-form">
          <label htmlFor="newsletter-email" className="sr-only">
            
          </label>
          <input
            id="newsletter-email"
            name="email" // Added name attribute for autofill support
            type="email"
            placeholder="Enter your email"
            aria-label="Newsletter email input"
            className="newsletter-input"
            autoComplete="email" // Provide a hint for the browser
          />
          <button type="submit" className="newsletter-button">
            Subscribe
          </button>
        </form>
      </div>
      {/* Contact Information */}
      <p className="footer-contact">
        Contact us: <a href="mailto:contact@WheresRupee.com" className="footer-email">contact@WheresRupee.com</a>
      </p>
      {/* Copyright Notice */}
      <p className="footer-copyright">
        © {new Date().getFullYear()} WheresRupee. All rights reserved.
      </p>
    </footer>
  );
}
Footer.propTypes = {
  isDarkMode: PropTypes.bool,
};
export default Footer;
