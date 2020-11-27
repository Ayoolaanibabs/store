require('dotenv').config()
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signup = (req, res, next)=> {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if (err){
            res.json({
                error: err
            })
        }
        let user = new User ({
            fullName: req.body.fullName,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            address: req.body.address,
            gender: req.body.gender,
            password: hashedPass
        })
        user.save()
        .then(user => {
            let token = jwt.sign({fullName: user.fullName}, process.env.ACCESS_TOKEN_SECRET , {expiresIn:'1h'})
            res.send({
                fullName: user.fullName,
                email: user.email,
                mobileNumber: user.mobileNumber,
                address: user.address,
                gender: user.gender,
                message: `User created Succesfully`,
                token
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured'
            })
        })
    })
}

const login = (req,res,next) =>{
    let email =req.body.email
    let password =  req.body.password
    

    User.findOne({email:email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({fullName: user.fullName}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1h'})
                    res.json({
                        fullName: user.fullName,
                        email: user.email,
                        mobileNumber: user.mobileNumber,
                        address: user.address,
                        gender: user.gender,
                        token
                    })
                }else{
                    res.json({
                        message: 'Password does not match!'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found'
            })
        }
    })
}

module.exports = {
    signup,login 
}