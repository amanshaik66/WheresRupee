// WR\backend\controllers\trackController.js
const db = require('../config/db');

exports.trackNote = async (req, res) => {
  const { serialNumber, latitude, longitude, accuracy } = req.body;

  if (
    !serialNumber || typeof serialNumber !== 'string' ||
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    typeof accuracy !== 'number'
  ) {
    return res.status(400).send({ message: 'Invalid input data' });
  }

  try {
    // ✅ 1. Check if note exists
    let [notes] = await db.query(
      'SELECT id FROM notes WHERE serialNumber = ?',
      [serialNumber]
    );

    let noteId;

    if (notes.length === 0) {
      // ✅ 1a. Insert new note
      const [result] = await db.query(
        'INSERT INTO notes (serialNumber) VALUES (?)',
        [serialNumber]
      );
      noteId = result.insertId;
    } else {
      noteId = notes[0].id;
    }

    // ✅ [ADDED] 2. Check if this location was already logged in the last 5 minutes
    const [recent] = await db.query(
      `SELECT id FROM locations
       WHERE noteId = ? AND latitude = ? AND longitude = ? AND accuracy = ?
       AND timestamp > NOW() - INTERVAL 5 MINUTE`,
      [noteId, latitude, longitude, accuracy]
    );

    if (recent.length > 0) {
      return res.status(409).send({
        message: 'Duplicate location already logged within the last 5 minutes.',
        skipped: true,
        data: []
      });
    }

    // ✅ 3. Insert location for the note
    await db.query(
      'INSERT IGNORE INTO locations (noteId, latitude, longitude, accuracy) VALUES (?, ?, ?, ?)',
      [noteId, latitude, longitude, accuracy]
    );

    // ✅ 4. Fetch all tracking history for the note
    const [history] = await db.query(
      `SELECT l.id, n.serialNumber, l.latitude, l.longitude, l.accuracy, l.timestamp
       FROM locations l
       JOIN notes n ON l.noteId = n.id
       WHERE l.noteId = ?
       ORDER BY l.timestamp DESC`,
      [noteId]
    );

    res.status(201).send({
      message: 'Tracking data recorded successfully.',
      data: history
    });


} catch (error) {
  console.error('Database error:', error);

  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).send({
      message: 'This exact tracking data was already submitted.',
      errorCode: 'DUPLICATE_TRACKING'
    });
  }

  res.status(500).send({
    message: 'Unexpected server error.',
    errorCode: 'SERVER_ERROR',
    error: error.message
  });
}

};
