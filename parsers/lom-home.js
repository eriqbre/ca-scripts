/**
 * Created by ebreland on 5/8/2015.
 * parse the land of mist home page
 */

var cheerio = require('cheerio'),
	landData = require('../config/data/lom-land'),
	_ = require('lodash');

module.exports = function (response, callback) {
	var $ = cheerio.load(response.body),
		data = {
			lands: _.each($('div[style*="conq2_capsule_lom"]'), function (landContainer) {
				var land = landData({})
			})
		},
		landContainers = $('div[style*="conq2_capsule_lom"]'),
		parseLands = function ($) {

		},
		parse;


	callback(null, data);
};