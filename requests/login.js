/**
 * Created by ebreland on 4/11/15.
 * data must contain email, password
 */

var request = require('../requests/base'),
    form = require('../config/forms/login'),
    routes = require('../config/routes'),
    cheerio = require('cheerio');

module.exports = function (data, callback) {
    var _this = this,
        options = {
            url: routes.login,
            form: form(data)
        };

    request(options, function (error, response) {
        callback(error, _this.parse(response));
    });

    parse = function (response) {
        var $ = cheerio.load(response.body),
            data = response.data;

        // parse name
        data.name = '';

        // parse tokens
        data.tokens = 0;

        // parse  loadouts
        data.loadouts = [];

        // parse energy
        data.energy = 0;

        // parse stamina
        data.stamina = 0;

        // parse health
        data.health = 0;

        // parse level and xp needed to level
        data.level = 0;
        data.xpNeeded = $('div#header_player_xp_needed strong').text();

        // parse demi-blessing available
        data.demiBlessingAvailable = $('input[value="tributeHeader"]').length > 0;

        // parse item archive active
        data.itemArchiveActive = $('input[value="enableItemArchiveBonusHeader"]').length > 0;

        // parse resources collected
        data.resourcesCollected = $('input[value="conquestResourceCollectHeader"]').length > 0;

        // parse hero crystal collected
        data.heroCrystalCollected = $('input[value="conquestDemiCollectHeader"]').length > 0;

        return data;
    }
};