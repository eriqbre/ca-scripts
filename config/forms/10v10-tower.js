/**
 * Created by ebreland on 4/26/15.
 */

module.exports = function (options) {
    var form = {
	    ajax: '1',
	    battle_id: options.toon.battle.battle_id
    };

    if (options.allies) {
        form.view_allies = true;
    }

    return form;
};