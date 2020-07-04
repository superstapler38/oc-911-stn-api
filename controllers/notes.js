// utils
const ErrorResponse = require("../utils/errorResponse");

// middleware
const asyncHandler = require("../middleware/async");

// models
const Note = require("../models/Note");

// @desc    Get all notes
// @route   GET /api/v1/notes
// @access  Private
exports.getNotes = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Get single note
// @route   GET /api/v1/notes/:id
// @access  Private
exports.getNote = asyncHandler(async(req, res, next) => {
    const note = await Note.findById(req.params.id);
    
    res.status(200).json({
        success: true,
        data: note
    });
});

// @desc    Create new note
// @route   POST /api/v1/notes
// @access  Private
exports.createNote = asyncHandler(async(req, res, next) => {
    const note = await Note.create(req.body);
    
    res.status(200).json({
        success: true,
        data: note
    });
});

// @desc    Update note
// @route   PUT /api/v1/notes/:id
// @access  Private
exports.updateNote = asyncHandler(async(req, res, next) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    
    res.status(200).json({
        success: true,
        data: note
    });
});

// @desc    Delete note
// @route   DELETE /api/v1/notes/:id
// @access  Private
exports.deleteNote = asyncHandler(async(req, res, next) => {
    await Note.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
        success: true
    });
});