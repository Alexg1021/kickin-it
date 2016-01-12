'use strict';

var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    name: String,
    description: String,
    meetings: [String],
    notes: String,
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    deleted_at: {type: Date, default: null}
});

mongoose.model('Group', GroupSchema);
