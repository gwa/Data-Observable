module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// tasks
		jscs: {
			src: 'src/js/Observable.js',
			options: {
				config: 'bower_components/gwa-codestyle/rc/.jscsrc'
			}
		},

		jshint: {
			options: {
				jshintrc: 'bower_components/gwa-codestyle/rc/.jshintrc'
			},
			src: [
				'src/js/Observable.js'
			]
		},

		jasmine: {
			require: {
				options: {
					vendor: [
						'bower_components/requirejs/require.js'
					],
					specs: [
						'tests/Observable.test.js'
					],
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfig: {
							baseUrl: './',
							paths: {
								'Gwa.Event.Dispatcher' : 'bower_components/gwa-event-dispatcher/dist/Dispatcher',
								'Gwa.Data.Enum'        : 'bower_components/gwa-data-enum/dist/Enum',
								'Gwa.Data.Observable'  : 'src/js/Observable'
							}
						}
					}
				}
			}
		},

		copy: {
			main: {
				files: [
					{src:'src/js/Observable.js', dest:'dist/Observable.js'}
				]
			}
		},

		uglify: {
			main: {
				files: {
					'dist/Observable.min.js': ['src/js/Observable.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask(
		'default',
		[
			'jscs',
			'jshint:src',
			'jasmine',
			'copy',
			'uglify'
		]
	);

};
