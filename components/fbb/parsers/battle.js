/**
 * Created by ebreland on 4/27/2015.
 */

var cheerio = require('cheerio'),
	battleData = require('../../../config/battle-data');

module.exports = function (options, response, callback) {
	var $ = cheerio.load(response.body),
		data = battleData(options);

	data.isInBattle = $('input[value="enter_battle"]').length > 0;

	if (data.isInBattle) {
        // parse tokens and timeToNextToken

        // parse toon health

        // parse toon activity total

        // parse buffs
    }
    // parse time remaining

    // parse allies status 100/100
	data.attacker.id = options.form.attacker_guild_id;

    // parse opponent name
	data.defender.name = $('div:contains("Opponent")').text().split(':')[1];
	data.defender.id = options.form.defender_guild_id;

    // parse opponent status 100/100

    // parse tower


	callback(null, data)
};