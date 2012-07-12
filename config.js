module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-css');
	grunt.loadTasks('./lib/grunt-tasks');

	var deployDir = '_site';
	var targetUser = 'eliperelman';
	var targetRepo = 'jqueryref';
	var jqueryRepo = 'jquery/jquery';
	var copyPaths = [ './index.md', './assets', './api' ];
	var masterPageContent = grunt.file.read('./index.html');

	grunt.initConfig({
		deployDir: deployDir,
		targetUser: targetUser,
		targetRepo: targetRepo,
		jqueryRepo: jqueryRepo,
		cdnScripts: [
			'//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js'
			'//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.3.2/lodash.min.js'
		],
		// init: {
		// 	dest: deployDir,
		// 	repo: targetUser + '/' + targetRepo
		// },
		min: {
			dist: {
				src: [
					'assets/codemirror/codemirror.js',
					'assets/codemirror/util/runmode.js',
					'assets/codemirror/mode/javascript.js',
					'assets/js/**/*.js'
				],
				dest: deployDir + '/site.min.js'
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
				dest: deployDir + '/site.min.css'
			}
		},
		template: {
			page: 'index.html',

		},
		markdown: {
			dist: {
				src: [
					'index.md',
					'api/**/*.md'
				],
				dest: deployDir + '/partial'
			},
			template: {
				dest: deployDir
			}
		},
		copy: {
			dist: [
				src: [
					'assets/img/**/*'
				]
			]
		}
	});


};