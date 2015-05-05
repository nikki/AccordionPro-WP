module.exports = function (grunt) {
  'use strict';

    grunt.initConfig({
      banner: '/*!\n' +
              ' * Plugin Name:    Accordion Pro WP - a responsive accordion plugin for WordPress\n' +
              ' * Plugin URI:     http://accordionpro.nicolahibbert.com\n' +
              ' * Description:    Create jQuery powered responsive accordions to embed into your WordPress posts &amp; pages.\n' +
              ' * Version:        3.0\n' +
              ' * Author:         Nicola Hibbert\n' +
              ' * Author:         Mike Rogers\n' +
              ' * Author URI:     http://stitchui.com/accordion-pro-wp/\n' +
              ' * Text Domain:    accordion_pro\n' +
              ' * \n' +
              ' * Copyright:      (c) 2010-2015 Stitch UI\n' +
              ' * \n' +
              ' * This program is free software; you can redistribute it and/or modify\n' +
              ' * it under the terms of the GNU General Public License, version 2, as\n' +
              ' * published by the Free Software Foundation.\n' +
              ' * \n' +
              ' * This program is distributed in the hope that it will be useful,\n' +
              ' * but WITHOUT ANY WARRANTY; without even the implied warranty of\n' +
              ' * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n' +
              ' * GNU General Public License for more details.\n' +
              ' * \n' +
              ' * You should have received a copy of the GNU General Public License\n' +
              ' * along with this program; if not, write to the Free Software\n' +
              ' * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA\n' +
              ' */\n'//,

      // concat: {
      //   banner: {
      //     options: {
      //       banner: '<%= banner %>'
      //     },
      //     files: [
      //       { src: 'js/lib/jquery.accordionpro.js', dest: 'js/jquery.accordionpro.js' }
      //     ]
      //   },

      //   build: {
      //     options: {
      //       separator: '\n\n',
      //     },
      //     src: [
      //       'js/vendor/imagesloaded.js',
      //       'js/vendor/transitiontest.js',
      //       'js/vendor/animate.js',
      //       'js/jquery.accordionpro.js'
      //     ],
      //     dest: 'js/jquery.accordionpro.js'
      //   }
      // },

      // uglify: {
      //   options: {
      //     preserveComments: 'some'
      //   },
      //   build: {
      //     files: {
      //       'js/jquery.accordionpro.min.js' : 'js/jquery.accordionpro.js'
      //     }
      //   }
      // },

      // sass: {
      //   build: {
      //     options: {
      //       banner: '<%= banner %>',
      //       style: 'compressed'
      //     },
      //     files: {
      //       'css/accordionpro.css' : 'css/scss/accordionpro.scss'
      //     }
      //   }
      // },

      // jasmine: {
      //   src: 'js/jquery.accordionpro.js',
      //   options: {
      //     vendor: [
      //       'bower_components/jquery/dist/jquery.js',
      //       'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
      //     ],
      //     specs: 'test/**/*.js'
      //   }
      // },

      // watch: {
      //   options: {
      //     livereload: true,
      //     spawn: false
      //   },

      //   html: {
      //     files: ['index.html']
      //   },

      //   scss: {
      //     files: ['css/scss/*.scss'],
      //     tasks: ['sass']
      //   },

      //   images: {
      //     files: ['img-demo/*.*']
      //   },

      //   scripts: {
      //     files: ['js/lib/*.js'],
      //     tasks: ['default']
      //   },

      //   jasmine: {
      //     files: ['test/**/*.js'],
      //     tasks: ['test']
      //   }
      // }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task
    grunt.registerTask('default', ['sass', 'concat', 'uglify']);
    grunt.registerTask('test', ['default', 'jasmine']);

  };

