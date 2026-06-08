const express = require('express');

const visits = express.Router()

visits.get('/',(err,req,res) =>{
    console.log("got visits called")
})

module.exports = visits