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
    login: base + 'connect_login.php'
};