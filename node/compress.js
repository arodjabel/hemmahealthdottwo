'use strict';
var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

function compress() {
  gulp.src('site/**/*.js')
      .pipe(concat('dist.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('public'));
}

exports.compress = compress;
