"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputReducer = inputReducer;
exports.initialState = void 0;

var _constants = require("../utils/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  value: '',
  state: _constants.INPUT_STATES.EMPTY,
  errorMessage: ''
};
exports.initialState = initialState;

function inputReducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      var value = action.payload.value; // Validate input

      if (!value) {
        return _objectSpread({}, state, {
          value: value,
          state: _constants.INPUT_STATES.EMPTY,
          errorMessage: _constants.ERROR_MESSAGES.EMPTY
        });
      } else if (value.match(/^[0-9][A-Z]{0,2}[0-9]{0,6}$/)) {
        return _objectSpread({}, state, {
          value: value,
          state: _constants.INPUT_STATES.PARTIAL,
          errorMessage: ''
        });
      } else if (value.match(/^[0-9][A-Z]{2}[0-9]{6}$/)) {
        return _objectSpread({}, state, {
          value: value,
          state: _constants.INPUT_STATES.VALID,
          errorMessage: ''
        });
      } else {
        return _objectSpread({}, state, {
          value: value,
          state: _constants.INPUT_STATES.INVALID,
          errorMessage: _constants.ERROR_MESSAGES.INVALID
        });
      }

    default:
      return state;
  }
}