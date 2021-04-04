var ObjectId = require('mongoose').Types.ObjectId; //para poder comparar e usar o _id

var User = require("../models/user");


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

exports.post_user = function(req,res,next) {
    User.findOne({'nickname' : req.body.nickname}).exec(function (err, found_user){

        if(found_user){
            res.send("User with invalid nickname.");
        } else {
            User.findOne().sort('-id').exec(function (err, c) {

                var newUser = new User({
                    id: parseInt(c.id) + 1, 
                    nickname: req.body.nickname,
                    password: req.body.password
                });

                newUser.save(function (err2) {
                    if (err2) {
                        return err2;
                    }
                    res.send(newUser);
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