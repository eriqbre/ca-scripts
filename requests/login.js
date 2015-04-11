/**
 * Created by ebreland on 4/11/15.
 */

var request = require('request'),
    routes = require('../config/routes'),
    cheerio = require('cheerio');

module.exports = function (credentials) {
    var form = {
        platform_action: 'CA_web3_login',
        player_email: credentials.email,
        player_password: credentials.password
    };

    request
        // make request for the login page
        .post(routes.login, form, function (error, response, body) {
            console.log('good response from ' + routes.login);

            // parse the response
            var $ = cheerio.load(response.body),
                success = $('form[action="connect_login.php"]').length === 0;

            console.log('login result is ' + success);
        })
        // handle any request errors
        .on('error', function (error) {
            console.log(error);
        });
};