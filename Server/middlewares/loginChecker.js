const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require('../models/user');


/**
 * Middleware for checking user authentication and decoding JWT tokens.
 * 
 * This middleware function that verifies the presence of a valid JWT token
 * It decodes the token, checks its validity, and attaches
 * the decoded user information to the request object if successful. If the token is missing or invalid,
 * it returns an unauthorized request error.
 */


const loginChecker = asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized Request 0',
        });
        return;
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized Request 1',
        });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(401).json({
                status: 'fail',
                message: 'Unauthorized Request 2',
            });
        } else {
            req.user = decoded;
            next();
        }
    });
});


module.exports = {loginChecker};
