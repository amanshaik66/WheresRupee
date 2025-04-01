import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
