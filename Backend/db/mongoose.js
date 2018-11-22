var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/lab2ha');
//mongodb://<dbuser>:<dbpassword>@ds061370.mlab.com:61370/projectli

mongoose.connect('mongodb://admin:admin1@ds061370.mlab.com:61370/projectli', function(err, db) {
  if(err)
    console.log("Could not connect: ", err);
  else
  {
    console.log("Connected");
  }
  } );

module.exports = {mongoose};