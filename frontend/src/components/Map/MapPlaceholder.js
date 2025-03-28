//WR\frontend\src\components\Map\MapPlaceholder.js
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../Map/MapPlaceholder.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapPlaceholder = ({ data }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const { latitude, longitude } = data[0];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 10,
    });

    map.addControl(new mapboxgl.NavigationControl());

    data.forEach((entry, index) => {
      new mapboxgl.Marker({ color: index === 0 ? 'red' : 'blue' })
        .setLngLat([entry.longitude, entry.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <strong>Entry ${data.length - index}</strong><br/>
            Lat: ${entry.latitude.toFixed(5)}<br/>
            Lng: ${entry.longitude.toFixed(5)}<br/>
            Accuracy: ±${entry.accuracy}m<br/>
            Time: ${new Date(entry.timestamp).toLocaleString()}
          `)
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [data]);

  return (
    <div className="map-placeholder-section">
      <div className="map-heading">
        <h3>🗺️ Most Recent Tracking Location</h3>
        <p className="map-subtext">
          {data[0]?.city ? data[0].city : `Lat: ${data[0].latitude}, Lng: ${data[0].longitude}`}
        </p>
      </div>
      <div ref={mapContainerRef} className="mapbox-container" />
    </div>
  );
};

export default MapPlaceholder;
