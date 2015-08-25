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
              ' * Copyright:      (c) 2011-2015 Stitch UI\n' +
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
              ' */\n',

      sync: {
        toBuild: {
          files: [
            {
              src: ['*.php', '*.txt', 'README', 'css/**', 'js/**', 'inc/**'],
              dest: '_build'
            }
          ],
          failOnError: true,
          pretend: false, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
          verbose: false // Display log messages when copying files
        },

        toWP: {
          files: [{
            cwd: '_build',
            src: ['**'],
            dest: '/Volumes/files/webserver/websites/wordpress_4-1/wp-content/plugins/accordionpro_wp',
          }],
          failOnError: true,
          pretend: false, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
          verbose: false // Display log messages when copying files
        }
      },

      watch: {
        scripts: {
          files: ['css/*.css', 'js/*.js', '**/*.php'],
          tasks: ['sync'],
          options: {
            spawn: true,
            livereload: true
          },
        },
      }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sync');

    // Default task
    grunt.registerTask('default', 'sync');
  };