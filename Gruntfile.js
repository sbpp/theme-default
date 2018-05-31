const path = '';
const theme = 'default';

const del = require('del');

module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: false
            },
            dynamic_mappings: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/sass',
                    src: ['**/*.sass'],
                    dest: 'compiled/assets/css',
                    ext: '.css'
                }]
            }
        },
        less: {
            options: {
                compress: false,
                sourceMap: false,
                optimization: null
            },
            dynamic_mappings: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/less',
                    src: ['**/*.less'],
                    dest: 'compiled/assets/css',
                    ext: '.css'
                }]
            }
        },
        copy: {
            css: {
                expand: true,
                cwd: 'src/assets/css',
                src: ['**/*.css'],
                dest: 'compiled/assets/css'
            },
            fonts: {
                expand: true,
                cwd: 'src/assets/fonts',
                src: ['**/*.{ttf,TTF,woff,WOFF,woff2,WOFF2,otf,OTF,EOT,eot}'],
                dest: path + theme + '/assets/fonts'
            },
            templates: {
                expand: true,
                cwd: 'src/templates',
                src: ['**/*.tpl'],
                dest: path + theme + '/templates'
            },
            config: {
                expand: true,
                cwd: 'src',
                src: ['theme.json', 'screenshot.jpg'],
                dest: path + theme + '/'
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPercision: -1
            },
            dynamic_mappings: {
                files: [{
                    expand: true,
                    cwd: 'compiled/assets/bundles',
                    src: ['bundle.css'],
                    dest: path + theme + '/assets/css/',
                    rename: function() {
                        return path + theme + '/assets/css/bundle.min.css';
                    }
                }]
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['env']
            },
            dynamic_mappings: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/js',
                    src: ['**/*.js'],
                    dest: 'compiled/assets/js/',
                    ext: '.js'
                }]
            }
        },
        imagemin: {
            dynamic_mappings: {
                files:[{
                    expand: true,
                    cwd: 'src/assets/images',
                    src: ['**/*.{png,jpg,gif,ico}'],
                    dest: path + theme + "/assets/images"
                }]
            }
        },
        concat: {
            css: {
                src: 'compiled/assets/css/*.css',
                dest: 'compiled/assets/bundles/bundle.css'
            },
            js: {
                src: 'compiled/assets/js/**/*.js',
                dest: 'compiled/assets/bundles/bundle.js'
            }
        },
        uglify: {
            dynamic_mappings: {
                files: [{
                    expand: true,
                    cwd: 'compiled/assets/bundles',
                    src: ['bundle.js'],
                    dest: path + theme + '/assets/js/',
                    rename: function() {
                        return path + theme + '/assets/js/bundle.min.js';
                    }
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('clean-compiled', function() {
        del.sync('compiled/**');
    });

    grunt.registerTask('clean-theme', function() {
        del.sync(path + theme + '/**');
    });

    grunt.registerTask('default', ['clean-theme', 'sass', 'less', 'copy:css', 'copy:fonts', 'copy:templates', 'copy:config', 'babel', 'concat', 'cssmin', 'uglify', 'imagemin', 'clean-compiled']);
}
