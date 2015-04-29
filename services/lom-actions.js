/**
 * Created by ebreland on 4/23/15.
 */

var async = require('async'),
    login = require('../requests/sequences/login-sequence'),
    changeLoadout = require('../requests/loadouts'),
	lomConfigs = require('../config/lom-actions'),
    lomAttack = require('../requests/lom-attack'),
    landOfMistTower = require('../requests/lom-tower'),
	lomTowerSort = require('./sort-lom-defense-towers'),
    Task = require('../models/task'),
    _ = require('lodash');

module.exports = function (options, callback) {
    var _this = this, task = new Task({name: 'lom-actions', type: 'defend-lom', data: []}),
        actionsRemaining = 1000,
        role = 'lom-actions',
        attack = function (options, callback) {
            lomAttack(formAttack(options), function (error, data) {
                if (data.break) {
                    callback(null, options);
                } else {
                    var remainingTokens = 0,
                        tower = (options.tower || options.towersInDefense[0]),
	                    attacker = _.filter(options.toons, function (toon) {
		                    return toon.caId === data.attacker;
	                    })[0];

                    tower.actionsRemaining = data.actionsRemaining;
                    tower.timeRemaining = data.timeRemaining;
                    tower.toons = data.toons;

                    // after every attack, check remaining actions
                    actionsRemaining = data.actionsRemaining;

                    // update remaining tokens for the current attacker
	                attacker.data.tokens = data.tokens;

                    // update remaining tokens
                    _.each(options.toons, function (toon) {
                        if (toon.data && toon.data.tokens > 0)
                            remainingTokens += toon.data.tokens;
                    });

                    tower.totalHealth = 0;
                    _.each(tower.toons, function (toon) {
                        tower.totalHealth += toon.health;
                    });

                    console.log('ar: ' + actionsRemaining + '/ tr: ' + remainingTokens + ' / th: ' + tower.totalHealth + ' / health/action ' + (tower.healthPerAction || tower.totalHealth / actionsRemaining));
					task.data.push({
						toon: (attacker.name || ''),
						actionsRemaining: actionsRemaining,
						totalHealth: tower.totalHealth,
						healthPerAction: tower.healthPerAction
					});

	                // re-sort the towers
	                options = lomTowerSort(options);

	                // define a window of action
	                // actionsRemaining should be above the floor and below the ceiling
	                // healthPerAction should be less than the max
	                // healthRemaining should be less than the max % of totalHealth
                    if (actionsRemaining > lomConfigs.floor &&
	                    actionsRemaining < lomConfigs.ceiling &&
	                    tower.healthPerAction < lomConfigs.healthPerActionTarget &&
	                    (tower.totalHealth * (lomConfigs.healthPercentage/100)) > tower.healthRemaining &&
	                    remainingTokens > 0) {
                            --actionsRemaining;
                            attack(options, callback);
                    }
                    // once remaining actions hits a predetermined number, break out and end
                    else {
                        callback(null, options);
                    }
                }
            });
        },
        formAttack = function (options) {
            // if no tower is present, end it
            if (!(options.tower || options.towersInDefense[0])) {
                return {};
            }

            var availableTargets = (options.tower || options.towersInDefense[0]).toons,// from this, we need the toon.form
                availableAttackers = options.toons,// from this, we need the jar
                result = {
                    id: options.id || options.towersInDefense[0].slot,
                    form: {},
                    jar: {}
                };

            // targets - sort by cleric, highest level, health > 0
            availableTargets = _.select(availableTargets, function (toon) {
                return toon.health > 0;
            });
            availableTargets.sort(function (a, b) {
                switch (a.class) {
                    case 'cleric':
                        a.sort = 1;
                        break;
                    case 'warrior':
                        a.sort = 2;
                        break;
                    case 'mage':
                        a.sort = 3;
                        break;
                    case 'rogue':
                        a.sort = 4;
                        break;
                }
                switch (b.class) {
                    case 'cleric':
                        b.sort = 1;
                        break;
                    case 'warrior':
                        b.sort = 2;
                        break;
                    case 'mage':
                        b.sort = 3;
                        break;
                    case 'rogue':
                        b.sort = 4;
                        break;
                }

                return 2 * (a.sort > b.sort ? 1 : a.sort < b.sort ? -1 : 0) + 1 * (a.level < b.level ? 1 : a.level > b.level ? -1 : 0);
            });
            result.form = availableTargets[0].form;

            // attackers - sort by highest level, tokens > 0
            availableAttackers = _.select(availableAttackers, function (toon) {
                return toon.data.tokens > 0;
            });

            if (availableAttackers.length > 0) {
                availableAttackers.sort(function (a, b) {
                    return a.data.tokens > b.data.tokens;
                });
                result.jar = availableAttackers[0].jar;
                result.attacker = availableAttackers[0].caId;
            }

            return result;
        };

    async.waterfall([
        // execute login sequence for lom actions
        function (callback) {
            login({id: role}, function (error, data) {
                callback(null, _.extend(options, data));
            });
        },
        // change loadouts for any toons that have configs specified
        function (options, callback) {
            // filter list for only toons that have a loadout config
            async.map(_.filter(options.toons, function (toon) {
                return (toon.configs && toon.configs[role] && toon.configs[role]['loadout']) ? 1 : 0;
            }), function (toon, callback) {
                changeLoadout(toon, role, function (error, data) {
                    if (error) callback(error, null);
                    //toon.data.loadouts = data.loadouts;

                    callback(null, toon);
                });
            }, function (error, data) {
                // all done with each toon
                callback(error, options);
            });
        },
        // grab one of the toons and enter the tower to get data about the tower
        function (options, callback) {
            // if a tower was specified, then attack it
            //options.id = '1';
            if (options.id) {
                console.log('entering tower ' + options.id);
                landOfMistTower({id: options.id, jar: options.toons[0].jar}, function (error, data) {
                    if (error) callback(error, null);

                    options.tower = {
                        toons: data.toons,
                        actionsRemaining: data.actionsRemaining,
                        timeRemaining: data.timeRemaining
                    };

                    callback(null, options);
                });
            } else {
                // allow for multiple towers in defense at the same time
                console.log('multiple towers available for attack');

                callback(null, options);
            }
        },
        // attack the tower
        attack(options, callback)
    ], function (error, data) {
        if (callback) {
            callback(error, data);
        }
    });
};