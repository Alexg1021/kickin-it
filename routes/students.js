var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Student = mongoose.model('Student');
  User = mongoose.model('User');

  router.param('studentId', function(req, res, next, studentId){
    Student.findById(studentId, function(err, student){
      if (err) return res.sendStatus(404);
      req.student = student;
      next();
    });
  });

  /* GET and POST user information */
  router.route('/')
    .get(function(req, res){
      Student.find().populate('user').exec(function(err, students){
        res.json(students);
      });
    })
    .post(function(req, res){
      var user = new User (req.body.user);
      user.save(function(){

      })
        .then(function(user){
          var student = new Student({
            position: req.body.position,
            notes: req.body.notes,
            user: user});

          student.save(function(err){
            res.json(student);
          });

        });
    });

    router.route('/:studentId')
    .put(function(req, res){
        req.student.update({$set: req.body}, {new: true}, function(err, student){
          res.sendStatus(200);
        });
    })
    .get(function(req, res){
        res.json(req.student);
    })
    .delete(function(req, res){
        Student.findByIdAndUpdate(req.params.studentId, {$set: {deleted_at: Date.now()}}, function(err){
            if(err) return res.status(400).json(err);
            res.sendStatus(200);
        });
    });

module.exports = router;
