/**
 * Created by Bridget on 4/13/2015.
 */

module.exports = function (data) {
    var result = {
        ajax_action: 'change_loadout',
        target_loadout: data.config.id,
        ajax: 1
    };

    return result;
};