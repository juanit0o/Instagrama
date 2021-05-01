var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User= require("./api/models/users");

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var favicon = require('serve-favicon');

require('./api/models/db');
require('./api/config/passport');
var routesApi = require('./api/routes/index');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var indexRouter = require('./routes/index');

var app = express();

var cors = require('cors');
app.use(cors());

app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit:10000}));

app.use(passport.initialize());
app.use('/api', routesApi);

app.use('/', indexRouter);


var mongoDB = "mongodb+srv://admin:test123@cluster0.7k2d1.mongodb.net/PSIProjeto?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// error handlers
// Catch unauthorised errors
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log("Server Has Started!");
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

module.exports = app;
