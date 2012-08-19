var shell = require('shelljs');
var _ = require('lodash');

module.exports = function (grunt) {

	grunt.initConfig({
		deploydir: '_site',
		repo: 'eliperelman',
		jqueryrepo: 'jquery/jquery',
		initdeploy: {
			dist: {
				dest: '<config:deploydir>',
				repo: '<config:repo>'
			}
		},
		min: {
			dist: {
				src: [
					'assets/codemirror/codemirror.js',
					'assets/codemirror/util/runmode.js',
					'assets/codemirror/mode/javascript.js',
					'assets/js/**/*.js'
				],
				dest: '<config:deploydir>/site.min.js'
			}
		},
		cssmin: {
			dist: {
				src: [
					'assets/css/bootstrap.min.css',
					'assets/codemirror/codemirror.css',
					'assets/codemirror/themes/ambiance.css',
					'assets/css/**/*.css',
					'assets/css/bootstrap-responsive.min.css'
				],
				dest: '<config:deploydir>/site.min.css'
			}
		},
		template: {
			dist: {
				page: 'index.html',
				files: [
					'<config:markdown.dist.dest>/**/*.html'
				],
				scripts: [
					'//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js',
					'//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.3.2/lodash.min.js',
					'<config:min.dest.dist>'
				],
				stylesheets: '<config:cssmin.dist.src>',
				dest: '<config:deploydir>'
			}
		},
		markdown: {
			dist: {
				src: [
					'index.md',
					'api/**/*.md'
				],
				dest: '<config:deploydir>/partial'
			}
		},
		generateapi: {
			dist: {
				src: '<config:markdown.dist.dest>',
				dest: '<config:deploydir>',
				template: 'api.template'
			}
		},
		copy: {
			dist: {
				src: [
					'assets/img/**/*'
				],
				dest: '<config:deploydir>'
			}
		},
		clean: {
			dist: {
				dest: '<config:deploydir>'
			}
		},
		push: {
			dist: {
				dest: '<config:deploydir>'
			}
		}
	});

	grunt.registerHelper('expandfiles', function (files) {
		return _.reduce(files, function (acc, value) {
			if ( shell.test('-f', value) ) {
				return acc.concat( [ value ] );
			}

			return acc.concat( grunt.file.expandFiles(value) );// .expandFiles(value + '/**') );
		}, []);
	});

	require('./lib/grunt-tasks')(grunt);
	//grunt.loadNpmTasks('./node_modules/grunt-css');

	grunt.registerTask('generate', 'copy min markdown template generateapi');
	grunt.registerTask('deploy', 'generate push');
};