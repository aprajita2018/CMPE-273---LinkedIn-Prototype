
var pool = require('../db/pool');
var mysql = require('mysql');

var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){

    console.log("Inside getmingraph kafka backend");
 
    var query = "SELECT jobid, jobtitle, COUNT(jobid) as count FROM tracking WHERE recruiterid = " + mysql.escape(msg.username) + " GROUP BY tracking.jobid order by count ASC limit 0,5";
    pool.getConnection(function (err, con) {
        if (err) {
          console.log(err);
        } else {
            con.query(query, function (err, result) {
                if (err) { throw err; }
                else if (result) {
                    console.log(result);
                    callback(null, result);
                     }
                     else {
                         console.log(" not found");
                     }
            }
            )
        }
    });
   

}

    exports.handle_request = handle_request;