/**
 * Created by ebreland on 4/19/15.
 */

var app = require('../app'),
	Task = require('../models/task'),
	_ = require('underscore'),
	cronJob = require('cron').CronJob,
	cronfigs = require('../config/cron'),
	async = require('async'),
	changeLoadout = require('../requests/loadouts'),
	login = require('../requests/sequences/login-sequence'),
	setToon = require('../config/toon');

app.listen(3023, function () {
    console.log('running');

	cronfigs.map(function (cronfig) {
		new cronJob({
			cronTime: cronfig.time,
			onTick: function () {
				var _this = this,
					id = cronfig.type;

				async.waterfall([
					// execute login sequence for battle loadouts
					function (callback) {
						login({id: id}, function (error, data) {
							callback(null, data);
						});
					},
					// change loadouts for battle
					function (options, callback) {
						async.map(options.toons, function (toon, callback) {
                            changeLoadout(toon, id, function (error, data) {
								if (data) {
									toon.data.loadouts = data.loadouts;
									console.log(id + ' loadout changed for ' + toon.name);
								}

								callback(null, toon);
							});
						}, function (error, data) {
							// all done with each toon
							callback(error, options);
						});
					}
				], function (error, data) {
					// end here
					var result = [],
						task;
					_.each(data.toons, function (toon) {
						result.push(setToon(toon));
					});

					console.log(id + ' loadouts task has completed');
					task = new Task({name: 'loadouts', type: id, data: result});
					task.save(function (error, response) {
						if (error) console.log(error);
					});
				});
			},
			start: true,
			timeZone: 'America/New_York'
		});
	});

	// heartbeat for the dynos, let's try it without first :)
	/*
	 ["40 * * * *", "10 * * * *"].map(function (keepAlive) {
	 new cronJob({
	 cronTime: keepAlive,
	 onTick: function () {
	 console.log('keep alive');
	 },
	 start: true,
	 timeZone: 'America/New_York'
	 });
	 });*/
});

