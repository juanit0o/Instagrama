var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
const multer = require('multer');
const app = express();

//var auth = jwt({
///  secret: 'MY_SECRET',
 // userProperty: 'payload'
//});

var photo_controller = require('../controllers/photoController');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

//Import Routes
//const authRoute = require('./auth');
//app.use('/', authRoute);
router.get('/users', photo_controller.allUsers);
router.get('/photos', photo_controller.allPhotos);
//router.post('/')
router.get('/photolastid', photo_controller.getLastId);
router.get('/photosidRecentes', photo_controller.allIndexPhotos);
router.get('/photosidAntigas', photo_controller.allIndexPhotosOld);
router.get('/photosidLikes', photo_controller.allIndexPhotosMostLiked);
router.get('/photo/:id', photo_controller.getPhoto);

router.get('/file/photo/:id', photo_controller.getPhotoById);

router.get('/photosUser/:id', photo_controller.getFotosUser);

router.get('/donosFotos/:nickname', photo_controller.getDonosFotos);
router.delete('/apagaFoto/:info', photo_controller.apagaFoto); //AQUI DIOGO
router.delete('/apagatodasfotos',photo_controller.apagaTodasFotos);

router.post('/photoinfo', photo_controller.uploadPhoto); //sem morgan

router.post('/likeFoto', photo_controller.addLikeToPhoto);
router.post('/removeLikeFoto', photo_controller.removeLikeToPhoto);

//router.post('/uploadPhoto', photo_controller.postPhoto); //tentativa com morgan

// first create a multer config
const StorageConfig = multer.diskStorage({
    destination : (req, file, cb) => { cb(null, 'public/photos'); },
    filename : (req, file, cb) => { cb(null, file.originalname)}
});

// define the File filters , what type of files you want to accept.
const fileFilters=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype ==='image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

// lets create our multer objects 
const Multerupload = multer({ storage: StorageConfig,fileFilter: fileFilters});


router.post('/photopath', Multerupload.single('profileImage'), (req,res,next) => {
    //TODO
    if(!req.file){
        res.send(JSON.parse('{"msg":"FAILED"}'))
        return;
    }
    let url = "http://" + req.get('host') + "/file/photo/" + req.file.originalname.toString();
    res.send(JSON.parse('{"msg":"' + url + '"}'));
});


//file_controller.uploadImage)



//router.get('/profile', auth, ctrlProfile.profileRead);

module.exports = router;
