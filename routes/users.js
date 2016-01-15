var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('../modules/jwt.js'),
  _ = require('lodash');

  router.param('userId', function(req, res, next, userId){
    User.findById(userId, function(err, user){
      if (err) return res.sendStatus(404);
      req.user = user;
      next();
    });
  });

  /* GET and POST user information */

  router.route('/')
    .get(function(req, res){
      User.find(function(err, users){
        res.json(users);
      });
    })
    .post(function(req, res){
      var user = new User(req.body);
      user.save(function(err){
        res.json(user);
      });
    });

    router.route('/:userId')
    .put(function(req, res){
        req.user.update({$set: req.body}, {new: true}, function (err, user) {
            res.sendStatus(200);
        });
    })
    .get(function(req, res){
        res.json(req.user);
    })
    .delete(function(req, res){
        User.findByIdAndUpdate(req.params.userId, {$set: {deleted_at: Date.now()}}, function(err){
            if(err) return res.status(400).json(err);
            res.sendStatus(200);
        });
    });

module.exports = router;
