/**
 * Created by ebreland on 5/5/2015.
 */

var async = require('async'),
	battleSetup = require('../components/configure'),
	loadouts = require('../requests/loadouts'),
	login = require('../requests/sequences/login-sequence'),
	Task = require('../models/task'),
	_ = require('lodash');

module.exports = function (options, callback) {
	console.log('starting battle-collect worker for ' + options.role);
	var task = new Task({name: 'battle-collect', type: options.role, data: []}),
		battle = battleSetup(options),
		trigger = function (options, callback) {
			// trigger collection
			battle.collect({
				battle: options.battle,
				jar: options.jar,
				role: options.role,
				toon: options.toon
			}, function (error, data) {
				// if successful this should be false
				if (!data.isCollectAvailable) {
					callback(null, data);
				} else {
					// if true, that means we tripped or some other stupid error
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
			async.map(options.toons, function (toon, callback) {
				battle.home({jar: toon.jar, role: options.role, toon: toon}, function (error, data) {
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
			async.map(options.toons, function (toon, callback) {
				battle.enter({jar: toon.jar, id: toon.battle.id, battle: toon.battle}, function (error, data) {
					callback(null, _.extend(toon.battle, data));
				});
			}, function (error, data) {
				callback(null, options);
			});
		},
		// get tower data, we'll use this to figure out if the toon has a threshold for favor point collecting.
		function (options, callback) {
			async.map(_.filter(options.toons, function (toon) {
				// only bother doing this with toons that have an fp-threshold defined
				return toon.battle.isOver && toon.configs[options.role] && toon.configs[options.role]['fp-threshold'];
			}), function (toon, callback) {
				async.map(_.filter(toon.battle.towers, function (tower) {
					return tower.view_allies;
				}), function (tower, callback) {
					battle.tower({jar: toon.jar, tower: tower, battle: toon.battle}, function (error, data) {
						// add tower data to the toon only if it doesn't already exist
						toon.battle[data.meta.side].towers[data.meta.tower] = data[data.meta.side].towers[data.meta.tower];
						callback(error, toon);
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
		// trigger collection, if available
		function (options, callback) {
			async.map(_.filter(options.toons, function (toon) {
				return toon.battle.isCollectAvailable;
			}), function (toon, callback) {
				trigger({toon: toon, battle: toon.battle, role: options.role, jar: toon.jar}, function (error, data) {
					task.data.push({name: toon.name});
					callback(null, data);
				});
			}, function (error, data) {
				callback(null, options);
			});
		}
	], function (error, data) {
		// save task data if there is any
		if (task.data.length > 0) {
			task.save(function (error) {
				callback(null, data);
			});
		} else {
			callback(null, data);
		}
	});
};