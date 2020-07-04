// utils
const ErrorResponse = require("../utils/errorResponse");

// middleware
const asyncHandler = require("../middleware/async");

// models
const Department = require("../models/Department");

// @desc    Get all Departments
// @route   GET /api/v1/Departments
// @access  Private - Admin
exports.getDepartments = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Get single Department
// @route   GET /api/v1/Departments/:id
// @access  Private - Admin
exports.getDepartment = asyncHandler(async(req, res, next) => {
    const department = await Department.findById(req.params.id);
    
    res.status(200).json({
        success: true,
        data: department
    });
});

// @desc    Create Department
// @route   POST /api/v1/Departments
// @access  Private - Admin
exports.createDepartment = asyncHandler(async(req, res, next) => {
    const department = await Department.create(req.body);
    
    res.status(200).json({
        success: true,
        data: department
    });
});

// @desc    Update Department
// @route   PUT /api/v1/Departments/:id
// @access  Private - Admin
exports.updateDepartment = asyncHandler(async(req, res, next) => {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    
    res.status(200).json({
        success: true,
        data: department
    });
});

// @desc    Delete Department
// @route   DELETE /api/v1/Departments/:id
// @access  Private - Admin
exports.deleteDepartment = asyncHandler(async(req, res, next) => {
    await Department.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
        success: true
    });
});