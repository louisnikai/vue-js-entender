'use strict';

var _require = require('./object.extender'),
    runObjectExtender = _require.runObjectExtender;

var _require2 = require('./string.extender'),
    runStringExtender = _require2.runStringExtender;

var _require3 = require('./number.extender'),
    runNumberExtender = _require3.runNumberExtender;

var _require4 = require('./array.extender'),
    runArrayExtender = _require4.runArrayExtender;

var _require5 = require('./date.extender'),
    runDateExtender = _require5.runDateExtender;

var runAllExtenders = function runAllExtenders(Vue) {
  runObjectExtender(Vue);
  runStringExtender(Vue);
  runNumberExtender(Vue);
  runArrayExtender(Vue);
  runDateExtender(Vue);
};

module.exports = {
  install: function install(Vue) {
    runAllExtenders(Vue);
  },

  runObjectExtender: runObjectExtender,
  runStringExtender: runStringExtender,
  runNumberExtender: runNumberExtender,
  runArrayExtender: runArrayExtender,
  runDateExtender: runDateExtender,
  runAllExtenders: runAllExtenders
};