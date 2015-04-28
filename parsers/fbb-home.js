/**
 * Created by ebreland on 4/27/2015.
 */

var cheerio = require('cheerio');

module.exports = function(options,response){
	var $ = cheerio.load(response.body),
		data = {
			defender_guild_id: $('input[name="defender_guild_id"]').attr('value')
		};

	return data;
};