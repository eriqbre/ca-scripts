/**
 * Created by ebreland on 4/27/2015.
 */

var cheerio = require('cheerio'),
	battleData = require('../../../config/battle-data'),
    config = require('../config'),
    toons = require('../../../parsers/tower-toons'),
    _ = require('lodash');

module.exports = function (options, response, callback) {
	var $ = cheerio.load(response.body),
		data = battleData(options),
        activeTower = $('div#guild_battle_section_log_list').attr('class').replace('show_', ''),
        allies = options.form.view_allies ? true:false;

	data.isInBattle = $('input[value="enter_battle"]').length === 0;

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
	data.defender.id = options.form.defender_guild_id;

    // parse opponent status 100/100

    // parse tower
    var toons =

    data.towers = config.towers;

	callback(null, data)
};