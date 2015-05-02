/**
 * Created by ebreland on 4/30/15.
 */
module.exports = function (options) {
    return {
        action: options.action,
        attacker: {
            id: '',
            name: '',
            remaining: 0,
            total: 0
        },
        damage: {
            attacker: 0,
            defender: 0
        },
        defender: {
            id: '',
            name: '',
            remaining: 0,
            total: 0
        },
        health: {
            attacker: 0,
            defender: 0
        },
        isInBattle: false,
        remaining: {
            attackers: 0,
            defenders: 0
        },
        result: false,// did they win or lose?
        success: true, // did the action trigger successfully? if not, recursively trigger the action till it does, fucking CA devse
        tokens: 10,
        tower: {
            toons: []
        }
    }
};