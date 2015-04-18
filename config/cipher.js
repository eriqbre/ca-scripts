/**
 * Created by ebreland on 4/17/2015.
 */

var crypto = require('crypto'),
	algorithm = 'aes256',
	key = 'stupid-toon-password',
	cipher, password;

module.exports = {
	encrypt: function(text){
		cipher = crypto.createCipher(algorithm, key);
		password = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
		return password;
	},
	decrypt: function(text){
		cipher = crypto.createDecipher(algorithm, key);
		password = cipher.update(text, 'hex', 'utf8') + cipher.final('utf8');
		return password;
	}
};