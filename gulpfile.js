const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
  
gulp.task('minify-js', () => {
    return gulp.src('./dev/js/*.js')
        .pipe(minify())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('sass', () => {
    return gulp.src('./dev/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dev/css'));
});
   
gulp.task('sass:watch', () => {
    gulp.watch('./dev/css/**/*.scss', gulp.series('sass'));
});

gulp.task('autoprefixer', () => {
    return gulp.src('./dev/css/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./dev/css'))
})

gulp.task('minify-css', () => {
    return gulp.src('./dev/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-html', () => {
    return gulp.src('./dev/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('serve', gulp.series('sass', 'autoprefixer', 'minify-css', 'minify-html'));