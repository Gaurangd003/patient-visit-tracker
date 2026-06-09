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
        const { name,dob} = req.body;
        if(!name || !dob) 
            return res.status(400).json({error:"no name/date ofirth in body"})
        const result = await patientsModel.create(name,dob);
        res.json(result);
    }catch(err){
        res.status(500).json({error: " some internaero cocciurred"})
    }
}

module.exports = { getPatients,createPatient}