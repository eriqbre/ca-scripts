/**
 * Created by ebreland on 4/22/15.
 */

module.exports = {
    port: 4001,
    timeZone: 'America/New_York',
	hvhActions: {
		times: [
			{time: "30 0 6,12,18 * * 1-3", type: 'morning schedule'},
			{time: "30 0 0,12,18 * * 0,4-6", type: 'night schedule'}
		]
	},
    hvhCollect: {
        times: [
            {time: "30 0 8,14,20 * * 1-3", type: 'morning schedule'},
            {time: "30 0 2,14,20 * * 0,4-6", type: 'night schedule'}
        ]
    },
	tvtActions: {
		time: "30 0 9,3,9 * * *"
	},
    tvtCollect: {
        time: "30 30 9,3,9 * * *"
    },
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