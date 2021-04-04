var async = require('async');

var User = require('./models/user');

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://admin:test123@cluster0.7k2d1.mongodb.net/PSIProjeto?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//nick, pass, list fotos, lista fotos gostou, lista fotos favorito
var users = [];

function userCreate(id, nickname, password, cb){

    userDetails = {
        id: id,
        nickname: nickname,
        password: password
    } 

    var user = new User(userDetails);

    user.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user)
    });

}

function createUsers(cb) {

    async.parallel([
        function(callback) {
            userCreate('1','Funenga', 'badpwd', callback);
        },
        function(callback) {
            userCreate('2','Ramalho', 'badpwd', callback);
        },
        function(callback) {
            userCreate('3','Freire', 'badpwd', callback);
        },
        function(callback) {
            userCreate('4','Pinto', 'badpwd', callback);
        },
        function(callback) {
            userCreate('5','Silva', 'badpwd', callback);
        },
        function(callback) {
            userCreate('6','Costa', 'badpwd', callback);
        }
       
    ], cb); 

}


//LIMPAR A BD TODA
User.remove({}, function (err) {
    if (err)
        return next(err);
    console.log("User removed");
        
});

async.series([
    createUsers,
],
function(err, results) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    mongoose.connection.close();
});
