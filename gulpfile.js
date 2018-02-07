'use strict';

const gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    concat = require('gulp-concat'),
    path = require('path'),
    babel = require('gulp-babel'),
    reload = browserSync.reload;

var pathes = {
    build: {
        html: 'build/',
        js: 'build/app',
        css: 'build/style',
        vendor: 'build/vendor'
    },
    src: {
        html: 'src/*.html',
        js: 'src/app/**/*.js',
        css: 'src/style/style.scss',
        vendor: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-file-saver/dist/angular-file-saver.bundle.min.js',
            'node_modules/ng-file-upload/dist/ng-file-upload.min.js'
        ]
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/app/**/*.js',
        css: 'src/style/**/*.scss'
    }
};

gulp.task('app:build', function () {
    gulp.src(pathes.src.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(pathes.build.js))
        .pipe(reload({stream: true}))
});

gulp.task('vendor:build',function () {
    gulp.src(pathes.src.vendor)
        .pipe(sourcemaps.write())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(pathes.build.vendor));
});

gulp.task('css:build', function () {
    gulp.src(pathes.src.css)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(pathes.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('html:build', function () {
    gulp.src(pathes.src.html) 
        .pipe(gulp.dest(pathes.build.html)) 
        .pipe(reload({stream: true})); 
});

gulp.task('server', _ => {
    browserSync({
        server: {
            baseDir: './build'
        },
        tunnel: true,
        host: 'localhost',
        port: '1337',
        open: false
    })
});

gulp.task('build', [
    'html:build',
    'vendor:build',
    'app:build',
    'css:build'
]);

gulp.task('watch', function(){
    watch([pathes.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([pathes.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([pathes.watch.js], function(event, cb) {
        gulp.start('app:build');
    });
});

gulp.task('clean', function (cb) {
    rimraf('./build', cb);
});


gulp.task('default', ['build', 'server', 'watch']);
