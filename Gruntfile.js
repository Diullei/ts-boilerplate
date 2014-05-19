module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-jasmine');    // https://github.com/gruntjs/grunt-contrib-jasmine
    grunt.loadNpmTasks('grunt-ts');                 // https://github.com/grunt-ts/grunt-ts
    grunt.loadNpmTasks('grunt-contrib-clean');      // https://github.com/gruntjs/grunt-contrib-clean
    grunt.loadNpmTasks('grunt-contrib-jshint');     // https://github.com/gruntjs/grunt-contrib-jshint
    grunt.loadNpmTasks('grunt-tslint');             // https://github.com/palantir/grunt-tslint

    grunt.initConfig({
        clean: ['bin/', 'test/reports'],            // Wipe out previous builds and test reporting.

        ts: {
            build: {
                src: ['src/**/*.ts'],               // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
                reference: './src/_reference.ts',   // If specified, generate this file that to can use for reference management
                outDir: 'bin',                      // If specified, the generate JavaScript files are placed here. Only works if out is not specified
                options: {                          // Use to override the default options, http://gruntjs.com/configuring-tasks#options
                    target: 'es3',                  // 'es3' (default) | 'es5'
                    module: 'commonjs',             // 'amd' (default) | 'commonjs'    
                    sourceMap: false,               // true (default) | false
                    declaration: false,             // true | false (default)
                    removeComments: true            // true (default) | false
                },
            },
            test: {                                 // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
                src: ['test/**/*.ts'],
                options: {
                    sourceMap: true,
                },
            }
        },

        jasmine: {
            run: {
                src: 'bin/**/*.js',
                options: {
                    specs: 'test/specs/*Spec.js',
                    helpers: 'test/specs/*Helper.js'
                }
            },
            coverage: {
                src: ['bin/**/*.js'],
                options: {
                    specs: ['test/specs/*Spec.js'],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'test/reports/coverage/coverage.json',
                        report: [
							{
							    type: 'html',
							    options: {
							        dir: 'test/reports/coverage/html'
							    }
							},
							{
							    type: 'cobertura',
							    options: {
							        dir: 'test/reports/coverage/cobertura'
							    }
							},
							{
							    type: 'text-summary'
							}
                        ],
                        thresholds: {
                            lines: 75,
                            statements: 75,
                            branches: 75,
                            functions: 90
                        }
                    }
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON('.tslintrc')
            },
            all: {
                src: ['app/**/*.ts', 'test/**/*.ts']
            }
        }
    });

    grunt.registerTask('check-code-style', ['jshint:all', 'tslint:all']);
    grunt.registerTask('build', ['ts:build', 'ts:test']);
    grunt.registerTask('test', ['clean', 'check-code-style', 'build', 'jasmine:run', 'jasmine:coverage']);
    grunt.registerTask('default', ['test']);
};