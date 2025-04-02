// WR\backend\controllers\trackController.js
import Note from '../models/Note.js';
import Location from '../models/Location.js';

export const trackNote = async (req, res) => {
  const { serialNumber, latitude, longitude, accuracy } = req.body;
  
  // Log the incoming request body
  console.log('Incoming request body:', req.body);

  if (
    !serialNumber || typeof serialNumber !== 'string' ||
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    typeof accuracy !== 'number'
  ) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // ✅ 1. Check if note exists
    let note = await Note.findOne({ serialNumber });

    if (!note) {
      // ✅ 1a. Create new note
      note = await Note.create({ serialNumber });
    }

    // ✅ 2. Check for duplicate location in last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const recentDuplicate = await Location.findOne({
      note: note._id,
      latitude,
      longitude,
      accuracy,
      timestamp: { $gt: fiveMinutesAgo }
    });

    if (recentDuplicate) {
      return res.status(409).json({
        message: 'Duplicate location already logged within the last 5 minutes.',
        skipped: true,
        data: []
      });
    }

    // ✅ 3. Insert new location
    await Location.create({
      note: note._id,
      latitude,
      longitude,
      accuracy
    });

    // ✅ 4. Fetch all tracking history for the note
    const history = await Location.find({ note: note._id })
      .sort({ timestamp: -1 })
      .select('latitude longitude accuracy timestamp')
      .lean();

    const responseData = history.map(entry => ({
      serialNumber,
      ...entry
    }));

    return res.status(201).json({
      message: 'Tracking data recorded successfully.',
      data: responseData
    });
    console.log('Response sent to client:', {
      message: 'Tracking data recorded successfully.',
      data: responseData,
    });

  } catch (error) {
    console.error('MongoDB error:', error);

    return res.status(500).json({
      message: 'Unexpected server error.',
      errorCode: 'SERVER_ERROR',
      error: error.message
    });
  }
};