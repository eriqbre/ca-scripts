/**
 * Created by ebreland on 4/18/15.
 * enter facebook battle
 */

var parser = require('../parsers/fbb-battle'),
	request = require('../requests/base'),
	routes = require('../config/routes'),
	form = require('../config/forms/fbb-action');

module.exports = function (options, callback) {
	options.url = routes.battle;
	options.form = form(options);

	request(options, function (error, response) {
		parser(options, response, function (error, data) {
			callback(error, data);
		});
	});
};