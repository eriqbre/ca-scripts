/**
 * Created by ebreland on 4/11/15.
 * retribution = 400000008563610_1422875732
 * sr =4 00000007931960_1332286643
 */

var domain = 'https://web3.castleagegame.com',
    base = domain + '/castle_ws/';

module.exports = {
    alliance: base + 'general_alliance.php',
    base: base,
    battle: base + 'guild_battle.php',
    changeLoadout: base + 'hot_swap_ajax_handler.php ',
    domain: domain,
	fbbHome: base + 'guildv2_battle.php',
    hvh: base + 'hundred_battle.php',
    hvhBattle: base + 'hundred_battle_view.php',
    index: base + 'index.php',
    keep: base + 'keep.php',
    landOfMist: base + 'guildv2_conquest_command.php',
    landOfMistTower: function (tower) {
        return base + 'guildv2_conquest_expansion.php?guild_id=400000008563610_1422875732&slot=' + tower;
    },
    login: base + 'connect_login.php',
    oracle: base + 'symbols.php',
	tvt: base + 'ten_battle.php',
	tvtHome: base + 'tenxten_gb_formation.php'
};