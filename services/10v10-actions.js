/**
 * Created by ebreland on 4/26/15.
 * use this script to trigger configured options in 10v10 battles
 */

var async = require('async'),
    action = require('../requests/10v10-action'),
    enter = require('../requests/10v10-enter'),
    loadout = require('../requests/loadouts'),
    login = require('../requests/sequences/login-sequence'),
    Task = require('../models/task'),
    _ = require('lodash');

module.exports = function (options, callback) {
    var role = '10v10-actions',
        task = new Task({name: role, type: role, data: []}),
        trigger = function (options, callback) {
            action(options, function (error, data) {
                // success is defined as the action being triggered, regardless of the success or failure of the action
                if (data.success) {
                    callback(error, data);
                } else {
                    // if we tripped, keep on trying
                    trigger(options, callback);
                }
            });
        };

    async.waterfall([
        // login any toons participating in the 10v10-actions roles
        function (callback) {
            login({id: role}, function (error, data) {
                callback(null, _.extend(options, {toons: data.toons}))
            });
        },
        // log everyone into battle
        function (options, callback) {
            async.map(options.toons, function (toon, callback) {
                // enter battle
                enter({id: toon.data.tvt.id, jar: toon.jar}, function (error, data) {
                    // update data for each toon
                    _.extend(toon.data.tvt, data);

                    callback(error, data);
                });
            }, function (error, data) {
                // done logging everyone into 10v10
                callback(null, options);
            });
        },
        // iterate the toons with 10v10 actions and trigger defined actions
        function (options, callback) {
            if (options.toons.length > 0) {
                async.mapSeries(_.filter(options.toons, function (toon) {
                    // return a list of toons that have defined actions in their configs
                    return toon.configs && toon.configs[role] && toon.configs[role].actions && toon.configs[role].actions.length > 0;
                }), function (toon, callback) {
                    // loop over actions and trigger, need recursive structure for tripping
                    async.mapSeries(toon.configs[role].actions, function (action, callback) {
                        async.waterfall([
                            // set loadouts, if the action specifies it and it's not already set properly
                            function (callback) {
	                            // todo: find the selected loadout
                                if (action.loadout && !toon.data.loadouts) {
                                    loadout({jar: toon.jar, loadout: action.loadout}, function (error, data) {
                                        callback(error, {});
                                    });
                                } else {
                                    callback(null, {});
                                }
                            },
                            // trigger action
                            function (options, callback) {
                                trigger({toon: toon, jar: toon.jar, action: action}, function (error, data) {
                                    // action completed
                                    task.data.push({name: toon.name, action: data.action.action, result: data.result}); // add to task

                                    callback(error, data);
                                });
                            }
                        ], function (error, data) {

                        });
                    }, function (error, data) {
                        // actions completed
                        toon.data.actions = data;
                        callback(error, options);
                    });
                }, function (error, data) {
                    // done with everything
                    callback(error, options);
                });
            } else {
                callback(null, {break: true});
            }
        },
        // next trigger any defined post-actions
        function (options, calblack) {
            if (options.toons.length > 0) {
                async.mapSeries(_.filter(options.toons, function (toon) {
                    // return a list of toons that have defined post-actions in their configs
                    return toon.configs && toon.configs[role] && toon.configs[role]['post-actions'];
                }), function (toon, callback) {
                    // loop over actions and trigger, need recursive structure for tripping
                    async.waterfall([
                        // change loadout, (if defined)
                        function (callback) {
                            if (toon.configs[role]['post-actions']['loadout']) {
                                loadout({
                                    jar: toon.jar,
                                    loadout: toon.configs[role]['post-actions']['loadout']
                                }, function (error, data) {
                                    callback(error, data);
                                });
                            } else {
                                callback(null, {});
                            }
                        }
                    ], function (error, data) {
                        // post-actions completed
                        callback(error, options);
                    });
                }, function (error, data) {
                    // done with everything
                    callback(error, options);
                });
            } else {
                callback(null, {break: true});
            }
        }
    ], function (error, data) {
        if (task.data.length > 0) {
            task.save(function (error) {
                console.log('10v10 actions complete');
                callback(error, data);
            });
        } else {
            console.log('no 10v10 actions taken');
            callback(error, data);
        }
    });
};