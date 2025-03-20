// src/components/Map/MapPlaceholder.js
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import '../Map/MapPlaceholder.css';

// Set your Mapbox access token here
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYW1hbnNoYWlrODA1IiwiYSI6ImNtM2RpY29seDAwdGQybHE3ZzRhaGFsajkifQ.4kaZkuPNEqEl2rvTV2KCyw';

function MapPlaceholder({ isDarkMode, markers }) {
  const mapContainer = useRef(null); // This will reference the DOM element for the map
  const map = useRef(null); // This will hold the map object

  // Initialize the map only once
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    // Initialize the Mapbox map
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // The DOM element where the map will render
      style: isDarkMode ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/streets-v11', // Dark or light mode
      center: [0, 0], // Set a default center (this will update based on markers later)
      zoom: 2, // Set zoom level
    });

    // Add navigation controls (zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl());

    // Add markers from the provided markers prop
    markers.forEach((markerData) => {
      new mapboxgl.Marker()
        .setLngLat([markerData.coordinates[1], markerData.coordinates[0]]) // Coordinates are [longitude, latitude]
        .setPopup(new mapboxgl.Popup().setText(markerData.popupText)) // Popup with text from markerData
        .addTo(map.current);
    });

    // Fit map bounds to include all markers
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach((markerData) => {
      bounds.extend([markerData.coordinates[1], markerData.coordinates[0]]);
    });
    map.current.fitBounds(bounds, { padding: 20 }); // Adds padding around the bounds

  }, [markers, isDarkMode]); // Effect depends on the markers and dark mode status

  return <div ref={mapContainer} className="map-placeholder-container"></div>;
}

// Prop types to ensure that the component receives the correct data types
MapPlaceholder.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      popupText: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MapPlaceholder;
