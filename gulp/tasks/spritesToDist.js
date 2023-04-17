export const spritesToDist = () => {
  return app.gulp
    .src(app.path.src.spritesExp)
    .pipe(app.gulp.dest(app.path.build.svg));
};
