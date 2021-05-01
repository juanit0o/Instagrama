var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
const multer = require('multer');
const { authenticate } = require('passport');
const app = express();

var photo_controller = require('../controllers/photoController');
var favorite_controller = require('../controllers/favoriteController');
var auth_controller = require('../api/controllers/authentication');


router.get('/photos', photo_controller.allPhotos);

router.get('/photolastid', photo_controller.getLastId);
router.get('/photosidRecentes', photo_controller.allIndexPhotos);
router.get('/photosidAntigas', photo_controller.allIndexPhotosOld);
router.get('/photosidLikes', photo_controller.allIndexPhotosMostLiked);
router.get('/photolikers/:id', photo_controller.photolikers);
router.get('/photo/:id', photo_controller.getPhoto);

router.get('/file/photo/:id', photo_controller.getPhotoById);

router.get('/photosUser/:id', photo_controller.getFotosUser);

router.get('/donosFotos/:nickname', photo_controller.getDonosFotos);
router.delete('/apagaFoto/:info', photo_controller.apagaFoto); //AQUI DIOGO
router.delete('/apagatodasfotos',photo_controller.apagaTodasFotos);
router.delete('/apagatodosusers',auth_controller.apagaTodosUsers);
router.post('/photoinfo', photo_controller.uploadPhoto); //sem morgan

router.post('/likeFoto', photo_controller.addLikeToPhoto);
router.post('/removeLikeFoto', photo_controller.removeLikeToPhoto);

router.get('/getUser/:nome', auth_controller.getUser);

//Adicionar Favorito a dado user
router.post('/addFavorite/:fotoId', favorite_controller.addFavorite);
router.put('/removeFavorite/:fotoId', favorite_controller.removeFavorite);
router.get('/getFavorites/:nickname', favorite_controller.getFavorites);

const StorageConfig = multer.diskStorage({
    destination : (req, file, cb) => { cb(null, 'public/photos'); },
    filename : (req, file, cb) => { cb(null, file.originalname)}
});

const fileFilters=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype ==='image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const Multerupload = multer({ storage: StorageConfig,fileFilter: fileFilters});

router.post('/photopath', Multerupload.single('profileImage'), (req,res,next) => {
    if(!req.file){
        res.send(JSON.parse('{"msg":"FAILED"}'))
        return;
    }
    let url = "http://" + req.get('host') + "/file/photo/" + req.file.originalname.toString();
    res.send(JSON.parse('{"msg":"' + url + '"}'));
});

module.exports = router;
