const pool = require('../config/db')

const getAll = async () =>{
        const result = await pool.query(`select * from patients`);
        return result.rows;
}
 const create = async (name,date_of_birth) =>{
    const result = await pool.query(`insert into patients (name,date_of_birth) values ($1,$2) returning *`,[name,date_of_birth])
    return result.rows[0]
 }

 module.exports = {getAll,create}