var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');
// const saltRounds = 12;
ObjectId = Schema.ObjectId;

var db = mongoose.connection;

const config = require('../config/config');

//create a schema
var userschema = new Schema({
    firstName :{
        type : String
    },
    lastName :{
        type : String
    },
    username : {
	   type : String
    },
    password : {
        type : String
    },
    headline : {
        type : String
    },
    current_position :{
        type : String
    },
    experience : [
    {
        title: { type : String},
        company: { type : String},
        fromMonth : {type : String},
        toMonth : {type : String},
        fromYear : {type : Number},
        toYear : {type : Number},
        location : {type : String}
    }],
    education : [
        {
            school: { type : String},
            degree: { type : String},
            field : {type : String},
            fromYear : {type : Number},
            toYear : {type : Number}
        }],
    
    location : {
        type : String
    },
    industry : {
        type : String
    },
    contact : {
        type : String
    }
});

//create a model 
var Users = mongoose.model('Users',userschema);

//export the model
module.exports = Users;