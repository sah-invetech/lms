var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV || 'development',

    // Root path of server
    root: path.normalize(__dirname + '/../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ipaddress: process.env.IP || '127.0.0.1',

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'tvm-secret'
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + all.env + '.js') || {});
