const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique: true,
        lowercase: true
    },
    mobileNumber: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    gender: {
        type:String,
        required: false
    },
    password:{
        type:String,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = User
