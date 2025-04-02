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
        src="/favicon/favicon.svg" // or use /favicon/favicon-96x96.png if you prefer PNG
        alt="WheresRupee logo"
        className="logo"
        width={32}
        height={32}
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
