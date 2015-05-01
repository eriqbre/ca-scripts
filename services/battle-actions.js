/**
 * Created by ebreland on 4/27/2015.
 * execute auto-actions for facebook battle
 */

var async = require('async'),
    battleSetup = require('../helpers/battle-actions-setup'),
    loadout = require('../requests/loadouts'),
    login = require('../requests/sequences/login-sequence'),
    Task = require('../models/task'),
    towers = require('../config/towers'),
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
                    callback(null, _.extend(options, {
                        defender_guild_id: data.defender_guild_id
                    }));
                });
            }, function (error, data) {
                callback(null, options);
            });
        },
        // enter the battle page
        function (options, callback) {
            async.mapSeries(options.toons, function (toon, callback) {
                battle.tower({jar: toon.jar, defender_guild_id: options.defender_guild_id}, function (error, data) {
                    // todo: update toons with data from the main call, including present battle stats and data about the first tower
                    callback(null, _.extend(options, {battle: data}));
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
                battle.enter({jar: toon.jar, defender_guild_id: options.defender_guild_id}, function (error, data) {
                    callback(null, _.extend(options, {battle: data}));
                });
            }, function (error, data) {
                callback(null, options);
            });
        },
        // get tower data for both sides
        function (options, callback) {
            // get data for all opponent and all allied towers
            async.map(_.select(towers, function (tower) {
                return _.extend(tower, {
                    defender_guild_id: options.defender_guild_id
                })
            }), function (tower, callback) {
                // todo: create options object for calling individual towers
                battle.tower({jar: options.toons[0].jar, tower: tower}, function (error, data) {
                    callback(null, _.extend(tower, data));
                });
            }, function (error, data) {
                // all towers updated
                callback(null, options);
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