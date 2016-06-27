var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Переменная с указанием всех необходимых путей
var path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: { //Пути откуда брать исходники
    html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
    style: 'src/scss/main.scss',
    img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    fonts: 'src/fonts/**/*.*'
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/scss/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

// Настройки сервера
var config = {
    server: {
      baseDir: "./build"
    },
    host: 'localhost',
    port: 9000
};

// Запуск локального сервера
gulp.task('webserver', function () {
  browserSync(config);
});

// Сборка html
gulp.task('html:build', function () {
  gulp.src(path.src.html) //Выберем файлы по нужному пути
    // .pipe(rigger()) //Прогоним через rigger
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
    .pipe(reload({stream: true}));
});

// Сборка css
gulp.task('style:build', function () {
  gulp.src(path.src.style) //Выберем наш main.scss
    .pipe(sass().on('error', sass.logError)) //Скомпилируем
    .pipe(autoprefixer({
      browsers: ['Firefox >= 31', 'ie >= 9', 'Chrome >= 36', 'Safari >= 6', 'iOS >= 7', 'Android >= 4']
    }))
    .pipe(cssmin()) //Сожмем
    .pipe(gulp.dest(path.build.css)) //И в build
    .pipe(reload({stream: true}));
});

// Сборка js
gulp.task('js:build', function () {
  gulp.src(path.src.js) //Найдем наш main файл
    .pipe(rigger()) //Прогоним через rigger
    .pipe(uglify()) //Сожмем наш js
    .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
    .pipe(reload({stream: true}));
});

// Оптимизация изображений
gulp.task('image:build', function () {
  gulp.src(path.src.img) //Выберем наши картинки
    .pipe(imagemin())
    .pipe(gulp.dest(path.build.img)) //И бросим в build
    .pipe(reload({stream: true}));
});

// Копирование шрифтов в production-версию
gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

// Задача Build
gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build'
]);

// // Очистка папки build
// gulp.task('clean', function (cb) {
//     rimraf(path.clean, cb);
// });

// Отслеживание изменений в файлах
gulp.task('watch', function(){
  gulp.watch(path.watch.html,['html:build'])
  gulp.watch(path.watch.style,['style:build'])
  gulp.watch(path.watch.js,['js:build'])
  gulp.watch(path.watch.img,['image:build'])
  gulp.watch(path.watch.fonts,['fonts:build'])
})

// Задача по умолчанию
gulp.task('default', ['build', 'webserver', 'watch']);
