'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    username: String,
    password: String,
    rol: String,
})

module.exports = mongoose.model('users', UserSchema);
