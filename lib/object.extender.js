"use strict";

var _freeze = require("babel-runtime/core-js/object/freeze");

var _freeze2 = _interopRequireDefault(_freeze);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require('moment');

var _jsExtensionCache = {
  Object: {
    copyTypes: ["object", "array"],
    copyOptionKeys: ["deep", "exceptUndefined", "onlyFieldExists", "exceptFields"],
    cloneTypes: ["object", "array"],
    cloneOptionKeys: ["deep", "exceptFields"],
    valueEqualsTypes: ["object", "array"],
    deepFreezeTypes: ["object", "array"]
  }
};

exports.runObjectExtender = function (Vue) {
  //------------------------- Object Extensions -------------------------
  Object.typeOf = Object.typeOf || function (value) {
    return Object.prototype.toString.call(value).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
  };

  Object.isEmpty = Object.isEmpty || function (target) {
    var isStrict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    try {
      if ((0, _keys2.default)(target).length > 0) return false;

      return true;
    } catch (error) {
      if (isStrict) throw error;

      return true;
    }
  };

  Object.valueEquals = Object.valueEquals || function (objA, objB) {
    var objA_need = _jsExtensionCache.Object.valueEqualsTypes.includes(Object.typeOf(objA));
    var objB_need = _jsExtensionCache.Object.valueEqualsTypes.includes(Object.typeOf(objB));
    if (!objA_need || !objB_need) return objA === objB;

    var keysA = (0, _entries2.default)(objA).filter(function (entry) {
      return Object.typeOf(entry[1]) !== "function";
    }).map(function (entry) {
      return entry[0];
    });
    var keysB = (0, _entries2.default)(objB).filter(function (entry) {
      return Object.typeOf(entry[1]) !== "function";
    }).map(function (entry) {
      return entry[0];
    });
    if (keysA.length != keysB.length) {
      // console.log(keysA, keysA.length, keysB, keysB.length);
      return false;
    }

    for (var i = 0; i < keysA.length; i++) {
      var propName = keysA[i];
      var valueA = objA[propName];
      var valueB = objB[propName];

      var valueA_need = _jsExtensionCache.Object.valueEqualsTypes.includes(Object.typeOf(valueA));
      var valueB_need = _jsExtensionCache.Object.valueEqualsTypes.includes(Object.typeOf(valueB));
      if (valueA_need && valueB_need) {
        if (!Object.valueEquals(objA[propName], objB[propName])) {
          // console.log(`${propName}:`, objA[propName], objB[propName]);
          return false;
        }
        continue;
      }

      var valueA_isNaN = Object.typeOf(valueA) === "number" && isNaN(valueA);
      var valueB_isNaN = Object.typeOf(valueB) === "number" && isNaN(valueB);
      if (valueA_isNaN && valueB_isNaN) continue;

      if (valueA !== valueB) {
        // console.log(`${propName}:`, valueA, valueB);
        return false;
      }
    }

    return true;
  };

  Object.copy = Object.copy || function (target, options) {
    var deep = true,
        exceptUndefined = true,
        onlyFieldExists = false,
        exceptFields = [],
        sourceArr = void 0;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (Object.typeOf(options) === "object" && (0, _keys2.default)(options).some(function (key) {
      return _jsExtensionCache.Object.copyOptionKeys.includes(key);
    })) {
      deep = options.deep;
      exceptUndefined = options.exceptUndefined;
      onlyFieldExists = options.onlyFieldExists;
      exceptFields = options.exceptFields;

      deep = deep !== undefined ? deep : true;
      exceptUndefined = exceptUndefined !== undefined ? exceptUndefined : true;
      onlyFieldExists = onlyFieldExists !== undefined ? onlyFieldExists : false;
      exceptFields = Object.typeOf(exceptFields) === "array" ? exceptFields : [];
      sourceArr = [].concat(args);
    } else {
      sourceArr = [options].concat(args);
    }

    sourceArr.forEach(function (source) {
      if (Object.typeOf(source) !== Object.typeOf(target)) return;

      (0, _keys2.default)(source).forEach(function (key) {
        var value = source[key];
        if (exceptUndefined && value === undefined) return;
        if (onlyFieldExists && !(0, _keys2.default)(target).includes(key)) return;
        if (exceptFields.includes(key)) return;

        var isCopyType = _jsExtensionCache.Object.copyTypes.includes(Object.typeOf(value));
        if (isCopyType) value = value instanceof Array ? [].concat((0, _toConsumableArray3.default)(value)) : (0, _extends3.default)({}, value);

        var targetValue = target[key];
        if (targetValue === undefined && isCopyType) target[key] = targetValue = value instanceof Array ? [] : {};

        var valueType = Object.typeOf(value);
        var targetValueType = Object.typeOf(targetValue);
        var isMoment = moment.isMoment(value);
        if (isMoment) {
          target[key] = moment(value);
          return;
        }
        if (!deep || valueType != targetValueType || !isCopyType) {
          target[key] = value;
          return;
        }

        Object.copy(targetValue, {
          deep: !!deep,
          exceptUndefined: !!exceptUndefined,
          onlyFieldExists: !!onlyFieldExists,
          exceptFields: exceptFields
        }, value);
      });
    });

    return target;
  };

  Object.clone = Object.clone || function (obj, options) {
    var deep = true,
        exceptFields = [];
    if (Object.typeOf(options) === "object" && (0, _keys2.default)(options).some(function (key) {
      return _jsExtensionCache.Object.cloneOptionKeys.includes(key);
    })) {
      deep = options.deep;
      exceptFields = options.exceptFields;

      deep = deep !== undefined ? deep : true;
      exceptFields = Object.typeOf(exceptFields) === "array" ? exceptFields : [];
    }

    if (!_jsExtensionCache.Object.cloneTypes.includes(Object.typeOf(obj))) return obj;

    var newObj = obj instanceof Array ? [] : {};
    (0, _keys2.default)(obj).forEach(function (key) {
      var value = obj[key];

      if (exceptFields.includes(key)) return;

      var isMoment = moment.isMoment(value);
      if (deep && _jsExtensionCache.Object.cloneTypes.includes(Object.typeOf(value)) && !isMoment) {
        newObj[key] = Object.clone(value, {
          deep: !!deep,
          exceptFields: exceptFields
        });
        return;
      }
      if (isMoment) {
        newObj[key] = moment(value);
        return;
      }

      newObj[key] = value;
    });
    return newObj;
  };

  Object.deepFreeze = Object.deepFreeze || function (obj) {
    if (!_jsExtensionCache.Object.deepFreezeTypes.includes(Object.typeOf(obj))) return obj;

    (0, _keys2.default)(obj).forEach(function (key) {
      var value = obj[key];
      if (_jsExtensionCache.Object.deepFreezeTypes.includes(Object.typeOf(value))) {
        Object.deepFreeze(value);
      }
    });

    return (0, _freeze2.default)(obj);
  };

  Object.newGuid = Object.newGuid || function () {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
    }
    return guid;
  };

  Object.fixToNull = Object.fixToNull || function (value) {
    return !!value ? value : null;
  };

  Object.toBoolean = Object.toBoolean || function (obj) {
    if (!obj) return false;

    var result = void 0;
    try {
      result = eval(obj.toString().toLowerCase());
    } catch (error) {
      result = new Boolean(obj);
    }

    return result;
  };

  Object.toCurrency = Object.toCurrency || function (value, currencyType, digits, emptyString) {
    var showPrefix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if (!!emptyString && !value) {
      return emptyString;
    }

    if (Object.typeOf(value) !== "number") {
      return value;
    }

    if (isNaN(value)) {
      value = 0;
    }

    if (Object.typeOf(digits) !== "number") {
      digits = 0;
    }

    var locale = void 0,
        currency = void 0;
    switch (currencyType) {
      case 1:
        locale = "zh-CN";
        currency = "CNY";
        break;
      case 2:
        locale = "en-CA";
        currency = "CAD";
        break;
      default:
        locale = "en-US";
        currency = "USD";
        break;
    }

    var formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: digits
    });
    var valueText = formatter.format(value);
    if (currencyType === 1) valueText = valueText.replace("¥", "￥");

    var prefix = String.empty;
    if (showPrefix) {
      switch (currencyType) {
        case 2:
          prefix = "C";
          break;
      }
      valueText = "" + prefix + valueText;
    }

    return valueText;
  };

  Object.toPercent = Object.toPercent || function (value, emptyString) {
    if (!!emptyString && !value) {
      return emptyString;
    }

    if (Object.typeOf(value) !== "number") {
      return value;
    }

    if (isNaN(value)) {
      value = 0;
    }

    var formatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0
    });
    return formatter.format(value);
  };

  Object.toFixedString = Object.toFixedString || function (value, digits) {
    if (Object.typeOf(digits) !== "number") {
      digits = 2;
    }
    var valueTmp = value.toFixed(digits + 1);
    var result = valueTmp.substring(0, valueTmp.lastIndexOf('.') + 3);
    return result;
  };
  //------------------------- End -------------------------
};