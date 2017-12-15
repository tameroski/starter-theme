'use strict';

/* Change this according to your site URL */
var proxy = "http://localhost:8888/timber_s";

var gulp = require('gulp'),
	$ = require( "gulp-load-plugins" )(),
	browserSync = require('browser-sync').create();

var paths = {
	source:{
		scripts: [
            './src/js/lib/*.js',
            './src/js/*.js',
		],
		styles: [
			'./src/sass/**/*.scss',
		],
		code: [
			'./*.php',
		],
		views: [
			'./templates/**/*.twig',
		]
	},
	dest:{
		scripts: [
			'./static/app.min.js'
		],
		styles: [
			'./style.css',
		]
	}
}

/* STYLES */
gulp.task('styles_clean', function () {
    require('del').sync(paths.dest.styles);
});

gulp.task('styles_main', [], function(){
	return gulp.src('src/sass/style.scss')
		.pipe($.sass({
			//includePaths: ["styles"].concat(require('bulma'))
		}).on('error', $.sass.logError))
		.pipe($.cleanCss({
			compatibility: 'ie10'
		}))
		.pipe($.autoprefixer({ browsers:['last 2 versions'] }))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream())
});

gulp.task('styles', [ 'styles_clean' ], function(){
	gulp.start('styles_main');
});

/* SCRIPTS */
gulp.task('scripts_clean', function () {
    require('del').sync(paths.dest.scripts);
});

gulp.task('scripts_main', [], function(){
	return gulp.src(paths.source.scripts)
		.pipe($.concat('app.min.js'))
		.pipe($.uglify())
		.pipe(gulp.dest('./static/'))
		.pipe(browserSync.stream())
});

gulp.task('scripts', [ 'scripts_clean' ], function(){
	gulp.start('scripts_main');
});

/* BROWSER SYNC */
gulp.task('serve', ['compile'], function() {
	browserSync.init({
		proxy: proxy,
		watchTask: true,
		server: false,
	});

	gulp.watch(paths.source.styles, ['styles']);
	gulp.watch(paths.source.scripts, ['scripts']);
});

/* TASKS */
gulp.task('init', function(){
	var argv = require('yargs').argv;

	if (typeof(argv.name) == 'undefined' || argv.name === ''){
		console.log('Error : name cannot be empty');
  		process.exit(-1)
	}

	gulp.src(paths.source.styles, {base: './'})
		.pipe($.replace("Theme Name: timber_s", "Theme Name: " + argv.name ))
		.pipe($.replace("Text Domain: timber_s", "Text Domain: " + slugify(argv.name) ))
		.pipe($.replace("timber_s-", slugify(argv.name) + "-"))
		.pipe(gulp.dest('./'));

	gulp.src(paths.source.code, {base: './'})
		.pipe($.replace("timber_s", slugify(argv.name)))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', [], function(){
	gulp.watch(paths.source.styles, ['default']);
});

gulp.task('compile', ['scripts', 'styles']);

gulp.task('default', [ 'serve' ]);

/* UTILS */
function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}