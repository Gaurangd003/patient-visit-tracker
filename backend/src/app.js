const express = require('express');
const cors =require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json())

app.use('/clinicians',require('./routes/clinicians'))
app.use('/patients',require('./routes/patients'))
app.use('/visits',require('./routes/visits'))
module.exports = app;