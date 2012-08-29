var path = require('path');
var showdown = require('./showdown');
var marked = require('./marked');
var _ = require('lodash');

module.exports = function (grunt) {
	grunt.registerHelper('markdown', _.compose(marked, showdown));

	grunt.registerMultiTask('markdown', 'Convert markdown files into HTML', 
		function () {
			var destination = this.data.dest;

			grunt.helper('expandfiles', this.data.src)
				.forEach(function (file) {
					var basename = path.basename(file, '.md');
					var content = grunt.helper('markdown', grunt.file.read(file));

					grunt.file.write(destination + '/' + basename + '.html', content);
				});
		});
		
};