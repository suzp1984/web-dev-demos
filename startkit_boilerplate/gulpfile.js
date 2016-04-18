var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('process-html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dest/'));
});

gulp.task('process-styles', function() {
    return sass('src/css/main.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dest/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dest/css/'));
    
});

gulp.task('process-scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dest/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dest/js/'));
});

gulp.task('watch', function() {
    return gulp.watch('src/js/*.js', ['process-scripts'])
        .watch('src/*.html', ['process-html'])
        .watch('src/css/*.scss', ['process-styles']);
});

gulp.task('default', function() {
});

gulp.task('serve', ['process-html', 'process-styles','process-scripts'], function() {
    browserSync({
        port: 5001,
        notify: false,
        logPrefix: 'PSK',
        snippetOptions: {
            rule: {
                match: '<span id="browser-sync-binding"></span>',
                fn: function(snippet) {
                    return snippet;
                }
            }
        },
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            baseDir: ['dest'],
            middleware: []
        }
    });

    gulp.watch('src/js/*.js', ['process-scripts']);
    gulp.watch('src/*.html', ['process-html']);
    gulp.watch('src/css/*.scss', ['process-styles']);

    gulp.watch(['dest/*.html'], reload);
    gulp.watch(['dest/css/*.css'], reload);
    gulp.watch(['dest/js/*.js'],  reload);
});








