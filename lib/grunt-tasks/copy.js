module.exports = function (grunt) {

	grunt.registerMultiTask('copy', 'Copy a set of specified files and directories to a target directory',
		function () {
			var destination = this.data.dest;

			grunt.helper('expandfiles', this.data.src)
				.forEach(function (file) {
					grunt.file.copy(file, destination + '/' + file);
				});
		});
	
};