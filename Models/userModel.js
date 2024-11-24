const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    address:{
        type: String
    },
    city: {
        type: String
    }
});

userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password=await bcrypt.hash(this.password,12);
    next();
});
  
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;