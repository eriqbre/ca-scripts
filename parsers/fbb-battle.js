/**
 * Created by ebreland on 4/27/2015.
 */

var cheerio = require('cheerio');

module.exports = function(response){
	var $ = cheerio.load(response.body),
		data = {
            hasEntered: $('input[name="enter_battle"]').length ? true:false
		};

    if (data.hasEntered){
        // parse tokens and timeToNextToken

        // parse toon health

        // parse toon activity total

        // parse buffs
    }
    // parse time remaining

    // parse allies status 100/100

    // parse opponent name

    // parse opponent status 100/100

    // parse tower


	return data;
};