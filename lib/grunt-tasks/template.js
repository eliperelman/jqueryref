var cheerio = require('cheerio');

module.exports = function (grunt) {

	grunt.registerMultiTask('template', 'Inject a file into a master page',
		function () {
			var masterPageContent = grunt.file.read(this.data.page);
			var destination = this.data.dest;
			var files = grunt.helper('expandfiles', this.data.files);

			var scripts = _.reduce(this.data.scripts, function (acc, value) {
				return acc + '<script src="' + value + '"></script>';
			}, '');

			var stylesheets = _.reduce(this.data.stylesheets, function (acc, value) {
				return acc + '<link rel="stylesheet" href="' + value + '" />';
			}, '');

			masterPageContent
				.replace(/@scripts/, scripts)
				.replace(/@stylesheets/, stylesheets);

			files.forEach(function (file) {
				var content = grunt.file.read(file);
				var $ = cheerio.load(content);
				var basename = path.basename(file, '.html');

				grunt.file.write(destination + '/' + basename + '.html',
					masterPageContent
						.replace(/@content/, content)
						.replace(/@title/, $('h1:first').text()));
			});
		});
};