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
		battle = battleSetup(options);

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
				battle.home({jar: toon.jar, role: options.role, toon: toon}, function (error, data) {
					// update options with data from the main call, this will tell us how to get into the battle
					toon.battle = data;
					callback(null, options);
				});
			}, function (error, data) {
				callback(null, options);
			});
		},
		// trigger collection, if available
		function (options, callback) {
			async.map(_.filter(options.toons, function (toon) {
				return toon.battle.isCollectAvailable;
			}), function (toon, callback) {
				battle.collect({jar: toon.jar, battle: toon.battle}, function (error, data) {
					callback(null, data);
				});
			}, function (error, data) {
				callback(null, options);
			});
		}
	], function (error, data) {
		if (callback) {
			callback(null, data);
		}
	});
};