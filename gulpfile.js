var gulp = require('gulp');
var server = require('./app.js');
var app;

gulp.task('startServer', function () {
    // Start the server at the beginning of the task 
    server.startServer();
});

gulp.task('stopServer', function () {
    // Start the server at the beginning of the task 
    app.close();
});