const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const vueify = require('vueify');
const babelify = require('babelify');
const nunjucks = require('gulp-nunjucks');
const rename = require('gulp-rename');


// 打包js, vue组件
gulp.task('browserify', () => {
  return browserify({
      entries: './script/es6/index.js'
    })
    .transform(vueify)
    .transform(babelify.configure({
      presets: [
        'env'
      ]
    }))
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('script/dist/'))
})

// 编译模板视图
gulp.task('view', () => {
  return gulp.src('script/es6/view/**/!(_)*.nunjucks')
        .pipe(nunjucks.compile())
        .pipe(rename({
          extname: '.html'
        }))
        .pipe(gulp.dest('html'));
})

// 样式
gulp.task('sass', () => {
  return gulp.src('css/scss/**.scss')
      .pipe(sass())
      .pipe(gulp.dest('css/scss/dist'))
})

// 开发watch
gulp.task('watch', () => {
  gulp.watch('./css/scss/**/*.scss', gulp.series('sass'))
  gulp.watch('./script/es6/**/*.nunjucks', gulp.series('view'))
  gulp.watch('./script/es6/**/*.{vue,js}', gulp.series('browserify'))
})

// 构建
gulp.task('default', gulp.series('browserify', 'view', 'sass'))
