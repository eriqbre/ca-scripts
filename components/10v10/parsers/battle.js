/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio'),
    config = require('../config'),
    toonParser = require('../../../parsers/tower-toons');

module.exports = function (options, response, callback) {
    var $ = cheerio.load(response.body),
        battleData = require('../../../config/battle-data')(options),
        data = battleData.tower,
        enterBattleInput = $('input[name="action"][value="enter_battle"]'),
        containers = $('.guild_battle_container');

    data.id = options.form.battle_id;
    data.isInBattle = enterBattleInput.length === 0;
    data.towers = config.towers;
    var toons = toonParser(options, $(containers));

    callback(null, data);
};