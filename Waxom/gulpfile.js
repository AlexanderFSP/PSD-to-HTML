'use strict';

const gulp         = require('gulp'),
      del          = require('del'),
      imagemin     = require('gulp-imagemin'),
      pngquant     = require('imagemin-pngquant'),
      browserSync  = require('browser-sync').create(),
      reload       = browserSync.reload,
      prettify     = require('gulp-html-prettify'),
      autoprefixer = require('gulp-autoprefixer'),
      cssmin       = require('gulp-cssmin'),
      concat       = require('gulp-concat'),
      babel        = require('gulp-babel'),
      uglify       = require('gulp-uglify');

const path = {
  dest: {
    html: './build/',
    css:  './build/css/',
    js:   './build/js/',
    img:  './build/img/'
  },
  src: {
    html:    './src/*.html',
    style:   './src/css/*.css',
    cssLibs: './src/css/libs/**/*.css',
    scripts: './src/js/*.js',
    img:     './src/img/**/*.*',
    jsLibs: {
      jq:        './src/js/libs/jquery-3.3.1.min.js',
      popper:    './src/js/libs/popper.min.js',
      bootstrap: './src/js/libs/bootstrap.min.js'
    }
  },
  watch: {
    html:  './src/*.html',
    style: './src/css/**/*.css',
    js:    './src/js/**/*.js',
    img:   './src/img/**/*.*'
  },
  clean: './build/**/*.*'
};

/**
 *  Очистка сборочной директории
 */
gulp.task('clean', function(cb) {
  del(path.clean).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
    cb();
  });
});

/**
 *  Обработка HTML и перенос в path.build.html
 */
gulp.task('html:build', function() {
  return gulp.src(path.src.html)
            .pipe(prettify({
              indent_char: ' ',
              indent_size: 2
            }))
            .pipe(gulp.dest(path.dest.html))
            .pipe(reload({stream: true}));
});

/**
 *  Перенос библиотек в один файл, установка префиксов к CSS свойствам, минификация и перенос в path.build.css
 */
gulp.task('style:build', function() {
  return gulp.src([path.src.cssLibs, path.src.style])
            .pipe(concat('styles.min.css'))
            .pipe(autoprefixer({
              browsers: ['last 2 versions'],
              cascade: false
            }))
            .pipe(cssmin())
            .pipe(gulp.dest(path.dest.css))
            .pipe(reload({stream: true}));
});

/**
 *  Слияние JS библиотек в один файл, транспиляция JS в ES5, минификация и перенос в path.build.js
 */
gulp.task('js:build', function() {
  return gulp.src([path.src.jsLibs.jq, path.src.jsLibs.popper, path.src.jsLibs.bootstrap, path.src.scripts])
            .pipe(concat('scripts.min.js'))
            .pipe(babel())
            .pipe(uglify())
            .pipe(gulp.dest(path.dest.js))
            .pipe(reload({stream: true}));
});

/**
 *  Оптимизация изображений и перенос в path.build.img
 */
gulp.task('image:build', function() {
  return gulp.src(path.src.img)
            .pipe(imagemin({
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [pngquant()],
              interlaced: true
            }))
            .pipe(gulp.dest(path.dest.img))
            .pipe(reload({stream: true}));
});

/**
 *  Общая задача сборки проекта в ./build/
 */
gulp.task('build', gulp.series('clean', gulp.parallel('html:build', 'style:build', 'js:build', 'image:build')));

/**
 *  Запуск сервера
 */
gulp.task('webserver', function() {
  browserSync.init({
    server: {
      baseDir: "./build/"
    },
    notify: false
  });
});

/**
 *  Наблюдение за изменениями
 */
gulp.task('watch', function() {
  gulp.watch(path.watch.html, gulp.task('html:build'));
  gulp.watch(path.watch.style, gulp.task('style:build'));
  gulp.watch(path.watch.js, gulp.task('js:build'));
  gulp.watch(path.watch.img, gulp.task('image:build'));
});

/**
 *  Задача по умолчанию: сборка, запуск сервера и наблюдения
 */
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'webserver')));