var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    image: { type: String, default: 'https://static.productionready.io/images/smiley-cyrus.jpg' },

    hash: String,
    salt: String,

    isValidated: { type: Boolean, default: false },
    registrationToken: String,

    role: { type: String, default: 'user' },
    socketId: String,
    isOnline: Boolean
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

UserSchema.methods.generateRegistrationToken = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

UserSchema.methods.toJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        role: this.role,
        isValidated: this.isValidated,
        isOnline: this.isOnline
    };
};

UserSchema.methods.toProfileJSON = function () {
    return {
        username: this.username,
        email: this.email,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        role: this.role,
        isValidated: this.isValidated,
        isOnline: this.isOnline
    };
};

UserSchema.methods.toContactJSON = function () {
    return {
        username: this.username,
        email: this.email,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        isOnline: this.isOnline
    };
};

mongoose.model('User', UserSchema);