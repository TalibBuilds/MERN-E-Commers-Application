const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 15,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    location: {
        latitude: Number,
        longitude: Number,
        city: String,
        fullAddress: String,
    },
    role: {
        type: String,
        enum: ['customer', 'restorant', 'admin'],
        default: 'customer'
    }
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
