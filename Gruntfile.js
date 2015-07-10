module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: [
          // jQuery
          //'bower_components/jquery/dist/jquery.min.js',

          // Foundation core
          'bower_components/foundation/js/foundation/foundation.js',
          
          // Pick the componenets you need in your project
          //'bower_components/foundation/js/foundation/foundation.abide.js',
          //'bower_components/foundation/js/foundation/foundation.accordion.js',
          'bower_components/foundation/js/foundation/foundation.alert.js',
          //'bower_components/foundation/js/foundation/foundation.clearing.js',
          //'bower_components/foundation/js/foundation/foundation.dropdown.js',
          //'bower_components/foundation/js/foundation/foundation.equalizer.js',
          //'bower_components/foundation/js/foundation/foundation.interchange.js',
          //'bower_components/foundation/js/foundation/foundation.joyride.js',
          'bower_components/foundation/js/foundation/foundation.magellan.js',
          //'bower_components/foundation/js/foundation/foundation.offcanvas.js',
          //'bower_components/foundation/js/foundation/foundation.orbit.js',
          //'bower_components/foundation/js/foundation/foundation.reveal.js',
          //'bower_components/foundation/js/foundation/foundation.slider.js',
          //'bower_components/foundation/js/foundation/foundation.tab.js',
          'bower_components/foundation/js/foundation/foundation.tooltip.js',
          'bower_components/foundation/js/foundation/foundation.topbar.js',
          
          // Using all of your custom js files
          'js/custom/*.js'
          
          ],
          // Concat all the files above into one single file
          dest: 'js/foundation.js',
        },
      },

    uglify: {
      dist: {
        files: {
          // Shrink the file size by removing spaces
          'js/foundation.js': ['js/foundation.js']
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['sass', 'concat', 'uglify' ]);
  grunt.registerTask('default', ['build','watch']);
}
