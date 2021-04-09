var Photo = require("../models/photo");
const multer = require("multer");



const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        console.log("BBB" + req.body);
        cb(null, './public/photos');
       
    },
    
    filename: (req, file, cb) => {
        console.log("bbbbbbbbb");
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
/*
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}*/

//const upload = multer({ storage: storage, fileFilter: fileFilter }).single('file');
//const upload = multer({ storage: storage}).single('file');
const upload = multer({ storage: storage}).single("dsfsdf");

exports.uploadImage = function(req, res, next){

    console.log("-----------------------------");

    Photo.count({}, function(err,count) {
        if(err) {
            res.send(JSON.parse('{"msg":"FAILED"}'))
        }

        //GUARDAR
        console.log("AAAA " + req.body);
        console.log(JSON.stringify(req.body));
        console.log("BBBB " + req.body.photo);
        //upload.single(req.body.photo);


        var storage = multer.diskStorage({
            destination: "/public/photos"
        });
        var upload = multer({ storage : storage}).any();
    
        upload(req,res,function(err) {
            if(err) {
                console.log(err);
            } else {
               console.log(req.body);
               req.files.forEach( function(f) {
                 console.log(f);
                 // and move file to final destination...
               });
            }
        });



        var photo = new Photo({
            id: count + 1,
            dono: req.body.dono,
            nome: req.body.nome,
            descricao: req.body.descricao,
            photo: "NAO TEM AINDA",           //METER O PATH PARA A FOTO GUARDADA
            likes: req.body.likes,
            favoritos: req.body.favoritos
        });

        res.send(JSON.parse('{"msg":"SUCCESS"}'))

      
        console.log(photo);

    });

}