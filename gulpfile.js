const { src, dest, series, watch } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpWebpack = require('webpack-stream');
const cleanCSS = require('gulp-clean-css');

function pagesTask() {
  return src('src/*.html')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
}

function stylesTask() {
  return src('src/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/styles'));
}

function scriptsTask() {
  return src('src/scripts/app.js')
    .pipe(sourcemaps.init())
    .pipe(gulpWebpack({ mode: 'production', output: { filename: 'app.js' } }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/scripts'));
}

function watchTask() {
  return watch(['src/**/**/**'], series(pagesTask, stylesTask, scriptsTask));
}

exports.default = series(pagesTask, stylesTask, scriptsTask);
exports.watch = watchTask;