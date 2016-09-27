var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var Zip = require('adm-zip');
var exec = require('exec');
var filesToCompress,
    dirsToCompress;

var archiver = require('archiver');
var awsBeanstalk = require("node-aws-beanstalk");

filesToCompress = ['app.js', 'hemma.js', 'index.html', 'package.json'];
dirsToCompress = ['images', 'server', 'site'];

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

        var output = fs.createWriteStream(__dirname + '/Archive.zip');
        var archive = archiver.create('zip', {});
        archive.pipe(output);

        // addLocalFile(String localPath, String zipPath)
        // addLocalFolder(String localPath, String zipPath)
        for (f = 0; f < filesToCompress.length; f++) {
            // archive.addLocalFile(path.join(__dirname, filesToCompress[f]));
            archive.file(path.join(__dirname, filesToCompress[f]), {name: filesToCompress[f]})
            finalizeArchive();
        }

        for (d = 0; d < dirsToCompress.length; d++) {
            // archive.addLocalFolder(path.join(__dirname, dirsToCompress[d]), path.join('./', dirsToCompress[d]));
            archive.directory(path.join(__dirname, dirsToCompress[d]), path.join('./', dirsToCompress[d]), {name: dirsToCompress[d]})
            finalizeArchive();
        }

        function finalizeArchive() {
            finalizeCounter++;
            if (finalizeCounter === (filesToCompress.length + dirsToCompress.length)) {
                // archive.writeZip(path.join(__dirname, zipName));
                archive.finalize();
                console.log('Archive.zip has been written');
                resolve();
            }
        }
    })
}

function deleteArchive(dir, archive) {
    return new Promise(function (resolve, reject) {
        fs.unlink(archive, function (err) {
            if (!err) {
                console.log('deleted Archive.zip');
                createArchive(dir).then(function () {
                    resolve();
                })
            } else {
                console.log('deleting Archive.zip failed');
                resolve();
            }
        })
    })
}

deployFn = function () {
    return new Promise(function (resolve, reject) {
        var dir,
            archive;

        dir = path.resolve(__dirname);
        archive = path.resolve(__dirname, 'Archive.zip');

        //does archive exist?
        function startDeploy() {
            return new Promise(function (resolve, reject) {
                fs.open(archive, 'r', function (err, fd) {
                    if (err) {
                        if (err.code === "ENOENT") {
                            console.error('Archive.zip is not available');
                            createArchive(dir).then(resolve);
                        } else {
                            deleteArchive(dir, archive).then(resolve);
                        }
                    } else {
                        deleteArchive(dir, archive).then(resolve);
                    }
                });
            })
        }

        startDeploy().then(function () {
            // exec(['eb deploy', '--staged'], function(err, out, code) {
            //     if (err instanceof Error){
            //         throw err;
            //     }
            //     process.stderr.write(err);
            //     process.stdout.write(out);
            //     process.exit(code);
            // });
        });
    });
};

gulp.task('deploy', deployFn);
