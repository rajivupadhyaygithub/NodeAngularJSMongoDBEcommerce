var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    }
});

var Users = module.exports = mongoose.model('users', productSchema);