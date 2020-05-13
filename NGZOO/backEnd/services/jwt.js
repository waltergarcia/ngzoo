'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var keySecret = 'key_secret_ngzoo';

exports.createToken = function(user){
    var payload = {
        sub : user._id,
        name : user.name,
        lastName : user.lastName,
        email : user.email,
        role : user.role,
        image : user.image,
        iat : moment().unix(),
        exp : moment().add(30, 'days').unix
    };

    return jwt.encode(payload, keySecret);
};