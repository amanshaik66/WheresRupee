//WR\backend\app.js
const express = require('express');
const cors = require('cors'); // ✅ import CORS
const app = express();
const helmet = require('helmet');

app.use(helmet());


// ✅ enable CORS for all origins (for now)
app.use(cors());

app.use(express.json());

const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
