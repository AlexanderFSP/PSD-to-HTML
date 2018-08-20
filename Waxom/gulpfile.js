'use strict';

const gulp         = require('gulp'),
			notify       = require('gulp-notify'),
      prettify     = require('gulp-html-prettify'),
      autoprefixer = require('gulp-autoprefixer'),
      cssmin       = require('gulp-cssmin'),
			rename       = require('gulp-rename'),
			babel 			 = require('gulp-babel'),
			uglify       = require('gulp-uglify'),
			browserSync  = require('browser-sync').create(),
      reload       = browserSync.reload;
		 
// html | gulp-prettify, gulp-notify
gulp.task('html', function() {
		return gulp.src('./src/*.html')
							.pipe(prettify({
									indent_char: ' ',
									indent_size: 2
							}))
							.pipe(gulp.dest('./build'))
							.pipe(notify('HTML has been successfully compiled...'));
});

// css | gulp-autoprefixer, gulp-cssmin, gulp-rename, gulp-notify
gulp.task('css', function() {
		return gulp.src('./src/css/*.css')
							.pipe(autoprefixer({
								browsers: ['last 2 versions'],
								cascade: false
              }))
              .pipe(cssmin())
              .pipe(rename({
								suffix: '.min'
					  	}))
							.pipe(gulp.dest('./build/css'))
							.pipe(notify('CSS has been successfully compiled...'));
});

// css-libs | gulp-notify
gulp.task('css-libs', function() {
	return gulp.src('./src/css/libs/**/*.css')
						.pipe(gulp.dest('./build/css/libs'))
						.pipe(notify('CSS-libs have been successfully moved...'));
});

// js | gulp-babel, gulp-uglify, gulp-rename, gulp-notify
gulp.task('js', function() {
	return gulp.src('./src/js/*.js')
					.pipe(babel())
					.pipe(uglify())
					.pipe(rename({
							suffix: '.min'
					}))
					.pipe(gulp.dest('./build/js'))
					.pipe(notify('Script successfully transpailed and uglified...'));
});

// js-libs | gulp-notify
gulp.task('js-libs', function() {
	return gulp.src('./src/js/libs/**/*.js')
					.pipe(gulp.dest('./build/js/libs'))
					.pipe(notify('Script successfully transpailed and uglified...'));
});

// watcher
gulp.task('watcher', gulp.series(gulp.parallel('html', 'css', 'css-libs', 'js', 'js-libs'), function() {
		browserSync.init({
				server: "./build/",
				notify: false
		});

		gulp.watch('./src/*.html', gulp.task('html')).on('change', reload);
		gulp.watch('./src/css/*.css', gulp.task('css')).on('change', reload);
		gulp.watch('./src/js/*.js', gulp.task('js')).on('change', reload);
}));

// default
gulp.task('default', gulp.task('watcher'));