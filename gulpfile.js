const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

// Tarea para compilar Sass a CSS
gulp.task('sass', function () {
  return gulp
    .src('./src/scss/**/*.scss') // Ruta a los archivos Sass
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css')) // Nombre del archivo CSS final
    .pipe(gulp.dest('./dist')) // Carpeta de destino para el CSS compilado
    .pipe(browserSync.stream());
});

// Tarea para combinar archivos HTML y minificarlos
gulp.task('html', function () {
  return gulp
    .src('./src/html/**/*.html') // Ruta a los archivos HTML
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(concat('index.html')) // Nombre del archivo HTML final
    .pipe(gulp.dest('./dist')) // Carpeta de destino para el HTML combinado
    .pipe(browserSync.stream());
});

// Tarea para copiar imágenes
gulp.task('images', function () {
  return gulp
    .src('./src/images/**/*') // Busca todos los archivos en src/images y subcarpetas
    .pipe(gulp.dest('./dist/assets/images')); // Copia a docs/images manteniendo la estructura
});

// Tarea para servir con BrowserSync y observar cambios
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './dist', // Carpeta donde se encuentra el HTML combinado
    },
  });

  gulp.watch('./src/scss/**/*.scss', gulp.series('sass')); // Observa cambios en los archivos Sass
  gulp.watch('./src/html/**/*.html', gulp.series('html')); // Observa cambios en los archivos HTML
});

// Tarea por defecto que ejecuta 'sass', 'html' y 'serve'

gulp.task(
  'default',
  gulp.series(gulp.parallel('sass', 'html', 'images'), 'serve')
);
