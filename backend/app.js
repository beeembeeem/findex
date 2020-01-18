const express = require('express');
var cookieParser = require('cookie-parser')
const router = require( './router');
const APIKEY = 'En`rW)xG&nxA2RnxLUpX'
const app = express();
// Middleware
var cookieCatcher = function(req,res,next){
    res.cookie('username', 'john doe', { maxAge: 900000, httpOnly: true, signed: true, secret: '12345' });    console.log('Midlleware')
    next()
}
app.use(cookieParser(APIKEY))
app.get('/', function(req,res){
    console.log('main')
    console.log(req.signedCookies)

    res.send('Main');

});

app.use('/api', router);

module.exports = app;
