var express = require('express');
var router = express.Router();
const request = require('request');
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(__dirname + '/index.html');
  res.sendFile(__dirname + '/index.html');
  // res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  request.post('http://localhost:3000/login', { body: JSON.stringify(req.body) },
    ((err, data) => {
      console.log("err", err);
      console.log("data", data);
      res.sendFile(__dirname + '/index.html');
    })
  )
  // res.render('index', { title: 'Express' });
});

module.exports = router;
