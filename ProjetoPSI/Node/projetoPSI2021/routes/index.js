var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
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

//router.get('/photos', photo_controller.allPhotos);
router.get('/photosidRecentes', photo_controller.allIndexPhotos);
router.get('/photosidAntigas', photo_controller.allIndexPhotosOld);
router.get('/photosidLikes', photo_controller.allIndexPhotosMostLiked);
router.get('/photo/:id', photo_controller.getPhoto);
router.post('/photo', photo_controller.uploadPhoto); //sem morgan

router.post('/uploadPhoto', photo_controller.postPhoto); //tentativa com morgan

//router.get('/profile', auth, ctrlProfile.profileRead);

module.exports = router;
