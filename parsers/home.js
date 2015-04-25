/**
 * Created by ebreland on 4/25/15.
 */

var cheerio = require('cheerio'),
    parseLoadouts = require('../parsers/loadouts'),
    _ = require('underscore');

module.exports = function (response, callback) {
    var $ = cheerio.load(response.body),
        data = response.data,
        tributeHeader = $('input[value="tributeHeader"]');

    // parse name
    data.name = '';

    // parse tokens
    data.tokens = parseInt($('div#persistHomeConquestPlateOpen').text().replace('Tokens:', '').trim());

    // parse  loadouts
    data.loadouts = parseLoadouts($);

    // parse energy
    data.energy = parseInt($('span#energy_current_value').text());

    // parse stamina
    data.stamina = parseInt($('span#stamina_current_value').text());

    // parse health
    data.health = parseInt($('span#health_current_value').text());

    // parse level and xp needed to level
    data.level = 0;
    data.xpNeeded = parseInt($('div#header_player_xp_needed strong').text());

    // parse demi-blessing available
    if (tributeHeader.length === 0) {
        data.demiBlessing = {
            available: false
        };
    } else {
        data.demiBlessing = {
            available: true,
            default: tributeHeader.parent('form').find('input[name="symbol"]').attr('value')
        };
    }

    // parse item archive active
    data.itemArchiveActive = $('input[value="enableItemArchiveBonusHeader"]').length === 0;

    // parse resources collected
    data.resourcesCollected = $('input[value="conquestResourceCollectHeader"]').length === 0;

    // parse hero crystal collected
    data.heroCrystalCollected = $('input[value="conquestDemiCollectHeader"]').length === 0;

    data.success = data.xpNeeded > 0;

    callback(null, data);
};