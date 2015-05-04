/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio'),
	config = require('../config'),
	toonParser = require('../../../parsers/tower-toons'),
	_ = require('lodash');

module.exports = function (options, response, callback) {
	var $ = cheerio.load(response.body);

	process.nextTick(function () {
		var battleData = _.clone(require('../../../config/battle-data')(options), true),
			data = battleData.castle,
			attackerGuildId = $('input[name="attacker_guild_id"]'),
			defenderGuildId = $('input[name="defender_guild_id"]'),
			enterBattleInput = $('input[name="action"][value="enter_battle"]'),
			containers = $('.guild_battle_container'),
			side = options.form.view_allies ? 'attacker' : 'defender',
			towerNumber = options.form.sel_pos || '1';

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

		data.meta = {
			side: side,
			tower: 't' + towerNumber
		};

		toonParser(options, $(containers), function (error, toons) {
			data[data.meta.side].towers[data.meta.tower] = battleData.tower({name: data.meta.tower, toons: toons});
		});

		data.towers = config.towers;

		callback(null, data);
	});
};