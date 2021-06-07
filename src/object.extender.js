const moment = require('moment');

const _jsExtensionCache = {
  Object: {
    copyTypes: ["object", "array"],
    copyOptionKeys: ["deep", "exceptUndefined", "onlyFieldExists", "exceptFields"],
    cloneTypes: ["object", "array"],
    cloneOptionKeys: ["deep", "exceptFields"],
    valueEqualsTypes: ["object", "array"],
    deepFreezeTypes: ["object", "array"]
  }
};

exports.runObjectExtender = (Vue) => {
  //------------------------- Object Extensions -------------------------
  Object.typeOf =
    Object.typeOf ||
    function (value) {
      return Object.prototype.toString
        .call(value)
        .match(/^\[object\s(.*)\]$/)[1]
        .toLowerCase();
    };

  Object.isEmpty =
    Object.isEmpty ||
    function (target, isStrict = false) {
      try {
        if (Object.keys(target).length > 0) return false;

        return true;
      } catch (error) {
        if (isStrict) throw error;

        return true;
      }
    };

  Object.valueEquals =
    Object.valueEquals ||
    function (objA, objB) {
      let objA_need = _jsExtensionCache.Object.valueEqualsTypes.includes(
        Object.typeOf(objA)
      );
      let objB_need = _jsExtensionCache.Object.valueEqualsTypes.includes(
        Object.typeOf(objB)
      );
      if (!objA_need || !objB_need) return objA === objB;

      let keysA = Object.entries(objA)
        .filter(entry => Object.typeOf(entry[1]) !== "function")
        .map(entry => entry[0]);
      let keysB = Object.entries(objB)
        .filter(entry => Object.typeOf(entry[1]) !== "function")
        .map(entry => entry[0]);
      if (keysA.length != keysB.length) {
        // console.log(keysA, keysA.length, keysB, keysB.length);
        return false;
      }

      for (let i = 0; i < keysA.length; i++) {
        let propName = keysA[i];
        let valueA = objA[propName];
        let valueB = objB[propName];

        let valueA_need = _jsExtensionCache.Object.valueEqualsTypes.includes(
          Object.typeOf(valueA)
        );
        let valueB_need = _jsExtensionCache.Object.valueEqualsTypes.includes(
          Object.typeOf(valueB)
        );
        if (valueA_need && valueB_need) {
          if (!Object.valueEquals(objA[propName], objB[propName])) {
            // console.log(`${propName}:`, objA[propName], objB[propName]);
            return false;
          }
          continue;
        }

        let valueA_isNaN = Object.typeOf(valueA) === "number" && isNaN(valueA);
        let valueB_isNaN = Object.typeOf(valueB) === "number" && isNaN(valueB);
        if (valueA_isNaN && valueB_isNaN) continue;

        if (valueA !== valueB) {
          // console.log(`${propName}:`, valueA, valueB);
          return false;
        }
      }

      return true;
    };

  Object.copy =
    Object.copy ||
    function (target, options, ...args) {
      let deep = true,
        exceptUndefined = true,
        onlyFieldExists = false,
        exceptFields = [],
        sourceArr;
      if (
        Object.typeOf(options) === "object" &&
        Object.keys(options).some(key =>
          _jsExtensionCache.Object.copyOptionKeys.includes(key)
        )
      ) {
        ({
          deep,
          exceptUndefined,
          onlyFieldExists,
          exceptFields
        } = options);
        deep = deep !== undefined ? deep : true;
        exceptUndefined = exceptUndefined !== undefined ? exceptUndefined : true;
        onlyFieldExists = onlyFieldExists !== undefined ? onlyFieldExists : false;
        exceptFields = Object.typeOf(exceptFields) === "array" ? exceptFields : [];
        sourceArr = [...args];
      } else {
        sourceArr = [options, ...args];
      }

      sourceArr.forEach(source => {
        if (Object.typeOf(source) !== Object.typeOf(target)) return;

        Object.keys(source).forEach(key => {
          let value = source[key];
          if (exceptUndefined && value === undefined) return;
          if (onlyFieldExists && !Object.keys(target).includes(key))
            return;
          if (exceptFields.includes(key)) return;

          let isCopyType = _jsExtensionCache.Object.copyTypes.includes(
            Object.typeOf(value)
          );
          if (isCopyType)
            value = value instanceof Array ? [...value] : {
              ...value
            };

          let targetValue = target[key];
          if (targetValue === undefined && isCopyType)
            target[key] = targetValue = value instanceof Array ? [] : {};

          let valueType = Object.typeOf(value);
          let targetValueType = Object.typeOf(targetValue);
          let isMoment = moment.isMoment(value);
          if (isMoment) {
            target[key] = moment(value);
            return;
          }
          if (!deep || valueType != targetValueType || !isCopyType) {
            target[key] = value;
            return;
          }

          Object.copy(
            targetValue, {
              deep: !!deep,
              exceptUndefined: !!exceptUndefined,
              onlyFieldExists: !!onlyFieldExists,
              exceptFields: exceptFields
            },
            value
          );
        });
      });

      return target;
    };

  Object.clone =
    Object.clone ||
    function (obj, options) {
      let deep = true,
        exceptFields = [];
      if (
        Object.typeOf(options) === "object" &&
        Object.keys(options).some(key =>
          _jsExtensionCache.Object.cloneOptionKeys.includes(key)
        )
      ) {
        ({
          deep,
          exceptFields
        } = options);
        deep = deep !== undefined ? deep : true;
        exceptFields = Object.typeOf(exceptFields) === "array" ? exceptFields : [];
      }

      if (!_jsExtensionCache.Object.cloneTypes.includes(Object.typeOf(obj)))
        return obj;

      let newObj = obj instanceof Array ? [] : {};
      Object.keys(obj).forEach(key => {
        let value = obj[key];

        if (exceptFields.includes(key))
          return;

        let isMoment = moment.isMoment(value);
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

  Object.deepFreeze =
    Object.deepFreeze ||
    function (obj) {
      if (!_jsExtensionCache.Object.deepFreezeTypes.includes(Object.typeOf(obj)))
        return obj;

      Object.keys(obj).forEach(key => {
        let value = obj[key];
        if (
          _jsExtensionCache.Object.deepFreezeTypes.includes(Object.typeOf(value))
        ) {
          Object.deepFreeze(value);
        }
      });

      return Object.freeze(obj);
    };

  Object.newGuid =
    Object.newGuid ||
    function () {
      var guid = "";
      for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
      }
      return guid;
    };

  Object.fixToNull =
    Object.fixToNull ||
    function (value) {
      return !!value ? value : null;
    };

  Object.toBoolean = Object.toBoolean || function (obj) {
    if (!obj)
      return false;

    let result;
    try {
      result = eval(obj.toString().toLowerCase());
    } catch (error) {
      result = new Boolean(obj);
    }

    return result;
  };

  Object.toCurrency = Object.toCurrency || function (value, currencyType, digits, emptyString, showPrefix = false) {
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

    let locale, currency;
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

    let formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: digits
    });
    let valueText = formatter.format(value);
    if (currencyType === 1)
      valueText = valueText.replace("¥", "￥");

    let prefix = String.empty;
    if (showPrefix) {
      switch (currencyType) {
        case 2:
          prefix = "C";
          break;
      }
      valueText = `${prefix}${valueText}`;
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
  }

  Object.toFixedString = Object.toFixedString || function (value, digits) {
    if (Object.typeOf(digits) !== "number") {
      digits = 2;
    }
    let valueTmp = value.toFixed(digits + 1);
    let result = valueTmp.substring(0, valueTmp.lastIndexOf('.') + 3);
    return result;
  };
  //------------------------- End -------------------------
}
