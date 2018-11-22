//import the require dependencies
var express = require('express');

var bodyParser = require('body-parser');
var session = require('express-session');
//var cookieParser = require('cookie-parser');
const port = 3001;
var passport = require('passport');
var cors = require('cors');
var crypt = require('./crypt');
var pool = require('./pool');
var {mongoose} = require('./mongoose');
var jwt = require('jsonwebtoken');
var config = require('./settings');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var kafka = require('./kafka/client');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {

      
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage });

var app = express();  

app.set('view engine', 'ejs');

var mysql = require('mysql');



//use cors to allow cross origin resource sharing 
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : config.secret ,
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client/build")));
app.use('/uploads', express.static('uploads'));

 // Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./passport')(passport);

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  //var loginRouter           = require('./routes/loginRouter');
  //var signupRouter          = require('./routes/signupRouter');
  //var logout                = require('./routes/logout');
  //var jobupdate             = require ('./routes/jobupdate');
  
  //routing to different routes
  //app.use('/login', loginRouter);
  //app.use('/userSignup', signupRouter);
  //app.use('/logout', logout);
  //app.use('/jobupdate', jobupdate);




//Protected authenticated route with JWT
app.get('/protectedRoute', requireAuth, function (request, response) {
    response.send('Your User id is: ' + request.user.firstname + ', username is: ' + request.user.username + '.');
}); 



app.post('/jobupdate', (req, res) => {
 
    console.log("Inside Job Update/Create");
    kafka.make_request('jobpost', req.body , function(err,results){
        
        if (err){
            console.log("Inside err");
            res.status(404).json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            if(results){   
            console.log('in result');
            console.log(results);
            console.log("Inside else");                
            res.status(results.code).json({
                message:results.message,
                success: results.success,
                jobid : results.jobid    
            });

            res.end("Job Update/Create Successful");

        }
            
    }
})  
console.log("out of job post handler") 
    
})
 



app.get('/postjob',  function(req,res){
    
    console.log("Inside recruiter get request");
    kafka.make_request('getjobpost', req.query , function(err,results){
        if (err){
            console.log("Inside err");
            res.status(404).json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            if(results){   
            console.log('in result');
            console.log(results);
            console.log("Inside else");                
            res.status(results.code).json({
                job:results.job,
                message:results.message,
                success: results.success,
                    
            });

                res.end("Job Post Search Successful");

        }
            
    }
        
});

   
    console.log("Going out of get Job ");
})







//start your server on port 3001
app.listen(port);
console.log("Server Listening on port ", port);
