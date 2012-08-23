var shell = require('shelljs');
var _ = require('lodash');

module.exports = function (grunt) {
	var config = {
		deploydir: '_site',
		repo: 'eliperelman',
		jqueryrepo: 'jquery/jquery'
	};

	config.initdeploy = {
		dist: {
			dest: config.deploydir,
			repo: config.repo
		}
	};
		
	config.min = {
		dist: {
			src: [
				'assets/codemirror/codemirror.js',
				'assets/codemirror/util/runmode.js',
				'assets/codemirror/mode/javascript.js',
				'assets/js/**/*.js'
			],
			path: 'assets/js/site.min.js',
			dest: config.deploydir + '/assets/js/site.min.js',
		}
	};
		
	config.cssmin = {
		dist: {
			src: [
				'assets/css/bootstrap.min.css',
				'assets/codemirror/codemirror.css',
				'assets/codemirror/themes/ambiance.css',
				'assets/css/**/*.css',
				'assets/css/bootstrap-responsive.min.css'
			],
			dest: config.deploydir + '/site.min.css'
		}
	};

	config.markdown = {
		dist: {
			src: [
				'index.md',
				'api/**/*.md'
			],
			dest: config.deploydir + '/partial'
		}
	};
		
	config.template = {
		dist: {
			page: 'index.html',
			files: [
				config.markdown.dist.dest + '/**/*.html'
			],
			scripts: [
				'//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js',
				'//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.3.2/lodash.min.js',
				config.min.dist.path
			],
			stylesheets: config.cssmin.dist.src,
			dest: config.deploydir
		}
	};
		
	config.generateapi = {
		dist: {
			src: [ config.markdown.dist.dest + '/**/*.html' ],
			dest: config.deploydir + '/partial/api.html',
			template: 'api.template'
		}
	};
		
	config.copy = {
		dist: {
			src: [
				'assets/img/**/*',
				config.cssmin.dist.src
			],
			dest: config.deploydir
		}
	};

	config.clean = {
		dist: {
			dest: config.deploydir
		}
	};
		
	config.push = {
		dist: {
			dest: config.deploydir
		}
	};

	grunt.initConfig( config );

	grunt.registerHelper('expandfiles', function (files) {
		return _.reduce(files, function (acc, value) {
			if ( shell.test('-f', value) ) {
				return acc.concat( [ value ] );
			}

			return acc.concat( grunt.file.expandFiles(value) );
		}, []);
	});

	require('./lib/grunt-tasks')(grunt);

	grunt.registerTask('generate', 'clean copy min markdown generateapi template');
	grunt.registerTask('deploy', 'generate push');
};