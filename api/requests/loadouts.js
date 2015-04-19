/**
 * Created by ebreland on 4/12/15.
 * setup automated jobs for setting loadouts before each battle
 */

var async = require('async'),
    setToon = require('../../config/toon'),
    changeLoadout = require('../../requests/loadouts'),
    login = require('../../requests/sequences/login-sequence'),
    _ = require('underscore');

module.exports = function (app) {
    var _this = this;

    app.get('/api/requests/loadouts/:id', function (request, response) {
        async.waterfall([
            // execute login sequence for battle loadouts
            function (callback) {
                login({id: request.params.id}, function (error, data) {
                    callback(null, data);
                });
            },
            // change loadouts for battle
            function (options, callback) {
                async.map(options.toons, function (toon, callback) {
                    changeLoadout(toon, function (error, data) {
                        if (error) callback(error, null);
                        toon.data.loadouts = data.loadouts;

                        callback(null, toon);
                    });
                }, function (error, data) {
                    // all done with each toon
                    callback(error, options);
                });
            }
        ], function (error, data) {
            // end here
            var result = [];
            _.each(data.toons, function (toon) {
                result.push(setToon(toon));
            });

            response.json(result);
        });
    });
};