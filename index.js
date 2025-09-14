'use strict';

let mongoose = require('mongoose');
let application = require('./application');

mongoose.connect('mongodb://localhost:27017/parcial_uno').then(
    () => {
        console.log('Connected to the database successfully.');

        application.listen(6969, () => {
            console.log('Server is running on port 6969');
        });
    },
    (error) => {
        console.error('Error connecting to the database: ', error);
    }
);