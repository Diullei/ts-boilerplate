module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-ts');                     // https://github.com/grunt-ts/grunt-ts
    grunt.loadNpmTasks('grunt-contrib-clean');          // https://github.com/gruntjs/grunt-contrib-clean
    grunt.loadNpmTasks('grunt-contrib-jshint');         // https://github.com/gruntjs/grunt-contrib-jshint
    grunt.loadNpmTasks('grunt-tslint');                 // https://github.com/palantir/grunt-tslint
    grunt.loadNpmTasks('grunt-contrib-jasmine');        // https://github.com/gruntjs/grunt-contrib-jasmine

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: './src/',
        dist: './dist'
    };

    grunt.initConfig({

        // Project settings
        config: config,

        // Empties folders to start fresh
        clean: ['dist/*.*',
                'dist',
                '.tmp',
                '<%= config.dist %>/*',
                '!<%= config.dist %>/.git*',
                'test/reports/*.*',
                'test/reports',                         // Wipe out previous builds and test reporting.
                'test/specs/*.js'],

        // typescript compiler
        ts: {
            build: {
                src: ['src/scripts/**/*.ts'],               // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
                reference: './src/scripts/_reference.ts',   // If specified, generate this file that to can use for reference management
                out: 'scripts/main.js',                     // If specified, the generate JavaScript files are placed here. Only works if out is not specified
                options: {                                  // Use to override the default options, http://gruntjs.com/configuring-tasks#options
                    target: 'es3',                          // 'es3' (default) | 'es5'
                    sourceMap: true,                        // true (default) | false
                    declaration: false,                     // true | false (default)
                    removeComments: true                    // true (default) | false
                },
            },
            test: {                                         // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
                src: ['test/**/*.ts'],
                options: {
                    target: 'es3',
                    sourceMap: true,
                    declaration: false,
                    removeComments: true
                },
            }
        },

        // test runner using jasmine
        jasmine: {
            run: {
                src: 'src/scripts/**/*.js',
                options: {
                    specs: 'test/specs/*Spec.js',
                    helpers: 'test/specs/*Helper.js',
                    version: '2.0.0',
                    vendor: [
                        'vendor/bower/sinonjs/sinon.js',
                        'vendor/bower/jquery/jquery.js'
                    ]
                }
            },
            coverage: {
                src: ['src/scripts/**/*.js'],
                options: {
                    specs: ['test/specs/*Spec.js'],
                    helpers: 'test/specs/*Helper.js',
                    version: '2.0.0',
                    vendor: [
                        'vendor/bower/sinonjs/sinon.js',
                        'vendor/bower/jquery/jquery.js'
                    ],
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

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            all: ['Gruntfile.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Make sure TypeScript code styles are up to par
        tslint: {
            options: {
                configuration: grunt.file.readJSON('.tslintrc')
            },
            all: {
                src: ['app/**/*.ts', 'test/**/*.ts']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/vendor/bower', connect.static('./vendor/bower')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    open: false,
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/vendor/bower', connect.static('./vendor/bower')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.*',
                        '<%= config.dist %>/styles/fonts/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: './vendor/bower/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: '<%= config.dist %>'
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            //'clean:server',
            'clean',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload'//,
            //'watch'
        ]);
    });

    grunt.registerTask('check-code-style', ['jshint:all', 'tslint:all']);
    grunt.registerTask('build', ['ts:build',
        //'clean:dist',
        'clean',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'
    ]);
    grunt.registerTask('test', ['clean', 'check-code-style', 'build', 'ts:test', 'jasmine:coverage']);
    grunt.registerTask('default', ['test']);
};