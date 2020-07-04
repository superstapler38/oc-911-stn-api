// package dependencies
const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    note_type: {
        type: String,
        enum: ['fire', 'ems'],
        required: [true, 'Type required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    department: {
        type: mongoose.Schema.ObjectId,
        ref: 'Department'
    },
    start: {
        type: Date,
        required: [true, 'Start date/time required'],
        default: Date.now
    },
    expires: {
        type: Date,
        required: [true, 'End date/time required']
    },
    note: {
        type: String,
        required: [true, 'Note text required']
    },
    auth: {
        type: String,
        required: [true, 'Authority required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Note', NoteSchema);