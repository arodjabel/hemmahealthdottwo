'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

function sassCompile() {
  gulp.src(['./site/**/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./public'));
}

exports.sassCompile = sassCompile;
