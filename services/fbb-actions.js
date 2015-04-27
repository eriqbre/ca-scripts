/**
 * Created by ebreland on 4/27/2015.
 * execute auto-actions for facebook battle
 */

var async = require('async'),
	attack = require('../requests/fbb-action'),
	fbbHome = require('../requests/fbb-home'),
	fbbEnter = require('../requests/fbb-enter'),
	loadout = require('../requests/loadouts'),
	login = require('../requests/sequences/login-sequence'),
	Task = require('../models/task'),
	towers = require('../config/towers'),
	_ = require('underscore');

modules.exports = function(options, callback){
	var role = 'fbb-actions',
		task = new Task({name: role, type: role, data: []}),
		trigger = function (options, callback) {
			attack(options, function (error, data) {
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
		function(callback){
			login({}, function(error, data){
				// add the now-logged-in toons to the options object and pass it along
				callback(null, _.extend(options, { toons: data.toons }));
			});
		},
		// hit the home page and see if they've logged in
		function(options, callback){
			async.mapSeries(options.toons, function(toon, callback){
				fbbHome({}, function(error, data){
					// todo: update toons with data from the main call
					callback(null, _.extend(toon, {}));
				});
			}, function(error, data){

			});
		},
		// if needed, log into battle
		function(options, callback){
			async.mapSeries(_.filter(options.toons, function(toon){
				// todo: return toons that aren't logged in yet
			}), function(toon, callback){
				fbbEnter({}, function(error, data){
					// todo: update the options object with battle information
					callback(null, _.extend(options, { battle: data.battle }));
				});
			}, function(error, data){

			});
		},
		// get tower data for both sides
		function(options, callback){
			// get data for all opponent and all allied towers
			async.map(_.select(towers, function(tower){
				return _.extend(tower, {
					defender_guild_id: options.defender_guild_id
				})
			}), function(tower, callback){
				// todo: update options with data from each tower
				callback(null, _.extend(options, {}));
			}, function(error, data){
				// all towers updated
				callback(null, options);
			});
		},
		// execute actions
		function(options, callback){
			async.mapSeries(options.toons, function(toon, callback){
				// for each toon, execute the series of actions defined in the config
				async.map(toon.configs['fbb-actions']['actions'], function(action, callback){
					// for each action, execute the following scripts which could include loadout changes
					async.waterfall([
						// if the action has a loadout requirement and the loadout is different from the currently selected one
						function(callback){
							// todo: defined the selected loadout
							if (action.loadout && !toon.data.loadouts){
								loadouts({jar: toon.jar, loadout: action.loadout}, function(error, data){
									// todo: update toon with data from loadout request
									callback(null, _.extend(toon, {}));
								});
							} else {
								callback(null, toon);
							}
						},
						// trigger the defined action
						function(toon, callback){
							trigger(toon, function(error, data){
								callback(null, _.extend(toon, {}));
							});
						}
					])
				}, function(error, data){
					// all config actions complete for a given toon
					callback(null, toon);
				});
			}, function(error, data){
				// all actions complete for all toons
			});
		}
	], function(error, data){
		// waterfall complete, everything is done
		if (task.data.length > 0){
			// only save the task if something was executed
			task.save(function(error){
				callback(null, data);
			});
		} else {
			callback(null, data);
		}
	});
};