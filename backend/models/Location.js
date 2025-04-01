import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  accuracy: {
    type: Number,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: false // We already have our own timestamp field
});

const Location = mongoose.model('Location', locationSchema);
export default Location;