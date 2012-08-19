var path = require('path');
var shell = require('shelljs');
var _ = require('lodash');
var cheerio = require('cheerio');

module.exports = function (grunt) {
	
	grunt.registerTask('generateapi', function () {
		var files = grunt.helper('expandfiles', this.data.src);
		var template = _.template( grunt.file.read(this.data.template) );
		var destination = this.data.dest;

		var pages = _.chain(files)
			.map(function (file) {
				var content = grunt.file.read(file);
				var $ = cheerio.load(content);

				return {
					title: $('h1:first').text(),
					description: $('h2:first').text()
				};
			})
			.sortBy(function (page) {
				return page.title;
			})
			.value();

		grunt.file.write(destination + '/' + this.data.template + '.html', template({ pages: pages }));
		
	});

};