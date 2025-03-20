"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _inputSlice = _interopRequireDefault(require("./inputSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// src/store/store.js
var store = (0, _toolkit.configureStore)({
  reducer: {
    input: _inputSlice["default"]
  }
});
exports.store = store;