var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Attendance = mongoose.model('Attendance');

  router.param('attendanceId', function(req, res, next, attendanceId){
    Attendance.findById(attendanceId, function(err, attendance){
      if (err) return res.sendStatus(404);
      req.attendance = attendance;
      next();
    });
  });

  /* GET and POST user information */

  router.route('/')
    .get(function(req, res){
      Attendance.find(function(err, attendees){
        res.json(attendees);
      });
    })
    .post(function(req, res){
      var attendance = new Attendance(req.body);
      attendance.save(function(err){
        res.json(attendance);
      });
    });

    router.route('/:attendanceId')
    .put(function(req, res){
        req.attendance.update({$set: req.body}, {new: true}, function (err, attendance) {
            res.sendStatus(200);
        });
    })
    .get(function(req, res){
        res.json(req.attendance);
    })
    .delete(function(req, res){
        Attendance.findByIdAndUpdate(req.params.attendanceId, {$set: {deleted_at: Date.now()}}, function(err){
            if(err) return res.status(400).json(err);
            res.sendStatus(200);
        });
    });

module.exports = router;
