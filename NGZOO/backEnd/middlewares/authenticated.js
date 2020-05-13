'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var keySecret = 'key_secret_ngzoo';

exports.ensureAuth = function(req, res, next){
    var authorization = req.headers.authorization;
    if(!authorization){
        return res.status(403).send({message : 'Error! Request not contains Authorization header'});
    }

    var token = authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, keySecret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message : 'Token has expired'});
        }
    } catch (ex) {
        return res.status(404).send({message : 'Invalid token'});
    }

    req.user = payload;

    next();
};