//WR\backend\config\db.js
const mysql = require('mysql2');
require('dotenv').config(); // ✅ This loads .env variables

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'WheresG2024',
  database: process.env.DB_NAME || 'currency_tracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
