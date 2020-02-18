var router = require('express').Router();

router.use('/', require('./users'));
router.use('/emails', require('./emails'));
router.use('/messages', require('./chat-messages'));

router.use(function (err, req, res, next) {
console.log("api.indexjs TCL: err", err)
    if (err.name === 'ValidationError') {
        console.log("TCL: Object.keys(err.errors)", Object.keys(err.errors))
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function (errors, key) {
            console.log("TCL: key", key)
                errors[key] = err.errors[key].message;
                console.log("TCL: errors[key]", errors[key])
                console.log("TCL: err.errors[key].message", err.errors[key].message)

                console.log("TCL: errors", errors)
                return errors;
            }, {})
        });
    }

    return next(err);
});

module.exports = router;