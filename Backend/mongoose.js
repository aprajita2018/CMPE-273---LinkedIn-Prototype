
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/linkedin', { useNewUrlParser: true, poolSize:100, useCreateIndex: true, });



module.exports = {mongoose};