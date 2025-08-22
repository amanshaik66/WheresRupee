// src/routes/AppRoutes.js
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage'; // Lazy-loaded
import TrackingPage from '../pages/TrackingPage/TrackingPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import '../routes/AppRoutes.css'; // Optional route-specific styles

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="loading-container">
          <div className="spinner" />
          <p>Loading content, please wait...</p>
        </div>
      }
    >
      <Routes>
  {/* Home page route */}
  <Route path="/" element={<HomePage />} />

  {/* Tracking page route */}
  <Route path="/track" element={<TrackingPage />} />

  {/* Dashboard page route */}
  <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </Suspense>
  );
};

export default AppRoutes;

    // <Routes> 
    //    <Route path="/" element={<HomePage />} />
    //    <Route path="/track" element={<TrackingPage />} />
    //    <Route path="*" element={<Navigate to="/" />} />
    //  </Routes> */