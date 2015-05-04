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
	_ = require('lodash');

module.exports = function(options){
    var config = require('../config/lom-actions')(options);

	// filter out towers that are "safe"
	// if a towers remaining actions are > than the floor and < than the ceiling
	// and the health/action
	options.towersInDefense = _.select(options.towersInDefense, function(tower){
		return (tower.actionsRemaining > config.floor &&
		tower.actionsRemaining < config.ceiling &&
		tower.healthPerAction < config.healthPerActionTarget &&
		tower.totalHealth * (config.healthPercentage / 100) > tower.healthRemaining);
	});

	// prioritize lands
	options.towersInDefense = _.sortBy(options.towersInDefense, function (tower) {
		var sort;

		// this calculation allows us to measure how vulnerable towers are, relative to each other. the value represents
		// how much dmg per action is required to take the tower. the higher the number, the less vulnerable it is
		tower.healthPerAction = tower.totalHealth / tower.actionsRemaining;

		sort = tower.healthPerAction;
		return sort;
	});

	return options;
};