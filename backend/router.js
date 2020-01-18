const express = require('express').Router() ;

// Controller Imports
const userHandler = require( './handler/userHandler');



// User Routes
express.post('/register', userHandler.signUp)
express.post('/login', userHandler.signIn)
express.post('/verify', userHandler.confirm) 

module.exports = express;