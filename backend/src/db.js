// src/db.js
const { Pool } = require('pg');

// Use environment variables for security
const pool = new Pool({
  user: process.env.DB_USER,       // e.g. 'postgres'
  host: process.env.DB_HOST,       // e.g. 'localhost'
  database: process.env.DB_NAME,   // e.g. 'scalable_api'
  password: process.env.DB_PASS,   // your password
  port: process.env.DB_PORT || 9656,
});

module.exports = pool;