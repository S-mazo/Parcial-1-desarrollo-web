'use strict';

let express = require('express');
let router = express.Router();
let courseController = require('../controllers/movies');
let token = require('../helpers/auth');


router.post('/api/movies/create', token.validateToken, courseController.createMovie);
router.get('/api/movies/see', token.validateToken, courseController.seeMovies);
router.get('/api/movies/search/:price/:release_year', token.validateToken, courseController.searchMovies);


module.exports = router;
