/**
 * Created by ebreland on 4/11/15.
 * handle logging into ca and parsing the response
 */

var login = require('../../requests/login'),
    Toon = require('../../models/toon');

module.exports = function (app) {

    // log into ca
    app.route('/requests/login/:email')
        .get(function (request, response) {
            // get the credentials for email requested
            Toon.findOne({email: request.params.email}, function (error, toon) {
                // trigger login request
                login(toon, function (error, response) {
                    response.json(response.data)
                });
            });
        });
};