/**
 * Created by ebreland on 4/22/15.
 */

module.exports = {
    port: 4001,
    timeZone: 'America/New_York',
	hvhActions: {
		times: [
			{time: "30 0 5,11,17 * * 1-3", type: 'morning schedule'},
			{time: "30 0 23,11,17 * * 0,4-6", type: 'night schedule'}
		]
	},
    hvhCollect: {
        times: [
	        {time: "1 7,13,19 * * 1-3", type: 'morning schedule'},
	        {time: "1 1,13,19 * * 0,4-6", type: 'night schedule'}
        ]
    },
	tvtActions: {
        time: "15 0 2,8,14,20 * * *"
		//time: "0 * * * * *"
	},
    tvtCollect: {
        time: "31 8,14,20 * * *"
	    //time: "0 * * * * *"
    },
    loadouts: {
        times: [
            {time: "49 4,7,10,13,16,19,22 * * *", type: 'pre-battle'},
            {time: "55 4,7,10,13,16,19,22 * * *", type: 'battle-defense'}
        ]
    },
    lomActions: {
        time: "0,10,20,30,40,50 * * * *"
        //time: "0 * * * * *"
    },
    maintenance: {
        time: "5,25,45 * * * *",
        //time: "0 * * * * *",
        roles: [
            "collect-hero-crystal",
            "collect-resources",
            "demi-blessing",
            "set-item-archives"
        ]
    }
};