/**
 * Created by Bridget on 5/2/2015.
 */

var _ = require('lodash'),
    $ = require('cheerio');

module.exports = function (options, $containers) {
    var toons = [],
        battleData = require('../config/battle-data')(options);

    _.each($containers, function (container, i) {
        var $container = $(container),
            toon = battleData.toon;

        // parse name
        var nameContainer = $container.find('div:not(:has(div)):has(img[src*="guild_bp_"])');
        if (nameContainer.length === 1) {
            toon.name = $(nameContainer).text().trim().split('.')[1].trim()
        }

        // parse level
        var levelContainer = $container.find('div:not(:has(div)):contains("Level")');
        if (levelContainer.length === 1) {
            var levelContainerArray = $(levelContainer).text().trim().split('Status');

            if (levelContainerArray.length === 2) {
                toon.level = parseInt($(levelContainerArray[0]).trim().split(':')[1]);
            }
        }

        // parse health and battle points
        var healthAndBattlePointsContainer = $container.find('div:not(:has(div)):has(img[title="Health"])');
        if (healthAndBattlePointsContainer.length > 0) {
            var healthAndBattlePointsText = $(healthAndBattlePointsContainer).text().trim(),
                healthAndBattlePointsArray = healthAndBattlePointsText.split('Battle');

            if (healthAndBattlePointsArray.length === 2) {
                var currentHealth = parseInt(healthAndBattlePointsArray[0].split('/')[0]),
                    totalHealth = parseInt(healthAndBattlePointsArray[0].split('/')[1]),
                    battlePoints = parseInt(healthAndBattlePointsArray[1]);

                toon.health.current = currentHealth;
                toon.health.total = totalHealth;
                toon.points = battlePoints;
            }
        }

        // todo: finish parsing input fields
        _.each($container.find('div[class^="action_panel"] form input'), function (input) {
            var $input = $(input),
                input = {
                    name: $input.attr('name'),
                    value: $input.val()
                };

            toon.form.inputs.push(input);
        });

        toons.push(toon);
    });

    return toons;
};