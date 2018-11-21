'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./settings');
var {mongoose} = require('./mongoose');
var {Profiles} = require('./models/profile');
var config = require('./settings');
// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
    console.log("jwt_payload", jwt_payload);
    Profiles.findOne({
        username:jwt_payload.username,
    }, function(err,user){
        if (err) {
            console.log("error", err);
            return callback(err, false) 
        } else if(user){
            user.password = null;
            console.log("user", user);
            return callback(null,user);

        }    
    })
   

    }));
};