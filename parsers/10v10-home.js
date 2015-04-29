/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio');

module.exports = function (options, response, callback) {
	var $ = cheerio.load(response),
		data = {

		};

	callback(null, data);
};