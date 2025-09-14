'use strict';

let jwt = require('jwt-simple');
let moment = require('moment');

let secret = 'rO837pED7G`]yuq_gt#%U';

function generateToken(user) {
    let payload = {
        sub: user._id,
        name: user.name,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(15, 'minutes').unix(),
    }

    return jwt.encode(payload, secret);
}

function validateToken(req, response, nextStep){
    try{
        let token = req.headers.authorization;
        let cleanToken = token.replace('Bearer ', '');

        let payload = jwt.decode(cleanToken, secret);

        if (payload.exp <= moment().unix()){
            return response.status(401).send({message: 'The token has expired.'});
        }

        req.header.userId = payload.sub; // nos permite conocer el id del usuario en la cabecera
        nextStep();
    }
    catch(error){
        return response.status(401).send({message: 'Invalid token.'});
    }
}

function getRoleFromToken(token) {
    try {
        let cleanToken = token.replace('Bearer ', '');
        let payload = jwt.decode(cleanToken, secret);
        return payload.rol
    } catch (error) {
        return null;
    }   
}

module.exports = {
    generateToken,
    validateToken,
    getRoleFromToken
}