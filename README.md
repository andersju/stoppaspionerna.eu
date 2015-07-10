Code for https://stoppaspionerna.eu/

Uses [ZURB Foundation](http://foundation.zurb.com/) 5.5.0, [jsPDF](https://github.com/MrRio/jsPDF) and the fonts [Source Sans Pro](https://github.com/adobe-fonts/source-sans-pro), [Oswald](https://github.com/vernnobile/OswaldFont) and [Font Awesome](http://fontawesome.io/). Site-specific JavaScript is in `js/custom/spioner.js`. We don't want to load any external resources, so everything is self-hosted.

To get started:

```bash
npm install && bower install
grunt build
```

Original Foundation README.md:

# Foundation libsass template

This is a template to start your own project that uses Grunt and libsass!

## Requirements

You'll need to have the following items installed before continuing.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`
  * [Bower](http://bower.io): Run `[sudo] npm install -g bower`

## Quickstart

```bash
git clone git@github.com:zurb/foundation-libsass-template.git
npm install && bower install
```

While you're working on your project, run:

`grunt`

And you're set!

## Directory Structure

  * `scss/_settings.scss`: Foundation configuration settings go in here
  * `scss/app.scss`: Application styles go here
