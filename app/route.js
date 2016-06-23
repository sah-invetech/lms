var passport = require('passport');
var userCtrl = require('./controllers/user.controller');
var User = require('./models/user.model');
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
