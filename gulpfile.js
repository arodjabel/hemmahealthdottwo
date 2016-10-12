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
                console.log('created blank Archive.zip');
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

runTheArchive = function () {
    return new Promise(function (resolve, reject) {
        var dir,
            archive;

        dir = path.resolve(__dirname);
        archive = path.resolve(__dirname, 'Archive.zip');

        //does archive exist?
        function startDeploy() {
            return new Promise(function (resolve, reject) {
                function closeTheFile(fd){
                    fs.close(fd);
                    resolve();
                }
                fs.open(archive, 'r', function (err, fd) {
                    if (err) {
                        if (err.code === "ENOENT") {
                            console.error('Archive.zip is not available');
                            createArchive(dir).then(function (){
                                closeTheFile(fd)
                            });
                        } else {
                            deleteArchive(dir, archive).then(function(){
                                closeTheFile(fd)
                            });
                        }
                    } else {
                        deleteArchive(dir, archive).then(function(){
                            closeTheFile(fd)
                        });
                    }
                });
            })
        }
        startDeploy();
        // startDeploy().then(deployToEb);
    });
};

function deployToEb(){
    console.log('starting EB deploy');
    const spawn = require('child_process').spawn;
    const ls = spawn('eb', ['deploy', '--staged']);

    ls.stdout.setEncoding('utf8');
    ls.stderr.setEncoding('utf8');

    ls.stdout.on('data', function(data) {

        var str = data.toString(), lines = str.split(/(\r?\n)/g);
        for (var i=0; i<lines.length; i++) {
            // Process the line, noting it might be incomplete.
            if(lines[i])
                console.log(lines[i])
        }
    });

    ls.stderr.on('data', function(data) {
        var str = data.toString(), lines = str.split(/(\r?\n)/g);
        for (var i=0; i<lines.length; i++) {
            // Process the line, noting it might be incomplete.
            if(lines[i])
                console.log(lines[i])
        }
    });

    ls.on('close', function(code) {
        console.log(code);
    });
}

gulp.task('archive', runTheArchive);
gulp.task('ebDeploy', deployToEb);
