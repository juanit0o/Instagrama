//FAVORITE CONTROLLER
var Favorites = require("../models/favorites");
var Photo = require("../models/photo");

exports.addFavorite = function(req, res){
    Favorites.findOne({ 'nickname': req.body.nickname }, {})
        .exec(function (err, resposta){

            if (err) {
                res.status(422).send({ success: false, message: 'Error adding photo to favorites!' });
                return;
            }

            if (resposta == null) {
                var newUserFavorite = new Favorites({
                    nickname: req.body.nickname,
                    favoritePhotoIds: [req.params.fotoId]
                });   

                newUserFavorite.save(function (err){
                    if(err) {
                        console.log(err);
                        res.send({ success: false, message: 'Error creating new favorite database!' })
                    } else {
                        res.send({ success: true, message: 'Photo added to favorites!' })
                    }
                });
            } else {
                if(!resposta.favoritePhotoIds.includes(req.params.fotoId)) {
                    resposta.favoritePhotoIds.push(req.params.fotoId);

                    resposta.save(function (err){
                        if(err) {
                            console.log(err);
                            res.send({ success: false, message: 'Error creating new favorite database!' })
                        } else {
                            res.send({ success: true, message: 'Photo added to favorites!' })
                        }
                    });
                } else {
                    res.send({ success: true, message: 'Photo already in favorites!' })
                }

                console.log(resposta)

            }
    });
}


exports.removeFavorite = function(req, res){
    Favorites.findOne({ 'nickname': req.body.nickname }, {})
        .exec(function (err, resposta){

            if (err) {
                res.status(422).send({ success: false, message: 'Error removing photo from favorites!' });
                return;
            }

            if (resposta == null) {
                var newUserFavorite = new Favorites({
                    nickname: req.body.nickname,
                    favoritePhotoIds: []
                });   

                newUserFavorite.save(function (err){
                    if(err) {
                        console.log(err);
                        res.send({ success: false, message: 'Error creating new favorite database!' })
                    } else {
                        res.send({ success: true, message: 'Photo was not in favorites!' })
                    }
                });
            } else {
                if(resposta.favoritePhotoIds.includes(req.params.fotoId)) {
                    var index = resposta.favoritePhotoIds.indexOf(req.params.fotoId);
                    if (index > -1) {
                        resposta.favoritePhotoIds.splice(index, 1);
                    }
                    console.log(resposta.favoritePhotoIds)

                    resposta.save(function (err){
                        if(err) {
                            console.log(err);
                            res.send({ success: false, message: 'Error in removing favorite!' })
                        } else {
                            res.send({ success: true, message: 'Photo removed from favorites!' })
                        }
                    });
                } else {
                    res.send({ success: true, message: 'Photo was not in favorites!' })
                }

                console.log(resposta)

            }
    });
}

exports.getFavorites = function(req, res){
    Favorites.findOne({ 'nickname': req.params.nickname }, {})
        .exec(function (err, resposta){

            if (err) {
                res.status(422).send({ success: false, message: 'Error removing photo from favorites!' });
                return;
            }

            if (resposta == null) {
                res.send({ success: false, message: 'No user goes by that nickname.' })

            } else {     
                          
                res.send(resposta.favoritePhotoIds)
            }
    });
}