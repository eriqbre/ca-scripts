/**
 * Created by ebreland on 4/19/15.
 */

var app = require('../app'),
	async = require('async'),
	attack = require('../services/lom-actions');
	cronfigs = require('../config/cron'),
	cronJob = require('cron').CronJob,
	lom = require('../services/lom-check'),
	lomTower = require('../requests/lom-tower');

app.listen(3024, function () {
	console.log('running lom-action check');

	new cronJob({
		cronTime: cronfigs.lomActions,
		onTick: function () {
			async.waterfall([
				// login and check for lands under defense
				function (callback) {
					lom(function (error, data) {
						callback(error, data)
					});
				},
				function(options, callback){
					attack(options, function (error, data) {
						callback(null, data);
					});
				}
			], function (error, data) {
				console.log('lom-action check complete');
			});
		},
		start: true,
		timeZone: cronfigs.timeZone
	});
});

