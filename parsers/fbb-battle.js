/**
 * Created by ebreland on 4/27/2015.
 */

var cheerio = require('cheerio');

module.exports = function(response){
	var $ = cheerio.load(response),
		data = {

		};

	return data;
};