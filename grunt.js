var _ = require('lodash');
var gfm = require('marked');
var cheerio = require('cheerio');
var shell = require('shelljs');
var path = require('path');

module.exports = function (grunt) {
	var deployDir = '_site';
	var targetRepo = 'eliperelman/jqueryref';
	var jqueryRepo = 'jquery/jquery';
	var copyPaths = [ './index.md', './assets', './api' ];
	var masterPageContent = grunt.file.read('./index.html');

	var contentHandler = function (file, extension, content) {
		var basename = path.basename(file, extension)
		var root = deployDir + '/' + basename + '.html';
		var partial = deployDir + '/partial/' + basename + '.html';
		var $ = cheerio.load(content);

		grunt.file.write(partial, content);
		grunt.file.write(root, masterPageContent
			.replace(/@content/, content)
			.replace(/@title/, $('h1:first').text()));
	};

	var expandFiles = function (acc, value) {
		if ( shell.test('-f', value) ) {
			return acc.concat( [ value ] );
		}

		return acc.concat( grunt.file.expandFiles(value + '/**') );
	};

	var cleanDeployment = function () {
		console.log('Cleaning deployment directory for new files.');
		shell.rm('-rf', './' + deployDir + '/*');
		console.log('Copying files to deployment directory.');
	};

	var processDeployFile = function (file) {
		var extension = path.extname(file);

		if (extension === '.html') {
			contentHandler(file, '.html', grunt.file.read(file));
		} else if (extension === '.md') {
			contentHandler(file, '.md', gfm(grunt.file.read(file)));
		} else {
			grunt.file.copy(file, deployDir + '/' + file);
		}		
	};

	var gitDeploy = function () {
		
	};

	grunt.registerTask('init', function () {
		if ( shell.test('-d', deployDir) ) {
			grunt.log.error('Deployment directory already exists.');
			return;
		}

		shell.mkdir(deployDir);
		shell.cd(deployDir);
		shell.exec('git init');
		shell.echo('Initializing repo').to('index.html');
		shell.exec('git add index.html');
		shell.exec('git commit -m "Initializing ' + deployDir + ' deploy directory"');
		shell.exec('git branch -m gh-pages');
		shell.exec('git remote add origin git@github.com:' + targetRepo + '.git');
		shell.cd('..');
		grunt.log.ok('Deployment directory successfully generated.');
	});

	grunt.registerTask('generate', function () {
		console.log('Building file tree for deployment.');

		_.chain(copyPaths)
			.reduce(expandFiles, [])
			.tap(cleanDeployment)
			.forEach(processDeployFile);
	});

	grunt.registerTask('push', function () {
		console.log('Committing files for deployment.');

		shell.cd('_site');
		shell.exec('git add .');
		shell.exec('git add -u');
		shell.exec('git commit -m "Deploying source to GitHub Pages"');
		shell.exec('git push origin gh-pages --force');
		shell.cd('..');

		grunt.log.ok('Deployment completed successfully.');
	});

	grunt.registerTask('deploy', 'generate push');

};