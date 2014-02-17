/*
 * Generated on <%= (new Date).toISOString().split('T')[0] %>
 * <%= pkg.name %> v<%= pkg.version %>
 * <%= pkg.homepage %>
 *
 * Copyright (c) <%= (new Date).getFullYear() %> <%= pkg.author.name %>
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

    config: {
      src: 'src',
      dist: '<%= _.slugify(projectName) %>'
    },

    watch: {
        assemble: {
            files: ['<%%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml,json}'],
            tasks: ['assemble']
        },
        styles: {
            files: ['<%%= config.src %>/assets/styles/{,*/}*.scss'],
            tasks: ['compass', 'modernizr']
        },
        scripts: {
            files: ['<%%= config.src %>/assets/scripts/{,*/}*.js'],
            tasks: ['scripts', 'modernizr']
        },
        images: {
            files: ['<%%= config.src %>/assets/images/{,*/}*'],
            tasks: ['images']
        },
        fonts: {
            files: ['<%%= config.src %>/assets/fonts/{,*/}*'],
            tasks: ['fonts']
        },
        json: {
            files: ['<%%= config.src %>/data/{,*/}*.json'],
            tasks: ['jsonlint']
        },
        livereload: {
            options: {
                livereload: '<%%= connect.options.livereload %>'
            },
            files: [
                '<%%= config.dist %>/{,*/}*.html',
                '<%%= config.dist %>/assets/styles/{,*/}*.css',
                '<%%= config.dist %>/assets/scripts/{,*/}*.js',
                '<%%= config.dist %>/assets/{images,fonts}/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        }
    },

    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            // change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },
        livereload: {
            options: {
                open: true,
                base: ['']
            }
        }
    },

    assemble: {
        pages: {
            options: {
                flatten: true,
                assets: '<%%= config.dist %>/assets',
                helpers: [
                    'helper-moment',
                    '<%%= config.src %>/templates/helpers/*.js'
                ],

                layout: 'default.hbs',
                layoutdir: '<%%= config.src %>/templates/layouts/',
                data: '<%%= config.src %>/data/*.{json,yml}',
                partials: '<%%= config.src %>/templates/partials/*.hbs',
                <%= _.camelize(_.slugify(projectName)) %>: grunt.file.readJSON('src/data/<%= _.slugify(projectName) %>.json')
            },
            files: {
                    '<%%= config.dist %>/': ['<%%= config.src %>/content/pages/*.hbs'],
                    '<%%= config.dist %>/news/': ['<%%= config.src %>/content/news/*.hbs'],
                    '<%%= config.dist %>/setting/': [
                        '<%%= config.src %>/content/setting/index.hbs',
                    ],
                    '<%%= config.dist %>/characters/': [
                        '<%%= config.src %>/content/characters/index.hbs',
                        '<%%= config.src %>/content/characters/*.hbs'
                    ]
                }
        }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%%= config.dist %>'],
    modernizr: {
            dist: {
                devFile: '<%%= config.src %>/bower_components/modernizr/modernizr.js',
                outputFile: '<%%= config.src %>/bower_components/modernizr/modernizr.dev.js',
                files: {
                    src: [
                        '<%%= config.src %>/assets/scripts/{,*/}*.js',
                        '<%%= config.src %>/assets/styles/{,*/}*.scss',
                        '!<%%= config.src %>/assets/scripts/vendor/*'
                    ]
                },
                uglify: true
            }
        },
        compass: {
            options: {
                sassDir: '<%%= config.src %>/assets/styles',
                cssDir: '<%%= config.dist %>/assets/styles',
                generatedImagesDir: '<%%= config.dist %>/assets/images/generated',
                imagesDir: '<%%= config.src %>/assets/media/images',
                javascriptsDir: '<%%= config.dist %>/assets/scripts',
                fontsDir: '<%%= config.src %>/assets/fonts',
                httpImagesPath: '/<%= _.slugify(projectName) %>/assets/media/images',
                httpGeneratedImagesPath: '/<%= _.slugify(projectName) %>/assets/images/generated',
                httpFontsPath: '/<%= _.slugify(projectName) %>/assets/fonts',
                relativeAssets: false,
                outputStyle: 'compressed'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= config.dist %>/assets/images/generated'
                }
            }
        },
        jsonlint: {
            data: {
                src: ['*.json', '<%%= config.src %>/src/data/*.json']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= config.src %>/assets/scripts/{,*/}*.js',
                '!<%%= config.src %>/assets/scripts/vendor/{,*/}*.js',
            ]
        },
        jsvalidate: {
            all: '<%%= jshint.all %>'
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            head: {
                // the files to concatenate
                src: [
                    '<%%= config.src %>/bower_components/modernizr/modernizr.dev.js'
                ],
                // the location of the resulting JS file
                dest: '<%%= config.dist %>/assets/scripts/head.js'
            },
            foot: {
                // the files to concatenate
                src: [
                    '<%%= config.src %>/bower_components/jquery/dist/jquery.js',
                    '<%%= config.src %>/bower_components/bootstrap/js/*.js'
                ],
                // the location of the resulting JS file
                dest: '<%%= config.dist %>/assets/scripts/foot.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%%= config.dist %>/assets/scripts/foot.js': ['<%%= config.dist %>/assets/scripts/foot.js'],
                    '<%%= config.dist %>/assets/scripts/head.js': ['<%%= config.dist %>/assets/scripts/head.js']
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.src %>/assets/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= config.dist %>/assets/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.src %>/assets/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= config.dist %>/assets/images'
                }]
            }
        },
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.src %>/assets/fonts',
                    src: '{,*/}*',
                    dest: '<%%= config.dist %>/assets/fonts'
                }]
            }
        },
        jsbeautifier: {
            files: {
                src: [
                    'Gruntfile.js',
                    '<%%= config.src %>/assets/scripts/{,*/}*.js',
                    '!<%%= config.src %>/assets/scripts/vendor/{,*/}*.js'
                ]
            }
        }

    });

    grunt.loadNpmTasks('assemble');
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('server', [
        'build',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'assemble',
        'compass',
        'scripts',
        'images',
        'fonts'
    ]);

    grunt.registerTask('scripts', [
        'jsvalidate',
        'jsbeautifier',
        'jshint',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('images', [
        'imagemin',
        'svgmin'
    ]);

    grunt.registerTask('fonts', [
        'copy:fonts'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};
