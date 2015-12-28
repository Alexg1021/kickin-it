'use strict';

var mongoose = require('mongoose');

var AthleteSchema = new mongoose.Schema({
    position: String,
    notes: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    attendance: [{type: mongoose.Schema.Types.ObjectId, ref: 'Attendance'}],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted_at: {type: Date, default: null}
});

mongoose.model('Athlete', AthleteSchema);
