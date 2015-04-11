/**
 * Created by ebreland on 4/11/15.
 */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    db = require('./config/db'),
    port = process.env.PORT || 3010;

mongoose.connect(db.url);

// configure the server
app.use(errorHandler());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/*json'}));
app.use(bodyParser.urlencoded({extended: true, type: 'application/x-www-form-urlencoded'}));
app.use(session({
    secret: 'win-win',
    key: 'sid',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 360 * 5}
}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// allow cross domain requests
var allowCrossDomain = function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    response.header('Access-Control-Expose-Headers', 'Access-Token');

    if ('OPTIONS' == request.method) {
        response.send(200);
    } else {
        next();
    }
};

// set up api endpoints
require('./api/api.routes')(app);

app.listen(port);
console.log('go get em on port ' + port);

exports = module.exports = app;