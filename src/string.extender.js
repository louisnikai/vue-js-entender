const {
  runObjectExtender
} = require('./object.extender');

const _jsExtensionCache = {
  String: {
    replaceTypes: ["string", "regexp"],
    toEscapeChars: ['.', '?', '|']
  }
};

exports.runStringExtender = (Vue) => {
  runObjectExtender(Vue);

  //------------------------- String Extensions -------------------------
  String.empty = String.empty !== undefined ? String.empty : "";

  String.isNullOrEmpty =
    String.isNullOrEmpty ||
    function (value) {
      let valueType = Object.typeOf(value);
      if (
        value === undefined ||
        value === null ||
        (valueType === "number" && isNaN(value)) ||
        (valueType === "string" && value.length === 0)
      )
        return true;

      return false;
    };

  String.isNullOrWhiteSpace =
    String.isNullOrWhiteSpace ||
    function (value) {
      return String.isNullOrEmpty(value) || String.trim(value) === String.empty;
    };

  String.fixToEmpty =
    String.fixToEmpty ||
    function (value) {
      return !!value ? value : String.empty;
    };

  String.prototype.format =
    String.prototype.format ||
    function (...args) {
      return this.replace(/\{(\d+)\}/g, function (m, i) {
        let replacement = args[i];
        if (String.isNullOrEmpty(args[i])) return String.empty;

        return replacement;
      });
    };
  String.format =
    String.format ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.format.apply(target, args);
    };

  // Trim
  String.prototype.trim =
    String.prototype.trim ||
    function (value = "\\s") {
      if (Object.typeOf(value) !== "string") return this;

      _jsExtensionCache.String.toEscapeChars.forEach(teChar => {
        let pattern = new RegExp(`\\${teChar}`, "g");
        value = value.replace(pattern, `\\${teChar}`);
      });

      let pattern = new RegExp(`(^(?:${value})+)|((?:${value})+$)`, "g");
      return str.replace(pattern, String.empty);
    };
  String.trim =
    String.trim ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.trim.apply(target, args);
    };

  // Trim left
  String.prototype.lTrim =
    String.prototype.lTrim ||
    function (value = "\\s") {
      if (Object.typeOf(value) !== "string") return this;

      _jsExtensionCache.String.toEscapeChars.forEach(teChar => {
        let pattern = new RegExp(`\\${teChar}`, "g");
        value = value.replace(pattern, `\\${teChar}`);
      });

      let pattern = new RegExp(`(^(?:${value})+)`, "g");
      return this.replace(pattern, String.empty);
    };
  String.lTrim =
    String.lTrim ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.lTrim.apply(target, args);
    };

  // Trim right
  String.prototype.rTrim =
    String.prototype.rTrim ||
    function (value = "\\s") {
      if (Object.typeOf(value) !== "string") return this;

      _jsExtensionCache.String.toEscapeChars.forEach(teChar => {
        let pattern = new RegExp(`\\${teChar}`, "g");
        value = value.replace(pattern, `\\${teChar}`);
      });

      let pattern = new RegExp(`((?:${value})+$)`, "g");
      return this.replace(pattern, String.empty);
    };
  String.rTrim =
    String.rTrim ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.rTrim.apply(target, args);
    };

  // Replace all
  String.prototype.replaceAll =
    String.prototype.replaceAll ||
    function (oldValue, newValue, ignoreCase = false) {
      if (
        !_jsExtensionCache.String.replaceTypes.contains(
          Object.typeOf(oldValue)
        ) ||
        Object.typeOf(newValue) !== "string"
      )
        return this;

      if (RegExp.prototype.isPrototypeOf(oldValue))
        return this.replace(oldValue, newValue);

      _jsExtensionCache.String.toEscapeChars.forEach(teChar => {
        let pattern = new RegExp(`\\${teChar}`, "g");
        oldValue = oldValue.replace(pattern, `\\${teChar}`);
      });
      return this.replace.apply(this, [
        new RegExp(oldValue, ignoreCase ? "gi" : "g"),
        newValue
      ]);
    };
  String.replaceAll =
    String.replaceAll ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.replaceAll.apply(target, args);
    };

  // Remove
  String.prototype.remove =
    String.prototype.remove ||
    function (value, callback) {
      if (Object.typeOf(value) !== "string") return this;

      if (Object.typeOf(callback) === "function") return callback(this, value);

      return this.replace.apply(this, [value, String.empty]);
    };
  String.remove =
    String.remove ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.remove.apply(target, args);
    };

  // Remove all
  String.prototype.removeAll =
    String.prototype.removeAll ||
    function (value, callback) {
      if (Object.typeOf(value) !== "string") return this;

      if (Object.typeOf(callback) === "function") return callback(this, value);

      return this.replaceAll.apply(this, [value, String.empty]);
    };
  String.removeAll =
    String.removeAll ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.removeAll.apply(target, args);
    };

  // Contains
  String.prototype.contains =
    String.prototype.contains ||
    function (value, caseIgnore = false, callback) {
      if (Object.typeOf(value) !== "string") return false;

      if (Object.typeOf(callback) === "function") return callback(this, value);

      // return this.indexOf(value) >= 0;

      _jsExtensionCache.String.toEscapeChars.forEach(teChar => {
        let pattern = new RegExp(`\\${teChar}`, "g");
        value = value.replace(pattern, `\\${teChar}`);
      });
      let reFlags = "g";
      if (caseIgnore)
        reFlags += "i";
      let pattern = new RegExp(`(${value})`, reFlags);
      return pattern.test(this);
    };
  String.contains =
    String.contains ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.contains.apply(target, args);
    };

  // StartWith
  String.prototype.startWith =
    String.prototype.startWith ||
    function (value, caseIgnore = false, callback) {
      if (Object.typeOf(value) !== "string") return false;

      if (Object.typeOf(callback) === "function") return callback(this, value);

      _jsExtensionCache.String.toEscapeChars.forEach(teChar => {
        let pattern = new RegExp(`\\${teChar}`, "g");
        value = value.replace(pattern, `\\${teChar}`);
      });
      let reFlags = "g";
      if (caseIgnore)
        reFlags += "i";
      let pattern = new RegExp(`(^${value})`, reFlags);
      return pattern.test(this);
    };
  String.startWith =
    String.startWith ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.startWith.apply(target, args);
    };

  // EndWith
  String.prototype.endWith =
    String.prototype.endWith ||
    function (value, caseIgnore = false, callback) {
      if (Object.typeOf(value) !== "string") return false;

      if (Object.typeOf(callback) === "function") return callback(this, value);

      _jsExtensionCache.String.toEscapeChars.forEach(teChar => {
        let pattern = new RegExp(`\\${teChar}`, "g");
        value = value.replace(pattern, `\\${teChar}`);
      });
      let reFlags = "g";
      if (caseIgnore)
        reFlags += "i";
      let pattern = new RegExp(`(${value}$)`, reFlags);
      return pattern.test(this);
    };
  String.endWith =
    String.endWith ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.endWith.apply(target, args);
    };

  String.prototype.truncat =
    String.prototype.truncat ||
    function (maxLength, endWith) {
      if (Object.typeOf(maxLength) !== "number") return this;

      if (maxLength < 1 || this.length <= maxLength) return this;

      let result = this.substr(0, maxLength);
      if (String.isNullOrEmpty(endWith)) return result;

      return result + endWith;
    };
  String.truncat =
    String.truncat ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.truncat.apply(target, args);
    };

  String.prototype.toNumber =
    String.prototype.toNumber ||
    function (force = true) {
      let result = parseFloat(this.replace(/,/g, ""));
      if (!isNaN(result)) return result;

      return force ? 0 : null;
    };
  String.toNumber =
    String.toNumber ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.toNumber.apply(target, args);
    };

  String.prototype.emptyToZero =
    String.prototype.emptyToZero ||
    function () {
      return !!this ? this : "0";
    };
  String.emptyToZero =
    String.emptyToZero ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.emptyToZero.apply(target, args);
    };

  String.prototype.toPascalCase =
    String.prototype.toPascalCase ||
    function (specificPrefix) {
      let result = this.replace(/[-_]+/g, " ")
        .replace(/[^\w\s]/g, "")
        .replace(
          /\s+(.)(\w+)/g,
          ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(/\s/g, "")
        .replace(/\w/, s => s.toUpperCase());

      if (!!specificPrefix)
        result = result.replace(
          new RegExp(`^${specificPrefix}`, "i"),
          `${specificPrefix}`
        );

      return result;
    };
  String.toPascalCase =
    String.toPascalCase ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.toCurrency.apply(target, args);
    };

  String.prototype.getFileExtension =
    String.prototype.getFileExtension ||
    function () {
      let dotIndex = this.lastIndexOf(".");
      if (dotIndex < 0) return String.empty;

      return this.substring(dotIndex, this.length);
    };
  String.getFileExtension =
    String.getFileExtension ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "string")
        throw new Error("target is not a string.");

      return target.getFileExtension.apply(target, args);
    };
  //------------------------- End -------------------------
};
