'use strict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir : './uploads/user' });

api.get('/test', mdAuth.ensureAuth, userController.test);
api.post('/register', userController.register);
api.post('/login', userController.login);
api.put('/update/:id', mdAuth.ensureAuth, userController.update);
api.post('/upload/profile-image/:id', [mdAuth.ensureAuth, md_upload], userController.uploadImage);
api.get('/get-profile-image/:imageFile', userController.getProfileImage);
api.get('/keepers', userController.getKeepers);

module.exports = api;