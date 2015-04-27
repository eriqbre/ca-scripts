/**
 * Created by ebreland on 4/22/15.
 */

module.exports = {
    port: 4001,
    timeZone: 'America/New_York',
    loadouts: {
        times: [
            {time: "49 5,8,11,14,17,20,23 * * *", type: 'pre-battle'},
            {time: "55 5,8,11,14,17,20,23 * * *", type: 'battle-defense'}
        ]
    },
    lomActions: {
        time: "10,30,50 * * * *"
    },
    maintenance: {
        time: "0,20,40 * * * *",
        roles: [
            "demi-blessing",
            "collect-resources",
            "set-item-archives",
            "collect-hero-crystal"
        ]
    }
};