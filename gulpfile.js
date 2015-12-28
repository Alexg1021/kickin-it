//load in the plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    ngAnnotate = require('gulp-ng-annotate'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    envfile = require('envfile');

    gulp.task('js-deps', function () {
    gulp.src([
        './public/bower_components/jquery/dist/jquery.min.js',
        './public/bower_components/lodash/lodash.min.js',
        './public/bower_components/moment/min/moment.min.js',
        './public/bower_components/angular/angular.min.js',
        './public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './public/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        './public/bower_components/angular-sanitize/angular-sanitize.min.js',
        './public/bower_components/bootstrap/dist/js/bootstrap.min.js'    ])
        .pipe(concat('deps.js'))
        .pipe(gulp.dest('./build/js'));

    gulp.src(['./public/bower_components/angular/angular.min.js.map'])
        .pipe(gulp.dest('./build/js'));

});

gulp.task('partials', function () {
    gulp.src('./public/javascripts/**/*.html')
        .pipe(gulp.dest('./build/partials'));
});

gulp.task('css-deps', function () {
    gulp.src([
        "./public/bower_components/bootstrap/dist/css/bootstrap.min.css",
        "./public/bower_components/bootstrap/dist/css/bootstrap.min.css.map",
        "./public/bower_components/font-awesome/css/font-awesome.min.css",
        "./public/bower_components/select2/select2.css",
        "./public/bower_components/selectize/dist/css/selectize.default.css"
    ])
        .pipe(concat('css-deps.css'))
        .pipe(gulp.dest('./build/css'));

    gulp.src('./public/bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('./build/fonts'));

    gulp.src('./public/bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('./build/fonts'));

    gulp.src('./public/bower_components/angular-bootstrap/dist/fonts/*')
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('js', function () {
    var baseDir = __dirname + '/public/javascripts',
        outputDir = __dirname + '/build/js',
        outputFilename = 'app.js',
        env = envfile.parseFileSync('.env');

    gulp.src([
        baseDir + "/*module.js",
        baseDir + "/**/*module.js",
        baseDir + "/**/*.js"
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat(outputFilename))
        .pipe(ngAnnotate())
        .pipe(gulpif(env.PRODUCTION === 'true', uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputDir));
});

gulp.task('less', function () {
    gulp.src([
        './public/less/app.less'
    ])
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('serve', function () {
    var env = envfile.parseFileSync('.env');
    nodemon({
        script: './bin/www',
        ext: 'html ejs js',
        ignore: ['build/**/*.*', 'public/**/*.*'],
        tasks: [],
        env: env
    }).on('restart', function () {
        console.log('server restarted....');
    });
});

gulp.task('watch', function () {
    watch(['./public/javascripts/*.js', './public/javascripts/**/*.js'], function () {
        gulp.start('js');
    });

    watch(['./public/javascripts/*.html', './public/javascripts/**/*.html'], function () {
        gulp.start('partials');
    });

    watch(['./public/javascripts/*.css', './public/javascripts/**/*.css'], function () {
        gulp.start('partials');
    });

    watch(['./public/css/*.css'], function () {
        gulp.start('css-deps');
    });

});

gulp.task('default', ['js-deps', 'partials', 'css-deps', 'js', 'less', 'watch', 'serve']);
