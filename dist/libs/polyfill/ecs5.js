/*!
 * ECMAscript5 新增的函数， 兼容到ie
 * 
 * Copyright yonyou
 * Refer: http://tech.pro/tutorial/1834/working-with-es5-javascript-array-functions-in-modern-and-legacy-browsers#indexof
 * http://www.oschina.net/code/snippet_994981_22947
 *
 * Date: 2015-04-09
 * Author: tianxq1
 * Note: 并非包含所有的函数，如有需要再添加
 */

+(function () {
    // 原型式继承
    if (!Object.create) {
        Object.create = function (object) {
            var F = function () { };
            F.prototype = object;
            return new F;
        };
    }
     
    // 遍历数组,执行函数
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn) {
            for (var i = 0, len = this.length; i < len; i++) {
                fn(this[i], i, this);
            }
        };
    }
     
     
    // 遍历数组,过滤选项
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fn) {
            var result = [];
            for (var i = 0, len = this.length; i < len; i++) {
                if (fn(this[i], i, this)) {
                    result.push(this[i]);
                }
            }
            return result;
        };
    }
     
     
    // 遍历数组,返回规则匹配的数组
    if (!Array.prototype.map) {
        Array.prototype.map = function (fn) {
            var result = [];
            for (var i = 0, len = this.length; i < len; i++) {
                result.push(fn(this[i], i, this));
            }
            return result;
        };
    }
     
     
    // 遍历数组,如果按照规则所有项返回true，则返回true
    if (!Array.prototype.every) {
        Array.prototype.every = function (fn) {
            var bool = true;
            for (var i = 0, len = this.length; i < len; i++) {
                if (fn(this[i], i, this) == false) {
                    bool = false;
                    break;
                }
            }
            return bool;
        };
    }
     
     
    // 遍历数组,如果按照规则有一个选项返回true，则返回true
    if (!Array.prototype.some) {
        Array.prototype.some = function (fn) {
            var bool = false;
            for (var i = 0, len = this.length; i < len; i++) {
                if (fn(this[i], i, this) == true) {
                    bool = true;
                    break;
                }
            }
            return bool;
        };
    }

    // reduce
    if ('function' !== typeof Array.prototype.reduce) {
      Array.prototype.reduce = function(callback, opt_initialValue){
        'use strict';
        if (null === this || 'undefined' === typeof this) {
          // At the moment all modern browsers, that support strict mode, have
          // native implementation of Array.prototype.reduce. For instance, IE8
          // does not support strict mode, so this check is actually useless.
          throw new TypeError(
              'Array.prototype.reduce called on null or undefined');
        }
        if ('function' !== typeof callback) {
          throw new TypeError(callback + ' is not a function');
        }
        var index, value,
            length = this.length >>> 0,
            isValueSet = false;
        if (1 < arguments.length) {
          value = opt_initialValue;
          isValueSet = true;
        }
        for (index = 0; length > index; ++index) {
          if (this.hasOwnProperty(index)) {
            if (isValueSet) {
              value = callback(value, this[index], index, this);
            }
            else {
              value = this[index];
              isValueSet = true;
            }
          }
        }
        if (!isValueSet) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        return value;
      };
    }

    // reduceRight
    if ('function' !== typeof Array.prototype.reduceRight) {
      Array.prototype.reduceRight = function(callback, opt_initialValue) {
        'use strict';
        if (null === this || 'undefined' === typeof this) {
          // At the moment all modern browsers, that support strict mode, have
          // native implementation of Array.prototype.reduceRight. For instance,
          // IE8 does not support strict mode, so this check is actually useless.
          throw new TypeError(
              'Array.prototype.reduceRight called on null or undefined');
        }
        if ('function' !== typeof callback) {
          throw new TypeError(callback + ' is not a function');
        }
        var index, value,
            length = this.length >>> 0,
            isValueSet = false;
        if (1 < arguments.length) {
          value = opt_initialValue;
          isValueSet = true;
        }
        for (index = length - 1; -1 < index; --index) {
          if (this.hasOwnProperty(index)) {
            if (isValueSet) {
              value = callback(value, this[index], index, this);
            }
            else {
              value = this[index];
              isValueSet = true;
            }
          }
        }
        if (!isValueSet) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        return value;
      };
    }


     
     
    // 绑定环境
    if(typeof Function.prototype.bind !== 'function'){
        Function.prototype.bind = function(context){
            var fn = this;
            var args = [];
            for(var i = 1, len = arguments.length; i < len; i ++){
                args.push(arguments[i]);
            }
     
            return function(){
                for(var j = 1, len = arguments.length; j < len; j ++){
                    args.push(arguments[j]);
                }
                return fn.apply(context, args);
            };
        };
    }
})();