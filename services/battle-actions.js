/**
 * Created by ebreland on 4/27/2015.
 * execute auto-actions for facebook battle
 */

var async = require('async'),
    battleSetup = require('../components/configure'),
    loadout = require('../requests/loadouts'),
    login = require('../requests/sequences/login-sequence'),
    Task = require('../models/task'),
    _ = require('lodash');

module.exports = function (options, callback) {
    var task = new Task({name: 'battle-actions', type: options.role, data: []}),
        battle = battleSetup(options),
        trigger = function (options, callback) {
            battle.action(options, function (error, data) {
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
        // log in anyone participating in this role
        function (callback) {
            login({id: options.role}, function (error, data) {
                // add the now-logged-in toons to the options object and pass it along
                callback(null, _.extend(options, {toons: data.toons}));
            });
        },
        // hit the battle home page and grab the enter information (this is the page with the big red Join Battle button)
        function (options, callback) {
            async.mapSeries(options.toons, function (toon, callback) {
                battle.home({jar: toon.jar}, function (error, data) {
                    // update options with data from the main call, this will tell us how to get into the battle
		            toon.battle = data;
		            callback(null, options);
                });
            }, function (error, data) {
                callback(null, options);
            });
        },
        // enter the battle page
        function (options, callback) {
            async.mapSeries(options.toons, function (toon, callback) {
                battle.enter({jar: toon.jar, id: toon.battle.id, battle: toon.battle}, function (error, data) {
                    callback(null, _.extend(toon.battle, data));
                });
            }, function (error, data) {
                callback(null, options);
            });
        },
        // if needed, click to enter battle
        function (options, callback) {
            async.mapSeries(_.filter(options.toons, function (toon) {
                return !toon.data.isInBattle;
            }), function (toon, callback) {
                battle.join({jar: toon.jar, battle: toon.battle}, function (error, data) {
                    callback(null, _.extend(toon, {battle: data}));
                });
            }, function (error, data) {
                callback(null, options);
            });
        },
        // get tower data for both sides
        function (options, callback) {
            async.mapSeries(options.toons, function (toon, callback) {
                async.mapSeries(toon.battle.towers, function (tower, callback) {
                    battle.tower({jar: toon.jar, tower: tower, battle: toon.battle}, function (error, data) {
                        // add tower data to the toon
                        callback(error, _.extend(toon, {battle: data}));
                    });
                }, function (error, data) {
                    // all tower data compiled
                    callback(error, options);
                });

            }, function (error, data) {
                // tower data compiled for all toons
                callback(error, options);
            });
        },
        // execute actions
        function (options, callback) {
            async.mapSeries(options.toons, function (toon, callback) {
                // for each toon, execute the series of actions defined in the config
                async.map(toon.configs['fbb-actions']['actions'], function (action, callback) {
                    // for each action, execute the following scripts which could include loadout changes
                    async.waterfall([
                        // if the action has a loadout requirement and the loadout is different from the currently selected one
                        function (callback) {
                            // todo: defined the selected loadout
                            if (action.loadout && !toon.data.loadouts) {
                                loadouts({jar: toon.jar, loadout: action.loadout}, function (error, data) {
                                    // todo: update toon with data from loadout request
                                    callback(null, _.extend(toon, {}));
                                });
                            } else {
                                callback(null, toon);
                            }
                        },
                        // trigger the defined action
                        function (toon, callback) {
                            trigger(toon, function (error, data) {
                                callback(null, _.extend(toon, {}));
                            });
                        }
                    ])
                }, function (error, data) {
                    // all config actions complete for a given toon
                    callback(null, toon);
                });
            }, function (error, data) {
                // all actions complete for all toons
            });
        }
    ], function (error, data) {
        // waterfall complete, everything is done
        if (task.data.length > 0) {
            // only save the task if something was executed
            task.save(function (error) {
                callback(null, data);
            });
        } else {
            callback(null, data);
        }
    });
};