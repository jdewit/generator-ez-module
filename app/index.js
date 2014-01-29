'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var EzPluginGenerator = module.exports = function EzPluginGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appName = this._.camelize(this._.slugify(this._.humanize(this.appname)));
  this.moduleName = this.appname.replace('-', '.');

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(EzPluginGenerator, yeoman.generators.Base);

EzPluginGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      type: 'input',
      name: 'description',
      message: 'Enter the module description',
      default: 'A module',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter your name',
      default: 'Joris de Wit'
    },
    {
      type: 'input',
      name: 'username',
      message: 'Enter your github username',
      default: 'jdewit'
    },
    {
    type: 'checkbox',
      name: 'modules',
      message: 'Which modules would you like to include?',
      choices: [{
        value: 'angular-bootstrap',
        name: 'angular-bootstrap',
        checked: true
      }, {
        value: 'grunt-less',
        name: 'grunt-less',
        checked: true
      }, {
        value: 'grunt-ngtemplates',
        name: 'grunt-ngtemplates',
        checked: true
      }]
    }
  ];

  this.prompt(prompts, function (props) {
    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
    var angMods = [];

    this.description = props.description;
    this.author = props.author;
    this.username = props.username;

    this.angularBootstrap = hasMod('angular-bootsrap');
    this.gruntLess = hasMod('grunt-less');
    this.gruntNgtemplates = hasMod('grunt-ngtemplates');

    cb();
  }.bind(this));
};

EzPluginGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('dist');
  this.mkdir('test');

  this.copy('.gitignore', '.gitignore');
  this.copy('LICENSE', 'LICENSE');
  this.copy('tpl.html', 'src/' + this.appname + '-tpl.html');
  this.copy('style.less', 'src/' + this.appname + '.less');

  this.template('src.js', 'src/' + this.appname + '.js');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_karma.conf.js', 'karma.conf.js');
  this.template('_README.md', 'README.md');
  this.template('_index.html', 'index.html');

};

EzPluginGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
