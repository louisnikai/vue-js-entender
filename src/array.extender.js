const {
  runObjectExtender
} = require('./object.extender');

const _jsExtensionCache = {
  Array: {
    sortObjectCompare: (propName, sortType = "asc") => {
      let fixedSortType = `${sortType}`.toLowerCase();
      return function (obj1, obj2) {
        if (fixedSortType !== "asc" && fixedSortType !== "desc") return 0;

        if (Object.typeOf(obj1) !== "object" && Object.typeOf(obj1) !== "array")
          return 0;

        if (Object.typeOf(obj2) !== "object" && Object.typeOf(obj2) !== "array")
          return 0;

        if (
          !Object.keys(obj1).contains(propName) ||
          !Object.keys(obj2).contains(propName)
        )
          return 0;

        let result = 0;
        let propValue1 = obj1[propName];
        let propValue2 = obj2[propName];

        if (propValue2 < propValue1) result = fixedSortType === "desc" ? -1 : 1;
        else if (propValue2 > propValue2)
          result = fixedSortType === "desc" ? 1 : -1;

        return result;
      };
    }
  }
};

exports.runArrayExtender = (Vue) => {
  runObjectExtender(Vue);

  //------------------------- Array Extensions -------------------------
  Array.prototype.contains =
    Array.prototype.contains ||
    function (value, comparator) {
      if (Object.typeOf(comparator) === "function") {
        return this.some(item => comparator(item, value));
      }

      if (Object.typeOf(comparator) === "string") {
        return this.some(item => item[comparator] === value);
      }

      return this.includes(value);
    };
  Array.contains =
    Array.contains ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "array")
        throw new Error("target is not an array.");

      return target.contains.apply(target, args);
    };

  Array.prototype.insert =
    Array.prototype.insert ||
    function (index, value, callback) {
      if (Object.typeOf(callback) === "function")
        return callback(this, index, value);

      if (index < 0) return false;

      this.splice(index, 0, value);
      return true;
    };
  Array.insert =
    Array.insert ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "array")
        throw new Error("target is not an array.");

      return target.insert.apply(target, args);
    };

  Array.prototype.remove =
    Array.prototype.remove ||
    function (value, callback) {
      if (Object.typeOf(callback) === "function") return callback(this, value);

      let removeIndex;
      if (Object.typeOf(value) === "number" && isNaN(value))
        removeIndex = this.findIndex(
          item => Object.typeOf(item) === "number" && isNaN(item)
        );
      else removeIndex = this.indexOf(value);
      if (removeIndex < 0) return false;

      this.splice(removeIndex, 1);
      return true;
    };
  Array.remove =
    Array.remove ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "array")
        throw new Error("target is not an array.");

      return target.remove.apply(target, args);
    };

  Array.prototype.sortObject =
    Array.prototype.sortObject ||
    function (propName, sortType = "asc") {
      return this.sort(
        _jsExtensionCache.Array.sortObjectCompare(propName, sortType)
      );
    };
  Array.sortObject =
    Array.sortObject ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "array")
        throw new Error("target is not an array.");

      return target.sortObject.apply(target, args);
    };

  Array.prototype.mapMany =
    Array.prototype.mapMany ||
    function (callback) {
      if (Object.typeOf(callback) !== "function") return this;

      return this.reduce((prev, curr, index) => {
        let mapAttr = callback(curr, index);
        if (Object.typeOf(mapAttr) === "array") {
          prev = prev.concat(mapAttr);
        } else {
          prev.push(mapAttr);
        }
        return prev;
      }, []);
    };
  Array.mapMany =
    Array.mapMany ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "array")
        throw new Error("target is not an array.");

      return target.mapMany.apply(target, args);
    };

  Array.prototype.distinct =
    Array.prototype.distinct ||
    function () {
      let distinctMap = new Map();
      return this.filter(
        item => !distinctMap.has(item) && distinctMap.set(item, 1)
      );
    };
  Array.distinct =
    Array.distinct ||
    function (target, ...args) {
      if (Object.typeOf(target) !== "array")
        throw new Error("target is not an array.");

      return target.distinct.apply(target, args);
    };

  Array.prototype.findObjPropValue = Array.prototype.findObjPropValue || function (findConditions, fieldName, defaultValue = null, isOrMatch = false) {
    if (Object.typeOf(findConditions) === "object" || Object.typeOf(findConditions) === "function") {
      let objData;
      if (Object.typeOf(findConditions) === "object") {
        objData = this.filter(item => Object.typeOf(item) === "object").find((item) => {
          let fcKeys = Object.keys(findConditions).filter(fcKey => item[fcKey] !== undefined && item[fcKey] !== null);
          return isOrMatch ? fcKeys.some(fcKey => item[fcKey] === findConditions[fcKey]) : fcKeys.every(fcKey => item[fcKey] === findConditions[fcKey]);
        });
      } else {
        objData = this.filter(item => Object.typeOf(item) === "object").find(findConditions);
      }

      if (!objData || !Object.keys(objData).contains(fieldName))
        return defaultValue;

      return objData[fieldName];
    }

    return defaultValue;
  };
  Array.findObjPropValue = Array.findObjPropValue || function (target, ...args) {
    if (Object.typeOf(target) !== "array")
      throw new Error("target is not an array.");

    return target.findObjPropValue.apply(target, args);
  };

  Array.prototype.count = Array.prototype.count || function (cbFilter) {
    if (Object.typeOf(cbFilter) === "function")
      return this.filter(cbFilter).length;

    return this.length;
  }
  Array.count = Array.count || function (target, ...args) {
    if (Object.typeOf(target) !== "array")
      throw new Error("target is not an array.");

    return target.count.apply(target, args);
  };

  Array.prototype.sum = Array.prototype.sum || function (cbFunc) {
    return this.reduce((total, item) => {
      if (Object.typeOf(cbFunc) === "function") {
        let currValue = cbFunc(item);
        return total + currValue;
      }

      if (Object.typeOf(item) === "number")
        return total + item;

      return total;
    }, 0);
  }
  Array.sum = Array.sum || function (target, ...args) {
    if (Object.typeOf(target) !== "array")
      throw new Error("target is not an array.");

    return target.sum.apply(target, args);
  };
  //------------------------- End -------------------------
};
