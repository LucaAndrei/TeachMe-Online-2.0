var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

// router.use('/users', function (req, res, next) {
//     console.log(">>>>>>>>>>>>>>>>>")
//     // console.log("TCL: req", req)
//     console.log("TCL: req.payload", req.payload)
//     console.log("TCL: req.body", req.body)
//     // console.log("TCL: res", res)
//     next();
// })
//add middleware for admin
router.get('/users', auth.required, function (req, res, next) {
    console.log("TCL: req", req.body, req.payload)
    User.findById(req.payload.id).then(function (user) {
        // console.log("TCL: user", user)
        if (!user || user.role !== 'superadmin') { return res.sendStatus(401); }
        User.find({
            email: { "$ne": user.email }
        }).then(function (users) {
            // console.log("TCL: users", users)
            return res.json(
                users.map(user => user.toProfileJSON())
            )
        })
    }).catch(next);
});

router.get('/users/activate/:registrationToken', function (req, res, next) {
    console.log("req registration", req.params.registrationToken)
    User.findOne({
        registrationToken: req.params.registrationToken
    }).then(function (user) {
        // console.log("TCL: user", user)
        if (!user || user.isValidated) { return res.sendStatus(401); }

        return res.json(user.toProfileJSON());
    }).catch(next);
});

router.put('/user', auth.required, function (req, res, next) {
    console.log("PUT /user > req.body", req.body.user, req.payload.id)
    // cannot update user email this way
    User.findOne({
        email: req.body.user.email
    }).then(function (user) {
        console.log("PUT /user", user)
        if (!user) { return res.sendStatus(401); }

        // only update fields that were actually passed...
        if (req.body.user.username && typeof req.body.user.username !== 'undefined') {
            user.username = req.body.user.username;
        }
        if (req.body.user.email && typeof req.body.user.email !== 'undefined') {
            user.email = req.body.user.email;
        }
        if (req.body.user.image && typeof req.body.user.image !== 'undefined') {
            user.image = req.body.user.image;
        }
        if (req.body.user.password && typeof req.body.user.password !== 'undefined') {
            user.setPassword(req.body.user.password);
        }
        if (req.body.user.role && typeof req.body.user.role !== 'undefined') {
            user.role = req.body.user.role;
        }

        return user.save().then(function () {
            return res.json({ user: user.toProfileJSON() });
        });

    }).catch(next);
});

router.put('/user/activate', function (req, res, next) {
    console.log("PUT /user/activate", req.body.user, req.body.user.email)
    User.findOne({
        email: req.body.user.email
    }).then(function (user) {
        console.log("PUT /user/activate > 1", user)
        if (!user) { return res.sendStatus(401); }
        user.setPassword(req.body.user.password);
        user.isValidated = true;
        user.role = 'admin';
        user.save().then(function () {
            return res.json({ user: user.toJSON() });
        }).catch(next);

    }).catch(next);
});

router.post('/users/login', function (req, res, next) {
    console.log("POST /users/login", req.body)
    if (!req.body.user.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }

    if (!req.body.user.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }

    passport.authenticate('local', { session: false }, function (err, user, info) {
        console.log("POST /users/login > passport", req.body)
        console.log("POST /users/login >: err, user, info", err, user, info)
        if (err) { return next(err); }
        console.log("POST /users/login >>> isValidated", user.isValidated);
        if (user) {
            user.token = user.generateJWT();
            user.isOnline = true;
            // TODO - de verificat daca merge asa aici
            return user.save().then(function () {
                return res.json({ user: user.toJSON() });
            }).catch(next);
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
});

router.post('/users', function (req, res, next) {
    console.log("POST /users", req.body)
    var user = new User();

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
    user.isValidated = true;
    user.isOnline = true;

    user.save().then(function () {
        return res.json({ user: user.toJSON() });
    }).catch(next);
});


module.exports = router;