// src/context/ThemeContext.js
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { themes } from './theme'; // Import your theme definitions

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: themes.light, // Default theme
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('isDarkMode')) || false;
  });

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

  const theme = isDarkMode ? themes.dark : themes.light;

  const value = useMemo(() => ({
    isDarkMode,
    toggleTheme,
    theme // Include theme colors in the context
  }), [isDarkMode, theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
