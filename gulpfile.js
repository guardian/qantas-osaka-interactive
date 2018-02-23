const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const concat = require('gulp-concat')
const del = require('del')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const nunjucks = require('gulp-nunjucks')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const surge = require('gulp-surge')
const svgo = require('gulp-svgo')
const svgstore = require('gulp-svgstore')
const uglify = require('gulp-uglify')

gulp.task('browser-sync', () =>
  browserSync.init({
    server: {
      baseDir: 'dest',
      directory: true
    }
  })
)

gulp.task('build', () =>
  runSequence('build:clean', 'build:files', 'public')
)

gulp.task('build:clean', () =>
  del('dest')
)

gulp.task('build:files', ['icons', 'images', 'scripts', 'stylesheets', 'templates'])

gulp.task('default', ['build', 'watch'])

gulp.task('icons', () =>
  gulp.src('src/icons/*.svg')
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(gulp.dest('dest/images'))
    .on('end', browserSync.reload)
)

gulp.task('images', () =>
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/images'))
    .on('end', browserSync.reload)
)

gulp.task('public', () =>
  gulp.src('public/**/*')
    .pipe(gulp.dest('dest'))
)

gulp.task('scripts', () =>
  gulp.src([
    'node_modules/flickity/dist/flickity.pkgd.js',
    'node_modules/svg4everybody/dist/svg4everybody.js',
    'node_modules/what-input/dist/what-input.js',
    'src/scripts/*.js'
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('index.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dest/scripts'))
    .on('end', browserSync.reload)
)

gulp.task('stage', ['build'], () =>
  surge({
    project: 'dest',
    domain: 'qantas-osaka-interactive.surge.sh'
  })
)

gulp.task('stylesheets', () =>
  gulp.src('src/stylesheets/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed',
        precision: 10
      }))
      .pipe(autoprefixer())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dest/stylesheets'))
    .pipe(browserSync.stream({
      match: '**/*.css'
    }))
)

gulp.task('templates', () =>
  gulp.src('src/templates/*.njk')
    .pipe(plumber())
    .pipe(nunjucks.compile())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('dest'))
    .on('end', browserSync.reload)
)

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('src/icons/*.svg', ['icons'])
  gulp.watch('src/images/*', ['images'])
  gulp.watch('src/scripts/*.js', ['scripts'])
  gulp.watch('src/stylesheets/**/*.scss', ['stylesheets'])
  gulp.watch('src/templates/**/*.njk', ['templates'])
})
