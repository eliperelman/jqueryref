module.exports = function (grunt) {

	grunt.registerMultiTask('copy', 'Copy a set of specified files and directories to a target directory',
		function () {
			var files = grunt.helper('expandfiles', this.data.src);
			var destination = this.data.dest;

			grunt.helper('clean', destination);

			files.forEach(function (file) {
				grunt.file.copy(file, destination + '/' + file);
			});
		});
	
};