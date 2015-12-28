'use strict';

var mongoose = require('mongoose');

var AttendanceSchema = new mongoose.Schema({
    presence: {type: Boolean, default: false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    athletes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Athlete'}],
    date: String,
    notes: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted_at: {type: Date, default: null}
});

mongoose.model('Attendance', AttendanceSchema);
