/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio'),
	battleData = require('../../../config/battle-data'),
	config = require('../config');

module.exports = function (options, response, callback) {
	var $ = cheerio.load(response.body),
		data = battleData(options),
		attackerGuildId = $('input[name="attacker_guild_id"]'),
		defenderGuildId = $('input[name="defender_guild_id"]'),
	    enterBattleInput = $('input[name="action"][value="enter_battle"]');

	if (attackerGuildId) {
		data.attacker.id = attackerGuildId.val();
	}

	if (defenderGuildId) {
		data.defender.id = defenderGuildId.val();
	}

	data.isInBattle = enterBattleInput.length === 0;

	if (options.form && options.form.battle_id) {
		data.id = options.form.battle_id;
	}

	data.towers = config.towers;

	callback(null, data);
};