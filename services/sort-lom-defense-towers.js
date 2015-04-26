/**
 * Created by ebreland on 4/24/2015.
 * this service takes an array of towers currently in defense and filters and sorts them into a prioritized sequence
 * for attacks.
 *
 * currently we divide the total health by the actions remaining to come up with a value which represents the
 * amount of damage required per action remaining to steal the land. the lower the number, the more vulnerable
 * the tower.
 *
 * todo: i'll need to account for time remaining also
 */

var lomActions = require('../config/lom-actions'),
	_ = require('underscore');

module.exports = function(options){
	// filter out towers that are "safe"
	options.towersInDefense = _.filter(options.towersInDefense, function(tower){
		return tower.actionsRemaining > lomActions.floor;
	});

	// get total health of each tower
	_.each(options.towersInDefense, function(tower){
		tower.totalHealth = 0;
		_.each(tower.toons, function(toon){
			tower.totalHealth += toon.health;
		});
	});

	// prioritize lands
	options.towersInDefense = _.sortBy(options.towersInDefense, function (tower) {
		var sort;
		// take time remaining into account
		total.healthPerAction = tower.totalHealth / tower.actionsRemaining;

		sort = healthPerAction;
		return sort;
	});

	return options;
};