var shell = require('shelljs');

module.exports = function (grunt) {

	grunt.registerMultiTask('push', 'Commit files in the deployment directory and push them to GitHub Pages',
		function () {
			var destination = this.data.dest;

			shell.cd(destination);

			shell.exec('git add .');
			shell.exec('git add -u');
			shell.exec('git commit -m "Deploying source to GitHub Pages."');

			if (shell.exec('git push origin gh-pages --force')) {
				grunt.log.ok('Deployment completed successfully.');	
			} else {
				grunt.log.error('Deployment operation failed. Please try again.');
			}

			shell.cd('..');
		});
	
};