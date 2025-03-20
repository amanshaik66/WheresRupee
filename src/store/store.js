// filepath: c:\Movies\Work\WheresRupee\WheresRupeeProject\frontend\src\store\store.js
import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './inputSlice';
import apiReducer from './apiSlice'; // Add this import

export const store = configureStore({
  reducer: {
    input: inputReducer,
    api: apiReducer, // Add this reducer
  },
});