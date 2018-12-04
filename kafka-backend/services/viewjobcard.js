var crypt = require('../crypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../settings');
var {Jobs} = require('../models/jobs');
var { mongoose } = require('../db/mongoose');
var mysql = require('mysql');
// var {connect} = require('../pool');
const connect = require('../pool');

// mysql.connect(function(err){
//     if(err) throw err;
//     console.log("connected");
// })

var dbconnection = mysql.createConnection({
    host: 'projectli-instance.cz8fkapsud6o.us-east-2.rds.amazonaws.com',
    user: "admin",
    password: "admin123",
    database: "projectli"
})

dbconnection.connect(function (err) {
    if (err) throw err;
    console.log("Database connection successfull in here!");
});

function handle_request(msg, callback){
    var res = {};

   

   
    console.log("MSG in backend", msg);
    let applicantid=msg.applicantid;
    let recruterid=msg.recruterid;
    let jobtitile=msg.jobtitile;
    let jobid=msg.jobid;

    var sqlcheck="SELECT jobid FROM `tracking` WHERE jobid =" + mysql.escape(jobid)+" AND applicantid ="+mysql.escape(applicantid);
    dbconnection.query(sqlcheck, function (err, result) {

        if (err) {
          
            console.log(err);
            //res.redirect('home');

        }
        else {
            console.log("in else");
            console.log(result);
            if(result.length==0)
            {
                var sql = "INSERT INTO `tracking` ( `applicantid`, `recruiterid`,`jobid`,`jobtitle`,`clicks`,`saves`,`completed` ,`onlyread`) VALUES  (" + mysql.escape(applicantid) + "," + mysql.escape(recruterid) + "," + mysql.escape(jobid) +"," + mysql.escape(jobtitile) +"," + mysql.escape(1) +"," + mysql.escape(0) +"," + mysql.escape(0) + "," + mysql.escape(1) +")";
                dbconnection.query(sql, function (err, result1) {

                    if (err) {
                    
                        console.log(err);
                        //res.redirect('home');

                    }
                    else {
                        console.log("in else");
                        //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                        callback(null,res);
                        // res.end("Successful Login");
                    }
                })

            }
            else
            {
                callback(null,res);
            }
           
            //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
           
            // res.end("Successful Login");
        }
    })
    
   
 
   
   
}

exports.handle_request = handle_request;

