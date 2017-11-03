const express = require('express');
const router = express.Router();

router.get('/', function(req, res){

  res.send({get:'/'});
  res.end();
});

router.get('/networkLogs', function(req, res){

  res.send({get:'/networkLogs'});
  res.end();
});

router.post('/createLog', function(req, res){

  res.send({
    post:'/createLog',
    name: req.body.name
});

});

module.exports = router;
