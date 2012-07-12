var _ = require('lodash');
var cheerio = require('cheerio');
var shell = require('shelljs');
var path = require('path');
var gfm = require('./lib/markdown');

module.exports = function (grunt) {
	var deployDir = '_site';
	var targetRepo = 'eliperelman/jqueryref';
	var jqueryRepo = 'jquery/jquery';
	var copyPaths = [ './index.md', './assets', './api' ];
	var masterPageContent = grunt.file.read('./index.html');

	var contentHandler = function (file, extension, content) {
		var $ = cheerio.load(content);
		var page = {
			page: path.basename(file, extension),
			title: $('h1:first').text(),
			description: $('h2:first').text()
		};

		grunt.file.write(deployDir + '/partial/' + page.page + '.html', content);
		grunt.file.write(deployDir + '/' + page.page + '.html',
			masterPageContent
				.replace(/@content/, content)
				.replace(/@title/, page.title));

		return page;
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
			return contentHandler(file, '.html', grunt.file.read(file));
		} else if (extension === '.md') {
			return contentHandler(file, '.md', gfm(grunt.file.read(file)));
		}

		grunt.file.copy(file, deployDir + '/' + file);
	};

	var generateApiIndex = function (pages) {
		var template = _.template( grunt.file.read('api.template') );
		
		pages = _.sortBy(pages, function (page) {
			return page.title;
		});

		contentHandler( 'api.html', '.html', gfm( template({ pages: pages }) ));
	};

	// grunt.registerTask('init', function () {
	// 	if ( shell.test('-d', deployDir) ) {
	// 		grunt.log.error('Deployment directory already exists.');
	// 		return;
	// 	}

	// 	shell.mkdir(deployDir);
	// 	shell.cd(deployDir);
	// 	shell.exec('git init');
	// 	shell.echo('Initializing repo').to('index.html');
	// 	shell.exec('git add index.html');
	// 	shell.exec('git commit -m "Initializing ' + deployDir + ' deploy directory"');
	// 	shell.exec('git branch -m gh-pages');
	// 	shell.exec('git remote add origin git@github.com:' + targetRepo + '.git');
	// 	shell.cd('..');
	// 	grunt.log.ok('Deployment directory successfully generated.');
	// });

	grunt.registerTask('generate', function () {
		console.log('Building file tree for deployment.');

		_.chain(copyPaths)
			.reduce(expandFiles, [])
			.tap(cleanDeployment)
			.map(processDeployFile)
			.compact()
			.reject(function (page) {
				return page.page === 'index' || page.page === 'api';
			})
			.tap(generateApiIndex);
	});

	grunt.registerTask('push', function () {
		console.log('Committing files for deployment.');

		shell.cd('_site');
		shell.exec('git add .');
		shell.exec('git add -u');
		shell.exec('git commit -m "Deploying source to GitHub Pages"');

		if (shell.exec('git push origin gh-pages --force')) {
			grunt.log.ok('Deployment completed successfully.');	
		} else {
			grunt.log.error('Deployment operation failed. Please try again.');
		}

		shell.cd('..');
	});

	grunt.registerTask('deploy', 'generate push');
};