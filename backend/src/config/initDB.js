const pool = require('./db');
const fs = require('fs');
const path = require('path');

const initDb = async () => {
  try {
    console.log(process.env.DATABASE_URL)
    const schema = fs.readFileSync(
      path.join(__dirname, 'schema.sql'), 
      'utf8'
    );
    await pool.query(schema);
    console.log('Database initialized');
  } catch (err) {
    console.error('Database initialization failed:', err.message);
  }
};

module.exports = initDb;