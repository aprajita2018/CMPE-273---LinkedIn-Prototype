var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');
// const saltRounds = 12;

var db = mongoose.connection;

const config = require('../config/config');

//create a schema
var userschema = new Schema({
    firstName           :   {type:String, required: true },
    lastName            :   {type:String, required: true },
    email               :   {type:String, required: true, unique: true },
    password            :   {type:String, required: true },
    address             :   {type:String},
    city                :   {type:String},
    state               :   {type:String},
    zipcode             :   {type:String},
    profileSummary      :   {type:String},
    joined_date         :   {type:Date},
    photoURL            :   {type:String},
    skills              :   {type:String},
    resume              :   {type:String}
});

//create a model 
var Users = mongoose.model('Users',userschema);

//export the model
module.exports = Users;