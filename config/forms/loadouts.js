/**
 * Created by Bridget on 4/13/2015.
 */

module.exports = function (data, role) {
    var result = {
        ajax_action: 'change_loadout',
        target_loadout: '',
        ajax: 1
    };

	if (data.config && data.config.loadout && data.config.loadout.id){
		result.target_loadout = data.config.loadout.id;
	} else if (role && data.configs && data.configs[role] && data.configs[role]['loadout']){
		result.target_loadout = data.configs[role]['loadout'];
	}

    return result;
};