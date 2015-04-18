/**
 * Created by ebreland on 4/11/15.
 */

var domain = 'https://web3.castleagegame.com',
    base = domain + '/castle_ws/';

module.exports = {
    domain: domain,
    base: base,
    alliance: base + 'general_alliance.php',
    changeLoadout: base + 'hot_swap_ajax_handler.php ',
    keep: base + 'keep.php',
    landOfMist: base + 'guildv2_conquest_command.php',
    landOfMistTower: function (guild, tower) {
        return base + 'guildv2_conquest_expansion_fort.php?guild_id=' + guild + '&slot=' + tower;
    },
    login: base + 'connect_login.php'
};