module.exports = function(grunt) {
    'use strict';

    // https://github.com/gruntjs/grunt-contrib-jasmine
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    // https://github.com/grunt-ts/grunt-ts
    grunt.loadNpmTasks('grunt-ts');
    // https://github.com/gruntjs/grunt-contrib-jshint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // https://github.com/palantir/grunt-tslint
    grunt.loadNpmTasks('grunt-tslint');

    grunt.initConfig({
        ts: {
            build: {
                // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
                src: ['src/**/*.ts'],
                // If specified, generate this file that to can use for reference management
                reference: './src/_reference.ts',
                // If specified, the generate JavaScript files are placed here. Only works if out is not specified
                outDir: 'bin',
                // Use to override the default options, http://gruntjs.com/configuring-tasks#options
                options: {
                    // 'es3' (default) | 'es5'
                    target: 'es3',
                    // 'amd' (default) | 'commonjs'    
                    module: 'commonjs',
                    // true (default) | false
                    sourceMap: false,
                    // true | false (default)
                    declaration: false,
                    // true (default) | false
                    removeComments: true
                },
            },
            test: {
                // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
                src: ['test/**/*.ts'],
                options: {
                    sourceMap: true,
                },
            }
        },
        jasmine: {
            pivotal: {
                src: 'src/**/*.js',
                options: {
                    specs: 'test/specs/*Spec.js',
                    helpers: 'test/specs/*Helper.js'
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
                configuration: grunt.file.readJSON('tslintrc.json')
            },
            all: {
                src: ['app/**/*.ts', 'test/**/*.ts']
            }
        }
    });

    grunt.registerTask('check-code-style', ['jshint:all', 'tslint:all']);
    grunt.registerTask('build', ['ts:build', 'ts:test']);
    grunt.registerTask('test', ['check-code-style', 'build', 'jasmine:pivotal']);
    grunt.registerTask('default', ['test']);
};