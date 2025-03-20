import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Initialize state from localStorage to keep user's preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('isDarkMode')) || false;
  });

  // Effect to store theme preference in localStorage
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Toggle theme mode
  const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

  // Memoizing the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
