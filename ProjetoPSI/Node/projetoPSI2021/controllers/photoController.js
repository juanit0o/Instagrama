var Photo = require("../models/photo");

exports.allPhotos = function(req, res, next){

    Photo.find({}, {_id:0, id:1, dono:1, nome:1, descricao:1, photoPath:1, likes:1, favoritos:1})
        .sort([['id', 'ascending']])
        .exec(function (err, list_photos){
            if (err) { return next(err); }
            res.send(list_photos);
    });

}

//50 FOTOS MAIS RECENTES
exports.allIndexPhotos = function(req, res, next){

    Photo.find({}, {_id:0, id:1})
        .sort([['id', 'descending']])
        .limit(50)
        .exec(function (err, list_photos){
            if (err) { return next(err); }
            res.send(list_photos);
    });

}

//50 FOTOS MAIS ANTIGAS
exports.allIndexPhotosOld = function(req, res, next){

    Photo.find({}, {_id:0, id:1})
        .sort([['id', 'ascending']])
        .limit(50)
        .exec(function (err, list_photos){
            if (err) { return next(err); }
            res.send(list_photos);
    });

}

//50 FOTOS COM MAIS LIKE
exports.allIndexPhotosMostLiked = function(req, res, next){

    Photo.find({}, {_id:0, id:1})
        .sort([['likes.length', 'descending']])
        .limit(50)
        .exec(function (err, list_photos){
            if (err) { return next(err); }
            res.send(list_photos);
    });

}

exports.getPhoto = function(req, res, next){

    Photo.findOne({ 'id': req.params.id }, {_id:0, id:1, dono:1, nome:1, descricao:1, photoPath:1, likes:1, favoritos:1})
        .sort([['id', 'ascending']])
        .exec(function (err, list_photos){
            if (err) { return next(err); }
            res.send(list_photos);
    });

}
