// package dependencies
const jwt = require("jsonwebtoken");

// middleware
const asyncHandler = require("./async");

// utils
const ErrorResponse = require("../utils/errorResponse");

// model
const User = require("../models/User");

exports.protect = asyncHandler(async(req, res, next) => {
    let token;
    
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }
    
    if(!token) {
        return next(new ErrorResponse('Not Authorized', 401));
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded.id);
        
        next();
    } catch(err) {
        return next(new ErrorResponse('Not Authorized', 401));
    }
});

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `Role ${req.user.role} not authorized`,
                    403
                )
            );
        }
        next();
    };
};