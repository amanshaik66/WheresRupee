//WR\frontend\src\pages\TrackingPage\TrackingPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HistoryTable from '../../components/HistoryTable/HistoryTable';
import './TrackingPage.css';

const TrackingPage = () => {
  const location = useLocation();
  const { serialNumber, trackingData: passedData } = location.state || {};
  const [trackingData] = useState(passedData || []);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!passedData && serialNumber) {
      // In a real fallback, you'd likely fetch via a GET API using serialNumber
      setError('No tracking data passed.');
    }
  }, [serialNumber, passedData]);

  if (!serialNumber) return <p className="tracking-page-msg">No serial number provided.</p>;

  return (
    <div className="tracking-page">
      <h2 className="tracking-heading">Tracking History for: {serialNumber}</h2>
      {error && <p className="tracking-error">{error}</p>}
      {trackingData.length > 0 ? (
        <HistoryTable data={trackingData} />
      ) : (
        <p className="tracking-empty">No tracking records found.</p>
      )}
    </div>
  );
};

export default TrackingPage;
