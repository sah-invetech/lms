var config = require('./environment');
module.exports = {

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://'+config.ipaddress+':'+config.port+'/auth/google/callback'
    }

};
