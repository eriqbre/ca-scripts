/**
 * Created by ebreland on 4/27/2015.
 */

var cheerio = require('cheerio');

module.exports = function (response, callback) {
	var $ = cheerio.load(response.body),
		data = {
			attacker_guild_id: $('input[name="attacker_guild_id"]').attr('value'),
			battle_type: $('input[name="battle_type"]').attr('value'),
			defender_guild_id: $('input[name="defender_guild_id"]').attr('value')
		};

	callback(null, data);
};