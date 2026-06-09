require('dotenv').config();
const express = require('express');
const cors =require('cors');
const initDb = require('./config/initDB')

const app = express();
app.use(cors());
app.use(express.json())

initDb();

app.use('/clinicians',require('./routes/clinicians'))
app.use('/patients',require('./routes/patients'))
app.use('/visits',require('./routes/visits'))
module.exports = app;