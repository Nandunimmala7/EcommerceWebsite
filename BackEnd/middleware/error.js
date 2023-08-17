const ErrorHandler = require("../utils/errorHandler");

// errorMiddleware.js
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong mongodb error
    if(err.name === 'CastError'){
        const message = `resource not found${err.path}`;
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};