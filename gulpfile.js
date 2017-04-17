var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var jade        = require('gulp-jade');
var browserSync = require('browser-sync').create();

/**
 * Compile files from _style into css
 */
gulp.task('sass', function () {
    return gulp.src('css/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: function(e) {
                console.error(e);
            },
            outputStyle: 'compressed'
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

/**
 * Build jade files to html
 */
gulp.task('jade', function () {
    // return gulp.src('*.jade')
    //     .pipe(jade())
    //     .pipe(gulp.dest('.'))
    //     .pipe(browserSync.stream());
});

/**
 * Minify js
 */
// gulp.task('compress', function() {
//     return gulp.src('js/common.js')
//         .pipe(uglify())
//         .pipe(rename('common.min.js'))
//         .pipe(gulp.dest('js'));
// });

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', ['sass'],function () {
    gulp.watch('css/*.scss', ['sass'])
        .on('change', browserSync.reload);
    //gulp.watch('js/common.js', ['compress']);
    //gulp.watch(['js/*.js', 'css/*.css'], ['jekyll']);
});

/**
 * sync with browser
 */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: '.'
    });
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['watch', 'browser-sync']);
