var async = require('async');

var Photo = require('./models/photo');

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://admin:test123@cluster0.7k2d1.mongodb.net/PSIProjeto?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var photos = [];

function photoCreate(id, dono, nome, descricao, photo, likes, favoritos, cb){

    photoDetails = {id:id, 
                    dono:dono,
                    nome:nome,
                    descricao:descricao,
                    photo:photo,
                    likes:likes,
                    favoritos:favoritos} 

    var photo = new Photo(photoDetails);

    photo.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Photo: ' + photo);
        photos.push(photo)
        cb(null, photo)
    });

}

function createPhotos(cb) {

    async.parallel([
        function(callback) {
            photoCreate('0', 'Fotografo 1', 'NOME', 'DESC', 'assets/photo/aluminum.png', [], [], callback);
        },
        function(callback) {
            photoCreate('1', 'Fotografo 2', 'NOME', 'DESC', 'assets/photo/babymonkey.png', [], [], callback);
        },
        function(callback) {
            photoCreate('2', 'Fotografo 3', 'NOME', 'DESC', 'assets/photo/cafe.png', [], [], callback);
        },
        function(callback) {
            photoCreate('3', 'Fotografo 4', 'NOME', 'DESC', 'assets/photo/monkeyEating.png', [], [], callback);
        },
        function(callback) {
            photoCreate('4', 'Fotografo 5', 'NOME', 'DESC', 'assets/photo/palace.png', [], [], callback);
        },
        function(callback) {
            photoCreate('5', 'Fotografo 6', 'NOME', 'DESC', 'assets/photo/red.png', [], [], callback);
        },
        function(callback) {
            photoCreate('6', 'Fotografo 7', 'NOME', 'DESC', 'assets/photo/rose.png', [], [], callback);
        },
        function(callback) {
            photoCreate('7', 'Fotografo 8', 'NOME', 'DESC', 'assets/photo/sunset.png', [], [], callback);
        },
        function(callback) {
            photoCreate('8', 'Fotografo 9', 'NOME', 'DESC', 'assets/photo/skate.png', [], [], callback);
        }
       
    ], cb); 

}


//LIMPAR A BD TODA
Photo.remove({}, function (err) {
    if (err)
        return next(err);
    console.log("Photo removed");
        
});

async.series([
    createPhotos,
],
function(err, results) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    mongoose.connection.close();
});
