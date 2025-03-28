// src/context/SerialNumberContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Initial state for serial number and related data
const initialState = {
  serialNumber: '',
  locationHistory: [],
  markers: [],
  status: 'Idle',
};

// Reducer function to manage state updates
const serialNumberReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SERIAL_NUMBER':
      return { ...state, serialNumber: action.payload };
    case 'SET_LOCATION_HISTORY':
      return { ...state, locationHistory: action.payload };
    case 'SET_MARKERS':
      return { ...state, markers: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'RESET':
      return initialState; // Reset state to initial values
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create the context
const SerialNumberContext = createContext();

// Provider component to wrap the app
export const SerialNumberProvider = ({ children }) => {
  const [state, dispatch] = useReducer(serialNumberReducer, initialState);

  return (
    <SerialNumberContext.Provider value={{ state, dispatch }}>
      {children}
    </SerialNumberContext.Provider>
  );
};

// Custom hook to access state and dispatch
export const useSerialNumber = () => {
  const context = useContext(SerialNumberContext);
  if (!context) {
    throw new Error('useSerialNumber must be used within a SerialNumberProvider');
  }
  return context;
};

// Custom hook to abstract dispatch actions
export const useSerialNumberActions = () => {
  const { dispatch } = useSerialNumber();

  return {
    setSerialNumber: (serialNumber) =>
      dispatch({ type: 'SET_SERIAL_NUMBER', payload: serialNumber }),
    setLocationHistory: (history) =>
      dispatch({ type: 'SET_LOCATION_HISTORY', payload: history }),
    setMarkers: (markers) =>
      dispatch({ type: 'SET_MARKERS', payload: markers }),
    setStatus: (status) =>
      dispatch({ type: 'SET_STATUS', payload: status }),
    reset: () => dispatch({ type: 'RESET' }),
  };
};
