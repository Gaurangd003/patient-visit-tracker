const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM clinicians');
  return result.rows; // return .rows not the whole result object
};

const create = async (name, specialty) => {
  const result = await pool.query(
    'INSERT INTO clinicians (name, specialty) VALUES ($1, $2) RETURNING *',
    [name, specialty]
  );
  return result.rows[0];
};

module.exports = { getAll, create };