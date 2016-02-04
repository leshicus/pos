(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.LineTransport = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],2:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],5:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":4,"_process":3,"inherits":2}],6:[function(require,module,exports){
var WebsocketUpdater = require('./updaters/websocket-updater');
var XhrUpdater = require('./updaters/xhr-updater');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function LineTransport(options) {

  this.options = options;

  this.channels = {};

  this.socketUpdater = null;

  this.xhrUpdater = null;

  this.init();
}

util.inherits(LineTransport, EventEmitter);

LineTransport.prototype.init = function () {
  if (!this.options.language) {
    return this.emit('error', 'language not found');
  }

  // socketUpdater initialization
  this.initUpdater();
};

LineTransport.prototype.initUpdater = function() {
  try {
    this.socketUpdater = new WebsocketUpdater(this.channels, this.options);
  } catch (e) {
    return this.emit('error', e);
  }

  this.socketUpdater.on('message', this.onUpdate.bind(this));
  this.socketUpdater.on('connect', this.onSocketConnected.bind(this));
  this.socketUpdater.on('error', this.onSocketError.bind(this));
  this.socketUpdater.on('disconnect', this.onSocketDown.bind(this));
  this.socketUpdater.on('subscribed', this.onSubscribed.bind(this));
  this.socketUpdater.on('unsubscribed', this.onUnsubscribed.bind(this));

  try {
    this.xhrUpdater = new XhrUpdater(this.channels, this.options);
  } catch (e) {
    return this.emit('error', e);
  }
  this.xhrUpdater.on('message', this.onUpdate.bind(this));
  this.xhrUpdater.on('restore', this.onXhrRestore.bind(this));
  this.xhrUpdater.on('error', this.onXhrError.bind(this));
};

/**
 * Connecting to channel
 * @param {string} channel
 */
LineTransport.prototype.connect = function (channel) {

  var
    connection,
    channelId = this.getChannelId(channel, this.options.language);

  if (this.isSubscribed(this.channels[channelId])) {
    return this.error('you are already connected to ' + channelId);
  }

  this.channels[channelId] = connection = {
    channel: channel,
    language: this.options.language,
    version: null,
    xhr: false,
    socket: false
  };

  if (this.socketUpdater.isConnected()) {
    // subscription to channel by websocket
    if (this.socketUpdater.subscribe(connection) !== true) {
      // dissconnect from WS
      this.socketUpdater.disconnect();
      return this.error('cannot connect to channel via socket, check version');
    }
  } else {
    // subscription to channel by xhr
    if (this.xhrUpdater.subscribe(connection) !== true) {
      return this.error('cannot connect to channel via xhr');
    }
  }
};

/**
 * Disconnect from channel
 * @param {string} channel
 */
LineTransport.prototype.disconnect = function (channel) {
  var
    channelId = this.getChannelId(channel, this.options.language),
    connection = this.channels[channelId];

  if (!this.isSubscribed(connection)) {
    return this.error('you are already disconnected from ' + channelId);
  }

  if (this.socketUpdater.isConnected()) {
    if (this.socketUpdater.unsubscribe(connection) !== true) {
      return this.error('cannot disconnect from channel');
    }
  } else {
    if (this.socketUpdater.unsubscribe(connection) !== true) {
      return this.error('cannot disconnect from channel');
    }
  }

  delete this.channels[channelId];
  connection = null;
};

/**
 * get channelId by channel+language
 * @param {string} channel
 * @param {string} language
 * @returns {string}
 */
LineTransport.prototype.getChannelId = function (channel, language) {
  if (!channel || !language) {
    return false;
  }
  return language + ':' + channel;
};

/**
 * Occurs, when transport has received message from server
 * @param {Object} message
 */
LineTransport.prototype.onUpdate = function (message) {
  var _this = this,
      data = message.data,
      connection;

  if (data.type !== 'full' && data.type !== 'diffs') {
    this.error('Unknown data type: ' + data.type);
    return false;
  }
  // getting connection
  connection = this.getChannelId(message.channel, message.lang);

  if (!connection) {
    this.error('Connection not found: ' + message.channel + ': ' + message.lang);
    return false;
  }

  data.tournaments = [];

  // Первоначальная инициализация турниров
  var fullData,
      diffs;

  // Если есть пришел фул
  if (data.type === 'full') {
    fullData = data.matchdata.data;
    // Эта коллекция должна "сливаться" в текущую коллекцию турниров
    diffs = data.matchdata.diffs;
    // Определение турниров
    data.tournaments = fullData.tournaments;
  } else if (data.type === 'diffs') {
    diffs = data.diffs;
  } else {
    return;
  }
  // сливание изменений
  this.merge(data.tournaments, diffs, function(tournaments, lastVersion) {
    // Вызов дальнейшего обработчика
    _this.emit('data', {
      type: data.type,
      line_version: lastVersion || data.current_line_version,
      channel: message.channel,
      language: message.lang,
      tournaments: data.tournaments
    });
  });
};

