'use strict';

var gulp = require('gulp'),
	$ = require( "gulp-load-plugins" )();

var paths = {
	source:{
		scripts: [
            './src/js/libs/*.js',
            './src/js/**/*.js',
		],
		styles: [
			'./src/sass/**/*.scss',
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
gulp.task('style_clean', function () {
    require('del').sync(paths.dest.styles);
});

gulp.task('style_main', [], function(){
	return gulp.src('src/sass/style.scss')
		.pipe($.sass({
			//includePaths: ["styles"].concat(require('bulma'))
		}).on('error', $.sass.logError))
		.pipe($.cleanCss({
			compatibility: 'ie10'
		}))
		.pipe($.autoprefixer({ browsers:['last 2 versions'] }))
		.pipe(gulp.dest('./'))
});

gulp.task('style', [ 'style_clean' ], function(){
	gulp.start('style_main');
});

/* SCRIPTS */
gulp.task('scripts_clean', function () {
    require('del').sync(paths.dest.scripts);
});

gulp.task('scripts_main', [], function(){
	return gulp.src(paths.source.scripts)
		.pipe($.concat('app.min.js'))
		.pipe($.uglify())
		.pipe(gulp.dest('./static/'));
});

gulp.task('scripts', [ 'scripts_clean' ], function(){
	gulp.start('scripts_main');
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

});

gulp.task('watch', [], function(){
	gulp.watch(paths.source.styles, ['default']);
});

gulp.task('default', [ 'style', 'scripts' ]);

/* UTILS */
function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}