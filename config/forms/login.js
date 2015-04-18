/**
 * Created by ebreland on 4/12/15.
 */

var cipher = require('../cipher');

module.exports = function (data) {
    var result = {
        platform_action: 'CA_web3_login',
        player_email: (data.email || '').trim(),
        player_password: (cipher.decrypt(data.password) || '').trim(),
        x: 100,
        y: 50
    };

    return result;
};