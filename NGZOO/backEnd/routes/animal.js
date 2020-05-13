'use strict'

var express = require('express');
var animalController = require('../controllers/animal');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');
var mdAdmin = require('../middlewares/is_admin');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir : './uploads/animal' });

api.get('/test', mdAuth.ensureAuth, animalController.test);
api.post('/register', [mdAuth.ensureAuth, mdAdmin.isAdmin], animalController.register);
api.get('/list/all', animalController.listAll);
api.get('/list/byId/:id', animalController.listById);
api.put('/update/:id', mdAuth.ensureAuth, animalController.update);
api.post('/upload/image/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin, md_upload], animalController.uploadImage);
api.get('/get-image/:imageFile', animalController.getImage);
api.delete('/delete/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], animalController.removeById);

module.exports = api;