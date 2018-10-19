const express = require('express');
const router = express.Router();

let User = require('../models/user');

router.post('/login/:userID', (req,res) => {
    User.findUser({userID: req.params.userID}, (err, user) => {
        if(err) throw err;
        if(!user){
            User.addUser(req.body, (err, user) => {
                if(err) throw err;
                res.json(user);
            });
        }
        res.json(user);
    });
});

module.exports = router;