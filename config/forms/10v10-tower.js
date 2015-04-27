/**
 * Created by ebreland on 4/26/15.
 */

module.exports = function (options) {
    var form = {
        battle_id: options.id
    };

    if (options.allies) {
        form.view_allies = true;
    }

    return form;
};