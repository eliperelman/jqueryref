var gfm = require('github-flavored-markdown').parse;
var gift = require('gift');

var repoTarget = 'jquery/jquery';
var repo = gift('.');


module.exports = function (grunt) {


	grunt.registerTask('test', function () {
		grunt.file.recurse('./css', function (abspath, rootdir, subdir, filename) {
			grunt.file.copy(abspath, './site/' + filename);
		});

		//grunt.file.copy('./css/**/*', './site/css');

		repo.checkout('gh-pages', function () {
			//grunt.file.copy('./site/**/*', '.');
			grunt.file.recurse('./site', function (abspath, rootdir, subdir, filename) {
				grunt.file.copy(abspath, './' + filename);
			});
		});
	});
};