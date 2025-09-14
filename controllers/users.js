'use strict';

let User = require('../models/users');
let token = require('../helpers/auth');
let bcrypt = require('bcryptjs');

function createUser(req, response) {
    let salt = bcrypt.genSaltSync(15);

    let newUser = new User();
    newUser.username = req.body.username;
    newUser.password = bcrypt.hashSync(req.body.password, salt);
    newUser.rol = req.body.rol;

    if (newUser.rol != 'admin' && newUser.rol != 'user') {
        return response.status(400).send({ message: 'The role must be either <admin> or <user>.' });
    }

    newUser.save().then(
        (savedUser) => {
            response.status(201).send({
                message: 'User created successfully',
                user: savedUser
            });
        },
        (error) => {
            response.status(500).send({
                message: 'Error saving the user to the database.',
                error: error
            });
        }
    );
}

function loginUser(req, response) {
    User.findOne({'username': req.body.username}).then(
        (userFound) => {

            if (!userFound) {
                return response.status(404).send({message: 'User not found.'});
            }

            if (bcrypt.compareSync(req.body.password, userFound.password)) {
                response.status(200).send({
                    message: 'User logged in successfully.',
                    token: token.generateToken(userFound)
                });
            }
            else {
                response.status(401).send({message: 'Invalid password.'});
            }
        },
        (error) => {
            response.status(500).send({
                message: 'Error while logging the user.',
                error: error
            });
        }
    );
}
module.exports = {
    createUser,
    loginUser
};