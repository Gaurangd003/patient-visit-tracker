const express = require('express');
const { getVisits, createVisit} = require('../controllers/visits.controller')

const visits = express.Router()

visits.get('/',getVisits);
visits.post('/',createVisit);

module.exports = visits