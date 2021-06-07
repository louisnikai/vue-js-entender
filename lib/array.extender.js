"use strict";

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./object.extender'),
    runObjectExtender = _require.runObjectExtender;

var _jsExtensionCache = {
  Array: {
    sortObjectCompare: function sortObjectCompare(propName) {
      var sortType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "asc";

      var fixedSortType = ("" + sortType).toLowerCase();
      return function (obj1, obj2) {
        if (fixedSortType !== "asc" && fixedSortType !== "desc") return 0;

        if (Object.typeOf(obj1) !== "object" && Object.typeOf(obj1) !== "array") return 0;

        if (Object.typeOf(obj2) !== "object" && Object.typeOf(obj2) !== "array") return 0;

        if (!(0, _keys2.default)(obj1).contains(propName) || !(0, _keys2.default)(obj2).contains(propName)) return 0;

        var result = 0;
        var propValue1 = obj1[propName];
        var propValue2 = obj2[propName];

        if (propValue2 < propValue1) result = fixedSortType === "desc" ? -1 : 1;else if (propValue2 > propValue2) result = fixedSortType === "desc" ? 1 : -1;

        return result;
      };
    }
  }
};

exports.runArrayExtender = function (Vue) {
  runObjectExtender(Vue);

  //------------------------- Array Extensions -------------------------
  Array.prototype.contains = Array.prototype.contains || function (value, comparator, callback) {
    if (Object.typeOf(callback) === "function") return callback(this, value);

    var useComparator = Object.typeOf(comparator) === "function";
    if (!useComparator) return this.includes(value);

    return this.some(function (item) {
      return comparator(item, value);
    });
  };
  Array.contains = Array.contains || function (target) {
    if (Object.typeOf(target) !== "array") throw new Error("target is not an array.");

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return target.contains.apply(target, args);
  };

  Array.prototype.insert = Array.prototype.insert || function (index, value, callback) {
    if (Object.typeOf(callback) === "function") return callback(this, index, value);

    if (index < 0) return false;

    this.splice(index, 0, value);
    return true;
  };
  Array.insert = Array.insert || function (target) {
    if (Object.typeOf(target) !== "array") throw new Error("target is not an array.");

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return target.insert.apply(target, args);
  };

  Array.prototype.remove = Array.prototype.remove || function (value, callback) {
    if (Object.typeOf(callback) === "function") return callback(this, value);

    var removeIndex = void 0;
    if (Object.typeOf(value) === "number" && isNaN(value)) removeIndex = this.findIndex(function (item) {
      return Object.typeOf(item) === "number" && isNaN(item);
    });else removeIndex = this.indexOf(value);
    if (removeIndex < 0) return false;

    this.splice(removeIndex, 1);
    return true;
  };
  Array.remove = Array.remove || function (target) {
    if (Object.typeOf(target) !== "array") throw new Error("target is not an array.");

    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return target.remove.apply(target, args);
  };

  Array.prototype.sortObject = Array.prototype.sortObject || function (propName) {
    var sortType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "asc";

    return this.sort(_jsExtensionCache.Array.sortObjectCompare(propName, sortType));
  };
  Array.sortObject = Array.sortObject || function (target) {
    if (Object.typeOf(target) !== "array") throw new Error("target is not an array.");

    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return target.sortObject.apply(target, args);
  };

  Array.prototype.mapMany = Array.prototype.mapMany || function (callback) {
    if (Object.typeOf(callback) !== "function") return this;

    return this.reduce(function (prev, curr, index) {
      var mapAttr = callback(curr, index);
      if (Object.typeOf(mapAttr) === "array") {
        prev = prev.concat(mapAttr);
      } else {
        prev.push(mapAttr);
      }
      return prev;
    }, []);
  };
  Array.mapMany = Array.mapMany || function (target) {
    if (Object.typeOf(target) !== "array") throw new Error("target is not an array.");

    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }

    return target.mapMany.apply(target, args);
  };

  Array.prototype.distinct = Array.prototype.distinct || function () {
    var distinctMap = new _map2.default();
    return this.filter(function (item) {
      return !distinctMap.has(item) && distinctMap.set(item, 1);
    });
  };
  Array.distinct = Array.distinct || function (target) {
    if (Object.typeOf(target) !== "array") throw new Error("target is not an array.");

    for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }

    return target.distinct.apply(target, args);
  };

  Array.prototype.findObjPropValue = Array.prototype.findObjPropValue || function (findConditions, fieldName) {
    var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var isOrMatch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (Object.typeOf(findConditions) !== "object") return defaultValue;

    var objData = this.filter(function (item) {
      return Object.typeOf(item) === "object";
    }).find(function (item) {
      var fcKeys = (0, _keys2.default)(findConditions).filter(function (fcKey) {
        return item[fcKey] !== undefined && item[fcKey] !== null;
      });
      return isOrMatch ? fcKeys.some(function (fcKey) {
        return item[fcKey] === findConditions[fcKey];
      }) : fcKeys.every(function (fcKey) {
        return item[fcKey] === findConditions[fcKey];
      });
    });
    if (!objData || !(0, _keys2.default)(objData).contains(fieldName)) return defaultValue;

    return objData[fieldName];
  };
  Array.findObjPropValue = Array.findObjPropValue || function (target) {
    if (Object.typeOf(target) !== "array") throw new Error("target is not an array.");

    for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }

    return target.findObjPropValue.apply(target, args);
  };

  Array.prototype.count = Array.prototype.count || function (cbFilter) {
    if (Object.typeOf(cbFilter) === "function") return this.filter(cbFilter).length;

    return this.length;
  };
  Array.count = Array.count || function (target) {
    if (Object.typeOf(target) !== "array") throw new Error("target is not an array.");

    for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
      args[_key8 - 1] = arguments[_key8];
    }

    return target.count.apply(target, args);
  };

  Array.prototype.sum = Array.prototype.sum || function (cbFunc) {
    return this.reduce(function (total, item) {
      if (Object.typeOf(cbFunc) === "function") {
        var currValue = cbFunc(item);
        return total + currValue;
      }

      if (Object.typeOf(item) === "number") return total + item;

      return total;
    }, 0);
  };
  Array.sum = Array.sum || function (target) {
    if (Object.typeOf(target) !== "array") throw new Error("target is not an array.");

    for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
      args[_key9 - 1] = arguments[_key9];
    }

    return target.sum.apply(target, args);
  };
  //------------------------- End -------------------------
};