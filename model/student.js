'use strict';

var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    position: String,
    notes: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    attendance: [{type: mongoose.Schema.Types.ObjectId, ref: 'Attendance'}],
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted_at: {type: Date, default: null}
});

mongoose.model('Student', StudentSchema);
