var router = require('express').Router();
var mongoose = require('mongoose');
var ChatMessage = mongoose.model('ChatMessage');
var auth = require('../auth');
var postmark = require("postmark");
var crypto = require('crypto');

var client = new postmark.ServerClient("3b2acd2a-d0ba-42b0-9675-f1f44239ec18");


router.post('/', auth.required, function (req, res, next) {
    console.log("TCL: req.body", req.body.from, req.body.to)
    if (req.body.to === '') {
        console.log('get messages error');
    } else {
        try {
            ChatMessage.find({
                '$or': [
                    {
                        '$and': [
                            {
                                'to': req.body.to
                            }, {
                                'from': req.body.from
                            }
                        ]
                    }, {
                        '$and': [
                            {
                                'to': req.body.from
                            }, {
                                'from': req.body.to
                            }
                        ]
                    },
                ]
            }).then(function (messages) {
                console.log("TCL: messages", messages)
                return res.json(messages);
            });


            // const messagesResponse = await queryHandler.getMessages({
            //     userId: userId,
            //     toUserId: toUserId
            // });
            // response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            //     error: false,
            //     messages: messagesResponse
            // });
        } catch (error) {
            console.log("get messages error 1", error);
            // response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
            //     error : true,
            //     messages : CONSTANTS.USER_NOT_LOGGED_IN
            // });
        }
    }
    // User.findById(req.payload.id).then(function (user) {
    //     // console.log("TCL: user", user)
    //     if (!user) { return res.sendStatus(401); }

    //     console.log("req.body", req.body);

    //     client.sendEmail({
    //         "From": "foxiti5877@mailnet.top",
    //         "To": "foxiti5877@mailnet.top",
    //         "Subject": "da 1 leu sa nu te bat",
    //         "TextBody": "hatz trosc"
    //     }, function(err, res) {
    //         if(err) {
    //             return next(err);
    //         }
    //         return res.json();
    //     });

    //     // parola e adresa de email. probabil fara @
    // }).catch(next);
});

module.exports = router;

