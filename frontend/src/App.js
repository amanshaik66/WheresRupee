//WheresRupeeProject\frontend\src\App.js
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext'; // Ensure this path matches your actual project structure
import Header from './layouts/Header/Header'
import Footer from './layouts/Footer/Footer';
import AppRoutes from './routes/AppRoutes'; // Ensure this component is properly set up to handle routing
import './styles/main.css';
import './styles/global.css';

// Lazy loading pages using updated paths
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const TrackingPage = React.lazy(() => import('./pages/TrackingPage/TrackingPage'));

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  // Apply theme class to body based on mode
  React.useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

   return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header with Dark/Light Mode Toggle */}
      <Header onToggle={toggleTheme} />

      {/* Main Content with Routing */}
      <main>
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;