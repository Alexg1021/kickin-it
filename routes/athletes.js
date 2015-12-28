var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Athlete = mongoose.model('Athlete');

  router.param('athleteId', function(req, res, next, athleteId){
    Athlete.findById(athleteId, function(err, athlete){
      if (err) return res.sendStatus(404);
      req.athlete = athlete;
      next();
    });
  });

  /* GET and POST user information */

  router.route('/')
    .get(function(req, res){
      Athlete.find(function(err, athletes){
        res.json(athletes);
      });
    })
    .post(function(req, res){
      var athlete = new Athlete(req.body);
      athlete.save(function(err){
        res.json(athlete);
      });
    });

    router.route('/:athleteId')
    .put(function(req, res){
        req.athlete.update({$set: req.body}, {new: true}, function (err, athlete) {
            res.sendStatus(200);
        });
    })
    .get(function(req, res){
        res.json(req.athlete);
    })
    .delete(function(req, res){
        Athlete.findByIdAndUpdate(req.params.athleteId, {$set: {deleted_at: Date.now()}}, function(err){
            if(err) return res.status(400).json(err);
            res.sendStatus(200);
        });
    });

module.exports = router;
