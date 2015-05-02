/**
 * Created by ebreland on 4/28/15.
 */

var tvtAction = require('../components/10v10/requests/action'),
    tvtEnter = require('../components/10v10/requests/enter'),
    tvtHome = require('../components/10v10/requests/home'),
    tvtJoin = require('../components/10v10/requests/join'),
    tvtTower = require('../components/10v10/requests/tower'),
    hvhAction = require('../components/100v100/requests/action'),
    hvhEnter = require('../components/100v100/requests/enter'),
    hvhHome = require('../components/100v100/requests/home'),
    hvhJoin = require('../requests/100v100-join'),
    hvhTower = require('../components/100v100/requests/tower'),
    fbbAction = require('../components/fbb/requests/action'),
    fbbEnter = require('../components/fbb/requests/enter'),
    fbbHome = require('../components/fbb/requests/home'),
    fbbJoin = require('../requests/fbb-join'),
    fbbTower = require('../components/fbb/requests/tower');

module.exports = function (options) {
    switch (options.role) {
        case '10v10-actions':
            return {
                action: tvtAction,
                enter: tvtEnter,
                home: tvtHome,
                tower: tvtTower
            };
        case '100v100-actions':
            return {
                action: hvhAction,
                enter: hvhEnter,
                home: hvhHome,
                tower: hvhTower
            };
        case 'fbb-actions':
            return {
                action: fbbAction,
                enter: fbbEnter,
                home: fbbHome,
                tower: fbbTower
            };
    }
};