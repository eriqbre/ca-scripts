/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio'),
    battleData = require('../../../config/battle-data'),
    config = require('../config');

module.exports = function (options, response, callback) {
    var $ = cheerio.load(response),
        data = battleData(options),
        enterBattleInput = $('input[name="action"][value="enter_battle"]');

    data.id = options.form.battle_id;
    data.isInBattle = enterBattleInput.length === 0;
    data.towers = config.towers;

    callback(null, data);
};