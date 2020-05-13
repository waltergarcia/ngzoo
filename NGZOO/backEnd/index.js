'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.connect('mongodb://localhost:27017/ngzoo', { 
                useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
                .then(() => {
                    console.log('Connection NGZOO success');
                    app.listen(port, () => {
                        console.log('Server is running');
                    });
                })
                .catch(error => handleError(error));