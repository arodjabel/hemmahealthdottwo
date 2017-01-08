'use strict';

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var Zip = require('adm-zip');
var exec = require('exec');
var templateCache = require('./node/templateCache.js');
var compile = require('./node/compress.js');
var sassCompile = require('./node/sassCompile.js');
var filesToCompress,
    dirsToCompress;

var archiver = require('archiver');
var awsBeanstalk = require('node-aws-beanstalk');

filesToCompress = ['app.js', 'index.html', 'package.json'];
dirsToCompress = ['images', 'public', 'server'];

function createArchive(dir) {
  return new Promise(function (resolve, reject) {
    var archive,
        output,
        f,
        d,
        thisDir,
        destPath,
        finalizeCounter = 0,
        zipName = './Archive.zip';

    // creates new in memory zip

    output = fs.createWriteStream(__dirname + '/Archive.zip');
    archive = archiver.create('zip', {});
    archive.pipe(output);

    // addLocalFile(String localPath, String zipPath)
    // addLocalFolder(String localPath, String zipPath)
    for (f = 0; f < filesToCompress.length; f++) {
      // archive.addLocalFile(path.join(__dirname, filesToCompress[f]));
      archive.file(path.join(__dirname, filesToCompress[f]), {name: filesToCompress[f]});
      finalizeArchive();
    }

    for (d = 0; d < dirsToCompress.length; d++) {
      // archive.addLocalFolder(path.join(__dirname, dirsToCompress[d]), path.join('./', dirsToCompress[d]));
      archive.directory(path.join(__dirname, dirsToCompress[d]), path.join('./', dirsToCompress[d]), {name: dirsToCompress[d]});
      finalizeArchive();
    }

    function finalizeArchive() {
      finalizeCounter++;
      if (finalizeCounter === (filesToCompress.length + dirsToCompress.length)) {
        // archive.writeZip(path.join(__dirname, zipName));
        archive.finalize();
        console.log('created blank Archive.zip');
        resolve();
      }
    }
  });
}

function deleteArchive(dir, archive) {
  return new Promise(function (resolve, reject) {
    fs.unlink(archive, function (err) {
      if (!err) {
        console.log('deleted Archive.zip');
        createArchive(dir).then(function () {
          resolve();
        });
      } else {
        console.log('deleting Archive.zip failed');
        resolve();
      }
    });
  });
}

function runTheArchive() {
  return new Promise(function (resolve, reject) {
    var dir,
        archive;

    dir = path.resolve(__dirname);
    archive = path.resolve(__dirname, 'Archive.zip');

    //does archive exist?
    function startDeploy() {
      return new Promise(function (resolve, reject) {
        function closeTheFile(fd) {
          fs.close(fd);
          resolve();
        }

        fs.open(archive, 'r', function (err, fd) {
          if (err) {
            if (err.code === 'ENOENT') {
              console.error('Archive.zip is not available');
              createArchive(dir).then(function () {
                closeTheFile(fd);
              });
            } else {
              deleteArchive(dir, archive).then(function () {
                closeTheFile(fd);
              });
            }
          } else {
            deleteArchive(dir, archive).then(function () {
              closeTheFile(fd);
            });
          }
        });
      });
    }

    startDeploy();
  });
}

gulp.task('templateCache', templateCache.cacheTemplates);
gulp.task('compile', compile.compress);
gulp.task('sassCompile', sassCompile.sassCompile);

gulp.task('watch', function () {
  gulp.watch('site/**/*.html', ['templateCache']);
  gulp.watch('site/**/*.js', ['compile']);
  gulp.watch('site/**/*.css', ['sassCompile']);
});

gulp.task('archive', runTheArchive);
gulp.task('default', ['watch']);
