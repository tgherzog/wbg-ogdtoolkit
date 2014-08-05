# Getting started

## Install

1. Clone the repository: `git clone git@github.com:Wiredcraft/wbogdtoolkit.git`
1. Install dependencies: `make install`.
    
    *You can also run `npm install` and then `bower install`. You need to have [Gulp.js](http://gulpjs.com/), [node.js](http://nodejs.org) and [npm](https://github.com/npm/npm) installed locally on your machine. If you're on a Mac, do yourself a favor and use [Homebrew](http://brew.sh/).*

## Run

To run the server locally, simply run `gulp development --open --port 4000` at the root of the folder: it should automatically open the website in your browser at `http://localhost:4000/en/`. Your changes on any of the assets or content will automatically be caught and the website will be re-generated.

*You can also run `make dev`, which will install and then run the server.*

## Build

For production, you are usually only compiling once and pushing the static files behind a Web server like NGINX. Moreover, you also want to minify CSS and JS files. For this, simply run `gulp` at the root of the folder.

*You can also run `make build`.*

# Files

The repository contains the following folders and files:

- `Makefile`; acts as a wrapper around the various commands to install and build the site (see `make install`, `make dev` and `make build` in the previous sections).
- `assets/`
- `gulpfile.js`; configuration file for the [Gulp.js](http://gulpjs.com/) build system.
- `package.json`; npm dependencies.
- `public/`; static files like images. *Note that assets are compiled and pushed in the `public/` folder first.*
- `site.json`; the main configuration file for [Metalsmith](http://metalsmith.io)
- `source/`; the content of the website, as markdown files. English content goes in the `en/` subfolder, Spanish content goes in `es/`.
- `templates/`; the [Metalsmith](http://metalsmith.io) templates. In our case, we use [Swig](http://paularmstrong.github.io/swig/).

After installing the website locally, you will also notice the following folders:

- `_site/`; contains the compiled website.
- `node_modules/`; contains the node.js dependencies installed with npm.

# Adding content

Simply add a file in the `source/` folder, either in `en/` or `es/` depending on the locale. For example, if I wanted to add a new English page, with the title "The title of my page" available at `/en/my-page`, the create a `my-page.md` file in the `en/` folder with the following content:

    ---
    title: The title of my page
    locale: en
    ---
    
    The content of my file in **Markdown**.
    
*The first part of the file is called a [YAML front matter](http://jekyllrb.com/docs/frontmatter/), a simple YAML format allowing you to decscribe meta deta such as title and local.*

# CI with devo.ps

[GitHub pages](https://pages.github.com) only supports [Jekyll](http://jekyllrb.com/); we use [devo.ps](http://devo.ps) as a middle man to host the compilation step necessary to support Metalsmith. The way it works:

1. GitHub sends a POST payload to devo.ps on each commit, by using the [webhook feature](https://developer.github.com/webhooks/) configurable at [github.com/Wiredcraft/wbogdtoolkit/settings/hooks](https://github.com/Wiredcraft/wbogdtoolkit/settings/hooks). We point the webhook at the devo.ps webhook: https://wh.devo.ps/boratbot/wiredcraft/rebuild/wbogdtoolkit
2. On reception of the POST payload, devo.ps run the build process (see `make build` above).
3. The result of the compilation is then pushed back in the `gh-pages` branch of this repository.
