var express = require('express');
var router = express.Router();
var fs = require('fs')
var QRCode = require('qrcode')
const os=require('os')


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

router.get('/loginCode.do', function(req, res, next) {
  var host=`${req.protocol}://${req.host}:3000`;
  var random=parseInt(Math.random()*1000000000)
  QRCode.toDataURL(`${host}/login?random=${random}`, function (err, url) {
    res.render('loginCode',{img: url,random:random});
  })
  
});
router.get('/login.do', function(req, res, next) {
  res.render('login',{img: "a.jpg"});
});


router.get('/game24.do', function(req, res, next) {
  var host=`${req.protocol}://${req.host}:3000`;
  var random=parseInt(Math.random()*1000000000)
  QRCode.toDataURL(`${host}/game24-client?room=${random}`, function (err, url) {
    res.render('game24',{img: url,random:random});
  })
});


router.get('/iframe/:id', function(req, res, next) {
  res.render('iframe',{num: req.params.id});
});


module.exports = router;
