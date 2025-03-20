// src/store/apiSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../utils/constants';

export const validateSerial = createAsyncThunk('input/validateSerial', async (serial, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API.VALIDATE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial }),
    });
    if (!response.ok) throw new Error('Validation failed');
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const apiSlice = createSlice({
  name: 'api',
  initialState: { loading: false, result: null, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(validateSerial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateSerial.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(validateSerial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;
