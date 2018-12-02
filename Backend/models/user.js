var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var users = mongoose.model('users',{
	
    firstName :{
        type : String
    },
    lastName :{
        type : String
    },
    email : {
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
    profile_summary : {
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
    address : {
        type : String
    },
    city   : {
        type : String
    },
    userstate : {
        type : String
    },
    zipcode : {
        type : String
    },
    industry : {
        type : String
    },
    contact : {
        type : String
    },
    /*skills : [
        {
            skill: { type : String}
        }],*/
          skills : {type : Array}
});

module.exports = {users};