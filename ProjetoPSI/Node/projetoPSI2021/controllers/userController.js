var ObjectId = require('mongoose').Types.ObjectId; //para poder comparar e usar o _id

var User = require("../models/user");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.user_list = function(req,res,next){
    console.log('entrei');
    User.find({}, {_id:0, id:1, nickname:1, password: 1})
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
    User.findOne({'id' : id}, {_id:0, id:1, nickname:1, password: 1})
        .exec(function (err, user){
            if (err) { return next(err); }
            res.send(user);
    });
}

exports.login_user = function(req,res,next) {
    console.log(req.body);
    console.log(req.body.nickname);
    console.log(req.body.password);
    
    
    User.findOne({'nickname' : req.body.nickname}, {_id:0, id:1, nickname:1, password: 1}).exec(async function (err, user){
        if (err) { return next(err); }
       
        if(user == null){
            res.send(JSON.parse('{"msg":"FAILED"}'));
        } else {
/**
            userPwd = user.password;
            if (userPwd == req.body.password) {
                res.send(JSON.parse('{"msg":"SUCESSO LOGIN"}'));
            } else {
                res.send(JSON.parse('{"msg":"FAILED LOGIN."}'));
            }
*/
            //tapar a recebida
            var pwd = await bcrypt.hash(req.body.password, 10);
            //mostrar a velha
            console.log('1: '+user.password);
            //mostrar a calculada
            console.log('2: '+pwd)
            //comparar as duas
            if (await bcrypt.compare(user.password, pwd)) {
                res.send(JSON.parse('{"msg":"SUCESSO LOGIN"}'));
            } else {
                res.send(JSON.parse('{"msg":"FAILED LOGIN."}'));
            }
            
        }
        //calcular a hash da pwd
        //verificar se sao iguais: se sim envia 'SUCESSO', senao descricao de erro 
        
        //return(user.password);
    });

    
}

exports.post_user = async function(req,res,next) {

    console.log(req.body);
    console.log(req.body.nickname);
    console.log(req.body.password);
    var password = await bcrypt.hash(req.body.password, 10);
    console.log('CIFRADA: '+password);

    User.findOne({'nickname' : req.body.nickname}).exec(function (err, found_user){

        if(found_user){
            res.send(JSON.parse('{"msg":"FAILED"}'));
        } else {
            User.findOne().sort('-id').exec(function (err, c) {

                var newUser = new User({
                    id: parseInt(c.id) + 1, 
                    nickname: req.body.nickname,
                    password: password
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