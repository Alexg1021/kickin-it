var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Group = mongoose.model('Group');

  router.param('groupId', function(req, res, next, groupId){
    Group.findById(groupId, function(err, group){
      if (err) return res.sendStatus(404);
      req.group = group;
      next();
    });
  });

  /* GET and POST user information */

  router.route('/')
    .get(function(req, res){
      Group.find().populate('students user').exec(function(err, groups){
        res.json(groups);
      });
    })
    .post(function(req, res){
      var group = new Group(req.body);
      group.save(function(err){
        res.json(group);
      });
    });

    router.route('/:groupId')
    .put(function(req, res){

      var Students = require('../modules/students');

            Students.create(req.body.students)
              .then(function(studs){
                req.body.students = studs;

                req.group.update({$set: req.body}, {new: true}, function (err, group) {
                    res.sendStatus(200);
                });

              });


    })
    .get(function(req, res){
        res.json(req.group);
    })
    .delete(function(req, res){
        Group.findByIdAndUpdate(req.params.groupId, {$set: {deleted_at: Date.now()}}, function(err){
            if(err) return res.status(400).json(err);
            res.sendStatus(200);
        });
    });

module.exports = router;
