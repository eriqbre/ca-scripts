/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio'),
	util = require('util');

module.exports = function (options, response, callback) {
	var $ = cheerio.load(response.body),
		identifier = util.format('div#team_content_%s input[name="battle_id"]', options.toon.configs[options.role]['squad']);
		data = {
			battle_id: $(identifier).attr('value')
		};

	callback(null, data);
};