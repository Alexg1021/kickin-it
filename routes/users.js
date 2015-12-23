var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('');
});

module.exports = router;
