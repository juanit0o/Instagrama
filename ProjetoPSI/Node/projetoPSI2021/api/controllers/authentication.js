var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  var user = new User();

  user.nickname = req.body.nickname;
    console.log(req.body);
  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.send({
      "token" : token
    });
  });

};

module.exports.getUser = function(req, res) {
  
  User.findOne({'nickname' : req.params.nome}, {_id:0 , nickname : 1})
      .exec(function (err, user){
          if (err || user == null) { res.send(JSON.parse('{"msg":"NOTEXISTS"}'));
          return;
        }
          res.send(JSON.parse('{"msg":"EXISTS"}'));
      });
}

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.apagaTodosUsers = function(req, res) {
  User.find({}, {nickname:1})
        .exec(function (err, users){
            if (err) { return next(err); }
            users.forEach(user => {
                    User.findOneAndRemove({'nickname': user.nickname})
                        .exec(function (err2){
                            if (err2) { return next(err2); }
                    });
            });
        });
    res.send("TODAS UTILIZADORES LIMPOS DA BD");
}
