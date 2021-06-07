"use strict";

exports.runDateExtender = function (Vue) {
  //------------------------- Date Extensions -------------------------
  Date.prototype.format = Date.prototype.format || function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //Month
      "d+": this.getDate(), //Day
      "h+": this.getHours() % 12 || 12, //Hours(12)
      "H+": this.getHours(), //Hours(24)
      "m+": this.getMinutes(), //Minutes
      "s+": this.getSeconds(), //Seconds
      "q+": Math.floor((this.getMonth() + 3) / 3), //Season
      "f+": this.getMilliseconds(), //Milliseconds
      "t+": this.getHours() >= 12 ? "PM" : "AM"
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ("" + this.getFullYear()).substr(4 - RegExp.$1.length));
    for (var k in o) {
      var kPattern = new RegExp("(" + k + ")");
      if (!kPattern.test(fmt)) continue;

      if (k === "f+" || k === "t+") {
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(0, RegExp.$1.length));
        continue;
      }

      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
    return fmt;
  };

  Date.format = Date.format || function (target) {
    if (!target) return null;

    if (Object.typeOf(target) !== "date") throw new Error("target is not an date.");

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return target.format.apply(target, args);
  };
  //------------------------- End -------------------------
};