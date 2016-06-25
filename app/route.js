var passport = require('passport');
var userCtrl = require('./controllers/user.controller');
var User = require('./models/user.model');

function isAuthenticated(req, res, next) {
    if (req.session.isLoggedIn)
        return next();

    res.status(403).end();
}

module.exports = function(app) {
    app.post('/login', userCtrl.login);
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/home',
            failureRedirect: '/'
        }));
};
