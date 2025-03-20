// src/store/inputSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { INPUT_STATES, ERROR_MESSAGES } from '../utils/constants';

const initialState = {
  value: '',
  state: INPUT_STATES.EMPTY,
  errorMessage: '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInput(state, action) {
      const { value } = action.payload;

      // Validate input
      if (!value) {
        state.value = value;
        state.state = INPUT_STATES.EMPTY;
        state.errorMessage = ERROR_MESSAGES.EMPTY;
      } else if (value.match(/^[0-9][A-Z]{0,2}[0-9]{0,6}$/)) {
        state.value = value;
        state.state = INPUT_STATES.PARTIAL;
        state.errorMessage = '';
      } else if (value.match(/^[0-9][A-Z]{2}[0-9]{6}$/)) {
        state.value = value;
        state.state = INPUT_STATES.VALID;
        state.errorMessage = '';
      } else {
        state.value = value;
        state.state = INPUT_STATES.INVALID;
        state.errorMessage = ERROR_MESSAGES.INVALID;
      }
    },
    resetInput(state) {
      state.value = '';
      state.state = INPUT_STATES.EMPTY;
      state.errorMessage = '';
    },
  },
});

export const { setInput, resetInput } = inputSlice.actions;
export default inputSlice.reducer;
