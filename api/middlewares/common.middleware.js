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

export function validateId(req, res, next){
    try {
        const id = parseInt(req.params.id, 10);

        if (!id || id < 1){
            throw new HttpError("Not found", 404);
        }

        next();
    }
    catch(error) {
        next(error);
    }
}