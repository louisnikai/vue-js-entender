const {
  runObjectExtender
} = require('./object.extender');
const {
  runStringExtender
} = require('./string.extender');
const {
  runNumberExtender
} = require('./number.extender');
const {
  runArrayExtender
} = require('./array.extender');
const {
  runDateExtender
} = require('./date.extender');

const runAllExtenders = (Vue) => {
  runObjectExtender(Vue);
  runStringExtender(Vue);
  runNumberExtender(Vue);
  runArrayExtender(Vue);
  runDateExtender(Vue);
};

module.exports = {
  install(Vue) {
    runAllExtenders(Vue);
  },
  runObjectExtender,
  runStringExtender,
  runNumberExtender,
  runArrayExtender,
  runDateExtender,
  runAllExtenders
};
