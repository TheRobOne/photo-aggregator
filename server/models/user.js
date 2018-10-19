const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user Schema
const UserSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

let User = module.exports = mongoose.model('users', UserSchema);

module.exports.findUser = (email, callback) => {
    User.findOne(email, callback);
}

module.exports.addUser = (user, callback) => {
    User.create(user, callback);
}