'use strict'

//Modules
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

//Models
var User = require('../models/user');

//Services
var jwt = require('../services/jwt');

//Test
function test(req, res){
    res.status(200).send({
        message : 'Testing User controller',
        user : req.user
    });
}

//Register
function register(req, res){
    //Create instance of User Model
    var user = new User();

    //Retrieve request
    var request = req.body;

    //Check correct params
    if(request.name && request.lastName && request.email && request.password){
        user.name = request.name;
        user.lastName = request.lastName;
        user.email = request.email;
        user.role = 'ROLE_USER';
        user.image = null;

        User.findOne({email : user.email.toLowerCase()}, (err, userFound) => {
            if(err){
                res.status(500).send({message : 'Error checking if user exists'});
            }else{
                if(!userFound){
                    //Encrypt password
                    bcrypt.hash(request.password, null, null, function(error, hash){
                        user.password = hash;

                        user.save((err, userSaved) => {
                            if(err){
                                res.status(500).send({message : 'Error on Server'});
                            }else{
                                if(!userSaved){
                                    res.status(404).send({message : 'User not registered'});
                                }else{
                                    res.status(200).send({user : userSaved});
                                }
                            }
                        });
                    });
                }else{
                    res.status(200).send({message : 'User already exists'});
                }
            }
        });
    }else{
        res.status(200).send({message : 'Data incomplete'});
    }
}

//Login
function login(req, res){
    //Retrieve request
    var request = req.body;
    var emailLogin = request.email;
    var passLogin = request.password;
    var getToken = request.token;

   User.findOne({email : emailLogin.toLowerCase()}, (err, userFound) => {
       if(err){
           res.status(500).send({message : 'Error checking user login'});
       }else{
           if(userFound){
               bcrypt.compare(passLogin, userFound.password, (err, check) => {
                    if(check){
                        if(getToken && getToken.toLowerCase() == 'true'){
                            res.status(200).send({token : jwt.createToken(userFound)});
                        }else{
                            res.status(200).send({userFound});
                        }
                    }else{
                        res.status(200).send({message : 'Email/password invalid, try again!'});
                    }
               });
           }else{
               res.status(404).send({message : 'User not found'});
           }
       }
   });
}

//Update
function update(req, res){
    var id = req.params.id;
    var update = req.body;

    delete update.password;
    
    if(id != req.user.sub){
        return res.status(500).send({message : 'Unathorized to update user'});
    }

    User.findByIdAndUpdate(id, update, {new : true}, (err, userUpdated) => {
        if(err){
            return res.status(500).send({message : 'Error updating user'});
        }else{
            if(!userUpdated){
                return res.status(404).send({message : 'User not updated'});
            }else{
                return res.status(200).send({user: userUpdated});
            }
        }
    });
}

//Upload profile image
function uploadImage(req, res){
    var userId = req.params.id;

    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[2];
        var extentionSplit = fileName.split('\.');
        var fileExtention = extentionSplit[1];

        if(fileExtention == 'png' || fileExtention == 'jpg' || fileExtention == 'jpeg' || fileExtention == 'gif'){
            if(userId != req.user.sub){
                return res.status(500).send({message : 'Unathorized to update user'});
            }
        
            User.findByIdAndUpdate(userId, {image : fileName}, {new : true}, (err, userUpdated) => {
                if(err){
                    return res.status(500).send({message : 'Error updating user'});
                }else{
                    if(!userUpdated){
                        return res.status(404).send({message : 'User not updated'});
                    }else{
                        return res.status(200).send({user: userUpdated, image : fileName});
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
function getProfileImage(req, res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/user/' + imageFile;

    fs.exists(pathFile, (exist) => {
        if(exist){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(404).send({message : 'Image not exists'});
        }
    });
}

//Get Keepers
function getKeepers(req, res){
    User.find({role : 'ROLE_ADMIN'}).exec((err, users) => {
        if(err){
            res.status(500).send({message : 'Error finding users'});
        }else{
            if(!users){
                res.status(404).send({message : 'Users not found'});
            }else{
                res.status(200).send({users});
            }
        }
    });
    
}

module.exports = {
    test,
    register,
    login,
    update,
    uploadImage,
    getProfileImage,
    getKeepers
};