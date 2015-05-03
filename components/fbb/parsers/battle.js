/**
 * Created by ebreland on 4/27/2015.
 */

var cheerio = require('cheerio'),
    config = require('../config'),
    toonParser = require('../../../parsers/tower-toons');
    _ = require('lodash');

module.exports = function (options, response, callback) {
	var $ = cheerio.load(response.body),
        battleData = require('../../../config/battle-data')(options),
        data = battleData.castle,
        enterBattleInput = $('input[name="action"][value="enter_battle"]'),
        containers = $('.guild_battle_container'),
        side = options.form.view_allies ? 'attacker' : 'defender',
        towerNumber = options.form.sel_pos || '1';

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

    data.meta = {
        side: side,
        tower: 't' + towerNumber
    };

    toonParser(options, $(containers), function (error, toons) {
        data[data.meta.side].towers.push(battleData.tower({name: data.meta.tower, toons: toons}));
    });

    data.towers = config.towers;

	callback(null, data)
};