/**
 * merge differences to tournamenets collection
 * @param {Array} tournaments
 * @param {Array} diffs
 * @param {function} callback
 */
LineTransport.prototype.merge = function (tournaments, diffs, callback) {
  var lastVersion = null;
  diffs && diffs.forEach(function (diff) {
    var diffdata, newTournaments;

    if (!(diffdata = diff.diffdata)) {
      return;
    }
    // cache last version
    lastVersion = diffdata.end_line_version;

    // Массив турниров для слияния
    newTournaments = diffdata.matchdata && diffdata.matchdata.tournaments;
    // Найденная коллекция турниров в этом конкретном диффе
    newTournaments && newTournaments.length && newTournaments.forEach(function(newTournament) {
      var
        tournamentId = newTournament.id,
        tournament;
      // Поиск существующего турнира по ID внутри общей коллекции
      tournament = tournaments.filter(function(tournament) { return tournament.id == tournamentId; })[0];
      if (tournament) {
        newTournament.events.forEach(function(newEvent) {
          var eventId = newEvent.id, index;
          // Поиск существующего события по ID внутри найденного турнира
          var event = tournament.events.filter(function(event) { return event.id == eventId; })[0];
          if (event) {
            event.cs || (event.cs = {});
            event.cse || (event.cse = {});
            newEvent.cs || (newEvent.cs = {});
            newEvent.cse || (newEvent.cse = {});

            // Слияние кефов в CS
            // Слияние кефов в CS
            for(index in newEvent.cs) {
              event.cs[index] = newEvent.cs[index];
            }

            for(index in newEvent.cse) {
              event.cse[index] = newEvent.cse[index];
            }

          } else {
            // Добавление события в конкретный турнир
            tournament.events.push(newEvent);
          }
        });
      } else {
        // Добавление нового турнира в общую коллекцию
        tournaments.push(newTournament);
      }
    });
  });

  // Вызов обратной функции с готовым результатом
  callback && callback(tournaments, lastVersion);
};

/**
 * In this case, need to switch transport to socket
 */
LineTransport.prototype.onSocketConnected = function () {
  var _this = this;
  // unsubscribe from channels, which use by XHR
  this.xhrUpdater.unsubscribeAll();
  // subscribe to all available channel, via Socket
  Object.keys(this.channels).forEach(function (channelId) {
    var connection = _this.channels[channelId];
    if (_this.socketUpdater.subscribe(connection) !== true) {
      return _this.error('cannot connect to channel: ' + channelId + ', via socket');
    }
  });
  // trigger connect event
  this.emit('connect', 'websocket');
};

/**
 * Occurs, when websocket transport has down
 */
LineTransport.prototype.onSocketDown = function () {
  // need to check to xhrUpdater
  var _this = this;

  Object.keys(this.channels).forEach(function (channelId) {
    var connection = _this.channels[channelId];
    if (_this.xhrUpdater.subscribe(connection) !== true) {
      return _this.error('cannot connect to channel');
    }
  });
  // trigger disconnect event
  this.emit('disconnect', 'xhr');
};

LineTransport.prototype.isSubscribed = function (connection) {
  return connection && (connection.socket || connection.xhr);
};

LineTransport.prototype.onSocketError = function (err) {
  this.error(err);
};

LineTransport.prototype.onSubscribed = function (data) {
  this.emit('subscribed', data.connection);
};

LineTransport.prototype.onUnsubscribed = function (data) {
  this.emit('unsubscribed', data);
};

/**
 * Occurs when we've got a problem with internet connection
 * @param err
 */
LineTransport.prototype.onXhrError = function () {
  this.emit('connection_error');
};

LineTransport.prototype.error = function (err) {
  this.emit('error', err);
};

LineTransport.prototype.onXhrRestore = function (err) {
  this.emit('connect', 'xhr');
};

module.exports = LineTransport;

},{"./updaters/websocket-updater":8,"./updaters/xhr-updater":9,"events":1,"util":5}],7:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * Should emit: message, error, disconnect
 * @param {Object} options
 * @constructor
 */
