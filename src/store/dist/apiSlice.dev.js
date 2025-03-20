"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.validateSerial = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _constants = require("../utils/constants");

// src/store/apiSlice.js
var validateSerial = (0, _toolkit.createAsyncThunk)('input/validateSerial', function _callee(serial, _ref) {
  var rejectWithValue, response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rejectWithValue = _ref.rejectWithValue;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("".concat(_constants.API.VALIDATE), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              serial: serial
            })
          }));

        case 4:
          response = _context.sent;

          if (response.ok) {
            _context.next = 7;
            break;
          }

          throw new Error('Validation failed');

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", rejectWithValue(_context.t0.message));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
});
exports.validateSerial = validateSerial;
var apiSlice = (0, _toolkit.createSlice)({
  name: 'api',
  initialState: {
    loading: false,
    result: null,
    error: null
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(validateSerial.pending, function (state) {
      state.loading = true;
      state.error = null;
    }).addCase(validateSerial.fulfilled, function (state, action) {
      state.loading = false;
      state.result = action.payload;
    }).addCase(validateSerial.rejected, function (state, action) {
      state.loading = false;
      state.error = action.payload;
    });
  }
});
var _default = apiSlice.reducer;
exports["default"] = _default;