<h1 align="center">vue-js-extender</h1>

<p align="center">
<a href="https://www.npmjs.com/package/vue-js-extender"><img src="https://img.shields.io/npm/v/vue-js-extender.svg"/> <img src="https://img.shields.io/npm/dm/vue-js-extender.svg"/></a> <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg"/></a>
</p>

<p align="center">
Extend JS native objects for vue.
</p>

<br />
<br />
<br />

# Getting started

This package can extend JS native objects for vue.

1. Install the package:
```
npm install --save vue-js-extender
```

2. Add the package into your app:
```javascript
import Vue from 'vue'

import JSExtender from 'vue-js-extender'
Vue.use(JSExtender)
```

PS: It's better to import and use it at the first after import Vue.

<br />
<br />
<br />

# Usage

## Instructions

### Extend Details:

**Object:**

- `typeOf`
- `isEmpty`
- `valueEquals`
- `copy`
- `clone`
- `deepFreeze`
- `newGuid`
- `fixToNull`
- `toBoolean`

<br />

**Array:**

- `contains` and `prototype.contains`
- `insert` and `prototype.insert`
- `remove` and `prototype.remove`
- `sortObject` and `prototype.sortObject`
- `mapMany` and `prototype.mapMany`
- `distinct` and `prototype.distinct`
- `findObjPropValue` and `prototype.findObjPropValue`
- `count` and `prototype.count`
- `sum` and `prototype.sum`

<br />

**Date:**

- `format` and `prototype.format`

<br />

**Number:**

- `maxValue`: This is a field. value like follow:
```
{
    int32: 2147483647
}
```
- `toFixedEx` and `prototype.toFixedEx`

<br />

**String:**

- `empty`: This is a field
- `isNullOrEmpty`
- `isNullOrWhiteSpace`
- `fixToEmpty`
- `format` and `prototype.format`
- `trim` and `prototype.trim`
- `lTrim` and `prototype.lTrim`
- `rTrim` and `prototype.rTrim`
- `replaceAll` and `prototype.replaceAll`
- `remove` and `prototype.remove`
- `removeAll` and `prototype.removeAll`
- `contains` and `prototype.contains`
- `startWith` and `prototype.startWith`
- `endWith` and `prototype.endWith`
- `truncat` and `prototype.truncat`
- `toNumber` and `prototype.toNumber`
- `emptyToZero` and `prototype.emptyToZero`
- `toPascalCase` and `prototype.toPascalCase`
- `getFileExtension` and `prototype.getFileExtension`

<br />
<br />
<br />
