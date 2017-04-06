const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const rename = require("gulp-rename");
const envify = require('gulp-envify');


gulp.task('default', () =>
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
                // left-hand side can be an absolute path, a path
                // relative to the current directory, or the name
                // of a module in node_modules
                'node_modules/immutable/dist/immutable.js': [ 'fromJS' ]
              }
            })
          ],
          moduleName: 'reduxConfig'
        }, 'umd'))
        .pipe(rename('reduxConfig.js'))
        .pipe(envify({
          NODE_ENV: 'production'
        }))
        .pipe(gulp.dest('.tmp'))
);