function Updater(channels, options) {
  this.init(channels, options);
}

util.inherits(Updater, EventEmitter);

Updater.prototype.init = function(options) {
  /**
   * Options for transport
   * options.language - language for channels
   * options.socket.url - path to socket server
   */
  this.options = options;

  if (!this.options.language) {
    return this.emit('error', 'language not found');
  }
};

Updater.prototype.setOption = function (name, value) {
  this.options[name] = value;
};

Updater.prototype.subscribe = function (channel) {
  this.error('must implement "subscribe" method');
};

Updater.prototype.unsubscribe = function (channel) {
  this.error('must implement "unsubscribe" method');
};

Updater.prototype.unsubscribeAll = function () {
  this.error('must implement "unsubscribeAll" method');
};

Updater.prototype.error = function (err) {
  this.emit('error', err);
};

Updater.prototype.onMessage = function (message) {
  try {
    this.emit('message', message);
  } catch (err) {
    this.error(err);
  }
};

Updater.prototype.getStartVersion = function (data) {
  if (data.type === 'full') {
    return null;
  } else if (data.type === 'diffs') {
    var lastDiff = data.diffs ? data.diffs[0] : null;
    if (!lastDiff || !lastDiff.diffdata) {
      return null;
    }
    return lastDiff.diffdata.start_line_version;
  }
  return null;
};

Updater.prototype.getLastVersion = function (data) {
  if (data.type === 'full') {
    return data.matchdata.current_line_version;
  } else if (data.type === 'diffs') {
    var lastDiff = data.diffs ? data.diffs[data.diffs.length - 1] : null;
    if (!lastDiff || !lastDiff.diffdata) {
      return null;
    }
    return lastDiff.diffdata.end_line_version;
  }
  return null;
};

Updater.prototype.getChannelId = function (channel, language) {
  if (!channel || !language) {
    return false;
  }
  return language + ':' + channel;
};

Updater.prototype.getConnection = function(channel, language) {
  var channelId = this.getChannelId(channel, language);
  return this.channels[channelId];
};


Updater.prototype.removeChannel = function (channel, language) {
  var channelId = this.getChannelId(channel, language),
      connection = this.channels[channelId];
  if (connection) {
    // clear channel
    this.channels[channelId] = null;
    connection = null;

    return true;
  }
  return false;
};

