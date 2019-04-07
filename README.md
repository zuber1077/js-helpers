# @zuber1077/js-helpers

Js Helpers and validator functions collection 

_**IMPORTANT:** you need to use ES6 import and export syntax in order to use this module._
* Or use [esm](https://github.com/standard-things/esm)  module "npm i esm" to use ES6 module syntax <br> 

## Install

```
$ npm i zuber1077/js-helpers
```

## Usage

> validator
```js
import {isColor} from '@zuber/js-helpers'

isColor('#fff');
//=> true
```

> utils
```js
import {formatDate} from '@zuber/js-helpers'

// assume we have created a date 
  new Date().getTime()
// that output > 1554647023445
let date = new Date(1554647023445)

formatDate(date, 'yyyy-MM-dd hh:mm')
//=> 2019-04-07 22:23
```

