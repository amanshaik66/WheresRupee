"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resetInput = exports.setInput = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _constants = require("../utils/constants");

// src/store/inputSlice.js
var initialState = {
  value: '',
  state: _constants.INPUT_STATES.EMPTY,
  errorMessage: ''
};
var inputSlice = (0, _toolkit.createSlice)({
  name: 'input',
  initialState: initialState,
  reducers: {
    setInput: function setInput(state, action) {
      var value = action.payload.value; // Validate input

      if (!value) {
        state.value = value;
        state.state = _constants.INPUT_STATES.EMPTY;
        state.errorMessage = _constants.ERROR_MESSAGES.EMPTY;
      } else if (value.match(/^[0-9][A-Z]{0,2}[0-9]{0,6}$/)) {
        state.value = value;
        state.state = _constants.INPUT_STATES.PARTIAL;
        state.errorMessage = '';
      } else if (value.match(/^[0-9][A-Z]{2}[0-9]{6}$/)) {
        state.value = value;
        state.state = _constants.INPUT_STATES.VALID;
        state.errorMessage = '';
      } else {
        state.value = value;
        state.state = _constants.INPUT_STATES.INVALID;
        state.errorMessage = _constants.ERROR_MESSAGES.INVALID;
      }
    },
    resetInput: function resetInput(state) {
      state.value = '';
      state.state = _constants.INPUT_STATES.EMPTY;
      state.errorMessage = '';
    }
  }
});
var _inputSlice$actions = inputSlice.actions,
    setInput = _inputSlice$actions.setInput,
    resetInput = _inputSlice$actions.resetInput;
exports.resetInput = resetInput;
exports.setInput = setInput;
var _default = inputSlice.reducer;
exports["default"] = _default;