const pool = require('../config/db');

const getAll = async () => {
    const result = await pool.query(`
        SELECT 
            v.id,
            c.name AS clinician_name,
            p.name AS patient_name,
            v.visited_at,
            v.notes
        FROM visits v
        JOIN clinicians c ON v.clinician_id = c.id
        JOIN patients   p ON v.patient_id   = p.id
        ORDER BY v.visited_at DESC
    `);
    return result.rows;
}

const create = async (clinician_id,patient_id,visited_at,notes) =>{
    const result  = await pool.query(`insert into visits (clinician_id,patient_id,visited_at,notes) values ($1,$2,$3,$4) returning *`,[clinician_id,patient_id,visited_at,notes])
    return result.rows[0]
}

module.exports = {getAll,create}