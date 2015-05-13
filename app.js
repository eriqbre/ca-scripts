/**
 * Created by ebreland on 4/11/15.
 */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cleanup = require('./services/cleanup'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
	mongoStore = require('connect-mongo')(session),
    morgan = require('morgan'),
//rollbar = require('rollbar'),
    db = require('./config/db');

mongoose.connect(db.url);

// configure the server
app.use(errorHandler());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/*json'}));
app.use(bodyParser.urlencoded({extended: true, type: 'application/x-www-form-urlencoded'}));
//app.use(rollbar.errorHandler('948d2b80d7b542d09891c9e0a984fda3'));
app.use(session({
    secret: 'win-win-will-be-a-success',
    key: 'sid',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 1 * 24 * 60 * 60
    })
}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// allow cross domain requests
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    response.header('Access-Control-Expose-Headers', 'Access-Token');

    if ('OPTIONS' == request.method) {
        response.send(200);
    } else {
        next();
    }
});

//rollbar.handleUncaughtExceptions('948d2b80d7b542d09891c9e0a984fda3', { });
// set up api endpoints
require('./api/api.routes')(app);

exports = module.exports = app;