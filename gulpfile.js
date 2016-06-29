var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    rimraf = require('rimraf');

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
    html: 'src/templates/*.jade',
    js: 'src/js/main.js',
    style: 'src/scss/main.scss',
    img: ['src/img/**/*.*', '!src/img/**/*.svg'],
    svg: 'src/img/**/*.svg',
    fonts: 'src/fonts/**/*.*'
  },
  // watching files
  watch: {
    html: 'src/**/*.jade',
    js: 'src/js/**/*.js',
    style: 'src/scss/**/*.scss',
    img: ['src/img/**/*.*', '!src/img/**/*.svg'],
    svg: 'src/img/**/*.svg',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
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
    .pipe(jade({
      pretty: true
    }))
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

// SVG sprite creation
gulp.task('svgSprite:build', function () {
  gulp.src(path.src.svg)
  // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill')
        $('[stroke]').removeAttr('stroke')
        $('[style]').removeAttr('style')
      },
      parserOptions: {xmlMode: true}
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg',
          render: {
            scss: {
              dest: '../../../src/scss/base/icons.scss',
              template: 'src/scss/base/sprite-template.scss'
            }
          }
        }
      }
    }))
    .pipe(gulp.dest(path.build.img))
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
  'image:build',
  'svgSprite:build'
])

// Watching changing in files
gulp.task('watch', function () {
  gulp.watch(path.watch.html, ['html:build'])
  gulp.watch(path.watch.style, ['style:build'])
  gulp.watch(path.watch.js, ['js:build'])
  gulp.watch(path.watch.img, ['image:build'])
  gulp.watch(path.watch.svg, ['svgSprite:build'])
  gulp.watch(path.watch.fonts, ['fonts:build'])
})

// Default task
gulp.task('default', ['build', 'webserver', 'watch'])

// Folder build deleting
gulp.task('clean', function (cb) {
  rimraf(path.clean, cb)
})
