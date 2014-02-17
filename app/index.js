'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');

/**
 * Module exports RPGSite Generator constructor
 * Extend Yeoman base generator
 */

var RPGSiteGenerator = yeoman.generators.Base.extend({

  init: function () {
    this.pkg = require('../package.json');
    this.description = this.pkg.description;

    this.option('init', {
      alias: 'i',
      desc: 'Force to prompt question and re-initialize of .yo-rc.json',
      type: String,
      defaults: false,
      required: false
    });

    this.init = this.options['init'] || this.options['i'] || false;

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install'] || this.options['s'],
        skipMessage: this.options['skip-welcome-message'] || this.options['w'],
        callback: function () {
          this.spawnCommand('grunt', ['build']);
        }.bind(this)
      });
    });

    this.config.defaults({
      projectName   : "",
      projectDesc   : "The best project ever.",
      githubUser    : "Melindrea",
      author: {
        name        : this.user.git.username || process.env.user || process.env.username,
        login       : "assemble",
        email       : this.user.git.email
      }
    });

  }, // init

  askFor: function () {
    var done = this.async();

    var force = false;

    if (!this.config.existed || this.init) {
      force = true;
    }

    if (!this.options['skip-welcome-message']) {
      console.log(this.yeoman);
    }

    var questions = [];

    (!this.config.get("projectName") || force) && questions.push({
      type    : "input",
      name    : "projectName",
      message : "Your project name",
      default : this.appname
    });

    (!this.config.get("projectDesc") || force) && questions.push({
      type    : "input",
      name    : "projectDesc",
      message : "Your project description",
      default : this.config.get("projectDesc")
    });

    (!this.config.get("githubUser") || force) && questions.push({
      type    : "input",
      name    : "githubUser",
      message : "Would you mind telling me your username on Github?",
      default : this.config.get("githubUser")
    });

    var choices = [];

    this.prompt(questions, function (answers) {

      this.projectName = answers.projectName || this.config.get("projectName");
      this.projectDesc = answers.projectDesc || this.config.get("projectDesc");
      this.authorLogin = answers.githubUser || this.config.get("githubUser");
      this.authorName  = this.config.get("author").name;
      this.authorEmail = this.config.get("author").email;

      //save config to .yo-rc.json
      this.config.set(answers);

      done();
    }.bind(this));
  }, // askFor

  projectfiles: function () {
    this.template('AUTHORS');
    this.template('CHANGELOG');
    this.template('LICENSE-MIT');
    this.template('Gruntfile.js');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('editorconfig', '.editorconfig');
    this.template('bowerrc', '.bowerrc');
    this.template('README.md');
  },

  gitfiles: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  assets: function () {
    this.directory('assets', 'src/assets');
  },

  src: function () {
    this.mkdir('src/data');
    this.mkdir('src/content');
    this.mkdir('src/templates/pages');
    this.mkdir('src/templates/layouts');
    this.mkdir('src/templates/partials');
    this.copy('site.yml', 'src/data/site.yml');
    this.copy('index.hbs', 'src/templates/pages/index.hbs');
    this.copy('layout.hbs', 'src/templates/layouts/default.hbs');
    this.copy('inc-navbar-fixed-top.hbs', 'src/templates/partials/navbar-fixed-top.hbs');
  },

  normalizePackage: function() {
    var pkgFile = path.join(this.destinationRoot(process.cwd()), 'package.json');
    var pkgObj = this.read(pkgFile);
    this.conflicter.force = true;
    this.write('package.json', JSON.stringify(JSON.parse(pkgObj), null, 2));
  },

});

module.exports = RPGSiteGenerator;
