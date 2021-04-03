var Photo = require("../models/photo");

exports.photo_list = function(req, res, next){

    Photo.find({}, {_id:0, id:1, dono:1, nome:1, descricao:1, photoPath:1, likes:1, favoritos:1})
        .sort([['id', 'ascending']])
        .exec(function (err, list_photos){
            if (err) { return next(err); }
            res.send(list_photos);
    });


}