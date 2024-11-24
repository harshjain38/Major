const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const companySchema = new mongoose.Schema({
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
    phoneNumber: {
        type: Number,
        required: true
    },
    website:{
        type: String
    },
    category: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    address:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    description:{
        type: Text,
        required: true
    }
});

companySchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password=await bcrypt.hash(this.password,12);
    next();
});
  
companySchema.methods.correctPassword = async function(candidatePassword,companyPassword){
    return await bcrypt.compare(candidatePassword,companyPassword);
};

const Company = new mongoose.model("Company", companySchema);
module.exports = Company;