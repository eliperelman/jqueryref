var shell = require('shelljs');

module.exports = function (grunt) {

	grunt.registerHelper('clean', function (destination) {
		shell.rm('-rf', './' + destination + '/*');
	});

	grunt.registerMultiTask('clean', 'Clean deployment directory', function () {
		grunt.helper('clean', this.data.dest);
	});

};