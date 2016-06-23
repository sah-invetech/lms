var User = require('../models/user.model');

exports.login = function(req, res) {
  console.log('req.body',req.body);  
console.log('req.params',req.params);
console.log('req.query',req.query);
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
