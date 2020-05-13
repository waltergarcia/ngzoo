'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Load routes
var userRoutes = require('./routes/user');
var animalRoutes = require('./routes/animal');

//body-parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Set headers and cores
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
                'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//Base routes
app.use('/api/user', userRoutes);
app.use('/api/animal', animalRoutes);


//Export server
module.exports = app;