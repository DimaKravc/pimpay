var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var prefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gcmq = require('gulp-group-css-media-queries');

gulp.task('css', function () {
    gulp.src('sass/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            'outputStyle': 'expanded',
            'indentType': 'space',
            'indentWidth': 4
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions', 'IE 9']
        }))
        .pipe(gcmq())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('styles/'))
});

gulp.task('watch', function () {
    watch('sass/**/*.*', function () {
        gulp.start('css')
    })
});

gulp.task('default', ['css', 'watch']);
