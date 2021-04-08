var ObjectId = require('mongoose').Types.ObjectId; //para poder comparar e usar o _id

var User = require("../models/user");
const CryptoJS = require("crypto-js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.user_list = function(req,res,next){
    console.log('entrei');
    User.find({}, {_id:0, id:1, nickname:1, password: 1, logado: 1})
        .sort([['id', 'ascending']])
        .exec(function (err, list_users){
            if (err) { return next(err); }
            res.send(list_users);
    });

}

exports.get_user = function(req,res,next) {
    console.log(req.params);
    var id = req.params.id;
    console.log(id);
    User.findOne({'id' : id}, {_id:0, id:1, nickname:1, password: 1, logado: 1})
        .exec(function (err, user){
            if (err) { return next(err); }
            res.send(user);
    });
}

exports.login_user = function(req,res,next) {
    console.log(req.body);
    //console.log('Nome: ' + req.body.nickname);
    //console.log('DB-Pwd: ' + req.body.password);
   
    
    User.findOne({'nickname' : req.body.nickname}, {_id:0, id:1, nickname:1, password: 1}).exec(async function (err, user){
        if (err) { return next(err); }
       
        if(user == null){
            res.send(JSON.parse('{"msg":"FAILED"}'));
        } else {
            var novadecifrada = CryptoJS.AES.decrypt(user.password, 'chave').toString(CryptoJS.enc.Utf8);
            if (novadecifrada == req.body.password) {
                //mudar o campo logado para 1
                User.findOneAndUpdate({'nickname': req.body.nickname}, {'logado': 1});
                //user.logado = 1;
                res.send(JSON.parse('{"msg":"SUCESSO LOGIN"}'));
                console.log('Cliente autenticou.');
            } else {
                res.send(JSON.parse('{"msg":"FAILED LOGIN."}'));
            }
            
        }
    });

    
}

exports.logout_user = function(req, res, next) {
    console.log(req.body);
    User.findOneAndUpdate({'nickname': req.body.nickname}, {'logado': '0'});
}

exports.post_user = async function(req,res,next) {

    console.log(req.body);
    console.log(req.body.nickname);
    console.log(req.body.password);
   
    User.findOne({'nickname' : req.body.nickname}).exec(function (err, found_user){

        if(found_user){
            res.send(JSON.parse('{"msg":"FAILED"}'));
        } else {
            //User.findOne().sort('-id').exec(function (err, c) {
            var novacifrada = CryptoJS.AES.encrypt(req.body.password, 'chave').toString();
            console.log(novacifrada);
            User.count({}, function(err,count) {
                var newUser = new User({
                    id: count + 1,
                    nickname: req.body.nickname,
                    password: novacifrada,
                    logado: 1 //adicionado
                });

                newUser.save(function (err2) {
                    if (err2) {
                        return err2;
                    }
                    res.send(JSON.parse('{"msg":"SUCESSO REGISTO"}'));
                });
            });
        }

    });
    
}

exports.delete_user = function(req,res,next){
    console.log(req.params);
    var id = req.params.id;
    //verificar se existe ?
   
    User.findOneAndRemove({'id' : id})
        .exec(function (err){
            if (err) { return next(err); }
            res.send("User with id: "+id+" removed from DB.");
    });
}

exports.allIndexUsers = function(req,res,next){
    User.find({}, {_id:0, id:1})
        .sort([['id', 'ascending']])
        .exec(function (err, list_photos){
            if (err) { return next(err); }
            res.send(list_photos);
    });


    
}