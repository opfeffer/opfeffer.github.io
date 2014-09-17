var gulp = require('gulp'),
	concat = require('gulp-concat'),
	mainBowerFiles = require('main-bower-files'),
	sass = require('gulp-ruby-sass'),
	webserver = require('gulp-webserver'),
	handlebars = require('gulp-handlebars'),
	wrap = require('gulp-wrap'),
	declare = require('gulp-declare');

gulp.task('bower', function() {
	return gulp.src(mainBowerFiles(/* options */))
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      open: true
    }));
});

gulp.task('scripts', function() {
  return gulp.src('src/*.js')
    .pipe(gulp.dest('build'));
});

gulp.task('templates', function(){
  gulp.src('src/templates/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'App.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('sass', function() {
  return gulp.src('src/*.scss')
    .pipe(sass({ style: 'compressed' }))
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function() {
	gulp.src(['src/*.json', 'src/*.html'])
		.pipe(gulp.dest('build'))
});

gulp.task('watch', function() {
	gulp.watch('src/*.js', ['scripts']);
	gulp.watch('src/templates/*.hbs', ['templates']);
	gulp.watch('src/*.scss', ['sass']);
	gulp.watch(['src/*.json', 'src/*.html'], ['copy']);
});

gulp.task('default', ['templates', 'sass', 'copy', 'webserver', 'watch'], function() {});