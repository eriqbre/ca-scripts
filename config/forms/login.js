/**
 * Created by ebreland on 4/12/15.
 */

module.exports = function (data) {
    var result = {
        platform_action: 'CA_web3_login',
        player_email: data.email || '',
        player_password: data.password || '',
        x: 100,
        y: 50
    };

    return result;
};