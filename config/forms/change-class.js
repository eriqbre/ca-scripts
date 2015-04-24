/**
 * Created by ebreland on 4/24/2015.
 */

module.exports = function(type){
	return {
		ajax: '1',
		ajax_action: 'change_class',
		target_class: type
	};
};