/* eslint-disable */

// Object.assign polyfill
Object.assign = require('object-assign');

// Promise polyfill
var Promise = require('es6-promise-polyfill').Promise;

// if (typeof Promise === 'undefined') {
//   require('promise/lib/rejection-tracking').enable();
//   window.Promise = require('promise/lib/es6-extensions.js');
// }

// Fetch polyfill
if (typeof window.fetch === 'undefined') {
  require('whatwg-fetch');
}

if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    const list = Object(this);
    const length = list.length >>> 0;
    const thisArg = arguments[1];
    let value;

    for (let i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

// Array.map polyfill
if (Array.prototype.map === undefined) {
  Array.prototype.map = function(fn) {
    var rv = [];

    for(var i=0, l=this.length; i<l; i++)
      rv.push(fn(this[i]));

    return rv;
  };
}

// Array.filter polyfill
if (Array.prototype.filter === undefined) {
  Array.prototype.filter = function(fn) {
    var rv = [];

    for(var i=0, l=this.length; i<l; i++)
      if (fn(this[i])) rv.push(this[i]);

    return rv;
  };
}

/* eslint-enable */
