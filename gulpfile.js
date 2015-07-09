'use strict';
// generated on 2014-10-20 using generator-shower 0.2.2

var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  ghPages = require('gulp-gh-pages');

gulp.task('connect', function () {
  var connect = require('connect');
  var app = connect()
    .use(require('connect-livereload')({ port: 35729 }))
    .use(connect.static('presentation'));
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    // .use('/bower_components', connect.static('bower_components'))
    // .use(connect.directory('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect'], function () {
  require('opn')('http://localhost:9000');
});

gulp.task('watch', ['connect', 'serve'], function () {
  var server = livereload();

  // watch for changes
  gulp.watch([
    'presentation/*.html',
    'presentation/**/*.css',
    'presentation/**/*.js',
    'presentation/**/*'
  ]).on('change', function (file) {
    server.changed(file.path);
  });
});

gulp.task('deploy', function() {
  return gulp.src('./presentation/**/*')
    .pipe(ghPages());
});
