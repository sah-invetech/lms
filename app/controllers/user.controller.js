var User = require('../models/user.model');

module.exports.login = function(req, res) {
  console.log('req.body',req.body);
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }, function(err, user) {
        if (user)
            res.redirect('/home');
        res.status(401).json({
            message: 'Invalid Login'
        });
    })
}
