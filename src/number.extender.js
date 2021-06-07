const {
  runObjectExtender
} = require('./object.extender');

exports.runNumberExtender = (Vue) => {
  runObjectExtender(Vue);

  //------------------------- Number Extensions -------------------------
  Number.maxValue = Number.maxValue || {
    int32: 2147483647
  };

  Number.prototype.toFixedEx =
    Number.prototype.toFixedEx ||
    function (digits = 4) {
      let fixedStr = this.toFixed(digits);
      return parseFloat(fixedStr);
    };
  Number.toFixedEx =
    Number.toFixedEx ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "number")
        throw new Error("target is not a number.");

      return target.toFixedEx.apply(target, args);
    };
  //------------------------- End -------------------------
};
