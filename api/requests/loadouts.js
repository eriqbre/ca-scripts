/**
 * Created by ebreland on 4/12/15.
 * setup automated jobs for setting loadouts before each battle
 */

var async = require('async'),
    setToon = require('../../config/toon'),
    changeLoadout = require('../../requests/loadouts'),
    login = require('../../requests/login'),
    configService = require('../../services/configs'),
    roleService = require('../../services/roles'),
    toonService = require('../../services/toons'),
    _ = require('underscore');

module.exports = function (app) {
    var _this = this;

    app.get('/api/requests/loadouts/:id', function (request, response) {
        async.waterfall([
            // get the proper role
            function (callback) {
                roleService.getRole({identifier: request.params.id}, function (error, data) {
                    if (error) callback(error, null);

                    callback(error, {role: data});
                });
            },
            // get the toons
            function (options, callback) {
                toonService.getToons({roles: options.role._id}, function (error, data) {
                    if (error) callback(error, null);

                    callback(error, {role: options.role, toons: data});
                });
            },
            // get the configs for each toon
            function (options, callback) {
                async.map(options.toons, function (toon, callback) {
                    configService.getConfig({toon: toon._id, role: options.role}, function (error, data) {
                        if (error) callback(error, null);
                        if (!data) { // remove any toon that isn't configured for battle loadouts
                            _.without(options.toons, toon);
                            callback(error, null);
                        } else {
                            toon.config = data.data;
                            callback(error, toon);
                        }
                    });
                }, function (error, data) {
                    callback(error, options);
                });
            },
            // login each toon
            function (options, callback) {
                async.map(options.toons, function (toon, callback) {
                    login({email: toon.email, password: toon.password}, function (error, data) {
                        if (error) callback(error, null);

                        toon.data = data;
                        callback(null, {toon: toon, jar: data.jar});
                    });
                }, function (error, data) {
                    // all done with each toon
                    callback(error, options);
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