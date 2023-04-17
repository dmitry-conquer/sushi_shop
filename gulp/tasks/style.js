import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';
import webpcss from 'gulp-webpcss';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import GulpCleanCss from 'gulp-clean-css';

const sass = gulpSass(dartSass);

export const style = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(
        sass({
          outputStyle: 'expanded',
        })
      )

      // ! Automatically substitutes webp file (if need) + activate js function
      // .pipe(
      //   app.plugins.if(
      //     app.isBuild,
      //     webpcss({
      //       webpClass: '.webp',
      //       noWebpClass: '.no-webp',
      //     })
      //   )
      // )

      .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoPrefixer({
            grid: true,
            overrideBrowserslist: ['last 3 versions'],
            cascade: true,
          })
        )
      )

      // if you need an uncompressed duplicate of the styles file
      // .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.if(app.isBuild, GulpCleanCss()))
      .pipe(
        app.plugins.rename({
          extname: '.min.css',
        })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
  );
};
