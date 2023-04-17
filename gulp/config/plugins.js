import replace from "gulp-replace";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import browserSync from "browser-sync";
import rename from "gulp-rename";
import newer from "gulp-newer";
import gulpIf from "gulp-if";
import del from "del";

// Экспортируемый обьект
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
  rename: rename,
  newer: newer,
  del: del,
  if: gulpIf,
};
