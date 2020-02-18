var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../auth');
var postmark = require("postmark");
var crypto = require('crypto');

var client = new postmark.ServerClient("3b2acd2a-d0ba-42b0-9675-f1f44239ec18");


router.post('/', auth.required, function (req, res, next) {
    console.log("TCL: req.body", req.body)
    User.findById(req.payload.id).then(function (user) {
        // console.log("TCL: user", user)
        if (!user) { return res.sendStatus(401); }

        console.log("req.body", req.body);

        client.sendEmail({
            "From": "foxiti5877@mailnet.top",
            "To": "foxiti5877@mailnet.top",
            "Subject": "da 1 leu sa nu te bat",
            "TextBody": "hatz trosc"
        }, function(err, res) {
            if(err) {
                return next(err);
            }
            return res.json();
        });

        // parola e adresa de email. probabil fara @
    }).catch(next);
});

router.post('/registration-link', function(req, res, next) {
    var user = new User();

    user.username = req.body.email.split('@')[0];
    user.email = req.body.email;
    user.registrationToken = crypto.randomBytes(16).toString('hex');
    console.log("REGISTRATION-LINK TCL: user", user)
    client.sendEmail({
        "From": "foxiti5877@mailnet.top",
        "To": req.body.email,
        "Subject": "Activate your account",
        "TextBody": "" + user.registrationToken
    }, function(err, res) {
        if(err) {
            return next(err);
        }
        return res.json();
    });
})

module.exports = router;

