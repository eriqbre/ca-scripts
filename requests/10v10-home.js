/**
 * Created by ebreland on 4/18/15.
 * request to view the 10v10 home page
 */

var parser = require('../parsers/10v10-home'),
	request = require('../requests/base'),
	routes = require('../config/routes'),
	form = require('../config/forms/10v10-home');

module.exports = function (options, callback) {
	options.url = routes.tvtHome;
	options.form = form(options);

	request(options, function (error, response) {
		parser(options, response, function (error, data) {
			callback(error, data);
		});
	});
};