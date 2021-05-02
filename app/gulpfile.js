const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const changed = require('gulp-changed');

// nettoyer les assets

function clear() {
    return src('./web/assets/css/style.css', {
            read: false
        })
        .pipe(clean());
}

// JS function pour une version plus ambitieuse.

function js() {
    const source = './src1/js/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./assets/js/'));
}

// CSS function 

function css() {
    const source = './web/assets/css/sass/*.scss';

    return src(source)
        .pipe(changed(source))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(dest('./web/assets/css/'));
}


// Watch files

function watchFiles() {
    watch('./src1/scss/*', series(css));
    //watch('./src1/js/*', series(js));
}
// Tasks to define the execution of the functions simultaneously or in series
// Bon là, y a craquage. J'avoue avoir un peu de mal avec gulp etsass. C'est pas mon meilleur profil :-)
//exports.watch = parallel(watchFiles);
exports.default = series(clear, css);