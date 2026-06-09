const pool = require('../config/db');

const getAll = async () =>{
    const result = await pool.query(`select * from visits order by visited_at desc`)
    return result.rows;
}

const create = async (clinician_id,patient_id,visited_at,notes) =>{
    const result  = pool.query(`insert into visits (clinician_id,patient_id,visited_at,notes) values ($1,$2,$3,$4) returning *`,[clinician_id,patient_id,visited_at,notes])
    return result.row[0]
}

module.exports = {getAll,create}