var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//MongoDB Database
const dbRoute = "mongodb://admin:admin2018@ds149124.mlab.com:49124/homeaway";

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    keepAlive: true,
    useNewUrlParser: true,
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
}

//connect to homeaway DB
// connects our back end code with the database
exports.connectToMongo = mongoose.connect(dbRoute, options, function(error) {
    // Check error in initial connection.
    if (error) {
      console.log("Failed to connect mongodb through mongoose");
      throw error;
    }
    console.log("Connected to mongodb ... :) ");
  });
