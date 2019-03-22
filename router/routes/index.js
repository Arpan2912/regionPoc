var express = require('express');
var router = express.Router();
var redis = require("redis"),
  client = redis.createClient({
    host: "192.168.4.3"
  });
const RedisOps = require('./redis-ops');
const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.4.3/test');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
  id: ObjectId,
  name: String,
  password: String,
  region: String,
  type: String
});

const UserModal = mongoose.model('user', user);
let userDetail = new UserModal({
  name: 'arpan',
  password: '123',
  region: 'india'
})

let obj = [
  {
    name: 'arpan',
    password: '123',
    region: 'india'
  }, {
    name: 'vinay',
    password: '123',
    region: 'austrelia'
  },
  {
    name: 'dipak',
    password: '123',
    region: 'us'
  }
]
// userDetail.save();
// UserModal.insertMany(obj);
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("get method called");
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/get-ip', function (req, res, next) {
  client.get('india', (err, data) => {
    console.log("data", data);
    res.send(data);
  });
});

/* GET home page. */
router.post('/login', function (req, res, next) {
  console.log("req body", req.body);
  let name = req.body.name;
  let password = req.body.password;
  UserModal.find({
    name: name, password: password
  }).lean().then(data => {
    if (data.length > 0) {
      let u = data[0];
      console.log(u, data);
      if (u.type === 'fix') {
        u.region = u.region;
      } else if (u.type === 'free') {
        u.region = req.body.region ? req.body.region : u.region;
      }
      client.get(u.region, (err, ip) => {
        console.log("data", ip);
        u['ip'] = ip;
        console.log("u", u);
        res.send(u);
      });
    } else {
      res.status(500).send(null);
    }
  }).catch(e => {
    console.log("e", e);
  });
});

router.post('/add-user', function (req, res, next) {
  console.log("req body", req.body);
  let name = req.body.name;
  let password = req.body.password;
  let region = req.body.region;
  let type = req.body.type;

  let obj = {
    name: name,
    password: password,
    region: region,
    type: type
  }
  let userDetail = new UserModal(obj);
  userDetail.save()
    .then(data => {
      console.log("data", data);
      res.send(data);
    })
});

router.get('/admin', function (req, res, next) {
  client.keys('india==*', (err, data) => {
    console.log("data", data);
    let length = data.length;
    return res.status(200).send(length.toString());
  })
})

router.get('/admin/get-users', function (req, res, next) {
  RedisOps.getUsers()
    .then(data => {
      let ind = [];
      let aus = [];
      let us = [];
      console.log("data", data);
      data.india.forEach(element => {
        let str = element.split('==');
        ind.push(str[2]);
      });

      data.austrelia.forEach(element => {
        let str = element.split('==');
        aus.push(str[2]);
      });

      data.us.forEach(element => {
        let str = element.split('==');
        us.push(str[2]);
      });

      let obj = {
        india: ind,
        aus: aus,
        us: us
      }
      console.log("obj", obj);
      return res.status(200).send(obj);
    })
    .catch(e => {
      console.log("e", e);
    })

  // let length = data.length;

})
module.exports = router;
