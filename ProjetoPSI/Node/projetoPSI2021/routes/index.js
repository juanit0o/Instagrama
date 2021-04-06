var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
const app = express();

//var auth = jwt({
///  secret: 'MY_SECRET',
 // userProperty: 'payload'
//});

var photo_controller = require('../controllers/photoController');
var user_controller = require('../controllers/userController');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

//Import Routes
//const authRoute = require('./auth');
//app.use('/', authRoute);

router.get('/photos', photo_controller.allPhotos);
router.get('/photosidRecentes', photo_controller.allIndexPhotos);
router.get('/photosidAntigas', photo_controller.allIndexPhotosOld);
router.get('/photosidLikes', photo_controller.allIndexPhotosMostLiked);
router.get('/photo/:id', photo_controller.getPhoto);

router.get('/users', user_controller.user_list);
router.get('/users/:id', user_controller.get_user);
router.post('/login', user_controller.login_user);
router.get('/usersid', user_controller.allIndexUsers);
router.post('/users', user_controller.post_user);
router.delete('/users/:id', user_controller.delete_user);

//router.get('/profile', auth, ctrlProfile.profileRead);

module.exports = router;
