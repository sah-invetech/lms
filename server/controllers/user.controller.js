var User = require('../models/user.model');
var _ = require('lodash');

function _validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


module.exports.login = function(req, res) {
    if (req.body.username == '' || req.body.username == '' || !_validateEmail(req.body.username)) {
        res.status(401).json({
            message: 'Invalid email or password'
        });
    } else {

        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (user) {
                if (!user.validPassword(req.body.password)) {
                    res.status(401).json({
                        message: 'Incorrect Password'
                    });
                } else {
                    req.session.isLoggedIn = true;
                    req.session.user = { username: user.username };
                    res.status(200).json({ isLoggedIn: true, username: req.body.username });
                }
            } else
                res.status(401).json({
                    message: 'Invalid Login'
                });
        })
    }

}
