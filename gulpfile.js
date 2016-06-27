var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Paths to files
var path = {
  // path to build files
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  // source
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    style: 'src/scss/main.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  // watching files
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/scss/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  }
}

// Local server settings
var config = {
    server: {
      baseDir: './build'
    },
    host: 'localhost',
    port: 9000
}

// Initialization of local server
gulp.task('webserver', function () {
  browserSync(config)
})

// Html task
gulp.task('html:build', function () {
  gulp.src(path.src.html)
    // .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}))
})

// Style task
gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['Firefox >= 31', 'ie >= 9', 'Chrome >= 36', 'Safari >= 6', 'iOS >= 7', 'Android >= 4']
    }))
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}))
})

// JS task
gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}))
})

// Images compression
gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}))
})

// Copying fonts in build
gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
})

// Build task
gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build'
])

// Watching changing in files
gulp.task('watch', function () {
  gulp.watch(path.watch.html, ['html:build'])
  gulp.watch(path.watch.style, ['style:build'])
  gulp.watch(path.watch.js, ['js:build'])
  gulp.watch(path.watch.img, ['image:build'])
  gulp.watch(path.watch.fonts, ['fonts:build'])
})

// Default task
gulp.task('default', ['build', 'webserver', 'watch'])
