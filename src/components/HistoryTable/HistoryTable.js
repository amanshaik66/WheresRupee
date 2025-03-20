// src/components/HistoryTable/HistoryTable.js
import React from 'react';
import PropTypes from 'prop-types';
import MapPlaceholder from '../Map/MapPlaceholder';
import './HistoryTable.css';

function HistoryTable({ serialNumber, locationHistory, isDarkMode }) {
  return (
    <div className={`history-table-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h2 className="history-title">Tracking History for: {serialNumber}</h2>

      {locationHistory.length === 0 ? (
        <p className="no-history-message">
          No tracking history available yet. Start tracking this note to see its journey!
        </p>
      ) : (
        <table className={`history-table ${isDarkMode ? 'dark' : 'light'}`}>
          <thead>
            <tr>
              <th>Map</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {locationHistory.map((location, index) => (
              <tr key={index}>
                <td className="map-thumbnail">
                  <MapPlaceholder
                    isDarkMode={isDarkMode}
                    markers={[
                      {
                        coordinates: [location.longitude, location.latitude],
                        popupText: `Tracked on ${new Date(location.timestamp).toLocaleString()} (Accuracy: ${location.accuracy} meters)`,
                      },
                    ]}
                  />
                </td>
                <td className="location-details">
                  <p>
                    <strong>Location:</strong>{' '}
                    {location.city || 'Unknown City'}, {location.state || 'Unknown State'}
                  </p>
                  <p>
                    <strong>Coordinates:</strong>{' '}
                    {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
                  </p>
                  <p>
                    <strong>Tracked On:</strong>{' '}
                    {new Date(location.timestamp).toLocaleString()}
                  </p>
                  <p>
                    <strong>Accuracy:</strong> {location.accuracy} meters
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

HistoryTable.propTypes = {
  serialNumber: PropTypes.string.isRequired,
  locationHistory: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      accuracy: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
      city: PropTypes.string,
      state: PropTypes.string,
    })
  ).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default HistoryTable;
