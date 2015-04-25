/**
 * Created by ebreland on 4/18/15.
 */

var _ = require('underscore');

module.exports = function (data) {
    var toon = {
        demiBlessing: data.data.demiBlessing,
        energy: data.data.energy,
        health: data.data.health,
        heroCrystalCollected: data.data.heroCrystalCollected,
        id: data.caId,
        itemArchiveActive: data.data.itemArchiveActive,
        level: data.data.level,
        loadout: _.find(data.data.loadouts, function (loadout) {
            return loadout.selected === true;
        }),
        name: data.name,
        resourcesCollected: data.data.resourcesCollected,
        stamina: data.data.stamina,
        tokens: data.data.tokens,
        xpNeeded: data.data.xpNeeded
    };

    return toon;
};