var Photo = require("../models/photo");
const fs = require('fs');
const path = require('path');

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

exports.apagaFoto = function(req, res, next){
    var idfoto = req.params.info.split(";")[0];
    var idpessoa = req.params.info.split(";")[1];
    
    console.log("1 " + idpessoa);
    //res.send(JSON.parse('{"msg":"SUCESSO APAGAR FOTO"}'));
    Photo.findOne({'id': idfoto}, {dono:1})
        .exec( async function (err, foto){
            if (err) { return next(err); }
            var donofoto = foto.dono;
            var fotonome = "photo_"+idfoto+".jpg";
            console.log('DONO DA FOTO::'+donofoto +'\nID DA PESSOA::'+idpessoa +'\nFOTONOME::'+fotonome);
            if(donofoto == idpessoa){
                Photo.findOneAndRemove({'id': idfoto})
                    .exec(function (err){
                        if (err) { return next(err); }
                        try {
                            //apaga ficheiro
                            fs.unlink('\public\\photos\\'+fotonome,(err) => {
                                if(err) {
                                    console.log(err);
                                } else {
                                    console.log("Apagou fotografia "+fotonome);
                                    res.send(JSON.parse('{"msg":"SUCESSO APAGAR FOTO"}'));
                                }
                            });
                            
                        } catch(err) {
                            res.send(JSON.parse('{"msg":"FALHA APAGAR FOTO"}'));
                            console.log(err);
                            console.error(err);
                        }
                    });
            } else {
                res.send(JSON.parse('{"msg":"NAO APAGOU, NAO PERTENCE"}'));
            }

        });
    
    //TODO: APAGAR A FOTO DA PASTA DO NODE
}



exports.getDonosFotos = function(req, res, next){
    Photo.find({'nome': req.params.nickname}, {_id:0, id:1, dono:1})
        .exec(function (err, lista_donos){
            if (err) { return next(err); }

            res.send(lista_donos)
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