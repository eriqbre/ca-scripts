/**
 * Created by Bridget on 4/13/2015.
 */

module.exports = function (data) {
    var result = {
        platform_action: 'CA_web3_login',
        player_email: data.email || '',
        player_password: data.password || '',
        x: 100,
        y: 50
    };

    var result = {
        primary: {
            main_item_id: data.itemId,
            main_item_category: data.itemCategory,
            main_general_key: data.generalId,
            ajax: 1
        },
        secondary: {
            main_item_id: data.itemId,
            main_item_category: data.itemCategory,
            link_item_id: data.linkId,
            link_item_category: data.linkCategory,
            ajax: 1
        },
        setSecondary: {
            main_item_id: data.itemId,
            main_item_category: data.itemCategory,
            merge_item_id: data.secondaryGeneralId,
            merge_item_category: data.secondaryGeneralCategory,
            ajax: 1
        },
        tertiary: {
            main_item_id: data.itemId,
            main_item_category: data.itemCategory,
            link_item_id: data.linkId,
            link_item_category: data.linkCategory,
            ajax: 1
        },
        setTertiary: {
            main_item_id: data.itemId,
            main_item_category: data.itemCategory,
            merge_item_id: data.tertiaryGeneralId,
            merge_item_category: data.tertiaryGeneralCategory,
            ajax: 1
        }
    }
    return result;
};