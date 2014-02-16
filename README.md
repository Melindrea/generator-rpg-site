# RPG Site generator

> [Yeoman][yeoman] generator for [Assemble][assemble]. Creates a specific site based on needs for my private chronicles (hence npm link rather than posting it to NPM). Based on [Generator-Assemble][generator-assemble]

## Getting started
- Install the generator:
    `git clone git@github.com:Melindrea/generator-rpg-site.git`
    `npm link`


## Usage

Creates an Assemble-based RPG Site boilerplate project.

```bash
mkdir project && cd $_
yo rpg-site
```

#### Options

* `-i` alias `--init`

  Force to prompt question and re-initialize `.yo-rc.json`.

* `-s` alias `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `-w` alias `--skip-welcome-message`

  Skips app welcome message.


## Include in boilerplate
* time-grunt
* grunt-contrib-clean
* grunt-contrib-connect
* grunt-contrib-watch


## Boilerplate
The following directory structure generated after run `yo rpg-site`:

    .
    ├── .editorconfig
    ├── .gitignore
    ├── .yo-rc.json
    ├── AUTHORS
    ├── CHANGELOG
    ├── Gruntfile.js
    ├── LICENSE-MIT
    ├── package.json
    ├── README.md
    ├── dist
    │   └── assets
    │       ├── css
    │       │   ├── bootstrap.css
    │       │   ├── bootstrap.min.css
    │       │   └── theme.css
    │       ├── js
    │       │   └── bootstrap.min.js
    │       └── fonts
    │           ├── glyphicons-halflings-regular.eot
    │           ├── glyphicons-halflings-regular.svg
    │           ├── glyphicons-halflings-regular.ttf
    │           └── glyphicons-halflings-regular.woff
    ├── src
    │   ├── content
    │   │   └── markdown.md
    │   ├── data
    │   │   └── site.yml
    │   └── templates
    │       ├── layouts
    │       │   └── default.md
    │       ├── pages
    │       │   ├── index.hbs
    │       │   └── blog.hbs
    │       └── partials
    │           └── navbar-fixed-top.hbs
    └── node_modules

## Related

 * [Assemble Helper generator](https://github.com/assemble/generator-helper)
 * [Assemble Plugin generator](https://github.com/assemble/generator-plugin)
 * [grunt-init-assemble](https://github.com/assemble/grunt-init-assemble)


## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[yeoman]: http://yeoman.io/
[assemble]: http://assemble.io
[generator-assemble]: https://github.com/assemble/generator-assemble
