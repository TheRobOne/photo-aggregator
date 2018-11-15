const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user Schema
const favPhotoSchema = new Schema({
    fullPhotoURL: {
        type: String,
        required: true
    },
    smallPhotoURL: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorURL: {
        type: String,
        required: true
    },
    authorAvatar: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

let FavPhoto = module.exports = mongoose.model('favPhoto', favPhotoSchema);

module.exports.getPhotos = (userID, callback) => {
    const query = {
        userID: userID
    }
    FavPhoto.find(query, callback);
}

module.exports.addPhoto = (photo, callback) => {
    FavPhoto.create(photo, callback);
}

module.exports.removePhoto = (fullPhotoURL, callback) => {
    FavPhoto.deleteOne(fullPhotoURL, callback);
}