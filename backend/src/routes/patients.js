const express = require('express');
const { getPatients , createPatient} = require('../controllers/patients.controller')

const patients = express.Router()

patients.get('/', getPatients);
patients.post('/',createPatient);

module.exports = patients