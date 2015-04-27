/**
 * Created by ebreland on 4/18/15.
 * enter facebook battle home page. this page is only necessary to get id of the defending guild
 */

var parser = require('../parsers/fbb-home'),
	request = require('../requests/base'),
	routes = require('../config/routes');

module.exports = function (options, callback) {
	options.url = routes.fbbHome;

	request(options, function (error, response) {
		parser(options, response, function (error, data) {
			callback(error, data);
		});
	});
};