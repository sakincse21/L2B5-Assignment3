"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError = (error, res, statusCode) => {
    const errorMessage = (error instanceof Error) ? error.message : "Something went wrong";
    res.status(statusCode).json({
        message: errorMessage,
        success: false,
        error
    });
};
exports.default = handleError;
