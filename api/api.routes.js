/**
 * Created by ebreland on 4/11/15.
 */

module.exports = function (app) {
    // function for handling authentication on secure routes
    isAuthenticated = function (request, response, next) {
        console.log('check for authenticated user');
        next();
    };

    // global middleware
    app.use('/api', function (request, response, next) {
        console.log(request.url);
        next();
    });

    // api routes
    require('./routes/toons')(app);

    // request routes
    require('./requests/login')(app);

    // catchall for any unhandled route
    app.get('*', function (request, response) {
        response.sendfile('index.html');
    });
};