var mongoose = require('mongoose');

var crypto = require('crypto');

var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nickname: { type: String, unique: true, required: true },
    hash: String,
    salt: String
  });

UserSchema.methods.setPassword = function(password){
 this.salt = crypto.randomBytes(16).toString('hex');
 this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}; 

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };
  

module.exports = mongoose.model('User', UserSchema);