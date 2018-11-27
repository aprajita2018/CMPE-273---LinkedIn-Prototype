
var express = require('express');
var router = express.Router();

var pool = require('../db/pool');
var mysql = require('mysql');

var kafka = require('../kafka/client');


router.get('/:username', function (req, res) {
    console.log("Entering");
   // var query = "select jobid, jobtitle,  sum(completed) as completed, sum(half_filled) as half_filled, sum(onlyread) as onlyread from tracking where recruiterid = " + mysql.escape(req.params.username) + " GROUP BY jobid";
 //   var query = "select jobid, jobtitle, count(*) as clicks from tracking where recruiterid = " + mysql.escape(req.params.username) + " GROUP BY jobid";
 var query = "select jobid, jobtitle, sum(saves) as saves from tracking where recruiterid = " + mysql.escape(req.params.username) + " GROUP BY jobid";   
 pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(query, function (err, result) {
                if (err) { throw err; }
                else if (result) {
                    console.log(result);
                    res.end(JSON.stringify(result));
                }
            }
            )
        }
    });



})
module.exports = router;
