var shell = require('shelljs');

module.exports = function (grunt) {

	grunt.registerMultiTask('initdeploy',
		'Create the necessary directories and local repositories needed for deploying the project',
		function () {
			var destination = this.data.dest;
			var repo = this.data.repo;

			if ( shell.test('-d', destination) ) {
				grunt.log.error('Deployment directory already exists.');
				return;
			}

			shell.mkdir(destination);
			shell.cd(destination);
			shell.exec('git init');
			shell.echo('Initializing repo').to('index.html');
			shell.exec('git add index.html');
			shell.exec('git commit -m "Initializing ' + destination + ' deploy directory"');
			shell.exec('git branch -m gh-pages');
			shell.exec('git remote add origin git@github.com:' + repo + '.git');
			shell.cd('..');
			grunt.log.ok('Deployment directory successfully generated.');
		});

};