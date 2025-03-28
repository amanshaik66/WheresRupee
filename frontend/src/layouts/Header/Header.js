import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext'; // Ensure this path is correct
import '../../layouts/Header/Header.css'; // Adjusted import path for CSS based on the new directory location

function Header() {
  const { isDarkMode, toggleTheme } = useTheme(); // Access theme state and toggle function
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isDarkMode ? 'theme-dark' : 'theme-light'} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="branding">
        <img
          //src="/assets/images/WG-LOGO.svg"
          alt=" " // Added meaningful alt text for accessibility
          className="logo"
        />
        <span className="brand-name">WheresRupee</span>
      </div>
      <div className="controls">
        <button
          className="toggle-button"
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} // Improved ARIA label for clarity
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
}

export default Header;
