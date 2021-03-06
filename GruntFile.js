module.exports = function(grunt) {
	grunt.initConfig({

		meta: {
			src: {
				lib: [
					"src/main/webapp/js/jquery.js",
					"src/main/webapp/js/bootsrap.js"
				],
				core: [
					"src/main/javascript/namespace.js",

					"src/main/javascript/core/*.js",
				],
				ui: [
					"src/main/javascript/ui/*.js"
				]
			}
		},

		jshint: {
			all: [
				"src/main/javascript/**/*.js",
				"src/test/javascript/**/*.js"
			]
		},

		copy: {
			main: {
				files: [{
					expand: true,
					cwd: "src/main/webapp",
					src: "**/*", 
					dest: "target/webapp/"
				}]
			}
		},

		concat: {
			main: {
				src: [
					"<%= meta.src.core %>",
					"<%= meta.src.ui %>"
				],
				dest: "target/webapp/js/hexify.js"
			}
		},

		min: {
			dist: {
				src: [
					"target/webapp/js/jjvm.js"
				],
				dest: "target/webapp/js/jjvm.min.js"
			}
  		},

		jasmine : {
			test: {
				src : [
					"<%= meta.src.core %>",
					"<%= meta.src.ui %>"
				],
				options: {
					errorReporting: true,
					specs : "src/test/javascript/**/*.spec.js"
				}
			},
			coverage: {
				src : [
					"<%= meta.src.core %>",
					"<%= meta.src.ui %>"
				],
				options: {
					errorReporting: true,
					specs : "<%= jasmine.test.options.specs %>",
					template: require("grunt-template-jasmine-istanbul"),
					templateOptions: {
						coverage: 'target/tests/coverage.json',
						report: 'target/reports/coverage'
					}
				}
			}
		},

		watch: {
			files: [
				"src/main/**/*"
			],
			tasks: ["jshint", "copy", "concat"]
		},

		connect: {
			server: {
				options: {
					port: 8070,
					base: "target/webapp"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jasmine");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");

	// default task
	grunt.registerTask("default", ["jshint", "copy", "concat"]);

	// starts a web server and watches files for changes
	grunt.registerTask("run", ["jshint", "copy", "concat", "connect", "watch"]);

	// runs unit tests
	grunt.registerTask("test", "jasmine:test");

	// runs unit tests and generates a code coverage report
	grunt.registerTask("coverage", "jasmine:coverage");
};