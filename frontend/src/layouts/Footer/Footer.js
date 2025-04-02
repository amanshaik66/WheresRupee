//WR\frontend\src\layouts\Footer\Footer.js
import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import './Footer.css';

const Footer = ({ isDarkMode }) => {
    return (
        <footer className={`footer ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
            {/* Navigation Links */}
            <nav className="footer-links" aria-label="Footer Navigation">
                <a href="/privacy" className="footer-link">Privacy Policy</a>
                <span className="footer-separator" aria-hidden="true">|</span>
                <a href="/terms" className="footer-link">Terms of Service</a>
            </nav>

            {/* Social Media Icons */}
            <div className="footer-social">
                <a
                    href="https://www.linkedin.com/in/amanshaik66/"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedInIcon />
                </a>
                <a
                    href="https://github.com/amanshaik66/"
                    aria-label="GitHub"
                    title="GitHub"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GitHubIcon />
                </a>
                <a
                    href="mailto:amanshaik66@gmail.com"
                    aria-label="Email"
                    title="Email"
                    className="social-icon"
                >
                    <EmailIcon />
                </a>
            </div>

            {/* Built By Line */}
            <p className="footer-builtby">Built with 💖 by Aman Shaik</p>

            {/* Copyright */}
            <p className="footer-copyright">
                © {new Date().getFullYear()} WheresRupee. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
