import GulpSvgmin from "gulp-svgmin";
import gulpCheerio from "gulp-cheerio";
import svgSprite from "gulp-svg-sprite";

export const spritesGen = () => {
  return app.gulp
    .src(app.path.src.svg)
    .pipe(
      GulpSvgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      gulpCheerio({
        run: function ($) {
          // $("[fill]").removeAttr("fill");
          // $("[stroke]").removeAttr("stroke");
          // $("[style]").removeAttr("style");
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(app.plugins.replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
            // Page with svg examples
            example: true,
          },
        },
        shape: {
          id: {
            separator: "",
            generator: "icon-",
          },
        },
        svg: {
          xmlDeclaration: false,
        },
      })
    )
    .pipe(app.gulp.dest(app.path.src.sprites));
};
