'use strict';

var q = require('q'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = {
    create: function create(data) {
        var dfrd = q.defer();

        var user = new User(data);
        user.save(function (err) {
            if (err) return dfrd.reject(err);
            dfrd.resolve(user);
        });

        return dfrd.promise;
    }
};
