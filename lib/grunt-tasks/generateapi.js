var path = require('path');
var shell = require('shelljs');
var _ = require('lodash');
var cheerio = require('cheerio');

module.exports = function (grunt) {
	
	grunt.registerMultiTask('generateapi', 'Build API list from Markdown files.', function () {
		var files = _.reject( grunt.helper('expandfiles', this.data.src), function (file) {
			return file.indexOf('index.html') !== -1;
		});
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

		grunt.file.write(destination, grunt.helper('markdown', template({ pages: pages }) ));
		
	});

};