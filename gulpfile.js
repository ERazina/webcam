"use strict";

let gulp = require('gulp'),
    scss = require('gulp-sass'),
    browserSync = require('browser-sync').create();

// Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });


    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/scss/*.scss', ['scss']);
    gulp.watch('src/js/*.js', ['js']);

});

// HTML
gulp.task('html', function() {
    gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
});

// Чистка папки продакшена
gulp.task('clean', function (cb) {
    cleaner(build, cb);
});

// Перекидываем javascript
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('build/js'));
});


// SCSS
gulp.task('scss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(scss().on('error', function(error) {
            console.log(error);
        }))
        .pipe(gulp.dest('build/css'));
});

gulp.task('default', function() {
    gulp.run('clean');
    gulp.run('html');
    gulp.run('scss');
    gulp.run('js');
    gulp.run('browser-sync');


    gulp.watch('build/*.html').on('change', browserSync.reload);
    // gulp.watch('build/img/*.*').on('change', browserSync.reload);
    gulp.watch('build/js/*.js').on('change', browserSync.reload);
    gulp.watch('build/css/*.css').on('change', browserSync.reload);
});