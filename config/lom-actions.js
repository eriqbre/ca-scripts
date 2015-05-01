/**
 * Created by ebreland on 4/24/2015.
 */

module.exports = function (options) {
	return {
		healthPerActionTarget: options.healthPerActionTarget || 3000,
		ceiling: options.ceiling || 950,
		floor: options.floor || 100,
		healthPercentage: options.healthPercentage || 93
	}
};