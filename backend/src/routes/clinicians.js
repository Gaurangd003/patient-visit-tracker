const express = require('express');
const {getClinicians,createClinician} = require('../controllers/clinicians.controller')

const clinicians = express.Router()

clinicians.get('/',getClinicians)
clinicians.post('/',createClinician)


module.exports = clinicians