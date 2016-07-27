(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("composite-scopes-all", [], factory);
	else if(typeof exports === 'object')
		exports["composite-scopes-all"] = factory();
	else
		root["composite-scopes-all"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.notify = exports.cop = undefined;
	
	var _activeEventTracking = __webpack_require__(1);
	
	Object.defineProperty(exports, "notify", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_activeEventTracking).default;
	  }
	});
	
	/*istanbul ignore next*/var _contextjs = __webpack_require__(71);
	
	var _cop = _interopRequireWildcard(_contextjs);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.cop = _cop;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray2 = __webpack_require__(2);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _from = __webpack_require__(59);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	exports.default = notify;
	
	/*istanbul ignore next*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function difference(list, without) {
	    return list.filter(function (obj) /*istanbul ignore next*/{
	        return !without.some(function (obj2) /*istanbul ignore next*/{
	            return obj === obj2;
	        });
	    });
	}
	
	function diff(newList, oldList) {
	    var enteredItems = difference(newList, oldList);
	    var updatedItems = difference(newList, enteredItems);
	    var exitedItems = difference(oldList, newList);
	
	    return [enteredItems, updatedItems, exitedItems];
	}
	
	/*istanbul ignore next*/var Notifier = function () {
	    function /*istanbul ignore next*/Notifier(eventType, selector, callback, useCapture) {
	        /*istanbul ignore next*/var _this = this;
	
	        (0, _classCallCheck3.default)(this, Notifier);
	
	        this._eventType = eventType;
	        this._selector = selector;
	        this._callback = callback;
	        this._useCapture = useCapture;
	
	        this._selectedElements = [];
	
	        // install global listener
	        this._globalListener = function () /*istanbul ignore next*/{
	            return (/*istanbul ignore next*/_this._update()
	            );
	        };
	        document.documentElement.addEventListener(this._eventType, this._globalListener, true);
	
	        this._update();
	    }
	
	    (0, _createClass3.default)(Notifier, [{
	        key: "_update",
	        value: function _update() {
	            /*istanbul ignore next*/var _this2 = this;
	
	            var newSelection = arguments.length <= 0 || arguments[0] === undefined ? document.querySelectorAll(this._selector) : arguments[0];
	
	            var oldSelection = this._selectedElements;
	            this._selectedElements = /*istanbul ignore next*/(0, _from2.default)(newSelection);
	
	            /*istanbul ignore next*/var _diff = diff(this._selectedElements, oldSelection);
	
	            /*istanbul ignore next*/var _diff2 = (0, _slicedToArray3.default)(_diff, 3);
	
	            var newItems = _diff2[0];
	            /*istanbul ignore next*/var _ = _diff2[1];
	            /*istanbul ignore next*/var oldItems = _diff2[2];
	
	
	            newItems.forEach(function (item) /*istanbul ignore next*/{
	                return item.addEventListener( /*istanbul ignore next*/_this2._eventType, /*istanbul ignore next*/_this2._callback, /*istanbul ignore next*/_this2._useCapture);
	            });
	            oldItems.forEach(function (item) /*istanbul ignore next*/{
	                return item.removeEventListener( /*istanbul ignore next*/_this2._eventType, /*istanbul ignore next*/_this2._callback, /*istanbul ignore next*/_this2._useCapture);
	            });
	        }
	    }, {
	        key: "uninstall",
	        value: function uninstall() {
	            document.documentElement.removeEventListener(this._eventType, this._globalListener, true);
	            this._update([]);
	        }
	    }]);
	    return Notifier;
	}();
	
	function notify() {
	    /*istanbul ignore next*/for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }
	
	    return (/*istanbul ignore next*/new (Function.prototype.bind.apply(Notifier, [null].concat(args)))()
	    );
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(3);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(55);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	__webpack_require__(51);
	module.exports = __webpack_require__(53);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	var global        = __webpack_require__(17)
	  , hide          = __webpack_require__(21)
	  , Iterators     = __webpack_require__(9)
	  , TO_STRING_TAG = __webpack_require__(48)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(7)
	  , step             = __webpack_require__(8)
	  , Iterators        = __webpack_require__(9)
	  , toIObject        = __webpack_require__(10);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(14)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(11)
	  , defined = __webpack_require__(13);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(12);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(15)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(31)
	  , hide           = __webpack_require__(21)
	  , has            = __webpack_require__(32)
	  , Iterators      = __webpack_require__(9)
	  , $iterCreate    = __webpack_require__(33)
	  , setToStringTag = __webpack_require__(47)
	  , getPrototypeOf = __webpack_require__(49)
	  , ITERATOR       = __webpack_require__(48)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(17)
	  , core      = __webpack_require__(18)
	  , ctx       = __webpack_require__(19)
	  , hide      = __webpack_require__(21)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 17 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 18 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(20);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(22)
	  , createDesc = __webpack_require__(30);
	module.exports = __webpack_require__(26) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(23)
	  , IE8_DOM_DEFINE = __webpack_require__(25)
	  , toPrimitive    = __webpack_require__(29)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(26) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(26) && !__webpack_require__(27)(function(){
	  return Object.defineProperty(__webpack_require__(28)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(27)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24)
	  , document = __webpack_require__(17).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(24);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);

/***/ },
/* 32 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(34)
	  , descriptor     = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(47)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(21)(IteratorPrototype, __webpack_require__(48)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(23)
	  , dPs         = __webpack_require__(35)
	  , enumBugKeys = __webpack_require__(45)
	  , IE_PROTO    = __webpack_require__(42)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(28)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(46).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(22)
	  , anObject = __webpack_require__(23)
	  , getKeys  = __webpack_require__(36);
	
	module.exports = __webpack_require__(26) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(37)
	  , enumBugKeys = __webpack_require__(45);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(32)
	  , toIObject    = __webpack_require__(10)
	  , arrayIndexOf = __webpack_require__(38)(false)
	  , IE_PROTO     = __webpack_require__(42)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(10)
	  , toLength  = __webpack_require__(39)
	  , toIndex   = __webpack_require__(41);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(40)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(40)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(43)('keys')
	  , uid    = __webpack_require__(44);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(17)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17).document && document.documentElement;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(22).f
	  , has = __webpack_require__(32)
	  , TAG = __webpack_require__(48)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(43)('wks')
	  , uid        = __webpack_require__(44)
	  , Symbol     = __webpack_require__(17).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(32)
	  , toObject    = __webpack_require__(50)
	  , IE_PROTO    = __webpack_require__(42)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(13);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(52)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(14)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(40)
	  , defined   = __webpack_require__(13);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(54)
	  , ITERATOR  = __webpack_require__(48)('iterator')
	  , Iterators = __webpack_require__(9);
	module.exports = __webpack_require__(18).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(12)
	  , TAG = __webpack_require__(48)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	__webpack_require__(51);
	module.exports = __webpack_require__(57);

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(23)
	  , get      = __webpack_require__(58);
	module.exports = __webpack_require__(18).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(54)
	  , ITERATOR  = __webpack_require__(48)('iterator')
	  , Iterators = __webpack_require__(9);
	module.exports = __webpack_require__(18).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	__webpack_require__(61);
	module.exports = __webpack_require__(18).Array.from;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(19)
	  , $export        = __webpack_require__(16)
	  , toObject       = __webpack_require__(50)
	  , call           = __webpack_require__(62)
	  , isArrayIter    = __webpack_require__(63)
	  , toLength       = __webpack_require__(39)
	  , createProperty = __webpack_require__(64)
	  , getIterFn      = __webpack_require__(58);
	
	$export($export.S + $export.F * !__webpack_require__(65)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(23);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(9)
	  , ITERATOR   = __webpack_require__(48)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(22)
	  , createDesc      = __webpack_require__(30);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(48)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(68);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(70);
	var $Object = __webpack_require__(18).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(16);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(26), 'Object', {defineProperty: __webpack_require__(22).f});

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*istanbul ignore next*/Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Layer = exports.proceed = undefined;
	
	var _symbol = __webpack_require__(72);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var /*istanbul ignore next*/_Layers = __webpack_require__(89);
	
	/*istanbul ignore next*/Object.defineProperty(exports, "proceed", {
	  enumerable: true,
	  get: function get() {
	    return _Layers.proceed;
	  }
	});
	/*istanbul ignore next*/Object.defineProperty(exports, "Layer", {
	  enumerable: true,
	  get: function get() {
	    return _Layers.Layer;
	  }
	});
	/*istanbul ignore next*/exports.withLayers = withLayers;
	/*istanbul ignore next*/exports.withoutLayers = withoutLayers;
	/*istanbul ignore next*/exports.layer = layer;
	
	/*istanbul ignore next*/var cop = _interopRequireWildcard(_Layers);
	
	/*istanbul ignore next*/function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Layer Activation
	function withLayers(layers, func) {
	  cop.LayerStack.push({ withLayers: layers });
	  // console.log("callee: " + withLayers.callee);
	  try {
	    return func();
	  } finally {
	    cop.LayerStack.pop();
	  }
	};
	
	function withoutLayers(layers, func) {
	  cop.LayerStack.push({ withoutLayers: layers });
	  try {
	    return func();
	  } finally {
	    cop.LayerStack.pop();
	  }
	};
	
	// Layer creation by name
	function layer() {
	  var layerName = /*istanbul ignore next*/void 0,
	      rootContext = /*istanbul ignore next*/void 0;
	
	  /*istanbul ignore next*/for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  if (args.length === 2) {
	    /*istanbul ignore next*/rootContext = args[0];
	    /*istanbul ignore next*/layerName = args[1];
	  } else if (args.length === 1) {
	    /*istanbul ignore next*/layerName = args[0];
	  }
	  if (typeof rootContext === 'undefined') {
	    return basicCreate(layerName);
	  }
	  var parts = layerName.split(/\./);
	  var context = rootContext;
	  for (var i = 0; i < parts.length - 1; ++i) {
	    context = context[parts[i]];
	  }
	  return basicCreate(parts[parts.length - 1], context);
	};
	
	// Private helpers
	function basicCreate(layerName, context) {
	  if (typeof layerName === 'undefined') layerName = /*istanbul ignore next*/(0, _symbol2.default)('COP Layer');
	  if (typeof context === 'undefined') context = cop.GlobalNamedLayers;
	  if (typeof context[layerName] !== 'undefined') {
	    var existing = context[layerName];
	    if (!existing.isLayer /* undefined or falsy */ || !existing.isLayer()) {
	      throw new Error('Will not overwrite existing property ' + layerName);
	    }
	    return existing;
	  } else {
	    return context[layerName] = new cop.Layer(layerName, context);
	  }
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	__webpack_require__(86);
	__webpack_require__(87);
	__webpack_require__(88);
	module.exports = __webpack_require__(18).Symbol;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(17)
	  , has            = __webpack_require__(32)
	  , DESCRIPTORS    = __webpack_require__(26)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(31)
	  , META           = __webpack_require__(75).KEY
	  , $fails         = __webpack_require__(27)
	  , shared         = __webpack_require__(43)
	  , setToStringTag = __webpack_require__(47)
	  , uid            = __webpack_require__(44)
	  , wks            = __webpack_require__(48)
	  , wksExt         = __webpack_require__(76)
	  , wksDefine      = __webpack_require__(77)
	  , keyOf          = __webpack_require__(78)
	  , enumKeys       = __webpack_require__(79)
	  , isArray        = __webpack_require__(82)
	  , anObject       = __webpack_require__(23)
	  , toIObject      = __webpack_require__(10)
	  , toPrimitive    = __webpack_require__(29)
	  , createDesc     = __webpack_require__(30)
	  , _create        = __webpack_require__(34)
	  , gOPNExt        = __webpack_require__(83)
	  , $GOPD          = __webpack_require__(85)
	  , $DP            = __webpack_require__(22)
	  , $keys          = __webpack_require__(36)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(84).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(81).f  = $propertyIsEnumerable;
	  __webpack_require__(80).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(15)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(21)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(44)('meta')
	  , isObject = __webpack_require__(24)
	  , has      = __webpack_require__(32)
	  , setDesc  = __webpack_require__(22).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(27)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(48);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(17)
	  , core           = __webpack_require__(18)
	  , LIBRARY        = __webpack_require__(15)
	  , wksExt         = __webpack_require__(76)
	  , defineProperty = __webpack_require__(22).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(36)
	  , toIObject = __webpack_require__(10);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(36)
	  , gOPS    = __webpack_require__(80)
	  , pIE     = __webpack_require__(81);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 81 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(12);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(10)
	  , gOPN      = __webpack_require__(84).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(37)
	  , hiddenKeys = __webpack_require__(45).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(81)
	  , createDesc     = __webpack_require__(30)
	  , toIObject      = __webpack_require__(10)
	  , toPrimitive    = __webpack_require__(29)
	  , has            = __webpack_require__(32)
	  , IE8_DOM_DEFINE = __webpack_require__(25)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(26) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 86 */
/***/ function(module, exports) {



/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77)('asyncIterator');

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77)('observable');

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PartialLayerComposition = exports.COPError = exports.LayerableObject = exports.LayerableObjectTrait = exports.Layer = exports.GlobalNamedLayers = exports.LayerStack = exports.GlobalLayers = exports.proceedStack = exports.log_layer_code = exports.Config = undefined;
	
	var _possibleConstructorReturn2 = __webpack_require__(90);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(94);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _values = __webpack_require__(102);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _getPrototypeOf = __webpack_require__(106);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _getOwnPropertyNames = __webpack_require__(110);
	
	var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);
	
	var _getOwnPropertyDescriptor = __webpack_require__(113);
	
	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
	
	var _defineProperty = __webpack_require__(68);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _symbol = __webpack_require__(72);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	exports.log = log;
	/*istanbul ignore next*/exports.withLogLayerCode = withLogLayerCode;
	/*istanbul ignore next*/exports.getLayerDefinitionForObject = getLayerDefinitionForObject;
	/*istanbul ignore next*/exports.ensurePartialLayer = ensurePartialLayer;
	/*istanbul ignore next*/exports.layerMethod = layerMethod;
	/*istanbul ignore next*/exports.layerProperty = layerProperty;
	/*istanbul ignore next*/exports.layerPropertyWithShadow = layerPropertyWithShadow;
	/*istanbul ignore next*/exports.computeLayersFor = computeLayersFor;
	/*istanbul ignore next*/exports.composeLayers = composeLayers;
	/*istanbul ignore next*/exports.resetLayerStack = resetLayerStack;
	/*istanbul ignore next*/exports.currentLayers = currentLayers;
	/*istanbul ignore next*/exports.invalidateLayerComposition = invalidateLayerComposition;
	/*istanbul ignore next*/exports.lookupLayeredFunctionForObject = lookupLayeredFunctionForObject;
	/*istanbul ignore next*/exports.uninstallLayersInObject = uninstallLayersInObject;
	/*istanbul ignore next*/exports.uninstallLayersInAllClasses = uninstallLayersInAllClasses;
	/*istanbul ignore next*/exports.allLayers = allLayers;
	/*istanbul ignore next*/exports.enableLayer = enableLayer;
	/*istanbul ignore next*/exports.disableLayer = disableLayer;
	/*istanbul ignore next*/exports.proceed = proceed;
	
	/*istanbul ignore next*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * Copyright (c) 2008-2011 Hasso Plattner Institute
	 *
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	/* 
	 * Private Helpers for Development
	 */
	
	var Config = /*istanbul ignore next*/exports.Config = {};
	Config.ignoreDeprecatedProceed = true;
	
	var log_layer_code = /*istanbul ignore next*/exports.log_layer_code = false;
	function log(string) {
	  if (log_layer_code) console.log(string);
	}
	
	/* 
	 * Private State
	 */
	
	var proceedStack = /*istanbul ignore next*/exports.proceedStack = [];
	var GlobalLayers = /*istanbul ignore next*/exports.GlobalLayers = [];
	// hack, to work around absence of identity dictionaries in JavaScript
	// we could perhaps limit ourselfs to layer only those objects that respond to object.id()
	// because working with objects is a serialization problem in itself, perhaps we should
	// restrict ourself in working with classes
	// So classes have names and names can be used as keys in dictionaries :-)
	var object_id_counter = 0;
	
	/* 
	 * Private Methods
	 */
	
	// for debugging ContextJS itself
	function withLogLayerCode(func) {
	  try {
	    var old = log_layer_code;
	    /*istanbul ignore next*/exports.log_layer_code = log_layer_code = true;
	    func();
	  } finally {
	    /*istanbul ignore next*/exports.log_layer_code = log_layer_code = old;
	  }
	};
	
	var LayerObjectID = /*istanbul ignore next*/(0, _symbol2.default)("layerObjectID");
	
	function getLayerDefinitionForObject(layer, object) {
	  // log("cop getLayerDefinitionForObject(" + layer + ", " + object + ")");
	  if (!layer || !object) {
	    return;
	  }
	  var result = layer[object[LayerObjectID]];
	  return result ? result : getLayerDefinitionForObject(layer, object.prototype);
	};
	
	/**
	 * Stores partial definitions for a single layered object and layer.
	 */
	
	/*istanbul ignore next*/var PartialLayer = function () {
	  function /*istanbul ignore next*/PartialLayer(layeredObject) {
	    /*istanbul ignore next*/(0, _classCallCheck3.default)(this, PartialLayer);
	
	    this.layeredObject = layeredObject;
	    this.layeredProperties = {};
	  }
	
	  (0, _createClass3.default)(PartialLayer, [{
	    key: 'setLayeredPropertyValue',
	    value: function setLayeredPropertyValue(name, value) {
	      this.layeredProperties[name] = value;
	    }
	  }, {
	    key: 'defineGetter',
	    value: function defineGetter(propertyName, getter) {
	      return (/*istanbul ignore next*/(0, _defineProperty2.default)(this.layeredProperties, propertyName, { get: getter, configurable: true })
	      );
	    }
	  }, {
	    key: 'defineSetter',
	    value: function defineSetter(propertyName, setter) {
	      return (/*istanbul ignore next*/(0, _defineProperty2.default)(this.layeredProperties, propertyName, { set: setter, configurable: true })
	      );
	    }
	  }, {
	    key: 'getterMethod',
	    value: function getterMethod(propertyName) {
	      return (/*istanbul ignore next*/(0, _getOwnPropertyDescriptor2.default)(this.layeredProperties, propertyName).get
	      );
	    }
	  }, {
	    key: 'setterMethod',
	    value: function setterMethod(propertyName) {
	      return (/*istanbul ignore next*/(0, _getOwnPropertyDescriptor2.default)(this.layeredProperties, propertyName).set
	      );
	    }
	  }, {
	    key: 'property',
	    value: function property(propertyName) {
	      if (this.layeredProperties.hasOwnProperty(propertyName)) {
	        return this.layeredProperties[propertyName];
	      }
	    }
	  }, {
	    key: 'reinstall',
	    value: function reinstall() {
	      /*istanbul ignore next*/var _this = this;
	
	      /*istanbul ignore next*/(0, _getOwnPropertyNames2.default)(this.layeredProperties).forEach(function (eachProperty) {
	        var property = /*istanbul ignore next*/(0, _getOwnPropertyDescriptor2.default)( /*istanbul ignore next*/_this.layeredProperties, eachProperty);
	        if (typeof property.get !== 'undefined' || typeof property.set !== 'undefined') {
	          makePropertyLayerAware( /*istanbul ignore next*/_this.layeredObject, eachProperty);
	        } else {
	          makeFunctionLayerAware( /*istanbul ignore next*/_this.layeredObject, eachProperty);
	        }
	      });
	    }
	  }]);
	  return PartialLayer;
	}();
	
	function ensurePartialLayer(layer, object) {
	  if (!layer) {
	    throw new Error("in ensurePartialLayer: layer is nil");
	  }
	  if (!object.hasOwnProperty(LayerObjectID)) {
	    /*istanbul ignore next*/(0, _defineProperty2.default)(object, LayerObjectID, {
	      value: object_id_counter++,
	      enumerable: false,
	      configurable: false,
	      writable: false
	    });
	  }
	  if (!layer[object[LayerObjectID]]) {
	    layer[object[LayerObjectID]] = new PartialLayer(object);
	  }
	  return layer[object[LayerObjectID]];
	};
	
	// TODO(mariannet) : Find out if ES6 constructor also has type
	function layerMethod(layer, object, property, func) {
	  ensurePartialLayer(layer, object).setLayeredPropertyValue(property, func);
	  func.displayName = "layered " + String(layer.name) + " " + (object.constructor ? object.constructor.type + "$" : "") + property;
	  makeFunctionLayerAware(object, property, layer.isHidden);
	
	  // Bookkeeping for layer uninstall
	  // typeof object.getName === 'function'
	  //    && (layer._layeredFunctionsList[object][property] = true);
	};
	
	function layerGetterMethod(layer, object, property, getter) {
	  ensurePartialLayer(layer, object).defineGetter(property, getter);
	};
	
	function layerSetterMethod(layer, object, property, setter) {
	  ensurePartialLayer(layer, object).defineSetter(property, setter);
	};
	
	function layerProperty(layer, object, property, defs) {
	  var defProperty = /*istanbul ignore next*/(0, _getOwnPropertyDescriptor2.default)(defs, property);
	  var getter = defProperty && defProperty.get;
	  if (getter) {
	    layerGetterMethod(layer, object, property, getter);
	  }
	  var setter = defProperty && defProperty.set;
	  if (setter) {
	    layerSetterMethod(layer, object, property, setter);
	  }
	  if (getter || setter) {
	    makePropertyLayerAware(object, property);
	  } else {
	    layerMethod(layer, object, property, defs[property]);
	  }
	};
	
	function layerPropertyWithShadow(layer, object, property) {
	  // shadowing does not work with current implementation
	  // see the shadow tests in LayersTest
	  var defs = {};
	  var baseValue = object[property];
	  var layeredPropName = "_layered_" + layer.name + "_" + property;
	  /*istanbul ignore next*/(0, _defineProperty2.default)(defs, property, {
	    get: function layeredGetter() {
	      return this[layeredPropName] === undefined ? proceed() : this[layeredPropName];
	    },
	    set: function layeredSetter(v) {
	      this[layeredPropName] = v;
	    },
	    configurable: true
	  });
	  layerProperty(layer, object, property, defs);
	};
	
	function computeLayersFor(obj) {
	  return obj && obj.activeLayers ? obj.activeLayers(currentLayers) : currentLayers();
	};
	
	function composeLayers(stack) {
	  var result = GlobalLayers.slice(0);
	  for (var i = 0; i < stack.length; i++) {
	    var current = stack[i];
	    if (current.withLayers) {
	      result = result.filter(function (l) /*istanbul ignore next*/{
	        return ! /*istanbul ignore next*/(current.withLayers.indexOf(l) !== -1);
	      }).concat(current.withLayers);
	    } else if (current.withoutLayers) {
	      result = result.filter(function (l) /*istanbul ignore next*/{
	        return ! /*istanbul ignore next*/(current.withoutLayers.indexOf(l) !== -1);
	      });
	    }
	  }
	  return result;
	};
	
	var LayerStack = /*istanbul ignore next*/exports.LayerStack = void 0;
	
	function resetLayerStack() {
	  /*istanbul ignore next*/exports.LayerStack = LayerStack = [{
	    isStatic: true,
	    toString: function /*istanbul ignore next*/toString() {
	      return "BaseLayer";
	    },
	    composition: null
	  }];
	  invalidateLayerComposition();
	};
	
	function currentLayers() {
	  if (LayerStack.length == 0) {
	    throw new Error("The default layer is missing");
	  }
	  // NON OPTIMIZED VERSION FOR STATE BASED LAYER ACTIVATION
	  var current = LayerStack[LayerStack.length - 1];
	  if (!current.composition) {
	    current.composition = composeLayers(LayerStack);
	  }
	  return current.composition;
	};
	
	// clear cached layer compositions
	function invalidateLayerComposition() {
	  LayerStack.forEach(function (ea) {
	    ea.composition = null;
	  });
	};
	
	function lookupLayeredFunctionForObject(self, layer, function_name, methodType, n) {
	  if (!layer) {
	    return undefined;
	  }
	  // we have to look for layer defintions in self, self.prototype,
	  // ... there may be layered methods in a subclass of "obj"
	  var partialFunction = /*istanbul ignore next*/void 0;
	  var partialLayerForObject = getLayerDefinitionForObject(layer, self);
	  if (partialLayerForObject) {
	    // log("  found layer definitions for object");
	    if (methodType == 'getter') {
	      partialFunction = partialLayerForObject.getterMethod(function_name);
	    } else if (methodType == 'setter') {
	      partialFunction = partialLayerForObject.setterMethod(function_name);
	    } else {
	      partialFunction = partialLayerForObject.property(function_name);
	    }
	  }
	  if (!partialFunction) {
	    // try the superclass hierachy
	    // log("look for superclass of: " + self.constructor)
	    var superclass = /*istanbul ignore next*/(0, _getPrototypeOf2.default)(self);
	    if (superclass) {
	      // log("layered function is not found
	      //in this partial method, lookup for my prototype?")
	      return lookupLayeredFunctionForObject(superclass, layer, function_name, methodType);
	    }
	  }
	  return partialFunction;
	};
	
	function pvtMakeFunctionOrPropertyLayerAware(obj, slotName, baseValue, type, isHidden) {
	  // install in obj[slotName] a cop wrapper that weaves partial methods
	  // into real method (baseValue)
	  if (baseValue.isLayerAware) {
	    return;
	  }
	  makeSlotLayerAwareWithNormalLookup(obj, slotName, baseValue, type, isHidden);
	};
	
	function makeSlotLayerAwareWithNormalLookup(obj, slotName, baseValue, type, isHidden) {
	  var wrapped_function = function wrapped_function() {
	    var composition = new PartialLayerComposition(this, obj, slotName, baseValue, type);
	    proceedStack.push(composition);
	    try {
	      return proceed.apply(this, arguments);
	    } finally {
	      proceedStack.pop();
	    };
	  };
	  wrapped_function.isLayerAware = true;
	  // this is more declarative outside of COP context
	  wrapped_function.isContextJSWrapper = true;
	  if (isHidden) {
	    wrapped_function.toString = function () {
	      return this.getOriginal().toString();
	    };
	  }
	  // For wrapped_function.getOriginal()
	  wrapped_function.originalFunction = baseValue;
	  if (type == "getter") {
	    /*istanbul ignore next*/(0, _defineProperty2.default)(obj, slotName, { get: wrapped_function });
	  } else if (type == "setter") {
	    /*istanbul ignore next*/(0, _defineProperty2.default)(obj, slotName, { set: wrapped_function });
	  } else {
	    obj[slotName] = wrapped_function;
	  }
	};
	
	function makeFunctionLayerAware(base_obj, function_name, isHidden) {
	  if (!base_obj) {
	    throw new Error("can't layer an non existent object");
	  }
	  /* ensure base function */
	  var base_function = base_obj[function_name];
	  if (!base_function) {
	    // console.log("WARNING can't layer an non existent function" + function_name +
	    // " , so do nothing")
	    // return;
	    base_function = function /*istanbul ignore next*/base_function() /*istanbul ignore next*/{
	      return null;
	    };
	  };
	  pvtMakeFunctionOrPropertyLayerAware(base_obj, function_name, base_function, undefined, isHidden);
	};
	
	function makePropertyLayerAware(baseObj, property) {
	  if (!baseObj) {
	    throw new Error("can't layer a non existent object");
	  }
	  // ensure base getter and setter
	  var baseObjProperty = /*istanbul ignore next*/(0, _getOwnPropertyDescriptor2.default)(baseObj, property);
	  var propName = "__layered_" + property + "__";
	  var getter = baseObjProperty && baseObjProperty.get;
	  if (!getter) {
	    // does not work when dealing with classes and instances...
	    baseObj[propName] = baseObj[property]; // take over old value
	    getter = function /*istanbul ignore next*/getter() {
	      return this[propName];
	    };
	    /*istanbul ignore next*/(0, _defineProperty2.default)(baseObj, property, { get: getter, configurable: true });
	  };
	  var setter = baseObjProperty && baseObjProperty.set;
	  if (!setter) {
	    setter = function /*istanbul ignore next*/setter(value) {
	      return this[propName] = value;
	    };
	    /*istanbul ignore next*/(0, _defineProperty2.default)(baseObj, property, { set: setter, configurable: true });
	  };
	  pvtMakeFunctionOrPropertyLayerAware(baseObj, property, getter, 'getter');
	  pvtMakeFunctionOrPropertyLayerAware(baseObj, property, setter, 'setter');
	};
	
	function makeFunctionLayerUnaware(base_obj, function_name) {
	  if (!base_obj) {
	    throw new Error("need object to makeFunctionLayerUnaware");
	  }
	  var prevFunction;
	  var currentFunction = base_obj[function_name];
	  if (currentFunction === undefined) {
	    return; // nothing to do here
	  }
	  while (typeof currentFunction.originalFunction == 'function' && !currentFunction.isLayerAware) {
	    var prevFunction = currentFunction;
	    currentFunction = currentFunction.originalFunction;
	  }
	  if (!currentFunction.isLayerAware) {
	    return; // nothing to do here
	  }
	  var originalFunction = currentFunction.originalFunction;
	  if (!(originalFunction instanceof Function)) {
	    throw new Error("makeFunctionLayerUnaware Error: no orignal function");
	  }
	  if (prevFunction instanceof Function) {
	    prevFunction.originalFunction = originalFunction;
	  } else {
	    base_obj[function_name] = originalFunction;
	  }
	};
	
	function uninstallLayersInObject(object) {
	  /*istanbul ignore next*/(0, _getOwnPropertyNames2.default)(object).forEach(function (ea) {
	    if (typeof object[ea] === 'function') makeFunctionLayerUnaware(object, ea);
	  });
	};
	
	function uninstallLayersInAllClasses() {
	  Global.classes(true).forEach(function (ea) {
	    uninstallLayersInObject(ea.prototype);
	  });
	};
	
	function allLayers() {
	  /*istanbul ignore next*/var optObject = arguments.length <= 0 || arguments[0] === undefined ? Global : arguments[0];
	
	  // does not really return all layers... layers in namepsaces are not found!
	  // therefore you can query all layers in an optObject
	  return (/*istanbul ignore next*/(0, _values2.default)(optObject).select(function (ea) {
	      return ea instanceof Layer;
	    })
	  );
	};
	
	/* 
	 * PUBLIC COP Layer Definition
	 */
	
	var globalContextForNamedLayers = {};
	
	/*istanbul ignore next*/exports.GlobalNamedLayers = globalContextForNamedLayers;
	
	// Gloabl Layer Activation
	
	function enableLayer(layer) {
	  if (GlobalLayers.indexOf(layer) !== -1) {
	    return;
	  }
	  GlobalLayers.push(layer);
	  invalidateLayerComposition();
	};
	
	function disableLayer(layer) {
	  var idx = GlobalLayers.indexOf(layer);
	  if (idx < 0) {
	    return;
	  }
	  GlobalLayers.splice(idx, 1);
	  invalidateLayerComposition();
	};
	
	function proceed() /* arguments */{
	  // COP Proceed Function
	  var composition = proceedStack[proceedStack.length - 1];
	  if (!composition) {
	    console.log('ContextJS: no composition to proceed (stack is empty) ');
	    return;
	  }
	  // TODO use index instead of shifiting?
	  if (composition.partialMethodIndex == undefined) {
	    composition.partialMethodIndex = composition.partialMethods.length - 1;
	  }
	  var index = composition.partialMethodIndex;
	  var partialMethod = composition.partialMethods[index];
	  if (!partialMethod) {
	    if (!partialMethod) {
	      throw new COPError('no partialMethod to proceed');
	    }
	  } else {
	    try {
	      composition.partialMethodIndex = index - 1;
	      if (!Config.ignoreDeprecatedProceed && partialMethod.toString().match(/^[\t ]*function ?\(\$?proceed/)) {
	        var args = $A(arguments);
	        args.unshift(proceed);
	        var msg = "proceed in arguments list in " + composition.functionName();
	        if (Config.throwErrorOnDeprecated) {
	          throw new Error("DEPRECATED ERROR: " + msg);
	        }
	        if (Config.logDeprecated) {
	          // console.log("source: " + partialMethod.toString());
	          console.log("DEPRECATED WARNING: " + msg);
	        }
	        var result = partialMethod.apply(composition.object, args);
	      } else {
	        var result = partialMethod.apply(composition.object, arguments);
	      }
	    } finally {
	      composition.partialMethodIndex = index;
	    }
	    return result;
	  }
	};
	
	/* 
	 * Layer Class
	 */
	
	/*istanbul ignore next*/var Layer = exports.Layer = function () {
	  function /*istanbul ignore next*/Layer(name, context) {
	    /*istanbul ignore next*/(0, _classCallCheck3.default)(this, Layer);
	
	    this._name = name;
	    this._context = context;
	    // this._layeredFunctionsList = {};
	  }
	
	  // Accessing
	
	
	  (0, _createClass3.default)(Layer, [{
	    key: 'fullName',
	    value: function fullName() {
	      return '' + this._context + '.' + this._name;
	    }
	  }, {
	    key: 'layeredObjects',
	    value: function layeredObjects() {
	      /*istanbul ignore next*/var _this2 = this;
	
	      return (/*istanbul ignore next*/(0, _getOwnPropertyNames2.default)(this).map(function (ea) /*istanbul ignore next*/{
	          return (/*istanbul ignore next*/_this2[ea] && /*istanbul ignore next*/_this2[ea]._layered_object
	          );
	        }).filter(function (ea) /*istanbul ignore next*/{
	          return ea;
	        })
	      ); // filters falsy things
	    }
	    // TODO: doesn't differentiate between functions and classes - necessary?
	
	  }, {
	    key: 'layeredClasses',
	    value: function layeredClasses() {
	      return this.layeredObjects().map(function (ea) /*istanbul ignore next*/{
	        return ea.constructor;
	      });
	    }
	
	    // Removing
	
	  }, {
	    key: 'remove',
	    value: function remove() {
	      // Deletes the LayerClass, but keeps the layered Functions.
	      if (this.isGlobal()) {
	        this.beNotGlobal();
	      }
	      var context = this._context;
	      if (typeof context !== 'undefined') delete context[this.name];
	    }
	  }, {
	    key: 'uninstall',
	    value: function uninstall() {
	      // Uninstalls just this Layer.
	      // functions that are layered by other Layers will not be reset.
	      var layer = this;
	      this.layeredObjects().forEach(function (eachLayeredObj) {
	        // var layerIdx = typeof eachLayeredObj.activeLayers === 'function'
	        //     ? eachLayeredObj.activeLayers().indexOf(layer) : -1;
	
	        // #Special Lively Webwerkstatt code.... General Case? #Jens
	        // #TODO if we have of gloabal list of all layers... we can look there
	
	        // Properties.own(layer._layeredFunctionsList[eachLayeredObj]).each(
	        //   function(eachLayeredFunc) {
	        //     var newerLayer = eachLayeredObj.activeLayers().find(
	        //       function(eachOtherLayer) {
	        //         var eachOtherLayerIdx
	        //             = eachLayeredObj.activeLayers().indexOf(eachOtherLayer);
	        //         var isNewer = (eachOtherLayerIdx !== -1)
	        //             && (eachOtherLayerIdx < layerIdx);
	        //         return isNewer &&
	        //             eachOtherLayer._layeredFunctionsList[eachLayeredObj][eachLayeredFunc];
	        //       });
	        //       if (!newerLayer) {
	        //         makeFunctionLayerUnaware(eachLayeredObj, eachLayeredFunc);
	        //       }
	        //   });
	      });
	      this.remove();
	    }
	
	    // Layer installation
	
	  }, {
	    key: 'refineClass',
	    value: function refineClass(classObject, methods) {
	      if (!classObject || !classObject.prototype) {
	        throw new Error("ContextJS: can not refine class '" + classObject + "' in " + layer);
	      }
	      this.refineObject(classObject.prototype, methods);
	      return this;
	    }
	
	    // Layering objects may be a garbage collection problem, because the layers keep strong
	    // reference to the objects
	
	  }, {
	    key: 'refineObject',
	    value: function refineObject(object, methods) {
	      /*istanbul ignore next*/var _this3 = this;
	
	      // log("cop refineObject");
	
	      // Bookkeeping:
	      // typeof object.getName === 'function' && (layer._layeredFunctionsList[object] = {});
	      /*istanbul ignore next*/(0, _getOwnPropertyNames2.default)(methods).forEach(function (function_name) {
	        // log(" layer property: " + function_name)
	        layerProperty( /*istanbul ignore next*/_this3, object, function_name, methods);
	      });
	      return this;
	    }
	  }, {
	    key: 'unrefineObject',
	    value: function unrefineObject(obj) {
	      var id = obj[LayerObjectID];
	      if (id !== undefined) {
	        delete this[id];
	      }
	    }
	  }, {
	    key: 'unrefineClass',
	    value: function unrefineClass(classObj) {
	      this.unrefineObject(classObj.prototype);
	    }
	  }, {
	    key: 'reinstallInClass',
	    value: function reinstallInClass(constructor) {
	      this.reinstallInObject(constructor.prototype);
	    }
	  }, {
	    key: 'reinstallInObject',
	    value: function reinstallInObject(object) {
	      var partialLayer = ensurePartialLayer(this, object);
	      partialLayer.reinstall();
	    }
	
	    // Layer activation
	
	  }, {
	    key: 'beGlobal',
	    value: function beGlobal() {
	      enableLayer(this);
	      return this;
	    }
	  }, {
	    key: 'beNotGlobal',
	    value: function beNotGlobal() {
	      disableLayer(this);
	      return this;
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      // Hidden Layers do not appear when evaluating the sourcecode of a function
	      // TODO: this function has to be called BEFORE the layer refines any class,
	      // due to problems in unrefining classes.
	      this.isHidden = true;
	      return this;
	    }
	
	    // Testing
	
	  }, {
	    key: 'isLayer',
	    value: function isLayer() {
	      return true;
	    }
	  }, {
	    key: 'isGlobal',
	    value: function isGlobal() {
	      return GlobalLayers.indexOf(this) !== -1;
	    }
	
	    // Debugging
	
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return String(this.name); // could be a symbol
	    }
	
	    // Deprecated serialization
	
	  }, {
	    key: 'toLiteral',
	    value: function toLiteral() {
	      if (!this.name) {
	        console.warn("Layer: Can not serialize without a name!");
	      }
	      return { name: this.name };
	    }
	
	    // Deserialization
	
	  }, {
	    key: 'fromLiteral',
	    value: function fromLiteral(literal) {
	      // console.log("Deserializing Layer activation from: " + literal.name);
	      return create(literal.name, false);
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return this._name;
	    }
	  }]);
	  return Layer;
	}();
	
	/*
	 * Example implementation of a layerable object
	 */
	
	
	/*istanbul ignore next*/var LayerableObjectTrait = exports.LayerableObjectTrait = function () {
	  function LayerableObjectTrait() {
	    (0, _classCallCheck3.default)(this, LayerableObjectTrait);
	  }
	
	  (0, _createClass3.default)(LayerableObjectTrait, [{
	    key: 'activeLayers',
	    value: function activeLayers() {
	      var result = { withLayers: [], withoutLayers: [] };
	      this.dynamicLayers(result);
	      this.structuralLayers(result);
	      this.globalLayers(result);
	      return result.withLayers;
	    }
	  }, {
	    key: 'collectWithLayersIn',
	    value: function collectWithLayersIn(layers, result) {
	      for (var i = 0; i < layers.length; i++) {
	        var ea = layers[i];
	        if (result.withLayers.indexOf(ea) === -1 && result.withoutLayers.indexOf(ea) === -1) {
	          result.withLayers.unshift(ea);
	        }
	      }
	    }
	  }, {
	    key: 'collectWithoutLayersIn',
	    value: function collectWithoutLayersIn(layers, result) {
	      for (var i = 0; i < layers.length; i++) {
	        var ea = layers[i];
	        if (result.withoutLayers.indexOf(ea) === -1) {
	          result.withoutLayers.push(ea);
	        }
	      }
	    }
	  }, {
	    key: 'dynamicLayers',
	    value: function dynamicLayers(result) {
	      // optimized version, that does not use closures and recursion
	      var stack = LayerStack;
	      // top down, ignore bottom element
	      for (var j = stack.length - 1; j > 0; j--) {
	        var current = stack[j];
	        if (current.withLayers) {
	          this.collectWithLayersIn(current.withLayers, result);
	        }
	        if (current.withoutLayers) {
	          this.collectWithoutLayersIn(current.withoutLayers, result);
	        }
	      }
	      return result;
	    }
	  }, {
	    key: 'structuralLayers',
	    value: function structuralLayers(result) {
	      var allLayers = result.withLayers;
	      var allWithoutLayers = result.withoutLayers;
	      var obj = this;
	      // go ownerchain backward and gather all layer activations and deactivations
	      while (obj) {
	        // don't use accessor methods because of speed... (not measured yet)
	        if (obj.withLayers) {
	          this.collectWithLayersIn(obj.withLayers, result);
	        }
	        if (obj.withoutLayers) {
	          this.collectWithoutLayersIn(obj.withoutLayers, result);
	        }
	        // recurse, stop if owner is undefined
	        obj = obj.owner;
	      }
	      return result;
	    }
	  }, {
	    key: 'globalLayers',
	    value: function globalLayers(result) {
	      this.collectWithLayersIn(GlobalLayers, result);
	      return result;
	    }
	  }, {
	    key: 'setWithLayers',
	    value: function setWithLayers(layers) {
	      this.withLayers = layers;
	    }
	  }, {
	    key: 'addWithLayer',
	    value: function addWithLayer(layer) {
	      var layers = this.getWithLayers();
	      if (! /*istanbul ignore next*/(layers.indexOf(layer) !== -1)) {
	        this.setWithLayers(layers.concat([layer]));
	      }
	    }
	  }, {
	    key: 'removeWithLayer',
	    value: function removeWithLayer(layer) {
	      var layers = this.getWithLayers();
	      if ( /*istanbul ignore next*/layers.indexOf(layer) !== -1) {
	        this.setWithLayers(layers.filter(function (l) /*istanbul ignore next*/{
	          return l !== layer;
	        }));
	      }
	    }
	  }, {
	    key: 'addWithoutLayer',
	    value: function addWithoutLayer(layer) {
	      var layers = this.getWithoutLayers();
	      if (!layers.include(layer)) {
	        this.setWithoutLayers(layers.concat([layer]));
	      }
	    }
	  }, {
	    key: 'removeWithoutLayer',
	    value: function removeWithoutLayer(layer) {
	      var layers = this.getWithoutLayers();
	      this.setWithoutLayers(layers.filter(function (l) /*istanbul ignore next*/{
	        return l !== layer;
	      }));
	    }
	  }, {
	    key: 'setWithoutLayers',
	    value: function setWithoutLayers(layers) {
	      this.withoutLayers = layers;
	    }
	  }, {
	    key: 'getWithLayers',
	    value: function getWithLayers(layers) {
	      return this.withLayers || [];
	    }
	  }, {
	    key: 'getWithoutLayer',
	    value: function getWithoutLayer(layers) {
	      return this.withoutLayers || [];
	    }
	  }]);
	  return LayerableObjectTrait;
	}();
	
	/*istanbul ignore next*/var LayerableObject = exports.LayerableObject = function (_LayerableObjectTrait) {
	  (0, _inherits3.default)(LayerableObject, _LayerableObjectTrait);
	
	  function LayerableObject() {
	    (0, _classCallCheck3.default)(this, LayerableObject);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LayerableObject).apply(this, arguments));
	  }
	
	  return LayerableObject;
	}(LayerableObjectTrait);
	
	/*istanbul ignore next*/var COPError = exports.COPError = function () {
	  function /*istanbul ignore next*/COPError(message) {
	    /*istanbul ignore next*/(0, _classCallCheck3.default)(this, COPError);
	
	    this._msg = msg;
	  }
	
	  (0, _createClass3.default)(COPError, [{
	    key: 'toString',
	    value: function toString() {
	      return "COP ERROR: " + this._msg;
	    }
	  }]);
	  return COPError;
	}();
	
	/*istanbul ignore next*/var PartialLayerComposition = exports.PartialLayerComposition = function () {
	  function /*istanbul ignore next*/PartialLayerComposition(obj, prototypeObject, functionName, baseFunction, methodType) {
	    /*istanbul ignore next*/(0, _classCallCheck3.default)(this, PartialLayerComposition);
	
	    this._partialMethods = [baseFunction];
	    var layers = computeLayersFor(obj);
	    for (var i = 0; i < layers.length; i++) {
	      var layer = layers[i];
	      var partialMethod = lookupLayeredFunctionForObject(obj, layer, functionName, methodType);
	      if (partialMethod) {
	        this._partialMethods.push(partialMethod);
	      }
	    }
	    this._object = obj;
	    this._prototypeObject = prototypeObject;
	    this._functionName = functionName;
	  }
	
	  (0, _createClass3.default)(PartialLayerComposition, [{
	    key: 'object',
	    get: function get() {
	      return this._object;
	    }
	  }, {
	    key: 'partialMethods',
	    get: function get() {
	      return this._partialMethods;
	    }
	  }, {
	    key: 'functionName',
	    get: function get() {
	      return this._functionName;
	    }
	  }, {
	    key: 'prototypeObject',
	    get: function get() {
	      return this._prototypeObject;
	    }
	  }]);
	  return PartialLayerComposition;
	}();
	
	resetLayerStack();
	
	// vim: sw=2

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(91);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(92);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(72);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	__webpack_require__(5);
	module.exports = __webpack_require__(76).f('iterator');

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(95);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(99);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(91);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(97);
	module.exports = __webpack_require__(18).Object.setPrototypeOf;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(16);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(98).set});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(24)
	  , anObject = __webpack_require__(23);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(19)(Function.call, __webpack_require__(85).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(101);
	var $Object = __webpack_require__(18).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(16)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(34)});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(104);
	module.exports = __webpack_require__(18).Object.values;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(16)
	  , $values = __webpack_require__(105)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(36)
	  , toIObject = __webpack_require__(10)
	  , isEnum    = __webpack_require__(81).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(108);
	module.exports = __webpack_require__(18).Object.getPrototypeOf;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(50)
	  , $getPrototypeOf = __webpack_require__(49);
	
	__webpack_require__(109)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(16)
	  , core    = __webpack_require__(18)
	  , fails   = __webpack_require__(27);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(112);
	var $Object = __webpack_require__(18).Object;
	module.exports = function getOwnPropertyNames(it){
	  return $Object.getOwnPropertyNames(it);
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(109)('getOwnPropertyNames', function(){
	  return __webpack_require__(83).f;
	});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(115);
	var $Object = __webpack_require__(18).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(10)
	  , $getOwnPropertyDescriptor = __webpack_require__(85).f;
	
	__webpack_require__(109)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyNGFkZDA3YTVkNzhkZDM5ZDZkMiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9zaXRlLXNjb3Blcy1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcHYyL2FjdGl2ZUV2ZW50VHJhY2tpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29wdjIvY29udGV4dGpzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcHYyL0xheWVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvdmFsdWVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtdG8tYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eURDckNTLE87Ozs7Ozs7Ozs7OztTQURHLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJDNENZLE07Ozs7QUE1Q3hCLFVBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQixPQUExQixFQUFtQztBQUMvQixZQUFPLEtBQUssTUFBTCxDQUFZO0FBQUEsZ0JBQU8sQ0FBQyxRQUFRLElBQVIsQ0FBYTtBQUFBLG9CQUFRLFFBQVEsSUFBaEI7QUFBQSxVQUFiLENBQVI7QUFBQSxNQUFaLENBQVA7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Q0E7QUFDQSxFQUFDLEU7Ozs7OztBQ0hELG1CQUFrQix5RDs7Ozs7O0FDQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDSkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFIiwiZmlsZSI6ImNvbXBvc2l0ZS1zY29wZXMtYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJjb21wb3NpdGUtc2NvcGVzLWFsbFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjb21wb3NpdGUtc2NvcGVzLWFsbFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjb21wb3NpdGUtc2NvcGVzLWFsbFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMjRhZGQwN2E1ZDc4ZGQzOWQ2ZDJcbiAqKi8iLCJleHBvcnQgKiBhcyBjb3AgZnJvbSBcIi4vY29wdjIvY29udGV4dGpzLmpzXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgbm90aWZ5IH0gZnJvbSAnLi9jb3B2Mi9hY3RpdmVFdmVudFRyYWNraW5nLmpzJztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29tcG9zaXRlLXNjb3Blcy1hbGwuanNcbiAqKi8iLCJmdW5jdGlvbiBkaWZmZXJlbmNlKGxpc3QsIHdpdGhvdXQpIHtcclxuICAgIHJldHVybiBsaXN0LmZpbHRlcihvYmogPT4gIXdpdGhvdXQuc29tZShvYmoyID0+IG9iaiA9PT0gb2JqMikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmKG5ld0xpc3QsIG9sZExpc3QpIHtcclxuICAgIHZhciBlbnRlcmVkSXRlbXMgPSBkaWZmZXJlbmNlKG5ld0xpc3QsIG9sZExpc3QpO1xyXG4gICAgdmFyIHVwZGF0ZWRJdGVtcyA9IGRpZmZlcmVuY2UobmV3TGlzdCwgZW50ZXJlZEl0ZW1zKTtcclxuICAgIHZhciBleGl0ZWRJdGVtcyA9IGRpZmZlcmVuY2Uob2xkTGlzdCwgbmV3TGlzdCk7XHJcblxyXG4gICAgcmV0dXJuIFtlbnRlcmVkSXRlbXMsIHVwZGF0ZWRJdGVtcywgZXhpdGVkSXRlbXNdO1xyXG59XHJcblxyXG5jbGFzcyBOb3RpZmllciB7XHJcbiAgICBjb25zdHJ1Y3RvcihldmVudFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50VHlwZSA9IGV2ZW50VHlwZTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yO1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5fdXNlQ2FwdHVyZSA9IHVzZUNhcHR1cmU7XHJcblxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkRWxlbWVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gaW5zdGFsbCBnbG9iYWwgbGlzdGVuZXJcclxuICAgICAgICB0aGlzLl9nbG9iYWxMaXN0ZW5lciA9ICgpID0+IHRoaXMuX3VwZGF0ZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRoaXMuX2V2ZW50VHlwZSwgdGhpcy5fZ2xvYmFsTGlzdGVuZXIsIHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlKG5ld1NlbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2VsZWN0b3IpKSB7XHJcbiAgICAgICAgbGV0IG9sZFNlbGVjdGlvbiA9IHRoaXMuX3NlbGVjdGVkRWxlbWVudHM7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRFbGVtZW50cyA9IEFycmF5LmZyb20obmV3U2VsZWN0aW9uKTtcclxuXHJcbiAgICAgICAgbGV0IFtuZXdJdGVtcywgXywgb2xkSXRlbXNdID0gZGlmZih0aGlzLl9zZWxlY3RlZEVsZW1lbnRzLCBvbGRTZWxlY3Rpb24pO1xyXG5cclxuICAgICAgICBuZXdJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKHRoaXMuX2V2ZW50VHlwZSwgdGhpcy5fY2FsbGJhY2ssIHRoaXMuX3VzZUNhcHR1cmUpKTtcclxuICAgICAgICBvbGRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuX2V2ZW50VHlwZSwgdGhpcy5fY2FsbGJhY2ssIHRoaXMuX3VzZUNhcHR1cmUpKTtcclxuICAgIH1cclxuXHJcbiAgICB1bmluc3RhbGwoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5fZXZlbnRUeXBlLCB0aGlzLl9nbG9iYWxMaXN0ZW5lciwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlKFtdKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5KC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiBuZXcgTm90aWZpZXIoLi4uYXJncyk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29wdjIvYWN0aXZlRXZlbnRUcmFja2luZy5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgSXRlcmF0b3JzICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSloaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpXG4gICwgc3RlcCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBkZXNjcmlwdG9yICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHN0b3JlICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBTeW1ib2wgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzXG4gKiogbW9kdWxlIGlkID0gNTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXQgICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDYwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgY2FsbCAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgdG9MZW5ndGggICAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5JylcbiAgLCBnZXRJdGVyRm4gICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsIGFMZW4gICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIG1hcGZuICAgPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDYxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzXG4gKiogbW9kdWxlIGlkID0gNjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyAgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgaW5kZXgsIHZhbHVlKXtcbiAgaWYoaW5kZXggaW4gb2JqZWN0KSRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanNcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIElURVJBVE9SICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYywgc2tpcENsb3Npbmcpe1xuICBpZighc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyByZXR1cm4ge2RvbmU6IHNhZmUgPSB0cnVlfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA2NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qc1xuICoqIG1vZHVsZSBpZCA9IDY2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanNcbiAqKiBtb2R1bGUgaWQgPSA2N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDY4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbiAqKiBtb2R1bGUgaWQgPSA2OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbiAqKiBtb2R1bGUgaWQgPSA3MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnOyBcclxuXHJcbmltcG9ydCAqIGFzIGNvcCBmcm9tIFwiLi9MYXllcnMuanNcIjtcclxuZXhwb3J0IHsgcHJvY2VlZCwgTGF5ZXIgfSBmcm9tIFwiLi9MYXllcnMuanNcIjtcclxuXHJcbi8vIExheWVyIEFjdGl2YXRpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhMYXllcnMobGF5ZXJzLCBmdW5jKSB7XHJcbiAgY29wLkxheWVyU3RhY2sucHVzaCh7d2l0aExheWVyczogbGF5ZXJzfSk7XHJcbiAgLy8gY29uc29sZS5sb2coXCJjYWxsZWU6IFwiICsgd2l0aExheWVycy5jYWxsZWUpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gZnVuYygpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBjb3AuTGF5ZXJTdGFjay5wb3AoKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd2l0aG91dExheWVycyhsYXllcnMsIGZ1bmMpIHtcclxuICBjb3AuTGF5ZXJTdGFjay5wdXNoKHt3aXRob3V0TGF5ZXJzOiBsYXllcnN9KTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGZ1bmMoKTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgY29wLkxheWVyU3RhY2sucG9wKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gTGF5ZXIgY3JlYXRpb24gYnkgbmFtZVxyXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXIoLi4uYXJncykge1xyXG4gIGxldCBsYXllck5hbWUsIHJvb3RDb250ZXh0O1xyXG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgW3Jvb3RDb250ZXh0LCBsYXllck5hbWVdID0gYXJncztcclxuICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XHJcbiAgICBbbGF5ZXJOYW1lXSA9IGFyZ3M7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2Ygcm9vdENvbnRleHQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICByZXR1cm4gYmFzaWNDcmVhdGUobGF5ZXJOYW1lKTtcclxuICB9XHJcbiAgdmFyIHBhcnRzID0gbGF5ZXJOYW1lLnNwbGl0KC9cXC4vKTtcclxuICB2YXIgY29udGV4dCA9IHJvb3RDb250ZXh0O1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoIC0gMTsgKytpKSB7XHJcbiAgICBjb250ZXh0ID0gY29udGV4dFtwYXJ0c1tpXV07XHJcbiAgfVxyXG4gIHJldHVybiBiYXNpY0NyZWF0ZShwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSwgY29udGV4dCk7XHJcbn07XHJcblxyXG4vLyBQcml2YXRlIGhlbHBlcnNcclxuZnVuY3Rpb24gYmFzaWNDcmVhdGUobGF5ZXJOYW1lLCBjb250ZXh0KSB7XHJcbiAgaWYgKHR5cGVvZiBsYXllck5hbWUgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgbGF5ZXJOYW1lID0gU3ltYm9sKCdDT1AgTGF5ZXInKTtcclxuICBpZiAodHlwZW9mIGNvbnRleHQgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgY29udGV4dCA9IGNvcC5HbG9iYWxOYW1lZExheWVycztcclxuICBpZiAodHlwZW9mIGNvbnRleHRbbGF5ZXJOYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGxldCBleGlzdGluZyA9IGNvbnRleHRbbGF5ZXJOYW1lXTtcclxuICAgIGlmICghZXhpc3RpbmcuaXNMYXllciAvKiB1bmRlZmluZWQgb3IgZmFsc3kgKi8gfHwgIWV4aXN0aW5nLmlzTGF5ZXIoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpbGwgbm90IG92ZXJ3cml0ZSBleGlzdGluZyBwcm9wZXJ0eSAnICsgbGF5ZXJOYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybiBleGlzdGluZztcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGNvbnRleHRbbGF5ZXJOYW1lXSA9IG5ldyBjb3AuTGF5ZXIobGF5ZXJOYW1lLCBjb250ZXh0KTtcclxuICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvcHYyL2NvbnRleHRqcy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzXG4gKiogbW9kdWxlIGlkID0gNzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3ltYm9sO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA3M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgREVTQ1JJUFRPUlMgICAgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIE1FVEEgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWVxuICAsICRmYWlscyAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCB1aWQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgd2tzICAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgd2tzRGVmaW5lICAgICAgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2tleW9mJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgX2NyZWF0ZSAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBnT1BORXh0ICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpXG4gICwgJEdPUEQgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgJERQICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsICRrZXlzICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUEQgICAgICAgICAgID0gJEdPUEQuZlxuICAsIGRQICAgICAgICAgICAgID0gJERQLmZcbiAgLCBnT1BOICAgICAgICAgICA9IGdPUE5FeHQuZlxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsICRKU09OICAgICAgICAgID0gZ2xvYmFsLkpTT05cbiAgLCBfc3RyaW5naWZ5ICAgICA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeVxuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBISURERU4gICAgICAgICA9IHdrcygnX2hpZGRlbicpXG4gICwgVE9fUFJJTUlUSVZFICAgPSB3a3MoJ3RvUHJpbWl0aXZlJylcbiAgLCBpc0VudW0gICAgICAgICA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIE9QU3ltYm9scyAgICAgID0gc2hhcmVkKCdvcC1zeW1ib2xzJylcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdFtQUk9UT1RZUEVdXG4gICwgVVNFX05BVElWRSAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgUU9iamVjdCAgICAgICAgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIGRQKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvKSRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSlcbiAgICAsIGkgICAgPSAwXG4gICAgLCBsID0ga2V5cy5sZW5ndGhcbiAgICAsIGtleTtcbiAgd2hpbGUobCA+IGkpJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIGl0ICA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ09QTih0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBJU19PUCAgPSBpdCA9PT0gT2JqZWN0UHJvdG9cbiAgICAsIG5hbWVzICA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIVVTRV9OQVRJVkUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZih0aGlzID09PSBPYmplY3RQcm90bykkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKXNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0fSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mICA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKXtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24obmFtZSl7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfVxufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbmZvcih2YXIgc3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzKHN5bWJvbHNbaSsrXSk7XG5cbmZvcih2YXIgc3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3NEZWZpbmUoc3ltYm9sc1tpKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICBpZihpc1N5bWJvbChrZXkpKXJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgICB0aHJvdyBUeXBlRXJyb3Ioa2V5ICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbigpe1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7YTogU30pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgdmFyIGFyZ3MgPSBbaXRdXG4gICAgICAsIGkgICAgPSAxXG4gICAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYodHlwZW9mIHJlcGxhY2VyID09ICdmdW5jdGlvbicpJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZighaXNTeW1ib2wodmFsdWUpKXJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qc1xuICoqIG1vZHVsZSBpZCA9IDc0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgTUVUQSAgICAgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBzZXREZXNjICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBpZCAgICAgICA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbihpdCl7XG4gIHNldERlc2MoaXQsIE1FVEEsIHt2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH19KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24oaXQpe1xuICBpZihGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6ICAgICAgTUVUQSxcbiAgTkVFRDogICAgIGZhbHNlLFxuICBmYXN0S2V5OiAgZmFzdEtleSxcbiAgZ2V0V2VhazogIGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qc1xuICoqIG1vZHVsZSBpZCA9IDc1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qc1xuICoqIG1vZHVsZSBpZCA9IDc2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwge3ZhbHVlOiB3a3NFeHQuZihuYW1lKX0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDc3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA3OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbiAqKiBtb2R1bGUgaWQgPSA4MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbiAqKiBtb2R1bGUgaWQgPSA4MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA4MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGdPUE4gICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24oaXQpe1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanNcbiAqKiBtb2R1bGUgaWQgPSA4M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanNcbiAqKiBtb2R1bGUgaWQgPSA4NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qc1xuICoqIG1vZHVsZSBpZCA9IDg1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gODdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDg4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMSBIYXNzbyBQbGF0dG5lciBJbnN0aXR1dGVcclxuICpcclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqIFRIRSBTT0ZUV0FSRS5cclxuICovXHJcblxyXG4vKiBcclxuICogUHJpdmF0ZSBIZWxwZXJzIGZvciBEZXZlbG9wbWVudFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBDb25maWcgPSB7fTtcclxuQ29uZmlnLmlnbm9yZURlcHJlY2F0ZWRQcm9jZWVkID0gdHJ1ZTtcclxuXHJcbmV4cG9ydCBsZXQgbG9nX2xheWVyX2NvZGUgPSBmYWxzZTtcclxuZXhwb3J0IGZ1bmN0aW9uIGxvZyhzdHJpbmcpIHtcclxuICBpZiAobG9nX2xheWVyX2NvZGUpIGNvbnNvbGUubG9nKHN0cmluZyk7XHJcbn1cclxuXHJcblxyXG4vKiBcclxuICogUHJpdmF0ZSBTdGF0ZVxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBwcm9jZWVkU3RhY2sgPSBbXTtcclxuZXhwb3J0IGNvbnN0IEdsb2JhbExheWVycyA9IFtdO1xyXG4vLyBoYWNrLCB0byB3b3JrIGFyb3VuZCBhYnNlbmNlIG9mIGlkZW50aXR5IGRpY3Rpb25hcmllcyBpbiBKYXZhU2NyaXB0XHJcbi8vIHdlIGNvdWxkIHBlcmhhcHMgbGltaXQgb3Vyc2VsZnMgdG8gbGF5ZXIgb25seSB0aG9zZSBvYmplY3RzIHRoYXQgcmVzcG9uZCB0byBvYmplY3QuaWQoKVxyXG4vLyBiZWNhdXNlIHdvcmtpbmcgd2l0aCBvYmplY3RzIGlzIGEgc2VyaWFsaXphdGlvbiBwcm9ibGVtIGluIGl0c2VsZiwgcGVyaGFwcyB3ZSBzaG91bGRcclxuLy8gcmVzdHJpY3Qgb3Vyc2VsZiBpbiB3b3JraW5nIHdpdGggY2xhc3Nlc1xyXG4vLyBTbyBjbGFzc2VzIGhhdmUgbmFtZXMgYW5kIG5hbWVzIGNhbiBiZSB1c2VkIGFzIGtleXMgaW4gZGljdGlvbmFyaWVzIDotKVxyXG5sZXQgb2JqZWN0X2lkX2NvdW50ZXIgPSAwO1xyXG5cclxuLyogXHJcbiAqIFByaXZhdGUgTWV0aG9kc1xyXG4gKi9cclxuXHJcbi8vIGZvciBkZWJ1Z2dpbmcgQ29udGV4dEpTIGl0c2VsZlxyXG5leHBvcnQgZnVuY3Rpb24gd2l0aExvZ0xheWVyQ29kZShmdW5jKSB7XHJcbiAgdHJ5IHtcclxuICAgIHZhciBvbGQgPSBsb2dfbGF5ZXJfY29kZTtcclxuICAgIGxvZ19sYXllcl9jb2RlID0gdHJ1ZTtcclxuICAgIGZ1bmMoKTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgbG9nX2xheWVyX2NvZGUgPSBvbGQ7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgTGF5ZXJPYmplY3RJRCA9IFN5bWJvbChcImxheWVyT2JqZWN0SURcIik7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGF5ZXJEZWZpbml0aW9uRm9yT2JqZWN0KGxheWVyLCBvYmplY3QpIHtcclxuICAvLyBsb2coXCJjb3AgZ2V0TGF5ZXJEZWZpbml0aW9uRm9yT2JqZWN0KFwiICsgbGF5ZXIgKyBcIiwgXCIgKyBvYmplY3QgKyBcIilcIik7XHJcbiAgaWYgKCFsYXllciB8fCAhb2JqZWN0KSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHZhciByZXN1bHQgPSBsYXllcltvYmplY3RbTGF5ZXJPYmplY3RJRF1dO1xyXG4gIHJldHVybiByZXN1bHQgPyByZXN1bHQgOiBnZXRMYXllckRlZmluaXRpb25Gb3JPYmplY3QobGF5ZXIsIG9iamVjdC5wcm90b3R5cGUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlcyBwYXJ0aWFsIGRlZmluaXRpb25zIGZvciBhIHNpbmdsZSBsYXllcmVkIG9iamVjdCBhbmQgbGF5ZXIuXHJcbiAqL1xyXG5jbGFzcyBQYXJ0aWFsTGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKGxheWVyZWRPYmplY3QpIHtcclxuICAgIHRoaXMubGF5ZXJlZE9iamVjdCA9IGxheWVyZWRPYmplY3Q7XHJcbiAgICB0aGlzLmxheWVyZWRQcm9wZXJ0aWVzID0ge307XHJcbiAgfVxyXG5cclxuICBzZXRMYXllcmVkUHJvcGVydHlWYWx1ZShuYW1lLCB2YWx1ZSkge1xyXG4gICAgdGhpcy5sYXllcmVkUHJvcGVydGllc1tuYW1lXSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZGVmaW5lR2V0dGVyKHByb3BlcnR5TmFtZSwgZ2V0dGVyKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMubGF5ZXJlZFByb3BlcnRpZXMsIHByb3BlcnR5TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0OiBnZXR0ZXIsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgZGVmaW5lU2V0dGVyKHByb3BlcnR5TmFtZSwgc2V0dGVyKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMubGF5ZXJlZFByb3BlcnRpZXMsIHByb3BlcnR5TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2V0OiBzZXR0ZXIsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0dGVyTWV0aG9kKHByb3BlcnR5TmFtZSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcy5sYXllcmVkUHJvcGVydGllcywgcHJvcGVydHlOYW1lKS5nZXQ7XHJcbiAgfVxyXG5cclxuICBzZXR0ZXJNZXRob2QocHJvcGVydHlOYW1lKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLmxheWVyZWRQcm9wZXJ0aWVzLCBwcm9wZXJ0eU5hbWUpLnNldDtcclxuICB9XHJcblxyXG4gIHByb3BlcnR5KHByb3BlcnR5TmFtZSkge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJlZFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXllcmVkUHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVpbnN0YWxsKCkge1xyXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5sYXllcmVkUHJvcGVydGllcykuZm9yRWFjaChlYWNoUHJvcGVydHkgPT4ge1xyXG4gICAgICBjb25zdCBwcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcy5sYXllcmVkUHJvcGVydGllcywgZWFjaFByb3BlcnR5KTtcclxuICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eS5nZXQgIT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBwcm9wZXJ0eS5zZXQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgbWFrZVByb3BlcnR5TGF5ZXJBd2FyZSh0aGlzLmxheWVyZWRPYmplY3QsIGVhY2hQcm9wZXJ0eSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWFrZUZ1bmN0aW9uTGF5ZXJBd2FyZSh0aGlzLmxheWVyZWRPYmplY3QsIGVhY2hQcm9wZXJ0eSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZVBhcnRpYWxMYXllcihsYXllciwgb2JqZWN0KSB7XHJcbiAgaWYgKCFsYXllcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiaW4gZW5zdXJlUGFydGlhbExheWVyOiBsYXllciBpcyBuaWxcIik7XHJcbiAgfVxyXG4gIGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KExheWVyT2JqZWN0SUQpKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBMYXllck9iamVjdElELCB7XHJcbiAgICAgIHZhbHVlOiBvYmplY3RfaWRfY291bnRlcisrLFxyXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgd3JpdGFibGU6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcbiAgaWYgKCFsYXllcltvYmplY3RbTGF5ZXJPYmplY3RJRF1dKSB7XHJcbiAgICBsYXllcltvYmplY3RbTGF5ZXJPYmplY3RJRF1dID0gbmV3IFBhcnRpYWxMYXllcihvYmplY3QpO1xyXG4gIH1cclxuICByZXR1cm4gbGF5ZXJbb2JqZWN0W0xheWVyT2JqZWN0SURdXTtcclxufTtcclxuXHJcbi8vIFRPRE8obWFyaWFubmV0KSA6IEZpbmQgb3V0IGlmIEVTNiBjb25zdHJ1Y3RvciBhbHNvIGhhcyB0eXBlXHJcbmV4cG9ydCBmdW5jdGlvbiBsYXllck1ldGhvZChsYXllciwgb2JqZWN0LCBwcm9wZXJ0eSwgZnVuYykge1xyXG4gIGVuc3VyZVBhcnRpYWxMYXllcihsYXllciwgb2JqZWN0KS5zZXRMYXllcmVkUHJvcGVydHlWYWx1ZShwcm9wZXJ0eSwgZnVuYyk7XHJcbiAgZnVuYy5kaXNwbGF5TmFtZSA9IFwibGF5ZXJlZCBcIiArIFN0cmluZyhsYXllci5uYW1lKSArIFwiIFwiXHJcbiAgICAgICAgICAgICAgICAgICArIChvYmplY3QuY29uc3RydWN0b3IgPyAob2JqZWN0LmNvbnN0cnVjdG9yLnR5cGUgKyBcIiRcIikgOiBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgKyBwcm9wZXJ0eTtcclxuICBtYWtlRnVuY3Rpb25MYXllckF3YXJlKG9iamVjdCwgcHJvcGVydHksIGxheWVyLmlzSGlkZGVuKTtcclxuICBcclxuICAvLyBCb29ra2VlcGluZyBmb3IgbGF5ZXIgdW5pbnN0YWxsXHJcbiAgLy8gdHlwZW9mIG9iamVjdC5nZXROYW1lID09PSAnZnVuY3Rpb24nXHJcbiAgLy8gICAgJiYgKGxheWVyLl9sYXllcmVkRnVuY3Rpb25zTGlzdFtvYmplY3RdW3Byb3BlcnR5XSA9IHRydWUpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbGF5ZXJHZXR0ZXJNZXRob2QobGF5ZXIsIG9iamVjdCwgcHJvcGVydHksIGdldHRlcikge1xyXG4gIGVuc3VyZVBhcnRpYWxMYXllcihsYXllciwgb2JqZWN0KS5kZWZpbmVHZXR0ZXIocHJvcGVydHksIGdldHRlcik7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBsYXllclNldHRlck1ldGhvZChsYXllciwgb2JqZWN0LCBwcm9wZXJ0eSwgc2V0dGVyKSB7XHJcbiAgZW5zdXJlUGFydGlhbExheWVyKGxheWVyLCBvYmplY3QpLmRlZmluZVNldHRlcihwcm9wZXJ0eSwgc2V0dGVyKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsYXllclByb3BlcnR5KGxheWVyLCBvYmplY3QsIHByb3BlcnR5LCBkZWZzKSB7XHJcbiAgdmFyIGRlZlByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZzLCBwcm9wZXJ0eSk7XHJcbiAgdmFyIGdldHRlciA9IGRlZlByb3BlcnR5ICYmIGRlZlByb3BlcnR5LmdldDtcclxuICBpZiAoZ2V0dGVyKSB7XHJcbiAgICBsYXllckdldHRlck1ldGhvZChsYXllciwgb2JqZWN0LCBwcm9wZXJ0eSwgZ2V0dGVyKTtcclxuICB9XHJcbiAgdmFyIHNldHRlciA9IGRlZlByb3BlcnR5ICYmIGRlZlByb3BlcnR5LnNldDtcclxuICBpZiAoc2V0dGVyKSB7XHJcbiAgICBsYXllclNldHRlck1ldGhvZChsYXllciwgb2JqZWN0LCBwcm9wZXJ0eSwgc2V0dGVyKTtcclxuICB9XHJcbiAgaWYgKGdldHRlciB8fCBzZXR0ZXIpIHtcclxuICAgIG1ha2VQcm9wZXJ0eUxheWVyQXdhcmUob2JqZWN0LCBwcm9wZXJ0eSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxheWVyTWV0aG9kKGxheWVyLCBvYmplY3QsIHByb3BlcnR5LCBkZWZzW3Byb3BlcnR5XSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxheWVyUHJvcGVydHlXaXRoU2hhZG93KGxheWVyLCBvYmplY3QsIHByb3BlcnR5KSB7XHJcbiAgLy8gc2hhZG93aW5nIGRvZXMgbm90IHdvcmsgd2l0aCBjdXJyZW50IGltcGxlbWVudGF0aW9uXHJcbiAgLy8gc2VlIHRoZSBzaGFkb3cgdGVzdHMgaW4gTGF5ZXJzVGVzdFxyXG4gIHZhciBkZWZzID0ge307XHJcbiAgdmFyIGJhc2VWYWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XHJcbiAgdmFyIGxheWVyZWRQcm9wTmFtZSA9IFwiX2xheWVyZWRfXCIgKyBsYXllci5uYW1lICsgXCJfXCIgKyBwcm9wZXJ0eTtcclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVmcywgcHJvcGVydHksIHtcclxuICAgIGdldDogZnVuY3Rpb24gbGF5ZXJlZEdldHRlcigpIHtcclxuICAgICAgcmV0dXJuIHRoaXNbbGF5ZXJlZFByb3BOYW1lXSA9PT0gdW5kZWZpbmVkID9cclxuICAgICAgICAgIHByb2NlZWQoKSA6IHRoaXNbbGF5ZXJlZFByb3BOYW1lXTtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uIGxheWVyZWRTZXR0ZXIodikge1xyXG4gICAgICB0aGlzW2xheWVyZWRQcm9wTmFtZV0gPSB2O1xyXG4gICAgfSxcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gIH0pO1xyXG4gIGxheWVyUHJvcGVydHkobGF5ZXIsIG9iamVjdCwgcHJvcGVydHksIGRlZnMpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVMYXllcnNGb3Iob2JqKSB7XHJcbiAgcmV0dXJuIG9iaiAmJiBvYmouYWN0aXZlTGF5ZXJzID9cclxuICAgICAgb2JqLmFjdGl2ZUxheWVycyhjdXJyZW50TGF5ZXJzKSA6IGN1cnJlbnRMYXllcnMoKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlTGF5ZXJzKHN0YWNrKSB7XHJcbiAgdmFyIHJlc3VsdCA9IEdsb2JhbExheWVycy5zbGljZSgwKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudCA9IHN0YWNrW2ldO1xyXG4gICAgaWYgKGN1cnJlbnQud2l0aExheWVycykge1xyXG4gICAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKGwgPT4gIWN1cnJlbnQud2l0aExheWVycy5pbmNsdWRlcyhsKSkuY29uY2F0KGN1cnJlbnQud2l0aExheWVycyk7XHJcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnQud2l0aG91dExheWVycykge1xyXG4gICAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKGwgPT4gIWN1cnJlbnQud2l0aG91dExheWVycy5pbmNsdWRlcyhsKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IExheWVyU3RhY2s7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRMYXllclN0YWNrKCkge1xyXG4gIExheWVyU3RhY2sgPSBbe1xyXG4gICAgaXNTdGF0aWM6IHRydWUsXHJcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7IHJldHVybiBcIkJhc2VMYXllclwiOyB9LFxyXG4gICAgY29tcG9zaXRpb246IG51bGxcclxuICB9XTtcclxuICBpbnZhbGlkYXRlTGF5ZXJDb21wb3NpdGlvbigpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRMYXllcnMoKSB7XHJcbiAgaWYgKExheWVyU3RhY2subGVuZ3RoID09IDApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBkZWZhdWx0IGxheWVyIGlzIG1pc3NpbmdcIik7XHJcbiAgfVxyXG4gIC8vIE5PTiBPUFRJTUlaRUQgVkVSU0lPTiBGT1IgU1RBVEUgQkFTRUQgTEFZRVIgQUNUSVZBVElPTlxyXG4gIHZhciBjdXJyZW50ID0gTGF5ZXJTdGFja1tMYXllclN0YWNrLmxlbmd0aCAtIDFdO1xyXG4gIGlmICghY3VycmVudC5jb21wb3NpdGlvbikge1xyXG4gICAgY3VycmVudC5jb21wb3NpdGlvbiA9IGNvbXBvc2VMYXllcnMoTGF5ZXJTdGFjayk7XHJcbiAgfVxyXG4gIHJldHVybiBjdXJyZW50LmNvbXBvc2l0aW9uO1xyXG59O1xyXG5cclxuLy8gY2xlYXIgY2FjaGVkIGxheWVyIGNvbXBvc2l0aW9uc1xyXG5leHBvcnQgZnVuY3Rpb24gaW52YWxpZGF0ZUxheWVyQ29tcG9zaXRpb24oKSB7XHJcbiAgTGF5ZXJTdGFjay5mb3JFYWNoKFxyXG4gICAgZnVuY3Rpb24oZWEpIHtcclxuICAgICAgZWEuY29tcG9zaXRpb24gPSBudWxsO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9va3VwTGF5ZXJlZEZ1bmN0aW9uRm9yT2JqZWN0KFxyXG4gICAgc2VsZiwgbGF5ZXIsIGZ1bmN0aW9uX25hbWUsIG1ldGhvZFR5cGUsIG4pIHtcclxuICBpZiAoIWxheWVyKSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkOyBcclxuICB9XHJcbiAgLy8gd2UgaGF2ZSB0byBsb29rIGZvciBsYXllciBkZWZpbnRpb25zIGluIHNlbGYsIHNlbGYucHJvdG90eXBlLFxyXG4gIC8vIC4uLiB0aGVyZSBtYXkgYmUgbGF5ZXJlZCBtZXRob2RzIGluIGEgc3ViY2xhc3Mgb2YgXCJvYmpcIlxyXG4gIGxldCBwYXJ0aWFsRnVuY3Rpb247XHJcbiAgY29uc3QgcGFydGlhbExheWVyRm9yT2JqZWN0ID0gZ2V0TGF5ZXJEZWZpbml0aW9uRm9yT2JqZWN0KGxheWVyLCBzZWxmKTtcclxuICBpZiAocGFydGlhbExheWVyRm9yT2JqZWN0KSB7XHJcbiAgICAvLyBsb2coXCIgIGZvdW5kIGxheWVyIGRlZmluaXRpb25zIGZvciBvYmplY3RcIik7XHJcbiAgICBpZiAobWV0aG9kVHlwZSA9PSAnZ2V0dGVyJykge1xyXG4gICAgICBwYXJ0aWFsRnVuY3Rpb24gPSBwYXJ0aWFsTGF5ZXJGb3JPYmplY3QuZ2V0dGVyTWV0aG9kKGZ1bmN0aW9uX25hbWUpO1xyXG4gICAgfSBlbHNlIGlmIChtZXRob2RUeXBlID09ICdzZXR0ZXInKXtcclxuICAgICAgcGFydGlhbEZ1bmN0aW9uID0gcGFydGlhbExheWVyRm9yT2JqZWN0LnNldHRlck1ldGhvZChmdW5jdGlvbl9uYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhcnRpYWxGdW5jdGlvbiA9IHBhcnRpYWxMYXllckZvck9iamVjdC5wcm9wZXJ0eShmdW5jdGlvbl9uYW1lKTtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKCFwYXJ0aWFsRnVuY3Rpb24pIHtcclxuICAgIC8vIHRyeSB0aGUgc3VwZXJjbGFzcyBoaWVyYWNoeVxyXG4gICAgLy8gbG9nKFwibG9vayBmb3Igc3VwZXJjbGFzcyBvZjogXCIgKyBzZWxmLmNvbnN0cnVjdG9yKVxyXG4gICAgY29uc3Qgc3VwZXJjbGFzcyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzZWxmKTtcclxuICAgIGlmIChzdXBlcmNsYXNzKSB7XHJcbiAgICAgIC8vIGxvZyhcImxheWVyZWQgZnVuY3Rpb24gaXMgbm90IGZvdW5kXHJcbiAgICAgIC8vaW4gdGhpcyBwYXJ0aWFsIG1ldGhvZCwgbG9va3VwIGZvciBteSBwcm90b3R5cGU/XCIpXHJcbiAgICAgIHJldHVybiBsb29rdXBMYXllcmVkRnVuY3Rpb25Gb3JPYmplY3QoXHJcbiAgICAgICAgICBzdXBlcmNsYXNzLCBsYXllciwgZnVuY3Rpb25fbmFtZSwgbWV0aG9kVHlwZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBwYXJ0aWFsRnVuY3Rpb247XHJcbn07XHJcblxyXG5mdW5jdGlvbiBwdnRNYWtlRnVuY3Rpb25PclByb3BlcnR5TGF5ZXJBd2FyZShvYmosIHNsb3ROYW1lLCBiYXNlVmFsdWUsIHR5cGUsIGlzSGlkZGVuKSB7XHJcbiAgLy8gaW5zdGFsbCBpbiBvYmpbc2xvdE5hbWVdIGEgY29wIHdyYXBwZXIgdGhhdCB3ZWF2ZXMgcGFydGlhbCBtZXRob2RzXHJcbiAgLy8gaW50byByZWFsIG1ldGhvZCAoYmFzZVZhbHVlKVxyXG4gIGlmIChiYXNlVmFsdWUuaXNMYXllckF3YXJlKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIG1ha2VTbG90TGF5ZXJBd2FyZVdpdGhOb3JtYWxMb29rdXAob2JqLCBzbG90TmFtZSwgYmFzZVZhbHVlLCB0eXBlLCBpc0hpZGRlbik7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBtYWtlU2xvdExheWVyQXdhcmVXaXRoTm9ybWFsTG9va3VwKFxyXG4gICAgb2JqLCBzbG90TmFtZSwgYmFzZVZhbHVlLCB0eXBlLCBpc0hpZGRlbikge1xyXG4gIHZhciB3cmFwcGVkX2Z1bmN0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgY29tcG9zaXRpb24gPVxyXG4gICAgICAgIG5ldyBQYXJ0aWFsTGF5ZXJDb21wb3NpdGlvbih0aGlzLCBvYmosIHNsb3ROYW1lLCBiYXNlVmFsdWUsIHR5cGUpO1xyXG4gICAgcHJvY2VlZFN0YWNrLnB1c2goY29tcG9zaXRpb24pO1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIHByb2NlZWQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHByb2NlZWRTdGFjay5wb3AoKVxyXG4gICAgfTtcclxuICB9O1xyXG4gIHdyYXBwZWRfZnVuY3Rpb24uaXNMYXllckF3YXJlID0gdHJ1ZTtcclxuICAvLyB0aGlzIGlzIG1vcmUgZGVjbGFyYXRpdmUgb3V0c2lkZSBvZiBDT1AgY29udGV4dFxyXG4gIHdyYXBwZWRfZnVuY3Rpb24uaXNDb250ZXh0SlNXcmFwcGVyID0gdHJ1ZTtcclxuICBpZiAoaXNIaWRkZW4pIHtcclxuICAgIHdyYXBwZWRfZnVuY3Rpb24udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldE9yaWdpbmFsKCkudG9TdHJpbmcoKVxyXG4gICAgfTtcclxuICB9XHJcbiAgLy8gRm9yIHdyYXBwZWRfZnVuY3Rpb24uZ2V0T3JpZ2luYWwoKVxyXG4gIHdyYXBwZWRfZnVuY3Rpb24ub3JpZ2luYWxGdW5jdGlvbiA9IGJhc2VWYWx1ZTtcclxuICBpZiAodHlwZSA9PSBcImdldHRlclwiKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBzbG90TmFtZSwge2dldDogd3JhcHBlZF9mdW5jdGlvbn0pO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PSBcInNldHRlclwiKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBzbG90TmFtZSwge3NldDogd3JhcHBlZF9mdW5jdGlvbn0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBvYmpbc2xvdE5hbWVdID0gd3JhcHBlZF9mdW5jdGlvbjtcclxuICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBtYWtlRnVuY3Rpb25MYXllckF3YXJlKGJhc2Vfb2JqLCBmdW5jdGlvbl9uYW1lLCBpc0hpZGRlbikge1xyXG4gIGlmICghYmFzZV9vYmopIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcImNhbid0IGxheWVyIGFuIG5vbiBleGlzdGVudCBvYmplY3RcIik7XHJcbiAgfVxyXG4gIC8qIGVuc3VyZSBiYXNlIGZ1bmN0aW9uICovXHJcbiAgdmFyIGJhc2VfZnVuY3Rpb24gPSBiYXNlX29ialtmdW5jdGlvbl9uYW1lXTtcclxuICBpZiAoIWJhc2VfZnVuY3Rpb24pIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiV0FSTklORyBjYW4ndCBsYXllciBhbiBub24gZXhpc3RlbnQgZnVuY3Rpb25cIiArIGZ1bmN0aW9uX25hbWUgK1xyXG4gICAgLy8gXCIgLCBzbyBkbyBub3RoaW5nXCIpXHJcbiAgICAvLyByZXR1cm47XHJcbiAgICBiYXNlX2Z1bmN0aW9uID0gKCkgPT4gbnVsbDtcclxuICB9O1xyXG4gIHB2dE1ha2VGdW5jdGlvbk9yUHJvcGVydHlMYXllckF3YXJlKGJhc2Vfb2JqLCBmdW5jdGlvbl9uYW1lLCBiYXNlX2Z1bmN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwgaXNIaWRkZW4pXHJcbn07XHJcblxyXG5mdW5jdGlvbiBtYWtlUHJvcGVydHlMYXllckF3YXJlKGJhc2VPYmosIHByb3BlcnR5KSB7XHJcbiAgaWYgKCFiYXNlT2JqKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBsYXllciBhIG5vbiBleGlzdGVudCBvYmplY3RcIik7XHJcbiAgfSAgXHJcbiAgLy8gZW5zdXJlIGJhc2UgZ2V0dGVyIGFuZCBzZXR0ZXJcclxuICB2YXIgYmFzZU9ialByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlT2JqLCBwcm9wZXJ0eSk7XHJcbiAgdmFyIHByb3BOYW1lID0gXCJfX2xheWVyZWRfXCIgKyBwcm9wZXJ0eSArIFwiX19cIjtcclxuICB2YXIgZ2V0dGVyID0gYmFzZU9ialByb3BlcnR5ICYmIGJhc2VPYmpQcm9wZXJ0eS5nZXQ7XHJcbiAgaWYgKCFnZXR0ZXIpIHtcclxuICAgIC8vIGRvZXMgbm90IHdvcmsgd2hlbiBkZWFsaW5nIHdpdGggY2xhc3NlcyBhbmQgaW5zdGFuY2VzLi4uXHJcbiAgICBiYXNlT2JqW3Byb3BOYW1lXSA9IGJhc2VPYmpbcHJvcGVydHldOyAvLyB0YWtlIG92ZXIgb2xkIHZhbHVlXHJcbiAgICBnZXR0ZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXNbcHJvcE5hbWVdIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYmFzZU9iaiwgcHJvcGVydHksIHtnZXQ6IGdldHRlciwgY29uZmlndXJhYmxlOiB0cnVlfSk7XHJcbiAgfTtcclxuICB2YXIgc2V0dGVyID0gYmFzZU9ialByb3BlcnR5ICYmIGJhc2VPYmpQcm9wZXJ0eS5zZXQ7XHJcbiAgaWYgKCFzZXR0ZXIpIHtcclxuICAgIHNldHRlciA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB0aGlzW3Byb3BOYW1lXSA9IHZhbHVlIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYmFzZU9iaiwgcHJvcGVydHksIHtzZXQ6IHNldHRlciwgY29uZmlndXJhYmxlOiB0cnVlfSk7XHJcbiAgfTtcclxuICBwdnRNYWtlRnVuY3Rpb25PclByb3BlcnR5TGF5ZXJBd2FyZShiYXNlT2JqLCBwcm9wZXJ0eSwgZ2V0dGVyLCAnZ2V0dGVyJyk7XHJcbiAgcHZ0TWFrZUZ1bmN0aW9uT3JQcm9wZXJ0eUxheWVyQXdhcmUoYmFzZU9iaiwgcHJvcGVydHksIHNldHRlciwgJ3NldHRlcicpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbWFrZUZ1bmN0aW9uTGF5ZXJVbmF3YXJlKGJhc2Vfb2JqLCBmdW5jdGlvbl9uYW1lKSB7XHJcbiAgaWYgKCFiYXNlX29iaikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwibmVlZCBvYmplY3QgdG8gbWFrZUZ1bmN0aW9uTGF5ZXJVbmF3YXJlXCIpO1xyXG4gIH1cclxuICB2YXIgcHJldkZ1bmN0aW9uO1xyXG4gIHZhciBjdXJyZW50RnVuY3Rpb24gPSBiYXNlX29ialtmdW5jdGlvbl9uYW1lXTtcclxuICBpZiAoY3VycmVudEZ1bmN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybjsgLy8gbm90aGluZyB0byBkbyBoZXJlXHJcbiAgfSAgXHJcbiAgd2hpbGUgKHR5cGVvZiBjdXJyZW50RnVuY3Rpb24ub3JpZ2luYWxGdW5jdGlvbiA9PSAnZnVuY3Rpb24nXHJcbiAgICAgICYmICFjdXJyZW50RnVuY3Rpb24uaXNMYXllckF3YXJlKSB7XHJcbiAgICB2YXIgcHJldkZ1bmN0aW9uID0gY3VycmVudEZ1bmN0aW9uO1xyXG4gICAgY3VycmVudEZ1bmN0aW9uID0gY3VycmVudEZ1bmN0aW9uLm9yaWdpbmFsRnVuY3Rpb25cclxuICB9XHJcbiAgaWYgKCEoY3VycmVudEZ1bmN0aW9uLmlzTGF5ZXJBd2FyZSkpIHtcclxuICAgIHJldHVybjsgLy8gbm90aGluZyB0byBkbyBoZXJlXHJcbiAgfVxyXG4gIHZhciBvcmlnaW5hbEZ1bmN0aW9uID0gY3VycmVudEZ1bmN0aW9uLm9yaWdpbmFsRnVuY3Rpb25cclxuICBpZiAoIShvcmlnaW5hbEZ1bmN0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtYWtlRnVuY3Rpb25MYXllclVuYXdhcmUgRXJyb3I6IG5vIG9yaWduYWwgZnVuY3Rpb25cIik7XHJcbiAgfVxyXG4gIGlmIChwcmV2RnVuY3Rpb24gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgcHJldkZ1bmN0aW9uLm9yaWdpbmFsRnVuY3Rpb24gPSBvcmlnaW5hbEZ1bmN0aW9uXHJcbiAgfSBlbHNlIHtcclxuICAgIGJhc2Vfb2JqW2Z1bmN0aW9uX25hbWVdID0gb3JpZ2luYWxGdW5jdGlvblxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmluc3RhbGxMYXllcnNJbk9iamVjdChvYmplY3QpIHtcclxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpLmZvckVhY2goZWEgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBvYmplY3RbZWFdID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICBtYWtlRnVuY3Rpb25MYXllclVuYXdhcmUob2JqZWN0LCBlYSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5pbnN0YWxsTGF5ZXJzSW5BbGxDbGFzc2VzKCkge1xyXG4gIEdsb2JhbC5jbGFzc2VzKHRydWUpLmZvckVhY2goXHJcbiAgICBmdW5jdGlvbihlYSkge1xyXG4gICAgICB1bmluc3RhbGxMYXllcnNJbk9iamVjdChlYS5wcm90b3R5cGUpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWxsTGF5ZXJzKG9wdE9iamVjdCA9IEdsb2JhbCkge1xyXG4gIC8vIGRvZXMgbm90IHJlYWxseSByZXR1cm4gYWxsIGxheWVycy4uLiBsYXllcnMgaW4gbmFtZXBzYWNlcyBhcmUgbm90IGZvdW5kIVxyXG4gIC8vIHRoZXJlZm9yZSB5b3UgY2FuIHF1ZXJ5IGFsbCBsYXllcnMgaW4gYW4gb3B0T2JqZWN0XHJcbiAgcmV0dXJuIE9iamVjdC52YWx1ZXMob3B0T2JqZWN0KS5zZWxlY3QoXHJcbiAgICBmdW5jdGlvbihlYSkge1xyXG4gICAgICByZXR1cm4gZWEgaW5zdGFuY2VvZiBMYXllcjtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyogXHJcbiAqIFBVQkxJQyBDT1AgTGF5ZXIgRGVmaW5pdGlvblxyXG4gKi9cclxuXHJcbnZhciBnbG9iYWxDb250ZXh0Rm9yTmFtZWRMYXllcnMgPSB7fTtcclxuXHJcbmV4cG9ydCB7IGdsb2JhbENvbnRleHRGb3JOYW1lZExheWVycyBhcyBHbG9iYWxOYW1lZExheWVycyB9O1xyXG5cclxuLy8gR2xvYWJsIExheWVyIEFjdGl2YXRpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUxheWVyKGxheWVyKSB7XHJcbiAgaWYgKEdsb2JhbExheWVycy5pbmRleE9mKGxheWVyKSAhPT0gLTEpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgR2xvYmFsTGF5ZXJzLnB1c2gobGF5ZXIpO1xyXG4gIGludmFsaWRhdGVMYXllckNvbXBvc2l0aW9uKCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZUxheWVyKGxheWVyKSB7XHJcbiAgdmFyIGlkeCA9IEdsb2JhbExheWVycy5pbmRleE9mKGxheWVyKTtcclxuICBpZiAoaWR4IDwgMCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBHbG9iYWxMYXllcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgaW52YWxpZGF0ZUxheWVyQ29tcG9zaXRpb24oKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZWVkKC8qIGFyZ3VtZW50cyAqLykge1xyXG4gIC8vIENPUCBQcm9jZWVkIEZ1bmN0aW9uXHJcbiAgdmFyIGNvbXBvc2l0aW9uID0gcHJvY2VlZFN0YWNrW3Byb2NlZWRTdGFjay5sZW5ndGggLSAxXTtcclxuICBpZiAoIWNvbXBvc2l0aW9uKSB7XHJcbiAgICBjb25zb2xlLmxvZygnQ29udGV4dEpTOiBubyBjb21wb3NpdGlvbiB0byBwcm9jZWVkIChzdGFjayBpcyBlbXB0eSkgJyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIC8vIFRPRE8gdXNlIGluZGV4IGluc3RlYWQgb2Ygc2hpZml0aW5nP1xyXG4gIGlmIChjb21wb3NpdGlvbi5wYXJ0aWFsTWV0aG9kSW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBjb21wb3NpdGlvbi5wYXJ0aWFsTWV0aG9kSW5kZXggPSBjb21wb3NpdGlvbi5wYXJ0aWFsTWV0aG9kcy5sZW5ndGggLSAxO1xyXG4gIH0gIFxyXG4gIHZhciBpbmRleCA9IGNvbXBvc2l0aW9uLnBhcnRpYWxNZXRob2RJbmRleDtcclxuICB2YXIgcGFydGlhbE1ldGhvZCA9IGNvbXBvc2l0aW9uLnBhcnRpYWxNZXRob2RzW2luZGV4XTtcclxuICBpZiAoIXBhcnRpYWxNZXRob2QpIHtcclxuICAgIGlmICghcGFydGlhbE1ldGhvZCkge1xyXG4gICAgICB0aHJvdyBuZXcgQ09QRXJyb3IoJ25vIHBhcnRpYWxNZXRob2QgdG8gcHJvY2VlZCcpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb21wb3NpdGlvbi5wYXJ0aWFsTWV0aG9kSW5kZXggPSBpbmRleCAtIDE7XHJcbiAgICAgIGlmICghQ29uZmlnLmlnbm9yZURlcHJlY2F0ZWRQcm9jZWVkXHJcbiAgICAgICAgICAmJiBwYXJ0aWFsTWV0aG9kLnRvU3RyaW5nKCkubWF0Y2goL15bXFx0IF0qZnVuY3Rpb24gP1xcKFxcJD9wcm9jZWVkLykpIHtcclxuICAgICAgICB2YXIgYXJncyA9ICRBKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgYXJncy51bnNoaWZ0KHByb2NlZWQpO1xyXG4gICAgICAgIHZhciBtc2cgPSBcInByb2NlZWQgaW4gYXJndW1lbnRzIGxpc3QgaW4gXCIgKyBjb21wb3NpdGlvbi5mdW5jdGlvbk5hbWUoKTtcclxuICAgICAgICBpZiAoQ29uZmlnLnRocm93RXJyb3JPbkRlcHJlY2F0ZWQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkRFUFJFQ0FURUQgRVJST1I6IFwiICsgbXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKENvbmZpZy5sb2dEZXByZWNhdGVkKSB7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNvdXJjZTogXCIgKyBwYXJ0aWFsTWV0aG9kLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJERVBSRUNBVEVEIFdBUk5JTkc6IFwiICsgbXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHBhcnRpYWxNZXRob2QuYXBwbHkoY29tcG9zaXRpb24ub2JqZWN0LCBhcmdzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gcGFydGlhbE1ldGhvZC5hcHBseShjb21wb3NpdGlvbi5vYmplY3QsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGNvbXBvc2l0aW9uLnBhcnRpYWxNZXRob2RJbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn07XHJcblxyXG4vKiBcclxuICogTGF5ZXIgQ2xhc3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMYXllciB7XHJcbiAgY29uc3RydWN0b3IgKG5hbWUsIGNvbnRleHQpIHtcclxuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAvLyB0aGlzLl9sYXllcmVkRnVuY3Rpb25zTGlzdCA9IHt9O1xyXG4gIH1cclxuICBcclxuICAvLyBBY2Nlc3NpbmdcclxuICBnZXQgbmFtZSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICB9XHJcbiAgZnVsbE5hbWUgKCkge1xyXG4gICAgcmV0dXJuICcnICsgdGhpcy5fY29udGV4dCArICcuJyArIHRoaXMuX25hbWU7XHJcbiAgfVxyXG4gIGxheWVyZWRPYmplY3RzICgpIHtcclxuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKVxyXG4gICAgICAubWFwKGVhID0+IHRoaXNbZWFdICYmIHRoaXNbZWFdLl9sYXllcmVkX29iamVjdClcclxuICAgICAgLmZpbHRlcihlYSA9PiBlYSk7IC8vIGZpbHRlcnMgZmFsc3kgdGhpbmdzXHJcbiAgfVxyXG4gIC8vIFRPRE86IGRvZXNuJ3QgZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIGZ1bmN0aW9ucyBhbmQgY2xhc3NlcyAtIG5lY2Vzc2FyeT9cclxuICBsYXllcmVkQ2xhc3NlcyAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcmVkT2JqZWN0cygpLm1hcChlYSA9PiBlYS5jb25zdHJ1Y3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8vIFJlbW92aW5nXHJcbiAgcmVtb3ZlICgpIHtcclxuICAgIC8vIERlbGV0ZXMgdGhlIExheWVyQ2xhc3MsIGJ1dCBrZWVwcyB0aGUgbGF5ZXJlZCBGdW5jdGlvbnMuXHJcbiAgICBpZiAodGhpcy5pc0dsb2JhbCgpKSB7XHJcbiAgICAgIHRoaXMuYmVOb3RHbG9iYWwoKTtcclxuICAgIH1cclxuICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY29udGV4dDtcclxuICAgIGlmICh0eXBlb2YgY29udGV4dCAhPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIGRlbGV0ZSBjb250ZXh0W3RoaXMubmFtZV07XHJcbiAgfVxyXG4gIHVuaW5zdGFsbCAoKSB7XHJcbiAgICAvLyBVbmluc3RhbGxzIGp1c3QgdGhpcyBMYXllci5cclxuICAgIC8vIGZ1bmN0aW9ucyB0aGF0IGFyZSBsYXllcmVkIGJ5IG90aGVyIExheWVycyB3aWxsIG5vdCBiZSByZXNldC5cclxuICAgIHZhciBsYXllciA9IHRoaXM7XHJcbiAgICB0aGlzLmxheWVyZWRPYmplY3RzKCkuZm9yRWFjaChcclxuICAgICAgZnVuY3Rpb24oZWFjaExheWVyZWRPYmopIHtcclxuICAgICAgICAvLyB2YXIgbGF5ZXJJZHggPSB0eXBlb2YgZWFjaExheWVyZWRPYmouYWN0aXZlTGF5ZXJzID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgLy8gICAgID8gZWFjaExheWVyZWRPYmouYWN0aXZlTGF5ZXJzKCkuaW5kZXhPZihsYXllcikgOiAtMTtcclxuICAgICAgICBcclxuICAgICAgICAvLyAjU3BlY2lhbCBMaXZlbHkgV2Vid2Vya3N0YXR0IGNvZGUuLi4uIEdlbmVyYWwgQ2FzZT8gI0plbnNcclxuICAgICAgICAvLyAjVE9ETyBpZiB3ZSBoYXZlIG9mIGdsb2FiYWwgbGlzdCBvZiBhbGwgbGF5ZXJzLi4uIHdlIGNhbiBsb29rIHRoZXJlXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUHJvcGVydGllcy5vd24obGF5ZXIuX2xheWVyZWRGdW5jdGlvbnNMaXN0W2VhY2hMYXllcmVkT2JqXSkuZWFjaChcclxuICAgICAgICAvLyAgIGZ1bmN0aW9uKGVhY2hMYXllcmVkRnVuYykge1xyXG4gICAgICAgIC8vICAgICB2YXIgbmV3ZXJMYXllciA9IGVhY2hMYXllcmVkT2JqLmFjdGl2ZUxheWVycygpLmZpbmQoXHJcbiAgICAgICAgLy8gICAgICAgZnVuY3Rpb24oZWFjaE90aGVyTGF5ZXIpIHtcclxuICAgICAgICAvLyAgICAgICAgIHZhciBlYWNoT3RoZXJMYXllcklkeFxyXG4gICAgICAgIC8vICAgICAgICAgICAgID0gZWFjaExheWVyZWRPYmouYWN0aXZlTGF5ZXJzKCkuaW5kZXhPZihlYWNoT3RoZXJMYXllcik7XHJcbiAgICAgICAgLy8gICAgICAgICB2YXIgaXNOZXdlciA9IChlYWNoT3RoZXJMYXllcklkeCAhPT0gLTEpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgJiYgKGVhY2hPdGhlckxheWVySWR4IDwgbGF5ZXJJZHgpO1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIGlzTmV3ZXIgJiZcclxuICAgICAgICAvLyAgICAgICAgICAgICBlYWNoT3RoZXJMYXllci5fbGF5ZXJlZEZ1bmN0aW9uc0xpc3RbZWFjaExheWVyZWRPYmpdW2VhY2hMYXllcmVkRnVuY107XHJcbiAgICAgICAgLy8gICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgaWYgKCFuZXdlckxheWVyKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBtYWtlRnVuY3Rpb25MYXllclVuYXdhcmUoZWFjaExheWVyZWRPYmosIGVhY2hMYXllcmVkRnVuYyk7XHJcbiAgICAgICAgLy8gICAgICAgfVxyXG4gICAgICAgIC8vICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gIH1cclxuICBcclxuICAvLyBMYXllciBpbnN0YWxsYXRpb25cclxuICByZWZpbmVDbGFzcyAoY2xhc3NPYmplY3QsIG1ldGhvZHMpIHtcclxuICAgIGlmICghY2xhc3NPYmplY3QgfHwgIWNsYXNzT2JqZWN0LnByb3RvdHlwZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb250ZXh0SlM6IGNhbiBub3QgcmVmaW5lIGNsYXNzICdcIiArIGNsYXNzT2JqZWN0ICsgXCInIGluIFwiICsgbGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZWZpbmVPYmplY3QoY2xhc3NPYmplY3QucHJvdG90eXBlLCBtZXRob2RzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gTGF5ZXJpbmcgb2JqZWN0cyBtYXkgYmUgYSBnYXJiYWdlIGNvbGxlY3Rpb24gcHJvYmxlbSwgYmVjYXVzZSB0aGUgbGF5ZXJzIGtlZXAgc3Ryb25nXHJcbiAgLy8gcmVmZXJlbmNlIHRvIHRoZSBvYmplY3RzXHJcbiAgcmVmaW5lT2JqZWN0IChvYmplY3QsIG1ldGhvZHMpIHtcclxuICAgIC8vIGxvZyhcImNvcCByZWZpbmVPYmplY3RcIik7XHJcblxyXG4gICAgLy8gQm9va2tlZXBpbmc6XHJcbiAgICAvLyB0eXBlb2Ygb2JqZWN0LmdldE5hbWUgPT09ICdmdW5jdGlvbicgJiYgKGxheWVyLl9sYXllcmVkRnVuY3Rpb25zTGlzdFtvYmplY3RdID0ge30pO1xyXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobWV0aG9kcykuZm9yRWFjaChmdW5jdGlvbl9uYW1lID0+IHtcclxuICAgICAgLy8gbG9nKFwiIGxheWVyIHByb3BlcnR5OiBcIiArIGZ1bmN0aW9uX25hbWUpXHJcbiAgICAgIGxheWVyUHJvcGVydHkodGhpcywgb2JqZWN0LCBmdW5jdGlvbl9uYW1lLCBtZXRob2RzKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHVucmVmaW5lT2JqZWN0IChvYmopIHtcclxuICAgIHZhciBpZCA9IG9ialtMYXllck9iamVjdElEXTtcclxuICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzW2lkXTtcclxuICAgIH1cclxuICB9XHJcbiAgdW5yZWZpbmVDbGFzcyAoY2xhc3NPYmopIHtcclxuICAgIHRoaXMudW5yZWZpbmVPYmplY3QoY2xhc3NPYmoucHJvdG90eXBlKTtcclxuICB9XHJcblxyXG4gIHJlaW5zdGFsbEluQ2xhc3MgKGNvbnN0cnVjdG9yKSB7XHJcbiAgICB0aGlzLnJlaW5zdGFsbEluT2JqZWN0KGNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XHJcbiAgfVxyXG5cclxuICByZWluc3RhbGxJbk9iamVjdCAob2JqZWN0KSB7XHJcbiAgICBjb25zdCBwYXJ0aWFsTGF5ZXIgPSBlbnN1cmVQYXJ0aWFsTGF5ZXIodGhpcywgb2JqZWN0KTtcclxuICAgIHBhcnRpYWxMYXllci5yZWluc3RhbGwoKTtcclxuICB9XHJcbiAgXHJcbiAgLy8gTGF5ZXIgYWN0aXZhdGlvblxyXG4gIGJlR2xvYmFsICgpIHtcclxuICAgIGVuYWJsZUxheWVyKHRoaXMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIGJlTm90R2xvYmFsICgpIHtcclxuICAgIGRpc2FibGVMYXllcih0aGlzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICBoaWRlICgpIHtcclxuICAgIC8vIEhpZGRlbiBMYXllcnMgZG8gbm90IGFwcGVhciB3aGVuIGV2YWx1YXRpbmcgdGhlIHNvdXJjZWNvZGUgb2YgYSBmdW5jdGlvblxyXG4gICAgLy8gVE9ETzogdGhpcyBmdW5jdGlvbiBoYXMgdG8gYmUgY2FsbGVkIEJFRk9SRSB0aGUgbGF5ZXIgcmVmaW5lcyBhbnkgY2xhc3MsXHJcbiAgICAvLyBkdWUgdG8gcHJvYmxlbXMgaW4gdW5yZWZpbmluZyBjbGFzc2VzLlxyXG4gICAgdGhpcy5pc0hpZGRlbiA9IHRydWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgXHJcbiAgLy8gVGVzdGluZ1xyXG4gIGlzTGF5ZXIoKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgaXNHbG9iYWwgKCkge1xyXG4gICAgcmV0dXJuIEdsb2JhbExheWVycy5pbmRleE9mKHRoaXMpICE9PSAtMTtcclxuICB9XHJcbiAgXHJcbiAgLy8gRGVidWdnaW5nXHJcbiAgdG9TdHJpbmcgKCkge1xyXG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLm5hbWUpOyAvLyBjb3VsZCBiZSBhIHN5bWJvbFxyXG4gIH1cclxuICBcclxuICAvLyBEZXByZWNhdGVkIHNlcmlhbGl6YXRpb25cclxuICB0b0xpdGVyYWwgKCkge1xyXG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiTGF5ZXI6IENhbiBub3Qgc2VyaWFsaXplIHdpdGhvdXQgYSBuYW1lIVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiB7IG5hbWU6IHRoaXMubmFtZSB9O1xyXG4gIH1cclxuICBcclxuICAvLyBEZXNlcmlhbGl6YXRpb25cclxuICBmcm9tTGl0ZXJhbCAobGl0ZXJhbCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJEZXNlcmlhbGl6aW5nIExheWVyIGFjdGl2YXRpb24gZnJvbTogXCIgKyBsaXRlcmFsLm5hbWUpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZShsaXRlcmFsLm5hbWUsIGZhbHNlKTtcclxuICB9XHJcbn1cclxuXHJcbi8qXHJcbiAqIEV4YW1wbGUgaW1wbGVtZW50YXRpb24gb2YgYSBsYXllcmFibGUgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTGF5ZXJhYmxlT2JqZWN0VHJhaXQge1xyXG4gIGFjdGl2ZUxheWVycyAoKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0ge3dpdGhMYXllcnM6IFtdLCB3aXRob3V0TGF5ZXJzOiBbXX07XHJcbiAgICB0aGlzLmR5bmFtaWNMYXllcnMocmVzdWx0KTtcclxuICAgIHRoaXMuc3RydWN0dXJhbExheWVycyhyZXN1bHQpO1xyXG4gICAgdGhpcy5nbG9iYWxMYXllcnMocmVzdWx0KTtcclxuICAgIHJldHVybiByZXN1bHQud2l0aExheWVycztcclxuICB9XHJcbiAgY29sbGVjdFdpdGhMYXllcnNJbiAobGF5ZXJzLCByZXN1bHQpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBlYSA9IGxheWVyc1tpXVxyXG4gICAgICBpZiAoKHJlc3VsdC53aXRoTGF5ZXJzLmluZGV4T2YoZWEpID09PSAtMSlcclxuICAgICAgICAgICYmIChyZXN1bHQud2l0aG91dExheWVycy5pbmRleE9mKGVhKSA9PT0gLTEpKSB7XHJcbiAgICAgICAgcmVzdWx0LndpdGhMYXllcnMudW5zaGlmdChlYSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBjb2xsZWN0V2l0aG91dExheWVyc0luIChsYXllcnMsIHJlc3VsdCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGVhID0gbGF5ZXJzW2ldXHJcbiAgICAgIGlmIChyZXN1bHQud2l0aG91dExheWVycy5pbmRleE9mKGVhKSA9PT0gLTEpIHtcclxuICAgICAgICByZXN1bHQud2l0aG91dExheWVycy5wdXNoKGVhKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGR5bmFtaWNMYXllcnMgKHJlc3VsdCkge1xyXG4gICAgLy8gb3B0aW1pemVkIHZlcnNpb24sIHRoYXQgZG9lcyBub3QgdXNlIGNsb3N1cmVzIGFuZCByZWN1cnNpb25cclxuICAgIHZhciBzdGFjayA9IExheWVyU3RhY2s7XHJcbiAgICAvLyB0b3AgZG93biwgaWdub3JlIGJvdHRvbSBlbGVtZW50XHJcbiAgICBmb3IgKHZhciBqID0gc3RhY2subGVuZ3RoIC0gMTsgaiA+IDA7IGotLSkge1xyXG4gICAgICB2YXIgY3VycmVudCA9IHN0YWNrW2pdO1xyXG4gICAgICBpZiAoY3VycmVudC53aXRoTGF5ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsZWN0V2l0aExheWVyc0luKGN1cnJlbnQud2l0aExheWVycywgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY3VycmVudC53aXRob3V0TGF5ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsZWN0V2l0aG91dExheWVyc0luKGN1cnJlbnQud2l0aG91dExheWVycywgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgc3RydWN0dXJhbExheWVycyAocmVzdWx0KSB7XHJcbiAgICB2YXIgYWxsTGF5ZXJzID0gcmVzdWx0LndpdGhMYXllcnM7XHJcbiAgICB2YXIgYWxsV2l0aG91dExheWVycyA9IHJlc3VsdC53aXRob3V0TGF5ZXJzO1xyXG4gICAgdmFyIG9iaiA9IHRoaXM7XHJcbiAgICAvLyBnbyBvd25lcmNoYWluIGJhY2t3YXJkIGFuZCBnYXRoZXIgYWxsIGxheWVyIGFjdGl2YXRpb25zIGFuZCBkZWFjdGl2YXRpb25zXHJcbiAgICB3aGlsZSAob2JqKSB7XHJcbiAgICAgIC8vIGRvbid0IHVzZSBhY2Nlc3NvciBtZXRob2RzIGJlY2F1c2Ugb2Ygc3BlZWQuLi4gKG5vdCBtZWFzdXJlZCB5ZXQpXHJcbiAgICAgIGlmIChvYmoud2l0aExheWVycykge1xyXG4gICAgICAgICAgdGhpcy5jb2xsZWN0V2l0aExheWVyc0luKG9iai53aXRoTGF5ZXJzLCByZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvYmoud2l0aG91dExheWVycykge1xyXG4gICAgICAgICAgdGhpcy5jb2xsZWN0V2l0aG91dExheWVyc0luKG9iai53aXRob3V0TGF5ZXJzLCByZXN1bHQpO1xyXG4gICAgICB9ICAgICAgXHJcbiAgICAgIC8vIHJlY3Vyc2UsIHN0b3AgaWYgb3duZXIgaXMgdW5kZWZpbmVkXHJcbiAgICAgIG9iaiA9IG9iai5vd25lcjtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIGdsb2JhbExheWVycyAocmVzdWx0KSB7XHJcbiAgICB0aGlzLmNvbGxlY3RXaXRoTGF5ZXJzSW4oR2xvYmFsTGF5ZXJzLCByZXN1bHQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgc2V0V2l0aExheWVycyAobGF5ZXJzKSB7XHJcbiAgICB0aGlzLndpdGhMYXllcnMgPSBsYXllcnM7XHJcbiAgfVxyXG4gIGFkZFdpdGhMYXllciAobGF5ZXIpIHtcclxuICAgIHZhciBsYXllcnMgPSB0aGlzLmdldFdpdGhMYXllcnMoKTtcclxuICAgIGlmICghbGF5ZXJzLmluY2x1ZGVzKGxheWVyKSkge1xyXG4gICAgICB0aGlzLnNldFdpdGhMYXllcnMobGF5ZXJzLmNvbmNhdChbbGF5ZXJdKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbW92ZVdpdGhMYXllciAobGF5ZXIpIHtcclxuICAgIHZhciBsYXllcnMgPSB0aGlzLmdldFdpdGhMYXllcnMoKTtcclxuICAgIGlmIChsYXllcnMuaW5jbHVkZXMobGF5ZXIpKSB7XHJcbiAgICAgIHRoaXMuc2V0V2l0aExheWVycyhsYXllcnMuZmlsdGVyKGwgPT4gbCAhPT0gbGF5ZXIpKTtcclxuICAgIH1cclxuICB9XHJcbiAgYWRkV2l0aG91dExheWVyIChsYXllcikge1xyXG4gICAgdmFyIGxheWVycyA9IHRoaXMuZ2V0V2l0aG91dExheWVycygpO1xyXG4gICAgaWYgKCFsYXllcnMuaW5jbHVkZShsYXllcikpIHtcclxuICAgICAgdGhpcy5zZXRXaXRob3V0TGF5ZXJzKGxheWVycy5jb25jYXQoW2xheWVyXSkpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZW1vdmVXaXRob3V0TGF5ZXIgKGxheWVyKSB7XHJcbiAgICB2YXIgbGF5ZXJzID0gdGhpcy5nZXRXaXRob3V0TGF5ZXJzKCk7XHJcbiAgICB0aGlzLnNldFdpdGhvdXRMYXllcnMobGF5ZXJzLmZpbHRlcihsID0+IGwgIT09IGxheWVyKSk7XHJcbiAgfVxyXG4gIHNldFdpdGhvdXRMYXllcnMgKGxheWVycykge1xyXG4gICAgdGhpcy53aXRob3V0TGF5ZXJzID0gbGF5ZXJzO1xyXG4gIH1cclxuICBnZXRXaXRoTGF5ZXJzIChsYXllcnMpIHtcclxuICAgIHJldHVybiB0aGlzLndpdGhMYXllcnMgfHwgW107XHJcbiAgfVxyXG4gIGdldFdpdGhvdXRMYXllciAobGF5ZXJzKSB7XHJcbiAgICByZXR1cm4gdGhpcy53aXRob3V0TGF5ZXJzIHx8IFtdO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExheWVyYWJsZU9iamVjdCBleHRlbmRzIExheWVyYWJsZU9iamVjdFRyYWl0IHt9XHJcblxyXG5leHBvcnQgY2xhc3MgQ09QRXJyb3Ige1xyXG4gIGNvbnN0cnVjdG9yIChtZXNzYWdlKSB7XHJcbiAgICB0aGlzLl9tc2cgPSBtc2c7XHJcbiAgfVxyXG4gIHRvU3RyaW5nICgpIHtcclxuICAgIHJldHVybiBcIkNPUCBFUlJPUjogXCIgKyB0aGlzLl9tc2c7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFydGlhbExheWVyQ29tcG9zaXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yIChvYmosIHByb3RvdHlwZU9iamVjdCwgZnVuY3Rpb25OYW1lLCBiYXNlRnVuY3Rpb24sIG1ldGhvZFR5cGUpIHtcclxuICAgIHRoaXMuX3BhcnRpYWxNZXRob2RzID0gW2Jhc2VGdW5jdGlvbl07XHJcbiAgICB2YXIgbGF5ZXJzID0gY29tcHV0ZUxheWVyc0ZvcihvYmopO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgbGF5ZXIgPSBsYXllcnNbaV07XHJcbiAgICAgICAgdmFyIHBhcnRpYWxNZXRob2QgPSBsb29rdXBMYXllcmVkRnVuY3Rpb25Gb3JPYmplY3QoXHJcbiAgICAgICAgICAgIG9iaiwgbGF5ZXIsIGZ1bmN0aW9uTmFtZSwgbWV0aG9kVHlwZSk7XHJcbiAgICAgICAgaWYgKHBhcnRpYWxNZXRob2QpIHtcclxuICAgICAgICAgIHRoaXMuX3BhcnRpYWxNZXRob2RzLnB1c2gocGFydGlhbE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fb2JqZWN0ID0gb2JqO1xyXG4gICAgdGhpcy5fcHJvdG90eXBlT2JqZWN0ID0gcHJvdG90eXBlT2JqZWN0O1xyXG4gICAgdGhpcy5fZnVuY3Rpb25OYW1lID0gZnVuY3Rpb25OYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9iamVjdCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9vYmplY3Q7XHJcbiAgfVxyXG4gIFxyXG4gIGdldCBwYXJ0aWFsTWV0aG9kcyAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFydGlhbE1ldGhvZHM7XHJcbiAgfVxyXG4gIFxyXG4gIGdldCBmdW5jdGlvbk5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZnVuY3Rpb25OYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHByb3RvdHlwZU9iamVjdCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm90b3R5cGVPYmplY3Q7XHJcbiAgfVxyXG59XHJcblxyXG5yZXNldExheWVyU3RhY2soKTtcclxuXHJcbi8vIHZpbTogc3c9MlxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb3B2Mi9MYXllcnMuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzXG4gKiogbW9kdWxlIGlkID0gOTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qc1xuICoqIG1vZHVsZSBpZCA9IDkxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDkyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gOTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9jcmVhdGVcIik7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qc1xuICoqIG1vZHVsZSBpZCA9IDk0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA5NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA5NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0fSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gOTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzXG4gKiogbW9kdWxlIGlkID0gOThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA5OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jylcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyl9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3ZhbHVlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnZhbHVlcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3ZhbHVlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JqZWN0LXZhbHVlcy1lbnRyaWVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHZhbHVlcyA9IHJlcXVpcmUoJy4vX29iamVjdC10by1hcnJheScpKGZhbHNlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKGl0KXtcbiAgICByZXR1cm4gJHZhbHVlcyhpdCk7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGlzRW51bSAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc0VudHJpZXMpe1xuICByZXR1cm4gZnVuY3Rpb24oaXQpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoaXQpXG4gICAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBbXVxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChPLCBrZXkgPSBrZXlzW2krK10pKXtcbiAgICAgIHJlc3VsdC5wdXNoKGlzRW50cmllcyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC10by1hcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gMTA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDEwN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDEwOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LW5hbWVzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgcmV0dXJuICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhpdCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qc1xuICoqIG1vZHVsZSBpZCA9IDExMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0T3duUHJvcGVydHlOYW1lcycsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKS5mO1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMTEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgcmV0dXJuICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDExNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxudmFyIHRvSU9iamVjdCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG9JT2JqZWN0KGl0KSwga2V5KTtcbiAgfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMTE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9