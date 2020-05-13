'use strict'

//Modules
var fs = require('fs');
var path = require('path');

//Models
var Animal = require('../models/animal');

//Test
function test(req, res){
    res.status(200).send({
        message : 'Testing Animal controller',
        user : req.user
    });
}

//Register
function register(req, res){
    var animal = new Animal();
    var data = req.body;

    //Set data
    if(data.name){
        animal.name = data.name;
        animal.description = data.description;
        animal.year = data.year;
        animal.image = null;
        animal.user = req.user.sub;

        animal.save((err, animalSaved) => {
            if(err){
                res.status(500).send({message : 'Error on Server'});
            }else{
                if(!animalSaved){                    
                    res.status(404).send({message : 'Animal not registered'});
                }else{
                    res.status(200).send({animal : animalSaved});
                }
            }
        });
    }else{
        res.status(200).send({message : 'Name is required'});
    }
}

//List all
function listAll(req, res){
    Animal.find({}).populate({path : 'user'}).exec((err, animals) => {
        if(err){
            res.status(500).send({message : 'Error finding animals'});
        }else{
            if(!animals){
                res.status(404).send({message : 'Not animals found'});
            }else{
                res.status(200).send({animals});
            }
        }
    });
}

//List byId 
function listById(req, res){
    var _id = req.params.id;

    Animal.findById({_id}).populate({path : 'user'}).exec((err, animal) => {
        if(err){
            res.status(500).send({message : 'Error finding animal'});
        }else{
            if(!animal){
                res.status(404).send({message : 'No animal found'});
            }else{
                res.status(200).send({animal});
            }
        }
    });
}

//Update
function update(req, res){
    var id = req.params.id;
    var update = req.body;

    Animal.findByIdAndUpdate(id, update, {new : true}, (err, animalUpdated) => {
        if(err){
            res.status(500).send({message : 'Error on Server'});
        }else{
            if(!animalUpdated){
                res.status(404).send({message : 'No animal updated'});
            }else{
                res.status(200).send({animal : animalUpdated});
            }
        }
    });
}

//Upload image file
function uploadImage(req, res){
    var animalId = req.params.id;

    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[2];
        var extentionSplit = fileName.split('\.');
        var fileExtention = extentionSplit[1];

        if(fileExtention == 'png' || fileExtention == 'jpg' || fileExtention == 'jpeg' || fileExtention == 'gif'){
            Animal.findByIdAndUpdate(animalId, {image : fileName}, {new : true}, (err, animalUpdated) => {
                if(err){
                    return res.status(500).send({message : 'Error updating animal'});
                }else{
                    if(!animalUpdated){
                        return res.status(404).send({message : 'Animal not updated'});
                    }else{
                        return res.status(200).send({user: animalUpdated, image : fileName});
                    }
                }
            });
        }else{
            fs.unlink(filePath, (err) => {
                if(err){
                    res.status(200).send({message : 'Error! Image not deleted'});
                }else{
                    res.status(200).send({message : 'Error! Image extention invalid'});
                }
            });
        }
    }else{
        res.status(200).send({message : 'You need select an Image'});
    }    
}

//Get Image file
function getImage(req, res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/animal/' + imageFile;

    fs.exists(pathFile, (exist) => {
        if(exist){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(404).send({message : 'Image not exists'});
        }
    });
}

//Delete
function removeById(req, res){
    var _id = req.params.id;

    Animal.findByIdAndRemove(_id, (err, animalRemoved) => {
        if(err){
            res.status(500).send({message : 'Error on request'});
        }else{
            if(!animalRemoved){
                res.status(404).send({message : 'No animal deleted'});
            }else{
                res.status(200).send({animal : animalRemoved});
            }
        }
    });
}

module.exports = {
    test,
    register,
    listAll,
    listById,
    update,
    uploadImage,
    getImage,
    removeById
};