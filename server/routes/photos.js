const express = require('express');
const router = express.Router();

let FavPhoto = require('../models/favPhoto');

router.post('/favourite', (req,res) => {
    FavPhoto.addPhoto(req.body, (err, photo) => {
        if(err) res.status(500).send({message: 'error while adding photo'});
        res.send({message: 'photo added'});
    });
});

router.get('/favourite/:userID', (req,res) => {
    FavPhoto.getPhotos(req.params.userID, (err, photos) => {
        if(err) res.status(500).send({message: 'error while adding photo'});
        res.send(photos);
    });
});

router.delete('/favourite/:photoURL', (req,res) => {
    FavPhoto.removePhoto(req.params.photoURL, (err) => {
        if(err) res.status(500).send({message: 'error while deleting photo'});
        res.send({message: 'photo deleted'});
    });
});

module.exports = router;