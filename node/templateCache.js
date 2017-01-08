'use strict';

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');

function cacheTemplates() {
  gulp.src(['site/**/*.html'])
      .pipe(templateCache(
          'templateCache.js',
          {module: 'templateCache', standalone: true}
      ))
      .pipe(gulp.dest('site'));
}

exports.cacheTemplates = cacheTemplates;
