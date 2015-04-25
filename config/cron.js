/**
 * Created by ebreland on 4/22/15.
 */

module.exports = {
    port: 3001,
    timeZone: 'America/New_York',
    loadouts: {
        times: [
            {time: "45 5,8,11,14,17,20,23 * * *", type: 'pre-battle'},
            {time: "55 5,8,11,14,17,20,23 * * *", type: 'battle-defense'}
        ]
    },
    lomActions: {
        time: "0 * * * *"
    },
    maintenance: {
        time: "0,30 * * * * *",
        roles: [
            "demi-blessing",
            "collect-resources",
            "set-item-archives",
            "collect-hero-crystal"
        ]
    }
};