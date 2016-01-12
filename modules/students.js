'use strict';

var q = require('q'),
  mongoose = require('mongoose'),
  Student = mongoose.model('Student'),
  User = mongoose.model('User'),
  async = require('async');

module.exports = {
  create: function create(students) {
    var dfrd = q.defer();

    async.map(students, function (student, callback) {
      var user = new User(student.user);
      user.save(function (err) {
        if (err) return dfrd.reject(err);

        var stud = new Student({
          user: user
        });

        stud.save(function(err){
          if(err) return dfrd.reject(err);
          callback(null, stud);
        });
      });
    }, function (err, result) {
      if (err) return dfrd.reject(err);
      dfrd.resolve(result);
    });

    return dfrd.promise;
  },
  update: function update(students, data) {
    var dfrd = q.defer();

    async.map(students, function (stud, callback) {
      stud.update({$set: data}, {new: true}, function (err, stud) {
        if (err) dfrd.reject(err);
        callback(null, stud);
      });
    }, function (err, results) {
      if (err) return dfrd.reject(err);
      dfrd.resolve(results);
    });

    return dfrd.promise;
  }
};
