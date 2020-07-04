// package dependencies
const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Department name required"]
    },
    dept_id: {
        type: String,
        required: [true, "Department ID required"]
    },
    dept_type: {
        type: String,
        required: [true, "Department type required"],
        enum: ['fire', 'ems']
    }
});

module.exports = mongoose.model('Department', DepartmentSchema);