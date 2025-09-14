'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let routerMovies = require('./routes/movies');
let routerUsers = require('./routes/users');
let application = express();


application.use(bodyParser.json());
application.use(routerMovies);
application.use(routerUsers);


module.exports = application;