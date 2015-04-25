/**
 * Created by ebreland on 4/22/15.
 */

module.exports = {
    timeZone: 'America/New_York',
    loadouts: {
        port: 3023,
        times: [
            {time: "45 5,8,11,14,17,20,23 * * *", type: 'pre-battle'},
            {time: "55 5,8,11,14,17,20,23 * * *", type: 'battle-defense'}
        ]
    },
    lomActions: {
        port: 3024,
        time: "0 * * * *"
    },
    maintenance: {
        port: 3025,
        time: "0,15,30,45 * * * *",
        roles: [
            "demi-blessing",
            "collect-resources",
            "set-item-archives",
            "collect-hero-crystal"
        ]
    }
};