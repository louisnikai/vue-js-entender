"use strict";

var _trim = require("babel-runtime/core-js/string/trim");

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./object.extender'),
    runObjectExtender = _require.runObjectExtender;

var _jsExtensionCache = {
  String: {
    replaceTypes: ["string", "regexp"],
    toEscapeChars: ['.', '?', '|']
  }
};

exports.runStringExtender = function (Vue) {
  runObjectExtender(Vue);

  //------------------------- String Extensions -------------------------
  String.empty = String.empty !== undefined ? String.empty : "";

  String.isNullOrEmpty = String.isNullOrEmpty || function (value) {
    var valueType = Object.typeOf(value);
    if (value === undefined || value === null || valueType === "number" && isNaN(value) || valueType === "string" && value.length === 0) return true;

    return false;
  };

  String.isNullOrWhiteSpace = String.isNullOrWhiteSpace || function (value) {
    return String.isNullOrEmpty(value) || (0, _trim2.default)(value) === String.empty;
  };

  String.fixToEmpty = String.fixToEmpty || function (value) {
    return !!value ? value : String.empty;
  };

  String.prototype.format = String.prototype.format || function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.replace(/\{(\d+)\}/g, function (m, i) {
      var replacement = args[i];
      if (String.isNullOrEmpty(args[i])) return String.empty;

      return replacement;
    });
  };
  String.format = String.format || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return target.format.apply(target, args);
  };

  // Trim
  String.prototype.trim = String.prototype.trim || function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "\\s";

    if (Object.typeOf(value) !== "string") return this;

    _jsExtensionCache.String.toEscapeChars.forEach(function (teChar) {
      var pattern = new RegExp("\\" + teChar, "g");
      value = value.replace(pattern, "\\" + teChar);
    });

    var pattern = new RegExp("(^(?:" + value + ")+)|((?:" + value + ")+$)", "g");
    return str.replace(pattern, String.empty);
  };
  String.trim = _trim2.default || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return target.trim.apply(target, args);
  };

  // Trim left
  String.prototype.lTrim = String.prototype.lTrim || function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "\\s";

    if (Object.typeOf(value) !== "string") return this;

    _jsExtensionCache.String.toEscapeChars.forEach(function (teChar) {
      var pattern = new RegExp("\\" + teChar, "g");
      value = value.replace(pattern, "\\" + teChar);
    });

    var pattern = new RegExp("(^(?:" + value + ")+)", "g");
    return this.replace(pattern, String.empty);
  };
  String.lTrim = String.lTrim || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return target.lTrim.apply(target, args);
  };

  // Trim right
  String.prototype.rTrim = String.prototype.rTrim || function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "\\s";

    if (Object.typeOf(value) !== "string") return this;

    _jsExtensionCache.String.toEscapeChars.forEach(function (teChar) {
      var pattern = new RegExp("\\" + teChar, "g");
      value = value.replace(pattern, "\\" + teChar);
    });

    var pattern = new RegExp("((?:" + value + ")+$)", "g");
    return this.replace(pattern, String.empty);
  };
  String.rTrim = String.rTrim || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }

    return target.rTrim.apply(target, args);
  };

  // Replace all
  String.prototype.replaceAll = String.prototype.replaceAll || function (oldValue, newValue) {
    var ignoreCase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!_jsExtensionCache.String.replaceTypes.contains(Object.typeOf(oldValue)) || Object.typeOf(newValue) !== "string") return this;

    if (RegExp.prototype.isPrototypeOf(oldValue)) return this.replace(oldValue, newValue);

    _jsExtensionCache.String.toEscapeChars.forEach(function (teChar) {
      var pattern = new RegExp("\\" + teChar, "g");
      oldValue = oldValue.replace(pattern, "\\" + teChar);
    });
    return this.replace.apply(this, [new RegExp(oldValue, ignoreCase ? "gi" : "g"), newValue]);
  };
  String.replaceAll = String.replaceAll || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }

    return target.replaceAll.apply(target, args);
  };

  // Remove
  String.prototype.remove = String.prototype.remove || function (value, callback) {
    if (Object.typeOf(value) !== "string") return this;

    if (Object.typeOf(callback) === "function") return callback(this, value);

    return this.replace.apply(this, [value, String.empty]);
  };
  String.remove = String.remove || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }

    return target.remove.apply(target, args);
  };

  // Remove all
  String.prototype.removeAll = String.prototype.removeAll || function (value, callback) {
    if (Object.typeOf(value) !== "string") return this;

    if (Object.typeOf(callback) === "function") return callback(this, value);

    return this.replaceAll.apply(this, [value, String.empty]);
  };
  String.removeAll = String.removeAll || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
      args[_key8 - 1] = arguments[_key8];
    }

    return target.removeAll.apply(target, args);
  };

  // Contains
  String.prototype.contains = String.prototype.contains || function (value) {
    var caseIgnore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments[2];

    if (Object.typeOf(value) !== "string") return false;

    if (Object.typeOf(callback) === "function") return callback(this, value);

    // return this.indexOf(value) >= 0;

    _jsExtensionCache.String.toEscapeChars.forEach(function (teChar) {
      var pattern = new RegExp("\\" + teChar, "g");
      value = value.replace(pattern, "\\" + teChar);
    });
    var reFlags = "g";
    if (caseIgnore) reFlags += "i";
    var pattern = new RegExp("(" + value + ")", reFlags);
    return pattern.test(this);
  };
  String.contains = String.contains || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
      args[_key9 - 1] = arguments[_key9];
    }

    return target.contains.apply(target, args);
  };

  // StartWith
  String.prototype.startWith = String.prototype.startWith || function (value) {
    var caseIgnore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments[2];

    if (Object.typeOf(value) !== "string") return false;

    if (Object.typeOf(callback) === "function") return callback(this, value);

    _jsExtensionCache.String.toEscapeChars.forEach(function (teChar) {
      var pattern = new RegExp("\\" + teChar, "g");
      value = value.replace(pattern, "\\" + teChar);
    });
    var reFlags = "g";
    if (caseIgnore) reFlags += "i";
    var pattern = new RegExp("(^" + value + ")", reFlags);
    return pattern.test(this);
  };
  String.startWith = String.startWith || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
      args[_key10 - 1] = arguments[_key10];
    }

    return target.startWith.apply(target, args);
  };

  // EndWith
  String.prototype.endWith = String.prototype.endWith || function (value) {
    var caseIgnore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments[2];

    if (Object.typeOf(value) !== "string") return false;

    if (Object.typeOf(callback) === "function") return callback(this, value);

    _jsExtensionCache.String.toEscapeChars.forEach(function (teChar) {
      var pattern = new RegExp("\\" + teChar, "g");
      value = value.replace(pattern, "\\" + teChar);
    });
    var reFlags = "g";
    if (caseIgnore) reFlags += "i";
    var pattern = new RegExp("(" + value + "$)", reFlags);
    return pattern.test(this);
  };
  String.endWith = String.endWith || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
      args[_key11 - 1] = arguments[_key11];
    }

    return target.endWith.apply(target, args);
  };

  String.prototype.truncat = String.prototype.truncat || function (maxLength, endWith) {
    if (Object.typeOf(maxLength) !== "number") return this;

    if (maxLength < 1 || this.length <= maxLength) return this;

    var result = this.substr(0, maxLength);
    if (String.isNullOrEmpty(endWith)) return result;

    return result + endWith;
  };
  String.truncat = String.truncat || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
      args[_key12 - 1] = arguments[_key12];
    }

    return target.truncat.apply(target, args);
  };

  String.prototype.toNumber = String.prototype.toNumber || function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var result = parseFloat(this.replace(/,/g, ""));
    if (!isNaN(result)) return result;

    return force ? 0 : null;
  };
  String.toNumber = String.toNumber || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len13 = arguments.length, args = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
      args[_key13 - 1] = arguments[_key13];
    }

    return target.toNumber.apply(target, args);
  };

  String.prototype.emptyToZero = String.prototype.emptyToZero || function () {
    return !!this ? this : "0";
  };
  String.emptyToZero = String.emptyToZero || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
      args[_key14 - 1] = arguments[_key14];
    }

    return target.emptyToZero.apply(target, args);
  };

  String.prototype.toPascalCase = String.prototype.toPascalCase || function (specificPrefix) {
    var result = this.replace(/[-_]+/g, " ").replace(/[^\w\s]/g, "").replace(/\s+(.)(\w+)/g, function ($1, $2, $3) {
      return "" + ($2.toUpperCase() + $3.toLowerCase());
    }).replace(/\s/g, "").replace(/\w/, function (s) {
      return s.toUpperCase();
    });

    if (!!specificPrefix) result = result.replace(new RegExp("^" + specificPrefix, "i"), "" + specificPrefix);

    return result;
  };
  String.toPascalCase = String.toPascalCase || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len15 = arguments.length, args = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
      args[_key15 - 1] = arguments[_key15];
    }

    return target.toCurrency.apply(target, args);
  };

  String.prototype.getFileExtension = String.prototype.getFileExtension || function () {
    var dotIndex = this.lastIndexOf(".");
    if (dotIndex < 0) return String.empty;

    return this.substring(dotIndex, this.length);
  };
  String.getFileExtension = String.getFileExtension || function (target) {
    if (Object.typeOf(target) !== "string") throw new Error("target is not a string.");

    for (var _len16 = arguments.length, args = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
      args[_key16 - 1] = arguments[_key16];
    }

    return target.getFileExtension.apply(target, args);
  };
  //------------------------- End -------------------------
};