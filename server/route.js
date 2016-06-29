var passport = require('passport');
var userCtrl = require('./controllers/user.controller');
var User = require('./models/user.model');

function isAuthenticated(req, res, next) {
    if (req.session.isLoggedIn)
        return next();

    res.status(403).end();
}

module.exports = function(app) {
    app.post('/server/user/login', userCtrl.login);
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/home',
            failureRedirect: '/'
        }));
    app.get('/server/user/logout', function(req, res) {
        console.log('logout called');
        req.logout();
        res.status(200).end();
    });
};
