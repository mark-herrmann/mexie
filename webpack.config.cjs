'use strict';

const path = require('path');

module.exports = {
  entry: './build/lib/index.js',
  mode: 'production',
  output: {
    path: path.resolve('./', 'dist'),
    filename: 'mexie.js',
    globalObject: 'this',
    library: {
      name: 'mexie',
      type: 'umd'
    }
  }
};
