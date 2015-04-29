/**
 * Created by ebreland on 4/18/15.
 * request to opt-in to a 100v100 battle
 */

var parser = require('../parsers/100v100-battle'),
	request = require('../requests/base'),
	routes = require('../config/routes'),
	form = require('../config/forms/100v100-enter');

module.exports = function (options, callback) {
	options.url = routes.index;
	options.form = form(options);

	request(options, function (error, response) {
		parser(options, response, function (error, data) {
			callback(error, data);
		});
	});
};