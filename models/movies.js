'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MovieSchema = new Schema({
    "title": String,
    "director": String,
    "release_year": Number,
    "production_company": String,
    "price": Number,
});

module.exports = mongoose.model('movies', MovieSchema);
