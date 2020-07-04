// package dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose= require("mongoose");

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: [true, 'User ID required']
    },
    name: {
        first: {
            type: String,
            required: [true, 'First name required']
        },
        last: {
            type: String,
            required: [true, 'Last name required']
        }
    },
    email: {
        type: String,
        required: [true, 'Email address required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Invalid email address'
        ]
    },
    role: {
        type: String,
        enum: ['user', 'supervisor', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// sign JWT and return
UserSchema.methods.getSignedJWT = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// generate and hash password reset token
// TODO

module.exports = mongoose.model('User', UserSchema);