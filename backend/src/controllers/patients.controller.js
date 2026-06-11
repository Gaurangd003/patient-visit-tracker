const patientsModel = require('../models/patient.model')

const getPatients = async (req,res) =>{
    try{
        const result =  await patientsModel.getAll();
        res.json(result);
    }
    catch(err){
        res.status(500).json({error: "Failed ot get paptients"})
    }
}

const createPatient = async (req,res) =>{
    try{
        const { name,date_of_birth} = req.body;
        if(!name || !date_of_birth) 
            return res.status(400).json({error:"no name/date ofirth in body"})
        const result = await patientsModel.create(name,date_of_birth);
        res.json(result);
    }catch(err){
        res.status(500).json({error: " some internaero cocciurred"})
    }
}

module.exports = { getPatients,createPatient}