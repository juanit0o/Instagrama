var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
//var auth = jwt({
///  secret: 'MY_SECRET',
 // userProperty: 'payload'
//});

var photo_controller = require('../controllers/photoController');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.get('/photos', photo_controller.photo_list);

//router.get('/profile', auth, ctrlProfile.profileRead);

module.exports = router;
