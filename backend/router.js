const express = require('express').Router() ;

// Controller Imports
const userHandler = require( './handler/userHandler');

express.get('/',(req,res)=>{
    var val = {
        b: req.query
    }
    
    res.send(JSON.stringify(val))
})

// User Routes
express.post('/register', userHandler.signUp)
express.post('/login', userHandler.signIn)
express.post('/verify', userHandler.confirm) 

module.exports = express;