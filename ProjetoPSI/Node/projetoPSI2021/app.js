var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

var cookieParser = require('cookie-parser');
var logger = require('morgan');

//
//require('./api/models/db');
//require('./api/config/passport');
//
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var indexRouter = require('./routes/index');

var app = express();



var cors = require('cors');
app.use(cors())

var mongoDB = "mongodb+srv://admin:test123@cluster0.7k2d1.mongodb.net/PSIProjeto?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* 

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
//app.use('/api', routesApi); //??

 * app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
  secret: "Rusty is a dog",
  resave: false,
  saveUninitialized: false
}));

;




// ROUTES PROVAVAVELMENTE VAO PARA O FICHEIRO INDEX.JS


// Showing home page
app.get("/", function (req, res) {
  res.render("home");
});


// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
  res.render("secret");
});


// Showing register form
app.get("/registar", function (req, res) {
  res.render("registar");
});


// Handling user signup
app.post("/registar", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.register(new User({ username: username }),
          password, function (err, user) {
      if (err) {
          console.log(err);
          return res.render("register");
      }

      passport.authenticate("local")(
          req, res, function () {
          res.render("secret");
      });
  });
});

//Showing login form
app.get("/", function (req, res) {
  res.render("login");
});


//Handling user login
app.post("/", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/"
}), function (req, res) {
});


//Handling user logout 
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

  
*/
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log("Server Has Started!");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
const authRoute = require('./routes/auth');
app.use('/', authRoute);

//app.use('/users', userController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});



module.exports = app;
