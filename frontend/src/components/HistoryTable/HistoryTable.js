// WR/frontend/src/components/HistoryTable/HistoryTable.js
import React, { useEffect, useState } from 'react';
import './HistoryTable.css';

const opencageApiKey = process.env.REACT_APP_OPENCAGE_API_KEY;
const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


const getCityName = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${opencageApiKey}`
    );
    const data = await res.json();
    return (
      data?.results?.[0]?.components?.city ||
      data?.results?.[0]?.components?.town ||
      data?.results?.[0]?.components?.village ||
      'Unknown'
    );
  } catch {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      return (
        data?.address?.city ||
        data?.address?.town ||
        data?.address?.village ||
        data?.address?.county ||
        'Unknown'
      );
    } catch {
      return 'Unknown';
    }
  }
};

const HistoryTable = ({ data }) => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const enrichData = async () => {
      const enriched = await Promise.all(
        data.map(async (entry) => {
          const city = await getCityName(entry.latitude, entry.longitude);
          return { ...entry, city };
        })
      );
      setCityData(enriched.reverse()); // ASC order: oldest to latest
    };

    enrichData();
  }, [data]);

  if (!cityData.length) {
    return <p>Loading tracking data...</p>;
  }

  return (
    <table className="history-table">
      <thead>
        <tr>
          <th>#</th>
          <th>City</th>
          <th>Accuracy (m)</th>
          <th>Timestamp</th>
          <th>Map</th>
        </tr>
      </thead>
      <tbody>
        {cityData.map((entry, index) => {
          const acc = Number(entry.accuracy);
          const mapUrl = `https://www.google.com/maps?q=${entry.latitude},${entry.longitude}`;
          const thumbnailUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+ff0000(${entry.longitude},${entry.latitude})/${entry.longitude},${entry.latitude},14/200x120?access_token=${mapboxToken}`;

          return (
            <tr key={entry.id || index}>
              <td>{index + 1}</td>
              <td>{entry.city}</td>
              <td>{!isNaN(acc) ? acc : '—'}</td>
              <td>{entry.timestamp ? new Date(entry.timestamp).toLocaleString() : '—'}</td>
              <td>
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={thumbnailUrl}
                    alt="Map preview"
                    className="map-thumbnail"
                  />
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default HistoryTable;