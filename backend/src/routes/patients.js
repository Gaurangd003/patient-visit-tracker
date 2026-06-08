const express = require('express');

const patients = express.Router()

patients.get('/',(err,req,res) =>{
    console.log("got patinetss called")
})

module.exports = patients