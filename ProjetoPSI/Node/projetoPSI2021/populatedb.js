var async = require('async');

var Hero = require('./models/hero');

var mongoose = require('mongoose');
const hero = require('./models/hero');
var mongoDB = 'mongodb+srv://admin:admin@cluster0.7k2d1.mongodb.net/PSIProjeto?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));