var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function (email, password, done) {
    console.log("TCL: email, password", email, password)
    User.findOne({ email: email }).then(function (user) {
        // console.log("TCL: user", user)
        if (!user || !user.validPassword(password)) {
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
        } else {
            console.log("user.validPassword(password)", user.validPassword(password));
        }

        return done(null, user);
    }).catch(done);
}));