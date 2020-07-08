// package dependencies
const crypto = require("crypto");

// utils
const ErrorResponse = require("../utils/errorResponse");

// middleware
const asyncHandler = require("../middleware/async");

// models
const User = require("../models/User");

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async(req, res, next) => {
    const { fname, lname, uid, role, email, password } = req.body;
    
    if(!fname || !lname || !uid || !role || !email || !password) {
        return next(new ErrorResponse('Please complete required fields', 400));
    }
    
    const user = await User.create(req.body);
    sendTokenResponse(user, 200, res);
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async(req, res, next) => {
    const { uid, password } = req.body;
    
    if(!uid || !password) {
        return next(new ErrorResponse('Must provide user ID and password', 400));
    }
    
    const user = await User.findOne({ uid }).select('+password');
    
    if(!user) {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }
    
    const isMatch = await user.matchPassword(password);
    
    if(!isMatch) {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }
    
    sendTokenResponse(user, 200, res);
});

// @desc    Log user out and clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async(req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    
    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    
    if(!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password incorrect', 401));
    }
    
    user.password = req.body.newPassword;
    await user.save();
    
    sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
// TODO

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
// TODO

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJWT();
    
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    
    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
};