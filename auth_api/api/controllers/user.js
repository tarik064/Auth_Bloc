const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

//Create new user or Sign up
exports.signupUpNewUser = (req, res, next) =>{
    User.find({email: req.body.email})
    .exac()
    .then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
                message: 'Email exists'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Schema.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hash
                    });

                    user.save()
                        .then(result =>{
                            console.log(result);
                            res.status(201).json({
                                message: 'User created successfully..'
                            });
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }
            });
        }
    });
    
}