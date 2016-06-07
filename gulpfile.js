var gulp = require('gulp');
var gutil = require('gulp-util');
//var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var webpack = require('webpack-stream');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  sass: ['./scss/**/*.scss']
};
function errHandler(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('default', ['sass', 'webpack', 'js-libraries']);

gulp.task('js-libraries', function() {
  gulp.src('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css')
      .pipe(gulp.dest('./www/css'))
});

gulp.task('sass', function(done) {
  // gulp.src(['./scss/ionic.app.scss'])
  //   .pipe(sass())
  //   .on('error', sass.logError)
  //   .pipe(rename({ basename: 'styles' }))
  //   .pipe(gulp.dest('./www/css/'))
  //   .pipe(minifyCss({
  //     keepSpecialComments: 0
  //   }))
  //   .pipe(rename({ extname: '.min.css' }))
  //   .pipe(gulp.dest('./www/css/'))
  //   .on('end', done);
  done();
});

gulp.task('webpack', function() {
    return gulp.src(['beeline-admin/main.js', '!node_modules/**/*.js', '!www/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(webpack(require('./webpack.config.js'))
        .on('error', errHandler))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/lib/beeline-admin'))
    .on('error', errHandler)
});

gulp.task('watch', ['sass', 'webpack', 'js-libraries'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(['beeline-admin/**/*.js', 'beeline-admin/**/*.html', 'scss/*.scss'], ['webpack']);
});

//gulp.task('install', ['git-check'], function() {
//  return bower.commands.install()
//    .on('log', function(data) {
//      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
//    });
//});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
