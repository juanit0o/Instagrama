var express = require('express');
var router = express.Router();

var photo_controller = require('../controllers/photoController');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.get('/photos', photo_controller.photo_list);

module.exports = router;
