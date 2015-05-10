/**
 * Created by ebreland on 4/24/2015.
 */

module.exports = function (options) {
	return {
		healthPerActionTarget: (options.healthPerActionTarget || 4000),
		ceiling: (options.ceiling || 950),
		floor: (options.floor || 50),
		healthPercentage: (options.healthPercentage || 90)
	}
};