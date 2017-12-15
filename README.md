
# The Timber Starter Theme

The "_s" for Timber: a dead-simple theme that you can build from, using [Bulma](http://www.bulma.io) and some useful gulp magic.

## Installing the Theme

Install this theme as you would any other, and be sure the Timber plugin is activated. But hey, let's break it down into some bullets:

1. Make sure you have installed the plugin for the [Timber Library](https://wordpress.org/plugins/timber-library/) (and Advanced Custom Fields - they [play quite nicely](http://timber.github.io/timber/#acf-cookbook) together). 
2. Download the zip for this theme (or clone it) and move it to `wp-content/themes` in your WordPress installation. 
3. Unzip it in a folder of your choice
4. Run `npm install`
5. Run `npm init --name=THEME_NAME` if you want your theme to have a specific name. No spaces or special characters allowed.
6. Activate the theme in Appearance >  Themes.
7. Edit the proxy variable in `gulpfile.js` to point to your site URL.
8. Run `gulp` to start watching for sass/javascript changes and sync your browser. The browser sync will run at the default `localhost:3000` domain (context path is unchanged).
9. Do your thing! And read [the docs](https://github.com/jarednova/timber/wiki)

Don't forget to edit `humans.txt`.

## What's here?

`src/` is where the source files for your sass and javascript should live.

`static/` is where you can keep your static front-end stuff like images, font files, etc.

`templates/` contains all of your Twig templates. These pretty much correspond 1 to 1 with the PHP files that respond to the WordPress template hierarchy. At the end of each PHP template, you'll notice a `Timber::render()` function whose first parameter is the Twig file where that data (or `$context`) will be used. Just an FYI.

## Other Resources

The [main Timber Wiki](https://github.com/jarednova/timber/wiki) is super great, so reference those often. Also, check out these articles and projects for more info:

* [This branch](https://github.com/laras126/timber-starter-theme/tree/tackle-box) of the starter theme has some more example code with ACF and a slightly different set up.
* [Twig for Timber Cheatsheet](http://notlaura.com/the-twig-for-timber-cheatsheet/)
* [Timber and Twig Reignited My Love for WordPress](https://css-tricks.com/timber-and-twig-reignited-my-love-for-wordpress/) on CSS-Tricks
* [A real live Timber theme](https://github.com/laras126/yuling-theme).
* [Timber Video Tutorials](http://timber.github.io/timber/#video-tutorials) and [an incomplete set of screencasts](https://www.youtube.com/playlist?list=PLuIlodXmVQ6pkqWyR6mtQ5gQZ6BrnuFx-) for building a Timber theme from scratch.

