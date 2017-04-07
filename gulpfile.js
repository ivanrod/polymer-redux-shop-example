const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const rename = require("gulp-rename");
const envify = require('gulp-envify');


gulp.task('redux:build', () =>
    gulp.src('src/redux/index.js')
        .pipe(rollup({
          plugins: [
            babel(),
            nodeResolve({
              jsnext: true,
              main: true
            }),
            commonjs({
              include: 'node_modules/**',
              extensions: [ '.js', '.coffee' ],
              ignoreGlobal: false,
              sourceMap: true,
              namedExports: {
                'node_modules/immutable/dist/immutable.js': [ 'fromJS' ]
              }
            })
          ],
          moduleName: 'ReduxConfig'
        }, 'umd'))
        .on('error', error => console.log('Error on build task: ', error))
        .pipe(rename('reduxConfig.js'))
        .pipe(envify({
          NODE_ENV: 'production'
        }))
        .pipe(gulp.dest('.tmp'))
);

gulp.task('redux:watch', function () {
    gulp.watch(['src/redux/**/*', 'src/redux/*.js'], ['redux:build', () => console.log('Updated redux temp files')]);
});
