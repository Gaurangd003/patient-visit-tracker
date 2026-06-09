const visitsModel = require('../models/visit.model')

const getVisits = async (req,res)=>{
    try{
    const result = await visitsModel.getAll();
    res.json(result);
}
catch(err){
    res.status(500).json({error: "errro getting visits"})
}

}

const createVisit = async (req,res) =>{
    try{
        const {clinician_id,patient_id,visited_at,notes} = req.body;
        if(!clinician_id|| !patient_id || !visited_at || !notes)
            return res.status(400).json({ error: "missing fields"})
        const result = await visitsModel.create(clinician_id,patient_id,visited_at,notes);
        res.json(result)
    }catch(err){
        res.status(500).json({error: "erro crating visit"})
    }

}

module.exports = { getVisits,createVisit}