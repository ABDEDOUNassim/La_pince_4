import Joi from 'joi';

import jwt from 'jsonwebtoken';
import 'dotenv/config';
import HttpError from '../utils/HtppError.js';

// regex for email and password checking 


export function validateToken(req, res, next) {

    try {
        const bearerToken = req.headers.authorization;

        if(!bearerToken || !bearerToken.startsWith("Bearer ")) {
            throw new HttpError("Authorization token missing or invalid", 401);
        }

        const token = bearerToken.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                throw new HttpError("Authorization token missing or invalid", 401);
            }
            // if the token is valid, we can put the user_id from the decoded token in the req for the next middlewares
            req.user_id = decoded.user_id;
        });

        next();
    }
    catch(error) {
        next(error);
    }
}