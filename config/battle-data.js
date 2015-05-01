/**
 * Created by ebreland on 4/30/15.
 */
module.exports = {
    action: 'options.action',
    success: true, // did the action trigger successfully? if not, recursively trigger the action till it does, fucking CA devs
    result: false, // did they win or lose?
    remaining: {
        attackers: 0,
        defenders: 0
    },
    damage: {
        attacker: 0,
        defender: 0
    },
    health: {
        attacker: 0,
        defender: 0
    },
    isInBattle: false,
    tokens: 10,
    tower: {
        toons: []
    }
};