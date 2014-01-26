module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai'],

    reporters: ['progress', 'coverage'],

    files: [
      // libraries
      'bower_components/jquery/jquery.js',
      'bower_components/jquery-ui/ui/jquery-ui.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',

      // app
      'src/<%= appname %>.js',
      'dist/<%= appname %>-tpl.js',

      // tests
      'test/**/*Spec.js',
    ],

    preprocessors: {
      'src/<%= appname %>.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'test/coverage/'
    },

    background: false,

    port: <%= _.random(1000, 9999) %>,

    browsers: ['Chrome']
  });
};
