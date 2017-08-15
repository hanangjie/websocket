var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var list=fs.readdirSync('views');
list.forEach(function(i,e){
  var item=i.split('.')[0];
  router.get('/'+item, function(req, res, next) {
    res.render(item);
  });
})

router.get('/loginCode', function(req, res, next) {
  res.render('loginCode');
});

module.exports = router;
