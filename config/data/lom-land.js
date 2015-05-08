/**
 * Created by ebreland on 5/8/2015.
 */

var _ = require('lodash');

module.exports = function (options) {
	var result = {
		name: '',
		defenders: 0,
		iron: 0,
		lumber: 0,
		expires: 0
	};

	switch (options.type) {
		case "protected":
			_.extend(result, {
				remaining: 0
			});
			break;
		case "defense":
			_.extend(result, {
				remaining: 0
			});
			break;
		case "monsters":
			_.extend(result, {
				monsters: []
			});
			break;
	}

	return result;
};