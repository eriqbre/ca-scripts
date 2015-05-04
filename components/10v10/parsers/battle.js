/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio'),
    config = require('../config'),
    toonParser = require('../../../parsers/tower-toons');

module.exports = function (options, response, callback) {
    var $ = cheerio.load(response.body),
        battleData = require('../../../config/battle-data')(options),
        data = battleData.castle,
        enterBattleInput = $('input[name="action"][value="enter_battle"]'),
        containers = $('.guild_battle_container'),
        side = options.form.view_allies ? 'attacker' : 'defender',
        towerNumber = options.form.sel_pos || '1';

    data.id = options.form.battle_id;
    data.isInBattle = enterBattleInput.length === 0;
    data.towers = config.towers;

	data.meta = {
		side: side,
		tower: 't' + towerNumber
	};

	toonParser(options, $(containers), function (error, toons) {
		data[data.meta.side].towers[data.meta.tower] = battleData.tower({name: data.meta.tower, toons: toons});
	});

    callback(null, data);
};