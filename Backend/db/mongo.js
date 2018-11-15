var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
const dbRoute = "mongodb://admin:admin123@ds115753.mlab.com:15753/linkedin_demo";

// Connects to the MongoDB Database with the provided URL
exports.connect = function(dbRoute, callback) {
    MongoClient.connect(dbRoute, function(err, dbname) {
        if (err) { throw new Error('Could not connect: '+err); }
        db = dbname;
        connected = true;
        console.log("MongoDB is connected: " + connected);
        callback(db);
    });
};

// Returns the collection on the selected database
exports.collection = function(name) {
    if (!connected) {
        throw new Error('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);
};