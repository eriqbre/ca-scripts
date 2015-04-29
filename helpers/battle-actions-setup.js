/**
 * Created by ebreland on 4/28/15.
 */

var tvtAction = require('../requests/10v10-action'),
    tvtEnter = require('../requests/10v10-enter'),
    tvtTower = require('../requests/10v10-tower'),
    tvtHome = require('../requests/10v10-tower'),
    hvhAction = require('../requests/100v100-action'),
    hvhEnter = require('../requests/100v100-enter'),
    hvhHome = require('../requests/100v100-enter'),
    hvhTower = require('../requests/100v100-tower'),
    fbbAction = require('../requests/fbb-action'),
    fbbEnter = require('../requests/fbb-enter'),
    fbbHome = require('../requests/fbb-enter'),
    fbbTower = require('../requests/fbb-tower');

module.exports = function (role) {
    switch (role) {
        case '10v10':
            return {
                action: tvtAction,
                enter: tvtEnter,
                home: tvtHome,
                tower: tvtTower
            };
        case '100v100':
            return {
                action: hvhAction,
                enter: hvhEnter,
                home: hvhHome,
                tower: hvhTower
            };
        case 'fbb':
            return {
                action: fbbAction,
                enter: fbbEnter,
                home: fbbHome,
                tower: fbbTower
            };
    }
};