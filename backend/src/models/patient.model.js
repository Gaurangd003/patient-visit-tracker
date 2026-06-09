const pool = require('../config/db')

const getAll = async () =>{
        const result = await pool.query(`select * from patients`);
        return result.rows;
}
 const create = async (name,dob) =>{
    const result = await pool.query(`insert into patiens (name,date_of_birth) values ($1,$2) returning *`,[name,dob])
    return result.rows[0]
 }

 module.exports = {getAll,create}