import HttpError from '../utils/HtppError.js';

export function handleError(err, req, res, next){

    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Server error";

    res.status(statusCode).json({
        status: "Error",
        code: statusCode,
        message : errorMessage
    });
}

