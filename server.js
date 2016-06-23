var express = require('express');
var config = require('./config/environment');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

mongoose.connect(config.mongo.uri);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

var app = express();
app.use(express.static(__dirname + '/public'));         // set the static files location
app.use('/public', express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/app', express.static(__dirname + '/public/app'));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);
require('./app/route')(app);

app.listen(config.port, function() {
  console.log('app listen on ' + config.ipaddress + ' ' + config.port);
});
