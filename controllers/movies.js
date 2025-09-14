'use strict';

let Movie = require('../models/movies');
let Auth = require('../helpers/auth');

function createMovie(req, response) {
    let token = req.headers.authorization;
    let rol = Auth.getRoleFromToken(token);

    if (rol == "admin"){
        let requestBody = req.body;

        if (!requestBody || Object.keys(requestBody).length === 0) {
            return response.status(400).send({ message: 'Request body cannot be empty.' });
        }

        let title = requestBody.title;
        let director = requestBody.director;
        let release_year = requestBody.release_year;
        let production_company = requestBody.production_company;
        let price = requestBody.price;

        if (title == null || title.trim() == '' ||
            director == null || director.trim() == '' ||
            release_year == null || release_year <= 1800 ||
            production_company == null || production_company.trim() == '' ||
            price == null || price < 0) {
                response.status(400).send({ message: 'One or more required fields were not provided or are invalid.' });
        }
        else{

            let newMovie = new Movie();

            newMovie.title = title;
            newMovie.director = director;
            newMovie.release_year = release_year;
            newMovie.production_company = production_company;
            newMovie.price = price;


            newMovie.save().then(
                (savedMovie) =>{
                    response.status(201).send({
                        message: 'Movie created successfully', 
                        course: savedMovie
                    })
                },
                (error) => {
                    response.status(500).send({
                        message: 'Error saving the movie to the database.',
                        error: error
                    })
                }

            )
        }
    }
    else {
        response.status(403).send({message: 'You do not have permission to perform this action.'});
    }
}



function seeMovies(req, response) {
    let token = req.headers.authorization;
    let rol = Auth.getRoleFromToken(token);

    if (rol != "user" && rol != "admin"){ // Antes teníamos la comprobación de if (!rol) pero así se le permitía el acceso a cualquier rol. ahora verificamos que sea admin o user
        console.log('No role found in token');
        return response.status(401).send({message: 'You do not have permission to perform this action.'});
    }

    Movie.find({}).then(
        (movies) => {
            response.status(200).send({ 
                message: 'Movies retrieved successfully.',
                movies: movies
            });
        },
        (error) => {
            response.status(500).send({
                message: 'Error retrieving movies from the database.',
                error: error
            });
        }
    );
}


function searchMovies(req, response) {
    let token = req.headers.authorization;
    let rol = Auth.getRoleFromToken(token);

    if (rol != "user" && rol != "admin"){   
        return response.status(401).send({message: 'You do not have permission to perform this action.'});
    }

    let maxPrice = req.params.price;
    let minYear = req.params.release_year;

    if (maxPrice == null || maxPrice < 0 ||
        minYear == null || minYear < 1800) {
            response.status(400).send({ message: 'One or more required fields were not provided or are invalid.' });
    }
    else {
        Movie.find({ price: { $lte: maxPrice }, release_year: { $gte: minYear } }).then(
            (movies) => {
                response.status(200).send({
                    message: 'Movies with prices lower than or equal to' + maxPrice + ' and released after ' + minYear + ' retrieved successfully.',
                    movies: movies
                });
            },
            (error) => {
                response.status(500).send({
                    message: 'Error retrieving movies from the database.',
                    error: error
                });
            }
        );
    }
}    

module.exports = {
    createMovie,
    searchMovies,
    seeMovies
};
