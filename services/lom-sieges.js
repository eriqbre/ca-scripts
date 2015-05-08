/**
 * Created by ebreland on 5/8/2015.
 * look for land of mist conquest monsters, join them if necessary and siege automatically
 */

var async = require('async'),
	setup = require('../components/configure'),
	lom = require('../requests/sequences/lom-check'),
	login = require('../requests/sequences/login-sequence'),
	Task = require('../models/task'),
	_ = require('lodash');

module.exports = function (options, callback) {
	console.log('starting lom-siege worker');
	var task = new Task({name: options.role, type: options.role, data: []}),
		actions = setup(options),
	// recursive action trigger
		trigger = function (options, callback) {
			// trigger collection
			actions.siege({
				jar: options.jar,
				role: options.role,
				toon: options.toon
			}, function (error, data) {
				// if successful then break out
				if (data.success()) {
					callback(null, data);
				} else {
					// otherwise, try again
					trigger(options, callback);
				}
			});
		};

	async.waterfall([
		// log in anyone participating in this role
		function (callback) {
			// check to see if we need to log people in, this service could be called from another service that already logged us in
			if (!options.toons) {
				login({id: options.role}, function (error, data) {
					// add the now-logged-in toons to the options object and pass it along
					callback(null, _.extend(options, {toons: data.toons}));
				});
			}
		},
		// hit the conquest home page and find all the conquest monsters available
		function (options, callback) {
			lom({}, function (error, data) {
				callback(error, data);
			});
		},
		// for each toon, see if a siege is available for each monster
		function (options, callback) {
			async.map(options.toons, function (toon, callback) {
				async.map(options.monsters, function (monster, callback) {
					async.waterfall([
						// request the monster and check for an available siege
						function (callback) {

						},
						// if available, siege monster
						function (data, callback) {

						}
					], function (error, data) {
						// done with this monster
						callback(null, options);
					});
				}, function (error, data) {
					// all monsters complete for a given toon
					callback(null, options);
				});
			}, function (error, data) {
				// all toons complete
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