"use strict";

var _require = require('./object.extender'),
    runObjectExtender = _require.runObjectExtender;

exports.runNumberExtender = function (Vue) {
  runObjectExtender(Vue);

  //------------------------- Number Extensions -------------------------
  Number.maxValue = Number.maxValue || {
    int32: 2147483647
  };

  Number.prototype.toFixedEx = Number.prototype.toFixedEx || function () {
    var digits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

    var fixedStr = this.toFixed(digits);
    return parseFloat(fixedStr);
  };
  Number.toFixedEx = Number.toFixedEx || function (target) {
    if (Object.typeOf(target) !== "number") throw new Error("target is not a number.");

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return target.toFixedEx.apply(target, args);
  };
  //------------------------- End -------------------------
};