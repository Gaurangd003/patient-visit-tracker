const express = require('express');

const clinicians = express.Router()

clinicians.get('/',(err,req,res) =>{
    console.log("got clicians called")
})

module.exports = clinicians