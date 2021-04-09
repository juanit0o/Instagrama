var Photo = require("../models/photo");

/*
exports.allPhotos = function(req, res, next){

    Photo.find({}, {_id:0, id:1, dono:1, nome:1, descricao:1, photo:1, likes:1, favoritos:1})
        .sort([['id', 'ascending']])
        .exec(function (err, list_photos){
            if (err) { return next(err); }
            res.send(list_photos);
    });

}*/

//50 FOTOS MAIS RECENTES
exports.allIndexPhotos = function(req, res, next){

    Photo.find({}, {_id:0, dono:0, nome:0, descricao:0, photo:0, likes:0, favoritos:0, __v:0})
        /*.sort([['id',-1]])*/
        .exec(function (err, list_photos){
            if (err) { return next(err); }

            res.send(list_photos.reverse().slice(0,50));
    });

}

//50 FOTOS MAIS ANTIGAS
exports.allIndexPhotosOld = function(req, res, next){

    Photo.find({}, {_id:0, dono:0, nome:0, descricao:0, photo:0, likes:0, favoritos:0})
        .exec(function (err, list_photos){
            if (err) { return next(err); }
            res.send(list_photos.slice(0,50));
    });

}

//50 FOTOS COM MAIS LIKE
exports.allIndexPhotosMostLiked = function(req, res, next){

    Photo.find({}, {_id:0, id:1})
        .exec(function (err, list_photos){
            if (err) { return next(err); }

                    //TODO ------------------------------------------------------ ORDENAR POR MAIS LIKES

            res.send(list_photos);
    });

}

exports.getPhoto = function(req, res, next){

    
    Photo.findOne({ 'id': req.params.id }, {_id:0, id:1, dono:1, nome:1, descricao:1, photo:1, likes:1, favoritos:1})
        .exec(function (err, list_photos){
            if (err) { return next(err); }
            res.send(list_photos);
    })

}

exports.getLastId = function(req, res, next){

    Photo.count({}, function(err,count) {
        if(err) {
            res.send(JSON.parse('{"msg":"FAILED"}'))
        }
        res.send(JSON.parse('{"msg":' + (count+1) + '}'))
    });
    
}

//POST SEM O MORGAN
exports.uploadPhoto = function(req, res, next){

    Photo.count({}, function(err,count) {
        if(err) {
            res.send(JSON.parse('{"msg":"FAILED"}'))
        }

        var photo = new Photo({
            id: count + 1,
            dono: req.body.dono,
            nome: req.body.nome,
            descricao: req.body.descricao,
            photo: req.body.photo,
            likes: req.body.likes,
            favoritos: req.body.favoritos
        });

        
        photo.save(function (err){
            if(err) {
                console.log(err);
                res.send(JSON.parse('{"msg":"FAILED"}'))
            } else {
                res.send(JSON.parse('{"msg":"SUCESS"}'))
            }
        });

    });
}

exports.getPhotoById = function (req, res, next) {

    require("fs").readFile("./public/photos/"+req.params.id, (err, image) => {
        res.end(image);
    });

}

exports.postPhoto = function(req, res,next){
    console.log("asdasdsa");
    res.send(JSON.parse('{"msg":"SUCESSO POSTPHOTO"}'));
}