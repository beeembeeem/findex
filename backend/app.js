const express = require('express');
const router = require( './router');
const app = express();

app.get('/', function(req,res){
    console.log('main')
    console.log(req.signedCookies)

    res.send('Main');

});

app.use('/api', router);

module.exports = app;
