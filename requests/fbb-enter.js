/**
 * Created by ebreland on 4/18/15.
 * enter facebook battle
 */

var parser = require('../parsers/fbb-battle'),
	request = require('../requests/base'),
	routes = require('../config/routes'),
	form = require('../config/forms/fbb-enter');

module.exports = function (options, callback) {
	options.url = routes.fbbEnter;
	options.form = form(options);

	request(options, function (error, response) {
		parser(options, response, function (error, data) {
			callback(error, data);
		});
	});
};