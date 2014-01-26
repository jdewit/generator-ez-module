'use_strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        push: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json']
      }
    },
    jshint: {
      options: {
        jshintrc: true,
      },
      src: {
        files: {
          src: ['src/**/*.js', 'test/**/*.js']
        },
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
      },
      singleRun: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    less: {
      dist: {
        options: {
          yuicompress: true
        },
        files: {
          "dist/<%= appname %>.min.css": "src/less/<%= appname %>.less"
        }
      }
    },
    clean: {
      coverage: 'coverage'
    },
    ngtemplates:  {
      main:      {
        src:      'src/**/*.html',
        dest:     'dist/<%= appname %>-tpl.js',
        options: {
          module: '<%= moduleName %>',
          url: function(url) {
            return url.replace('src/', '');
          }
        }
      }
    },
    uglify: {
      options: {
        mangle: false,
        compile: true,
        compress: true
      },
      dist: {
        files: {
          'dist/<%= appname %>.min.js': ['src/**/*.js']
        }
      }
    },
    watch: {
      all: {
        files: ['Gruntfile.js', 'src/**/*', 'test/**/*Spec.js'],
        tasks: ['default', 'karma:unit:run'],
        options: {
          livereload: <%= _.random(1000, 9999) %>,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('default', ['jshint', 'ngtemplates', 'uglify']);
  grunt.registerTask('dev', ['shell:clearCoverage', 'karma:unit:start', 'watch']);
  grunt.registerTask('test', ['karma:unit:singleRun']);
};
