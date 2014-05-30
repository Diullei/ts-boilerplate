module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-ts');                     // https://github.com/grunt-ts/grunt-ts
    grunt.loadNpmTasks('grunt-contrib-clean');          // https://github.com/gruntjs/grunt-contrib-clean
    grunt.loadNpmTasks('grunt-contrib-jshint');         // https://github.com/gruntjs/grunt-contrib-jshint
    grunt.loadNpmTasks('grunt-tslint');                 // https://github.com/palantir/grunt-tslint
    grunt.loadNpmTasks('grunt-jasmine-node-coverage');  // https://github.com/jribble/grunt-jasmine-node-coverage

    // Time how long tasks take. Can help when optimizing build times
    // require('time-grunt')(grunt);

    grunt.initConfig({
        clean: ['bin/*.*',
                'bin',
                'test/reports/*.*',
                'test/reports'],                    // Wipe out previous builds and test reporting.

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
                    target: 'es3',
                    module: 'commonjs',
                    sourceMap: true,
                    declaration: false,
                    removeComments: true
                },
            }
        },

        /* jshint camelcase: false */
        jasmine_node: {
            coverage: {
                savePath: './test/reports/coverage'
            },
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: '.*Spec',
                captureExceptions: true,
                junitreport: {
                    report: false,
                    savePath : './test/reports/',
                    useDotNotation: true,
                    consolidate: true
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
    grunt.registerTask('test', ['clean', 'check-code-style', 'build', 'jasmine_node']);
    grunt.registerTask('default', ['test']);
};