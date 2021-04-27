var mongoose = require('mongoose');
var Photo = require("../models/photo");

var Schema = mongoose.Schema;

var FavoriteSchema = new Schema(
    {
        nickname: { type: String, required: true },
        favoritePhotoIds: [{type: String}]
    }
);

module.exports = mongoose.model('Favorite', FavoriteSchema);