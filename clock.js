/**
 * Created by ebreland on 4/19/15.
 */

var util = require('util'),
	cronJob = require('cron').CronJob,
	loadouts = require('./workers/loadouts'),
	preBattleTimes = require('./config/pre-battle-times'),
	preBattleJob = {
		name: 'pre-battle loadouts',
		onTick: loadouts('pre-battle', 3021),
		start: false,
		timeZone: 'America/New_York'
	}, preBattleJobs = {},
	battleDefenseTimes = require('./config/battle-defense-times'),
	battleDefenseJob = {
		name: 'battle-defense loadouts',
		onTick: loadouts('battle-defense', 3022),
		start: false,
		timeZone: 'America/New_York'
	}, battleDefenseJobs = {};

var test = new cronJob({
	name: 'testing',
	onTick: function () {
		console.log('testing');
	},
	cronTime: '8 * * * *',
	id: 'test',
	start: true,
	timeZone: 'America/New_York'
});

preBattleTimes.map(function (time) {
	preBattleJob.cronTime = time.time;
	preBattleJob.id = time.type;
	preBattleJobs[preBattleJob.id] = new cronJob(preBattleJob);
	console.log(util.format('%s cronjob scheduled at %s on timezone %s',
		preBattleJob.name,
		preBattleJob.cronTime,
		preBattleJob.timeZone));
});

battleDefenseTimes.map(function (time) {
	battleDefenseJob.cronTime = time.time;
	battleDefenseJob.id = time.type;
	//battleDefenseJobs[battleDefenseJob.id] = new cronJob(battleDefenseJob);
	console.log(util.format('%s cronjob scheduled at %s on timezone %s', battleDefenseJob.name, battleDefenseJob.cronTime, battleDefenseJob.timeZone));
});
