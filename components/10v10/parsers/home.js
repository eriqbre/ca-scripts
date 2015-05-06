/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio'),
	util = require('util');

module.exports = function (options, response, callback) {
	var $ = cheerio.load(response.body),
		squad = parseInt(options.toon.configs[options.role]['squad']) - 1,
		identifier = util.format('div#team_content_%d input[name="battle_id"]', squad);
		data = {
			id: $(identifier).attr('value')
		};

	callback(null, data);
};