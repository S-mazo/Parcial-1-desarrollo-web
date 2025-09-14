'use strict';

let express = require('express');
let userController = require('../controllers/users');
let router = express.Router();


router.post('/api/users/register', userController.createUser);
router.post('/api/users/login', userController.loginUser);


module.exports = router;