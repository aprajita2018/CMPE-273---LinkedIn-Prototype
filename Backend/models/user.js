var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const saltRounds = 12;
const config = require('../settings');

// ObjectId = Schema.ObjectId;
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
    user_type: {
        type: String
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
module.exports = {users};

//define create user
module.exports.createUser = function(newUser, callback){
    console.log("Inside model: user.js");
    bcrypt.hash(newUser.password, saltRounds, function(err,hash){
        //Store Hash in your password DB
        if(err){
            console.log("ERROR: Failed to hash the password");
        }
        else{
            console.log("Inside Bcrypt function");
            newUser.password = hash;
            //newUser.save(callback);
            users.create(newUser,callback);
        }
    });
};

//define compare password
module.exports.comparePassword = function(requestPassword, hash, callback){
    bcrypt.compare(requestPassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    });
};

//define getUserbyEmail
module.exports.getUserByEmail = function(email, callback){
    const query = {email : email};
    console.log(query);
    users.findOne(query, callback);
};

