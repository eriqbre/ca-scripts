/**
 * Created by ebreland on 4/19/15.
 */

var cheerio = require('cheerio'),
    _ = require('underscore');

module.exports = function (response, callback) {
    var $ = cheerio.load(response.body),
        data = response.data,
        forms = [],
        date = new Date(),
        actions = $("div:contains('ACTIONS LEFT:')").last().find('span'),
        timeLeft = $('input[id="monsterTickerSecs"]').val(),
        classContainers = $('#your_guild_member_list_1 > div img[src*="/class_"]'), classes = [],
        levelContainers = $("div[style='padding:5px 0 0 20px;font-size:11px;']:contains('Level:')"),
        levels = [];

    data.toons = [];

	// parse the id of the attacker

	// parse the remaining tokens of the attacker
	data.tokens = parseInt($('div#persistHomeConquestPlateOpen').text().replace('Tokens:', '').trim());

    // parse classes
    _.each(classContainers, function (container) {
        classes.push($(container).attr('title').toLowerCase());
    });

    // parse the level containers
    _.each(levelContainers, function (levelContainer) {
        var text = $(levelContainer).text().split('Status');
        if (text.length === 2) {
            var level = text[0].split(':')[1].trim();
            if (level) {
                levels.push(parseInt(level));
            }
        }
    });

    // parse all the toons in the tower
    _.each($('#your_guild_battle_section_battle_list_fort form'), function (container, i) {
        var $container = $(container),
            form = {
                inputs: []
            }, data = [];

        _.each($container.find('input[type="hidden"]'), function (input) {
            var $input = $(input),
                input = {
                    name: $input.attr('name'),
                    value: $input.val()
                };

            form.inputs.push(input);
        });

        forms.push(form);
    });

    // parse the remaining health of each toon in the tower
    _.each($('img[title="Health"]').parent('div'), function (container, i) {
        var $container = $(container),
            healthRatio = $container.text().trim(),
            health = healthRatio.split('/');

        if (health.length == '2')
            data.toons.push({
                health: parseInt(health[0]),
                class: classes[i],
                level: levels[i],
                form: forms[i]
            });
    });

    // parse the time and actions remaining
    if (actions) {
        data.actionsRemaining = parseInt(actions.text());
    }

    if (timeLeft) {
        data.timeRemaining = date.setSeconds(date.getSeconds() + parseInt(timeLeft));
    }

    callback(null, data);
};