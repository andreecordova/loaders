// Inicializando gulp
var gulp = require('gulp');

//Inicializando plugins de gulp
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename =  require('gulp-rename');

gulp.task('css', function() {
  return gulp.src([
    './src/scss/main.scss'
  ])
  .pipe(sass({
    errLogToConsole: true,
    outputStyle: 'compressed'
  }))
  .pipe(cleanCSS({
    level: 2,
    compatibility: 'ie8'
  }))
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest('./dist/css/'))
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      host: '127.0.0.1',
      open: true,
      fallback: './index.html'
    })
  );
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/*.scss', gulp.series('css'))
  gulp.watch('./src/scss/**/*.scss', gulp.series('css'))
});

gulp.task('dev', gulp.series('css', gulp.parallel('webserver', 'watch')));
gulp.task('prod', gulp.series('css'));