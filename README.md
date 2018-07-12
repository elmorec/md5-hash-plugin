# md5-hash-plugin

[![NPM](https://nodei.co/npm/md5-hash-plugin.png)](https://npmjs.org/package/md5-hash-plugin)

Plugin to replace a standard webpack chunkhash with md5.

## Installation

```
npm install md5-hash-plugin --save-dev
```

## Usage

``` javascript
const Md5HashPlugin = require('md5-hash-plugin');

module.exports = {
  output: {
    filename: "[name].[chunkhash].js"
  },
  plugins: [
    new Md5HashPlugin()
  ]
};
```
