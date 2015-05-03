/**
 * Created by ebreland on 4/30/15.
 */
module.exports = function (options) {
    return {
        toon: {
            form: {
                inputs: []
            },
            health: {
                current: 0,
                total: 0
            },
            level: 0,
            name: '',
            points: 0
        },
        tower: function (options) {
            return {
                isLocked: false,
                name: options.name,
                remaining: 0,
                total: 0,
                type: '',
                toons: options.toons
            }
        },
        castle: {
            action: options.action,
            attacker: {
                id: '',
                name: '',
                remaining: 0,
                total: 0,
                towers: []
            },
            damage: {
                attacker: 0,
                defender: 0
            },
            defender: {
                id: '',
                name: '',
                remaining: 0,
                total: 0,
                towers: []
            },
            health: {
                attacker: 0,
                defender: 0
            },
            id: '',
            isInBattle: false,
            meta: {
                side: '',
                tower: ''
            },
            remaining: {
                attackers: 0,
                defenders: 0
            },
            result: false,// did they win or lose?
            success: true, // did the action trigger successfully? if not, recursively trigger the action till it does, fucking CA devse
            tokens: 10,
            towers: []
        }
    }
};