module.exports = Updater;

},{"events":1,"util":5}],8:[function(require,module,exports){
var Updater = require('./updater');
var util = require('util');

function WebsocketUpdater(channels, options) {
  this.init(channels, options);
}

util.inherits(WebsocketUpdater, Updater);

WebsocketUpdater.prototype.init = function (channels, options) {
  /**
   * Options for transport
   * options.language - language for channels
   * options.socket.url - path to socket server
   */
  this.options = options;

  /**
   * Collection of channels with parameters
   * @type {Object}
   */
  this.channels = channels;

  /**
   * class for connection with socket server
   * @type {socketIO|null}
   */
  this.transport = null;

  if (!this.options.language) {
    return this.emit('error', 'language not found');
  }

  if (!this.options.socket) {
    return this.emit('error', 'socket settings not found');
  }

  try {
    this.transport = io(this.options.socket.url, {
      timestampRequests: true
      //autoConnect:false
    });
  } catch (e) {
    return this.emit('error', e);
  }

  this.transport.on('message', this.onMessage.bind(this));
  this.transport.on('connect', this.onConnect.bind(this));
  this.transport.on('error', this.error.bind(this));
  this.transport.on('disconnect', this.onDisconnect.bind(this));
};

WebsocketUpdater.prototype.subscribe = function (connection, action) {
  // clear current connection
  //console.info(arguments);
  if (connection){
    if (connection.socket) {
      return false;
    }
    // clear socket attribute
    connection.socket = true;
    connection.stack = [];

    // clear xhr object
    connection.ajax && connection.ajax.abort();
    connection.ajax = null;

    if (!action) {
      action = 'subscribe';
    }

    // send subscribe message
    this._send({
      action: action,
      channel: connection.channel,
      ts: (new Date()).getTime(),
      lang: connection.language
    });

    return true;
  }else
    return false;
};

WebsocketUpdater.prototype.resubscribe = function (connection) {
  // resubscribe
  this.subscribe(connection, 'resubscribe');
};

/**
 * Unsubscribe from particular channel
 * @param {Object} connection
 * @returns {boolean}
 */
WebsocketUpdater.prototype.unsubscribe = function (connection) {
  // clear current connection
  if (!this.clearConnection(connection)) {
    return false;
  }

  this._send({
    action: 'unsubscribe',
    channel: connection.channel,
    lang: connection.language
  });

  return true;
};

WebsocketUpdater.prototype.unsubscribeAll = function () {
  for (var channelId in this.channels) {
    this.unsubscribe(this.channels[channelId]);
  }
};

WebsocketUpdater.prototype.disconnect = function () {
  this.transport.disconnect();
};

WebsocketUpdater.prototype._send = function (message) {
  try {
    this.transport.send(message);
  } catch (error) {
    this.error(error);
  }
};

WebsocketUpdater.prototype._load = function (connection,data) {
  connection.ajax = $.ajax({
    url: this.options.http.url,
    cache: false,
    dataType: 'json',
    data: {
      command: connection.channel,
      locale: connection.language,
      line_version: connection.version
    },
    method: 'GET',
    timeout: 120000
  });
  //var _this=this;
  //connection.ajax = Ext.Ajax.request({
  //  url: this.options.http.url,
  //  params:{
  //    command: connection.channel,
  //    locale: connection.language,
  //    line_version: connection.version
  //  },
  //  useDefaultXhrHeader: false,
  //  method: 'GET',
  //  timeout: 120000,
  //  success: function (response) {
  //    var response = Ext.decode(response.responseText);
  //    data.data = response;
  //    // parsing data
  //    _this.isSubscribed(data.channel, data.lang) && _this.processMessage(data);
  //  },
  //  failure: function (response) {
  //    var response = Ext.decode(response.responseText);
  //    if (_this.isSubscribed(data.channel, data.lang)) {
  //      // need to resubscribe to channel
  //      _this.resubscribe(connection);
  //    }
  //  }
  //});
  return connection.ajax;
};

WebsocketUpdater.prototype.onMessage = function (message) {
  switch(message.action) {
    case 'subscribed':
      this.onSubscribed(message.data);
      break;
    case 'resubscribed':
      this.onSubscribed(message.data);
      break;
    case 'unsubscribed':
      this.onUnsubscribed(message.data);
      break;
    case 'data':
      // fix engine.io bug
      try {
        message.data = JSON.parse(decodeURIComponent(escape(JSON.stringify(message.data))));

      } catch (e) {
        // catch the error
        return this.dataError(message.channel, message.lang);
      }
      // process response
      this.processMessage(message);
      break;
  }
};

/**
 * Callback method, which is triggers, then subscribe message has come
 * @param {Object} data
 */
WebsocketUpdater.prototype.onSubscribed = function (data) {
  // check language
  if (data.lang !== this.options.language) {
    return this.emit('log', 'Subscribed with incorrect language:' + data.lang);
  }

  var _this = this,
      connection = this.getConnection(data.channel, data.lang);

  if (!this.isSubscribed(data.channel, data.lang)) {
    return this.emit('log', 'Connection not found by: ' + data.channel + ' | ' + data.lang);
  }

  // if is xhr loading, waiting for previous request
  if (connection.ajax) {
    return false;
  }

  // loading full/diff's, because we should support chain of versions
  this._load(connection,data)
    .then(function (response) {
      // set response as data
      data.data = response;

      // parsing data
      _this.isSubscribed(data.channel, data.lang) && _this.processMessage(data);
    })
    .fail(function () {

      if (_this.isSubscribed(data.channel, data.lang)) {
        // need to resubscribe to channel
        _this.resubscribe(connection);
      }
    });
  //this._load(connection,data);

  // trigger subscribed event
  this.emit('subscribed', { connection: connection });
};

/**
 * Occurs, when server has returned "unsubscribe" answer from server
 * @param {Object} data
 */
WebsocketUpdater.prototype.onUnsubscribed = function (data) {
  var connection = this.getConnection(data.channel, data.lang);
  // clear current connection
  this.clearConnection(connection);
  // trigger event
  this.emit('unsubscribed', { channel: data.channel, language: data.lang });
};

/**
 * Parsing differences from response
 * @param {Object} message
 */
WebsocketUpdater.prototype.processMessage = function(message) {
  var
    _this = this,
    data = message.data,
    type = data.type,
    lastVersion,
    connection = this.getConnection(message.channel, message.lang);
  if(connection){
    if (type === 'diffs') {
      var startVersion = this.getStartVersion(data);
      // if last version haven't been set so far OR
      // current version is out of date, store new diffs in stack
      if (connection.version < startVersion) {
        connection.stack.push(message);
        // if stack is too big
        if (connection.stack.length > 30) {
          return this.resubscribe(connection);
        }
      } else {
        // clear stack
        connection.stack = [];
        // filtering old or double version from data
        this.filterVersions(data, connection.version);
        // change last version
        lastVersion = _this.getLastVersion(data);
        if (lastVersion) {
          // change last version
          connection.version = lastVersion;
          // send message
          this.emit('message', message);
        }
      }
    } else if (type === 'full') {
      // change last version
      connection.version = this.getLastVersion(data);
      // trigger data event
      this.emit('message', message);
      // pull changes from stack and execute their
      connection.stack.length && connection.stack.forEach(function(item) {
        // filtering old or double version from data
        _this.filterVersions(item.data, connection.version);
        lastVersion = _this.getLastVersion(item.data);
        if (lastVersion) {
          // change last version
          connection.version = lastVersion;
          // send message
          _this.emit('message', item);
        }
      });
    } else {
      this.error({ message: 'socket server sent FULL response.' });
    }
  }else{
    this.error({ message: 'No connection.' });
  }

};

/**
 * Filters different versions
 * @param data
 * @param version
 */
WebsocketUpdater.prototype.filterVersions = function (data, version) {
  if (data.diffs.length) {
    data.diffs = data.diffs.filter(function (diff) {
      var diffData = diff.diffdata;
      // kick of this version
      return !(diffData.end_line_version <= version);
    });
  }
};

/**
 * Event is triggers, when transport has connected to socket server
 */
WebsocketUpdater.prototype.onConnect = function () {
  this.emit('connect');
};

/**
 * After disconnetion, need clear settings
 */
WebsocketUpdater.prototype.onDisconnect = function () {
  // clear channels
  for (var channelId in this.channels) {
    this.channels[channelId].socket = false;
    this.channels[channelId].stack = [];
  }
  // trigger events
  this.emit('disconnect');
};

/**
 * check subscription on particular channel+lang
 * @param {string} channel
 * @param {string} lang
 * @returns {boolean}
 */
WebsocketUpdater.prototype.isSubscribed = function (channel, lang) {
  var channelId = this.getChannelId(channel, lang);
  return this.channels[channelId] && this.channels[channelId].socket;
};

/**
 * Checks connection to socket server
 * @returns {boolean}
 */
WebsocketUpdater.prototype.isConnected = function () {
  return this.transport.connected;
};

WebsocketUpdater.prototype.dataError = function (channel, lang) {
  var connection = this.getConnection(channel, lang);
  // subscribe again to particular channel
  this.resubscribe(connection);
};

WebsocketUpdater.prototype.clearConnection = function(connection) {
  if (!connection||!connection.socket) {
    return false;
  }
  // clear socket attribute
  connection.socket = false;
  connection.stack = [];

  // clear xhr object
  connection.ajax && connection.ajax.abort();
  connection.ajax = null;

  return true;
};

module.exports = WebsocketUpdater;

},{"./updater":7,"util":5}],9:[function(require,module,exports){
var Updater = require('./updater');
var util = require('util');

function XhrUpdater(channels, options) {
  this.init(channels, options);
}

util.inherits(XhrUpdater, Updater);

XhrUpdater.prototype.init = function (channels, options) {
  /**
   * Options for transport
   * options.language - language for channels
   * options.socket.url - path to socket server
   */
  this.options = options;

  this.channels = channels;

  if (!this.options.language) {
    return this.emit('error', 'language not found');
  }

  if (!this.options.http) {
    return this.emit('error', 'http settings not found');
  }
};

XhrUpdater.prototype.subscribe = function (connection) {
  var _this = this;

  if (connection.xhr) {
    this.unsubscribe(connection);
  }

  connection.xhr = true;
  connection.ajax = null;
  connection.timeout = this.options.http.timeouts && this.options.http.timeouts[connection.channel] || 10000;

  this.startLoading(connection);

  return true;
};

XhrUpdater.prototype.unsubscribe = function (connection) {
  if (!connection.xhr) {
    return false;
  }

  this._clearConnection(connection);

  connection.xhr = false;

  // trigger event
  this.emit('unsubscribed', { channel: connection.channel, language: connection.lang });

  return true;
};

XhrUpdater.prototype.unsubscribeAll = function () {
  var _this = this;
  Object.keys(this.channels).forEach(function (channelId) {
    var connection = _this.channels[channelId];
    _this.unsubscribe(connection);
  });
};

XhrUpdater.prototype.startLoading = function (connection) {
  var _this = this;
  // load data immediately
  this._send(connection)
    .then(function () {
      if (!connection.xhr) {
        return;
      }
      connection.timer && clearTimeout(connection.timer);
      connection.timer = setTimeout(function() {
        _this.startLoading(connection);
      }, connection.timeout);
    })
    .fail(function () {
      if (!connection.xhr) {
        return;
      }
      connection.timer && clearTimeout(connection.timer);
      connection.timer = setTimeout(function() {
        _this.startLoading(connection);
      }, connection.timeout);
    });
  //connection.ajax = Ext.Ajax.request({
  //  url: this.options.http.url,
  //  params: {
  //    command: connection.channel,
  //    locale: connection.language,
  //    line_version: connection.version
  //  },
  //  method: 'GET',
  //  useDefaultXhrHeader: false,
  //  timeout: 120000,
  //  success: function (response) {
  //    var response = Ext.decode(response.responseText);
  //    if (!connection.xhr) {
  //      return;
  //    }
  //    connection.timer && clearTimeout(connection.timer);
  //    connection.timer = setTimeout(function () {
  //      _this.startLoading(connection);
  //    }, connection.timeout);
  //
  //  },
  //  failure: function (response) {
  //    var response = Ext.decode(response.responseText);
  //    if (!connection.xhr) {
  //      return;
  //    }
  //    connection.timer && clearTimeout(connection.timer);
  //    connection.timer = setTimeout(function () {
  //      _this.startLoading(connection);
  //    }, connection.timeout);
  //  }
  //});
};

XhrUpdater.prototype._send = function (connection) {
  var _this = this;
  // if loading is going
  if (connection.ajax) {
    connection.ajax.abort && connection.ajax.abort();
    connection.ajax = null;
  }

  var ajax = connection.ajax = $.ajax({
    url: this.options.http.url,
    cache: false,
    dataType: 'json',
    data: {
      line_version: connection.version,
      command: connection.channel,
      locale: connection.language
    },
    method: 'GET',
    timeout: 120000
  })
    .then(function (data) {
      if (!connection.xhr) {
        return;
      }
      // if connection has connection error, trigger restore event
      if (connection.hasConnectionError === true) {
        connection.hasConnectionError = false;
        _this.emit('restore');
      }
      _this._processMessage(connection, data);
    })
    .fail(function() {
      connection.hasConnectionError = true;
      // trigger connection error event
      _this.error('connection_error');
    });

  //var ajax=connection.ajax = Ext.Ajax.request({
  //  url: this.options.http.url,
  //  params: {
  //    command: connection.channel,
  //    locale: connection.language,
  //    line_version: connection.version
  //  },
  //  method: 'GET',
  //  useDefaultXhrHeader: false,
  //  timeout: 120000,
  //  success: function (response) {
  //    if (!connection.xhr) {
  //      return;
  //    }
  //    // if connection has connection error, trigger restore event
  //    if (connection.hasConnectionError === true) {
  //      connection.hasConnectionError = false;
  //      _this.emit('restore');
  //    }
  //    _this._processMessage(connection, data);
  //  },
  //  failure: function (response) {
  //    onnection.hasConnectionError = true;
  //    // trigger connection error event
  //    _this.error('connection_error');
  //  }
  //});

  return ajax;
};

/**
 * Process response
 * @param {Object} connection
 * @param {Object} data
 */
XhrUpdater.prototype._processMessage = function (connection, data) {
  if (data.type === 'full') {
    connection.version = data.matchdata.current_line_version;
  } else if (data.type === 'diffs') {
    var lastDiff = data.diffs ? data.diffs[data.diffs.length - 1] : null;
    if (!lastDiff || !lastDiff.diffdata) {
      return;
    }
    connection.version = lastDiff.diffdata.end_line_version;
  }

  this.emit('message', { data: data, channel: connection.channel, lang: connection.language, type: 'xhr' });
};

XhrUpdater.prototype._clearConnection = function (connection) {
  // if timer is ON
  if (connection.timer) {
    clearInterval(connection.timer);
    connection.timer = null;
  }

  // if loading is going
  if (connection.ajax) {
    connection.ajax.abort && connection.ajax.abort();
    connection.ajax = null;
  }
};

module.exports = XhrUpdater;

},{"./updater":7,"util":5}]},{},[6])(6)
});