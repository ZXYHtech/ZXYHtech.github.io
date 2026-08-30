const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/secp256k1-Uifd-ko3.js","assets/index-tWfloERs.js","assets/index-9VQBiT8i.css","assets/events-DQlC5oWO.js","assets/index-C8FGXYRu.js","assets/core-CqoQ9szM.js"])))=>i.map(i=>d[i]);
import { aS as getAugmentedNamespace, aU as __vitePreload, a4 as getDefaultExportFromCjs, bK as commonjsGlobal } from "./index-tWfloERs.js";
import { e as eventsExports, N as Nt$3 } from "./events-DQlC5oWO.js";
import { c as createStore, g as get, s as set$1, d as del, k as keys, a as clear } from "./index-C8FGXYRu.js";
var __spreadArray = function(to2, from2, pack) {
  if (pack || arguments.length === 2) for (var i3 = 0, l2 = from2.length, ar2; i3 < l2; i3++) {
    if (ar2 || !(i3 in from2)) {
      if (!ar2) ar2 = Array.prototype.slice.call(from2, 0, i3);
      ar2[i3] = from2[i3];
    }
  }
  return to2.concat(ar2 || Array.prototype.slice.call(from2));
};
var BrowserInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function BrowserInfo2(name, version2, os2) {
      this.name = name;
      this.version = version2;
      this.os = os2;
      this.type = "browser";
    }
    return BrowserInfo2;
  }()
);
var NodeInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function NodeInfo2(version2) {
      this.version = version2;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo2;
  }()
);
var SearchBotDeviceInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function SearchBotDeviceInfo2(name, version2, os2, bot) {
      this.name = name;
      this.version = version2;
      this.os = os2;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo2;
  }()
);
var BotInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo2;
  }()
);
var ReactNativeInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo2;
  }()
);
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
function matchUserAgent(ua2) {
  return ua2 !== "" && userAgentRules.reduce(function(matched, _a) {
    var browser2 = _a[0], regex = _a[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua2);
    return !!uaMatch && [browser2, uaMatch];
  }, false);
}
function parseUserAgent(ua2) {
  var matchedRule = matchUserAgent(ua2);
  if (!matchedRule) {
    return null;
  }
  var name = matchedRule[0], match = matchedRule[1];
  if (name === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version2 = versionParts.join(".");
  var os2 = detectOS(ua2);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua2);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name, version2, os2, searchBotMatch[1]);
  }
  return new BrowserInfo(name, version2, os2);
}
function detectOS(ua2) {
  for (var ii2 = 0, count = operatingSystemRules.length; ii2 < count; ii2++) {
    var _a = operatingSystemRules[ii2], os2 = _a[0], regex = _a[1];
    var match = regex.exec(ua2);
    if (match) {
      return os2;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode = typeof process !== "undefined" && process.version;
  return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii2 = 0; ii2 < count; ii2++) {
    output.push("0");
  }
  return output;
}
var cjs$3 = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics$1 = function(d4, b2) {
  extendStatics$1 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d5, b3) {
    d5.__proto__ = b3;
  } || function(d5, b3) {
    for (var p2 in b3) if (b3.hasOwnProperty(p2)) d5[p2] = b3[p2];
  };
  return extendStatics$1(d4, b2);
};
function __extends$1(d4, b2) {
  extendStatics$1(d4, b2);
  function __() {
    this.constructor = d4;
  }
  d4.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
var __assign$1 = function() {
  __assign$1 = Object.assign || function __assign2(t) {
    for (var s2, i3 = 1, n3 = arguments.length; i3 < n3; i3++) {
      s2 = arguments[i3];
      for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t[p2] = s2[p2];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
function __rest$1(s2, e2) {
  var t = {};
  for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
    t[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i3 = 0, p2 = Object.getOwnPropertySymbols(s2); i3 < p2.length; i3++) {
      if (e2.indexOf(p2[i3]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i3]))
        t[p2[i3]] = s2[p2[i3]];
    }
  return t;
}
function __decorate$1(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i3 = decorators.length - 1; i3 >= 0; i3--) if (d4 = decorators[i3]) r2 = (c2 < 3 ? d4(r2) : c2 > 3 ? d4(target, key, r2) : d4(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
}
function __param$1(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata$1(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter$1(thisArg, _arguments, P3, generator) {
  function adopt(value) {
    return value instanceof P3 ? value : new P3(function(resolve) {
      resolve(value);
    });
  }
  return new (P3 || (P3 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator$1(thisArg, body) {
  var _3 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f5, y3, t, g2;
  return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n3) {
    return function(v2) {
      return step([n3, v2]);
    };
  }
  function step(op) {
    if (f5) throw new TypeError("Generator is already executing.");
    while (_3) try {
      if (f5 = 1, y3 && (t = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t = y3["return"]) && t.call(y3), 0) : y3.next) && !(t = t.call(y3, op[1])).done) return t;
      if (y3 = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _3.label++;
          return { value: op[1], done: false };
        case 5:
          _3.label++;
          y3 = op[1];
          op = [0];
          continue;
        case 7:
          op = _3.ops.pop();
          _3.trys.pop();
          continue;
        default:
          if (!(t = _3.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _3 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _3.label = op[1];
            break;
          }
          if (op[0] === 6 && _3.label < t[1]) {
            _3.label = t[1];
            t = op;
            break;
          }
          if (t && _3.label < t[2]) {
            _3.label = t[2];
            _3.ops.push(op);
            break;
          }
          if (t[2]) _3.ops.pop();
          _3.trys.pop();
          continue;
      }
      op = body.call(thisArg, _3);
    } catch (e2) {
      op = [6, e2];
      y3 = 0;
    } finally {
      f5 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding$1(o3, m3, k2, k22) {
  if (k22 === void 0) k22 = k2;
  o3[k22] = m3[k2];
}
function __exportStar$1(m3, exports) {
  for (var p2 in m3) if (p2 !== "default" && !exports.hasOwnProperty(p2)) exports[p2] = m3[p2];
}
function __values$1(o3) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m3 = s2 && o3[s2], i3 = 0;
  if (m3) return m3.call(o3);
  if (o3 && typeof o3.length === "number") return {
    next: function() {
      if (o3 && i3 >= o3.length) o3 = void 0;
      return { value: o3 && o3[i3++], done: !o3 };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read$1(o3, n3) {
  var m3 = typeof Symbol === "function" && o3[Symbol.iterator];
  if (!m3) return o3;
  var i3 = m3.call(o3), r2, ar2 = [], e2;
  try {
    while ((n3 === void 0 || n3-- > 0) && !(r2 = i3.next()).done) ar2.push(r2.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m3 = i3["return"])) m3.call(i3);
    } finally {
      if (e2) throw e2.error;
    }
  }
  return ar2;
}
function __spread$1() {
  for (var ar2 = [], i3 = 0; i3 < arguments.length; i3++)
    ar2 = ar2.concat(__read$1(arguments[i3]));
  return ar2;
}
function __spreadArrays$1() {
  for (var s2 = 0, i3 = 0, il = arguments.length; i3 < il; i3++) s2 += arguments[i3].length;
  for (var r2 = Array(s2), k2 = 0, i3 = 0; i3 < il; i3++)
    for (var a2 = arguments[i3], j2 = 0, jl = a2.length; j2 < jl; j2++, k2++)
      r2[k2] = a2[j2];
  return r2;
}
function __await$1(v2) {
  return this instanceof __await$1 ? (this.v = v2, this) : new __await$1(v2);
}
function __asyncGenerator$1(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g2 = generator.apply(thisArg, _arguments || []), i3, q2 = [];
  return i3 = {}, verb("next"), verb("throw"), verb("return"), i3[Symbol.asyncIterator] = function() {
    return this;
  }, i3;
  function verb(n3) {
    if (g2[n3]) i3[n3] = function(v2) {
      return new Promise(function(a2, b2) {
        q2.push([n3, v2, a2, b2]) > 1 || resume(n3, v2);
      });
    };
  }
  function resume(n3, v2) {
    try {
      step(g2[n3](v2));
    } catch (e2) {
      settle(q2[0][3], e2);
    }
  }
  function step(r2) {
    r2.value instanceof __await$1 ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q2[0][2], r2);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f5, v2) {
    if (f5(v2), q2.shift(), q2.length) resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator$1(o3) {
  var i3, p2;
  return i3 = {}, verb("next"), verb("throw", function(e2) {
    throw e2;
  }), verb("return"), i3[Symbol.iterator] = function() {
    return this;
  }, i3;
  function verb(n3, f5) {
    i3[n3] = o3[n3] ? function(v2) {
      return (p2 = !p2) ? { value: __await$1(o3[n3](v2)), done: n3 === "return" } : f5 ? f5(v2) : v2;
    } : f5;
  }
}
function __asyncValues$1(o3) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m3 = o3[Symbol.asyncIterator], i3;
  return m3 ? m3.call(o3) : (o3 = typeof __values$1 === "function" ? __values$1(o3) : o3[Symbol.iterator](), i3 = {}, verb("next"), verb("throw"), verb("return"), i3[Symbol.asyncIterator] = function() {
    return this;
  }, i3);
  function verb(n3) {
    i3[n3] = o3[n3] && function(v2) {
      return new Promise(function(resolve, reject) {
        v2 = o3[n3](v2), settle(resolve, reject, v2.done, v2.value);
      });
    };
  }
  function settle(resolve, reject, d4, v2) {
    Promise.resolve(v2).then(function(v3) {
      resolve({ value: v3, done: d4 });
    }, reject);
  }
}
function __makeTemplateObject$1(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar$1(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k2 in mod) if (Object.hasOwnProperty.call(mod, k2)) result[k2] = mod[k2];
  }
  result.default = mod;
  return result;
}
function __importDefault$1(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet$1(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet$1(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
const tslib_es6$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get __assign() {
    return __assign$1;
  },
  __asyncDelegator: __asyncDelegator$1,
  __asyncGenerator: __asyncGenerator$1,
  __asyncValues: __asyncValues$1,
  __await: __await$1,
  __awaiter: __awaiter$1,
  __classPrivateFieldGet: __classPrivateFieldGet$1,
  __classPrivateFieldSet: __classPrivateFieldSet$1,
  __createBinding: __createBinding$1,
  __decorate: __decorate$1,
  __exportStar: __exportStar$1,
  __extends: __extends$1,
  __generator: __generator$1,
  __importDefault: __importDefault$1,
  __importStar: __importStar$1,
  __makeTemplateObject: __makeTemplateObject$1,
  __metadata: __metadata$1,
  __param: __param$1,
  __read: __read$1,
  __rest: __rest$1,
  __spread: __spread$1,
  __spreadArrays: __spreadArrays$1,
  __values: __values$1
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(tslib_es6$1);
var utils = {};
var delay = {};
var hasRequiredDelay;
function requireDelay() {
  if (hasRequiredDelay) return delay;
  hasRequiredDelay = 1;
  Object.defineProperty(delay, "__esModule", { value: true });
  delay.delay = void 0;
  function delay$1(timeout) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, timeout);
    });
  }
  delay.delay = delay$1;
  return delay;
}
var convert = {};
var constants = {};
var misc = {};
var hasRequiredMisc;
function requireMisc() {
  if (hasRequiredMisc) return misc;
  hasRequiredMisc = 1;
  Object.defineProperty(misc, "__esModule", { value: true });
  misc.ONE_THOUSAND = misc.ONE_HUNDRED = void 0;
  misc.ONE_HUNDRED = 100;
  misc.ONE_THOUSAND = 1e3;
  return misc;
}
var time = {};
var hasRequiredTime;
function requireTime() {
  if (hasRequiredTime) return time;
  hasRequiredTime = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
    exports.ONE_SECOND = 1;
    exports.FIVE_SECONDS = 5;
    exports.TEN_SECONDS = 10;
    exports.THIRTY_SECONDS = 30;
    exports.SIXTY_SECONDS = 60;
    exports.ONE_MINUTE = exports.SIXTY_SECONDS;
    exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
    exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
    exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
    exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
    exports.ONE_HOUR = exports.SIXTY_MINUTES;
    exports.THREE_HOURS = exports.ONE_HOUR * 3;
    exports.SIX_HOURS = exports.ONE_HOUR * 6;
    exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
    exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
    exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
    exports.THREE_DAYS = exports.ONE_DAY * 3;
    exports.FIVE_DAYS = exports.ONE_DAY * 5;
    exports.SEVEN_DAYS = exports.ONE_DAY * 7;
    exports.THIRTY_DAYS = exports.ONE_DAY * 30;
    exports.ONE_WEEK = exports.SEVEN_DAYS;
    exports.TWO_WEEKS = exports.ONE_WEEK * 2;
    exports.THREE_WEEKS = exports.ONE_WEEK * 3;
    exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
    exports.ONE_YEAR = exports.ONE_DAY * 365;
  })(time);
  return time;
}
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require$$0$1;
    tslib_1.__exportStar(requireMisc(), exports);
    tslib_1.__exportStar(requireTime(), exports);
  })(constants);
  return constants;
}
var hasRequiredConvert;
function requireConvert() {
  if (hasRequiredConvert) return convert;
  hasRequiredConvert = 1;
  Object.defineProperty(convert, "__esModule", { value: true });
  convert.fromMiliseconds = convert.toMiliseconds = void 0;
  const constants_1 = requireConstants();
  function toMiliseconds(seconds) {
    return seconds * constants_1.ONE_THOUSAND;
  }
  convert.toMiliseconds = toMiliseconds;
  function fromMiliseconds(miliseconds) {
    return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
  }
  convert.fromMiliseconds = fromMiliseconds;
  return convert;
}
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require$$0$1;
    tslib_1.__exportStar(requireDelay(), exports);
    tslib_1.__exportStar(requireConvert(), exports);
  })(utils);
  return utils;
}
var watch$2 = {};
var hasRequiredWatch$1;
function requireWatch$1() {
  if (hasRequiredWatch$1) return watch$2;
  hasRequiredWatch$1 = 1;
  Object.defineProperty(watch$2, "__esModule", { value: true });
  watch$2.Watch = void 0;
  class Watch {
    constructor() {
      this.timestamps = /* @__PURE__ */ new Map();
    }
    start(label) {
      if (this.timestamps.has(label)) {
        throw new Error(`Watch already started for label: ${label}`);
      }
      this.timestamps.set(label, { started: Date.now() });
    }
    stop(label) {
      const timestamp = this.get(label);
      if (typeof timestamp.elapsed !== "undefined") {
        throw new Error(`Watch already stopped for label: ${label}`);
      }
      const elapsed = Date.now() - timestamp.started;
      this.timestamps.set(label, { started: timestamp.started, elapsed });
    }
    get(label) {
      const timestamp = this.timestamps.get(label);
      if (typeof timestamp === "undefined") {
        throw new Error(`No timestamp found for label: ${label}`);
      }
      return timestamp;
    }
    elapsed(label) {
      const timestamp = this.get(label);
      const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
      return elapsed;
    }
  }
  watch$2.Watch = Watch;
  watch$2.default = Watch;
  return watch$2;
}
var types = {};
var watch$1 = {};
var hasRequiredWatch;
function requireWatch() {
  if (hasRequiredWatch) return watch$1;
  hasRequiredWatch = 1;
  Object.defineProperty(watch$1, "__esModule", { value: true });
  watch$1.IWatch = void 0;
  class IWatch {
  }
  watch$1.IWatch = IWatch;
  return watch$1;
}
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes) return types;
  hasRequiredTypes = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require$$0$1;
    tslib_1.__exportStar(requireWatch(), exports);
  })(types);
  return types;
}
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require$$0$1;
  tslib_1.__exportStar(requireUtils(), exports);
  tslib_1.__exportStar(requireWatch$1(), exports);
  tslib_1.__exportStar(requireTypes(), exports);
  tslib_1.__exportStar(requireConstants(), exports);
})(cjs$3);
var cjs$2 = {};
Object.defineProperty(cjs$2, "__esModule", { value: true });
cjs$2.getLocalStorage = cjs$2.getLocalStorageOrThrow = cjs$2.getCrypto = cjs$2.getCryptoOrThrow = getLocation_1 = cjs$2.getLocation = cjs$2.getLocationOrThrow = getNavigator_1 = cjs$2.getNavigator = cjs$2.getNavigatorOrThrow = getDocument_1 = cjs$2.getDocument = cjs$2.getDocumentOrThrow = cjs$2.getFromWindowOrThrow = cjs$2.getFromWindow = void 0;
function getFromWindow(name) {
  let res = void 0;
  if (typeof window !== "undefined" && typeof window[name] !== "undefined") {
    res = window[name];
  }
  return res;
}
cjs$2.getFromWindow = getFromWindow;
function getFromWindowOrThrow(name) {
  const res = getFromWindow(name);
  if (!res) {
    throw new Error(`${name} is not defined in Window`);
  }
  return res;
}
cjs$2.getFromWindowOrThrow = getFromWindowOrThrow;
function getDocumentOrThrow() {
  return getFromWindowOrThrow("document");
}
cjs$2.getDocumentOrThrow = getDocumentOrThrow;
function getDocument() {
  return getFromWindow("document");
}
var getDocument_1 = cjs$2.getDocument = getDocument;
function getNavigatorOrThrow() {
  return getFromWindowOrThrow("navigator");
}
cjs$2.getNavigatorOrThrow = getNavigatorOrThrow;
function getNavigator() {
  return getFromWindow("navigator");
}
var getNavigator_1 = cjs$2.getNavigator = getNavigator;
function getLocationOrThrow() {
  return getFromWindowOrThrow("location");
}
cjs$2.getLocationOrThrow = getLocationOrThrow;
function getLocation() {
  return getFromWindow("location");
}
var getLocation_1 = cjs$2.getLocation = getLocation;
function getCryptoOrThrow() {
  return getFromWindowOrThrow("crypto");
}
cjs$2.getCryptoOrThrow = getCryptoOrThrow;
function getCrypto() {
  return getFromWindow("crypto");
}
cjs$2.getCrypto = getCrypto;
function getLocalStorageOrThrow() {
  return getFromWindowOrThrow("localStorage");
}
cjs$2.getLocalStorageOrThrow = getLocalStorageOrThrow;
function getLocalStorage() {
  return getFromWindow("localStorage");
}
cjs$2.getLocalStorage = getLocalStorage;
var cjs$1 = {};
Object.defineProperty(cjs$1, "__esModule", { value: true });
var getWindowMetadata_1 = cjs$1.getWindowMetadata = void 0;
const window_getters_1 = cjs$2;
function getWindowMetadata() {
  let doc;
  let loc;
  try {
    doc = window_getters_1.getDocumentOrThrow();
    loc = window_getters_1.getLocationOrThrow();
  } catch (e2) {
    return null;
  }
  function getIcons() {
    const links = doc.getElementsByTagName("link");
    const icons2 = [];
    for (let i3 = 0; i3 < links.length; i3++) {
      const link = links[i3];
      const rel = link.getAttribute("rel");
      if (rel) {
        if (rel.toLowerCase().indexOf("icon") > -1) {
          const href = link.getAttribute("href");
          if (href) {
            if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
              let absoluteHref = loc.protocol + "//" + loc.host;
              if (href.indexOf("/") === 0) {
                absoluteHref += href;
              } else {
                const path = loc.pathname.split("/");
                path.pop();
                const finalPath = path.join("/");
                absoluteHref += finalPath + "/" + href;
              }
              icons2.push(absoluteHref);
            } else if (href.indexOf("//") === 0) {
              const absoluteUrl = loc.protocol + href;
              icons2.push(absoluteUrl);
            } else {
              icons2.push(href);
            }
          }
        }
      }
    }
    return icons2;
  }
  function getWindowMetadataOfAny(...args) {
    const metaTags = doc.getElementsByTagName("meta");
    for (let i3 = 0; i3 < metaTags.length; i3++) {
      const tag = metaTags[i3];
      const attributes = ["itemprop", "property", "name"].map((target) => tag.getAttribute(target)).filter((attr) => {
        if (attr) {
          return args.includes(attr);
        }
        return false;
      });
      if (attributes.length && attributes) {
        const content = tag.getAttribute("content");
        if (content) {
          return content;
        }
      }
    }
    return "";
  }
  function getName() {
    let name2 = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
    if (!name2) {
      name2 = doc.title;
    }
    return name2;
  }
  function getDescription() {
    const description2 = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
    return description2;
  }
  const name = getName();
  const description = getDescription();
  const url = loc.origin;
  const icons = getIcons();
  const meta = {
    description,
    url,
    icons,
    name
  };
  return meta;
}
getWindowMetadata_1 = cjs$1.getWindowMetadata = getWindowMetadata;
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
const version = "2.23.2";
let errorConfig = {
  getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
  version: `viem@${version}`
};
class BaseError extends Error {
  constructor(shortMessage, args = {}) {
    var _a;
    const details = (() => {
      var _a2;
      if (args.cause instanceof BaseError)
        return args.cause.details;
      if ((_a2 = args.cause) == null ? void 0 : _a2.message)
        return args.cause.message;
      return args.details;
    })();
    const docsPath = (() => {
      if (args.cause instanceof BaseError)
        return args.cause.docsPath || args.docsPath;
      return args.docsPath;
    })();
    const docsUrl = (_a = errorConfig.getDocsUrl) == null ? void 0 : _a.call(errorConfig, { ...args, docsPath });
    const message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsUrl ? [`Docs: ${docsUrl}`] : [],
      ...details ? [`Details: ${details}`] : [],
      ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
    ].join("\n");
    super(message, args.cause ? { cause: args.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metaMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.name = args.name ?? this.name;
    this.shortMessage = shortMessage;
    this.version = version;
  }
  walk(fn2) {
    return walk(this, fn2);
  }
}
function walk(err, fn2) {
  if (fn2 == null ? void 0 : fn2(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk(err.cause, fn2);
  return fn2 ? null : err;
}
class SizeExceedsPaddingSizeError extends BaseError {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size2}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
  }
}
function pad(hexOrBytes, { dir, size: size2 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size2 });
  return padBytes(hexOrBytes, { dir, size: size2 });
}
function padHex(hex_, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size2,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i3 = 0; i3 < size2; i3++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i3 : size2 - i3 - 1] = bytes[padEnd ? i3 : bytes.length - i3 - 1];
  }
  return paddedBytes;
}
class IntegerOutOfRangeError extends BaseError {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number "${value}" is not in safe ${size2 ? `${size2 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
  }
}
class SizeOverflowError extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
  }
}
function assertSize(hexOrBytes, { size: size$1 }) {
  if (size(hexOrBytes) > size$1)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size$1
    });
}
function hexToBigInt(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size)
    assertSize(hex, { size: opts.size });
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size2 = (hex.length - 2) / 2;
  const max = (1n << BigInt(size2) * 8n - 1n) - 1n;
  if (value <= max)
    return value;
  return value - BigInt(`0x${"f".padStart(size2 * 2, "f")}`) - 1n;
}
function hexToNumber(hex, opts = {}) {
  return Number(hexToBigInt(hex, opts));
}
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i3) => i3.toString(16).padStart(2, "0"));
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string2 = "";
  for (let i3 = 0; i3 < value.length; i3++) {
    string2 += hexes[value[i3]];
  }
  const hex = `0x${string2}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size2 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size2)
    return pad(hex, { size: size2 });
  return hex;
}
const encoder$1 = /* @__PURE__ */ new TextEncoder();
function stringToHex(value_, opts = {}) {
  const value = encoder$1.encode(value_);
  return bytesToHex(value, opts);
}
const encoder = /* @__PURE__ */ new TextEncoder();
function toBytes$1(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
}
const charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j2 = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j2++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j2++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j2 - 2]}${hexString[j2 - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}
function anumber(n3) {
  if (!Number.isSafeInteger(n3) || n3 < 0)
    throw new Error("positive integer expected, got " + n3);
}
function isBytes(a2) {
  return a2 instanceof Uint8Array || ArrayBuffer.isView(a2) && a2.constructor.name === "Uint8Array";
}
function abytes(b2, ...lengths) {
  if (!isBytes(b2))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b2.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b2.length);
}
function ahash(h4) {
  if (typeof h4 !== "function" || typeof h4.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  anumber(h4.outputLen);
  anumber(h4.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n3, le2 = false) {
  if (le2)
    return { h: Number(n3 & U32_MASK64), l: Number(n3 >> _32n & U32_MASK64) };
  return { h: Number(n3 >> _32n & U32_MASK64) | 0, l: Number(n3 & U32_MASK64) | 0 };
}
function split(lst, le2 = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i3 = 0; i3 < lst.length; i3++) {
    const { h: h4, l: l2 } = fromBig(lst[i3], le2);
    [Ah[i3], Al[i3]] = [h4, l2];
  }
  return [Ah, Al];
}
const rotlSH = (h4, l2, s2) => h4 << s2 | l2 >>> 32 - s2;
const rotlSL = (h4, l2, s2) => l2 << s2 | h4 >>> 32 - s2;
const rotlBH = (h4, l2, s2) => l2 << s2 - 32 | h4 >>> 64 - s2;
const rotlBL = (h4, l2, s2) => h4 << s2 - 32 | l2 >>> 64 - s2;
const crypto$2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
const isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i3 = 0; i3 < arr.length; i3++) {
    arr[i3] = byteSwap(arr[i3]);
  }
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("utf8ToBytes expected string, got " + typeof str);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i3 = 0; i3 < arrays.length; i3++) {
    const a2 = arrays[i3];
    abytes(a2);
    sum += a2.length;
  }
  const res = new Uint8Array(sum);
  for (let i3 = 0, pad2 = 0; i3 < arrays.length; i3++) {
    const a2 = arrays[i3];
    res.set(a2, pad2);
    pad2 += a2.length;
  }
  return res;
}
class Hash {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto$2 && typeof crypto$2.getRandomValues === "function") {
    return crypto$2.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto$2 && typeof crypto$2.randomBytes === "function") {
    return crypto$2.randomBytes(bytesLength);
  }
  throw new Error("crypto.getRandomValues must be defined");
}
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
const _0n = /* @__PURE__ */ BigInt(0);
const _1n = /* @__PURE__ */ BigInt(1);
const _2n = /* @__PURE__ */ BigInt(2);
const _7n = /* @__PURE__ */ BigInt(7);
const _256n = /* @__PURE__ */ BigInt(256);
const _0x71n = /* @__PURE__ */ BigInt(113);
for (let round = 0, R3 = _1n, x2 = 1, y3 = 0; round < 24; round++) {
  [x2, y3] = [y3, (2 * x2 + 3 * y3) % 5];
  SHA3_PI.push(2 * (5 * y3 + x2));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j2 = 0; j2 < 7; j2++) {
    R3 = (R3 << _1n ^ (R3 >> _7n) * _0x71n) % _256n;
    if (R3 & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j2)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
const [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
const rotlH = (h4, l2, s2) => s2 > 32 ? rotlBH(h4, l2, s2) : rotlSH(h4, l2, s2);
const rotlL = (h4, l2, s2) => s2 > 32 ? rotlBL(h4, l2, s2) : rotlSL(h4, l2, s2);
function keccakP(s2, rounds = 24) {
  const B4 = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x2 = 0; x2 < 10; x2++)
      B4[x2] = s2[x2] ^ s2[x2 + 10] ^ s2[x2 + 20] ^ s2[x2 + 30] ^ s2[x2 + 40];
    for (let x2 = 0; x2 < 10; x2 += 2) {
      const idx1 = (x2 + 8) % 10;
      const idx0 = (x2 + 2) % 10;
      const B0 = B4[idx0];
      const B1 = B4[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B4[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B4[idx1 + 1];
      for (let y3 = 0; y3 < 50; y3 += 10) {
        s2[x2 + y3] ^= Th;
        s2[x2 + y3 + 1] ^= Tl;
      }
    }
    let curH = s2[2];
    let curL = s2[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s2[PI];
      curL = s2[PI + 1];
      s2[PI] = Th;
      s2[PI + 1] = Tl;
    }
    for (let y3 = 0; y3 < 50; y3 += 10) {
      for (let x2 = 0; x2 < 10; x2++)
        B4[x2] = s2[y3 + x2];
      for (let x2 = 0; x2 < 10; x2++)
        s2[y3 + x2] ^= ~B4[(x2 + 2) % 10] & B4[(x2 + 4) % 10];
    }
    s2[0] ^= SHA3_IOTA_H[round];
    s2[1] ^= SHA3_IOTA_L[round];
  }
  B4.fill(0);
}
class Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    anumber(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  keccak() {
    if (!isLE)
      byteSwap32(this.state32);
    keccakP(this.state32, this.rounds);
    if (!isLE)
      byteSwap32(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    const { blockLen, state } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i3 = 0; i3 < take; i3++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to2) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to2 || (to2 = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to2.state32.set(this.state32);
    to2.pos = this.pos;
    to2.posOut = this.posOut;
    to2.finished = this.finished;
    to2.rounds = rounds;
    to2.suffix = suffix;
    to2.outputLen = outputLen;
    to2.enableXOF = enableXOF;
    to2.destroyed = this.destroyed;
    return to2;
  }
}
const gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
const keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
function keccak256(value, to_) {
  const to2 = to_ || "hex";
  const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes$1(value) : value);
  if (to2 === "bytes")
    return bytes;
  return toHex(bytes);
}
class LruMap extends Map {
  constructor(size2) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size2;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
}
const checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
function checksumAddress(address_, chainId) {
  if (checksumAddressCache.has(`${address_}.${chainId}`))
    return checksumAddressCache.get(`${address_}.${chainId}`);
  const hexAddress = address_.substring(2).toLowerCase();
  const hash = keccak256(stringToBytes(hexAddress), "bytes");
  const address = hexAddress.split("");
  for (let i3 = 0; i3 < 40; i3 += 2) {
    if (hash[i3 >> 1] >> 4 >= 8 && address[i3]) {
      address[i3] = address[i3].toUpperCase();
    }
    if ((hash[i3 >> 1] & 15) >= 8 && address[i3 + 1]) {
      address[i3 + 1] = address[i3 + 1].toUpperCase();
    }
  }
  const result = `0x${address.join("")}`;
  checksumAddressCache.set(`${address_}.${chainId}`, result);
  return result;
}
function publicKeyToAddress(publicKey) {
  const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
  return checksumAddress(`0x${address}`);
}
async function recoverPublicKey({ hash, signature }) {
  const hashHex = isHex(hash) ? hash : toHex(hash);
  const { secp256k1 } = await __vitePreload(async () => {
    const { secp256k1: secp256k12 } = await import("./secp256k1-Uifd-ko3.js");
    return { secp256k1: secp256k12 };
  }, true ? __vite__mapDeps([0,1,2,3,4]) : void 0);
  const signature_ = (() => {
    if (typeof signature === "object" && "r" in signature && "s" in signature) {
      const { r: r2, s: s2, v: v2, yParity } = signature;
      const yParityOrV2 = Number(yParity ?? v2);
      const recoveryBit2 = toRecoveryBit(yParityOrV2);
      return new secp256k1.Signature(hexToBigInt(r2), hexToBigInt(s2)).addRecoveryBit(recoveryBit2);
    }
    const signatureHex = isHex(signature) ? signature : toHex(signature);
    const yParityOrV = hexToNumber(`0x${signatureHex.slice(130)}`);
    const recoveryBit = toRecoveryBit(yParityOrV);
    return secp256k1.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
  })();
  const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
  return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
  if (yParityOrV === 0 || yParityOrV === 1)
    return yParityOrV;
  if (yParityOrV === 27)
    return 0;
  if (yParityOrV === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}
async function recoverAddress({ hash, signature }) {
  return publicKeyToAddress(await recoverPublicKey({ hash, signature }));
}
function base$1(ALPHABET2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  const BASE_MAP = new Uint8Array(256);
  for (let j2 = 0; j2 < BASE_MAP.length; j2++) {
    BASE_MAP[j2] = 255;
  }
  for (let i3 = 0; i3 < ALPHABET2.length; i3++) {
    const x2 = ALPHABET2.charAt(i3);
    const xc2 = x2.charCodeAt(0);
    if (BASE_MAP[xc2] !== 255) {
      throw new TypeError(x2 + " is ambiguous");
    }
    BASE_MAP[xc2] = i3;
  }
  const BASE = ALPHABET2.length;
  const LEADER = ALPHABET2.charAt(0);
  const FACTOR = Math.log(BASE) / Math.log(256);
  const iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array) ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    let zeroes = 0;
    let length = 0;
    let pbegin = 0;
    const pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    const size2 = (pend - pbegin) * iFACTOR + 1 >>> 0;
    const b58 = new Uint8Array(size2);
    while (pbegin !== pend) {
      let carry = source[pbegin];
      let i3 = 0;
      for (let it1 = size2 - 1; (carry !== 0 || i3 < length) && it1 !== -1; it1--, i3++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length = i3;
      pbegin++;
    }
    let it2 = size2 - length;
    while (it2 !== size2 && b58[it2] === 0) {
      it2++;
    }
    let str = LEADER.repeat(zeroes);
    for (; it2 < size2; ++it2) {
      str += ALPHABET2.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    let psz = 0;
    let zeroes = 0;
    let length = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    const size2 = (source.length - psz) * FACTOR + 1 >>> 0;
    const b256 = new Uint8Array(size2);
    while (psz < source.length) {
      const charCode = source.charCodeAt(psz);
      if (charCode > 255) {
        return;
      }
      let carry = BASE_MAP[charCode];
      if (carry === 255) {
        return;
      }
      let i3 = 0;
      for (let it3 = size2 - 1; (carry !== 0 || i3 < length) && it3 !== -1; it3--, i3++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length = i3;
      psz++;
    }
    let it4 = size2 - length;
    while (it4 !== size2 && b256[it4] === 0) {
      it4++;
    }
    const vch = new Uint8Array(zeroes + (size2 - it4));
    let j2 = zeroes;
    while (it4 !== size2) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    const buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error("Non-base" + BASE + " character");
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const Vo$2 = base$1(ALPHABET);
const JSONStringify = (data) => JSON.stringify(data, (_3, value) => typeof value === "bigint" ? value.toString() + "n" : value);
const JSONParse = (json) => {
  const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
  const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
  return JSON.parse(serializedData, (_3, value) => {
    const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
    if (isCustomFormatBigInt)
      return BigInt(value.substring(0, value.length - 1));
    return value;
  });
};
function safeJsonParse(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse(value);
  } catch (_a) {
    return value;
  }
}
function safeJsonStringify(value) {
  return typeof value === "string" ? value : JSONStringify(value) || "";
}
function En$2(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function fe$1(t, ...e2) {
  if (!En$2(t)) throw new Error("Uint8Array expected");
  if (e2.length > 0 && !e2.includes(t.length)) throw new Error("Uint8Array expected of length " + e2 + ", got length=" + t.length);
}
function De$3(t, e2 = true) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e2 && t.finished) throw new Error("Hash#digest() has already been called");
}
function gn$2(t, e2) {
  fe$1(t);
  const n3 = e2.outputLen;
  if (t.length < n3) throw new Error("digestInto() expects output buffer of length at least " + n3);
}
const it$2 = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _t$3 = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength);
function yn$2(t) {
  if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function de$3(t) {
  return typeof t == "string" && (t = yn$2(t)), fe$1(t), t;
}
let xn$1 = class xn {
  clone() {
    return this._cloneInto();
  }
};
function Bn$1(t) {
  const e2 = (r2) => t().update(de$3(r2)).digest(), n3 = t();
  return e2.outputLen = n3.outputLen, e2.blockLen = n3.blockLen, e2.create = () => t(), e2;
}
function he$3(t = 32) {
  if (it$2 && typeof it$2.getRandomValues == "function") return it$2.getRandomValues(new Uint8Array(t));
  if (it$2 && typeof it$2.randomBytes == "function") return it$2.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
function Cn$2(t, e2, n3, r2) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e2, n3, r2);
  const o3 = BigInt(32), s2 = BigInt(4294967295), a2 = Number(n3 >> o3 & s2), u2 = Number(n3 & s2), i3 = r2 ? 4 : 0, D2 = r2 ? 0 : 4;
  t.setUint32(e2 + i3, a2, r2), t.setUint32(e2 + D2, u2, r2);
}
let An$1 = class An extends xn$1 {
  constructor(e2, n3, r2, o3) {
    super(), this.blockLen = e2, this.outputLen = n3, this.padOffset = r2, this.isLE = o3, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e2), this.view = _t$3(this.buffer);
  }
  update(e2) {
    De$3(this);
    const { view: n3, buffer: r2, blockLen: o3 } = this;
    e2 = de$3(e2);
    const s2 = e2.length;
    for (let a2 = 0; a2 < s2; ) {
      const u2 = Math.min(o3 - this.pos, s2 - a2);
      if (u2 === o3) {
        const i3 = _t$3(e2);
        for (; o3 <= s2 - a2; a2 += o3) this.process(i3, a2);
        continue;
      }
      r2.set(e2.subarray(a2, a2 + u2), this.pos), this.pos += u2, a2 += u2, this.pos === o3 && (this.process(n3, 0), this.pos = 0);
    }
    return this.length += e2.length, this.roundClean(), this;
  }
  digestInto(e2) {
    De$3(this), gn$2(e2, this), this.finished = true;
    const { buffer: n3, view: r2, blockLen: o3, isLE: s2 } = this;
    let { pos: a2 } = this;
    n3[a2++] = 128, this.buffer.subarray(a2).fill(0), this.padOffset > o3 - a2 && (this.process(r2, 0), a2 = 0);
    for (let l2 = a2; l2 < o3; l2++) n3[l2] = 0;
    Cn$2(r2, o3 - 8, BigInt(this.length * 8), s2), this.process(r2, 0);
    const u2 = _t$3(e2), i3 = this.outputLen;
    if (i3 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const D2 = i3 / 4, c2 = this.get();
    if (D2 > c2.length) throw new Error("_sha2: outputLen bigger than state");
    for (let l2 = 0; l2 < D2; l2++) u2.setUint32(4 * l2, c2[l2], s2);
  }
  digest() {
    const { buffer: e2, outputLen: n3 } = this;
    this.digestInto(e2);
    const r2 = e2.slice(0, n3);
    return this.destroy(), r2;
  }
  _cloneInto(e2) {
    e2 || (e2 = new this.constructor()), e2.set(...this.get());
    const { blockLen: n3, buffer: r2, length: o3, finished: s2, destroyed: a2, pos: u2 } = this;
    return e2.length = o3, e2.pos = u2, e2.finished = s2, e2.destroyed = a2, o3 % n3 && e2.buffer.set(r2), e2;
  }
};
const wt$3 = BigInt(2 ** 32 - 1), St$4 = BigInt(32);
function le$3(t, e2 = false) {
  return e2 ? { h: Number(t & wt$3), l: Number(t >> St$4 & wt$3) } : { h: Number(t >> St$4 & wt$3) | 0, l: Number(t & wt$3) | 0 };
}
function mn$2(t, e2 = false) {
  let n3 = new Uint32Array(t.length), r2 = new Uint32Array(t.length);
  for (let o3 = 0; o3 < t.length; o3++) {
    const { h: s2, l: a2 } = le$3(t[o3], e2);
    [n3[o3], r2[o3]] = [s2, a2];
  }
  return [n3, r2];
}
const _n$2 = (t, e2) => BigInt(t >>> 0) << St$4 | BigInt(e2 >>> 0), Sn$1 = (t, e2, n3) => t >>> n3, vn$1 = (t, e2, n3) => t << 32 - n3 | e2 >>> n3, In$1 = (t, e2, n3) => t >>> n3 | e2 << 32 - n3, Un$1 = (t, e2, n3) => t << 32 - n3 | e2 >>> n3, Tn$2 = (t, e2, n3) => t << 64 - n3 | e2 >>> n3 - 32, Fn$2 = (t, e2, n3) => t >>> n3 - 32 | e2 << 64 - n3, Nn$1 = (t, e2) => e2, Ln$1 = (t, e2) => t, On$1 = (t, e2, n3) => t << n3 | e2 >>> 32 - n3, Hn$1 = (t, e2, n3) => e2 << n3 | t >>> 32 - n3, zn$2 = (t, e2, n3) => e2 << n3 - 32 | t >>> 64 - n3, Mn$2 = (t, e2, n3) => t << n3 - 32 | e2 >>> 64 - n3;
function qn$1(t, e2, n3, r2) {
  const o3 = (e2 >>> 0) + (r2 >>> 0);
  return { h: t + n3 + (o3 / 2 ** 32 | 0) | 0, l: o3 | 0 };
}
const $n$2 = (t, e2, n3) => (t >>> 0) + (e2 >>> 0) + (n3 >>> 0), kn$2 = (t, e2, n3, r2) => e2 + n3 + r2 + (t / 2 ** 32 | 0) | 0, Rn$2 = (t, e2, n3, r2) => (t >>> 0) + (e2 >>> 0) + (n3 >>> 0) + (r2 >>> 0), jn$2 = (t, e2, n3, r2, o3) => e2 + n3 + r2 + o3 + (t / 2 ** 32 | 0) | 0, Zn$2 = (t, e2, n3, r2, o3) => (t >>> 0) + (e2 >>> 0) + (n3 >>> 0) + (r2 >>> 0) + (o3 >>> 0), Gn$2 = (t, e2, n3, r2, o3, s2) => e2 + n3 + r2 + o3 + s2 + (t / 2 ** 32 | 0) | 0, x$3 = { fromBig: le$3, split: mn$2, toBig: _n$2, shrSH: Sn$1, shrSL: vn$1, rotrSH: In$1, rotrSL: Un$1, rotrBH: Tn$2, rotrBL: Fn$2, rotr32H: Nn$1, rotr32L: Ln$1, rotlSH: On$1, rotlSL: Hn$1, rotlBH: zn$2, rotlBL: Mn$2, add: qn$1, add3L: $n$2, add3H: kn$2, add4L: Rn$2, add4H: jn$2, add5H: Gn$2, add5L: Zn$2 }, [Vn$2, Yn$2] = (() => x$3.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t) => BigInt(t))))(), P$4 = new Uint32Array(80), Q$3 = new Uint32Array(80);
let Jn$2 = class Jn extends An$1 {
  constructor() {
    super(128, 64, 16, false), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  get() {
    const { Ah: e2, Al: n3, Bh: r2, Bl: o3, Ch: s2, Cl: a2, Dh: u2, Dl: i3, Eh: D2, El: c2, Fh: l2, Fl: p2, Gh: w2, Gl: h4, Hh: g2, Hl: S3 } = this;
    return [e2, n3, r2, o3, s2, a2, u2, i3, D2, c2, l2, p2, w2, h4, g2, S3];
  }
  set(e2, n3, r2, o3, s2, a2, u2, i3, D2, c2, l2, p2, w2, h4, g2, S3) {
    this.Ah = e2 | 0, this.Al = n3 | 0, this.Bh = r2 | 0, this.Bl = o3 | 0, this.Ch = s2 | 0, this.Cl = a2 | 0, this.Dh = u2 | 0, this.Dl = i3 | 0, this.Eh = D2 | 0, this.El = c2 | 0, this.Fh = l2 | 0, this.Fl = p2 | 0, this.Gh = w2 | 0, this.Gl = h4 | 0, this.Hh = g2 | 0, this.Hl = S3 | 0;
  }
  process(e2, n3) {
    for (let d4 = 0; d4 < 16; d4++, n3 += 4) P$4[d4] = e2.getUint32(n3), Q$3[d4] = e2.getUint32(n3 += 4);
    for (let d4 = 16; d4 < 80; d4++) {
      const m3 = P$4[d4 - 15] | 0, F2 = Q$3[d4 - 15] | 0, q2 = x$3.rotrSH(m3, F2, 1) ^ x$3.rotrSH(m3, F2, 8) ^ x$3.shrSH(m3, F2, 7), z2 = x$3.rotrSL(m3, F2, 1) ^ x$3.rotrSL(m3, F2, 8) ^ x$3.shrSL(m3, F2, 7), I3 = P$4[d4 - 2] | 0, O4 = Q$3[d4 - 2] | 0, ot2 = x$3.rotrSH(I3, O4, 19) ^ x$3.rotrBH(I3, O4, 61) ^ x$3.shrSH(I3, O4, 6), tt2 = x$3.rotrSL(I3, O4, 19) ^ x$3.rotrBL(I3, O4, 61) ^ x$3.shrSL(I3, O4, 6), st2 = x$3.add4L(z2, tt2, Q$3[d4 - 7], Q$3[d4 - 16]), at2 = x$3.add4H(st2, q2, ot2, P$4[d4 - 7], P$4[d4 - 16]);
      P$4[d4] = at2 | 0, Q$3[d4] = st2 | 0;
    }
    let { Ah: r2, Al: o3, Bh: s2, Bl: a2, Ch: u2, Cl: i3, Dh: D2, Dl: c2, Eh: l2, El: p2, Fh: w2, Fl: h4, Gh: g2, Gl: S3, Hh: v2, Hl: L3 } = this;
    for (let d4 = 0; d4 < 80; d4++) {
      const m3 = x$3.rotrSH(l2, p2, 14) ^ x$3.rotrSH(l2, p2, 18) ^ x$3.rotrBH(l2, p2, 41), F2 = x$3.rotrSL(l2, p2, 14) ^ x$3.rotrSL(l2, p2, 18) ^ x$3.rotrBL(l2, p2, 41), q2 = l2 & w2 ^ ~l2 & g2, z2 = p2 & h4 ^ ~p2 & S3, I3 = x$3.add5L(L3, F2, z2, Yn$2[d4], Q$3[d4]), O4 = x$3.add5H(I3, v2, m3, q2, Vn$2[d4], P$4[d4]), ot2 = I3 | 0, tt2 = x$3.rotrSH(r2, o3, 28) ^ x$3.rotrBH(r2, o3, 34) ^ x$3.rotrBH(r2, o3, 39), st2 = x$3.rotrSL(r2, o3, 28) ^ x$3.rotrBL(r2, o3, 34) ^ x$3.rotrBL(r2, o3, 39), at2 = r2 & s2 ^ r2 & u2 ^ s2 & u2, Ct2 = o3 & a2 ^ o3 & i3 ^ a2 & i3;
      v2 = g2 | 0, L3 = S3 | 0, g2 = w2 | 0, S3 = h4 | 0, w2 = l2 | 0, h4 = p2 | 0, { h: l2, l: p2 } = x$3.add(D2 | 0, c2 | 0, O4 | 0, ot2 | 0), D2 = u2 | 0, c2 = i3 | 0, u2 = s2 | 0, i3 = a2 | 0, s2 = r2 | 0, a2 = o3 | 0;
      const At2 = x$3.add3L(ot2, st2, Ct2);
      r2 = x$3.add3H(At2, O4, tt2, at2), o3 = At2 | 0;
    }
    ({ h: r2, l: o3 } = x$3.add(this.Ah | 0, this.Al | 0, r2 | 0, o3 | 0)), { h: s2, l: a2 } = x$3.add(this.Bh | 0, this.Bl | 0, s2 | 0, a2 | 0), { h: u2, l: i3 } = x$3.add(this.Ch | 0, this.Cl | 0, u2 | 0, i3 | 0), { h: D2, l: c2 } = x$3.add(this.Dh | 0, this.Dl | 0, D2 | 0, c2 | 0), { h: l2, l: p2 } = x$3.add(this.Eh | 0, this.El | 0, l2 | 0, p2 | 0), { h: w2, l: h4 } = x$3.add(this.Fh | 0, this.Fl | 0, w2 | 0, h4 | 0), { h: g2, l: S3 } = x$3.add(this.Gh | 0, this.Gl | 0, g2 | 0, S3 | 0), { h: v2, l: L3 } = x$3.add(this.Hh | 0, this.Hl | 0, v2 | 0, L3 | 0), this.set(r2, o3, s2, a2, u2, i3, D2, c2, l2, p2, w2, h4, g2, S3, v2, L3);
  }
  roundClean() {
    P$4.fill(0), Q$3.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
const Kn$2 = Bn$1(() => new Jn$2());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const vt$1 = BigInt(0), be$3 = BigInt(1), Wn$2 = BigInt(2);
function It$3(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Ut$2(t) {
  if (!It$3(t)) throw new Error("Uint8Array expected");
}
function Tt$3(t, e2) {
  if (typeof e2 != "boolean") throw new Error(t + " boolean expected, got " + e2);
}
const Xn$2 = Array.from({ length: 256 }, (t, e2) => e2.toString(16).padStart(2, "0"));
function Ft$3(t) {
  Ut$2(t);
  let e2 = "";
  for (let n3 = 0; n3 < t.length; n3++) e2 += Xn$2[t[n3]];
  return e2;
}
function pe$3(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? vt$1 : BigInt("0x" + t);
}
const K$4 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function we$3(t) {
  if (t >= K$4._0 && t <= K$4._9) return t - K$4._0;
  if (t >= K$4.A && t <= K$4.F) return t - (K$4.A - 10);
  if (t >= K$4.a && t <= K$4.f) return t - (K$4.a - 10);
}
function Ee$4(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  const e2 = t.length, n3 = e2 / 2;
  if (e2 % 2) throw new Error("hex string expected, got unpadded hex of length " + e2);
  const r2 = new Uint8Array(n3);
  for (let o3 = 0, s2 = 0; o3 < n3; o3++, s2 += 2) {
    const a2 = we$3(t.charCodeAt(s2)), u2 = we$3(t.charCodeAt(s2 + 1));
    if (a2 === void 0 || u2 === void 0) {
      const i3 = t[s2] + t[s2 + 1];
      throw new Error('hex string expected, got non-hex character "' + i3 + '" at index ' + s2);
    }
    r2[o3] = a2 * 16 + u2;
  }
  return r2;
}
function Pn$2(t) {
  return pe$3(Ft$3(t));
}
function Et$3(t) {
  return Ut$2(t), pe$3(Ft$3(Uint8Array.from(t).reverse()));
}
function ge$3(t, e2) {
  return Ee$4(t.toString(16).padStart(e2 * 2, "0"));
}
function Nt$2(t, e2) {
  return ge$3(t, e2).reverse();
}
function W$3(t, e2, n3) {
  let r2;
  if (typeof e2 == "string") try {
    r2 = Ee$4(e2);
  } catch (s2) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + s2);
  }
  else if (It$3(e2)) r2 = Uint8Array.from(e2);
  else throw new Error(t + " must be hex string or Uint8Array");
  const o3 = r2.length;
  if (typeof n3 == "number" && o3 !== n3) throw new Error(t + " of length " + n3 + " expected, got " + o3);
  return r2;
}
function ye$3(...t) {
  let e2 = 0;
  for (let r2 = 0; r2 < t.length; r2++) {
    const o3 = t[r2];
    Ut$2(o3), e2 += o3.length;
  }
  const n3 = new Uint8Array(e2);
  for (let r2 = 0, o3 = 0; r2 < t.length; r2++) {
    const s2 = t[r2];
    n3.set(s2, o3), o3 += s2.length;
  }
  return n3;
}
const Lt$3 = (t) => typeof t == "bigint" && vt$1 <= t;
function Qn$2(t, e2, n3) {
  return Lt$3(t) && Lt$3(e2) && Lt$3(n3) && e2 <= t && t < n3;
}
function ft$3(t, e2, n3, r2) {
  if (!Qn$2(e2, n3, r2)) throw new Error("expected valid " + t + ": " + n3 + " <= n < " + r2 + ", got " + e2);
}
function tr$2(t) {
  let e2;
  for (e2 = 0; t > vt$1; t >>= be$3, e2 += 1) ;
  return e2;
}
const er$2 = (t) => (Wn$2 << BigInt(t - 1)) - be$3, nr$2 = { bigint: (t) => typeof t == "bigint", function: (t) => typeof t == "function", boolean: (t) => typeof t == "boolean", string: (t) => typeof t == "string", stringOrUint8Array: (t) => typeof t == "string" || It$3(t), isSafeInteger: (t) => Number.isSafeInteger(t), array: (t) => Array.isArray(t), field: (t, e2) => e2.Fp.isValid(t), hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen) };
function Ot$3(t, e2, n3 = {}) {
  const r2 = (o3, s2, a2) => {
    const u2 = nr$2[s2];
    if (typeof u2 != "function") throw new Error("invalid validator function");
    const i3 = t[o3];
    if (!(a2 && i3 === void 0) && !u2(i3, t)) throw new Error("param " + String(o3) + " is invalid. Expected " + s2 + ", got " + i3);
  };
  for (const [o3, s2] of Object.entries(e2)) r2(o3, s2, false);
  for (const [o3, s2] of Object.entries(n3)) r2(o3, s2, true);
  return t;
}
function xe$2(t) {
  const e2 = /* @__PURE__ */ new WeakMap();
  return (n3, ...r2) => {
    const o3 = e2.get(n3);
    if (o3 !== void 0) return o3;
    const s2 = t(n3, ...r2);
    return e2.set(n3, s2), s2;
  };
}
const M$4 = BigInt(0), N$3 = BigInt(1), nt$3 = BigInt(2), rr$2 = BigInt(3), Ht$2 = BigInt(4), Be$2 = BigInt(5), Ce$2 = BigInt(8);
function H$3(t, e2) {
  const n3 = t % e2;
  return n3 >= M$4 ? n3 : e2 + n3;
}
function or$3(t, e2, n3) {
  if (e2 < M$4) throw new Error("invalid exponent, negatives unsupported");
  if (n3 <= M$4) throw new Error("invalid modulus");
  if (n3 === N$3) return M$4;
  let r2 = N$3;
  for (; e2 > M$4; ) e2 & N$3 && (r2 = r2 * t % n3), t = t * t % n3, e2 >>= N$3;
  return r2;
}
function J$3(t, e2, n3) {
  let r2 = t;
  for (; e2-- > M$4; ) r2 *= r2, r2 %= n3;
  return r2;
}
function Ae$2(t, e2) {
  if (t === M$4) throw new Error("invert: expected non-zero number");
  if (e2 <= M$4) throw new Error("invert: expected positive modulus, got " + e2);
  let n3 = H$3(t, e2), r2 = e2, o3 = M$4, s2 = N$3;
  for (; n3 !== M$4; ) {
    const u2 = r2 / n3, i3 = r2 % n3, D2 = o3 - s2 * u2;
    r2 = n3, n3 = i3, o3 = s2, s2 = D2;
  }
  if (r2 !== N$3) throw new Error("invert: does not exist");
  return H$3(o3, e2);
}
function sr$2(t) {
  const e2 = (t - N$3) / nt$3;
  let n3, r2, o3;
  for (n3 = t - N$3, r2 = 0; n3 % nt$3 === M$4; n3 /= nt$3, r2++) ;
  for (o3 = nt$3; o3 < t && or$3(o3, e2, t) !== t - N$3; o3++) if (o3 > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r2 === 1) {
    const a2 = (t + N$3) / Ht$2;
    return function(i3, D2) {
      const c2 = i3.pow(D2, a2);
      if (!i3.eql(i3.sqr(c2), D2)) throw new Error("Cannot find square root");
      return c2;
    };
  }
  const s2 = (n3 + N$3) / nt$3;
  return function(u2, i3) {
    if (u2.pow(i3, e2) === u2.neg(u2.ONE)) throw new Error("Cannot find square root");
    let D2 = r2, c2 = u2.pow(u2.mul(u2.ONE, o3), n3), l2 = u2.pow(i3, s2), p2 = u2.pow(i3, n3);
    for (; !u2.eql(p2, u2.ONE); ) {
      if (u2.eql(p2, u2.ZERO)) return u2.ZERO;
      let w2 = 1;
      for (let g2 = u2.sqr(p2); w2 < D2 && !u2.eql(g2, u2.ONE); w2++) g2 = u2.sqr(g2);
      const h4 = u2.pow(c2, N$3 << BigInt(D2 - w2 - 1));
      c2 = u2.sqr(h4), l2 = u2.mul(l2, h4), p2 = u2.mul(p2, c2), D2 = w2;
    }
    return l2;
  };
}
function ir$2(t) {
  if (t % Ht$2 === rr$2) {
    const e2 = (t + N$3) / Ht$2;
    return function(r2, o3) {
      const s2 = r2.pow(o3, e2);
      if (!r2.eql(r2.sqr(s2), o3)) throw new Error("Cannot find square root");
      return s2;
    };
  }
  if (t % Ce$2 === Be$2) {
    const e2 = (t - Be$2) / Ce$2;
    return function(r2, o3) {
      const s2 = r2.mul(o3, nt$3), a2 = r2.pow(s2, e2), u2 = r2.mul(o3, a2), i3 = r2.mul(r2.mul(u2, nt$3), a2), D2 = r2.mul(u2, r2.sub(i3, r2.ONE));
      if (!r2.eql(r2.sqr(D2), o3)) throw new Error("Cannot find square root");
      return D2;
    };
  }
  return sr$2(t);
}
const ur$2 = (t, e2) => (H$3(t, e2) & N$3) === N$3, cr$2 = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function ar$2(t) {
  const e2 = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, n3 = cr$2.reduce((r2, o3) => (r2[o3] = "function", r2), e2);
  return Ot$3(t, n3);
}
function fr$2(t, e2, n3) {
  if (n3 < M$4) throw new Error("invalid exponent, negatives unsupported");
  if (n3 === M$4) return t.ONE;
  if (n3 === N$3) return e2;
  let r2 = t.ONE, o3 = e2;
  for (; n3 > M$4; ) n3 & N$3 && (r2 = t.mul(r2, o3)), o3 = t.sqr(o3), n3 >>= N$3;
  return r2;
}
function Dr$2(t, e2) {
  const n3 = new Array(e2.length), r2 = e2.reduce((s2, a2, u2) => t.is0(a2) ? s2 : (n3[u2] = s2, t.mul(s2, a2)), t.ONE), o3 = t.inv(r2);
  return e2.reduceRight((s2, a2, u2) => t.is0(a2) ? s2 : (n3[u2] = t.mul(s2, n3[u2]), t.mul(s2, a2)), o3), n3;
}
function me$3(t, e2) {
  const n3 = e2 !== void 0 ? e2 : t.toString(2).length, r2 = Math.ceil(n3 / 8);
  return { nBitLength: n3, nByteLength: r2 };
}
function _e$4(t, e2, n3 = false, r2 = {}) {
  if (t <= M$4) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: o3, nByteLength: s2 } = me$3(t, e2);
  if (s2 > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a2;
  const u2 = Object.freeze({ ORDER: t, isLE: n3, BITS: o3, BYTES: s2, MASK: er$2(o3), ZERO: M$4, ONE: N$3, create: (i3) => H$3(i3, t), isValid: (i3) => {
    if (typeof i3 != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof i3);
    return M$4 <= i3 && i3 < t;
  }, is0: (i3) => i3 === M$4, isOdd: (i3) => (i3 & N$3) === N$3, neg: (i3) => H$3(-i3, t), eql: (i3, D2) => i3 === D2, sqr: (i3) => H$3(i3 * i3, t), add: (i3, D2) => H$3(i3 + D2, t), sub: (i3, D2) => H$3(i3 - D2, t), mul: (i3, D2) => H$3(i3 * D2, t), pow: (i3, D2) => fr$2(u2, i3, D2), div: (i3, D2) => H$3(i3 * Ae$2(D2, t), t), sqrN: (i3) => i3 * i3, addN: (i3, D2) => i3 + D2, subN: (i3, D2) => i3 - D2, mulN: (i3, D2) => i3 * D2, inv: (i3) => Ae$2(i3, t), sqrt: r2.sqrt || ((i3) => (a2 || (a2 = ir$2(t)), a2(u2, i3))), invertBatch: (i3) => Dr$2(u2, i3), cmov: (i3, D2, c2) => c2 ? D2 : i3, toBytes: (i3) => n3 ? Nt$2(i3, s2) : ge$3(i3, s2), fromBytes: (i3) => {
    if (i3.length !== s2) throw new Error("Field.fromBytes: expected " + s2 + " bytes, got " + i3.length);
    return n3 ? Et$3(i3) : Pn$2(i3);
  } });
  return Object.freeze(u2);
}
const Se$2 = BigInt(0), gt$3 = BigInt(1);
function zt$2(t, e2) {
  const n3 = e2.negate();
  return t ? n3 : e2;
}
function ve$2(t, e2) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e2) throw new Error("invalid window size, expected [1.." + e2 + "], got W=" + t);
}
function Mt$3(t, e2) {
  ve$2(t, e2);
  const n3 = Math.ceil(e2 / t) + 1, r2 = 2 ** (t - 1);
  return { windows: n3, windowSize: r2 };
}
function dr$2(t, e2) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((n3, r2) => {
    if (!(n3 instanceof e2)) throw new Error("invalid point at index " + r2);
  });
}
function hr$2(t, e2) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((n3, r2) => {
    if (!e2.isValid(n3)) throw new Error("invalid scalar at index " + r2);
  });
}
const qt$3 = /* @__PURE__ */ new WeakMap(), Ie$2 = /* @__PURE__ */ new WeakMap();
function $t$2(t) {
  return Ie$2.get(t) || 1;
}
function lr$2(t, e2) {
  return { constTimeNegate: zt$2, hasPrecomputes(n3) {
    return $t$2(n3) !== 1;
  }, unsafeLadder(n3, r2, o3 = t.ZERO) {
    let s2 = n3;
    for (; r2 > Se$2; ) r2 & gt$3 && (o3 = o3.add(s2)), s2 = s2.double(), r2 >>= gt$3;
    return o3;
  }, precomputeWindow(n3, r2) {
    const { windows: o3, windowSize: s2 } = Mt$3(r2, e2), a2 = [];
    let u2 = n3, i3 = u2;
    for (let D2 = 0; D2 < o3; D2++) {
      i3 = u2, a2.push(i3);
      for (let c2 = 1; c2 < s2; c2++) i3 = i3.add(u2), a2.push(i3);
      u2 = i3.double();
    }
    return a2;
  }, wNAF(n3, r2, o3) {
    const { windows: s2, windowSize: a2 } = Mt$3(n3, e2);
    let u2 = t.ZERO, i3 = t.BASE;
    const D2 = BigInt(2 ** n3 - 1), c2 = 2 ** n3, l2 = BigInt(n3);
    for (let p2 = 0; p2 < s2; p2++) {
      const w2 = p2 * a2;
      let h4 = Number(o3 & D2);
      o3 >>= l2, h4 > a2 && (h4 -= c2, o3 += gt$3);
      const g2 = w2, S3 = w2 + Math.abs(h4) - 1, v2 = p2 % 2 !== 0, L3 = h4 < 0;
      h4 === 0 ? i3 = i3.add(zt$2(v2, r2[g2])) : u2 = u2.add(zt$2(L3, r2[S3]));
    }
    return { p: u2, f: i3 };
  }, wNAFUnsafe(n3, r2, o3, s2 = t.ZERO) {
    const { windows: a2, windowSize: u2 } = Mt$3(n3, e2), i3 = BigInt(2 ** n3 - 1), D2 = 2 ** n3, c2 = BigInt(n3);
    for (let l2 = 0; l2 < a2; l2++) {
      const p2 = l2 * u2;
      if (o3 === Se$2) break;
      let w2 = Number(o3 & i3);
      if (o3 >>= c2, w2 > u2 && (w2 -= D2, o3 += gt$3), w2 === 0) continue;
      let h4 = r2[p2 + Math.abs(w2) - 1];
      w2 < 0 && (h4 = h4.negate()), s2 = s2.add(h4);
    }
    return s2;
  }, getPrecomputes(n3, r2, o3) {
    let s2 = qt$3.get(r2);
    return s2 || (s2 = this.precomputeWindow(r2, n3), n3 !== 1 && qt$3.set(r2, o3(s2))), s2;
  }, wNAFCached(n3, r2, o3) {
    const s2 = $t$2(n3);
    return this.wNAF(s2, this.getPrecomputes(s2, n3, o3), r2);
  }, wNAFCachedUnsafe(n3, r2, o3, s2) {
    const a2 = $t$2(n3);
    return a2 === 1 ? this.unsafeLadder(n3, r2, s2) : this.wNAFUnsafe(a2, this.getPrecomputes(a2, n3, o3), r2, s2);
  }, setWindowSize(n3, r2) {
    ve$2(r2, e2), Ie$2.set(n3, r2), qt$3.delete(n3);
  } };
}
function br$2(t, e2, n3, r2) {
  if (dr$2(n3, t), hr$2(r2, e2), n3.length !== r2.length) throw new Error("arrays of points and scalars must have equal length");
  const o3 = t.ZERO, s2 = tr$2(BigInt(n3.length)), a2 = s2 > 12 ? s2 - 3 : s2 > 4 ? s2 - 2 : s2 ? 2 : 1, u2 = (1 << a2) - 1, i3 = new Array(u2 + 1).fill(o3), D2 = Math.floor((e2.BITS - 1) / a2) * a2;
  let c2 = o3;
  for (let l2 = D2; l2 >= 0; l2 -= a2) {
    i3.fill(o3);
    for (let w2 = 0; w2 < r2.length; w2++) {
      const h4 = r2[w2], g2 = Number(h4 >> BigInt(l2) & BigInt(u2));
      i3[g2] = i3[g2].add(n3[w2]);
    }
    let p2 = o3;
    for (let w2 = i3.length - 1, h4 = o3; w2 > 0; w2--) h4 = h4.add(i3[w2]), p2 = p2.add(h4);
    if (c2 = c2.add(p2), l2 !== 0) for (let w2 = 0; w2 < a2; w2++) c2 = c2.double();
  }
  return c2;
}
function pr$1(t) {
  return ar$2(t.Fp), Ot$3(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...me$3(t.n, t.nBitLength), ...t, p: t.Fp.ORDER });
}
const G$3 = BigInt(0), j$3 = BigInt(1), yt$3 = BigInt(2), wr$2 = BigInt(8), Er$1 = { zip215: true };
function gr$1(t) {
  const e2 = pr$1(t);
  return Ot$3(t, { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" }, { adjustScalarBytes: "function", domain: "function", uvRatio: "function", mapToCurve: "function" }), Object.freeze({ ...e2 });
}
function yr$1(t) {
  const e2 = gr$1(t), { Fp: n3, n: r2, prehash: o3, hash: s2, randomBytes: a2, nByteLength: u2, h: i3 } = e2, D2 = yt$3 << BigInt(u2 * 8) - j$3, c2 = n3.create, l2 = _e$4(e2.n, e2.nBitLength), p2 = e2.uvRatio || ((y3, f5) => {
    try {
      return { isValid: true, value: n3.sqrt(y3 * n3.inv(f5)) };
    } catch {
      return { isValid: false, value: G$3 };
    }
  }), w2 = e2.adjustScalarBytes || ((y3) => y3), h4 = e2.domain || ((y3, f5, b2) => {
    if (Tt$3("phflag", b2), f5.length || b2) throw new Error("Contexts/pre-hash are not supported");
    return y3;
  });
  function g2(y3, f5) {
    ft$3("coordinate " + y3, f5, G$3, D2);
  }
  function S3(y3) {
    if (!(y3 instanceof d4)) throw new Error("ExtendedPoint expected");
  }
  const v2 = xe$2((y3, f5) => {
    const { ex: b2, ey: E2, ez: B4 } = y3, C2 = y3.is0();
    f5 == null && (f5 = C2 ? wr$2 : n3.inv(B4));
    const A2 = c2(b2 * f5), U2 = c2(E2 * f5), _3 = c2(B4 * f5);
    if (C2) return { x: G$3, y: j$3 };
    if (_3 !== j$3) throw new Error("invZ was invalid");
    return { x: A2, y: U2 };
  }), L3 = xe$2((y3) => {
    const { a: f5, d: b2 } = e2;
    if (y3.is0()) throw new Error("bad point: ZERO");
    const { ex: E2, ey: B4, ez: C2, et: A2 } = y3, U2 = c2(E2 * E2), _3 = c2(B4 * B4), T2 = c2(C2 * C2), $2 = c2(T2 * T2), R3 = c2(U2 * f5), V3 = c2(T2 * c2(R3 + _3)), Y2 = c2($2 + c2(b2 * c2(U2 * _3)));
    if (V3 !== Y2) throw new Error("bad point: equation left != right (1)");
    const Z2 = c2(E2 * B4), X2 = c2(C2 * A2);
    if (Z2 !== X2) throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class d4 {
    constructor(f5, b2, E2, B4) {
      this.ex = f5, this.ey = b2, this.ez = E2, this.et = B4, g2("x", f5), g2("y", b2), g2("z", E2), g2("t", B4), Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(f5) {
      if (f5 instanceof d4) throw new Error("extended point not allowed");
      const { x: b2, y: E2 } = f5 || {};
      return g2("x", b2), g2("y", E2), new d4(b2, E2, j$3, c2(b2 * E2));
    }
    static normalizeZ(f5) {
      const b2 = n3.invertBatch(f5.map((E2) => E2.ez));
      return f5.map((E2, B4) => E2.toAffine(b2[B4])).map(d4.fromAffine);
    }
    static msm(f5, b2) {
      return br$2(d4, l2, f5, b2);
    }
    _setWindowSize(f5) {
      q2.setWindowSize(this, f5);
    }
    assertValidity() {
      L3(this);
    }
    equals(f5) {
      S3(f5);
      const { ex: b2, ey: E2, ez: B4 } = this, { ex: C2, ey: A2, ez: U2 } = f5, _3 = c2(b2 * U2), T2 = c2(C2 * B4), $2 = c2(E2 * U2), R3 = c2(A2 * B4);
      return _3 === T2 && $2 === R3;
    }
    is0() {
      return this.equals(d4.ZERO);
    }
    negate() {
      return new d4(c2(-this.ex), this.ey, this.ez, c2(-this.et));
    }
    double() {
      const { a: f5 } = e2, { ex: b2, ey: E2, ez: B4 } = this, C2 = c2(b2 * b2), A2 = c2(E2 * E2), U2 = c2(yt$3 * c2(B4 * B4)), _3 = c2(f5 * C2), T2 = b2 + E2, $2 = c2(c2(T2 * T2) - C2 - A2), R3 = _3 + A2, V3 = R3 - U2, Y2 = _3 - A2, Z2 = c2($2 * V3), X2 = c2(R3 * Y2), et2 = c2($2 * Y2), pt2 = c2(V3 * R3);
      return new d4(Z2, X2, pt2, et2);
    }
    add(f5) {
      S3(f5);
      const { a: b2, d: E2 } = e2, { ex: B4, ey: C2, ez: A2, et: U2 } = this, { ex: _3, ey: T2, ez: $2, et: R3 } = f5;
      if (b2 === BigInt(-1)) {
        const re2 = c2((C2 - B4) * (T2 + _3)), oe2 = c2((C2 + B4) * (T2 - _3)), mt2 = c2(oe2 - re2);
        if (mt2 === G$3) return this.double();
        const se2 = c2(A2 * yt$3 * R3), ie2 = c2(U2 * yt$3 * $2), ue2 = ie2 + se2, ce2 = oe2 + re2, ae2 = ie2 - se2, Dn2 = c2(ue2 * mt2), dn2 = c2(ce2 * ae2), hn2 = c2(ue2 * ae2), ln2 = c2(mt2 * ce2);
        return new d4(Dn2, dn2, ln2, hn2);
      }
      const V3 = c2(B4 * _3), Y2 = c2(C2 * T2), Z2 = c2(U2 * E2 * R3), X2 = c2(A2 * $2), et2 = c2((B4 + C2) * (_3 + T2) - V3 - Y2), pt2 = X2 - Z2, ee2 = X2 + Z2, ne2 = c2(Y2 - b2 * V3), un2 = c2(et2 * pt2), cn2 = c2(ee2 * ne2), an2 = c2(et2 * ne2), fn2 = c2(pt2 * ee2);
      return new d4(un2, cn2, fn2, an2);
    }
    subtract(f5) {
      return this.add(f5.negate());
    }
    wNAF(f5) {
      return q2.wNAFCached(this, f5, d4.normalizeZ);
    }
    multiply(f5) {
      const b2 = f5;
      ft$3("scalar", b2, j$3, r2);
      const { p: E2, f: B4 } = this.wNAF(b2);
      return d4.normalizeZ([E2, B4])[0];
    }
    multiplyUnsafe(f5, b2 = d4.ZERO) {
      const E2 = f5;
      return ft$3("scalar", E2, G$3, r2), E2 === G$3 ? F2 : this.is0() || E2 === j$3 ? this : q2.wNAFCachedUnsafe(this, E2, d4.normalizeZ, b2);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(i3).is0();
    }
    isTorsionFree() {
      return q2.unsafeLadder(this, r2).is0();
    }
    toAffine(f5) {
      return v2(this, f5);
    }
    clearCofactor() {
      const { h: f5 } = e2;
      return f5 === j$3 ? this : this.multiplyUnsafe(f5);
    }
    static fromHex(f5, b2 = false) {
      const { d: E2, a: B4 } = e2, C2 = n3.BYTES;
      f5 = W$3("pointHex", f5, C2), Tt$3("zip215", b2);
      const A2 = f5.slice(), U2 = f5[C2 - 1];
      A2[C2 - 1] = U2 & -129;
      const _3 = Et$3(A2), T2 = b2 ? D2 : n3.ORDER;
      ft$3("pointHex.y", _3, G$3, T2);
      const $2 = c2(_3 * _3), R3 = c2($2 - j$3), V3 = c2(E2 * $2 - B4);
      let { isValid: Y2, value: Z2 } = p2(R3, V3);
      if (!Y2) throw new Error("Point.fromHex: invalid y coordinate");
      const X2 = (Z2 & j$3) === j$3, et2 = (U2 & 128) !== 0;
      if (!b2 && Z2 === G$3 && et2) throw new Error("Point.fromHex: x=0 and x_0=1");
      return et2 !== X2 && (Z2 = c2(-Z2)), d4.fromAffine({ x: Z2, y: _3 });
    }
    static fromPrivateKey(f5) {
      return O4(f5).point;
    }
    toRawBytes() {
      const { x: f5, y: b2 } = this.toAffine(), E2 = Nt$2(b2, n3.BYTES);
      return E2[E2.length - 1] |= f5 & j$3 ? 128 : 0, E2;
    }
    toHex() {
      return Ft$3(this.toRawBytes());
    }
  }
  d4.BASE = new d4(e2.Gx, e2.Gy, j$3, c2(e2.Gx * e2.Gy)), d4.ZERO = new d4(G$3, j$3, j$3, G$3);
  const { BASE: m3, ZERO: F2 } = d4, q2 = lr$2(d4, u2 * 8);
  function z2(y3) {
    return H$3(y3, r2);
  }
  function I3(y3) {
    return z2(Et$3(y3));
  }
  function O4(y3) {
    const f5 = n3.BYTES;
    y3 = W$3("private key", y3, f5);
    const b2 = W$3("hashed private key", s2(y3), 2 * f5), E2 = w2(b2.slice(0, f5)), B4 = b2.slice(f5, 2 * f5), C2 = I3(E2), A2 = m3.multiply(C2), U2 = A2.toRawBytes();
    return { head: E2, prefix: B4, scalar: C2, point: A2, pointBytes: U2 };
  }
  function ot2(y3) {
    return O4(y3).pointBytes;
  }
  function tt2(y3 = new Uint8Array(), ...f5) {
    const b2 = ye$3(...f5);
    return I3(s2(h4(b2, W$3("context", y3), !!o3)));
  }
  function st2(y3, f5, b2 = {}) {
    y3 = W$3("message", y3), o3 && (y3 = o3(y3));
    const { prefix: E2, scalar: B4, pointBytes: C2 } = O4(f5), A2 = tt2(b2.context, E2, y3), U2 = m3.multiply(A2).toRawBytes(), _3 = tt2(b2.context, U2, C2, y3), T2 = z2(A2 + _3 * B4);
    ft$3("signature.s", T2, G$3, r2);
    const $2 = ye$3(U2, Nt$2(T2, n3.BYTES));
    return W$3("result", $2, n3.BYTES * 2);
  }
  const at2 = Er$1;
  function Ct2(y3, f5, b2, E2 = at2) {
    const { context: B4, zip215: C2 } = E2, A2 = n3.BYTES;
    y3 = W$3("signature", y3, 2 * A2), f5 = W$3("message", f5), b2 = W$3("publicKey", b2, A2), C2 !== void 0 && Tt$3("zip215", C2), o3 && (f5 = o3(f5));
    const U2 = Et$3(y3.slice(A2, 2 * A2));
    let _3, T2, $2;
    try {
      _3 = d4.fromHex(b2, C2), T2 = d4.fromHex(y3.slice(0, A2), C2), $2 = m3.multiplyUnsafe(U2);
    } catch {
      return false;
    }
    if (!C2 && _3.isSmallOrder()) return false;
    const R3 = tt2(B4, T2.toRawBytes(), _3.toRawBytes(), f5);
    return T2.add(_3.multiplyUnsafe(R3)).subtract($2).clearCofactor().equals(d4.ZERO);
  }
  return m3._setWindowSize(8), { CURVE: e2, getPublicKey: ot2, sign: st2, verify: Ct2, ExtendedPoint: d4, utils: { getExtendedPublicKey: O4, randomPrivateKey: () => a2(n3.BYTES), precompute(y3 = 8, f5 = d4.BASE) {
    return f5._setWindowSize(y3), f5.multiply(BigInt(3)), f5;
  } } };
}
BigInt(0), BigInt(1);
const kt$3 = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"), Ue$3 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
const xr$1 = BigInt(1), Te$2 = BigInt(2);
BigInt(3);
const Br$2 = BigInt(5), Cr$2 = BigInt(8);
function Ar$2(t) {
  const e2 = BigInt(10), n3 = BigInt(20), r2 = BigInt(40), o3 = BigInt(80), s2 = kt$3, u2 = t * t % s2 * t % s2, i3 = J$3(u2, Te$2, s2) * u2 % s2, D2 = J$3(i3, xr$1, s2) * t % s2, c2 = J$3(D2, Br$2, s2) * D2 % s2, l2 = J$3(c2, e2, s2) * c2 % s2, p2 = J$3(l2, n3, s2) * l2 % s2, w2 = J$3(p2, r2, s2) * p2 % s2, h4 = J$3(w2, o3, s2) * w2 % s2, g2 = J$3(h4, o3, s2) * w2 % s2, S3 = J$3(g2, e2, s2) * c2 % s2;
  return { pow_p_5_8: J$3(S3, Te$2, s2) * t % s2, b2: u2 };
}
function mr$2(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
function _r$2(t, e2) {
  const n3 = kt$3, r2 = H$3(e2 * e2 * e2, n3), o3 = H$3(r2 * r2 * e2, n3), s2 = Ar$2(t * o3).pow_p_5_8;
  let a2 = H$3(t * r2 * s2, n3);
  const u2 = H$3(e2 * a2 * a2, n3), i3 = a2, D2 = H$3(a2 * Ue$3, n3), c2 = u2 === t, l2 = u2 === H$3(-t, n3), p2 = u2 === H$3(-t * Ue$3, n3);
  return c2 && (a2 = i3), (l2 || p2) && (a2 = D2), ur$2(a2, n3) && (a2 = H$3(-a2, n3)), { isValid: c2 || l2, value: a2 };
}
const Sr$2 = (() => _e$4(kt$3, void 0, true))(), vr$2 = (() => ({ a: BigInt(-1), d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"), Fp: Sr$2, n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"), h: Cr$2, Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"), Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"), hash: Kn$2, randomBytes: he$3, adjustScalarBytes: mr$2, uvRatio: _r$2 }))(), Rt$3 = (() => yr$1(vr$2))(), jt$3 = "EdDSA", Zt$2 = "JWT", ut$3 = ".", Dt$2 = "base64url", Gt$2 = "utf8", xt$3 = "utf8", Vt$3 = ":", Yt$2 = "did", Jt$3 = "key", dt$3 = "base58btc", Kt$3 = "z", Wt$3 = "K36", Ne$2 = 32;
function Xt$3(t) {
  return globalThis.Buffer != null ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t;
}
function Le$3(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Xt$3(globalThis.Buffer.allocUnsafe(t)) : new Uint8Array(t);
}
function Oe$2(t, e2) {
  e2 || (e2 = t.reduce((o3, s2) => o3 + s2.length, 0));
  const n3 = Le$3(e2);
  let r2 = 0;
  for (const o3 of t) n3.set(o3, r2), r2 += o3.length;
  return Xt$3(n3);
}
function Ir$2(t, e2) {
  if (t.length >= 255) throw new TypeError("Alphabet too long");
  for (var n3 = new Uint8Array(256), r2 = 0; r2 < n3.length; r2++) n3[r2] = 255;
  for (var o3 = 0; o3 < t.length; o3++) {
    var s2 = t.charAt(o3), a2 = s2.charCodeAt(0);
    if (n3[a2] !== 255) throw new TypeError(s2 + " is ambiguous");
    n3[a2] = o3;
  }
  var u2 = t.length, i3 = t.charAt(0), D2 = Math.log(u2) / Math.log(256), c2 = Math.log(256) / Math.log(u2);
  function l2(h4) {
    if (h4 instanceof Uint8Array || (ArrayBuffer.isView(h4) ? h4 = new Uint8Array(h4.buffer, h4.byteOffset, h4.byteLength) : Array.isArray(h4) && (h4 = Uint8Array.from(h4))), !(h4 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (h4.length === 0) return "";
    for (var g2 = 0, S3 = 0, v2 = 0, L3 = h4.length; v2 !== L3 && h4[v2] === 0; ) v2++, g2++;
    for (var d4 = (L3 - v2) * c2 + 1 >>> 0, m3 = new Uint8Array(d4); v2 !== L3; ) {
      for (var F2 = h4[v2], q2 = 0, z2 = d4 - 1; (F2 !== 0 || q2 < S3) && z2 !== -1; z2--, q2++) F2 += 256 * m3[z2] >>> 0, m3[z2] = F2 % u2 >>> 0, F2 = F2 / u2 >>> 0;
      if (F2 !== 0) throw new Error("Non-zero carry");
      S3 = q2, v2++;
    }
    for (var I3 = d4 - S3; I3 !== d4 && m3[I3] === 0; ) I3++;
    for (var O4 = i3.repeat(g2); I3 < d4; ++I3) O4 += t.charAt(m3[I3]);
    return O4;
  }
  function p2(h4) {
    if (typeof h4 != "string") throw new TypeError("Expected String");
    if (h4.length === 0) return new Uint8Array();
    var g2 = 0;
    if (h4[g2] !== " ") {
      for (var S3 = 0, v2 = 0; h4[g2] === i3; ) S3++, g2++;
      for (var L3 = (h4.length - g2) * D2 + 1 >>> 0, d4 = new Uint8Array(L3); h4[g2]; ) {
        var m3 = n3[h4.charCodeAt(g2)];
        if (m3 === 255) return;
        for (var F2 = 0, q2 = L3 - 1; (m3 !== 0 || F2 < v2) && q2 !== -1; q2--, F2++) m3 += u2 * d4[q2] >>> 0, d4[q2] = m3 % 256 >>> 0, m3 = m3 / 256 >>> 0;
        if (m3 !== 0) throw new Error("Non-zero carry");
        v2 = F2, g2++;
      }
      if (h4[g2] !== " ") {
        for (var z2 = L3 - v2; z2 !== L3 && d4[z2] === 0; ) z2++;
        for (var I3 = new Uint8Array(S3 + (L3 - z2)), O4 = S3; z2 !== L3; ) I3[O4++] = d4[z2++];
        return I3;
      }
    }
  }
  function w2(h4) {
    var g2 = p2(h4);
    if (g2) return g2;
    throw new Error(`Non-${e2} character`);
  }
  return { encode: l2, decodeUnsafe: p2, decode: w2 };
}
var Ur$2 = Ir$2, Tr$2 = Ur$2;
const He$3 = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array") return t;
  if (t instanceof ArrayBuffer) return new Uint8Array(t);
  if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
}, Fr$2 = (t) => new TextEncoder().encode(t), Nr$2 = (t) => new TextDecoder().decode(t);
let Lr$2 = class Lr {
  constructor(e2, n3, r2) {
    this.name = e2, this.prefix = n3, this.baseEncode = r2;
  }
  encode(e2) {
    if (e2 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e2)}`;
    throw Error("Unknown type, must be binary type");
  }
};
let Or$2 = class Or {
  constructor(e2, n3, r2) {
    if (this.name = e2, this.prefix = n3, n3.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = n3.codePointAt(0), this.baseDecode = r2;
  }
  decode(e2) {
    if (typeof e2 == "string") {
      if (e2.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e2.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e2) {
    return ze$3(this, e2);
  }
};
let Hr$2 = class Hr {
  constructor(e2) {
    this.decoders = e2;
  }
  or(e2) {
    return ze$3(this, e2);
  }
  decode(e2) {
    const n3 = e2[0], r2 = this.decoders[n3];
    if (r2) return r2.decode(e2);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e2)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
const ze$3 = (t, e2) => new Hr$2({ ...t.decoders || { [t.prefix]: t }, ...e2.decoders || { [e2.prefix]: e2 } });
let zr$2 = class zr {
  constructor(e2, n3, r2, o3) {
    this.name = e2, this.prefix = n3, this.baseEncode = r2, this.baseDecode = o3, this.encoder = new Lr$2(e2, n3, r2), this.decoder = new Or$2(e2, n3, o3);
  }
  encode(e2) {
    return this.encoder.encode(e2);
  }
  decode(e2) {
    return this.decoder.decode(e2);
  }
};
const Bt$3 = ({ name: t, prefix: e2, encode: n3, decode: r2 }) => new zr$2(t, e2, n3, r2), ht$3 = ({ prefix: t, name: e2, alphabet: n3 }) => {
  const { encode: r2, decode: o3 } = Tr$2(n3, e2);
  return Bt$3({ prefix: t, name: e2, encode: r2, decode: (s2) => He$3(o3(s2)) });
}, Mr$2 = (t, e2, n3, r2) => {
  const o3 = {};
  for (let c2 = 0; c2 < e2.length; ++c2) o3[e2[c2]] = c2;
  let s2 = t.length;
  for (; t[s2 - 1] === "="; ) --s2;
  const a2 = new Uint8Array(s2 * n3 / 8 | 0);
  let u2 = 0, i3 = 0, D2 = 0;
  for (let c2 = 0; c2 < s2; ++c2) {
    const l2 = o3[t[c2]];
    if (l2 === void 0) throw new SyntaxError(`Non-${r2} character`);
    i3 = i3 << n3 | l2, u2 += n3, u2 >= 8 && (u2 -= 8, a2[D2++] = 255 & i3 >> u2);
  }
  if (u2 >= n3 || 255 & i3 << 8 - u2) throw new SyntaxError("Unexpected end of data");
  return a2;
}, qr$2 = (t, e2, n3) => {
  const r2 = e2[e2.length - 1] === "=", o3 = (1 << n3) - 1;
  let s2 = "", a2 = 0, u2 = 0;
  for (let i3 = 0; i3 < t.length; ++i3) for (u2 = u2 << 8 | t[i3], a2 += 8; a2 > n3; ) a2 -= n3, s2 += e2[o3 & u2 >> a2];
  if (a2 && (s2 += e2[o3 & u2 << n3 - a2]), r2) for (; s2.length * n3 & 7; ) s2 += "=";
  return s2;
}, k$6 = ({ name: t, prefix: e2, bitsPerChar: n3, alphabet: r2 }) => Bt$3({ prefix: e2, name: t, encode(o3) {
  return qr$2(o3, r2, n3);
}, decode(o3) {
  return Mr$2(o3, r2, n3, t);
} }), $r$2 = Bt$3({ prefix: "\0", name: "identity", encode: (t) => Nr$2(t), decode: (t) => Fr$2(t) });
var kr$2 = Object.freeze({ __proto__: null, identity: $r$2 });
const Rr$2 = k$6({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var jr$2 = Object.freeze({ __proto__: null, base2: Rr$2 });
const Zr$2 = k$6({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Gr$2 = Object.freeze({ __proto__: null, base8: Zr$2 });
const Vr$2 = ht$3({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Yr$2 = Object.freeze({ __proto__: null, base10: Vr$2 });
const Jr$2 = k$6({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), Kr$2 = k$6({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Wr$2 = Object.freeze({ __proto__: null, base16: Jr$2, base16upper: Kr$2 });
const Xr$2 = k$6({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Pr$2 = k$6({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), Qr$2 = k$6({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), to$2 = k$6({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), eo$2 = k$6({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), no$2 = k$6({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), ro$2 = k$6({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), oo$2 = k$6({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), so$2 = k$6({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var io$2 = Object.freeze({ __proto__: null, base32: Xr$2, base32upper: Pr$2, base32pad: Qr$2, base32padupper: to$2, base32hex: eo$2, base32hexupper: no$2, base32hexpad: ro$2, base32hexpadupper: oo$2, base32z: so$2 });
const uo$2 = ht$3({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), co$2 = ht$3({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var ao$2 = Object.freeze({ __proto__: null, base36: uo$2, base36upper: co$2 });
const fo$2 = ht$3({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), Do$1 = ht$3({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var ho$2 = Object.freeze({ __proto__: null, base58btc: fo$2, base58flickr: Do$1 });
const lo$2 = k$6({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), bo$2 = k$6({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), po$2 = k$6({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), wo$2 = k$6({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Eo$2 = Object.freeze({ __proto__: null, base64: lo$2, base64pad: bo$2, base64url: po$2, base64urlpad: wo$2 });
const Me$4 = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), go$2 = Me$4.reduce((t, e2, n3) => (t[n3] = e2, t), []), yo$2 = Me$4.reduce((t, e2, n3) => (t[e2.codePointAt(0)] = n3, t), []);
function xo$2(t) {
  return t.reduce((e2, n3) => (e2 += go$2[n3], e2), "");
}
function Bo$2(t) {
  const e2 = [];
  for (const n3 of t) {
    const r2 = yo$2[n3.codePointAt(0)];
    if (r2 === void 0) throw new Error(`Non-base256emoji character: ${n3}`);
    e2.push(r2);
  }
  return new Uint8Array(e2);
}
const Co$1 = Bt$3({ prefix: "🚀", name: "base256emoji", encode: xo$2, decode: Bo$2 });
var Ao$2 = Object.freeze({ __proto__: null, base256emoji: Co$1 }), mo$2 = $e$3, qe$3 = 128, _o$2 = 127, So$2 = ~_o$2, vo$2 = Math.pow(2, 31);
function $e$3(t, e2, n3) {
  e2 = e2 || [], n3 = n3 || 0;
  for (var r2 = n3; t >= vo$2; ) e2[n3++] = t & 255 | qe$3, t /= 128;
  for (; t & So$2; ) e2[n3++] = t & 255 | qe$3, t >>>= 7;
  return e2[n3] = t | 0, $e$3.bytes = n3 - r2 + 1, e2;
}
var Io$2 = Pt$3, Uo$2 = 128, ke$4 = 127;
function Pt$3(t, r2) {
  var n3 = 0, r2 = r2 || 0, o3 = 0, s2 = r2, a2, u2 = t.length;
  do {
    if (s2 >= u2) throw Pt$3.bytes = 0, new RangeError("Could not decode varint");
    a2 = t[s2++], n3 += o3 < 28 ? (a2 & ke$4) << o3 : (a2 & ke$4) * Math.pow(2, o3), o3 += 7;
  } while (a2 >= Uo$2);
  return Pt$3.bytes = s2 - r2, n3;
}
var To$2 = Math.pow(2, 7), Fo$1 = Math.pow(2, 14), No$2 = Math.pow(2, 21), Lo$2 = Math.pow(2, 28), Oo$2 = Math.pow(2, 35), Ho$1 = Math.pow(2, 42), zo$1 = Math.pow(2, 49), Mo$1 = Math.pow(2, 56), qo$1 = Math.pow(2, 63), $o$2 = function(t) {
  return t < To$2 ? 1 : t < Fo$1 ? 2 : t < No$2 ? 3 : t < Lo$2 ? 4 : t < Oo$2 ? 5 : t < Ho$1 ? 6 : t < zo$1 ? 7 : t < Mo$1 ? 8 : t < qo$1 ? 9 : 10;
}, ko$1 = { encode: mo$2, decode: Io$2, encodingLength: $o$2 }, Re$1 = ko$1;
const je$3 = (t, e2, n3 = 0) => (Re$1.encode(t, e2, n3), e2), Ze$3 = (t) => Re$1.encodingLength(t), Qt$3 = (t, e2) => {
  const n3 = e2.byteLength, r2 = Ze$3(t), o3 = r2 + Ze$3(n3), s2 = new Uint8Array(o3 + n3);
  return je$3(t, s2, 0), je$3(n3, s2, r2), s2.set(e2, o3), new Ro$2(t, n3, e2, s2);
};
let Ro$2 = class Ro {
  constructor(e2, n3, r2, o3) {
    this.code = e2, this.size = n3, this.digest = r2, this.bytes = o3;
  }
};
const Ge$4 = ({ name: t, code: e2, encode: n3 }) => new jo$1(t, e2, n3);
let jo$1 = class jo {
  constructor(e2, n3, r2) {
    this.name = e2, this.code = n3, this.encode = r2;
  }
  digest(e2) {
    if (e2 instanceof Uint8Array) {
      const n3 = this.encode(e2);
      return n3 instanceof Uint8Array ? Qt$3(this.code, n3) : n3.then((r2) => Qt$3(this.code, r2));
    } else throw Error("Unknown type, must be binary type");
  }
};
const Ve$3 = (t) => async (e2) => new Uint8Array(await crypto.subtle.digest(t, e2)), Zo$1 = Ge$4({ name: "sha2-256", code: 18, encode: Ve$3("SHA-256") }), Go$2 = Ge$4({ name: "sha2-512", code: 19, encode: Ve$3("SHA-512") });
var Vo$1 = Object.freeze({ __proto__: null, sha256: Zo$1, sha512: Go$2 });
const Ye$3 = 0, Yo$2 = "identity", Je$3 = He$3, Jo$2 = (t) => Qt$3(Ye$3, Je$3(t)), Ko$2 = { code: Ye$3, name: Yo$2, encode: Je$3, digest: Jo$2 };
var Wo$2 = Object.freeze({ __proto__: null, identity: Ko$2 });
new TextEncoder(), new TextDecoder();
const Ke$4 = { ...kr$2, ...jr$2, ...Gr$2, ...Yr$2, ...Wr$2, ...io$2, ...ao$2, ...ho$2, ...Eo$2, ...Ao$2 };
({ ...Vo$1, ...Wo$2 });
function We$3(t, e2, n3, r2) {
  return { name: t, prefix: e2, encoder: { name: t, prefix: e2, encode: n3 }, decoder: { decode: r2 } };
}
const Xe$3 = We$3("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1))), te$2 = We$3("ascii", "a", (t) => {
  let e2 = "a";
  for (let n3 = 0; n3 < t.length; n3++) e2 += String.fromCharCode(t[n3]);
  return e2;
}, (t) => {
  t = t.substring(1);
  const e2 = Le$3(t.length);
  for (let n3 = 0; n3 < t.length; n3++) e2[n3] = t.charCodeAt(n3);
  return e2;
}), Pe$2 = { utf8: Xe$3, "utf-8": Xe$3, hex: Ke$4.base16, latin1: te$2, ascii: te$2, binary: te$2, ...Ke$4 };
function ct$2(t, e2 = "utf8") {
  const n3 = Pe$2[e2];
  if (!n3) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : n3.encoder.encode(t).substring(1);
}
function rt$1(t, e2 = "utf8") {
  const n3 = Pe$2[e2];
  if (!n3) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Xt$3(globalThis.Buffer.from(t, "utf-8")) : n3.decoder.decode(`${n3.prefix}${t}`);
}
function lt$2(t) {
  return safeJsonParse(ct$2(rt$1(t, Dt$2), Gt$2));
}
function bt$2(t) {
  return ct$2(rt$1(safeJsonStringify(t), Gt$2), Dt$2);
}
function Qe$3(t) {
  const e2 = rt$1(Wt$3, dt$3), n3 = Kt$3 + ct$2(Oe$2([e2, t]), dt$3);
  return [Yt$2, Jt$3, n3].join(Vt$3);
}
function en$2(t) {
  return ct$2(t, Dt$2);
}
function nn$2(t) {
  return rt$1(t, Dt$2);
}
function rn$2(t) {
  return rt$1([bt$2(t.header), bt$2(t.payload)].join(ut$3), xt$3);
}
function on$2(t) {
  return [bt$2(t.header), bt$2(t.payload), en$2(t.signature)].join(ut$3);
}
function sn$2(t) {
  const e2 = t.split(ut$3), n3 = lt$2(e2[0]), r2 = lt$2(e2[1]), o3 = nn$2(e2[2]), s2 = rt$1(e2.slice(0, 2).join(ut$3), xt$3);
  return { header: n3, payload: r2, signature: o3, data: s2 };
}
function Po$1(t = he$3(Ne$2)) {
  const e2 = Rt$3.getPublicKey(t);
  return { secretKey: Oe$2([t, e2]), publicKey: e2 };
}
async function Qo(t, e2, n3, r2, o3 = cjs$3.fromMiliseconds(Date.now())) {
  const s2 = { alg: jt$3, typ: Zt$2 }, a2 = Qe$3(r2.publicKey), u2 = o3 + n3, i3 = { iss: a2, sub: t, aud: e2, iat: o3, exp: u2 }, D2 = rn$2({ header: s2, payload: i3 }), c2 = Rt$3.sign(D2, r2.secretKey.slice(0, 32));
  return on$2({ header: s2, payload: i3, signature: c2 });
}
function allocUnsafe(size2 = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(size2);
  }
  return new Uint8Array(size2);
}
function concat(arrays, length) {
  if (!length) {
    length = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}
function base(ALPHABET2, name) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j2 = 0; j2 < BASE_MAP.length; j2++) {
    BASE_MAP[j2] = 255;
  }
  for (var i3 = 0; i3 < ALPHABET2.length; i3++) {
    var x2 = ALPHABET2.charAt(i3);
    var xc2 = x2.charCodeAt(0);
    if (BASE_MAP[xc2] !== 255) {
      throw new TypeError(x2 + " is ambiguous");
    }
    BASE_MAP[xc2] = i3;
  }
  var BASE = ALPHABET2.length;
  var LEADER = ALPHABET2.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array) ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size2 = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size2);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i4 = 0;
      for (var it1 = size2 - 1; (carry !== 0 || i4 < length) && it1 !== -1; it1--, i4++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length = i4;
      pbegin++;
    }
    var it2 = size2 - length;
    while (it2 !== size2 && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size2; ++it2) {
      str += ALPHABET2.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size2 = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size2);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i4 = 0;
      for (var it3 = size2 - 1; (carry !== 0 || i4 < length) && it3 !== -1; it3--, i4++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length = i4;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size2 - length;
    while (it4 !== size2 && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size2 - it4));
    var j3 = zeroes;
    while (it4 !== size2) {
      vch[j3++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
const coerce = (o3) => {
  if (o3 instanceof Uint8Array && o3.constructor.name === "Uint8Array")
    return o3;
  if (o3 instanceof ArrayBuffer)
    return new Uint8Array(o3);
  if (ArrayBuffer.isView(o3)) {
    return new Uint8Array(o3.buffer, o3.byteOffset, o3.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
const fromString$1 = (str) => new TextEncoder().encode(str);
const toString$1 = (b2) => new TextDecoder().decode(b2);
class Encoder {
  constructor(name, prefix, baseEncode) {
    this.name = name;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder {
  constructor(name, prefix, baseDecode) {
    this.name = name;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or$2(this, decoder);
  }
}
class ComposedDecoder {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    return or$2(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or$2 = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec {
  constructor(name, prefix, baseEncode, baseDecode) {
    this.name = name;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name, prefix, baseEncode);
    this.decoder = new Decoder(name, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from = ({ name, prefix, encode: encode2, decode: decode2 }) => new Codec(name, prefix, encode2, decode2);
const baseX = ({ prefix, name, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX(alphabet2, name);
  return from({
    prefix,
    name,
    encode: encode2,
    decode: (text) => coerce(decode2(text))
  });
};
const decode$1 = (string2, alphabet2, bitsPerChar, name) => {
  const codes = {};
  for (let i3 = 0; i3 < alphabet2.length; ++i3) {
    codes[alphabet2[i3]] = i3;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i3 = 0; i3 < end; ++i3) {
    const value = codes[string2[i3]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$1 = (data, alphabet2, bitsPerChar) => {
  const pad2 = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i3 = 0; i3 < data.length; ++i3) {
    buffer = buffer << 8 | data[i3];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad2) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648 = ({ name, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from({
    prefix,
    name,
    encode(input) {
      return encode$1(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$1(input, alphabet2, bitsPerChar, name);
    }
  });
};
const identity = from({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString$1(buf),
  decode: (str) => fromString$1(str)
});
const identityBase = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity
}, Symbol.toStringTag, { value: "Module" }));
const base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});
const base2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2
}, Symbol.toStringTag, { value: "Module" }));
const base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});
const base8$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8
}, Symbol.toStringTag, { value: "Module" }));
const base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});
const base10$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10
}, Symbol.toStringTag, { value: "Module" }));
const base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
const base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});
const base16$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16,
  base16upper
}, Symbol.toStringTag, { value: "Module" }));
const base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
const base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
const base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
const base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
const base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
const base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
const base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
const base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
const base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
const base32$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32,
  base32hex,
  base32hexpad,
  base32hexpadupper,
  base32hexupper,
  base32pad,
  base32padupper,
  base32upper,
  base32z
}, Symbol.toStringTag, { value: "Module" }));
const base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
const base36$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36,
  base36upper
}, Symbol.toStringTag, { value: "Module" }));
const base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc,
  base58flickr
}, Symbol.toStringTag, { value: "Module" }));
const base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
const base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
const base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
const base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
const base64$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64,
  base64pad,
  base64url,
  base64urlpad
}, Symbol.toStringTag, { value: "Module" }));
const alphabet = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
const alphabetBytesToChars = alphabet.reduce((p2, c2, i3) => {
  p2[i3] = c2;
  return p2;
}, []);
const alphabetCharsToBytes = alphabet.reduce((p2, c2, i3) => {
  p2[c2.codePointAt(0)] = i3;
  return p2;
}, []);
function encode(data) {
  return data.reduce((p2, c2) => {
    p2 += alphabetBytesToChars[c2];
    return p2;
  }, "");
}
function decode(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
const base256emoji = from({
  prefix: "🚀",
  name: "base256emoji",
  encode,
  decode
});
const base256emoji$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const bases = {
  ...identityBase,
  ...base2$1,
  ...base8$1,
  ...base10$1,
  ...base16$1,
  ...base32$1,
  ...base36$1,
  ...base58,
  ...base64$1,
  ...base256emoji$1
};
function createCodec(name, prefix, encode2, decode2) {
  return {
    name,
    prefix,
    encoder: {
      name,
      prefix,
      encode: encode2
    },
    decoder: { decode: decode2 }
  };
}
const string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder2 = new TextEncoder();
  return encoder2.encode(str.substring(1));
});
const ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i3 = 0; i3 < buf.length; i3++) {
    string2 += String.fromCharCode(buf[i3]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i3 = 0; i3 < str.length; i3++) {
    buf[i3] = str.charCodeAt(i3);
  }
  return buf;
});
const BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
function fromString(string2, encoding = "utf8") {
  const base3 = BASES[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(string2, "utf8");
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
function toString(array, encoding = "utf8") {
  const base3 = BASES[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}
const C$4 = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } };
var define_process_env_default$1 = {};
const ae$2 = ":";
function Ne$1(t) {
  const [e2, n3] = t.split(ae$2);
  return { namespace: e2, reference: n3 };
}
function Ko$1(t, e2 = []) {
  const n3 = [];
  return Object.keys(t).forEach((r2) => {
    if (e2.length && !e2.includes(r2)) return;
    const o3 = t[r2];
    n3.push(...o3.accounts);
  }), n3;
}
function ue$2(t, e2) {
  return t.includes(":") ? [t] : e2.chains || [];
}
var Zo = Object.defineProperty, Yo$1 = Object.defineProperties, Go$1 = Object.getOwnPropertyDescriptors, Tn$1 = Object.getOwnPropertySymbols, Wo$1 = Object.prototype.hasOwnProperty, Xo$1 = Object.prototype.propertyIsEnumerable, Rn$1 = (t, e2, n3) => e2 in t ? Zo(t, e2, { enumerable: true, configurable: true, writable: true, value: n3 }) : t[e2] = n3, _n$1 = (t, e2) => {
  for (var n3 in e2 || (e2 = {})) Wo$1.call(e2, n3) && Rn$1(t, n3, e2[n3]);
  if (Tn$1) for (var n3 of Tn$1(e2)) Xo$1.call(e2, n3) && Rn$1(t, n3, e2[n3]);
  return t;
}, Jo$1 = (t, e2) => Yo$1(t, Go$1(e2));
const $n$1 = "ReactNative", Y$3 = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, jn$1 = "js";
function _e$3() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function pt$2() {
  return !getDocument_1() && !!getNavigator_1() && navigator.product === $n$1;
}
function ei$1() {
  return pt$2() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function ni$1() {
  return pt$2() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function Tt$2() {
  return !_e$3() && !!getNavigator_1() && !!getDocument_1();
}
function xt$2() {
  return pt$2() ? Y$3.reactNative : _e$3() ? Y$3.node : Tt$2() ? Y$3.browser : Y$3.unknown;
}
function ri$1() {
  var t;
  try {
    return pt$2() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (t = global.Application) == null ? void 0 : t.applicationId : void 0;
  } catch {
    return;
  }
}
function Cn$1(t, e2) {
  const n3 = new URLSearchParams(t);
  for (const r2 of Object.keys(e2).sort()) if (e2.hasOwnProperty(r2)) {
    const o3 = e2[r2];
    o3 !== void 0 && n3.set(r2, o3);
  }
  return n3.toString();
}
function oi$1(t) {
  var e2, n3;
  const r2 = Pn$1();
  try {
    return t != null && t.url && r2.url && new URL(t.url).host !== new URL(r2.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${t.url} differs from the actual page url:${r2.url}. This is probably unintended and can lead to issues.`), t.url = r2.url), (e2 = t == null ? void 0 : t.icons) != null && e2.length && t.icons.length > 0 && (t.icons = t.icons.filter((o3) => o3 !== "")), Jo$1(_n$1(_n$1({}, r2), t), { url: (t == null ? void 0 : t.url) || r2.url, name: (t == null ? void 0 : t.name) || r2.name, description: (t == null ? void 0 : t.description) || r2.description, icons: (n3 = t == null ? void 0 : t.icons) != null && n3.length && t.icons.length > 0 ? t.icons : r2.icons });
  } catch (o3) {
    return console.warn("Error populating app metadata", o3), t || r2;
  }
}
function Pn$1() {
  return getWindowMetadata_1() || { name: "", description: "", url: "", icons: [""] };
}
function kn$1() {
  if (xt$2() === Y$3.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: n3, Version: r2 } = global.Platform;
    return [n3, r2].join("-");
  }
  const t = detect();
  if (t === null) return "unknown";
  const e2 = t.os ? t.os.replace(" ", "").toLowerCase() : "unknown";
  return t.type === "browser" ? [e2, t.name, t.version].join("-") : [e2, t.version].join("-");
}
function Vn$1() {
  var t;
  const e2 = xt$2();
  return e2 === Y$3.browser ? [e2, ((t = getLocation_1()) == null ? void 0 : t.host) || "unknown"].join(":") : e2;
}
function Mn$1(t, e2, n3) {
  const r2 = kn$1(), o3 = Vn$1();
  return [[t, e2].join("-"), [jn$1, n3].join("-"), r2, o3].join("/");
}
function si$1({ protocol: t, version: e2, relayUrl: n3, sdkVersion: r2, auth: o3, projectId: i3, useOnCloseEvent: s2, bundleId: c2, packageName: a2 }) {
  const u2 = n3.split("?"), l2 = Mn$1(t, e2, r2), f5 = { auth: o3, ua: l2, projectId: i3, useOnCloseEvent: s2 || void 0, packageName: a2 || void 0, bundleId: c2 || void 0 }, h4 = Cn$1(u2[1] || "", f5);
  return u2[0] + "?" + h4;
}
function gt$2(t, e2) {
  return t.filter((n3) => e2.includes(n3)).length === t.length;
}
function fi$1(t) {
  return Object.fromEntries(t.entries());
}
function li$1(t) {
  return new Map(Object.entries(t));
}
function gi$1(t = cjs$3.FIVE_MINUTES, e2) {
  const n3 = cjs$3.toMiliseconds(t || cjs$3.FIVE_MINUTES);
  let r2, o3, i3, s2;
  return { resolve: (c2) => {
    i3 && r2 && (clearTimeout(i3), r2(c2), s2 = Promise.resolve(c2));
  }, reject: (c2) => {
    i3 && o3 && (clearTimeout(i3), o3(c2));
  }, done: () => new Promise((c2, a2) => {
    if (s2) return c2(s2);
    i3 = setTimeout(() => {
      const u2 = new Error(e2);
      s2 = Promise.reject(u2), a2(u2);
    }, n3), r2 = c2, o3 = a2;
  }) };
}
function yi$1(t, e2, n3) {
  return new Promise(async (r2, o3) => {
    const i3 = setTimeout(() => o3(new Error(n3)), e2);
    try {
      const s2 = await t;
      r2(s2);
    } catch (s2) {
      o3(s2);
    }
    clearTimeout(i3);
  });
}
function $e$2(t, e2) {
  if (typeof e2 == "string" && e2.startsWith(`${t}:`)) return e2;
  if (t.toLowerCase() === "topic") {
    if (typeof e2 != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e2}`;
  } else if (t.toLowerCase() === "id") {
    if (typeof e2 != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e2}`;
  }
  throw new Error(`Unknown expirer target type: ${t}`);
}
function mi$1(t) {
  return $e$2("topic", t);
}
function wi$1(t) {
  return $e$2("id", t);
}
function bi$1(t) {
  const [e2, n3] = t.split(":"), r2 = { id: void 0, topic: void 0 };
  if (e2 === "topic" && typeof n3 == "string") r2.topic = n3;
  else if (e2 === "id" && Number.isInteger(Number(n3))) r2.id = Number(n3);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${e2}:${n3}`);
  return r2;
}
function Ei$1(t, e2) {
  return cjs$3.fromMiliseconds(Date.now() + cjs$3.toMiliseconds(t));
}
function vi$1(t) {
  return Date.now() >= cjs$3.toMiliseconds(t);
}
function xi$1(t, e2) {
  return `${t}${e2 ? `:${e2}` : ""}`;
}
function ot$1(t = [], e2 = []) {
  return [.../* @__PURE__ */ new Set([...t, ...e2])];
}
async function Si$1({ id: t, topic: e2, wcDeepLink: n3 }) {
  var r2;
  try {
    if (!n3) return;
    const o3 = typeof n3 == "string" ? JSON.parse(n3) : n3, i3 = o3 == null ? void 0 : o3.href;
    if (typeof i3 != "string") return;
    const s2 = Kn$1(i3, t, e2), c2 = xt$2();
    if (c2 === Y$3.browser) {
      if (!((r2 = getDocument_1()) != null && r2.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      Fn$1(s2);
    } else c2 === Y$3.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(s2);
  } catch (o3) {
    console.error(o3);
  }
}
function Kn$1(t, e2, n3) {
  const r2 = `requestId=${e2}&sessionTopic=${n3}`;
  t.endsWith("/") && (t = t.slice(0, -1));
  let o3 = `${t}`;
  if (t.startsWith("https://t.me")) {
    const i3 = t.includes("?") ? "&startapp=" : "?startapp=";
    o3 = `${o3}${i3}${Yn$1(r2, true)}`;
  } else o3 = `${o3}/wc?${r2}`;
  return o3;
}
function Fn$1(t) {
  let e2 = "_self";
  Zn$1() ? e2 = "_top" : (zn$1() || t.startsWith("https://") || t.startsWith("http://")) && (e2 = "_blank"), window.open(t, e2, "noreferrer noopener");
}
async function Oi$1(t, e2) {
  let n3 = "";
  try {
    if (Tt$2() && (n3 = localStorage.getItem(e2), n3)) return n3;
    n3 = await t.getItem(e2);
  } catch (r2) {
    console.error(r2);
  }
  return n3;
}
function Ai$1(t, e2) {
  if (!t.includes(e2)) return null;
  const n3 = t.split(/([&,?,=])/), r2 = n3.indexOf(e2);
  return n3[r2 + 2];
}
function Bi$1() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t) => {
    const e2 = Math.random() * 16 | 0;
    return (t === "x" ? e2 : e2 & 3 | 8).toString(16);
  });
}
function Ii$1() {
  return typeof process < "u" && define_process_env_default$1.IS_VITEST === "true";
}
function zn$1() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function Zn$1() {
  try {
    return window.self !== window.top;
  } catch {
    return false;
  }
}
function Yn$1(t, e2 = false) {
  const n3 = Buffer.from(t).toString("base64");
  return e2 ? n3.replace(/[=]/g, "") : n3;
}
function je$2(t) {
  return Buffer.from(t, "base64").toString("utf-8");
}
function Ni$1(t) {
  return new Promise((e2) => setTimeout(e2, t));
}
function Wt$2(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function Ui$1(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Xt$2(t, ...e2) {
  if (!Ui$1(t)) throw new Error("Uint8Array expected");
  if (e2.length > 0 && !e2.includes(t.length)) throw new Error("Uint8Array expected of length " + e2 + ", got length=" + t.length);
}
function Ce$1(t) {
  if (typeof t != "function" || typeof t.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Wt$2(t.outputLen), Wt$2(t.blockLen);
}
function Rt$2(t, e2 = true) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e2 && t.finished) throw new Error("Hash#digest() has already been called");
}
function Gn$1(t, e2) {
  Xt$2(t);
  const n3 = e2.outputLen;
  if (t.length < n3) throw new Error("digestInto() expects output buffer of length at least " + n3);
}
const le$2 = BigInt(2 ** 32 - 1), Wn$1 = BigInt(32);
function Ti$1(t, e2 = false) {
  return e2 ? { h: Number(t & le$2), l: Number(t >> Wn$1 & le$2) } : { h: Number(t >> Wn$1 & le$2) | 0, l: Number(t & le$2) | 0 };
}
function Ri$1(t, e2 = false) {
  let n3 = new Uint32Array(t.length), r2 = new Uint32Array(t.length);
  for (let o3 = 0; o3 < t.length; o3++) {
    const { h: i3, l: s2 } = Ti$1(t[o3], e2);
    [n3[o3], r2[o3]] = [i3, s2];
  }
  return [n3, r2];
}
const _i$1 = (t, e2, n3) => t << n3 | e2 >>> 32 - n3, $i$1 = (t, e2, n3) => e2 << n3 | t >>> 32 - n3, Li$1 = (t, e2, n3) => e2 << n3 - 32 | t >>> 64 - n3, ji$1 = (t, e2, n3) => t << n3 - 32 | e2 >>> 64 - n3, _t$2 = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function Ci$1(t) {
  return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function Pe$1(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
function ct$1(t, e2) {
  return t << 32 - e2 | t >>> e2;
}
const Xn$1 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Pi$1(t) {
  return t << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;
}
function Jn$1(t) {
  for (let e2 = 0; e2 < t.length; e2++) t[e2] = Pi$1(t[e2]);
}
function ki$1(t) {
  if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function $t$1(t) {
  return typeof t == "string" && (t = ki$1(t)), Xt$2(t), t;
}
function Vi$1(...t) {
  let e2 = 0;
  for (let r2 = 0; r2 < t.length; r2++) {
    const o3 = t[r2];
    Xt$2(o3), e2 += o3.length;
  }
  const n3 = new Uint8Array(e2);
  for (let r2 = 0, o3 = 0; r2 < t.length; r2++) {
    const i3 = t[r2];
    n3.set(i3, o3), o3 += i3.length;
  }
  return n3;
}
let ke$3 = class ke {
  clone() {
    return this._cloneInto();
  }
};
function Qn$1(t) {
  const e2 = (r2) => t().update($t$1(r2)).digest(), n3 = t();
  return e2.outputLen = n3.outputLen, e2.blockLen = n3.blockLen, e2.create = () => t(), e2;
}
function Lt$2(t = 32) {
  if (_t$2 && typeof _t$2.getRandomValues == "function") return _t$2.getRandomValues(new Uint8Array(t));
  if (_t$2 && typeof _t$2.randomBytes == "function") return _t$2.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
const tr$1 = [], er$1 = [], nr$1 = [], Mi$1 = BigInt(0), Jt$2 = BigInt(1), Di$1 = BigInt(2), Hi = BigInt(7), qi$1 = BigInt(256), Ki$1 = BigInt(113);
for (let t = 0, e2 = Jt$2, n3 = 1, r2 = 0; t < 24; t++) {
  [n3, r2] = [r2, (2 * n3 + 3 * r2) % 5], tr$1.push(2 * (5 * r2 + n3)), er$1.push((t + 1) * (t + 2) / 2 % 64);
  let o3 = Mi$1;
  for (let i3 = 0; i3 < 7; i3++) e2 = (e2 << Jt$2 ^ (e2 >> Hi) * Ki$1) % qi$1, e2 & Di$1 && (o3 ^= Jt$2 << (Jt$2 << BigInt(i3)) - Jt$2);
  nr$1.push(o3);
}
const [Fi$1, zi$1] = Ri$1(nr$1, true), rr$1 = (t, e2, n3) => n3 > 32 ? Li$1(t, e2, n3) : _i$1(t, e2, n3), or$1 = (t, e2, n3) => n3 > 32 ? ji$1(t, e2, n3) : $i$1(t, e2, n3);
function Zi(t, e2 = 24) {
  const n3 = new Uint32Array(10);
  for (let r2 = 24 - e2; r2 < 24; r2++) {
    for (let s2 = 0; s2 < 10; s2++) n3[s2] = t[s2] ^ t[s2 + 10] ^ t[s2 + 20] ^ t[s2 + 30] ^ t[s2 + 40];
    for (let s2 = 0; s2 < 10; s2 += 2) {
      const c2 = (s2 + 8) % 10, a2 = (s2 + 2) % 10, u2 = n3[a2], l2 = n3[a2 + 1], f5 = rr$1(u2, l2, 1) ^ n3[c2], h4 = or$1(u2, l2, 1) ^ n3[c2 + 1];
      for (let y3 = 0; y3 < 50; y3 += 10) t[s2 + y3] ^= f5, t[s2 + y3 + 1] ^= h4;
    }
    let o3 = t[2], i3 = t[3];
    for (let s2 = 0; s2 < 24; s2++) {
      const c2 = er$1[s2], a2 = rr$1(o3, i3, c2), u2 = or$1(o3, i3, c2), l2 = tr$1[s2];
      o3 = t[l2], i3 = t[l2 + 1], t[l2] = a2, t[l2 + 1] = u2;
    }
    for (let s2 = 0; s2 < 50; s2 += 10) {
      for (let c2 = 0; c2 < 10; c2++) n3[c2] = t[s2 + c2];
      for (let c2 = 0; c2 < 10; c2++) t[s2 + c2] ^= ~n3[(c2 + 2) % 10] & n3[(c2 + 4) % 10];
    }
    t[0] ^= Fi$1[r2], t[1] ^= zi$1[r2];
  }
  n3.fill(0);
}
let En$1 = class En extends ke$3 {
  constructor(e2, n3, r2, o3 = false, i3 = 24) {
    if (super(), this.blockLen = e2, this.suffix = n3, this.outputLen = r2, this.enableXOF = o3, this.rounds = i3, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, Wt$2(r2), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ci$1(this.state);
  }
  keccak() {
    Xn$1 || Jn$1(this.state32), Zi(this.state32, this.rounds), Xn$1 || Jn$1(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e2) {
    Rt$2(this);
    const { blockLen: n3, state: r2 } = this;
    e2 = $t$1(e2);
    const o3 = e2.length;
    for (let i3 = 0; i3 < o3; ) {
      const s2 = Math.min(n3 - this.pos, o3 - i3);
      for (let c2 = 0; c2 < s2; c2++) r2[this.pos++] ^= e2[i3++];
      this.pos === n3 && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = true;
    const { state: e2, suffix: n3, pos: r2, blockLen: o3 } = this;
    e2[r2] ^= n3, (n3 & 128) !== 0 && r2 === o3 - 1 && this.keccak(), e2[o3 - 1] ^= 128, this.keccak();
  }
  writeInto(e2) {
    Rt$2(this, false), Xt$2(e2), this.finish();
    const n3 = this.state, { blockLen: r2 } = this;
    for (let o3 = 0, i3 = e2.length; o3 < i3; ) {
      this.posOut >= r2 && this.keccak();
      const s2 = Math.min(r2 - this.posOut, i3 - o3);
      e2.set(n3.subarray(this.posOut, this.posOut + s2), o3), this.posOut += s2, o3 += s2;
    }
    return e2;
  }
  xofInto(e2) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(e2);
  }
  xof(e2) {
    return Wt$2(e2), this.xofInto(new Uint8Array(e2));
  }
  digestInto(e2) {
    if (Gn$1(e2, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(e2), this.destroy(), e2;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, this.state.fill(0);
  }
  _cloneInto(e2) {
    const { blockLen: n3, suffix: r2, outputLen: o3, rounds: i3, enableXOF: s2 } = this;
    return e2 || (e2 = new En(n3, r2, o3, s2, i3)), e2.state32.set(this.state32), e2.pos = this.pos, e2.posOut = this.posOut, e2.finished = this.finished, e2.rounds = i3, e2.suffix = r2, e2.outputLen = o3, e2.enableXOF = s2, e2.destroyed = this.destroyed, e2;
  }
};
const Yi = (t, e2, n3) => Qn$1(() => new En$1(e2, t, n3)), Gi = Yi(1, 136, 256 / 8), Wi = "https://rpc.walletconnect.org/v1";
function Ve$2(t) {
  const e2 = `Ethereum Signed Message:
${t.length}`, n3 = new TextEncoder().encode(e2 + t);
  return "0x" + Buffer.from(Gi(n3)).toString("hex");
}
async function ir$1(t, e2, n3, r2, o3, i3) {
  switch (n3.t) {
    case "eip191":
      return await sr$1(t, e2, n3.s);
    case "eip1271":
      return await cr$1(t, e2, n3.s, r2, o3, i3);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${n3.t}`);
  }
}
async function sr$1(t, e2, n3) {
  return (await recoverAddress({ hash: Ve$2(e2), signature: n3 })).toLowerCase() === t.toLowerCase();
}
async function cr$1(t, e2, n3, r2, o3, i3) {
  const s2 = Ne$1(r2);
  if (!s2.namespace || !s2.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r2}`);
  try {
    const c2 = "0x1626ba7e", a2 = "0000000000000000000000000000000000000000000000000000000000000040", u2 = "0000000000000000000000000000000000000000000000000000000000000041", l2 = n3.substring(2), f5 = Ve$2(e2).substring(2), h4 = c2 + f5 + a2 + u2 + l2, y3 = await fetch(`${i3 || Wi}/?chainId=${r2}&projectId=${o3}`, { method: "POST", body: JSON.stringify({ id: Xi(), jsonrpc: "2.0", method: "eth_call", params: [{ to: t, data: h4 }, "latest"] }) }), { result: E2 } = await y3.json();
    return E2 ? E2.slice(0, c2.length).toLowerCase() === c2.toLowerCase() : false;
  } catch (c2) {
    return console.error("isValidEip1271Signature: ", c2), false;
  }
}
function Xi() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function Ji(t) {
  const e2 = atob(t), n3 = new Uint8Array(e2.length);
  for (let s2 = 0; s2 < e2.length; s2++) n3[s2] = e2.charCodeAt(s2);
  const r2 = n3[0];
  if (r2 === 0) throw new Error("No signatures found");
  const o3 = 1 + r2 * 64;
  if (n3.length < o3) throw new Error("Transaction data too short for claimed signature count");
  if (n3.length < 100) throw new Error("Transaction too short");
  const i3 = Buffer.from(t, "base64").slice(1, 65);
  return Vo$2.encode(i3);
}
var Qi = Object.defineProperty, ts$1 = Object.defineProperties, es$1 = Object.getOwnPropertyDescriptors, ar$1 = Object.getOwnPropertySymbols, ns = Object.prototype.hasOwnProperty, rs = Object.prototype.propertyIsEnumerable, ur$1 = (t, e2, n3) => e2 in t ? Qi(t, e2, { enumerable: true, configurable: true, writable: true, value: n3 }) : t[e2] = n3, Me$3 = (t, e2) => {
  for (var n3 in e2 || (e2 = {})) ns.call(e2, n3) && ur$1(t, n3, e2[n3]);
  if (ar$1) for (var n3 of ar$1(e2)) rs.call(e2, n3) && ur$1(t, n3, e2[n3]);
  return t;
}, fr$1 = (t, e2) => ts$1(t, es$1(e2));
const os = "did:pkh:", de$2 = (t) => t == null ? void 0 : t.split(":"), lr$1 = (t) => {
  const e2 = t && de$2(t);
  if (e2) return t.includes(os) ? e2[3] : e2[1];
}, dr$1 = (t) => {
  const e2 = t && de$2(t);
  if (e2) return e2[2] + ":" + e2[3];
}, De$2 = (t) => {
  const e2 = t && de$2(t);
  if (e2) return e2.pop();
};
async function is(t) {
  const { cacao: e2, projectId: n3 } = t, { s: r2, p: o3 } = e2, i3 = hr$1(o3, o3.iss), s2 = De$2(o3.iss);
  return await ir$1(s2, i3, r2, dr$1(o3.iss), n3);
}
const hr$1 = (t, e2) => {
  const n3 = `${t.domain} wants you to sign in with your Ethereum account:`, r2 = De$2(e2);
  if (!t.aud && !t.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let o3 = t.statement || void 0;
  const i3 = `URI: ${t.aud || t.uri}`, s2 = `Version: ${t.version}`, c2 = `Chain ID: ${lr$1(e2)}`, a2 = `Nonce: ${t.nonce}`, u2 = `Issued At: ${t.iat}`, l2 = t.exp ? `Expiration Time: ${t.exp}` : void 0, f5 = t.nbf ? `Not Before: ${t.nbf}` : void 0, h4 = t.requestId ? `Request ID: ${t.requestId}` : void 0, y3 = t.resources ? `Resources:${t.resources.map((p2) => `
- ${p2}`).join("")}` : void 0, E2 = pe$2(t.resources);
  if (E2) {
    const p2 = yt$2(E2);
    o3 = Ke$3(o3, p2);
  }
  return [n3, r2, "", o3, "", i3, s2, c2, a2, u2, l2, f5, h4, y3].filter((p2) => p2 != null).join(`
`);
};
function mr$1(t) {
  return Buffer.from(JSON.stringify(t)).toString("base64");
}
function wr$1(t) {
  return JSON.parse(Buffer.from(t, "base64").toString("utf-8"));
}
function at$1(t) {
  if (!t) throw new Error("No recap provided, value is undefined");
  if (!t.att) throw new Error("No `att` property found");
  const e2 = Object.keys(t.att);
  if (!(e2 != null && e2.length)) throw new Error("No resources found in `att` property");
  e2.forEach((n3) => {
    const r2 = t.att[n3];
    if (Array.isArray(r2)) throw new Error(`Resource must be an object: ${n3}`);
    if (typeof r2 != "object") throw new Error(`Resource must be an object: ${n3}`);
    if (!Object.keys(r2).length) throw new Error(`Resource object is empty: ${n3}`);
    Object.keys(r2).forEach((o3) => {
      const i3 = r2[o3];
      if (!Array.isArray(i3)) throw new Error(`Ability limits ${o3} must be an array of objects, found: ${i3}`);
      if (!i3.length) throw new Error(`Value of ${o3} is empty array, must be an array with objects`);
      i3.forEach((s2) => {
        if (typeof s2 != "object") throw new Error(`Ability limits (${o3}) must be an array of objects, found: ${s2}`);
      });
    });
  });
}
function br$1(t, e2, n3, r2 = {}) {
  return n3 == null ? void 0 : n3.sort((o3, i3) => o3.localeCompare(i3)), { att: { [t]: He$2(e2, n3, r2) } };
}
function He$2(t, e2, n3 = {}) {
  e2 = e2 == null ? void 0 : e2.sort((o3, i3) => o3.localeCompare(i3));
  const r2 = e2.map((o3) => ({ [`${t}/${o3}`]: [n3] }));
  return Object.assign({}, ...r2);
}
function he$2(t) {
  return at$1(t), `urn:recap:${mr$1(t).replace(/=/g, "")}`;
}
function yt$2(t) {
  const e2 = wr$1(t.replace("urn:recap:", ""));
  return at$1(e2), e2;
}
function fs(t, e2, n3) {
  const r2 = br$1(t, e2, n3);
  return he$2(r2);
}
function qe$2(t) {
  return t && t.includes("urn:recap:");
}
function ls(t, e2) {
  const n3 = yt$2(t), r2 = yt$2(e2), o3 = vr$1(n3, r2);
  return he$2(o3);
}
function vr$1(t, e2) {
  at$1(t), at$1(e2);
  const n3 = Object.keys(t.att).concat(Object.keys(e2.att)).sort((o3, i3) => o3.localeCompare(i3)), r2 = { att: {} };
  return n3.forEach((o3) => {
    var i3, s2;
    Object.keys(((i3 = t.att) == null ? void 0 : i3[o3]) || {}).concat(Object.keys(((s2 = e2.att) == null ? void 0 : s2[o3]) || {})).sort((c2, a2) => c2.localeCompare(a2)).forEach((c2) => {
      var a2, u2;
      r2.att[o3] = fr$1(Me$3({}, r2.att[o3]), { [c2]: ((a2 = t.att[o3]) == null ? void 0 : a2[c2]) || ((u2 = e2.att[o3]) == null ? void 0 : u2[c2]) });
    });
  }), r2;
}
function Ke$3(t = "", e2) {
  at$1(e2);
  const n3 = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (t.includes(n3)) return t;
  const r2 = [];
  let o3 = 0;
  Object.keys(e2.att).forEach((c2) => {
    const a2 = Object.keys(e2.att[c2]).map((f5) => ({ ability: f5.split("/")[0], action: f5.split("/")[1] }));
    a2.sort((f5, h4) => f5.action.localeCompare(h4.action));
    const u2 = {};
    a2.forEach((f5) => {
      u2[f5.ability] || (u2[f5.ability] = []), u2[f5.ability].push(f5.action);
    });
    const l2 = Object.keys(u2).map((f5) => (o3++, `(${o3}) '${f5}': '${u2[f5].join("', '")}' for '${c2}'.`));
    r2.push(l2.join(", ").replace(".,", "."));
  });
  const i3 = r2.join(" "), s2 = `${n3}${i3}`;
  return `${t ? t + " " : ""}${s2}`;
}
function ds(t) {
  var e2;
  const n3 = yt$2(t);
  at$1(n3);
  const r2 = (e2 = n3.att) == null ? void 0 : e2.eip155;
  return r2 ? Object.keys(r2).map((o3) => o3.split("/")[1]) : [];
}
function hs(t) {
  const e2 = yt$2(t);
  at$1(e2);
  const n3 = [];
  return Object.values(e2.att).forEach((r2) => {
    Object.values(r2).forEach((o3) => {
      var i3;
      (i3 = o3 == null ? void 0 : o3[0]) != null && i3.chains && n3.push(o3[0].chains);
    });
  }), [...new Set(n3.flat())];
}
function pe$2(t) {
  if (!t) return;
  const e2 = t == null ? void 0 : t[t.length - 1];
  return qe$2(e2) ? e2 : void 0;
}
function Fe$2(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function Sr$1(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function tt$1(t, ...e2) {
  if (!Sr$1(t)) throw new Error("Uint8Array expected");
  if (e2.length > 0 && !e2.includes(t.length)) throw new Error("Uint8Array expected of length " + e2 + ", got length=" + t.length);
}
function Or$1(t, e2 = true) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e2 && t.finished) throw new Error("Hash#digest() has already been called");
}
function ps(t, e2) {
  tt$1(t);
  const n3 = e2.outputLen;
  if (t.length < n3) throw new Error("digestInto() expects output buffer of length at least " + n3);
}
function Ar$1(t) {
  if (typeof t != "boolean") throw new Error(`boolean expected, not ${t}`);
}
const mt$2 = (t) => new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)), gs = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength), ys = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!ys) throw new Error("Non little-endian hardware is not supported");
function ms(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
function ze$2(t) {
  if (typeof t == "string") t = ms(t);
  else if (Sr$1(t)) t = Ze$2(t);
  else throw new Error("Uint8Array expected, got " + typeof t);
  return t;
}
function ws(t, e2) {
  if (e2 == null || typeof e2 != "object") throw new Error("options must be defined");
  return Object.assign(t, e2);
}
function bs$1(t, e2) {
  if (t.length !== e2.length) return false;
  let n3 = 0;
  for (let r2 = 0; r2 < t.length; r2++) n3 |= t[r2] ^ e2[r2];
  return n3 === 0;
}
const Es = (t, e2) => {
  function n3(r2, ...o3) {
    if (tt$1(r2), t.nonceLength !== void 0) {
      const l2 = o3[0];
      if (!l2) throw new Error("nonce / iv required");
      t.varSizeNonce ? tt$1(l2) : tt$1(l2, t.nonceLength);
    }
    const i3 = t.tagLength;
    i3 && o3[1] !== void 0 && tt$1(o3[1]);
    const s2 = e2(r2, ...o3), c2 = (l2, f5) => {
      if (f5 !== void 0) {
        if (l2 !== 2) throw new Error("cipher output not supported");
        tt$1(f5);
      }
    };
    let a2 = false;
    return { encrypt(l2, f5) {
      if (a2) throw new Error("cannot encrypt() twice with same key + nonce");
      return a2 = true, tt$1(l2), c2(s2.encrypt.length, f5), s2.encrypt(l2, f5);
    }, decrypt(l2, f5) {
      if (tt$1(l2), i3 && l2.length < i3) throw new Error("invalid ciphertext length: smaller than tagLength=" + i3);
      return c2(s2.decrypt.length, f5), s2.decrypt(l2, f5);
    } };
  }
  return Object.assign(n3, t), n3;
};
function Br$1(t, e2, n3 = true) {
  if (e2 === void 0) return new Uint8Array(t);
  if (e2.length !== t) throw new Error("invalid output length, expected " + t + ", got: " + e2.length);
  if (n3 && !vs$1(e2)) throw new Error("invalid output, must be aligned");
  return e2;
}
function Ir$1(t, e2, n3, r2) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e2, n3, r2);
  const o3 = BigInt(32), i3 = BigInt(4294967295), s2 = Number(n3 >> o3 & i3), c2 = Number(n3 & i3), a2 = 4, u2 = 0;
  t.setUint32(e2 + a2, s2, r2), t.setUint32(e2 + u2, c2, r2);
}
function vs$1(t) {
  return t.byteOffset % 4 === 0;
}
function Ze$2(t) {
  return Uint8Array.from(t);
}
function jt$2(...t) {
  for (let e2 = 0; e2 < t.length; e2++) t[e2].fill(0);
}
const Nr$1 = (t) => Uint8Array.from(t.split("").map((e2) => e2.charCodeAt(0))), xs$1 = Nr$1("expand 16-byte k"), Ss = Nr$1("expand 32-byte k"), Os$1 = mt$2(xs$1), As$1 = mt$2(Ss);
function V$4(t, e2) {
  return t << e2 | t >>> 32 - e2;
}
function Ye$2(t) {
  return t.byteOffset % 4 === 0;
}
const ge$2 = 64, Bs = 16, Ur$1 = 2 ** 32 - 1, Tr$1 = new Uint32Array();
function Is$1(t, e2, n3, r2, o3, i3, s2, c2) {
  const a2 = o3.length, u2 = new Uint8Array(ge$2), l2 = mt$2(u2), f5 = Ye$2(o3) && Ye$2(i3), h4 = f5 ? mt$2(o3) : Tr$1, y3 = f5 ? mt$2(i3) : Tr$1;
  for (let E2 = 0; E2 < a2; s2++) {
    if (t(e2, n3, r2, l2, s2, c2), s2 >= Ur$1) throw new Error("arx: counter overflow");
    const p2 = Math.min(ge$2, a2 - E2);
    if (f5 && p2 === ge$2) {
      const d4 = E2 / 4;
      if (E2 % 4 !== 0) throw new Error("arx: invalid block position");
      for (let v2 = 0, m3; v2 < Bs; v2++) m3 = d4 + v2, y3[m3] = h4[m3] ^ l2[v2];
      E2 += ge$2;
      continue;
    }
    for (let d4 = 0, v2; d4 < p2; d4++) v2 = E2 + d4, i3[v2] = o3[v2] ^ u2[d4];
    E2 += p2;
  }
}
function Ns$1(t, e2) {
  const { allowShortKeys: n3, extendNonceFn: r2, counterLength: o3, counterRight: i3, rounds: s2 } = ws({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, e2);
  if (typeof t != "function") throw new Error("core must be a function");
  return Fe$2(o3), Fe$2(s2), Ar$1(i3), Ar$1(n3), (c2, a2, u2, l2, f5 = 0) => {
    tt$1(c2), tt$1(a2), tt$1(u2);
    const h4 = u2.length;
    if (l2 === void 0 && (l2 = new Uint8Array(h4)), tt$1(l2), Fe$2(f5), f5 < 0 || f5 >= Ur$1) throw new Error("arx: counter overflow");
    if (l2.length < h4) throw new Error(`arx: output (${l2.length}) is shorter than data (${h4})`);
    const y3 = [];
    let E2 = c2.length, p2, d4;
    if (E2 === 32) y3.push(p2 = Ze$2(c2)), d4 = As$1;
    else if (E2 === 16 && n3) p2 = new Uint8Array(32), p2.set(c2), p2.set(c2, 16), d4 = Os$1, y3.push(p2);
    else throw new Error(`arx: invalid 32-byte key, got length=${E2}`);
    Ye$2(a2) || y3.push(a2 = Ze$2(a2));
    const v2 = mt$2(p2);
    if (r2) {
      if (a2.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      r2(d4, v2, mt$2(a2.subarray(0, 16)), v2), a2 = a2.subarray(16);
    }
    const m3 = 16 - o3;
    if (m3 !== a2.length) throw new Error(`arx: nonce must be ${m3} or 16 bytes`);
    if (m3 !== 12) {
      const N2 = new Uint8Array(12);
      N2.set(a2, i3 ? 0 : 12 - a2.length), a2 = N2, y3.push(a2);
    }
    const O4 = mt$2(a2);
    return Is$1(t, d4, v2, O4, u2, l2, f5, s2), jt$2(...y3), l2;
  };
}
const F$3 = (t, e2) => t[e2++] & 255 | (t[e2++] & 255) << 8;
class Us {
  constructor(e2) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = false, e2 = ze$2(e2), tt$1(e2, 32);
    const n3 = F$3(e2, 0), r2 = F$3(e2, 2), o3 = F$3(e2, 4), i3 = F$3(e2, 6), s2 = F$3(e2, 8), c2 = F$3(e2, 10), a2 = F$3(e2, 12), u2 = F$3(e2, 14);
    this.r[0] = n3 & 8191, this.r[1] = (n3 >>> 13 | r2 << 3) & 8191, this.r[2] = (r2 >>> 10 | o3 << 6) & 7939, this.r[3] = (o3 >>> 7 | i3 << 9) & 8191, this.r[4] = (i3 >>> 4 | s2 << 12) & 255, this.r[5] = s2 >>> 1 & 8190, this.r[6] = (s2 >>> 14 | c2 << 2) & 8191, this.r[7] = (c2 >>> 11 | a2 << 5) & 8065, this.r[8] = (a2 >>> 8 | u2 << 8) & 8191, this.r[9] = u2 >>> 5 & 127;
    for (let l2 = 0; l2 < 8; l2++) this.pad[l2] = F$3(e2, 16 + 2 * l2);
  }
  process(e2, n3, r2 = false) {
    const o3 = r2 ? 0 : 2048, { h: i3, r: s2 } = this, c2 = s2[0], a2 = s2[1], u2 = s2[2], l2 = s2[3], f5 = s2[4], h4 = s2[5], y3 = s2[6], E2 = s2[7], p2 = s2[8], d4 = s2[9], v2 = F$3(e2, n3 + 0), m3 = F$3(e2, n3 + 2), O4 = F$3(e2, n3 + 4), N2 = F$3(e2, n3 + 6), $2 = F$3(e2, n3 + 8), B4 = F$3(e2, n3 + 10), A2 = F$3(e2, n3 + 12), T2 = F$3(e2, n3 + 14);
    let S3 = i3[0] + (v2 & 8191), L3 = i3[1] + ((v2 >>> 13 | m3 << 3) & 8191), U2 = i3[2] + ((m3 >>> 10 | O4 << 6) & 8191), _3 = i3[3] + ((O4 >>> 7 | N2 << 9) & 8191), j2 = i3[4] + ((N2 >>> 4 | $2 << 12) & 8191), g2 = i3[5] + ($2 >>> 1 & 8191), w2 = i3[6] + (($2 >>> 14 | B4 << 2) & 8191), b2 = i3[7] + ((B4 >>> 11 | A2 << 5) & 8191), I3 = i3[8] + ((A2 >>> 8 | T2 << 8) & 8191), R3 = i3[9] + (T2 >>> 5 | o3), x2 = 0, C2 = x2 + S3 * c2 + L3 * (5 * d4) + U2 * (5 * p2) + _3 * (5 * E2) + j2 * (5 * y3);
    x2 = C2 >>> 13, C2 &= 8191, C2 += g2 * (5 * h4) + w2 * (5 * f5) + b2 * (5 * l2) + I3 * (5 * u2) + R3 * (5 * a2), x2 += C2 >>> 13, C2 &= 8191;
    let P3 = x2 + S3 * a2 + L3 * c2 + U2 * (5 * d4) + _3 * (5 * p2) + j2 * (5 * E2);
    x2 = P3 >>> 13, P3 &= 8191, P3 += g2 * (5 * y3) + w2 * (5 * h4) + b2 * (5 * f5) + I3 * (5 * l2) + R3 * (5 * u2), x2 += P3 >>> 13, P3 &= 8191;
    let k2 = x2 + S3 * u2 + L3 * a2 + U2 * c2 + _3 * (5 * d4) + j2 * (5 * p2);
    x2 = k2 >>> 13, k2 &= 8191, k2 += g2 * (5 * E2) + w2 * (5 * y3) + b2 * (5 * h4) + I3 * (5 * f5) + R3 * (5 * l2), x2 += k2 >>> 13, k2 &= 8191;
    let M3 = x2 + S3 * l2 + L3 * u2 + U2 * a2 + _3 * c2 + j2 * (5 * d4);
    x2 = M3 >>> 13, M3 &= 8191, M3 += g2 * (5 * p2) + w2 * (5 * E2) + b2 * (5 * y3) + I3 * (5 * h4) + R3 * (5 * f5), x2 += M3 >>> 13, M3 &= 8191;
    let D2 = x2 + S3 * f5 + L3 * l2 + U2 * u2 + _3 * a2 + j2 * c2;
    x2 = D2 >>> 13, D2 &= 8191, D2 += g2 * (5 * d4) + w2 * (5 * p2) + b2 * (5 * E2) + I3 * (5 * y3) + R3 * (5 * h4), x2 += D2 >>> 13, D2 &= 8191;
    let z2 = x2 + S3 * h4 + L3 * f5 + U2 * l2 + _3 * u2 + j2 * a2;
    x2 = z2 >>> 13, z2 &= 8191, z2 += g2 * c2 + w2 * (5 * d4) + b2 * (5 * p2) + I3 * (5 * E2) + R3 * (5 * y3), x2 += z2 >>> 13, z2 &= 8191;
    let Z2 = x2 + S3 * y3 + L3 * h4 + U2 * f5 + _3 * l2 + j2 * u2;
    x2 = Z2 >>> 13, Z2 &= 8191, Z2 += g2 * a2 + w2 * c2 + b2 * (5 * d4) + I3 * (5 * p2) + R3 * (5 * E2), x2 += Z2 >>> 13, Z2 &= 8191;
    let st2 = x2 + S3 * E2 + L3 * y3 + U2 * h4 + _3 * f5 + j2 * l2;
    x2 = st2 >>> 13, st2 &= 8191, st2 += g2 * u2 + w2 * a2 + b2 * c2 + I3 * (5 * d4) + R3 * (5 * p2), x2 += st2 >>> 13, st2 &= 8191;
    let W2 = x2 + S3 * p2 + L3 * E2 + U2 * y3 + _3 * h4 + j2 * f5;
    x2 = W2 >>> 13, W2 &= 8191, W2 += g2 * l2 + w2 * u2 + b2 * a2 + I3 * c2 + R3 * (5 * d4), x2 += W2 >>> 13, W2 &= 8191;
    let J3 = x2 + S3 * d4 + L3 * p2 + U2 * E2 + _3 * y3 + j2 * h4;
    x2 = J3 >>> 13, J3 &= 8191, J3 += g2 * f5 + w2 * l2 + b2 * u2 + I3 * a2 + R3 * c2, x2 += J3 >>> 13, J3 &= 8191, x2 = (x2 << 2) + x2 | 0, x2 = x2 + C2 | 0, C2 = x2 & 8191, x2 = x2 >>> 13, P3 += x2, i3[0] = C2, i3[1] = P3, i3[2] = k2, i3[3] = M3, i3[4] = D2, i3[5] = z2, i3[6] = Z2, i3[7] = st2, i3[8] = W2, i3[9] = J3;
  }
  finalize() {
    const { h: e2, pad: n3 } = this, r2 = new Uint16Array(10);
    let o3 = e2[1] >>> 13;
    e2[1] &= 8191;
    for (let c2 = 2; c2 < 10; c2++) e2[c2] += o3, o3 = e2[c2] >>> 13, e2[c2] &= 8191;
    e2[0] += o3 * 5, o3 = e2[0] >>> 13, e2[0] &= 8191, e2[1] += o3, o3 = e2[1] >>> 13, e2[1] &= 8191, e2[2] += o3, r2[0] = e2[0] + 5, o3 = r2[0] >>> 13, r2[0] &= 8191;
    for (let c2 = 1; c2 < 10; c2++) r2[c2] = e2[c2] + o3, o3 = r2[c2] >>> 13, r2[c2] &= 8191;
    r2[9] -= 8192;
    let i3 = (o3 ^ 1) - 1;
    for (let c2 = 0; c2 < 10; c2++) r2[c2] &= i3;
    i3 = ~i3;
    for (let c2 = 0; c2 < 10; c2++) e2[c2] = e2[c2] & i3 | r2[c2];
    e2[0] = (e2[0] | e2[1] << 13) & 65535, e2[1] = (e2[1] >>> 3 | e2[2] << 10) & 65535, e2[2] = (e2[2] >>> 6 | e2[3] << 7) & 65535, e2[3] = (e2[3] >>> 9 | e2[4] << 4) & 65535, e2[4] = (e2[4] >>> 12 | e2[5] << 1 | e2[6] << 14) & 65535, e2[5] = (e2[6] >>> 2 | e2[7] << 11) & 65535, e2[6] = (e2[7] >>> 5 | e2[8] << 8) & 65535, e2[7] = (e2[8] >>> 8 | e2[9] << 5) & 65535;
    let s2 = e2[0] + n3[0];
    e2[0] = s2 & 65535;
    for (let c2 = 1; c2 < 8; c2++) s2 = (e2[c2] + n3[c2] | 0) + (s2 >>> 16) | 0, e2[c2] = s2 & 65535;
    jt$2(r2);
  }
  update(e2) {
    Or$1(this);
    const { buffer: n3, blockLen: r2 } = this;
    e2 = ze$2(e2);
    const o3 = e2.length;
    for (let i3 = 0; i3 < o3; ) {
      const s2 = Math.min(r2 - this.pos, o3 - i3);
      if (s2 === r2) {
        for (; r2 <= o3 - i3; i3 += r2) this.process(e2, i3);
        continue;
      }
      n3.set(e2.subarray(i3, i3 + s2), this.pos), this.pos += s2, i3 += s2, this.pos === r2 && (this.process(n3, 0, false), this.pos = 0);
    }
    return this;
  }
  destroy() {
    jt$2(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(e2) {
    Or$1(this), ps(e2, this), this.finished = true;
    const { buffer: n3, h: r2 } = this;
    let { pos: o3 } = this;
    if (o3) {
      for (n3[o3++] = 1; o3 < 16; o3++) n3[o3] = 0;
      this.process(n3, 0, true);
    }
    this.finalize();
    let i3 = 0;
    for (let s2 = 0; s2 < 8; s2++) e2[i3++] = r2[s2] >>> 0, e2[i3++] = r2[s2] >>> 8;
    return e2;
  }
  digest() {
    const { buffer: e2, outputLen: n3 } = this;
    this.digestInto(e2);
    const r2 = e2.slice(0, n3);
    return this.destroy(), r2;
  }
}
function Ts$1(t) {
  const e2 = (r2, o3) => t(o3).update(ze$2(r2)).digest(), n3 = t(new Uint8Array(32));
  return e2.outputLen = n3.outputLen, e2.blockLen = n3.blockLen, e2.create = (r2) => t(r2), e2;
}
const Rs = Ts$1((t) => new Us(t));
function _s(t, e2, n3, r2, o3, i3 = 20) {
  let s2 = t[0], c2 = t[1], a2 = t[2], u2 = t[3], l2 = e2[0], f5 = e2[1], h4 = e2[2], y3 = e2[3], E2 = e2[4], p2 = e2[5], d4 = e2[6], v2 = e2[7], m3 = o3, O4 = n3[0], N2 = n3[1], $2 = n3[2], B4 = s2, A2 = c2, T2 = a2, S3 = u2, L3 = l2, U2 = f5, _3 = h4, j2 = y3, g2 = E2, w2 = p2, b2 = d4, I3 = v2, R3 = m3, x2 = O4, C2 = N2, P3 = $2;
  for (let M3 = 0; M3 < i3; M3 += 2) B4 = B4 + L3 | 0, R3 = V$4(R3 ^ B4, 16), g2 = g2 + R3 | 0, L3 = V$4(L3 ^ g2, 12), B4 = B4 + L3 | 0, R3 = V$4(R3 ^ B4, 8), g2 = g2 + R3 | 0, L3 = V$4(L3 ^ g2, 7), A2 = A2 + U2 | 0, x2 = V$4(x2 ^ A2, 16), w2 = w2 + x2 | 0, U2 = V$4(U2 ^ w2, 12), A2 = A2 + U2 | 0, x2 = V$4(x2 ^ A2, 8), w2 = w2 + x2 | 0, U2 = V$4(U2 ^ w2, 7), T2 = T2 + _3 | 0, C2 = V$4(C2 ^ T2, 16), b2 = b2 + C2 | 0, _3 = V$4(_3 ^ b2, 12), T2 = T2 + _3 | 0, C2 = V$4(C2 ^ T2, 8), b2 = b2 + C2 | 0, _3 = V$4(_3 ^ b2, 7), S3 = S3 + j2 | 0, P3 = V$4(P3 ^ S3, 16), I3 = I3 + P3 | 0, j2 = V$4(j2 ^ I3, 12), S3 = S3 + j2 | 0, P3 = V$4(P3 ^ S3, 8), I3 = I3 + P3 | 0, j2 = V$4(j2 ^ I3, 7), B4 = B4 + U2 | 0, P3 = V$4(P3 ^ B4, 16), b2 = b2 + P3 | 0, U2 = V$4(U2 ^ b2, 12), B4 = B4 + U2 | 0, P3 = V$4(P3 ^ B4, 8), b2 = b2 + P3 | 0, U2 = V$4(U2 ^ b2, 7), A2 = A2 + _3 | 0, R3 = V$4(R3 ^ A2, 16), I3 = I3 + R3 | 0, _3 = V$4(_3 ^ I3, 12), A2 = A2 + _3 | 0, R3 = V$4(R3 ^ A2, 8), I3 = I3 + R3 | 0, _3 = V$4(_3 ^ I3, 7), T2 = T2 + j2 | 0, x2 = V$4(x2 ^ T2, 16), g2 = g2 + x2 | 0, j2 = V$4(j2 ^ g2, 12), T2 = T2 + j2 | 0, x2 = V$4(x2 ^ T2, 8), g2 = g2 + x2 | 0, j2 = V$4(j2 ^ g2, 7), S3 = S3 + L3 | 0, C2 = V$4(C2 ^ S3, 16), w2 = w2 + C2 | 0, L3 = V$4(L3 ^ w2, 12), S3 = S3 + L3 | 0, C2 = V$4(C2 ^ S3, 8), w2 = w2 + C2 | 0, L3 = V$4(L3 ^ w2, 7);
  let k2 = 0;
  r2[k2++] = s2 + B4 | 0, r2[k2++] = c2 + A2 | 0, r2[k2++] = a2 + T2 | 0, r2[k2++] = u2 + S3 | 0, r2[k2++] = l2 + L3 | 0, r2[k2++] = f5 + U2 | 0, r2[k2++] = h4 + _3 | 0, r2[k2++] = y3 + j2 | 0, r2[k2++] = E2 + g2 | 0, r2[k2++] = p2 + w2 | 0, r2[k2++] = d4 + b2 | 0, r2[k2++] = v2 + I3 | 0, r2[k2++] = m3 + R3 | 0, r2[k2++] = O4 + x2 | 0, r2[k2++] = N2 + C2 | 0, r2[k2++] = $2 + P3 | 0;
}
const $s = Ns$1(_s, { counterRight: false, counterLength: 4, allowShortKeys: false }), Ls$1 = new Uint8Array(16), Rr$1 = (t, e2) => {
  t.update(e2);
  const n3 = e2.length % 16;
  n3 && t.update(Ls$1.subarray(n3));
}, js = new Uint8Array(32);
function _r$1(t, e2, n3, r2, o3) {
  const i3 = t(e2, n3, js), s2 = Rs.create(i3);
  o3 && Rr$1(s2, o3), Rr$1(s2, r2);
  const c2 = new Uint8Array(16), a2 = gs(c2);
  Ir$1(a2, 0, BigInt(o3 ? o3.length : 0), true), Ir$1(a2, 8, BigInt(r2.length), true), s2.update(c2);
  const u2 = s2.digest();
  return jt$2(i3, c2), u2;
}
const Cs$1 = (t) => (e2, n3, r2) => ({ encrypt(i3, s2) {
  const c2 = i3.length;
  s2 = Br$1(c2 + 16, s2, false), s2.set(i3);
  const a2 = s2.subarray(0, -16);
  t(e2, n3, a2, a2, 1);
  const u2 = _r$1(t, e2, n3, a2, r2);
  return s2.set(u2, c2), jt$2(u2), s2;
}, decrypt(i3, s2) {
  s2 = Br$1(i3.length - 16, s2, false);
  const c2 = i3.subarray(0, -16), a2 = i3.subarray(-16), u2 = _r$1(t, e2, n3, c2, r2);
  if (!bs$1(a2, u2)) throw new Error("invalid tag");
  return s2.set(i3.subarray(0, -16)), t(e2, n3, s2, s2, 1), jt$2(u2), s2;
} }), $r$1 = Es({ blockSize: 64, nonceLength: 12, tagLength: 16 }, Cs$1($s));
let Lr$1 = class Lr2 extends ke$3 {
  constructor(e2, n3) {
    super(), this.finished = false, this.destroyed = false, Ce$1(e2);
    const r2 = $t$1(n3);
    if (this.iHash = e2.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const o3 = this.blockLen, i3 = new Uint8Array(o3);
    i3.set(r2.length > o3 ? e2.create().update(r2).digest() : r2);
    for (let s2 = 0; s2 < i3.length; s2++) i3[s2] ^= 54;
    this.iHash.update(i3), this.oHash = e2.create();
    for (let s2 = 0; s2 < i3.length; s2++) i3[s2] ^= 106;
    this.oHash.update(i3), i3.fill(0);
  }
  update(e2) {
    return Rt$2(this), this.iHash.update(e2), this;
  }
  digestInto(e2) {
    Rt$2(this), Xt$2(e2, this.outputLen), this.finished = true, this.iHash.digestInto(e2), this.oHash.update(e2), this.oHash.digestInto(e2), this.destroy();
  }
  digest() {
    const e2 = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e2), e2;
  }
  _cloneInto(e2) {
    e2 || (e2 = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n3, iHash: r2, finished: o3, destroyed: i3, blockLen: s2, outputLen: c2 } = this;
    return e2 = e2, e2.finished = o3, e2.destroyed = i3, e2.blockLen = s2, e2.outputLen = c2, e2.oHash = n3._cloneInto(e2.oHash), e2.iHash = r2._cloneInto(e2.iHash), e2;
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
};
const ye$2 = (t, e2, n3) => new Lr$1(t, e2).update(n3).digest();
ye$2.create = (t, e2) => new Lr$1(t, e2);
function Ps$1(t, e2, n3) {
  return Ce$1(t), n3 === void 0 && (n3 = new Uint8Array(t.outputLen)), ye$2(t, $t$1(n3), $t$1(e2));
}
const Ge$3 = new Uint8Array([0]), jr$1 = new Uint8Array();
function ks$1(t, e2, n3, r2 = 32) {
  if (Ce$1(t), Wt$2(r2), r2 > 255 * t.outputLen) throw new Error("Length should be <= 255*HashLen");
  const o3 = Math.ceil(r2 / t.outputLen);
  n3 === void 0 && (n3 = jr$1);
  const i3 = new Uint8Array(o3 * t.outputLen), s2 = ye$2.create(t, e2), c2 = s2._cloneInto(), a2 = new Uint8Array(s2.outputLen);
  for (let u2 = 0; u2 < o3; u2++) Ge$3[0] = u2 + 1, c2.update(u2 === 0 ? jr$1 : a2).update(n3).update(Ge$3).digestInto(a2), i3.set(a2, t.outputLen * u2), s2._cloneInto(c2);
  return s2.destroy(), c2.destroy(), a2.fill(0), Ge$3.fill(0), i3.slice(0, r2);
}
const Vs$1 = (t, e2, n3, r2, o3) => ks$1(t, Ps$1(t, e2, n3), r2, o3);
function Ms$1(t, e2, n3, r2) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e2, n3, r2);
  const o3 = BigInt(32), i3 = BigInt(4294967295), s2 = Number(n3 >> o3 & i3), c2 = Number(n3 & i3), a2 = r2 ? 4 : 0, u2 = r2 ? 0 : 4;
  t.setUint32(e2 + a2, s2, r2), t.setUint32(e2 + u2, c2, r2);
}
function Ds$1(t, e2, n3) {
  return t & e2 ^ ~t & n3;
}
function Hs(t, e2, n3) {
  return t & e2 ^ t & n3 ^ e2 & n3;
}
let qs$1 = class qs extends ke$3 {
  constructor(e2, n3, r2, o3) {
    super(), this.blockLen = e2, this.outputLen = n3, this.padOffset = r2, this.isLE = o3, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e2), this.view = Pe$1(this.buffer);
  }
  update(e2) {
    Rt$2(this);
    const { view: n3, buffer: r2, blockLen: o3 } = this;
    e2 = $t$1(e2);
    const i3 = e2.length;
    for (let s2 = 0; s2 < i3; ) {
      const c2 = Math.min(o3 - this.pos, i3 - s2);
      if (c2 === o3) {
        const a2 = Pe$1(e2);
        for (; o3 <= i3 - s2; s2 += o3) this.process(a2, s2);
        continue;
      }
      r2.set(e2.subarray(s2, s2 + c2), this.pos), this.pos += c2, s2 += c2, this.pos === o3 && (this.process(n3, 0), this.pos = 0);
    }
    return this.length += e2.length, this.roundClean(), this;
  }
  digestInto(e2) {
    Rt$2(this), Gn$1(e2, this), this.finished = true;
    const { buffer: n3, view: r2, blockLen: o3, isLE: i3 } = this;
    let { pos: s2 } = this;
    n3[s2++] = 128, this.buffer.subarray(s2).fill(0), this.padOffset > o3 - s2 && (this.process(r2, 0), s2 = 0);
    for (let f5 = s2; f5 < o3; f5++) n3[f5] = 0;
    Ms$1(r2, o3 - 8, BigInt(this.length * 8), i3), this.process(r2, 0);
    const c2 = Pe$1(e2), a2 = this.outputLen;
    if (a2 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u2 = a2 / 4, l2 = this.get();
    if (u2 > l2.length) throw new Error("_sha2: outputLen bigger than state");
    for (let f5 = 0; f5 < u2; f5++) c2.setUint32(4 * f5, l2[f5], i3);
  }
  digest() {
    const { buffer: e2, outputLen: n3 } = this;
    this.digestInto(e2);
    const r2 = e2.slice(0, n3);
    return this.destroy(), r2;
  }
  _cloneInto(e2) {
    e2 || (e2 = new this.constructor()), e2.set(...this.get());
    const { blockLen: n3, buffer: r2, length: o3, finished: i3, destroyed: s2, pos: c2 } = this;
    return e2.length = o3, e2.pos = c2, e2.finished = i3, e2.destroyed = s2, o3 % n3 && e2.buffer.set(r2), e2;
  }
};
const Ks = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), wt$2 = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), bt$1 = new Uint32Array(64);
class Fs extends qs$1 {
  constructor() {
    super(64, 32, 8, false), this.A = wt$2[0] | 0, this.B = wt$2[1] | 0, this.C = wt$2[2] | 0, this.D = wt$2[3] | 0, this.E = wt$2[4] | 0, this.F = wt$2[5] | 0, this.G = wt$2[6] | 0, this.H = wt$2[7] | 0;
  }
  get() {
    const { A: e2, B: n3, C: r2, D: o3, E: i3, F: s2, G: c2, H: a2 } = this;
    return [e2, n3, r2, o3, i3, s2, c2, a2];
  }
  set(e2, n3, r2, o3, i3, s2, c2, a2) {
    this.A = e2 | 0, this.B = n3 | 0, this.C = r2 | 0, this.D = o3 | 0, this.E = i3 | 0, this.F = s2 | 0, this.G = c2 | 0, this.H = a2 | 0;
  }
  process(e2, n3) {
    for (let f5 = 0; f5 < 16; f5++, n3 += 4) bt$1[f5] = e2.getUint32(n3, false);
    for (let f5 = 16; f5 < 64; f5++) {
      const h4 = bt$1[f5 - 15], y3 = bt$1[f5 - 2], E2 = ct$1(h4, 7) ^ ct$1(h4, 18) ^ h4 >>> 3, p2 = ct$1(y3, 17) ^ ct$1(y3, 19) ^ y3 >>> 10;
      bt$1[f5] = p2 + bt$1[f5 - 7] + E2 + bt$1[f5 - 16] | 0;
    }
    let { A: r2, B: o3, C: i3, D: s2, E: c2, F: a2, G: u2, H: l2 } = this;
    for (let f5 = 0; f5 < 64; f5++) {
      const h4 = ct$1(c2, 6) ^ ct$1(c2, 11) ^ ct$1(c2, 25), y3 = l2 + h4 + Ds$1(c2, a2, u2) + Ks[f5] + bt$1[f5] | 0, p2 = (ct$1(r2, 2) ^ ct$1(r2, 13) ^ ct$1(r2, 22)) + Hs(r2, o3, i3) | 0;
      l2 = u2, u2 = a2, a2 = c2, c2 = s2 + y3 | 0, s2 = i3, i3 = o3, o3 = r2, r2 = y3 + p2 | 0;
    }
    r2 = r2 + this.A | 0, o3 = o3 + this.B | 0, i3 = i3 + this.C | 0, s2 = s2 + this.D | 0, c2 = c2 + this.E | 0, a2 = a2 + this.F | 0, u2 = u2 + this.G | 0, l2 = l2 + this.H | 0, this.set(r2, o3, i3, s2, c2, a2, u2, l2);
  }
  roundClean() {
    bt$1.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Qt$2 = Qn$1(() => new Fs());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const me$2 = BigInt(0), we$2 = BigInt(1), zs = BigInt(2);
function St$3(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function te$1(t) {
  if (!St$3(t)) throw new Error("Uint8Array expected");
}
function Ct$1(t, e2) {
  if (typeof e2 != "boolean") throw new Error(t + " boolean expected, got " + e2);
}
const Zs$1 = Array.from({ length: 256 }, (t, e2) => e2.toString(16).padStart(2, "0"));
function Pt$2(t) {
  te$1(t);
  let e2 = "";
  for (let n3 = 0; n3 < t.length; n3++) e2 += Zs$1[t[n3]];
  return e2;
}
function kt$2(t) {
  const e2 = t.toString(16);
  return e2.length & 1 ? "0" + e2 : e2;
}
function We$2(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? me$2 : BigInt("0x" + t);
}
const ut$2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Cr$1(t) {
  if (t >= ut$2._0 && t <= ut$2._9) return t - ut$2._0;
  if (t >= ut$2.A && t <= ut$2.F) return t - (ut$2.A - 10);
  if (t >= ut$2.a && t <= ut$2.f) return t - (ut$2.a - 10);
}
function Vt$2(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  const e2 = t.length, n3 = e2 / 2;
  if (e2 % 2) throw new Error("hex string expected, got unpadded hex of length " + e2);
  const r2 = new Uint8Array(n3);
  for (let o3 = 0, i3 = 0; o3 < n3; o3++, i3 += 2) {
    const s2 = Cr$1(t.charCodeAt(i3)), c2 = Cr$1(t.charCodeAt(i3 + 1));
    if (s2 === void 0 || c2 === void 0) {
      const a2 = t[i3] + t[i3 + 1];
      throw new Error('hex string expected, got non-hex character "' + a2 + '" at index ' + i3);
    }
    r2[o3] = s2 * 16 + c2;
  }
  return r2;
}
function Ot$2(t) {
  return We$2(Pt$2(t));
}
function ee$1(t) {
  return te$1(t), We$2(Pt$2(Uint8Array.from(t).reverse()));
}
function Mt$2(t, e2) {
  return Vt$2(t.toString(16).padStart(e2 * 2, "0"));
}
function be$2(t, e2) {
  return Mt$2(t, e2).reverse();
}
function Ys(t) {
  return Vt$2(kt$2(t));
}
function et$2(t, e2, n3) {
  let r2;
  if (typeof e2 == "string") try {
    r2 = Vt$2(e2);
  } catch (i3) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + i3);
  }
  else if (St$3(e2)) r2 = Uint8Array.from(e2);
  else throw new Error(t + " must be hex string or Uint8Array");
  const o3 = r2.length;
  if (typeof n3 == "number" && o3 !== n3) throw new Error(t + " of length " + n3 + " expected, got " + o3);
  return r2;
}
function ne$2(...t) {
  let e2 = 0;
  for (let r2 = 0; r2 < t.length; r2++) {
    const o3 = t[r2];
    te$1(o3), e2 += o3.length;
  }
  const n3 = new Uint8Array(e2);
  for (let r2 = 0, o3 = 0; r2 < t.length; r2++) {
    const i3 = t[r2];
    n3.set(i3, o3), o3 += i3.length;
  }
  return n3;
}
function Gs(t, e2) {
  if (t.length !== e2.length) return false;
  let n3 = 0;
  for (let r2 = 0; r2 < t.length; r2++) n3 |= t[r2] ^ e2[r2];
  return n3 === 0;
}
function Ws(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
const Xe$2 = (t) => typeof t == "bigint" && me$2 <= t;
function Ee$3(t, e2, n3) {
  return Xe$2(t) && Xe$2(e2) && Xe$2(n3) && e2 <= t && t < n3;
}
function ft$2(t, e2, n3, r2) {
  if (!Ee$3(e2, n3, r2)) throw new Error("expected valid " + t + ": " + n3 + " <= n < " + r2 + ", got " + e2);
}
function Pr$1(t) {
  let e2;
  for (e2 = 0; t > me$2; t >>= we$2, e2 += 1) ;
  return e2;
}
function Xs(t, e2) {
  return t >> BigInt(e2) & we$2;
}
function Js(t, e2, n3) {
  return t | (n3 ? we$2 : me$2) << BigInt(e2);
}
const Je$2 = (t) => (zs << BigInt(t - 1)) - we$2, Qe$2 = (t) => new Uint8Array(t), kr$1 = (t) => Uint8Array.from(t);
function Vr$1(t, e2, n3) {
  if (typeof t != "number" || t < 2) throw new Error("hashLen must be a number");
  if (typeof e2 != "number" || e2 < 2) throw new Error("qByteLen must be a number");
  if (typeof n3 != "function") throw new Error("hmacFn must be a function");
  let r2 = Qe$2(t), o3 = Qe$2(t), i3 = 0;
  const s2 = () => {
    r2.fill(1), o3.fill(0), i3 = 0;
  }, c2 = (...f5) => n3(o3, r2, ...f5), a2 = (f5 = Qe$2()) => {
    o3 = c2(kr$1([0]), f5), r2 = c2(), f5.length !== 0 && (o3 = c2(kr$1([1]), f5), r2 = c2());
  }, u2 = () => {
    if (i3++ >= 1e3) throw new Error("drbg: tried 1000 values");
    let f5 = 0;
    const h4 = [];
    for (; f5 < e2; ) {
      r2 = c2();
      const y3 = r2.slice();
      h4.push(y3), f5 += r2.length;
    }
    return ne$2(...h4);
  };
  return (f5, h4) => {
    s2(), a2(f5);
    let y3;
    for (; !(y3 = h4(u2())); ) a2();
    return s2(), y3;
  };
}
const Qs = { bigint: (t) => typeof t == "bigint", function: (t) => typeof t == "function", boolean: (t) => typeof t == "boolean", string: (t) => typeof t == "string", stringOrUint8Array: (t) => typeof t == "string" || St$3(t), isSafeInteger: (t) => Number.isSafeInteger(t), array: (t) => Array.isArray(t), field: (t, e2) => e2.Fp.isValid(t), hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen) };
function Dt$1(t, e2, n3 = {}) {
  const r2 = (o3, i3, s2) => {
    const c2 = Qs[i3];
    if (typeof c2 != "function") throw new Error("invalid validator function");
    const a2 = t[o3];
    if (!(s2 && a2 === void 0) && !c2(a2, t)) throw new Error("param " + String(o3) + " is invalid. Expected " + i3 + ", got " + a2);
  };
  for (const [o3, i3] of Object.entries(e2)) r2(o3, i3, false);
  for (const [o3, i3] of Object.entries(n3)) r2(o3, i3, true);
  return t;
}
const tc = () => {
  throw new Error("not implemented");
};
function tn$1(t) {
  const e2 = /* @__PURE__ */ new WeakMap();
  return (n3, ...r2) => {
    const o3 = e2.get(n3);
    if (o3 !== void 0) return o3;
    const i3 = t(n3, ...r2);
    return e2.set(n3, i3), i3;
  };
}
var ec = Object.freeze({ __proto__: null, isBytes: St$3, abytes: te$1, abool: Ct$1, bytesToHex: Pt$2, numberToHexUnpadded: kt$2, hexToNumber: We$2, hexToBytes: Vt$2, bytesToNumberBE: Ot$2, bytesToNumberLE: ee$1, numberToBytesBE: Mt$2, numberToBytesLE: be$2, numberToVarBytesBE: Ys, ensureBytes: et$2, concatBytes: ne$2, equalBytes: Gs, utf8ToBytes: Ws, inRange: Ee$3, aInRange: ft$2, bitLen: Pr$1, bitGet: Xs, bitSet: Js, bitMask: Je$2, createHmacDrbg: Vr$1, validateObject: Dt$1, notImplemented: tc, memoized: tn$1 });
const q$2 = BigInt(0), H$2 = BigInt(1), At$1 = BigInt(2), nc = BigInt(3), en$1 = BigInt(4), Mr$1 = BigInt(5), Dr$1 = BigInt(8);
function X$2(t, e2) {
  const n3 = t % e2;
  return n3 >= q$2 ? n3 : e2 + n3;
}
function Hr$1(t, e2, n3) {
  if (e2 < q$2) throw new Error("invalid exponent, negatives unsupported");
  if (n3 <= q$2) throw new Error("invalid modulus");
  if (n3 === H$2) return q$2;
  let r2 = H$2;
  for (; e2 > q$2; ) e2 & H$2 && (r2 = r2 * t % n3), t = t * t % n3, e2 >>= H$2;
  return r2;
}
function it$1(t, e2, n3) {
  let r2 = t;
  for (; e2-- > q$2; ) r2 *= r2, r2 %= n3;
  return r2;
}
function nn$1(t, e2) {
  if (t === q$2) throw new Error("invert: expected non-zero number");
  if (e2 <= q$2) throw new Error("invert: expected positive modulus, got " + e2);
  let n3 = X$2(t, e2), r2 = e2, o3 = q$2, i3 = H$2;
  for (; n3 !== q$2; ) {
    const c2 = r2 / n3, a2 = r2 % n3, u2 = o3 - i3 * c2;
    r2 = n3, n3 = a2, o3 = i3, i3 = u2;
  }
  if (r2 !== H$2) throw new Error("invert: does not exist");
  return X$2(o3, e2);
}
function rc(t) {
  const e2 = (t - H$2) / At$1;
  let n3, r2, o3;
  for (n3 = t - H$2, r2 = 0; n3 % At$1 === q$2; n3 /= At$1, r2++) ;
  for (o3 = At$1; o3 < t && Hr$1(o3, e2, t) !== t - H$2; o3++) if (o3 > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r2 === 1) {
    const s2 = (t + H$2) / en$1;
    return function(a2, u2) {
      const l2 = a2.pow(u2, s2);
      if (!a2.eql(a2.sqr(l2), u2)) throw new Error("Cannot find square root");
      return l2;
    };
  }
  const i3 = (n3 + H$2) / At$1;
  return function(c2, a2) {
    if (c2.pow(a2, e2) === c2.neg(c2.ONE)) throw new Error("Cannot find square root");
    let u2 = r2, l2 = c2.pow(c2.mul(c2.ONE, o3), n3), f5 = c2.pow(a2, i3), h4 = c2.pow(a2, n3);
    for (; !c2.eql(h4, c2.ONE); ) {
      if (c2.eql(h4, c2.ZERO)) return c2.ZERO;
      let y3 = 1;
      for (let p2 = c2.sqr(h4); y3 < u2 && !c2.eql(p2, c2.ONE); y3++) p2 = c2.sqr(p2);
      const E2 = c2.pow(l2, H$2 << BigInt(u2 - y3 - 1));
      l2 = c2.sqr(E2), f5 = c2.mul(f5, E2), h4 = c2.mul(h4, l2), u2 = y3;
    }
    return f5;
  };
}
function oc(t) {
  if (t % en$1 === nc) {
    const e2 = (t + H$2) / en$1;
    return function(r2, o3) {
      const i3 = r2.pow(o3, e2);
      if (!r2.eql(r2.sqr(i3), o3)) throw new Error("Cannot find square root");
      return i3;
    };
  }
  if (t % Dr$1 === Mr$1) {
    const e2 = (t - Mr$1) / Dr$1;
    return function(r2, o3) {
      const i3 = r2.mul(o3, At$1), s2 = r2.pow(i3, e2), c2 = r2.mul(o3, s2), a2 = r2.mul(r2.mul(c2, At$1), s2), u2 = r2.mul(c2, r2.sub(a2, r2.ONE));
      if (!r2.eql(r2.sqr(u2), o3)) throw new Error("Cannot find square root");
      return u2;
    };
  }
  return rc(t);
}
const ic = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function sc(t) {
  const e2 = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, n3 = ic.reduce((r2, o3) => (r2[o3] = "function", r2), e2);
  return Dt$1(t, n3);
}
function cc(t, e2, n3) {
  if (n3 < q$2) throw new Error("invalid exponent, negatives unsupported");
  if (n3 === q$2) return t.ONE;
  if (n3 === H$2) return e2;
  let r2 = t.ONE, o3 = e2;
  for (; n3 > q$2; ) n3 & H$2 && (r2 = t.mul(r2, o3)), o3 = t.sqr(o3), n3 >>= H$2;
  return r2;
}
function ac(t, e2) {
  const n3 = new Array(e2.length), r2 = e2.reduce((i3, s2, c2) => t.is0(s2) ? i3 : (n3[c2] = i3, t.mul(i3, s2)), t.ONE), o3 = t.inv(r2);
  return e2.reduceRight((i3, s2, c2) => t.is0(s2) ? i3 : (n3[c2] = t.mul(i3, n3[c2]), t.mul(i3, s2)), o3), n3;
}
function qr$1(t, e2) {
  const n3 = e2 !== void 0 ? e2 : t.toString(2).length, r2 = Math.ceil(n3 / 8);
  return { nBitLength: n3, nByteLength: r2 };
}
function Kr$1(t, e2, n3 = false, r2 = {}) {
  if (t <= q$2) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: o3, nByteLength: i3 } = qr$1(t, e2);
  if (i3 > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let s2;
  const c2 = Object.freeze({ ORDER: t, isLE: n3, BITS: o3, BYTES: i3, MASK: Je$2(o3), ZERO: q$2, ONE: H$2, create: (a2) => X$2(a2, t), isValid: (a2) => {
    if (typeof a2 != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof a2);
    return q$2 <= a2 && a2 < t;
  }, is0: (a2) => a2 === q$2, isOdd: (a2) => (a2 & H$2) === H$2, neg: (a2) => X$2(-a2, t), eql: (a2, u2) => a2 === u2, sqr: (a2) => X$2(a2 * a2, t), add: (a2, u2) => X$2(a2 + u2, t), sub: (a2, u2) => X$2(a2 - u2, t), mul: (a2, u2) => X$2(a2 * u2, t), pow: (a2, u2) => cc(c2, a2, u2), div: (a2, u2) => X$2(a2 * nn$1(u2, t), t), sqrN: (a2) => a2 * a2, addN: (a2, u2) => a2 + u2, subN: (a2, u2) => a2 - u2, mulN: (a2, u2) => a2 * u2, inv: (a2) => nn$1(a2, t), sqrt: r2.sqrt || ((a2) => (s2 || (s2 = oc(t)), s2(c2, a2))), invertBatch: (a2) => ac(c2, a2), cmov: (a2, u2, l2) => l2 ? u2 : a2, toBytes: (a2) => n3 ? be$2(a2, i3) : Mt$2(a2, i3), fromBytes: (a2) => {
    if (a2.length !== i3) throw new Error("Field.fromBytes: expected " + i3 + " bytes, got " + a2.length);
    return n3 ? ee$1(a2) : Ot$2(a2);
  } });
  return Object.freeze(c2);
}
function Fr$1(t) {
  if (typeof t != "bigint") throw new Error("field order must be bigint");
  const e2 = t.toString(2).length;
  return Math.ceil(e2 / 8);
}
function zr$1(t) {
  const e2 = Fr$1(t);
  return e2 + Math.ceil(e2 / 2);
}
function uc(t, e2, n3 = false) {
  const r2 = t.length, o3 = Fr$1(e2), i3 = zr$1(e2);
  if (r2 < 16 || r2 < i3 || r2 > 1024) throw new Error("expected " + i3 + "-1024 bytes of input, got " + r2);
  const s2 = n3 ? ee$1(t) : Ot$2(t), c2 = X$2(s2, e2 - H$2) + H$2;
  return n3 ? be$2(c2, o3) : Mt$2(c2, o3);
}
const Zr$1 = BigInt(0), ve$1 = BigInt(1);
function rn$1(t, e2) {
  const n3 = e2.negate();
  return t ? n3 : e2;
}
function Yr$1(t, e2) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e2) throw new Error("invalid window size, expected [1.." + e2 + "], got W=" + t);
}
function on$1(t, e2) {
  Yr$1(t, e2);
  const n3 = Math.ceil(e2 / t) + 1, r2 = 2 ** (t - 1);
  return { windows: n3, windowSize: r2 };
}
function fc(t, e2) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((n3, r2) => {
    if (!(n3 instanceof e2)) throw new Error("invalid point at index " + r2);
  });
}
function lc(t, e2) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((n3, r2) => {
    if (!e2.isValid(n3)) throw new Error("invalid scalar at index " + r2);
  });
}
const sn$1 = /* @__PURE__ */ new WeakMap(), Gr$1 = /* @__PURE__ */ new WeakMap();
function cn$1(t) {
  return Gr$1.get(t) || 1;
}
function dc(t, e2) {
  return { constTimeNegate: rn$1, hasPrecomputes(n3) {
    return cn$1(n3) !== 1;
  }, unsafeLadder(n3, r2, o3 = t.ZERO) {
    let i3 = n3;
    for (; r2 > Zr$1; ) r2 & ve$1 && (o3 = o3.add(i3)), i3 = i3.double(), r2 >>= ve$1;
    return o3;
  }, precomputeWindow(n3, r2) {
    const { windows: o3, windowSize: i3 } = on$1(r2, e2), s2 = [];
    let c2 = n3, a2 = c2;
    for (let u2 = 0; u2 < o3; u2++) {
      a2 = c2, s2.push(a2);
      for (let l2 = 1; l2 < i3; l2++) a2 = a2.add(c2), s2.push(a2);
      c2 = a2.double();
    }
    return s2;
  }, wNAF(n3, r2, o3) {
    const { windows: i3, windowSize: s2 } = on$1(n3, e2);
    let c2 = t.ZERO, a2 = t.BASE;
    const u2 = BigInt(2 ** n3 - 1), l2 = 2 ** n3, f5 = BigInt(n3);
    for (let h4 = 0; h4 < i3; h4++) {
      const y3 = h4 * s2;
      let E2 = Number(o3 & u2);
      o3 >>= f5, E2 > s2 && (E2 -= l2, o3 += ve$1);
      const p2 = y3, d4 = y3 + Math.abs(E2) - 1, v2 = h4 % 2 !== 0, m3 = E2 < 0;
      E2 === 0 ? a2 = a2.add(rn$1(v2, r2[p2])) : c2 = c2.add(rn$1(m3, r2[d4]));
    }
    return { p: c2, f: a2 };
  }, wNAFUnsafe(n3, r2, o3, i3 = t.ZERO) {
    const { windows: s2, windowSize: c2 } = on$1(n3, e2), a2 = BigInt(2 ** n3 - 1), u2 = 2 ** n3, l2 = BigInt(n3);
    for (let f5 = 0; f5 < s2; f5++) {
      const h4 = f5 * c2;
      if (o3 === Zr$1) break;
      let y3 = Number(o3 & a2);
      if (o3 >>= l2, y3 > c2 && (y3 -= u2, o3 += ve$1), y3 === 0) continue;
      let E2 = r2[h4 + Math.abs(y3) - 1];
      y3 < 0 && (E2 = E2.negate()), i3 = i3.add(E2);
    }
    return i3;
  }, getPrecomputes(n3, r2, o3) {
    let i3 = sn$1.get(r2);
    return i3 || (i3 = this.precomputeWindow(r2, n3), n3 !== 1 && sn$1.set(r2, o3(i3))), i3;
  }, wNAFCached(n3, r2, o3) {
    const i3 = cn$1(n3);
    return this.wNAF(i3, this.getPrecomputes(i3, n3, o3), r2);
  }, wNAFCachedUnsafe(n3, r2, o3, i3) {
    const s2 = cn$1(n3);
    return s2 === 1 ? this.unsafeLadder(n3, r2, i3) : this.wNAFUnsafe(s2, this.getPrecomputes(s2, n3, o3), r2, i3);
  }, setWindowSize(n3, r2) {
    Yr$1(r2, e2), Gr$1.set(n3, r2), sn$1.delete(n3);
  } };
}
function hc(t, e2, n3, r2) {
  if (fc(n3, t), lc(r2, e2), n3.length !== r2.length) throw new Error("arrays of points and scalars must have equal length");
  const o3 = t.ZERO, i3 = Pr$1(BigInt(n3.length)), s2 = i3 > 12 ? i3 - 3 : i3 > 4 ? i3 - 2 : i3 ? 2 : 1, c2 = (1 << s2) - 1, a2 = new Array(c2 + 1).fill(o3), u2 = Math.floor((e2.BITS - 1) / s2) * s2;
  let l2 = o3;
  for (let f5 = u2; f5 >= 0; f5 -= s2) {
    a2.fill(o3);
    for (let y3 = 0; y3 < r2.length; y3++) {
      const E2 = r2[y3], p2 = Number(E2 >> BigInt(f5) & BigInt(c2));
      a2[p2] = a2[p2].add(n3[y3]);
    }
    let h4 = o3;
    for (let y3 = a2.length - 1, E2 = o3; y3 > 0; y3--) E2 = E2.add(a2[y3]), h4 = h4.add(E2);
    if (l2 = l2.add(h4), f5 !== 0) for (let y3 = 0; y3 < s2; y3++) l2 = l2.double();
  }
  return l2;
}
function Wr$1(t) {
  return sc(t.Fp), Dt$1(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...qr$1(t.n, t.nBitLength), ...t, p: t.Fp.ORDER });
}
BigInt(0), BigInt(1), BigInt(2), BigInt(8);
const Ht$1 = BigInt(0), an$1 = BigInt(1);
function pc(t) {
  return Dt$1(t, { a: "bigint" }, { montgomeryBits: "isSafeInteger", nByteLength: "isSafeInteger", adjustScalarBytes: "function", domain: "function", powPminus2: "function", Gu: "bigint" }), Object.freeze({ ...t });
}
function gc(t) {
  const e2 = pc(t), { P: n3 } = e2, r2 = (m3) => X$2(m3, n3), o3 = e2.montgomeryBits, i3 = Math.ceil(o3 / 8), s2 = e2.nByteLength, c2 = e2.adjustScalarBytes || ((m3) => m3), a2 = e2.powPminus2 || ((m3) => Hr$1(m3, n3 - BigInt(2), n3));
  function u2(m3, O4, N2) {
    const $2 = r2(m3 * (O4 - N2));
    return O4 = r2(O4 - $2), N2 = r2(N2 + $2), [O4, N2];
  }
  const l2 = (e2.a - BigInt(2)) / BigInt(4);
  function f5(m3, O4) {
    ft$2("u", m3, Ht$1, n3), ft$2("scalar", O4, Ht$1, n3);
    const N2 = O4, $2 = m3;
    let B4 = an$1, A2 = Ht$1, T2 = m3, S3 = an$1, L3 = Ht$1, U2;
    for (let j2 = BigInt(o3 - 1); j2 >= Ht$1; j2--) {
      const g2 = N2 >> j2 & an$1;
      L3 ^= g2, U2 = u2(L3, B4, T2), B4 = U2[0], T2 = U2[1], U2 = u2(L3, A2, S3), A2 = U2[0], S3 = U2[1], L3 = g2;
      const w2 = B4 + A2, b2 = r2(w2 * w2), I3 = B4 - A2, R3 = r2(I3 * I3), x2 = b2 - R3, C2 = T2 + S3, P3 = T2 - S3, k2 = r2(P3 * w2), M3 = r2(C2 * I3), D2 = k2 + M3, z2 = k2 - M3;
      T2 = r2(D2 * D2), S3 = r2($2 * r2(z2 * z2)), B4 = r2(b2 * R3), A2 = r2(x2 * (b2 + r2(l2 * x2)));
    }
    U2 = u2(L3, B4, T2), B4 = U2[0], T2 = U2[1], U2 = u2(L3, A2, S3), A2 = U2[0], S3 = U2[1];
    const _3 = a2(A2);
    return r2(B4 * _3);
  }
  function h4(m3) {
    return be$2(r2(m3), i3);
  }
  function y3(m3) {
    const O4 = et$2("u coordinate", m3, i3);
    return s2 === 32 && (O4[31] &= 127), ee$1(O4);
  }
  function E2(m3) {
    const O4 = et$2("scalar", m3), N2 = O4.length;
    if (N2 !== i3 && N2 !== s2) {
      let $2 = "" + i3 + " or " + s2;
      throw new Error("invalid scalar, expected " + $2 + " bytes, got " + N2);
    }
    return ee$1(c2(O4));
  }
  function p2(m3, O4) {
    const N2 = y3(O4), $2 = E2(m3), B4 = f5(N2, $2);
    if (B4 === Ht$1) throw new Error("invalid private or public key received");
    return h4(B4);
  }
  const d4 = h4(e2.Gu);
  function v2(m3) {
    return p2(m3, d4);
  }
  return { scalarMult: p2, scalarMultBase: v2, getSharedSecret: (m3, O4) => p2(m3, O4), getPublicKey: (m3) => v2(m3), utils: { randomPrivateKey: () => e2.randomBytes(e2.nByteLength) }, GuBytes: d4 };
}
const un$1 = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
BigInt(0);
const yc = BigInt(1), Xr$1 = BigInt(2), mc = BigInt(3), wc = BigInt(5);
BigInt(8);
function bc(t) {
  const e2 = BigInt(10), n3 = BigInt(20), r2 = BigInt(40), o3 = BigInt(80), i3 = un$1, c2 = t * t % i3 * t % i3, a2 = it$1(c2, Xr$1, i3) * c2 % i3, u2 = it$1(a2, yc, i3) * t % i3, l2 = it$1(u2, wc, i3) * u2 % i3, f5 = it$1(l2, e2, i3) * l2 % i3, h4 = it$1(f5, n3, i3) * f5 % i3, y3 = it$1(h4, r2, i3) * h4 % i3, E2 = it$1(y3, o3, i3) * y3 % i3, p2 = it$1(E2, o3, i3) * y3 % i3, d4 = it$1(p2, e2, i3) * l2 % i3;
  return { pow_p_5_8: it$1(d4, Xr$1, i3) * t % i3, b2: c2 };
}
function Ec(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
const fn$1 = gc({ P: un$1, a: BigInt(486662), montgomeryBits: 255, nByteLength: 32, Gu: BigInt(9), powPminus2: (t) => {
  const e2 = un$1, { pow_p_5_8: n3, b2: r2 } = bc(t);
  return X$2(it$1(n3, mc, e2) * r2, e2);
}, adjustScalarBytes: Ec, randomBytes: Lt$2 });
function Jr$1(t) {
  t.lowS !== void 0 && Ct$1("lowS", t.lowS), t.prehash !== void 0 && Ct$1("prehash", t.prehash);
}
function vc(t) {
  const e2 = Wr$1(t);
  Dt$1(e2, { a: "field", b: "field" }, { allowedPrivateKeyLengths: "array", wrapPrivateKey: "boolean", isTorsionFree: "function", clearCofactor: "function", allowInfinityPoint: "boolean", fromBytes: "function", toBytes: "function" });
  const { endo: n3, Fp: r2, a: o3 } = e2;
  if (n3) {
    if (!r2.eql(o3, r2.ZERO)) throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof n3 != "object" || typeof n3.beta != "bigint" || typeof n3.splitScalar != "function") throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...e2 });
}
const { bytesToNumberBE: xc, hexToBytes: Sc } = ec;
class Oc extends Error {
  constructor(e2 = "") {
    super(e2);
  }
}
const lt$1 = { Err: Oc, _tlv: { encode: (t, e2) => {
  const { Err: n3 } = lt$1;
  if (t < 0 || t > 256) throw new n3("tlv.encode: wrong tag");
  if (e2.length & 1) throw new n3("tlv.encode: unpadded data");
  const r2 = e2.length / 2, o3 = kt$2(r2);
  if (o3.length / 2 & 128) throw new n3("tlv.encode: long form length too big");
  const i3 = r2 > 127 ? kt$2(o3.length / 2 | 128) : "";
  return kt$2(t) + i3 + o3 + e2;
}, decode(t, e2) {
  const { Err: n3 } = lt$1;
  let r2 = 0;
  if (t < 0 || t > 256) throw new n3("tlv.encode: wrong tag");
  if (e2.length < 2 || e2[r2++] !== t) throw new n3("tlv.decode: wrong tlv");
  const o3 = e2[r2++], i3 = !!(o3 & 128);
  let s2 = 0;
  if (!i3) s2 = o3;
  else {
    const a2 = o3 & 127;
    if (!a2) throw new n3("tlv.decode(long): indefinite length not supported");
    if (a2 > 4) throw new n3("tlv.decode(long): byte length is too big");
    const u2 = e2.subarray(r2, r2 + a2);
    if (u2.length !== a2) throw new n3("tlv.decode: length bytes not complete");
    if (u2[0] === 0) throw new n3("tlv.decode(long): zero leftmost byte");
    for (const l2 of u2) s2 = s2 << 8 | l2;
    if (r2 += a2, s2 < 128) throw new n3("tlv.decode(long): not minimal encoding");
  }
  const c2 = e2.subarray(r2, r2 + s2);
  if (c2.length !== s2) throw new n3("tlv.decode: wrong value length");
  return { v: c2, l: e2.subarray(r2 + s2) };
} }, _int: { encode(t) {
  const { Err: e2 } = lt$1;
  if (t < dt$2) throw new e2("integer: negative integers are not allowed");
  let n3 = kt$2(t);
  if (Number.parseInt(n3[0], 16) & 8 && (n3 = "00" + n3), n3.length & 1) throw new e2("unexpected DER parsing assertion: unpadded hex");
  return n3;
}, decode(t) {
  const { Err: e2 } = lt$1;
  if (t[0] & 128) throw new e2("invalid signature integer: negative");
  if (t[0] === 0 && !(t[1] & 128)) throw new e2("invalid signature integer: unnecessary leading zero");
  return xc(t);
} }, toSig(t) {
  const { Err: e2, _int: n3, _tlv: r2 } = lt$1, o3 = typeof t == "string" ? Sc(t) : t;
  te$1(o3);
  const { v: i3, l: s2 } = r2.decode(48, o3);
  if (s2.length) throw new e2("invalid signature: left bytes after parsing");
  const { v: c2, l: a2 } = r2.decode(2, i3), { v: u2, l: l2 } = r2.decode(2, a2);
  if (l2.length) throw new e2("invalid signature: left bytes after parsing");
  return { r: n3.decode(c2), s: n3.decode(u2) };
}, hexFromSig(t) {
  const { _tlv: e2, _int: n3 } = lt$1, r2 = e2.encode(2, n3.encode(t.r)), o3 = e2.encode(2, n3.encode(t.s)), i3 = r2 + o3;
  return e2.encode(48, i3);
} }, dt$2 = BigInt(0), K$3 = BigInt(1);
BigInt(2);
const Qr$1 = BigInt(3);
BigInt(4);
function Ac(t) {
  const e2 = vc(t), { Fp: n3 } = e2, r2 = Kr$1(e2.n, e2.nBitLength), o3 = e2.toBytes || ((p2, d4, v2) => {
    const m3 = d4.toAffine();
    return ne$2(Uint8Array.from([4]), n3.toBytes(m3.x), n3.toBytes(m3.y));
  }), i3 = e2.fromBytes || ((p2) => {
    const d4 = p2.subarray(1), v2 = n3.fromBytes(d4.subarray(0, n3.BYTES)), m3 = n3.fromBytes(d4.subarray(n3.BYTES, 2 * n3.BYTES));
    return { x: v2, y: m3 };
  });
  function s2(p2) {
    const { a: d4, b: v2 } = e2, m3 = n3.sqr(p2), O4 = n3.mul(m3, p2);
    return n3.add(n3.add(O4, n3.mul(p2, d4)), v2);
  }
  if (!n3.eql(n3.sqr(e2.Gy), s2(e2.Gx))) throw new Error("bad generator point: equation left != right");
  function c2(p2) {
    return Ee$3(p2, K$3, e2.n);
  }
  function a2(p2) {
    const { allowedPrivateKeyLengths: d4, nByteLength: v2, wrapPrivateKey: m3, n: O4 } = e2;
    if (d4 && typeof p2 != "bigint") {
      if (St$3(p2) && (p2 = Pt$2(p2)), typeof p2 != "string" || !d4.includes(p2.length)) throw new Error("invalid private key");
      p2 = p2.padStart(v2 * 2, "0");
    }
    let N2;
    try {
      N2 = typeof p2 == "bigint" ? p2 : Ot$2(et$2("private key", p2, v2));
    } catch {
      throw new Error("invalid private key, expected hex or " + v2 + " bytes, got " + typeof p2);
    }
    return m3 && (N2 = X$2(N2, O4)), ft$2("private key", N2, K$3, O4), N2;
  }
  function u2(p2) {
    if (!(p2 instanceof h4)) throw new Error("ProjectivePoint expected");
  }
  const l2 = tn$1((p2, d4) => {
    const { px: v2, py: m3, pz: O4 } = p2;
    if (n3.eql(O4, n3.ONE)) return { x: v2, y: m3 };
    const N2 = p2.is0();
    d4 == null && (d4 = N2 ? n3.ONE : n3.inv(O4));
    const $2 = n3.mul(v2, d4), B4 = n3.mul(m3, d4), A2 = n3.mul(O4, d4);
    if (N2) return { x: n3.ZERO, y: n3.ZERO };
    if (!n3.eql(A2, n3.ONE)) throw new Error("invZ was invalid");
    return { x: $2, y: B4 };
  }), f5 = tn$1((p2) => {
    if (p2.is0()) {
      if (e2.allowInfinityPoint && !n3.is0(p2.py)) return;
      throw new Error("bad point: ZERO");
    }
    const { x: d4, y: v2 } = p2.toAffine();
    if (!n3.isValid(d4) || !n3.isValid(v2)) throw new Error("bad point: x or y not FE");
    const m3 = n3.sqr(v2), O4 = s2(d4);
    if (!n3.eql(m3, O4)) throw new Error("bad point: equation left != right");
    if (!p2.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  class h4 {
    constructor(d4, v2, m3) {
      if (this.px = d4, this.py = v2, this.pz = m3, d4 == null || !n3.isValid(d4)) throw new Error("x required");
      if (v2 == null || !n3.isValid(v2)) throw new Error("y required");
      if (m3 == null || !n3.isValid(m3)) throw new Error("z required");
      Object.freeze(this);
    }
    static fromAffine(d4) {
      const { x: v2, y: m3 } = d4 || {};
      if (!d4 || !n3.isValid(v2) || !n3.isValid(m3)) throw new Error("invalid affine point");
      if (d4 instanceof h4) throw new Error("projective point not allowed");
      const O4 = (N2) => n3.eql(N2, n3.ZERO);
      return O4(v2) && O4(m3) ? h4.ZERO : new h4(v2, m3, n3.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(d4) {
      const v2 = n3.invertBatch(d4.map((m3) => m3.pz));
      return d4.map((m3, O4) => m3.toAffine(v2[O4])).map(h4.fromAffine);
    }
    static fromHex(d4) {
      const v2 = h4.fromAffine(i3(et$2("pointHex", d4)));
      return v2.assertValidity(), v2;
    }
    static fromPrivateKey(d4) {
      return h4.BASE.multiply(a2(d4));
    }
    static msm(d4, v2) {
      return hc(h4, r2, d4, v2);
    }
    _setWindowSize(d4) {
      E2.setWindowSize(this, d4);
    }
    assertValidity() {
      f5(this);
    }
    hasEvenY() {
      const { y: d4 } = this.toAffine();
      if (n3.isOdd) return !n3.isOdd(d4);
      throw new Error("Field doesn't support isOdd");
    }
    equals(d4) {
      u2(d4);
      const { px: v2, py: m3, pz: O4 } = this, { px: N2, py: $2, pz: B4 } = d4, A2 = n3.eql(n3.mul(v2, B4), n3.mul(N2, O4)), T2 = n3.eql(n3.mul(m3, B4), n3.mul($2, O4));
      return A2 && T2;
    }
    negate() {
      return new h4(this.px, n3.neg(this.py), this.pz);
    }
    double() {
      const { a: d4, b: v2 } = e2, m3 = n3.mul(v2, Qr$1), { px: O4, py: N2, pz: $2 } = this;
      let B4 = n3.ZERO, A2 = n3.ZERO, T2 = n3.ZERO, S3 = n3.mul(O4, O4), L3 = n3.mul(N2, N2), U2 = n3.mul($2, $2), _3 = n3.mul(O4, N2);
      return _3 = n3.add(_3, _3), T2 = n3.mul(O4, $2), T2 = n3.add(T2, T2), B4 = n3.mul(d4, T2), A2 = n3.mul(m3, U2), A2 = n3.add(B4, A2), B4 = n3.sub(L3, A2), A2 = n3.add(L3, A2), A2 = n3.mul(B4, A2), B4 = n3.mul(_3, B4), T2 = n3.mul(m3, T2), U2 = n3.mul(d4, U2), _3 = n3.sub(S3, U2), _3 = n3.mul(d4, _3), _3 = n3.add(_3, T2), T2 = n3.add(S3, S3), S3 = n3.add(T2, S3), S3 = n3.add(S3, U2), S3 = n3.mul(S3, _3), A2 = n3.add(A2, S3), U2 = n3.mul(N2, $2), U2 = n3.add(U2, U2), S3 = n3.mul(U2, _3), B4 = n3.sub(B4, S3), T2 = n3.mul(U2, L3), T2 = n3.add(T2, T2), T2 = n3.add(T2, T2), new h4(B4, A2, T2);
    }
    add(d4) {
      u2(d4);
      const { px: v2, py: m3, pz: O4 } = this, { px: N2, py: $2, pz: B4 } = d4;
      let A2 = n3.ZERO, T2 = n3.ZERO, S3 = n3.ZERO;
      const L3 = e2.a, U2 = n3.mul(e2.b, Qr$1);
      let _3 = n3.mul(v2, N2), j2 = n3.mul(m3, $2), g2 = n3.mul(O4, B4), w2 = n3.add(v2, m3), b2 = n3.add(N2, $2);
      w2 = n3.mul(w2, b2), b2 = n3.add(_3, j2), w2 = n3.sub(w2, b2), b2 = n3.add(v2, O4);
      let I3 = n3.add(N2, B4);
      return b2 = n3.mul(b2, I3), I3 = n3.add(_3, g2), b2 = n3.sub(b2, I3), I3 = n3.add(m3, O4), A2 = n3.add($2, B4), I3 = n3.mul(I3, A2), A2 = n3.add(j2, g2), I3 = n3.sub(I3, A2), S3 = n3.mul(L3, b2), A2 = n3.mul(U2, g2), S3 = n3.add(A2, S3), A2 = n3.sub(j2, S3), S3 = n3.add(j2, S3), T2 = n3.mul(A2, S3), j2 = n3.add(_3, _3), j2 = n3.add(j2, _3), g2 = n3.mul(L3, g2), b2 = n3.mul(U2, b2), j2 = n3.add(j2, g2), g2 = n3.sub(_3, g2), g2 = n3.mul(L3, g2), b2 = n3.add(b2, g2), _3 = n3.mul(j2, b2), T2 = n3.add(T2, _3), _3 = n3.mul(I3, b2), A2 = n3.mul(w2, A2), A2 = n3.sub(A2, _3), _3 = n3.mul(w2, j2), S3 = n3.mul(I3, S3), S3 = n3.add(S3, _3), new h4(A2, T2, S3);
    }
    subtract(d4) {
      return this.add(d4.negate());
    }
    is0() {
      return this.equals(h4.ZERO);
    }
    wNAF(d4) {
      return E2.wNAFCached(this, d4, h4.normalizeZ);
    }
    multiplyUnsafe(d4) {
      const { endo: v2, n: m3 } = e2;
      ft$2("scalar", d4, dt$2, m3);
      const O4 = h4.ZERO;
      if (d4 === dt$2) return O4;
      if (this.is0() || d4 === K$3) return this;
      if (!v2 || E2.hasPrecomputes(this)) return E2.wNAFCachedUnsafe(this, d4, h4.normalizeZ);
      let { k1neg: N2, k1: $2, k2neg: B4, k2: A2 } = v2.splitScalar(d4), T2 = O4, S3 = O4, L3 = this;
      for (; $2 > dt$2 || A2 > dt$2; ) $2 & K$3 && (T2 = T2.add(L3)), A2 & K$3 && (S3 = S3.add(L3)), L3 = L3.double(), $2 >>= K$3, A2 >>= K$3;
      return N2 && (T2 = T2.negate()), B4 && (S3 = S3.negate()), S3 = new h4(n3.mul(S3.px, v2.beta), S3.py, S3.pz), T2.add(S3);
    }
    multiply(d4) {
      const { endo: v2, n: m3 } = e2;
      ft$2("scalar", d4, K$3, m3);
      let O4, N2;
      if (v2) {
        const { k1neg: $2, k1: B4, k2neg: A2, k2: T2 } = v2.splitScalar(d4);
        let { p: S3, f: L3 } = this.wNAF(B4), { p: U2, f: _3 } = this.wNAF(T2);
        S3 = E2.constTimeNegate($2, S3), U2 = E2.constTimeNegate(A2, U2), U2 = new h4(n3.mul(U2.px, v2.beta), U2.py, U2.pz), O4 = S3.add(U2), N2 = L3.add(_3);
      } else {
        const { p: $2, f: B4 } = this.wNAF(d4);
        O4 = $2, N2 = B4;
      }
      return h4.normalizeZ([O4, N2])[0];
    }
    multiplyAndAddUnsafe(d4, v2, m3) {
      const O4 = h4.BASE, N2 = (B4, A2) => A2 === dt$2 || A2 === K$3 || !B4.equals(O4) ? B4.multiplyUnsafe(A2) : B4.multiply(A2), $2 = N2(this, v2).add(N2(d4, m3));
      return $2.is0() ? void 0 : $2;
    }
    toAffine(d4) {
      return l2(this, d4);
    }
    isTorsionFree() {
      const { h: d4, isTorsionFree: v2 } = e2;
      if (d4 === K$3) return true;
      if (v2) return v2(h4, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: d4, clearCofactor: v2 } = e2;
      return d4 === K$3 ? this : v2 ? v2(h4, this) : this.multiplyUnsafe(e2.h);
    }
    toRawBytes(d4 = true) {
      return Ct$1("isCompressed", d4), this.assertValidity(), o3(h4, this, d4);
    }
    toHex(d4 = true) {
      return Ct$1("isCompressed", d4), Pt$2(this.toRawBytes(d4));
    }
  }
  h4.BASE = new h4(e2.Gx, e2.Gy, n3.ONE), h4.ZERO = new h4(n3.ZERO, n3.ONE, n3.ZERO);
  const y3 = e2.nBitLength, E2 = dc(h4, e2.endo ? Math.ceil(y3 / 2) : y3);
  return { CURVE: e2, ProjectivePoint: h4, normPrivateKeyToScalar: a2, weierstrassEquation: s2, isWithinCurveOrder: c2 };
}
function Bc(t) {
  const e2 = Wr$1(t);
  return Dt$1(e2, { hash: "hash", hmac: "function", randomBytes: "function" }, { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }), Object.freeze({ lowS: true, ...e2 });
}
function Ic(t) {
  const e2 = Bc(t), { Fp: n3, n: r2 } = e2, o3 = n3.BYTES + 1, i3 = 2 * n3.BYTES + 1;
  function s2(g2) {
    return X$2(g2, r2);
  }
  function c2(g2) {
    return nn$1(g2, r2);
  }
  const { ProjectivePoint: a2, normPrivateKeyToScalar: u2, weierstrassEquation: l2, isWithinCurveOrder: f5 } = Ac({ ...e2, toBytes(g2, w2, b2) {
    const I3 = w2.toAffine(), R3 = n3.toBytes(I3.x), x2 = ne$2;
    return Ct$1("isCompressed", b2), b2 ? x2(Uint8Array.from([w2.hasEvenY() ? 2 : 3]), R3) : x2(Uint8Array.from([4]), R3, n3.toBytes(I3.y));
  }, fromBytes(g2) {
    const w2 = g2.length, b2 = g2[0], I3 = g2.subarray(1);
    if (w2 === o3 && (b2 === 2 || b2 === 3)) {
      const R3 = Ot$2(I3);
      if (!Ee$3(R3, K$3, n3.ORDER)) throw new Error("Point is not on curve");
      const x2 = l2(R3);
      let C2;
      try {
        C2 = n3.sqrt(x2);
      } catch (M3) {
        const D2 = M3 instanceof Error ? ": " + M3.message : "";
        throw new Error("Point is not on curve" + D2);
      }
      const P3 = (C2 & K$3) === K$3;
      return (b2 & 1) === 1 !== P3 && (C2 = n3.neg(C2)), { x: R3, y: C2 };
    } else if (w2 === i3 && b2 === 4) {
      const R3 = n3.fromBytes(I3.subarray(0, n3.BYTES)), x2 = n3.fromBytes(I3.subarray(n3.BYTES, 2 * n3.BYTES));
      return { x: R3, y: x2 };
    } else {
      const R3 = o3, x2 = i3;
      throw new Error("invalid Point, expected length of " + R3 + ", or uncompressed " + x2 + ", got " + w2);
    }
  } }), h4 = (g2) => Pt$2(Mt$2(g2, e2.nByteLength));
  function y3(g2) {
    const w2 = r2 >> K$3;
    return g2 > w2;
  }
  function E2(g2) {
    return y3(g2) ? s2(-g2) : g2;
  }
  const p2 = (g2, w2, b2) => Ot$2(g2.slice(w2, b2));
  class d4 {
    constructor(w2, b2, I3) {
      this.r = w2, this.s = b2, this.recovery = I3, this.assertValidity();
    }
    static fromCompact(w2) {
      const b2 = e2.nByteLength;
      return w2 = et$2("compactSignature", w2, b2 * 2), new d4(p2(w2, 0, b2), p2(w2, b2, 2 * b2));
    }
    static fromDER(w2) {
      const { r: b2, s: I3 } = lt$1.toSig(et$2("DER", w2));
      return new d4(b2, I3);
    }
    assertValidity() {
      ft$2("r", this.r, K$3, r2), ft$2("s", this.s, K$3, r2);
    }
    addRecoveryBit(w2) {
      return new d4(this.r, this.s, w2);
    }
    recoverPublicKey(w2) {
      const { r: b2, s: I3, recovery: R3 } = this, x2 = B4(et$2("msgHash", w2));
      if (R3 == null || ![0, 1, 2, 3].includes(R3)) throw new Error("recovery id invalid");
      const C2 = R3 === 2 || R3 === 3 ? b2 + e2.n : b2;
      if (C2 >= n3.ORDER) throw new Error("recovery id 2 or 3 invalid");
      const P3 = (R3 & 1) === 0 ? "02" : "03", k2 = a2.fromHex(P3 + h4(C2)), M3 = c2(C2), D2 = s2(-x2 * M3), z2 = s2(I3 * M3), Z2 = a2.BASE.multiplyAndAddUnsafe(k2, D2, z2);
      if (!Z2) throw new Error("point at infinify");
      return Z2.assertValidity(), Z2;
    }
    hasHighS() {
      return y3(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new d4(this.r, s2(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return Vt$2(this.toDERHex());
    }
    toDERHex() {
      return lt$1.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return Vt$2(this.toCompactHex());
    }
    toCompactHex() {
      return h4(this.r) + h4(this.s);
    }
  }
  const v2 = { isValidPrivateKey(g2) {
    try {
      return u2(g2), true;
    } catch {
      return false;
    }
  }, normPrivateKeyToScalar: u2, randomPrivateKey: () => {
    const g2 = zr$1(e2.n);
    return uc(e2.randomBytes(g2), e2.n);
  }, precompute(g2 = 8, w2 = a2.BASE) {
    return w2._setWindowSize(g2), w2.multiply(BigInt(3)), w2;
  } };
  function m3(g2, w2 = true) {
    return a2.fromPrivateKey(g2).toRawBytes(w2);
  }
  function O4(g2) {
    const w2 = St$3(g2), b2 = typeof g2 == "string", I3 = (w2 || b2) && g2.length;
    return w2 ? I3 === o3 || I3 === i3 : b2 ? I3 === 2 * o3 || I3 === 2 * i3 : g2 instanceof a2;
  }
  function N2(g2, w2, b2 = true) {
    if (O4(g2)) throw new Error("first arg must be private key");
    if (!O4(w2)) throw new Error("second arg must be public key");
    return a2.fromHex(w2).multiply(u2(g2)).toRawBytes(b2);
  }
  const $2 = e2.bits2int || function(g2) {
    if (g2.length > 8192) throw new Error("input is too large");
    const w2 = Ot$2(g2), b2 = g2.length * 8 - e2.nBitLength;
    return b2 > 0 ? w2 >> BigInt(b2) : w2;
  }, B4 = e2.bits2int_modN || function(g2) {
    return s2($2(g2));
  }, A2 = Je$2(e2.nBitLength);
  function T2(g2) {
    return ft$2("num < 2^" + e2.nBitLength, g2, dt$2, A2), Mt$2(g2, e2.nByteLength);
  }
  function S3(g2, w2, b2 = L3) {
    if (["recovered", "canonical"].some((W2) => W2 in b2)) throw new Error("sign() legacy options not supported");
    const { hash: I3, randomBytes: R3 } = e2;
    let { lowS: x2, prehash: C2, extraEntropy: P3 } = b2;
    x2 == null && (x2 = true), g2 = et$2("msgHash", g2), Jr$1(b2), C2 && (g2 = et$2("prehashed msgHash", I3(g2)));
    const k2 = B4(g2), M3 = u2(w2), D2 = [T2(M3), T2(k2)];
    if (P3 != null && P3 !== false) {
      const W2 = P3 === true ? R3(n3.BYTES) : P3;
      D2.push(et$2("extraEntropy", W2));
    }
    const z2 = ne$2(...D2), Z2 = k2;
    function st2(W2) {
      const J3 = $2(W2);
      if (!f5(J3)) return;
      const Be2 = c2(J3), zt2 = a2.BASE.multiply(J3).toAffine(), vt2 = s2(zt2.x);
      if (vt2 === dt$2) return;
      const Zt2 = s2(Be2 * s2(Z2 + vt2 * M3));
      if (Zt2 === dt$2) return;
      let Ut2 = (zt2.x === vt2 ? 0 : 2) | Number(zt2.y & K$3), vn2 = Zt2;
      return x2 && y3(Zt2) && (vn2 = E2(Zt2), Ut2 ^= 1), new d4(vt2, vn2, Ut2);
    }
    return { seed: z2, k2sig: st2 };
  }
  const L3 = { lowS: e2.lowS, prehash: false }, U2 = { lowS: e2.lowS, prehash: false };
  function _3(g2, w2, b2 = L3) {
    const { seed: I3, k2sig: R3 } = S3(g2, w2, b2), x2 = e2;
    return Vr$1(x2.hash.outputLen, x2.nByteLength, x2.hmac)(I3, R3);
  }
  a2.BASE._setWindowSize(8);
  function j2(g2, w2, b2, I3 = U2) {
    var _a;
    const R3 = g2;
    w2 = et$2("msgHash", w2), b2 = et$2("publicKey", b2);
    const { lowS: x2, prehash: C2, format: P3 } = I3;
    if (Jr$1(I3), "strict" in I3) throw new Error("options.strict was renamed to lowS");
    if (P3 !== void 0 && P3 !== "compact" && P3 !== "der") throw new Error("format must be compact or der");
    const k2 = typeof R3 == "string" || St$3(R3), M3 = !k2 && !P3 && typeof R3 == "object" && R3 !== null && typeof R3.r == "bigint" && typeof R3.s == "bigint";
    if (!k2 && !M3) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let D2, z2;
    try {
      if (M3 && (D2 = new d4(R3.r, R3.s)), k2) {
        try {
          P3 !== "compact" && (D2 = d4.fromDER(R3));
        } catch (Ut2) {
          if (!(Ut2 instanceof lt$1.Err)) throw Ut2;
        }
        !D2 && P3 !== "der" && (D2 = d4.fromCompact(R3));
      }
      z2 = a2.fromHex(b2);
    } catch {
      return false;
    }
    if (!D2 || x2 && D2.hasHighS()) return false;
    C2 && (w2 = e2.hash(w2));
    const { r: Z2, s: st2 } = D2, W2 = B4(w2), J3 = c2(st2), Be2 = s2(W2 * J3), zt2 = s2(Z2 * J3), vt2 = (_a = a2.BASE.multiplyAndAddUnsafe(z2, Be2, zt2)) == null ? void 0 : _a.toAffine();
    return vt2 ? s2(vt2.x) === Z2 : false;
  }
  return { CURVE: e2, getPublicKey: m3, getSharedSecret: N2, sign: _3, verify: j2, ProjectivePoint: a2, Signature: d4, utils: v2 };
}
function Nc(t) {
  return { hash: t, hmac: (e2, ...n3) => ye$2(t, e2, Vi$1(...n3)), randomBytes: Lt$2 };
}
function Uc(t, e2) {
  const n3 = (r2) => Ic({ ...t, ...Nc(r2) });
  return { ...n3(e2), create: n3 };
}
const to$1 = Kr$1(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), Tc = to$1.create(BigInt("-3")), Rc = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), _c = Uc({ a: Tc, b: Rc, Fp: to$1, n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"), h: BigInt(1), lowS: false }, Qt$2), ln$1 = "base10", G$2 = "base16", qt$2 = "base64pad", xe$1 = "base64url", Kt$2 = "utf8", dn$1 = 0, Ft$2 = 1, re$2 = 2, $c = 0, eo$1 = 1, oe$1 = 12, hn$1 = 32;
function Lc() {
  const t = fn$1.utils.randomPrivateKey(), e2 = fn$1.getPublicKey(t);
  return { privateKey: toString(t, G$2), publicKey: toString(e2, G$2) };
}
function jc() {
  const t = Lt$2(hn$1);
  return toString(t, G$2);
}
function Cc(t, e2) {
  const n3 = fn$1.getSharedSecret(fromString(t, G$2), fromString(e2, G$2)), r2 = Vs$1(Qt$2, n3, void 0, void 0, hn$1);
  return toString(r2, G$2);
}
function Pc(t) {
  const e2 = Qt$2(fromString(t, G$2));
  return toString(e2, G$2);
}
function kc(t) {
  const e2 = Qt$2(fromString(t, Kt$2));
  return toString(e2, G$2);
}
function pn$1(t) {
  return fromString(`${t}`, ln$1);
}
function Bt$2(t) {
  return Number(toString(t, ln$1));
}
function no$1(t) {
  return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function ro$1(t) {
  const e2 = t.replace(/-/g, "+").replace(/_/g, "/"), n3 = (4 - e2.length % 4) % 4;
  return e2 + "=".repeat(n3);
}
function Vc(t) {
  const e2 = pn$1(typeof t.type < "u" ? t.type : dn$1);
  if (Bt$2(e2) === Ft$2 && typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const n3 = typeof t.senderPublicKey < "u" ? fromString(t.senderPublicKey, G$2) : void 0, r2 = typeof t.iv < "u" ? fromString(t.iv, G$2) : Lt$2(oe$1), o3 = fromString(t.symKey, G$2), i3 = $r$1(o3, r2).encrypt(fromString(t.message, Kt$2)), s2 = gn$1({ type: e2, sealed: i3, iv: r2, senderPublicKey: n3 });
  return t.encoding === xe$1 ? no$1(s2) : s2;
}
function Mc(t) {
  const e2 = fromString(t.symKey, G$2), { sealed: n3, iv: r2 } = Se$1({ encoded: t.encoded, encoding: t.encoding }), o3 = $r$1(e2, r2).decrypt(n3);
  if (o3 === null) throw new Error("Failed to decrypt");
  return toString(o3, Kt$2);
}
function Dc(t, e2) {
  const n3 = pn$1(re$2), r2 = Lt$2(oe$1), o3 = fromString(t, Kt$2), i3 = gn$1({ type: n3, sealed: o3, iv: r2 });
  return e2 === xe$1 ? no$1(i3) : i3;
}
function Hc(t, e2) {
  const { sealed: n3 } = Se$1({ encoded: t, encoding: e2 });
  return toString(n3, Kt$2);
}
function gn$1(t) {
  if (Bt$2(t.type) === re$2) return toString(concat([t.type, t.sealed]), qt$2);
  if (Bt$2(t.type) === Ft$2) {
    if (typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return toString(concat([t.type, t.senderPublicKey, t.iv, t.sealed]), qt$2);
  }
  return toString(concat([t.type, t.iv, t.sealed]), qt$2);
}
function Se$1(t) {
  const e2 = (t.encoding || qt$2) === xe$1 ? ro$1(t.encoded) : t.encoded, n3 = fromString(e2, qt$2), r2 = n3.slice($c, eo$1), o3 = eo$1;
  if (Bt$2(r2) === Ft$2) {
    const a2 = o3 + hn$1, u2 = a2 + oe$1, l2 = n3.slice(o3, a2), f5 = n3.slice(a2, u2), h4 = n3.slice(u2);
    return { type: r2, sealed: h4, iv: f5, senderPublicKey: l2 };
  }
  if (Bt$2(r2) === re$2) {
    const a2 = n3.slice(o3), u2 = Lt$2(oe$1);
    return { type: r2, sealed: a2, iv: u2 };
  }
  const i3 = o3 + oe$1, s2 = n3.slice(o3, i3), c2 = n3.slice(i3);
  return { type: r2, sealed: c2, iv: s2 };
}
function qc(t, e2) {
  const n3 = Se$1({ encoded: t, encoding: e2 == null ? void 0 : e2.encoding });
  return oo$1({ type: Bt$2(n3.type), senderPublicKey: typeof n3.senderPublicKey < "u" ? toString(n3.senderPublicKey, G$2) : void 0, receiverPublicKey: e2 == null ? void 0 : e2.receiverPublicKey });
}
function oo$1(t) {
  const e2 = (t == null ? void 0 : t.type) || dn$1;
  if (e2 === Ft$2) {
    if (typeof (t == null ? void 0 : t.senderPublicKey) > "u") throw new Error("missing sender public key");
    if (typeof (t == null ? void 0 : t.receiverPublicKey) > "u") throw new Error("missing receiver public key");
  }
  return { type: e2, senderPublicKey: t == null ? void 0 : t.senderPublicKey, receiverPublicKey: t == null ? void 0 : t.receiverPublicKey };
}
function Kc(t) {
  return t.type === Ft$2 && typeof t.senderPublicKey == "string" && typeof t.receiverPublicKey == "string";
}
function Fc(t) {
  return t.type === re$2;
}
function io$1(t) {
  const e2 = Buffer.from(t.x, "base64"), n3 = Buffer.from(t.y, "base64");
  return concat([new Uint8Array([4]), e2, n3]);
}
function zc(t, e2) {
  const [n3, r2, o3] = t.split("."), i3 = Buffer.from(ro$1(o3), "base64");
  if (i3.length !== 64) throw new Error("Invalid signature length");
  const s2 = i3.slice(0, 32), c2 = i3.slice(32, 64), a2 = `${n3}.${r2}`, u2 = Qt$2(a2), l2 = io$1(e2);
  if (!_c.verify(concat([s2, c2]), u2, l2)) throw new Error("Invalid signature");
  return sn$2(t).payload;
}
const so$1 = "irn";
function Zc(t) {
  return (t == null ? void 0 : t.relay) || { protocol: so$1 };
}
function Yc(t) {
  const e2 = C$4[t];
  if (typeof e2 > "u") throw new Error(`Relay Protocol not supported: ${t}`);
  return e2;
}
function co$1(t, e2 = "-") {
  const n3 = {}, r2 = "relay" + e2;
  return Object.keys(t).forEach((o3) => {
    if (o3.startsWith(r2)) {
      const i3 = o3.replace(r2, ""), s2 = t[o3];
      n3[i3] = s2;
    }
  }), n3;
}
function Gc(t) {
  if (!t.includes("wc:")) {
    const u2 = je$2(t);
    u2 != null && u2.includes("wc:") && (t = u2);
  }
  t = t.includes("wc://") ? t.replace("wc://", "") : t, t = t.includes("wc:") ? t.replace("wc:", "") : t;
  const e2 = t.indexOf(":"), n3 = t.indexOf("?") !== -1 ? t.indexOf("?") : void 0, r2 = t.substring(0, e2), o3 = t.substring(e2 + 1, n3).split("@"), i3 = typeof n3 < "u" ? t.substring(n3) : "", s2 = new URLSearchParams(i3), c2 = {};
  s2.forEach((u2, l2) => {
    c2[l2] = u2;
  });
  const a2 = typeof c2.methods == "string" ? c2.methods.split(",") : void 0;
  return { protocol: r2, topic: ao$1(o3[0]), version: parseInt(o3[1], 10), symKey: c2.symKey, relay: co$1(c2), methods: a2, expiryTimestamp: c2.expiryTimestamp ? parseInt(c2.expiryTimestamp, 10) : void 0 };
}
function ao$1(t) {
  return t.startsWith("//") ? t.substring(2) : t;
}
function uo$1(t, e2 = "-") {
  const n3 = "relay", r2 = {};
  return Object.keys(t).forEach((o3) => {
    const i3 = o3, s2 = n3 + e2 + i3;
    t[i3] && (r2[s2] = t[i3]);
  }), r2;
}
function Wc(t) {
  const e2 = new URLSearchParams(), n3 = uo$1(t.relay);
  Object.keys(n3).sort().forEach((o3) => {
    e2.set(o3, n3[o3]);
  }), e2.set("symKey", t.symKey), t.expiryTimestamp && e2.set("expiryTimestamp", t.expiryTimestamp.toString()), t.methods && e2.set("methods", t.methods.join(","));
  const r2 = e2.toString();
  return `${t.protocol}:${t.topic}@${t.version}?${r2}`;
}
function Xc(t, e2, n3) {
  return `${t}?wc_ev=${n3}&topic=${e2}`;
}
var Jc = Object.defineProperty, Qc = Object.defineProperties, ta = Object.getOwnPropertyDescriptors, fo$1 = Object.getOwnPropertySymbols, ea = Object.prototype.hasOwnProperty, na = Object.prototype.propertyIsEnumerable, lo$1 = (t, e2, n3) => e2 in t ? Jc(t, e2, { enumerable: true, configurable: true, writable: true, value: n3 }) : t[e2] = n3, ra = (t, e2) => {
  for (var n3 in e2 || (e2 = {})) ea.call(e2, n3) && lo$1(t, n3, e2[n3]);
  if (fo$1) for (var n3 of fo$1(e2)) na.call(e2, n3) && lo$1(t, n3, e2[n3]);
  return t;
}, oa = (t, e2) => Qc(t, ta(e2));
function It$2(t) {
  const e2 = [];
  return t.forEach((n3) => {
    const [r2, o3] = n3.split(":");
    e2.push(`${r2}:${o3}`);
  }), e2;
}
function ho$1(t) {
  const e2 = [];
  return Object.values(t).forEach((n3) => {
    e2.push(...It$2(n3.accounts));
  }), e2;
}
function po$1(t, e2) {
  const n3 = [];
  return Object.values(t).forEach((r2) => {
    It$2(r2.accounts).includes(e2) && n3.push(...r2.methods);
  }), n3;
}
function go$1(t, e2) {
  const n3 = [];
  return Object.values(t).forEach((r2) => {
    It$2(r2.accounts).includes(e2) && n3.push(...r2.events);
  }), n3;
}
function yn$1(t) {
  return t.includes(":");
}
function yo$1(t) {
  return yn$1(t) ? t.split(":")[0] : t;
}
function ie$1(t) {
  var e2, n3, r2;
  const o3 = {};
  if (!Oe$1(t)) return o3;
  for (const [i3, s2] of Object.entries(t)) {
    const c2 = yn$1(i3) ? [i3] : s2.chains, a2 = s2.methods || [], u2 = s2.events || [], l2 = yo$1(i3);
    o3[l2] = oa(ra({}, o3[l2]), { chains: ot$1(c2, (e2 = o3[l2]) == null ? void 0 : e2.chains), methods: ot$1(a2, (n3 = o3[l2]) == null ? void 0 : n3.methods), events: ot$1(u2, (r2 = o3[l2]) == null ? void 0 : r2.events) });
  }
  return o3;
}
function mo$1(t) {
  const e2 = {};
  return t == null ? void 0 : t.forEach((n3) => {
    var r2;
    const [o3, i3] = n3.split(":");
    e2[o3] || (e2[o3] = { accounts: [], chains: [], events: [], methods: [] }), e2[o3].accounts.push(n3), (r2 = e2[o3].chains) == null || r2.push(`${o3}:${i3}`);
  }), e2;
}
function ca(t, e2) {
  e2 = e2.map((r2) => r2.replace("did:pkh:", ""));
  const n3 = mo$1(e2);
  for (const [r2, o3] of Object.entries(n3)) o3.methods ? o3.methods = ot$1(o3.methods, t) : o3.methods = t, o3.events = ["chainChanged", "accountsChanged"];
  return n3;
}
function aa(t, e2) {
  var n3, r2, o3, i3, s2, c2;
  const a2 = ie$1(t), u2 = ie$1(e2), l2 = {}, f5 = Object.keys(a2).concat(Object.keys(u2));
  for (const h4 of f5) l2[h4] = { chains: ot$1((n3 = a2[h4]) == null ? void 0 : n3.chains, (r2 = u2[h4]) == null ? void 0 : r2.chains), methods: ot$1((o3 = a2[h4]) == null ? void 0 : o3.methods, (i3 = u2[h4]) == null ? void 0 : i3.methods), events: ot$1((s2 = a2[h4]) == null ? void 0 : s2.events, (c2 = u2[h4]) == null ? void 0 : c2.events) };
  return l2;
}
const wo$1 = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, bo$1 = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function ht$2(t, e2) {
  const { message: n3, code: r2 } = bo$1[t];
  return { message: e2 ? `${n3} ${e2}` : n3, code: r2 };
}
function Nt$1(t, e2) {
  const { message: n3, code: r2 } = wo$1[t];
  return { message: e2 ? `${n3} ${e2}` : n3, code: r2 };
}
function se$2(t, e2) {
  return Array.isArray(t) ? true : false;
}
function Oe$1(t) {
  return Object.getPrototypeOf(t) === Object.prototype && Object.keys(t).length;
}
function Et$2(t) {
  return typeof t > "u";
}
function nt$2(t, e2) {
  return e2 && Et$2(t) ? true : typeof t == "string" && !!t.trim().length;
}
function Ae$1(t, e2) {
  return typeof t == "number" && !isNaN(t);
}
function ua(t, e2) {
  const { requiredNamespaces: n3 } = e2, r2 = Object.keys(t.namespaces), o3 = Object.keys(n3);
  let i3 = true;
  return gt$2(o3, r2) ? (r2.forEach((s2) => {
    const { accounts: c2, methods: a2, events: u2 } = t.namespaces[s2], l2 = It$2(c2), f5 = n3[s2];
    (!gt$2(ue$2(s2, f5), l2) || !gt$2(f5.methods, a2) || !gt$2(f5.events, u2)) && (i3 = false);
  }), i3) : false;
}
function ce$2(t) {
  return nt$2(t, false) && t.includes(":") ? t.split(":").length === 2 : false;
}
function Eo$1(t) {
  if (nt$2(t, false) && t.includes(":")) {
    const e2 = t.split(":");
    if (e2.length === 3) {
      const n3 = e2[0] + ":" + e2[1];
      return !!e2[2] && ce$2(n3);
    }
  }
  return false;
}
function fa(t) {
  function e2(n3) {
    try {
      return typeof new URL(n3) < "u";
    } catch {
      return false;
    }
  }
  try {
    if (nt$2(t, false)) {
      if (e2(t)) return true;
      const n3 = je$2(t);
      return e2(n3);
    }
  } catch {
  }
  return false;
}
function la(t) {
  var e2;
  return (e2 = t == null ? void 0 : t.proposer) == null ? void 0 : e2.publicKey;
}
function da(t) {
  return t == null ? void 0 : t.topic;
}
function ha(t, e2) {
  let n3 = null;
  return nt$2(t == null ? void 0 : t.publicKey, false) || (n3 = ht$2("MISSING_OR_INVALID", `${e2} controller public key should be a string`)), n3;
}
function mn$1(t) {
  let e2 = true;
  return se$2(t) ? t.length && (e2 = t.every((n3) => nt$2(n3, false))) : e2 = false, e2;
}
function vo$1(t, e2, n3) {
  let r2 = null;
  return se$2(e2) && e2.length ? e2.forEach((o3) => {
    r2 || ce$2(o3) || (r2 = Nt$1("UNSUPPORTED_CHAINS", `${n3}, chain ${o3} should be a string and conform to "namespace:chainId" format`));
  }) : ce$2(t) || (r2 = Nt$1("UNSUPPORTED_CHAINS", `${n3}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r2;
}
function xo$1(t, e2, n3) {
  let r2 = null;
  return Object.entries(t).forEach(([o3, i3]) => {
    if (r2) return;
    const s2 = vo$1(o3, ue$2(o3, i3), `${e2} ${n3}`);
    s2 && (r2 = s2);
  }), r2;
}
function So$1(t, e2) {
  let n3 = null;
  return se$2(t) ? t.forEach((r2) => {
    n3 || Eo$1(r2) || (n3 = Nt$1("UNSUPPORTED_ACCOUNTS", `${e2}, account ${r2} should be a string and conform to "namespace:chainId:address" format`));
  }) : n3 = Nt$1("UNSUPPORTED_ACCOUNTS", `${e2}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), n3;
}
function Oo$1(t, e2) {
  let n3 = null;
  return Object.values(t).forEach((r2) => {
    if (n3) return;
    const o3 = So$1(r2 == null ? void 0 : r2.accounts, `${e2} namespace`);
    o3 && (n3 = o3);
  }), n3;
}
function Ao$1(t, e2) {
  let n3 = null;
  return mn$1(t == null ? void 0 : t.methods) ? mn$1(t == null ? void 0 : t.events) || (n3 = Nt$1("UNSUPPORTED_EVENTS", `${e2}, events should be an array of strings or empty array for no events`)) : n3 = Nt$1("UNSUPPORTED_METHODS", `${e2}, methods should be an array of strings or empty array for no methods`), n3;
}
function wn$1(t, e2) {
  let n3 = null;
  return Object.values(t).forEach((r2) => {
    if (n3) return;
    const o3 = Ao$1(r2, `${e2}, namespace`);
    o3 && (n3 = o3);
  }), n3;
}
function pa(t, e2, n3) {
  let r2 = null;
  if (t && Oe$1(t)) {
    const o3 = wn$1(t, e2);
    o3 && (r2 = o3);
    const i3 = xo$1(t, e2, n3);
    i3 && (r2 = i3);
  } else r2 = ht$2("MISSING_OR_INVALID", `${e2}, ${n3} should be an object with data`);
  return r2;
}
function Bo$1(t, e2) {
  let n3 = null;
  if (t && Oe$1(t)) {
    const r2 = wn$1(t, e2);
    r2 && (n3 = r2);
    const o3 = Oo$1(t, e2);
    o3 && (n3 = o3);
  } else n3 = ht$2("MISSING_OR_INVALID", `${e2}, namespaces should be an object with data`);
  return n3;
}
function Io$1(t) {
  return nt$2(t.protocol, true);
}
function ga(t, e2) {
  let n3 = false;
  return !t ? n3 = true : t && se$2(t) && t.length && t.forEach((r2) => {
    n3 = Io$1(r2);
  }), n3;
}
function ya(t) {
  return typeof t == "number";
}
function ma(t) {
  return typeof t < "u" && typeof t !== null;
}
function wa(t) {
  return !(!t || typeof t != "object" || !t.code || !Ae$1(t.code) || !t.message || !nt$2(t.message, false));
}
function ba(t) {
  return !(Et$2(t) || !nt$2(t.method, false));
}
function Ea(t) {
  return !(Et$2(t) || Et$2(t.result) && Et$2(t.error) || !Ae$1(t.id) || !nt$2(t.jsonrpc, false));
}
function va(t) {
  return !(Et$2(t) || !nt$2(t.name, false));
}
function xa(t, e2) {
  return !(!ce$2(e2) || !ho$1(t).includes(e2));
}
function Sa(t, e2, n3) {
  return nt$2(n3, false) ? po$1(t, e2).includes(n3) : false;
}
function Oa(t, e2, n3) {
  return nt$2(n3, false) ? go$1(t, e2).includes(n3) : false;
}
function No$1(t, e2, n3) {
  let r2 = null;
  const o3 = Aa(t), i3 = Ba(e2), s2 = Object.keys(o3), c2 = Object.keys(i3), a2 = Uo$1(Object.keys(t)), u2 = Uo$1(Object.keys(e2)), l2 = a2.filter((f5) => !u2.includes(f5));
  return l2.length && (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n3} namespaces keys don't satisfy requiredNamespaces.
      Required: ${l2.toString()}
      Received: ${Object.keys(e2).toString()}`)), gt$2(s2, c2) || (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n3} namespaces chains don't satisfy required namespaces.
      Required: ${s2.toString()}
      Approved: ${c2.toString()}`)), Object.keys(e2).forEach((f5) => {
    if (!f5.includes(":") || r2) return;
    const h4 = It$2(e2[f5].accounts);
    h4.includes(f5) || (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n3} namespaces accounts don't satisfy namespace accounts for ${f5}
        Required: ${f5}
        Approved: ${h4.toString()}`));
  }), s2.forEach((f5) => {
    r2 || (gt$2(o3[f5].methods, i3[f5].methods) ? gt$2(o3[f5].events, i3[f5].events) || (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n3} namespaces events don't satisfy namespace events for ${f5}`)) : r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n3} namespaces methods don't satisfy namespace methods for ${f5}`));
  }), r2;
}
function Aa(t) {
  const e2 = {};
  return Object.keys(t).forEach((n3) => {
    var r2;
    n3.includes(":") ? e2[n3] = t[n3] : (r2 = t[n3].chains) == null || r2.forEach((o3) => {
      e2[o3] = { methods: t[n3].methods, events: t[n3].events };
    });
  }), e2;
}
function Uo$1(t) {
  return [...new Set(t.map((e2) => e2.includes(":") ? e2.split(":")[0] : e2))];
}
function Ba(t) {
  const e2 = {};
  return Object.keys(t).forEach((n3) => {
    if (n3.includes(":")) e2[n3] = t[n3];
    else {
      const r2 = It$2(t[n3].accounts);
      r2 == null ? void 0 : r2.forEach((o3) => {
        e2[o3] = { accounts: t[n3].accounts.filter((i3) => i3.includes(`${o3}:`)), methods: t[n3].methods, events: t[n3].events };
      });
    }
  }), e2;
}
function Ia(t, e2) {
  return Ae$1(t) && t <= e2.max && t >= e2.min;
}
function Na() {
  const t = xt$2();
  return new Promise((e2) => {
    switch (t) {
      case Y$3.browser:
        e2(To$1());
        break;
      case Y$3.reactNative:
        e2(Ro$1());
        break;
      case Y$3.node:
        e2(_o$1());
        break;
      default:
        e2(true);
    }
  });
}
function To$1() {
  return Tt$2() && (navigator == null ? void 0 : navigator.onLine);
}
async function Ro$1() {
  if (pt$2() && typeof global < "u" && global != null && global.NetInfo) {
    const t = await (global == null ? void 0 : global.NetInfo.fetch());
    return t == null ? void 0 : t.isConnected;
  }
  return true;
}
function _o$1() {
  return true;
}
function Ua(t) {
  switch (xt$2()) {
    case Y$3.browser:
      $o$1(t);
      break;
    case Y$3.reactNative:
      Lo$1(t);
      break;
  }
}
function $o$1(t) {
  !pt$2() && Tt$2() && (window.addEventListener("online", () => t(true)), window.addEventListener("offline", () => t(false)));
}
function Lo$1(t) {
  pt$2() && typeof global < "u" && global != null && global.NetInfo && (global == null ? void 0 : global.NetInfo.addEventListener((e2) => t(e2 == null ? void 0 : e2.isConnected)));
}
function Ta() {
  var t;
  return Tt$2() && getDocument_1() ? ((t = getDocument_1()) == null ? void 0 : t.visibilityState) === "visible" : true;
}
const bn$1 = {};
class Ra {
  static get(e2) {
    return bn$1[e2];
  }
  static set(e2, n3) {
    bn$1[e2] = n3;
  }
  static delete(e2) {
    delete bn$1[e2];
  }
}
class IEvents {
}
let n$2 = class n extends IEvents {
  constructor(e2) {
    super();
  }
};
const s = cjs$3.FIVE_SECONDS, r$1 = { pulse: "heartbeat_pulse" };
let i$2 = class i extends n$2 {
  constructor(e2) {
    super(e2), this.events = new eventsExports.EventEmitter(), this.interval = s, this.interval = (e2 == null ? void 0 : e2.interval) || s;
  }
  static async init(e2) {
    const t = new i(e2);
    return await t.init(), t;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), cjs$3.toMiliseconds(this.interval));
  }
  pulse() {
    this.events.emit(r$1.pulse);
  }
};
const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}
function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c2) => c2.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}
function normalizeKey(key) {
  var _a;
  if (!key) {
    return "";
  }
  return ((_a = key.split("?")[0]) == null ? void 0 : _a.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "")) || "";
}
function joinKeys(...keys2) {
  return normalizeKey(keys2.join(":"));
}
function normalizeBaseKey(base3) {
  base3 = normalizeKey(base3);
  return base3 ? base3 + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base3) {
  if (base3) {
    return key.startsWith(base3) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}
function defineDriver(factory) {
  return factory;
}
const DRIVER_NAME = "memory";
const memory = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});
function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base3 of context.mountpoints) {
      if (key.startsWith(base3)) {
        return {
          base: base3,
          relativeKey: key.slice(base3.length),
          driver: context.mounts[base3]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base3, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base3) || includeParent && base3.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base3.length > mountpoint.length ? base3.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r2) => r2.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r2) => r2.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base3, opts = {}) {
      var _a;
      base3 = normalizeBaseKey(base3);
      const mounts = getMounts(base3, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!((_a = mount.driver.flags) == null ? void 0 : _a.maxDepth)) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey(key);
          if (!maskedMounts.some((p2) => fullKey.startsWith(p2))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p2) => !p2.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base3)
      );
    },
    // Utils
    async clear(base3, opts = {}) {
      base3 = normalizeBaseKey(base3);
      await Promise.all(
        getMounts(base3, false).map(async (m3) => {
          if (m3.driver.clear) {
            return asyncCall(m3.driver.clear, m3.relativeBase, opts);
          }
          if (m3.driver.removeItem) {
            const keys2 = await m3.driver.getKeys(m3.relativeBase || "", opts);
            return Promise.all(
              keys2.map((key) => m3.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base3, driver) {
      base3 = normalizeBaseKey(base3);
      if (base3 && context.mounts[base3]) {
        throw new Error(`already mounted at ${base3}`);
      }
      if (base3) {
        context.mountpoints.push(base3);
        context.mountpoints.sort((a2, b2) => b2.length - a2.length);
      }
      context.mounts[base3] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base3)).then((unwatcher) => {
          context.unwatch[base3] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base3, _dispose = true) {
      var _a, _b;
      base3 = normalizeBaseKey(base3);
      if (!base3 || !context.mounts[base3]) {
        return;
      }
      if (context.watching && base3 in context.unwatch) {
        (_b = (_a = context.unwatch)[base3]) == null ? void 0 : _b.call(_a);
        delete context.unwatch[base3];
      }
      if (_dispose) {
        await dispose(context.mounts[base3]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base3);
      delete context.mounts[base3];
    },
    getMount(key = "") {
      key = normalizeKey(key) + ":";
      const m3 = getMount(key);
      return {
        driver: m3.driver,
        base: m3.base
      };
    },
    getMounts(base3 = "", opts = {}) {
      base3 = normalizeKey(base3);
      const mounts = getMounts(base3, opts.parents);
      return mounts.map((m3) => ({
        driver: m3.driver,
        base: m3.mountpoint
      }));
    },
    // Aliases
    keys: (base3, opts = {}) => storage.getKeys(base3, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base3) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base3 + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}
const x$2 = "idb-keyval";
var z$3 = (i3 = {}) => {
  const t = i3.base && i3.base.length > 0 ? `${i3.base}:` : "", e2 = (s2) => t + s2;
  let n3;
  return i3.dbName && i3.storeName && (n3 = createStore(i3.dbName, i3.storeName)), { name: x$2, options: i3, async hasItem(s2) {
    return !(typeof await get(e2(s2), n3) > "u");
  }, async getItem(s2) {
    return await get(e2(s2), n3) ?? null;
  }, setItem(s2, a2) {
    return set$1(e2(s2), a2, n3);
  }, removeItem(s2) {
    return del(e2(s2), n3);
  }, getKeys() {
    return keys(n3);
  }, clear() {
    return clear(n3);
  } };
};
const D$2 = "WALLET_CONNECT_V2_INDEXED_DB", E$6 = "keyvaluestorage";
let _$2 = class _ {
  constructor() {
    this.indexedDb = createStorage({ driver: z$3({ dbName: D$2, storeName: E$6 }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t) => [t.key, t.value]);
  }
  async getItem(t) {
    const e2 = await this.indexedDb.getItem(t);
    if (e2 !== null) return e2;
  }
  async setItem(t, e2) {
    await this.indexedDb.setItem(t, safeJsonStringify(e2));
  }
  async removeItem(t) {
    await this.indexedDb.removeItem(t);
  }
};
var l$3 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, c$4 = { exports: {} };
(function() {
  let i3;
  function t() {
  }
  i3 = t, i3.prototype.getItem = function(e2) {
    return this.hasOwnProperty(e2) ? String(this[e2]) : null;
  }, i3.prototype.setItem = function(e2, n3) {
    this[e2] = String(n3);
  }, i3.prototype.removeItem = function(e2) {
    delete this[e2];
  }, i3.prototype.clear = function() {
    const e2 = this;
    Object.keys(e2).forEach(function(n3) {
      e2[n3] = void 0, delete e2[n3];
    });
  }, i3.prototype.key = function(e2) {
    return e2 = e2 || 0, Object.keys(this)[e2];
  }, i3.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof l$3 < "u" && l$3.localStorage ? c$4.exports = l$3.localStorage : typeof window < "u" && window.localStorage ? c$4.exports = window.localStorage : c$4.exports = new t();
})();
function k$5(i3) {
  var t;
  return [i3[0], safeJsonParse((t = i3[1]) != null ? t : "")];
}
let K$2 = class K {
  constructor() {
    this.localStorage = c$4.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(k$5);
  }
  async getItem(t) {
    const e2 = this.localStorage.getItem(t);
    if (e2 !== null) return safeJsonParse(e2);
  }
  async setItem(t, e2) {
    this.localStorage.setItem(t, safeJsonStringify(e2));
  }
  async removeItem(t) {
    this.localStorage.removeItem(t);
  }
};
const N$2 = "wc_storage_version", y$4 = 1, O$5 = async (i3, t, e2) => {
  const n3 = N$2, s2 = await t.getItem(n3);
  if (s2 && s2 >= y$4) {
    e2(t);
    return;
  }
  const a2 = await i3.getKeys();
  if (!a2.length) {
    e2(t);
    return;
  }
  const m3 = [];
  for (; a2.length; ) {
    const r2 = a2.shift();
    if (!r2) continue;
    const o3 = r2.toLowerCase();
    if (o3.includes("wc@") || o3.includes("walletconnect") || o3.includes("wc_") || o3.includes("wallet_connect")) {
      const f5 = await i3.getItem(r2);
      await t.setItem(r2, f5), m3.push(r2);
    }
  }
  await t.setItem(n3, y$4), e2(t), j$2(i3, m3);
}, j$2 = async (i3, t) => {
  t.length && t.forEach(async (e2) => {
    await i3.removeItem(e2);
  });
};
let h$3 = class h {
  constructor() {
    this.initialized = false, this.setInitialized = (e2) => {
      this.storage = e2, this.initialized = true;
    };
    const t = new K$2();
    this.storage = t;
    try {
      const e2 = new _$2();
      O$5(t, e2, this.setInitialized);
    } catch {
      this.initialized = true;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(t) {
    return await this.initialize(), this.storage.getItem(t);
  }
  async setItem(t, e2) {
    return await this.initialize(), this.storage.setItem(t, e2);
  }
  async removeItem(t) {
    return await this.initialize(), this.storage.removeItem(t);
  }
  async initialize() {
    this.initialized || await new Promise((t) => {
      const e2 = setInterval(() => {
        this.initialized && (clearInterval(e2), t());
      }, 20);
    });
  }
};
function tryStringify(o3) {
  try {
    return JSON.stringify(o3);
  } catch (e2) {
    return '"[Circular]"';
  }
}
var quickFormatUnescaped = format$1;
function format$1(f5, args, opts) {
  var ss = opts && opts.stringify || tryStringify;
  var offset = 1;
  if (typeof f5 === "object" && f5 !== null) {
    var len = args.length + offset;
    if (len === 1) return f5;
    var objects = new Array(len);
    objects[0] = ss(f5);
    for (var index = 1; index < len; index++) {
      objects[index] = ss(args[index]);
    }
    return objects.join(" ");
  }
  if (typeof f5 !== "string") {
    return f5;
  }
  var argLen = args.length;
  if (argLen === 0) return f5;
  var str = "";
  var a2 = 1 - offset;
  var lastPos = -1;
  var flen = f5 && f5.length || 0;
  for (var i3 = 0; i3 < flen; ) {
    if (f5.charCodeAt(i3) === 37 && i3 + 1 < flen) {
      lastPos = lastPos > -1 ? lastPos : 0;
      switch (f5.charCodeAt(i3 + 1)) {
        case 100:
        case 102:
          if (a2 >= argLen)
            break;
          if (args[a2] == null) break;
          if (lastPos < i3)
            str += f5.slice(lastPos, i3);
          str += Number(args[a2]);
          lastPos = i3 + 2;
          i3++;
          break;
        case 105:
          if (a2 >= argLen)
            break;
          if (args[a2] == null) break;
          if (lastPos < i3)
            str += f5.slice(lastPos, i3);
          str += Math.floor(Number(args[a2]));
          lastPos = i3 + 2;
          i3++;
          break;
        case 79:
        case 111:
        case 106:
          if (a2 >= argLen)
            break;
          if (args[a2] === void 0) break;
          if (lastPos < i3)
            str += f5.slice(lastPos, i3);
          var type = typeof args[a2];
          if (type === "string") {
            str += "'" + args[a2] + "'";
            lastPos = i3 + 2;
            i3++;
            break;
          }
          if (type === "function") {
            str += args[a2].name || "<anonymous>";
            lastPos = i3 + 2;
            i3++;
            break;
          }
          str += ss(args[a2]);
          lastPos = i3 + 2;
          i3++;
          break;
        case 115:
          if (a2 >= argLen)
            break;
          if (lastPos < i3)
            str += f5.slice(lastPos, i3);
          str += String(args[a2]);
          lastPos = i3 + 2;
          i3++;
          break;
        case 37:
          if (lastPos < i3)
            str += f5.slice(lastPos, i3);
          str += "%";
          lastPos = i3 + 2;
          i3++;
          a2--;
          break;
      }
      ++a2;
    }
    ++i3;
  }
  if (lastPos === -1)
    return f5;
  else if (lastPos < flen) {
    str += f5.slice(lastPos);
  }
  return str;
}
const format = quickFormatUnescaped;
var browser = pino;
const _console = pfGlobalThisOrFallback().console || {};
const stdSerializers = {
  mapHttpRequest: mock,
  mapHttpResponse: mock,
  wrapRequestSerializer: passthrough,
  wrapResponseSerializer: passthrough,
  wrapErrorSerializer: passthrough,
  req: mock,
  res: mock,
  err: asErrValue
};
function shouldSerialize(serialize, serializers) {
  if (Array.isArray(serialize)) {
    const hasToFilter = serialize.filter(function(k2) {
      return k2 !== "!stdSerializers.err";
    });
    return hasToFilter;
  } else if (serialize === true) {
    return Object.keys(serializers);
  }
  return false;
}
function pino(opts) {
  opts = opts || {};
  opts.browser = opts.browser || {};
  const transmit2 = opts.browser.transmit;
  if (transmit2 && typeof transmit2.send !== "function") {
    throw Error("pino: transmit option must have a send function");
  }
  const proto = opts.browser.write || _console;
  if (opts.browser.write) opts.browser.asObject = true;
  const serializers = opts.serializers || {};
  const serialize = shouldSerialize(opts.browser.serialize, serializers);
  let stdErrSerialize = opts.browser.serialize;
  if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1) stdErrSerialize = false;
  const levels = ["error", "fatal", "warn", "info", "debug", "trace"];
  if (typeof proto === "function") {
    proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
  }
  if (opts.enabled === false) opts.level = "silent";
  const level = opts.level || "info";
  const logger = Object.create(proto);
  if (!logger.log) logger.log = noop;
  Object.defineProperty(logger, "levelVal", {
    get: getLevelVal
  });
  Object.defineProperty(logger, "level", {
    get: getLevel,
    set: setLevel
  });
  const setOpts = {
    transmit: transmit2,
    serialize,
    asObject: opts.browser.asObject,
    levels,
    timestamp: getTimeFunction(opts)
  };
  logger.levels = pino.levels;
  logger.level = level;
  logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
  logger.serializers = serializers;
  logger._serialize = serialize;
  logger._stdErrSerialize = stdErrSerialize;
  logger.child = child;
  if (transmit2) logger._logEvent = createLogEventShape();
  function getLevelVal() {
    return this.level === "silent" ? Infinity : this.levels.values[this.level];
  }
  function getLevel() {
    return this._level;
  }
  function setLevel(level2) {
    if (level2 !== "silent" && !this.levels.values[level2]) {
      throw Error("unknown level " + level2);
    }
    this._level = level2;
    set(setOpts, logger, "error", "log");
    set(setOpts, logger, "fatal", "error");
    set(setOpts, logger, "warn", "error");
    set(setOpts, logger, "info", "log");
    set(setOpts, logger, "debug", "log");
    set(setOpts, logger, "trace", "log");
  }
  function child(bindings, childOptions) {
    if (!bindings) {
      throw new Error("missing bindings for child Pino");
    }
    childOptions = childOptions || {};
    if (serialize && bindings.serializers) {
      childOptions.serializers = bindings.serializers;
    }
    const childOptionsSerializers = childOptions.serializers;
    if (serialize && childOptionsSerializers) {
      var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
      var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
      delete bindings.serializers;
      applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
    }
    function Child(parent) {
      this._childLevel = (parent._childLevel | 0) + 1;
      this.error = bind(parent, bindings, "error");
      this.fatal = bind(parent, bindings, "fatal");
      this.warn = bind(parent, bindings, "warn");
      this.info = bind(parent, bindings, "info");
      this.debug = bind(parent, bindings, "debug");
      this.trace = bind(parent, bindings, "trace");
      if (childSerializers) {
        this.serializers = childSerializers;
        this._serialize = childSerialize;
      }
      if (transmit2) {
        this._logEvent = createLogEventShape(
          [].concat(parent._logEvent.bindings, bindings)
        );
      }
    }
    Child.prototype = this;
    return new Child(this);
  }
  return logger;
}
pino.levels = {
  values: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  labels: {
    10: "trace",
    20: "debug",
    30: "info",
    40: "warn",
    50: "error",
    60: "fatal"
  }
};
pino.stdSerializers = stdSerializers;
pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
function set(opts, logger, level, fallback) {
  const proto = Object.getPrototypeOf(logger);
  logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
  wrap(opts, logger, level);
}
function wrap(opts, logger, level) {
  if (!opts.transmit && logger[level] === noop) return;
  logger[level] = /* @__PURE__ */ function(write) {
    return function LOG() {
      const ts2 = opts.timestamp();
      const args = new Array(arguments.length);
      const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
      for (var i3 = 0; i3 < args.length; i3++) args[i3] = arguments[i3];
      if (opts.serialize && !opts.asObject) {
        applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
      }
      if (opts.asObject) write.call(proto, asObject(this, level, args, ts2));
      else write.apply(proto, args);
      if (opts.transmit) {
        const transmitLevel = opts.transmit.level || logger.level;
        const transmitValue = pino.levels.values[transmitLevel];
        const methodValue = pino.levels.values[level];
        if (methodValue < transmitValue) return;
        transmit(this, {
          ts: ts2,
          methodLevel: level,
          methodValue,
          transmitLevel,
          transmitValue: pino.levels.values[opts.transmit.level || logger.level],
          send: opts.transmit.send,
          val: logger.levelVal
        }, args);
      }
    };
  }(logger[level]);
}
function asObject(logger, level, args, ts2) {
  if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
  const argsCloned = args.slice();
  let msg = argsCloned[0];
  const o3 = {};
  if (ts2) {
    o3.time = ts2;
  }
  o3.level = pino.levels.values[level];
  let lvl = (logger._childLevel | 0) + 1;
  if (lvl < 1) lvl = 1;
  if (msg !== null && typeof msg === "object") {
    while (lvl-- && typeof argsCloned[0] === "object") {
      Object.assign(o3, argsCloned.shift());
    }
    msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
  } else if (typeof msg === "string") msg = format(argsCloned.shift(), argsCloned);
  if (msg !== void 0) o3.msg = msg;
  return o3;
}
function applySerializers(args, serialize, serializers, stdErrSerialize) {
  for (const i3 in args) {
    if (stdErrSerialize && args[i3] instanceof Error) {
      args[i3] = pino.stdSerializers.err(args[i3]);
    } else if (typeof args[i3] === "object" && !Array.isArray(args[i3])) {
      for (const k2 in args[i3]) {
        if (serialize && serialize.indexOf(k2) > -1 && k2 in serializers) {
          args[i3][k2] = serializers[k2](args[i3][k2]);
        }
      }
    }
  }
}
function bind(parent, bindings, level) {
  return function() {
    const args = new Array(1 + arguments.length);
    args[0] = bindings;
    for (var i3 = 1; i3 < args.length; i3++) {
      args[i3] = arguments[i3 - 1];
    }
    return parent[level].apply(this, args);
  };
}
function transmit(logger, opts, args) {
  const send = opts.send;
  const ts2 = opts.ts;
  const methodLevel = opts.methodLevel;
  const methodValue = opts.methodValue;
  const val = opts.val;
  const bindings = logger._logEvent.bindings;
  applySerializers(
    args,
    logger._serialize || Object.keys(logger.serializers),
    logger.serializers,
    logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
  );
  logger._logEvent.ts = ts2;
  logger._logEvent.messages = args.filter(function(arg) {
    return bindings.indexOf(arg) === -1;
  });
  logger._logEvent.level.label = methodLevel;
  logger._logEvent.level.value = methodValue;
  send(methodLevel, logger._logEvent, val);
  logger._logEvent = createLogEventShape(bindings);
}
function createLogEventShape(bindings) {
  return {
    ts: 0,
    messages: [],
    bindings: bindings || [],
    level: { label: "", value: 0 }
  };
}
function asErrValue(err) {
  const obj = {
    type: err.constructor.name,
    msg: err.message,
    stack: err.stack
  };
  for (const key in err) {
    if (obj[key] === void 0) {
      obj[key] = err[key];
    }
  }
  return obj;
}
function getTimeFunction(opts) {
  if (typeof opts.timestamp === "function") {
    return opts.timestamp;
  }
  if (opts.timestamp === false) {
    return nullTime;
  }
  return epochTime;
}
function mock() {
  return {};
}
function passthrough(a2) {
  return a2;
}
function noop() {
}
function nullTime() {
  return false;
}
function epochTime() {
  return Date.now();
}
function unixTime() {
  return Math.round(Date.now() / 1e3);
}
function isoTime() {
  return new Date(Date.now()).toISOString();
}
function pfGlobalThisOrFallback() {
  function defd(o3) {
    return typeof o3 !== "undefined" && o3;
  }
  try {
    if (typeof globalThis !== "undefined") return globalThis;
    Object.defineProperty(Object.prototype, "globalThis", {
      get: function() {
        delete Object.prototype.globalThis;
        return this.globalThis = this;
      },
      configurable: true
    });
    return globalThis;
  } catch (e2) {
    return defd(self) || defd(window) || defd(this) || {};
  }
}
const Ot$1 = /* @__PURE__ */ getDefaultExportFromCjs(browser);
const c$3 = { level: "info" }, n$1 = "custom_context", l$2 = 1e3 * 1024;
let O$4 = class O {
  constructor(e2) {
    this.nodeValue = e2, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
};
let d$4 = class d {
  constructor(e2) {
    this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e2, this.sizeInBytes = 0;
  }
  append(e2) {
    const t = new O$4(e2);
    if (t.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${e2} with size ${t.size}`);
    for (; this.size + t.size > this.maxSizeInBytes; ) this.shift();
    this.head ? (this.tail && (this.tail.next = t), this.tail = t) : (this.head = t, this.tail = t), this.lengthInNodes++, this.sizeInBytes += t.size;
  }
  shift() {
    if (!this.head) return;
    const e2 = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e2.size;
  }
  toArray() {
    const e2 = [];
    let t = this.head;
    for (; t !== null; ) e2.push(t.value), t = t.next;
    return e2;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let e2 = this.head;
    return { next: () => {
      if (!e2) return { done: true, value: null };
      const t = e2.value;
      return e2 = e2.next, { done: false, value: t };
    } };
  }
};
let L$4 = class L {
  constructor(e2, t = l$2) {
    this.level = e2 ?? "error", this.levelValue = browser.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new d$4(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e2, t) {
    t === browser.levels.values.error ? console.error(e2) : t === browser.levels.values.warn ? console.warn(e2) : t === browser.levels.values.debug ? console.debug(e2) : t === browser.levels.values.trace ? console.trace(e2) : console.log(e2);
  }
  appendToLogs(e2) {
    this.logs.append(safeJsonStringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e2 }));
    const t = typeof e2 == "string" ? JSON.parse(e2).level : e2.level;
    t >= this.levelValue && this.forwardToConsole(e2, t);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new d$4(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e2) {
    const t = this.getLogArray();
    return t.push(safeJsonStringify({ extraMetadata: e2 })), new Blob(t, { type: "application/json" });
  }
};
let m$1 = class m {
  constructor(e2, t = l$2) {
    this.baseChunkLogger = new L$4(e2, t);
  }
  write(e2) {
    this.baseChunkLogger.appendToLogs(e2);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e2) {
    return this.baseChunkLogger.logsToBlob(e2);
  }
  downloadLogsBlobInBrowser(e2) {
    const t = URL.createObjectURL(this.logsToBlob(e2)), o3 = document.createElement("a");
    o3.href = t, o3.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(o3), o3.click(), document.body.removeChild(o3), URL.revokeObjectURL(t);
  }
};
let B$3 = class B {
  constructor(e2, t = l$2) {
    this.baseChunkLogger = new L$4(e2, t);
  }
  write(e2) {
    this.baseChunkLogger.appendToLogs(e2);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e2) {
    return this.baseChunkLogger.logsToBlob(e2);
  }
};
var x$1 = Object.defineProperty, S$4 = Object.defineProperties, _$1 = Object.getOwnPropertyDescriptors, p$4 = Object.getOwnPropertySymbols, T$3 = Object.prototype.hasOwnProperty, z$2 = Object.prototype.propertyIsEnumerable, f$5 = (r2, e2, t) => e2 in r2 ? x$1(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, i$1 = (r2, e2) => {
  for (var t in e2 || (e2 = {})) T$3.call(e2, t) && f$5(r2, t, e2[t]);
  if (p$4) for (var t of p$4(e2)) z$2.call(e2, t) && f$5(r2, t, e2[t]);
  return r2;
}, g$1 = (r2, e2) => S$4(r2, _$1(e2));
function k$4(r2) {
  return g$1(i$1({}, r2), { level: (r2 == null ? void 0 : r2.level) || c$3.level });
}
function v$6(r2, e2 = n$1) {
  return r2[e2] || "";
}
function b$5(r2, e2, t = n$1) {
  return r2[t] = e2, r2;
}
function y$3(r2, e2 = n$1) {
  let t = "";
  return typeof r2.bindings > "u" ? t = v$6(r2, e2) : t = r2.bindings().context || "", t;
}
function w$4(r2, e2, t = n$1) {
  const o3 = y$3(r2, t);
  return o3.trim() ? `${o3}/${e2}` : e2;
}
function E$5(r2, e2, t = n$1) {
  const o3 = w$4(r2, e2, t), a2 = r2.child({ context: o3 });
  return b$5(a2, o3, t);
}
function C$3(r2) {
  var e2, t;
  const o3 = new m$1((e2 = r2.opts) == null ? void 0 : e2.level, r2.maxSizeInBytes);
  return { logger: Ot$1(g$1(i$1({}, r2.opts), { level: "trace", browser: g$1(i$1({}, (t = r2.opts) == null ? void 0 : t.browser), { write: (a2) => o3.write(a2) }) })), chunkLoggerController: o3 };
}
function I$3(r2) {
  var e2;
  const t = new B$3((e2 = r2.opts) == null ? void 0 : e2.level, r2.maxSizeInBytes);
  return { logger: Ot$1(g$1(i$1({}, r2.opts), { level: "trace" }), t), chunkLoggerController: t };
}
function A$3(r2) {
  return typeof r2.loggerOverride < "u" && typeof r2.loggerOverride != "string" ? { logger: r2.loggerOverride, chunkLoggerController: null } : typeof window < "u" ? C$3(r2) : I$3(r2);
}
var a = Object.defineProperty, u$1 = (e2, s2, r2) => s2 in e2 ? a(e2, s2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e2[s2] = r2, c$2 = (e2, s2, r2) => u$1(e2, typeof s2 != "symbol" ? s2 + "" : s2, r2);
let h$2 = class h2 extends IEvents {
  constructor(s2) {
    super(), this.opts = s2, c$2(this, "protocol", "wc"), c$2(this, "version", 2);
  }
};
var p$3 = Object.defineProperty, b$4 = (e2, s2, r2) => s2 in e2 ? p$3(e2, s2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e2[s2] = r2, v$5 = (e2, s2, r2) => b$4(e2, s2 + "", r2);
let I$2 = class I extends IEvents {
  constructor(s2, r2) {
    super(), this.core = s2, this.logger = r2, v$5(this, "records", /* @__PURE__ */ new Map());
  }
};
let y$2 = class y {
  constructor(s2, r2) {
    this.logger = s2, this.core = r2;
  }
};
class m2 extends IEvents {
  constructor(s2, r2) {
    super(), this.relayer = s2, this.logger = r2;
  }
}
let d$3 = class d2 extends IEvents {
  constructor(s2) {
    super();
  }
};
let f$4 = class f {
  constructor(s2, r2, t, q2) {
    this.core = s2, this.logger = r2, this.name = t;
  }
};
let P$3 = class P extends IEvents {
  constructor(s2, r2) {
    super(), this.relayer = s2, this.logger = r2;
  }
};
let S$3 = class S extends IEvents {
  constructor(s2, r2) {
    super(), this.core = s2, this.logger = r2;
  }
};
let M$3 = class M {
  constructor(s2, r2, t) {
    this.core = s2, this.logger = r2, this.store = t;
  }
};
let O$3 = class O2 {
  constructor(s2, r2) {
    this.projectId = s2, this.logger = r2;
  }
};
let R$2 = class R {
  constructor(s2, r2, t) {
    this.core = s2, this.logger = r2, this.telemetryEnabled = t;
  }
};
var T$2 = Object.defineProperty, k$3 = (e2, s2, r2) => s2 in e2 ? T$2(e2, s2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e2[s2] = r2, i2 = (e2, s2, r2) => k$3(e2, typeof s2 != "symbol" ? s2 + "" : s2, r2);
let J$2 = class J {
  constructor(s2) {
    this.opts = s2, i2(this, "protocol", "wc"), i2(this, "version", 2);
  }
};
let V$3 = class V {
  constructor(s2) {
    this.client = s2;
  }
};
const PARSE_ERROR = "PARSE_ERROR";
const INVALID_REQUEST = "INVALID_REQUEST";
const METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
const INVALID_PARAMS = "INVALID_PARAMS";
const INTERNAL_ERROR = "INTERNAL_ERROR";
const SERVER_ERROR = "SERVER_ERROR";
const RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
const STANDARD_ERROR_MAP = {
  [PARSE_ERROR]: { code: -32700, message: "Parse error" },
  [INVALID_REQUEST]: { code: -32600, message: "Invalid Request" },
  [METHOD_NOT_FOUND]: { code: -32601, message: "Method not found" },
  [INVALID_PARAMS]: { code: -32602, message: "Invalid params" },
  [INTERNAL_ERROR]: { code: -32603, message: "Internal error" },
  [SERVER_ERROR]: { code: -32e3, message: "Server error" }
};
const DEFAULT_ERROR = SERVER_ERROR;
function isReservedErrorCode(code) {
  return RESERVED_ERROR_CODES.includes(code);
}
function getError(type) {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return STANDARD_ERROR_MAP[type];
}
function getErrorByCode(code) {
  const match = Object.values(STANDARD_ERROR_MAP).find((e2) => e2.code === code);
  if (!match) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return match;
}
function parseConnectionError(e2, url, type) {
  return e2.message.includes("getaddrinfo ENOTFOUND") || e2.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e2;
}
var cjs = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d4, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d5, b3) {
    d5.__proto__ = b3;
  } || function(d5, b3) {
    for (var p2 in b3) if (b3.hasOwnProperty(p2)) d5[p2] = b3[p2];
  };
  return extendStatics(d4, b2);
};
function __extends(d4, b2) {
  extendStatics(d4, b2);
  function __() {
    this.constructor = d4;
  }
  d4.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s2, i3 = 1, n3 = arguments.length; i3 < n3; i3++) {
      s2 = arguments[i3];
      for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t[p2] = s2[p2];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s2, e2) {
  var t = {};
  for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
    t[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i3 = 0, p2 = Object.getOwnPropertySymbols(s2); i3 < p2.length; i3++) {
      if (e2.indexOf(p2[i3]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i3]))
        t[p2[i3]] = s2[p2[i3]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i3 = decorators.length - 1; i3 >= 0; i3--) if (d4 = decorators[i3]) r2 = (c2 < 3 ? d4(r2) : c2 > 3 ? d4(target, key, r2) : d4(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P3, generator) {
  function adopt(value) {
    return value instanceof P3 ? value : new P3(function(resolve) {
      resolve(value);
    });
  }
  return new (P3 || (P3 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _3 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f5, y3, t, g2;
  return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n3) {
    return function(v2) {
      return step([n3, v2]);
    };
  }
  function step(op) {
    if (f5) throw new TypeError("Generator is already executing.");
    while (_3) try {
      if (f5 = 1, y3 && (t = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t = y3["return"]) && t.call(y3), 0) : y3.next) && !(t = t.call(y3, op[1])).done) return t;
      if (y3 = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _3.label++;
          return { value: op[1], done: false };
        case 5:
          _3.label++;
          y3 = op[1];
          op = [0];
          continue;
        case 7:
          op = _3.ops.pop();
          _3.trys.pop();
          continue;
        default:
          if (!(t = _3.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _3 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _3.label = op[1];
            break;
          }
          if (op[0] === 6 && _3.label < t[1]) {
            _3.label = t[1];
            t = op;
            break;
          }
          if (t && _3.label < t[2]) {
            _3.label = t[2];
            _3.ops.push(op);
            break;
          }
          if (t[2]) _3.ops.pop();
          _3.trys.pop();
          continue;
      }
      op = body.call(thisArg, _3);
    } catch (e2) {
      op = [6, e2];
      y3 = 0;
    } finally {
      f5 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding(o3, m3, k2, k22) {
  if (k22 === void 0) k22 = k2;
  o3[k22] = m3[k2];
}
function __exportStar(m3, exports) {
  for (var p2 in m3) if (p2 !== "default" && !exports.hasOwnProperty(p2)) exports[p2] = m3[p2];
}
function __values(o3) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m3 = s2 && o3[s2], i3 = 0;
  if (m3) return m3.call(o3);
  if (o3 && typeof o3.length === "number") return {
    next: function() {
      if (o3 && i3 >= o3.length) o3 = void 0;
      return { value: o3 && o3[i3++], done: !o3 };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o3, n3) {
  var m3 = typeof Symbol === "function" && o3[Symbol.iterator];
  if (!m3) return o3;
  var i3 = m3.call(o3), r2, ar2 = [], e2;
  try {
    while ((n3 === void 0 || n3-- > 0) && !(r2 = i3.next()).done) ar2.push(r2.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m3 = i3["return"])) m3.call(i3);
    } finally {
      if (e2) throw e2.error;
    }
  }
  return ar2;
}
function __spread() {
  for (var ar2 = [], i3 = 0; i3 < arguments.length; i3++)
    ar2 = ar2.concat(__read(arguments[i3]));
  return ar2;
}
function __spreadArrays() {
  for (var s2 = 0, i3 = 0, il = arguments.length; i3 < il; i3++) s2 += arguments[i3].length;
  for (var r2 = Array(s2), k2 = 0, i3 = 0; i3 < il; i3++)
    for (var a2 = arguments[i3], j2 = 0, jl = a2.length; j2 < jl; j2++, k2++)
      r2[k2] = a2[j2];
  return r2;
}
function __await(v2) {
  return this instanceof __await ? (this.v = v2, this) : new __await(v2);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g2 = generator.apply(thisArg, _arguments || []), i3, q2 = [];
  return i3 = {}, verb("next"), verb("throw"), verb("return"), i3[Symbol.asyncIterator] = function() {
    return this;
  }, i3;
  function verb(n3) {
    if (g2[n3]) i3[n3] = function(v2) {
      return new Promise(function(a2, b2) {
        q2.push([n3, v2, a2, b2]) > 1 || resume(n3, v2);
      });
    };
  }
  function resume(n3, v2) {
    try {
      step(g2[n3](v2));
    } catch (e2) {
      settle(q2[0][3], e2);
    }
  }
  function step(r2) {
    r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q2[0][2], r2);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f5, v2) {
    if (f5(v2), q2.shift(), q2.length) resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator(o3) {
  var i3, p2;
  return i3 = {}, verb("next"), verb("throw", function(e2) {
    throw e2;
  }), verb("return"), i3[Symbol.iterator] = function() {
    return this;
  }, i3;
  function verb(n3, f5) {
    i3[n3] = o3[n3] ? function(v2) {
      return (p2 = !p2) ? { value: __await(o3[n3](v2)), done: n3 === "return" } : f5 ? f5(v2) : v2;
    } : f5;
  }
}
function __asyncValues(o3) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m3 = o3[Symbol.asyncIterator], i3;
  return m3 ? m3.call(o3) : (o3 = typeof __values === "function" ? __values(o3) : o3[Symbol.iterator](), i3 = {}, verb("next"), verb("throw"), verb("return"), i3[Symbol.asyncIterator] = function() {
    return this;
  }, i3);
  function verb(n3) {
    i3[n3] = o3[n3] && function(v2) {
      return new Promise(function(resolve, reject) {
        v2 = o3[n3](v2), settle(resolve, reject, v2.done, v2.value);
      });
    };
  }
  function settle(resolve, reject, d4, v2) {
    Promise.resolve(v2).then(function(v3) {
      resolve({ value: v3, done: d4 });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k2 in mod) if (Object.hasOwnProperty.call(mod, k2)) result[k2] = mod[k2];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
const tslib_es6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get __assign() {
    return __assign;
  },
  __asyncDelegator,
  __asyncGenerator,
  __asyncValues,
  __await,
  __awaiter,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __createBinding,
  __decorate,
  __exportStar,
  __extends,
  __generator,
  __importDefault,
  __importStar,
  __makeTemplateObject,
  __metadata,
  __param,
  __read,
  __rest,
  __spread,
  __spreadArrays,
  __values
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(tslib_es6);
var crypto$1 = {};
var hasRequiredCrypto;
function requireCrypto() {
  if (hasRequiredCrypto) return crypto$1;
  hasRequiredCrypto = 1;
  Object.defineProperty(crypto$1, "__esModule", { value: true });
  crypto$1.isBrowserCryptoAvailable = crypto$1.getSubtleCrypto = crypto$1.getBrowerCrypto = void 0;
  function getBrowerCrypto() {
    return (commonjsGlobal === null || commonjsGlobal === void 0 ? void 0 : commonjsGlobal.crypto) || (commonjsGlobal === null || commonjsGlobal === void 0 ? void 0 : commonjsGlobal.msCrypto) || {};
  }
  crypto$1.getBrowerCrypto = getBrowerCrypto;
  function getSubtleCrypto() {
    const browserCrypto = getBrowerCrypto();
    return browserCrypto.subtle || browserCrypto.webkitSubtle;
  }
  crypto$1.getSubtleCrypto = getSubtleCrypto;
  function isBrowserCryptoAvailable() {
    return !!getBrowerCrypto() && !!getSubtleCrypto();
  }
  crypto$1.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
  return crypto$1;
}
var env = {};
var hasRequiredEnv;
function requireEnv() {
  if (hasRequiredEnv) return env;
  hasRequiredEnv = 1;
  Object.defineProperty(env, "__esModule", { value: true });
  env.isBrowser = env.isNode = env.isReactNative = void 0;
  function isReactNative() {
    return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
  }
  env.isReactNative = isReactNative;
  function isNode() {
    return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
  }
  env.isNode = isNode;
  function isBrowser() {
    return !isReactNative() && !isNode();
  }
  env.isBrowser = isBrowser;
  return env;
}
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require$$0;
  tslib_1.__exportStar(requireCrypto(), exports);
  tslib_1.__exportStar(requireEnv(), exports);
})(cjs);
function payloadId(entropy = 3) {
  const date = Date.now() * Math.pow(10, entropy);
  const extra = Math.floor(Math.random() * Math.pow(10, entropy));
  return date + extra;
}
function getBigIntRpcId(entropy = 6) {
  return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
  return {
    id: id || payloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
}
function formatJsonRpcResult(id, result) {
  return {
    id,
    jsonrpc: "2.0",
    result
  };
}
function formatJsonRpcError(id, error, data) {
  return {
    id,
    jsonrpc: "2.0",
    error: formatErrorMessage(error)
  };
}
function formatErrorMessage(error, data) {
  if (typeof error === "undefined") {
    return getError(INTERNAL_ERROR);
  }
  if (typeof error === "string") {
    error = Object.assign(Object.assign({}, getError(SERVER_ERROR)), { message: error });
  }
  if (isReservedErrorCode(error.code)) {
    error = getErrorByCode(error.code);
  }
  return error;
}
class e {
}
class n2 extends e {
  constructor() {
    super();
  }
}
class r extends n2 {
  constructor(c2) {
    super();
  }
}
const HTTP_REGEX = "^https?:";
const WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
  const matches = url.match(new RegExp(/^\w+:/, "gi"));
  if (!matches || !matches.length)
    return;
  return matches[0];
}
function matchRegexProtocol(url, regex) {
  const protocol = getUrlProtocol(url);
  if (typeof protocol === "undefined")
    return false;
  return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
  return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
  return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}
function isJsonRpcPayload(payload) {
  return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
  return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
  return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
  return "result" in payload;
}
function isJsonRpcError(payload) {
  return "error" in payload;
}
let o$1 = class o extends r {
  constructor(t) {
    super(t), this.events = new eventsExports.EventEmitter(), this.hasRegisteredEventListeners = false, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners();
  }
  async connect(t = this.connection) {
    await this.open(t);
  }
  async disconnect() {
    await this.close();
  }
  on(t, e2) {
    this.events.on(t, e2);
  }
  once(t, e2) {
    this.events.once(t, e2);
  }
  off(t, e2) {
    this.events.off(t, e2);
  }
  removeListener(t, e2) {
    this.events.removeListener(t, e2);
  }
  async request(t, e2) {
    return this.requestStrict(formatJsonRpcRequest(t.method, t.params || [], t.id || getBigIntRpcId().toString()), e2);
  }
  async requestStrict(t, e2) {
    return new Promise(async (i3, s2) => {
      if (!this.connection.connected) try {
        await this.open();
      } catch (n3) {
        s2(n3);
      }
      this.events.on(`${t.id}`, (n3) => {
        isJsonRpcError(n3) ? s2(n3.error) : i3(n3.result);
      });
      try {
        await this.connection.send(t, e2);
      } catch (n3) {
        s2(n3);
      }
    });
  }
  setConnection(t = this.connection) {
    return t;
  }
  onPayload(t) {
    this.events.emit("payload", t), isJsonRpcResponse(t) ? this.events.emit(`${t.id}`, t) : this.events.emit("message", { type: t.method, data: t.params });
  }
  onClose(t) {
    t && t.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason ? `(${t.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(t = this.connection) {
    this.connection === t && this.connection.connected || (this.connection.connected && this.close(), typeof t == "string" && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (t) => this.onPayload(t)), this.connection.on("close", (t) => this.onClose(t)), this.connection.on("error", (t) => this.events.emit("error", t)), this.connection.on("register_error", (t) => this.onClose()), this.hasRegisteredEventListeners = true);
  }
};
const v$4 = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require("ws"), w$3 = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u", d$2 = (r2) => r2.split("?")[0], h$1 = 10, b$3 = v$4();
let f$3 = class f2 {
  constructor(e2) {
    if (this.url = e2, this.events = new eventsExports.EventEmitter(), this.registering = false, !isWsUrl(e2)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e2}`);
    this.url = e2;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async open(e2 = this.url) {
    await this.register(e2);
  }
  async close() {
    return new Promise((e2, t) => {
      if (typeof this.socket > "u") {
        t(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (n3) => {
        this.onClose(n3), e2();
      }, this.socket.close();
    });
  }
  async send(e2) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(safeJsonStringify(e2));
    } catch (t) {
      this.onError(e2.id, t);
    }
  }
  register(e2 = this.url) {
    if (!isWsUrl(e2)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e2}`);
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((n3, s2) => {
        this.events.once("register_error", (o3) => {
          this.resetMaxListeners(), s2(o3);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u") return s2(new Error("WebSocket connection is missing or invalid"));
          n3(this.socket);
        });
      });
    }
    return this.url = e2, this.registering = true, new Promise((t, n3) => {
      const s2 = cjs.isReactNative() ? void 0 : { rejectUnauthorized: !isLocalhostUrl(e2) }, o3 = new b$3(e2, [], s2);
      w$3() ? o3.onerror = (i3) => {
        const a2 = i3;
        n3(this.emitError(a2.error));
      } : o3.on("error", (i3) => {
        n3(this.emitError(i3));
      }), o3.onopen = () => {
        this.onOpen(o3), t(o3);
      };
    });
  }
  onOpen(e2) {
    e2.onmessage = (t) => this.onPayload(t), e2.onclose = (t) => this.onClose(t), this.socket = e2, this.registering = false, this.events.emit("open");
  }
  onClose(e2) {
    this.socket = void 0, this.registering = false, this.events.emit("close", e2);
  }
  onPayload(e2) {
    if (typeof e2.data > "u") return;
    const t = typeof e2.data == "string" ? safeJsonParse(e2.data) : e2.data;
    this.events.emit("payload", t);
  }
  onError(e2, t) {
    const n3 = this.parseError(t), s2 = n3.message || n3.toString(), o3 = formatJsonRpcError(e2, s2);
    this.events.emit("payload", o3);
  }
  parseError(e2, t = this.url) {
    return parseConnectionError(e2, d$2(t), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > h$1 && this.events.setMaxListeners(h$1);
  }
  emitError(e2) {
    const t = this.parseError(new Error((e2 == null ? void 0 : e2.message) || `WebSocket connection failed for host: ${d$2(this.url)}`));
    return this.events.emit("register_error", t), t;
  }
};
var define_process_env_default = {};
const ze$1 = "wc", Le$2 = 2, he$1 = "core", B$2 = `${ze$1}@2:${he$1}:`, Et$1 = { name: he$1, logger: "error" }, It$1 = { database: ":memory:" }, Tt$1 = "crypto", ke$2 = "client_ed25519_seed", Ct = cjs$3.ONE_DAY, Pt$1 = "keychain", St$2 = "0.3", Ot = "messages", Rt$1 = "0.3", je$1 = cjs$3.SIX_HOURS, At = "publisher", xt$1 = "irn", Nt = "error", Ue$2 = "wss://relay.walletconnect.org", $t = "relayer", C$2 = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, zt$1 = "_subscription", L$3 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, Lt$1 = 0.1, _e$2 = "2.21.1", Q$2 = { link_mode: "link_mode", relay: "relay" }, le$1 = { inbound: "inbound", outbound: "outbound" }, kt$1 = "0.3", jt$1 = "WALLETCONNECT_CLIENT_ID", Fe$1 = "WALLETCONNECT_LINK_MODE_APPS", $$3 = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, Ut$1 = "subscription", Ft$1 = "0.3", Mt$1 = "pairing", Kt$1 = "0.3", se$1 = { wc_pairingDelete: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: cjs$3.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: cjs$3.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 0 } } }, re$1 = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, F$2 = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, Bt$1 = "history", Vt$1 = "0.3", qt$1 = "expirer", M$2 = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, Gt$1 = "0.3", Wt$1 = "verify-api", Zs = "https://verify.walletconnect.com", Ht = "https://verify.walletconnect.org", ue$1 = Ht, Yt$1 = `${ue$1}/v3`, Jt$1 = [Zs, Ht], Xt$1 = "echo", Zt$1 = "https://echo.walletconnect.com", G$1 = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, Y$2 = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, er = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" }, tr = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" }, ir = { authenticated_session_approve_started: "authenticated_session_approve_started", authenticated_session_not_expired: "authenticated_session_not_expired", chains_caip2_compliant: "chains_caip2_compliant", chains_evm_compliant: "chains_evm_compliant", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve", authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success" }, sr = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", missing_session_authenticate_request: "missing_session_authenticate_request", session_authenticate_request_expired: "session_authenticate_request_expired", chains_caip2_compliant_failure: "chains_caip2_compliant_failure", chains_evm_compliant_failure: "chains_evm_compliant_failure", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, Qt$1 = 0.1, ei = "event-client", ti = 86400, ii = "https://pulse.walletconnect.org/batch";
function rr(r2, e2) {
  if (r2.length >= 255) throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), i3 = 0; i3 < t.length; i3++) t[i3] = 255;
  for (var s2 = 0; s2 < r2.length; s2++) {
    var n3 = r2.charAt(s2), o3 = n3.charCodeAt(0);
    if (t[o3] !== 255) throw new TypeError(n3 + " is ambiguous");
    t[o3] = s2;
  }
  var a2 = r2.length, c2 = r2.charAt(0), h4 = Math.log(a2) / Math.log(256), l2 = Math.log(256) / Math.log(a2);
  function d4(u2) {
    if (u2 instanceof Uint8Array || (ArrayBuffer.isView(u2) ? u2 = new Uint8Array(u2.buffer, u2.byteOffset, u2.byteLength) : Array.isArray(u2) && (u2 = Uint8Array.from(u2))), !(u2 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (u2.length === 0) return "";
    for (var b2 = 0, x2 = 0, I3 = 0, D2 = u2.length; I3 !== D2 && u2[I3] === 0; ) I3++, b2++;
    for (var j2 = (D2 - I3) * l2 + 1 >>> 0, T2 = new Uint8Array(j2); I3 !== D2; ) {
      for (var q2 = u2[I3], J3 = 0, K3 = j2 - 1; (q2 !== 0 || J3 < x2) && K3 !== -1; K3--, J3++) q2 += 256 * T2[K3] >>> 0, T2[K3] = q2 % a2 >>> 0, q2 = q2 / a2 >>> 0;
      if (q2 !== 0) throw new Error("Non-zero carry");
      x2 = J3, I3++;
    }
    for (var H2 = j2 - x2; H2 !== j2 && T2[H2] === 0; ) H2++;
    for (var me2 = c2.repeat(b2); H2 < j2; ++H2) me2 += r2.charAt(T2[H2]);
    return me2;
  }
  function g2(u2) {
    if (typeof u2 != "string") throw new TypeError("Expected String");
    if (u2.length === 0) return new Uint8Array();
    var b2 = 0;
    if (u2[b2] !== " ") {
      for (var x2 = 0, I3 = 0; u2[b2] === c2; ) x2++, b2++;
      for (var D2 = (u2.length - b2) * h4 + 1 >>> 0, j2 = new Uint8Array(D2); u2[b2]; ) {
        var T2 = t[u2.charCodeAt(b2)];
        if (T2 === 255) return;
        for (var q2 = 0, J3 = D2 - 1; (T2 !== 0 || q2 < I3) && J3 !== -1; J3--, q2++) T2 += a2 * j2[J3] >>> 0, j2[J3] = T2 % 256 >>> 0, T2 = T2 / 256 >>> 0;
        if (T2 !== 0) throw new Error("Non-zero carry");
        I3 = q2, b2++;
      }
      if (u2[b2] !== " ") {
        for (var K3 = D2 - I3; K3 !== D2 && j2[K3] === 0; ) K3++;
        for (var H2 = new Uint8Array(x2 + (D2 - K3)), me2 = x2; K3 !== D2; ) H2[me2++] = j2[K3++];
        return H2;
      }
    }
  }
  function _3(u2) {
    var b2 = g2(u2);
    if (b2) return b2;
    throw new Error(`Non-${e2} character`);
  }
  return { encode: d4, decodeUnsafe: g2, decode: _3 };
}
var nr = rr, or = nr;
const si = (r2) => {
  if (r2 instanceof Uint8Array && r2.constructor.name === "Uint8Array") return r2;
  if (r2 instanceof ArrayBuffer) return new Uint8Array(r2);
  if (ArrayBuffer.isView(r2)) return new Uint8Array(r2.buffer, r2.byteOffset, r2.byteLength);
  throw new Error("Unknown type, must be binary type");
}, ar = (r2) => new TextEncoder().encode(r2), cr = (r2) => new TextDecoder().decode(r2);
class hr {
  constructor(e2, t, i3) {
    this.name = e2, this.prefix = t, this.baseEncode = i3;
  }
  encode(e2) {
    if (e2 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e2)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class lr {
  constructor(e2, t, i3) {
    if (this.name = e2, this.prefix = t, t.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i3;
  }
  decode(e2) {
    if (typeof e2 == "string") {
      if (e2.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e2.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e2) {
    return ri(this, e2);
  }
}
class ur {
  constructor(e2) {
    this.decoders = e2;
  }
  or(e2) {
    return ri(this, e2);
  }
  decode(e2) {
    const t = e2[0], i3 = this.decoders[t];
    if (i3) return i3.decode(e2);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e2)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const ri = (r2, e2) => new ur({ ...r2.decoders || { [r2.prefix]: r2 }, ...e2.decoders || { [e2.prefix]: e2 } });
class dr {
  constructor(e2, t, i3, s2) {
    this.name = e2, this.prefix = t, this.baseEncode = i3, this.baseDecode = s2, this.encoder = new hr(e2, t, i3), this.decoder = new lr(e2, t, s2);
  }
  encode(e2) {
    return this.encoder.encode(e2);
  }
  decode(e2) {
    return this.decoder.decode(e2);
  }
}
const Ee$2 = ({ name: r2, prefix: e2, encode: t, decode: i3 }) => new dr(r2, e2, t, i3), de$1 = ({ prefix: r2, name: e2, alphabet: t }) => {
  const { encode: i3, decode: s2 } = or(t, e2);
  return Ee$2({ prefix: r2, name: e2, encode: i3, decode: (n3) => si(s2(n3)) });
}, gr = (r2, e2, t, i3) => {
  const s2 = {};
  for (let l2 = 0; l2 < e2.length; ++l2) s2[e2[l2]] = l2;
  let n3 = r2.length;
  for (; r2[n3 - 1] === "="; ) --n3;
  const o3 = new Uint8Array(n3 * t / 8 | 0);
  let a2 = 0, c2 = 0, h4 = 0;
  for (let l2 = 0; l2 < n3; ++l2) {
    const d4 = s2[r2[l2]];
    if (d4 === void 0) throw new SyntaxError(`Non-${i3} character`);
    c2 = c2 << t | d4, a2 += t, a2 >= 8 && (a2 -= 8, o3[h4++] = 255 & c2 >> a2);
  }
  if (a2 >= t || 255 & c2 << 8 - a2) throw new SyntaxError("Unexpected end of data");
  return o3;
}, pr = (r2, e2, t) => {
  const i3 = e2[e2.length - 1] === "=", s2 = (1 << t) - 1;
  let n3 = "", o3 = 0, a2 = 0;
  for (let c2 = 0; c2 < r2.length; ++c2) for (a2 = a2 << 8 | r2[c2], o3 += 8; o3 > t; ) o3 -= t, n3 += e2[s2 & a2 >> o3];
  if (o3 && (n3 += e2[s2 & a2 << t - o3]), i3) for (; n3.length * t & 7; ) n3 += "=";
  return n3;
}, P$2 = ({ name: r2, prefix: e2, bitsPerChar: t, alphabet: i3 }) => Ee$2({ prefix: e2, name: r2, encode(s2) {
  return pr(s2, i3, t);
}, decode(s2) {
  return gr(s2, i3, t, r2);
} }), yr = Ee$2({ prefix: "\0", name: "identity", encode: (r2) => cr(r2), decode: (r2) => ar(r2) });
var br = Object.freeze({ __proto__: null, identity: yr });
const mr = P$2({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var fr = Object.freeze({ __proto__: null, base2: mr });
const Dr = P$2({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var vr = Object.freeze({ __proto__: null, base8: Dr });
const wr = de$1({ prefix: "9", name: "base10", alphabet: "0123456789" });
var _r = Object.freeze({ __proto__: null, base10: wr });
const Er = P$2({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), Ir = P$2({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Tr = Object.freeze({ __proto__: null, base16: Er, base16upper: Ir });
const Cr = P$2({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Pr = P$2({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), Sr = P$2({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), Or2 = P$2({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), Rr = P$2({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), Ar = P$2({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), xr = P$2({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), Nr = P$2({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), $r = P$2({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var zr2 = Object.freeze({ __proto__: null, base32: Cr, base32upper: Pr, base32pad: Sr, base32padupper: Or2, base32hex: Rr, base32hexupper: Ar, base32hexpad: xr, base32hexpadupper: Nr, base32z: $r });
const Lr3 = de$1({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), kr = de$1({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var jr = Object.freeze({ __proto__: null, base36: Lr3, base36upper: kr });
const Ur = de$1({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), Fr = de$1({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var Mr = Object.freeze({ __proto__: null, base58btc: Ur, base58flickr: Fr });
const Kr = P$2({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), Br = P$2({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), Vr = P$2({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), qr = P$2({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Gr = Object.freeze({ __proto__: null, base64: Kr, base64pad: Br, base64url: Vr, base64urlpad: qr });
const ni = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), Wr = ni.reduce((r2, e2, t) => (r2[t] = e2, r2), []), Hr2 = ni.reduce((r2, e2, t) => (r2[e2.codePointAt(0)] = t, r2), []);
function Yr(r2) {
  return r2.reduce((e2, t) => (e2 += Wr[t], e2), "");
}
function Jr(r2) {
  const e2 = [];
  for (const t of r2) {
    const i3 = Hr2[t.codePointAt(0)];
    if (i3 === void 0) throw new Error(`Non-base256emoji character: ${t}`);
    e2.push(i3);
  }
  return new Uint8Array(e2);
}
const Xr = Ee$2({ prefix: "🚀", name: "base256emoji", encode: Yr, decode: Jr });
var Zr = Object.freeze({ __proto__: null, base256emoji: Xr }), Qr = ai, oi = 128, en = 127, tn = ~en, sn = Math.pow(2, 31);
function ai(r2, e2, t) {
  e2 = e2 || [], t = t || 0;
  for (var i3 = t; r2 >= sn; ) e2[t++] = r2 & 255 | oi, r2 /= 128;
  for (; r2 & tn; ) e2[t++] = r2 & 255 | oi, r2 >>>= 7;
  return e2[t] = r2 | 0, ai.bytes = t - i3 + 1, e2;
}
var rn = Me$2, nn = 128, ci = 127;
function Me$2(r2, i3) {
  var t = 0, i3 = i3 || 0, s2 = 0, n3 = i3, o3, a2 = r2.length;
  do {
    if (n3 >= a2) throw Me$2.bytes = 0, new RangeError("Could not decode varint");
    o3 = r2[n3++], t += s2 < 28 ? (o3 & ci) << s2 : (o3 & ci) * Math.pow(2, s2), s2 += 7;
  } while (o3 >= nn);
  return Me$2.bytes = n3 - i3, t;
}
var on = Math.pow(2, 7), an = Math.pow(2, 14), cn = Math.pow(2, 21), hn = Math.pow(2, 28), ln = Math.pow(2, 35), un = Math.pow(2, 42), dn = Math.pow(2, 49), gn = Math.pow(2, 56), pn = Math.pow(2, 63), yn = function(r2) {
  return r2 < on ? 1 : r2 < an ? 2 : r2 < cn ? 3 : r2 < hn ? 4 : r2 < ln ? 5 : r2 < un ? 6 : r2 < dn ? 7 : r2 < gn ? 8 : r2 < pn ? 9 : 10;
}, bn = { encode: Qr, decode: rn, encodingLength: yn }, hi = bn;
const li = (r2, e2, t = 0) => (hi.encode(r2, e2, t), e2), ui = (r2) => hi.encodingLength(r2), Ke$2 = (r2, e2) => {
  const t = e2.byteLength, i3 = ui(r2), s2 = i3 + ui(t), n3 = new Uint8Array(s2 + t);
  return li(r2, n3, 0), li(t, n3, i3), n3.set(e2, s2), new mn(r2, t, e2, n3);
};
class mn {
  constructor(e2, t, i3, s2) {
    this.code = e2, this.size = t, this.digest = i3, this.bytes = s2;
  }
}
const di = ({ name: r2, code: e2, encode: t }) => new fn(r2, e2, t);
class fn {
  constructor(e2, t, i3) {
    this.name = e2, this.code = t, this.encode = i3;
  }
  digest(e2) {
    if (e2 instanceof Uint8Array) {
      const t = this.encode(e2);
      return t instanceof Uint8Array ? Ke$2(this.code, t) : t.then((i3) => Ke$2(this.code, i3));
    } else throw Error("Unknown type, must be binary type");
  }
}
const gi = (r2) => async (e2) => new Uint8Array(await crypto.subtle.digest(r2, e2)), Dn = di({ name: "sha2-256", code: 18, encode: gi("SHA-256") }), vn = di({ name: "sha2-512", code: 19, encode: gi("SHA-512") });
var wn = Object.freeze({ __proto__: null, sha256: Dn, sha512: vn });
const pi = 0, _n = "identity", yi = si, En2 = (r2) => Ke$2(pi, yi(r2)), In = { code: pi, name: _n, encode: yi, digest: En2 };
var Tn = Object.freeze({ __proto__: null, identity: In });
new TextEncoder(), new TextDecoder();
const bi = { ...br, ...fr, ...vr, ..._r, ...Tr, ...zr2, ...jr, ...Mr, ...Gr, ...Zr };
({ ...wn, ...Tn });
function Cn(r2 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(r2) : new Uint8Array(r2);
}
function mi(r2, e2, t, i3) {
  return { name: r2, prefix: e2, encoder: { name: r2, prefix: e2, encode: t }, decoder: { decode: i3 } };
}
const fi = mi("utf8", "u", (r2) => "u" + new TextDecoder("utf8").decode(r2), (r2) => new TextEncoder().encode(r2.substring(1))), Be$1 = mi("ascii", "a", (r2) => {
  let e2 = "a";
  for (let t = 0; t < r2.length; t++) e2 += String.fromCharCode(r2[t]);
  return e2;
}, (r2) => {
  r2 = r2.substring(1);
  const e2 = Cn(r2.length);
  for (let t = 0; t < r2.length; t++) e2[t] = r2.charCodeAt(t);
  return e2;
}), Pn = { utf8: fi, "utf-8": fi, hex: bi.base16, latin1: Be$1, ascii: Be$1, binary: Be$1, ...bi };
function Sn(r2, e2 = "utf8") {
  const t = Pn[e2];
  if (!t) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(r2, "utf8") : t.decoder.decode(`${t.prefix}${r2}`);
}
var On = Object.defineProperty, Rn = (r2, e2, t) => e2 in r2 ? On(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, W$2 = (r2, e2, t) => Rn(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class Di {
  constructor(e2, t) {
    this.core = e2, this.logger = t, W$2(this, "keychain", /* @__PURE__ */ new Map()), W$2(this, "name", Pt$1), W$2(this, "version", St$2), W$2(this, "initialized", false), W$2(this, "storagePrefix", B$2), W$2(this, "init", async () => {
      if (!this.initialized) {
        const i3 = await this.getKeyChain();
        typeof i3 < "u" && (this.keychain = i3), this.initialized = true;
      }
    }), W$2(this, "has", (i3) => (this.isInitialized(), this.keychain.has(i3))), W$2(this, "set", async (i3, s2) => {
      this.isInitialized(), this.keychain.set(i3, s2), await this.persist();
    }), W$2(this, "get", (i3) => {
      this.isInitialized();
      const s2 = this.keychain.get(i3);
      if (typeof s2 > "u") {
        const { message: n3 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${i3}`);
        throw new Error(n3);
      }
      return s2;
    }), W$2(this, "del", async (i3) => {
      this.isInitialized(), this.keychain.delete(i3), await this.persist();
    }), this.core = e2, this.logger = E$5(t, this.name);
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e2) {
    await this.core.storage.setItem(this.storageKey, fi$1(e2));
  }
  async getKeyChain() {
    const e2 = await this.core.storage.getItem(this.storageKey);
    return typeof e2 < "u" ? li$1(e2) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
}
var An2 = Object.defineProperty, xn2 = (r2, e2, t) => e2 in r2 ? An2(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, S$2 = (r2, e2, t) => xn2(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class vi {
  constructor(e2, t, i3) {
    this.core = e2, this.logger = t, S$2(this, "name", Tt$1), S$2(this, "keychain"), S$2(this, "randomSessionIdentifier", jc()), S$2(this, "initialized", false), S$2(this, "init", async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }), S$2(this, "hasKeys", (s2) => (this.isInitialized(), this.keychain.has(s2))), S$2(this, "getClientId", async () => {
      this.isInitialized();
      const s2 = await this.getClientSeed(), n3 = Po$1(s2);
      return Qe$3(n3.publicKey);
    }), S$2(this, "generateKeyPair", () => {
      this.isInitialized();
      const s2 = Lc();
      return this.setPrivateKey(s2.publicKey, s2.privateKey);
    }), S$2(this, "signJWT", async (s2) => {
      this.isInitialized();
      const n3 = await this.getClientSeed(), o3 = Po$1(n3), a2 = this.randomSessionIdentifier, c2 = Ct;
      return await Qo(a2, s2, c2, o3);
    }), S$2(this, "generateSharedKey", (s2, n3, o3) => {
      this.isInitialized();
      const a2 = this.getPrivateKey(s2), c2 = Cc(a2, n3);
      return this.setSymKey(c2, o3);
    }), S$2(this, "setSymKey", async (s2, n3) => {
      this.isInitialized();
      const o3 = n3 || Pc(s2);
      return await this.keychain.set(o3, s2), o3;
    }), S$2(this, "deleteKeyPair", async (s2) => {
      this.isInitialized(), await this.keychain.del(s2);
    }), S$2(this, "deleteSymKey", async (s2) => {
      this.isInitialized(), await this.keychain.del(s2);
    }), S$2(this, "encode", async (s2, n3, o3) => {
      this.isInitialized();
      const a2 = oo$1(o3), c2 = safeJsonStringify(n3);
      if (Fc(a2)) return Dc(c2, o3 == null ? void 0 : o3.encoding);
      if (Kc(a2)) {
        const g2 = a2.senderPublicKey, _3 = a2.receiverPublicKey;
        s2 = await this.generateSharedKey(g2, _3);
      }
      const h4 = this.getSymKey(s2), { type: l2, senderPublicKey: d4 } = a2;
      return Vc({ type: l2, symKey: h4, message: c2, senderPublicKey: d4, encoding: o3 == null ? void 0 : o3.encoding });
    }), S$2(this, "decode", async (s2, n3, o3) => {
      this.isInitialized();
      const a2 = qc(n3, o3);
      if (Fc(a2)) {
        const c2 = Hc(n3, o3 == null ? void 0 : o3.encoding);
        return safeJsonParse(c2);
      }
      if (Kc(a2)) {
        const c2 = a2.receiverPublicKey, h4 = a2.senderPublicKey;
        s2 = await this.generateSharedKey(c2, h4);
      }
      try {
        const c2 = this.getSymKey(s2), h4 = Mc({ symKey: c2, encoded: n3, encoding: o3 == null ? void 0 : o3.encoding });
        return safeJsonParse(h4);
      } catch (c2) {
        this.logger.error(`Failed to decode message from topic: '${s2}', clientId: '${await this.getClientId()}'`), this.logger.error(c2);
      }
    }), S$2(this, "getPayloadType", (s2, n3 = qt$2) => {
      const o3 = Se$1({ encoded: s2, encoding: n3 });
      return Bt$2(o3.type);
    }), S$2(this, "getPayloadSenderPublicKey", (s2, n3 = qt$2) => {
      const o3 = Se$1({ encoded: s2, encoding: n3 });
      return o3.senderPublicKey ? toString(o3.senderPublicKey, G$2) : void 0;
    }), this.core = e2, this.logger = E$5(t, this.name), this.keychain = i3 || new Di(this.core, this.logger);
  }
  get context() {
    return y$3(this.logger);
  }
  async setPrivateKey(e2, t) {
    return await this.keychain.set(e2, t), e2;
  }
  getPrivateKey(e2) {
    return this.keychain.get(e2);
  }
  async getClientSeed() {
    let e2 = "";
    try {
      e2 = this.keychain.get(ke$2);
    } catch {
      e2 = jc(), await this.keychain.set(ke$2, e2);
    }
    return Sn(e2, "base16");
  }
  getSymKey(e2) {
    return this.keychain.get(e2);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
}
var Nn = Object.defineProperty, $n = Object.defineProperties, zn = Object.getOwnPropertyDescriptors, wi = Object.getOwnPropertySymbols, Ln = Object.prototype.hasOwnProperty, kn = Object.prototype.propertyIsEnumerable, Ve$1 = (r2, e2, t) => e2 in r2 ? Nn(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, jn = (r2, e2) => {
  for (var t in e2 || (e2 = {})) Ln.call(e2, t) && Ve$1(r2, t, e2[t]);
  if (wi) for (var t of wi(e2)) kn.call(e2, t) && Ve$1(r2, t, e2[t]);
  return r2;
}, Un = (r2, e2) => $n(r2, zn(e2)), k$2 = (r2, e2, t) => Ve$1(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class _i extends y$2 {
  constructor(e2, t) {
    super(e2, t), this.logger = e2, this.core = t, k$2(this, "messages", /* @__PURE__ */ new Map()), k$2(this, "messagesWithoutClientAck", /* @__PURE__ */ new Map()), k$2(this, "name", Ot), k$2(this, "version", Rt$1), k$2(this, "initialized", false), k$2(this, "storagePrefix", B$2), k$2(this, "init", async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const i3 = await this.getRelayerMessages();
          typeof i3 < "u" && (this.messages = i3);
          const s2 = await this.getRelayerMessagesWithoutClientAck();
          typeof s2 < "u" && (this.messagesWithoutClientAck = s2), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (i3) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i3);
        } finally {
          this.initialized = true;
        }
      }
    }), k$2(this, "set", async (i3, s2, n3) => {
      this.isInitialized();
      const o3 = kc(s2);
      let a2 = this.messages.get(i3);
      if (typeof a2 > "u" && (a2 = {}), typeof a2[o3] < "u") return o3;
      if (a2[o3] = s2, this.messages.set(i3, a2), n3 === le$1.inbound) {
        const c2 = this.messagesWithoutClientAck.get(i3) || {};
        this.messagesWithoutClientAck.set(i3, Un(jn({}, c2), { [o3]: s2 }));
      }
      return await this.persist(), o3;
    }), k$2(this, "get", (i3) => {
      this.isInitialized();
      let s2 = this.messages.get(i3);
      return typeof s2 > "u" && (s2 = {}), s2;
    }), k$2(this, "getWithoutAck", (i3) => {
      this.isInitialized();
      const s2 = {};
      for (const n3 of i3) {
        const o3 = this.messagesWithoutClientAck.get(n3) || {};
        s2[n3] = Object.values(o3);
      }
      return s2;
    }), k$2(this, "has", (i3, s2) => {
      this.isInitialized();
      const n3 = this.get(i3), o3 = kc(s2);
      return typeof n3[o3] < "u";
    }), k$2(this, "ack", async (i3, s2) => {
      this.isInitialized();
      const n3 = this.messagesWithoutClientAck.get(i3);
      if (typeof n3 > "u") return;
      const o3 = kc(s2);
      delete n3[o3], Object.keys(n3).length === 0 ? this.messagesWithoutClientAck.delete(i3) : this.messagesWithoutClientAck.set(i3, n3), await this.persist();
    }), k$2(this, "del", async (i3) => {
      this.isInitialized(), this.messages.delete(i3), this.messagesWithoutClientAck.delete(i3), await this.persist();
    }), this.logger = E$5(e2, this.name), this.core = t;
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  async setRelayerMessages(e2) {
    await this.core.storage.setItem(this.storageKey, fi$1(e2));
  }
  async setRelayerMessagesWithoutClientAck(e2) {
    await this.core.storage.setItem(this.storageKeyWithoutClientAck, fi$1(e2));
  }
  async getRelayerMessages() {
    const e2 = await this.core.storage.getItem(this.storageKey);
    return typeof e2 < "u" ? li$1(e2) : void 0;
  }
  async getRelayerMessagesWithoutClientAck() {
    const e2 = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
    return typeof e2 < "u" ? li$1(e2) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
}
var Fn = Object.defineProperty, Mn = Object.defineProperties, Kn = Object.getOwnPropertyDescriptors, Ei = Object.getOwnPropertySymbols, Bn = Object.prototype.hasOwnProperty, Vn = Object.prototype.propertyIsEnumerable, qe$1 = (r2, e2, t) => e2 in r2 ? Fn(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, Ie$1 = (r2, e2) => {
  for (var t in e2 || (e2 = {})) Bn.call(e2, t) && qe$1(r2, t, e2[t]);
  if (Ei) for (var t of Ei(e2)) Vn.call(e2, t) && qe$1(r2, t, e2[t]);
  return r2;
}, Ge$2 = (r2, e2) => Mn(r2, Kn(e2)), V$2 = (r2, e2, t) => qe$1(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class qn extends m2 {
  constructor(e2, t) {
    super(e2, t), this.relayer = e2, this.logger = t, V$2(this, "events", new eventsExports.EventEmitter()), V$2(this, "name", At), V$2(this, "queue", /* @__PURE__ */ new Map()), V$2(this, "publishTimeout", cjs$3.toMiliseconds(cjs$3.ONE_MINUTE)), V$2(this, "initialPublishTimeout", cjs$3.toMiliseconds(cjs$3.ONE_SECOND * 15)), V$2(this, "needsTransportRestart", false), V$2(this, "publish", async (i3, s2, n3) => {
      var o3;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i3, message: s2, opts: n3 } });
      const a2 = (n3 == null ? void 0 : n3.ttl) || je$1, c2 = Zc(n3), h4 = (n3 == null ? void 0 : n3.prompt) || false, l2 = (n3 == null ? void 0 : n3.tag) || 0, d4 = (n3 == null ? void 0 : n3.id) || getBigIntRpcId().toString(), g2 = { topic: i3, message: s2, opts: { ttl: a2, relay: c2, prompt: h4, tag: l2, id: d4, attestation: n3 == null ? void 0 : n3.attestation, tvf: n3 == null ? void 0 : n3.tvf } }, _3 = `Failed to publish payload, please try again. id:${d4} tag:${l2}`;
      try {
        const u2 = new Promise(async (b2) => {
          const x2 = ({ id: D2 }) => {
            g2.opts.id === D2 && (this.removeRequestFromQueue(D2), this.relayer.events.removeListener(C$2.publish, x2), b2(g2));
          };
          this.relayer.events.on(C$2.publish, x2);
          const I3 = yi$1(new Promise((D2, j2) => {
            this.rpcPublish({ topic: i3, message: s2, ttl: a2, prompt: h4, tag: l2, id: d4, attestation: n3 == null ? void 0 : n3.attestation, tvf: n3 == null ? void 0 : n3.tvf }).then(D2).catch((T2) => {
              this.logger.warn(T2, T2 == null ? void 0 : T2.message), j2(T2);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${d4} tag:${l2}`);
          try {
            await I3, this.events.removeListener(C$2.publish, x2);
          } catch (D2) {
            this.queue.set(d4, Ge$2(Ie$1({}, g2), { attempt: 1 })), this.logger.warn(D2, D2 == null ? void 0 : D2.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: d4, topic: i3, message: s2, opts: n3 } }), await yi$1(u2, this.publishTimeout, _3);
      } catch (u2) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(u2), (o3 = n3 == null ? void 0 : n3.internal) != null && o3.throwOnFailedPublish) throw u2;
      } finally {
        this.queue.delete(d4);
      }
    }), V$2(this, "on", (i3, s2) => {
      this.events.on(i3, s2);
    }), V$2(this, "once", (i3, s2) => {
      this.events.once(i3, s2);
    }), V$2(this, "off", (i3, s2) => {
      this.events.off(i3, s2);
    }), V$2(this, "removeListener", (i3, s2) => {
      this.events.removeListener(i3, s2);
    }), this.relayer = e2, this.logger = E$5(t, this.name), this.registerEventListeners();
  }
  get context() {
    return y$3(this.logger);
  }
  async rpcPublish(e2) {
    var t, i3, s2, n3;
    const { topic: o3, message: a2, ttl: c2 = je$1, prompt: h4, tag: l2, id: d4, attestation: g2, tvf: _3 } = e2, u2 = { method: Yc(Zc().protocol).publish, params: Ie$1({ topic: o3, message: a2, ttl: c2, prompt: h4, tag: l2, attestation: g2 }, _3), id: d4 };
    Et$2((t = u2.params) == null ? void 0 : t.prompt) && ((i3 = u2.params) == null || delete i3.prompt), Et$2((s2 = u2.params) == null ? void 0 : s2.tag) && ((n3 = u2.params) == null || delete n3.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: u2 });
    const b2 = await this.relayer.request(u2);
    return this.relayer.events.emit(C$2.publish, e2), this.logger.debug("Successfully Published Payload"), b2;
  }
  removeRequestFromQueue(e2) {
    this.queue.delete(e2);
  }
  checkQueue() {
    this.queue.forEach(async (e2, t) => {
      const i3 = e2.attempt + 1;
      this.queue.set(t, Ge$2(Ie$1({}, e2), { attempt: i3 }));
      const { topic: s2, message: n3, opts: o3, attestation: a2 } = e2;
      this.logger.warn({}, `Publisher: queue->publishing: ${e2.opts.id}, tag: ${e2.opts.tag}, attempt: ${i3}`), await this.rpcPublish(Ge$2(Ie$1({}, e2), { topic: s2, message: n3, ttl: o3.ttl, prompt: o3.prompt, tag: o3.tag, id: o3.id, attestation: a2, tvf: o3.tvf })), this.logger.warn({}, `Publisher: queue->published: ${e2.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r$1.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(C$2.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(C$2.message_ack, (e2) => {
      this.removeRequestFromQueue(e2.id.toString());
    });
  }
}
var Gn = Object.defineProperty, Wn = (r2, e2, t) => e2 in r2 ? Gn(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, ne$1 = (r2, e2, t) => Wn(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class Hn {
  constructor() {
    ne$1(this, "map", /* @__PURE__ */ new Map()), ne$1(this, "set", (e2, t) => {
      const i3 = this.get(e2);
      this.exists(e2, t) || this.map.set(e2, [...i3, t]);
    }), ne$1(this, "get", (e2) => this.map.get(e2) || []), ne$1(this, "exists", (e2, t) => this.get(e2).includes(t)), ne$1(this, "delete", (e2, t) => {
      if (typeof t > "u") {
        this.map.delete(e2);
        return;
      }
      if (!this.map.has(e2)) return;
      const i3 = this.get(e2);
      if (!this.exists(e2, t)) return;
      const s2 = i3.filter((n3) => n3 !== t);
      if (!s2.length) {
        this.map.delete(e2);
        return;
      }
      this.map.set(e2, s2);
    }), ne$1(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var Yn = Object.defineProperty, Jn2 = Object.defineProperties, Xn = Object.getOwnPropertyDescriptors, Ii = Object.getOwnPropertySymbols, Zn = Object.prototype.hasOwnProperty, Qn = Object.prototype.propertyIsEnumerable, We$1 = (r2, e2, t) => e2 in r2 ? Yn(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, ge$1 = (r2, e2) => {
  for (var t in e2 || (e2 = {})) Zn.call(e2, t) && We$1(r2, t, e2[t]);
  if (Ii) for (var t of Ii(e2)) Qn.call(e2, t) && We$1(r2, t, e2[t]);
  return r2;
}, He$1 = (r2, e2) => Jn2(r2, Xn(e2)), f$2 = (r2, e2, t) => We$1(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class Ti extends P$3 {
  constructor(e2, t) {
    super(e2, t), this.relayer = e2, this.logger = t, f$2(this, "subscriptions", /* @__PURE__ */ new Map()), f$2(this, "topicMap", new Hn()), f$2(this, "events", new eventsExports.EventEmitter()), f$2(this, "name", Ut$1), f$2(this, "version", Ft$1), f$2(this, "pending", /* @__PURE__ */ new Map()), f$2(this, "cached", []), f$2(this, "initialized", false), f$2(this, "storagePrefix", B$2), f$2(this, "subscribeTimeout", cjs$3.toMiliseconds(cjs$3.ONE_MINUTE)), f$2(this, "initialSubscribeTimeout", cjs$3.toMiliseconds(cjs$3.ONE_SECOND * 15)), f$2(this, "clientId"), f$2(this, "batchSubscribeTopicsLimit", 500), f$2(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = true;
    }), f$2(this, "subscribe", async (i3, s2) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i3, opts: s2 } });
      try {
        const n3 = Zc(s2), o3 = { topic: i3, relay: n3, transportType: s2 == null ? void 0 : s2.transportType };
        this.pending.set(i3, o3);
        const a2 = await this.rpcSubscribe(i3, n3, s2);
        return typeof a2 == "string" && (this.onSubscribe(a2, o3), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i3, opts: s2 } })), a2;
      } catch (n3) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n3), n3;
      }
    }), f$2(this, "unsubscribe", async (i3, s2) => {
      this.isInitialized(), typeof (s2 == null ? void 0 : s2.id) < "u" ? await this.unsubscribeById(i3, s2.id, s2) : await this.unsubscribeByTopic(i3, s2);
    }), f$2(this, "isSubscribed", (i3) => new Promise((s2) => {
      s2(this.topicMap.topics.includes(i3));
    })), f$2(this, "isKnownTopic", (i3) => new Promise((s2) => {
      s2(this.topicMap.topics.includes(i3) || this.pending.has(i3) || this.cached.some((n3) => n3.topic === i3));
    })), f$2(this, "on", (i3, s2) => {
      this.events.on(i3, s2);
    }), f$2(this, "once", (i3, s2) => {
      this.events.once(i3, s2);
    }), f$2(this, "off", (i3, s2) => {
      this.events.off(i3, s2);
    }), f$2(this, "removeListener", (i3, s2) => {
      this.events.removeListener(i3, s2);
    }), f$2(this, "start", async () => {
      await this.onConnect();
    }), f$2(this, "stop", async () => {
      await this.onDisconnect();
    }), f$2(this, "restart", async () => {
      await this.restore(), await this.onRestart();
    }), f$2(this, "checkPending", async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const i3 = [];
      this.pending.forEach((s2) => {
        i3.push(s2);
      }), await this.batchSubscribe(i3);
    }), f$2(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(r$1.pulse, async () => {
        await this.checkPending();
      }), this.events.on($$3.created, async (i3) => {
        const s2 = $$3.created;
        this.logger.info(`Emitting ${s2}`), this.logger.debug({ type: "event", event: s2, data: i3 }), await this.persist();
      }), this.events.on($$3.deleted, async (i3) => {
        const s2 = $$3.deleted;
        this.logger.info(`Emitting ${s2}`), this.logger.debug({ type: "event", event: s2, data: i3 }), await this.persist();
      });
    }), this.relayer = e2, this.logger = E$5(t, this.name), this.clientId = "";
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(e2, t) {
    let i3 = false;
    try {
      i3 = this.getSubscription(e2).topic === t;
    } catch {
    }
    return i3;
  }
  reset() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e2, t) {
    const i3 = this.topicMap.get(e2);
    await Promise.all(i3.map(async (s2) => await this.unsubscribeById(e2, s2, t)));
  }
  async unsubscribeById(e2, t, i3) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e2, id: t, opts: i3 } });
    try {
      const s2 = Zc(i3);
      await this.restartToComplete({ topic: e2, id: t, relay: s2 }), await this.rpcUnsubscribe(e2, t, s2);
      const n3 = Nt$1("USER_DISCONNECTED", `${this.name}, ${e2}`);
      await this.onUnsubscribe(e2, t, n3), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e2, id: t, opts: i3 } });
    } catch (s2) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(s2), s2;
    }
  }
  async rpcSubscribe(e2, t, i3) {
    var s2;
    (!i3 || (i3 == null ? void 0 : i3.transportType) === Q$2.relay) && await this.restartToComplete({ topic: e2, id: e2, relay: t });
    const n3 = { method: Yc(t.protocol).subscribe, params: { topic: e2 } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n3 });
    const o3 = (s2 = i3 == null ? void 0 : i3.internal) == null ? void 0 : s2.throwOnFailedPublish;
    try {
      const a2 = await this.getSubscriptionId(e2);
      if ((i3 == null ? void 0 : i3.transportType) === Q$2.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(n3).catch((l2) => this.logger.warn(l2));
      }, cjs$3.toMiliseconds(cjs$3.ONE_SECOND)), a2;
      const c2 = new Promise(async (l2) => {
        const d4 = (g2) => {
          g2.topic === e2 && (this.events.removeListener($$3.created, d4), l2(g2.id));
        };
        this.events.on($$3.created, d4);
        try {
          const g2 = await yi$1(new Promise((_3, u2) => {
            this.relayer.request(n3).catch((b2) => {
              this.logger.warn(b2, b2 == null ? void 0 : b2.message), u2(b2);
            }).then(_3);
          }), this.initialSubscribeTimeout, `Subscribing to ${e2} failed, please try again`);
          this.events.removeListener($$3.created, d4), l2(g2);
        } catch {
        }
      }), h4 = await yi$1(c2, this.subscribeTimeout, `Subscribing to ${e2} failed, please try again`);
      if (!h4 && o3) throw new Error(`Subscribing to ${e2} failed, please try again`);
      return h4 ? a2 : null;
    } catch (a2) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(C$2.connection_stalled), o3) throw a2;
    }
    return null;
  }
  async rpcBatchSubscribe(e2) {
    if (!e2.length) return;
    const t = e2[0].relay, i3 = { method: Yc(t.protocol).batchSubscribe, params: { topics: e2.map((s2) => s2.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i3 });
    try {
      await await yi$1(new Promise((s2) => {
        this.relayer.request(i3).catch((n3) => this.logger.warn(n3)).then(s2);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(C$2.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e2) {
    if (!e2.length) return;
    const t = e2[0].relay, i3 = { method: Yc(t.protocol).batchFetchMessages, params: { topics: e2.map((n3) => n3.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i3 });
    let s2;
    try {
      s2 = await await yi$1(new Promise((n3, o3) => {
        this.relayer.request(i3).catch((a2) => {
          this.logger.warn(a2), o3(a2);
        }).then(n3);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(C$2.connection_stalled);
    }
    return s2;
  }
  rpcUnsubscribe(e2, t, i3) {
    const s2 = { method: Yc(i3.protocol).unsubscribe, params: { topic: e2, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s2 }), this.relayer.request(s2);
  }
  onSubscribe(e2, t) {
    this.setSubscription(e2, He$1(ge$1({}, t), { id: e2 })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e2) {
    e2.length && e2.forEach((t) => {
      this.setSubscription(t.id, ge$1({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e2, t, i3) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e2) && this.deleteSubscription(t, i3), await this.relayer.messages.del(e2);
  }
  async setRelayerSubscriptions(e2) {
    await this.relayer.core.storage.setItem(this.storageKey, e2);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e2, t) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e2, subscription: t }), this.addSubscription(e2, t);
  }
  addSubscription(e2, t) {
    this.subscriptions.set(e2, ge$1({}, t)), this.topicMap.set(t.topic, e2), this.events.emit($$3.created, t);
  }
  getSubscription(e2) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e2 });
    const t = this.subscriptions.get(e2);
    if (!t) {
      const { message: i3 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw new Error(i3);
    }
    return t;
  }
  deleteSubscription(e2, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e2, reason: t });
    const i3 = this.getSubscription(e2);
    this.subscriptions.delete(e2), this.topicMap.delete(i3.topic, e2), this.events.emit($$3.deleted, He$1(ge$1({}, i3), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit($$3.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e2 = [...this.cached], t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let i3 = 0; i3 < t; i3++) {
        const s2 = e2.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(s2);
      }
    }
    this.events.emit($$3.resubscribed);
  }
  async restore() {
    try {
      const e2 = await this.getRelayerSubscriptions();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.subscriptions.size) {
        const { message: t } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e2);
    }
  }
  async batchSubscribe(e2) {
    e2.length && (await this.rpcBatchSubscribe(e2), this.onBatchSubscribe(await Promise.all(e2.map(async (t) => He$1(ge$1({}, t), { id: await this.getSubscriptionId(t.topic) })))));
  }
  async batchFetchMessages(e2) {
    if (!e2.length) return;
    this.logger.trace(`Fetching batch messages for ${e2.length} subscriptions`);
    const t = await this.rpcBatchFetchMessages(e2);
    t && t.messages && (await Ni$1(cjs$3.toMiliseconds(cjs$3.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  async restartToComplete(e2) {
    !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e2), await this.relayer.transportOpen());
  }
  async getClientId() {
    return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
  }
  async getSubscriptionId(e2) {
    return kc(e2 + await this.getClientId());
  }
}
var eo = Object.defineProperty, Ci = Object.getOwnPropertySymbols, to = Object.prototype.hasOwnProperty, io = Object.prototype.propertyIsEnumerable, Ye$1 = (r2, e2, t) => e2 in r2 ? eo(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, Pi = (r2, e2) => {
  for (var t in e2 || (e2 = {})) to.call(e2, t) && Ye$1(r2, t, e2[t]);
  if (Ci) for (var t of Ci(e2)) io.call(e2, t) && Ye$1(r2, t, e2[t]);
  return r2;
}, y$1 = (r2, e2, t) => Ye$1(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class Si extends d$3 {
  constructor(e2) {
    super(e2), y$1(this, "protocol", "wc"), y$1(this, "version", 2), y$1(this, "core"), y$1(this, "logger"), y$1(this, "events", new eventsExports.EventEmitter()), y$1(this, "provider"), y$1(this, "messages"), y$1(this, "subscriber"), y$1(this, "publisher"), y$1(this, "name", $t), y$1(this, "transportExplicitlyClosed", false), y$1(this, "initialized", false), y$1(this, "connectionAttemptInProgress", false), y$1(this, "relayUrl"), y$1(this, "projectId"), y$1(this, "packageName"), y$1(this, "bundleId"), y$1(this, "hasExperiencedNetworkDisruption", false), y$1(this, "pingTimeout"), y$1(this, "heartBeatTimeout", cjs$3.toMiliseconds(cjs$3.THIRTY_SECONDS + cjs$3.FIVE_SECONDS)), y$1(this, "reconnectTimeout"), y$1(this, "connectPromise"), y$1(this, "reconnectInProgress", false), y$1(this, "requestsInFlight", []), y$1(this, "connectTimeout", cjs$3.toMiliseconds(cjs$3.ONE_SECOND * 15)), y$1(this, "request", async (t) => {
      var i3, s2;
      this.logger.debug("Publishing Request Payload");
      const n3 = t.id || getBigIntRpcId().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: n3, method: t.method, topic: (i3 = t.params) == null ? void 0 : i3.topic }, "relayer.request - publishing...");
        const o3 = `${n3}:${((s2 = t.params) == null ? void 0 : s2.tag) || ""}`;
        this.requestsInFlight.push(o3);
        const a2 = await this.provider.request(t);
        return this.requestsInFlight = this.requestsInFlight.filter((c2) => c2 !== o3), a2;
      } catch (o3) {
        throw this.logger.debug(`Failed to Publish Request: ${n3}`), o3;
      }
    }), y$1(this, "resetPingTimeout", () => {
      _e$3() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        var t, i3, s2, n3;
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (n3 = (s2 = (i3 = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : i3.socket) == null ? void 0 : s2.terminate) == null || n3.call(s2);
        } catch (o3) {
          this.logger.warn(o3, o3 == null ? void 0 : o3.message);
        }
      }, this.heartBeatTimeout));
    }), y$1(this, "onPayloadHandler", (t) => {
      this.onProviderPayload(t), this.resetPingTimeout();
    }), y$1(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(C$2.connect);
    }), y$1(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), y$1(this, "onProviderErrorHandler", (t) => {
      this.logger.fatal(`Fatal socket error: ${t.message}`), this.events.emit(C$2.error, t), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), y$1(this, "registerProviderListeners", () => {
      this.provider.on(L$3.payload, this.onPayloadHandler), this.provider.on(L$3.connect, this.onConnectHandler), this.provider.on(L$3.disconnect, this.onDisconnectHandler), this.provider.on(L$3.error, this.onProviderErrorHandler);
    }), this.core = e2.core, this.logger = typeof e2.logger < "u" && typeof e2.logger != "string" ? E$5(e2.logger, this.name) : Ot$1(k$4({ level: e2.logger || Nt })), this.messages = new _i(this.logger, e2.core), this.subscriber = new Ti(this, this.logger), this.publisher = new qn(this, this.logger), this.relayUrl = (e2 == null ? void 0 : e2.relayUrl) || Ue$2, this.projectId = e2.projectId, ei$1() ? this.packageName = ri$1() : ni$1() && (this.bundleId = ri$1()), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = true, this.subscriber.hasAnyTopics) try {
      await this.transportOpen();
    } catch (e2) {
      this.logger.warn(e2, e2 == null ? void 0 : e2.message);
    }
  }
  get context() {
    return y$3(this.logger);
  }
  get connected() {
    var e2, t, i3;
    return ((i3 = (t = (e2 = this.provider) == null ? void 0 : e2.connection) == null ? void 0 : t.socket) == null ? void 0 : i3.readyState) === 1 || false;
  }
  get connecting() {
    var e2, t, i3;
    return ((i3 = (t = (e2 = this.provider) == null ? void 0 : e2.connection) == null ? void 0 : t.socket) == null ? void 0 : i3.readyState) === 0 || this.connectPromise !== void 0 || false;
  }
  async publish(e2, t, i3) {
    this.isInitialized(), await this.publisher.publish(e2, t, i3), await this.recordMessageEvent({ topic: e2, message: t, publishedAt: Date.now(), transportType: Q$2.relay }, le$1.outbound);
  }
  async subscribe(e2, t) {
    var i3, s2, n3;
    this.isInitialized(), (!(t != null && t.transportType) || (t == null ? void 0 : t.transportType) === "relay") && await this.toEstablishConnection();
    const o3 = typeof ((i3 = t == null ? void 0 : t.internal) == null ? void 0 : i3.throwOnFailedPublish) > "u" ? true : (s2 = t == null ? void 0 : t.internal) == null ? void 0 : s2.throwOnFailedPublish;
    let a2 = ((n3 = this.subscriber.topicMap.get(e2)) == null ? void 0 : n3[0]) || "", c2;
    const h4 = (l2) => {
      l2.topic === e2 && (this.subscriber.off($$3.created, h4), c2());
    };
    return await Promise.all([new Promise((l2) => {
      c2 = l2, this.subscriber.on($$3.created, h4);
    }), new Promise(async (l2, d4) => {
      a2 = await this.subscriber.subscribe(e2, Pi({ internal: { throwOnFailedPublish: o3 } }, t)).catch((g2) => {
        o3 && d4(g2);
      }) || a2, l2();
    })]), a2;
  }
  async unsubscribe(e2, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e2, t);
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await yi$1(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, await this.transportDisconnect();
  }
  async transportOpen(e2) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t, i3) => {
      await this.connect(e2).then(t).catch(i3).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e2) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e2 || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Na()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e2) {
    if ((e2 == null ? void 0 : e2.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t = e2.sort((i3, s2) => i3.publishedAt - s2.publishedAt);
    this.logger.debug(`Batch of ${t.length} message events sorted`);
    for (const i3 of t) try {
      await this.onMessageEvent(i3);
    } catch (s2) {
      this.logger.warn(s2, "Error while processing batch message event: " + (s2 == null ? void 0 : s2.message));
    }
    this.logger.trace(`Batch of ${t.length} message events processed`);
  }
  async onLinkMessageEvent(e2, t) {
    const { topic: i3 } = e2;
    if (!t.sessionExists) {
      const s2 = Ei$1(cjs$3.FIVE_MINUTES), n3 = { topic: i3, expiry: s2, relay: { protocol: "irn" }, active: false };
      await this.core.pairing.pairings.set(i3, n3);
    }
    this.events.emit(C$2.message, e2), await this.recordMessageEvent(e2, le$1.inbound);
  }
  async connect(e2) {
    await this.confirmOnlineStateOrThrow(), e2 && e2 !== this.relayUrl && (this.relayUrl = e2, await this.transportDisconnect()), this.connectionAttemptInProgress = true, this.transportExplicitlyClosed = false;
    let t = 1;
    for (; t < 6; ) {
      try {
        if (this.transportExplicitlyClosed) break;
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t}...`), await this.createProvider(), await new Promise(async (i3, s2) => {
          const n3 = () => {
            s2(new Error("Connection interrupted while trying to subscribe"));
          };
          this.provider.once(L$3.disconnect, n3), await yi$1(new Promise((o3, a2) => {
            this.provider.connect().then(o3).catch(a2);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o3) => {
            s2(o3);
          }).finally(() => {
            this.provider.off(L$3.disconnect, n3), clearTimeout(this.reconnectTimeout);
          }), await new Promise(async (o3, a2) => {
            const c2 = () => {
              a2(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(L$3.disconnect, c2), await this.subscriber.start().then(o3).catch(a2).finally(() => {
              this.provider.off(L$3.disconnect, c2);
            });
          }), this.hasExperiencedNetworkDisruption = false, i3();
        });
      } catch (i3) {
        await this.subscriber.stop();
        const s2 = i3;
        this.logger.warn({}, s2.message), this.hasExperiencedNetworkDisruption = true;
      } finally {
        this.connectionAttemptInProgress = false;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t}`);
        break;
      }
      await new Promise((i3) => setTimeout(i3, cjs$3.toMiliseconds(t * 1))), t++;
    }
  }
  startPingTimeout() {
    var e2, t, i3, s2, n3;
    if (_e$3()) try {
      (t = (e2 = this.provider) == null ? void 0 : e2.connection) != null && t.socket && ((n3 = (s2 = (i3 = this.provider) == null ? void 0 : i3.connection) == null ? void 0 : s2.socket) == null || n3.on("ping", () => {
        this.resetPingTimeout();
      })), this.resetPingTimeout();
    } catch (o3) {
      this.logger.warn(o3, o3 == null ? void 0 : o3.message);
    }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e2 = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new o$1(new f$3(si$1({ sdkVersion: _e$2, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e2, useOnCloseEvent: true, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e2, t) {
    const { topic: i3, message: s2 } = e2;
    await this.messages.set(i3, s2, t);
  }
  async shouldIgnoreMessageEvent(e2) {
    const { topic: t, message: i3 } = e2;
    if (!i3 || i3.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${i3}`), true;
    if (!await this.subscriber.isKnownTopic(t)) return this.logger.warn(`Ignoring message for unknown topic ${t}`), true;
    const s2 = this.messages.has(t, i3);
    return s2 && this.logger.warn(`Ignoring duplicate message: ${i3}`), s2;
  }
  async onProviderPayload(e2) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e2 }), isJsonRpcRequest(e2)) {
      if (!e2.method.endsWith(zt$1)) return;
      const t = e2.params, { topic: i3, message: s2, publishedAt: n3, attestation: o3 } = t.data, a2 = { topic: i3, message: s2, publishedAt: n3, transportType: Q$2.relay, attestation: o3 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Pi({ type: "event", event: t.id }, a2)), this.events.emit(t.id, a2), await this.acknowledgePayload(e2), await this.onMessageEvent(a2);
    } else isJsonRpcResponse(e2) && this.events.emit(C$2.message_ack, e2);
  }
  async onMessageEvent(e2) {
    await this.shouldIgnoreMessageEvent(e2) || (await this.recordMessageEvent(e2, le$1.inbound), this.events.emit(C$2.message, e2));
  }
  async acknowledgePayload(e2) {
    const t = formatJsonRpcResult(e2.id, true);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(L$3.payload, this.onPayloadHandler), this.provider.off(L$3.connect, this.onConnectHandler), this.provider.off(L$3.disconnect, this.onDisconnectHandler), this.provider.off(L$3.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e2 = await Na();
    Ua(async (t) => {
      e2 !== t && (e2 = t, t ? await this.transportOpen().catch((i3) => this.logger.error(i3, i3 == null ? void 0 : i3.message)) : (this.hasExperiencedNetworkDisruption = true, await this.transportDisconnect(), this.transportExplicitlyClosed = false));
    }), this.core.heartbeat.on(r$1.pulse, async () => {
      if (!this.transportExplicitlyClosed && !this.connected && Ta()) try {
        await this.confirmOnlineStateOrThrow(), await this.transportOpen();
      } catch (t) {
        this.logger.warn(t, t == null ? void 0 : t.message);
      }
    });
  }
  async onProviderDisconnect() {
    clearTimeout(this.pingTimeout), this.events.emit(C$2.disconnect), this.connectionAttemptInProgress = false, !this.reconnectInProgress && (this.reconnectInProgress = true, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e2) => this.logger.error(e2, e2 == null ? void 0 : e2.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = false;
    }, cjs$3.toMiliseconds(Lt$1)))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  async toEstablishConnection() {
    if (await this.confirmOnlineStateOrThrow(), !this.connected) {
      if (this.connectPromise) {
        await this.connectPromise;
        return;
      }
      await this.connect();
    }
  }
}
function so() {
}
function Oi(r2) {
  if (!r2 || typeof r2 != "object") return false;
  const e2 = Object.getPrototypeOf(r2);
  return e2 === null || e2 === Object.prototype || Object.getPrototypeOf(e2) === null ? Object.prototype.toString.call(r2) === "[object Object]" : false;
}
function Ri(r2) {
  return Object.getOwnPropertySymbols(r2).filter((e2) => Object.prototype.propertyIsEnumerable.call(r2, e2));
}
function Ai(r2) {
  return r2 == null ? r2 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r2);
}
const ro = "[object RegExp]", no = "[object String]", oo = "[object Number]", ao = "[object Boolean]", xi = "[object Arguments]", co = "[object Symbol]", ho = "[object Date]", lo = "[object Map]", uo = "[object Set]", go = "[object Array]", po = "[object Function]", yo = "[object ArrayBuffer]", Je$1 = "[object Object]", bo = "[object Error]", mo = "[object DataView]", fo = "[object Uint8Array]", Do = "[object Uint8ClampedArray]", vo = "[object Uint16Array]", wo = "[object Uint32Array]", _o = "[object BigUint64Array]", Eo = "[object Int8Array]", Io = "[object Int16Array]", To = "[object Int32Array]", Co = "[object BigInt64Array]", Po = "[object Float32Array]", So = "[object Float64Array]";
function Oo(r2, e2) {
  return r2 === e2 || Number.isNaN(r2) && Number.isNaN(e2);
}
function Ro2(r2, e2, t) {
  return pe$1(r2, e2, void 0, void 0, void 0, void 0, t);
}
function pe$1(r2, e2, t, i3, s2, n3, o3) {
  const a2 = o3(r2, e2, t, i3, s2, n3);
  if (a2 !== void 0) return a2;
  if (typeof r2 == typeof e2) switch (typeof r2) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return r2 === e2;
    case "number":
      return r2 === e2 || Object.is(r2, e2);
    case "function":
      return r2 === e2;
    case "object":
      return ye$1(r2, e2, n3, o3);
  }
  return ye$1(r2, e2, n3, o3);
}
function ye$1(r2, e2, t, i3) {
  if (Object.is(r2, e2)) return true;
  let s2 = Ai(r2), n3 = Ai(e2);
  if (s2 === xi && (s2 = Je$1), n3 === xi && (n3 = Je$1), s2 !== n3) return false;
  switch (s2) {
    case no:
      return r2.toString() === e2.toString();
    case oo: {
      const c2 = r2.valueOf(), h4 = e2.valueOf();
      return Oo(c2, h4);
    }
    case ao:
    case ho:
    case co:
      return Object.is(r2.valueOf(), e2.valueOf());
    case ro:
      return r2.source === e2.source && r2.flags === e2.flags;
    case po:
      return r2 === e2;
  }
  t = t ?? /* @__PURE__ */ new Map();
  const o3 = t.get(r2), a2 = t.get(e2);
  if (o3 != null && a2 != null) return o3 === e2;
  t.set(r2, e2), t.set(e2, r2);
  try {
    switch (s2) {
      case lo: {
        if (r2.size !== e2.size) return false;
        for (const [c2, h4] of r2.entries()) if (!e2.has(c2) || !pe$1(h4, e2.get(c2), c2, r2, e2, t, i3)) return false;
        return true;
      }
      case uo: {
        if (r2.size !== e2.size) return false;
        const c2 = Array.from(r2.values()), h4 = Array.from(e2.values());
        for (let l2 = 0; l2 < c2.length; l2++) {
          const d4 = c2[l2], g2 = h4.findIndex((_3) => pe$1(d4, _3, void 0, r2, e2, t, i3));
          if (g2 === -1) return false;
          h4.splice(g2, 1);
        }
        return true;
      }
      case go:
      case fo:
      case Do:
      case vo:
      case wo:
      case _o:
      case Eo:
      case Io:
      case To:
      case Co:
      case Po:
      case So: {
        if (typeof Buffer < "u" && Buffer.isBuffer(r2) !== Buffer.isBuffer(e2) || r2.length !== e2.length) return false;
        for (let c2 = 0; c2 < r2.length; c2++) if (!pe$1(r2[c2], e2[c2], c2, r2, e2, t, i3)) return false;
        return true;
      }
      case yo:
        return r2.byteLength !== e2.byteLength ? false : ye$1(new Uint8Array(r2), new Uint8Array(e2), t, i3);
      case mo:
        return r2.byteLength !== e2.byteLength || r2.byteOffset !== e2.byteOffset ? false : ye$1(new Uint8Array(r2), new Uint8Array(e2), t, i3);
      case bo:
        return r2.name === e2.name && r2.message === e2.message;
      case Je$1: {
        if (!(ye$1(r2.constructor, e2.constructor, t, i3) || Oi(r2) && Oi(e2))) return false;
        const h4 = [...Object.keys(r2), ...Ri(r2)], l2 = [...Object.keys(e2), ...Ri(e2)];
        if (h4.length !== l2.length) return false;
        for (let d4 = 0; d4 < h4.length; d4++) {
          const g2 = h4[d4], _3 = r2[g2];
          if (!Object.hasOwn(e2, g2)) return false;
          const u2 = e2[g2];
          if (!pe$1(_3, u2, g2, r2, e2, t, i3)) return false;
        }
        return true;
      }
      default:
        return false;
    }
  } finally {
    t.delete(r2), t.delete(e2);
  }
}
function Ao(r2, e2) {
  return Ro2(r2, e2, so);
}
var xo = Object.defineProperty, Ni = Object.getOwnPropertySymbols, No = Object.prototype.hasOwnProperty, $o = Object.prototype.propertyIsEnumerable, Xe$1 = (r2, e2, t) => e2 in r2 ? xo(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, $i = (r2, e2) => {
  for (var t in e2 || (e2 = {})) No.call(e2, t) && Xe$1(r2, t, e2[t]);
  if (Ni) for (var t of Ni(e2)) $o.call(e2, t) && Xe$1(r2, t, e2[t]);
  return r2;
}, z$1 = (r2, e2, t) => Xe$1(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class zi extends f$4 {
  constructor(e2, t, i3, s2 = B$2, n3 = void 0) {
    super(e2, t, i3, s2), this.core = e2, this.logger = t, this.name = i3, z$1(this, "map", /* @__PURE__ */ new Map()), z$1(this, "version", kt$1), z$1(this, "cached", []), z$1(this, "initialized", false), z$1(this, "getKey"), z$1(this, "storagePrefix", B$2), z$1(this, "recentlyDeleted", []), z$1(this, "recentlyDeletedLimit", 200), z$1(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o3) => {
        this.getKey && o3 !== null && !Et$2(o3) ? this.map.set(this.getKey(o3), o3) : la(o3) ? this.map.set(o3.id, o3) : da(o3) && this.map.set(o3.topic, o3);
      }), this.cached = [], this.initialized = true);
    }), z$1(this, "set", async (o3, a2) => {
      this.isInitialized(), this.map.has(o3) ? await this.update(o3, a2) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o3, value: a2 }), this.map.set(o3, a2), await this.persist());
    }), z$1(this, "get", (o3) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o3 }), this.getData(o3))), z$1(this, "getAll", (o3) => (this.isInitialized(), o3 ? this.values.filter((a2) => Object.keys(o3).every((c2) => Ao(a2[c2], o3[c2]))) : this.values)), z$1(this, "update", async (o3, a2) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o3, update: a2 });
      const c2 = $i($i({}, this.getData(o3)), a2);
      this.map.set(o3, c2), await this.persist();
    }), z$1(this, "delete", async (o3, a2) => {
      this.isInitialized(), this.map.has(o3) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o3, reason: a2 }), this.map.delete(o3), this.addToRecentlyDeleted(o3), await this.persist());
    }), this.logger = E$5(t, this.name), this.storagePrefix = s2, this.getKey = n3;
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e2) {
    this.recentlyDeleted.push(e2), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e2) {
    const t = this.map.get(e2);
    if (!t) {
      if (this.recentlyDeleted.includes(e2)) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e2}`);
        throw this.logger.error(s2), new Error(s2);
      }
      const { message: i3 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw this.logger.error(i3), new Error(i3);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e2 = await this.getDataStore();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.map.size) {
        const { message: t } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e2);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
}
var zo = Object.defineProperty, Lo = (r2, e2, t) => e2 in r2 ? zo(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, p$2 = (r2, e2, t) => Lo(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class Li {
  constructor(e2, t) {
    this.core = e2, this.logger = t, p$2(this, "name", Mt$1), p$2(this, "version", Kt$1), p$2(this, "events", new Nt$3()), p$2(this, "pairings"), p$2(this, "initialized", false), p$2(this, "storagePrefix", B$2), p$2(this, "ignoredPayloadTypes", [Ft$2]), p$2(this, "registeredMethods", []), p$2(this, "init", async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }), p$2(this, "register", ({ methods: i3 }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i3])];
    }), p$2(this, "create", async (i3) => {
      this.isInitialized();
      const s2 = jc(), n3 = await this.core.crypto.setSymKey(s2), o3 = Ei$1(cjs$3.FIVE_MINUTES), a2 = { protocol: xt$1 }, c2 = { topic: n3, expiry: o3, relay: a2, active: false, methods: i3 == null ? void 0 : i3.methods }, h4 = Wc({ protocol: this.core.protocol, version: this.core.version, topic: n3, symKey: s2, relay: a2, expiryTimestamp: o3, methods: i3 == null ? void 0 : i3.methods });
      return this.events.emit(re$1.create, c2), this.core.expirer.set(n3, o3), await this.pairings.set(n3, c2), await this.core.relayer.subscribe(n3, { transportType: i3 == null ? void 0 : i3.transportType }), { topic: n3, uri: h4 };
    }), p$2(this, "pair", async (i3) => {
      this.isInitialized();
      const s2 = this.core.eventClient.createEvent({ properties: { topic: i3 == null ? void 0 : i3.uri, trace: [G$1.pairing_started] } });
      this.isValidPair(i3, s2);
      const { topic: n3, symKey: o3, relay: a2, expiryTimestamp: c2, methods: h4 } = Gc(i3.uri);
      s2.props.properties.topic = n3, s2.addTrace(G$1.pairing_uri_validation_success), s2.addTrace(G$1.pairing_uri_not_expired);
      let l2;
      if (this.pairings.keys.includes(n3)) {
        if (l2 = this.pairings.get(n3), s2.addTrace(G$1.existing_pairing), l2.active) throw s2.setError(Y$2.active_pairing_already_exists), new Error(`Pairing already exists: ${n3}. Please try again with a new connection URI.`);
        s2.addTrace(G$1.pairing_not_expired);
      }
      const d4 = c2 || Ei$1(cjs$3.FIVE_MINUTES), g2 = { topic: n3, relay: a2, expiry: d4, active: false, methods: h4 };
      this.core.expirer.set(n3, d4), await this.pairings.set(n3, g2), s2.addTrace(G$1.store_new_pairing), i3.activatePairing && await this.activate({ topic: n3 }), this.events.emit(re$1.create, g2), s2.addTrace(G$1.emit_inactive_pairing), this.core.crypto.keychain.has(n3) || await this.core.crypto.setSymKey(o3, n3), s2.addTrace(G$1.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        s2.setError(Y$2.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(n3, { relay: a2 });
      } catch (_3) {
        throw s2.setError(Y$2.subscribe_pairing_topic_failure), _3;
      }
      return s2.addTrace(G$1.subscribe_pairing_topic_success), g2;
    }), p$2(this, "activate", async ({ topic: i3 }) => {
      this.isInitialized();
      const s2 = Ei$1(cjs$3.FIVE_MINUTES);
      this.core.expirer.set(i3, s2), await this.pairings.update(i3, { active: true, expiry: s2 });
    }), p$2(this, "ping", async (i3) => {
      this.isInitialized(), await this.isValidPing(i3), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: s2 } = i3;
      if (this.pairings.keys.includes(s2)) {
        const n3 = await this.sendRequest(s2, "wc_pairingPing", {}), { done: o3, resolve: a2, reject: c2 } = gi$1();
        this.events.once(xi$1("pairing_ping", n3), ({ error: h4 }) => {
          h4 ? c2(h4) : a2();
        }), await o3();
      }
    }), p$2(this, "updateExpiry", async ({ topic: i3, expiry: s2 }) => {
      this.isInitialized(), await this.pairings.update(i3, { expiry: s2 });
    }), p$2(this, "updateMetadata", async ({ topic: i3, metadata: s2 }) => {
      this.isInitialized(), await this.pairings.update(i3, { peerMetadata: s2 });
    }), p$2(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), p$2(this, "disconnect", async (i3) => {
      this.isInitialized(), await this.isValidDisconnect(i3);
      const { topic: s2 } = i3;
      this.pairings.keys.includes(s2) && (await this.sendRequest(s2, "wc_pairingDelete", Nt$1("USER_DISCONNECTED")), await this.deletePairing(s2));
    }), p$2(this, "formatUriFromPairing", (i3) => {
      this.isInitialized();
      const { topic: s2, relay: n3, expiry: o3, methods: a2 } = i3, c2 = this.core.crypto.keychain.get(s2);
      return Wc({ protocol: this.core.protocol, version: this.core.version, topic: s2, symKey: c2, relay: n3, expiryTimestamp: o3, methods: a2 });
    }), p$2(this, "sendRequest", async (i3, s2, n3) => {
      const o3 = formatJsonRpcRequest(s2, n3), a2 = await this.core.crypto.encode(i3, o3), c2 = se$1[s2].req;
      return this.core.history.set(i3, o3), this.core.relayer.publish(i3, a2, c2), o3.id;
    }), p$2(this, "sendResult", async (i3, s2, n3) => {
      const o3 = formatJsonRpcResult(i3, n3), a2 = await this.core.crypto.encode(s2, o3), c2 = (await this.core.history.get(s2, i3)).request.method, h4 = se$1[c2].res;
      await this.core.relayer.publish(s2, a2, h4), await this.core.history.resolve(o3);
    }), p$2(this, "sendError", async (i3, s2, n3) => {
      const o3 = formatJsonRpcError(i3, n3), a2 = await this.core.crypto.encode(s2, o3), c2 = (await this.core.history.get(s2, i3)).request.method, h4 = se$1[c2] ? se$1[c2].res : se$1.unregistered_method.res;
      await this.core.relayer.publish(s2, a2, h4), await this.core.history.resolve(o3);
    }), p$2(this, "deletePairing", async (i3, s2) => {
      await this.core.relayer.unsubscribe(i3), await Promise.all([this.pairings.delete(i3, Nt$1("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(i3), s2 ? Promise.resolve() : this.core.expirer.del(i3)]);
    }), p$2(this, "cleanup", async () => {
      const i3 = this.pairings.getAll().filter((s2) => vi$1(s2.expiry));
      await Promise.all(i3.map((s2) => this.deletePairing(s2.topic)));
    }), p$2(this, "onRelayEventRequest", async (i3) => {
      const { topic: s2, payload: n3 } = i3;
      switch (n3.method) {
        case "wc_pairingPing":
          return await this.onPairingPingRequest(s2, n3);
        case "wc_pairingDelete":
          return await this.onPairingDeleteRequest(s2, n3);
        default:
          return await this.onUnknownRpcMethodRequest(s2, n3);
      }
    }), p$2(this, "onRelayEventResponse", async (i3) => {
      const { topic: s2, payload: n3 } = i3, o3 = (await this.core.history.get(s2, n3.id)).request.method;
      switch (o3) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(s2, n3);
        default:
          return this.onUnknownRpcMethodResponse(o3);
      }
    }), p$2(this, "onPairingPingRequest", async (i3, s2) => {
      const { id: n3 } = s2;
      try {
        this.isValidPing({ topic: i3 }), await this.sendResult(n3, i3, true), this.events.emit(re$1.ping, { id: n3, topic: i3 });
      } catch (o3) {
        await this.sendError(n3, i3, o3), this.logger.error(o3);
      }
    }), p$2(this, "onPairingPingResponse", (i3, s2) => {
      const { id: n3 } = s2;
      setTimeout(() => {
        isJsonRpcResult(s2) ? this.events.emit(xi$1("pairing_ping", n3), {}) : isJsonRpcError(s2) && this.events.emit(xi$1("pairing_ping", n3), { error: s2.error });
      }, 500);
    }), p$2(this, "onPairingDeleteRequest", async (i3, s2) => {
      const { id: n3 } = s2;
      try {
        this.isValidDisconnect({ topic: i3 }), await this.deletePairing(i3), this.events.emit(re$1.delete, { id: n3, topic: i3 });
      } catch (o3) {
        await this.sendError(n3, i3, o3), this.logger.error(o3);
      }
    }), p$2(this, "onUnknownRpcMethodRequest", async (i3, s2) => {
      const { id: n3, method: o3 } = s2;
      try {
        if (this.registeredMethods.includes(o3)) return;
        const a2 = Nt$1("WC_METHOD_UNSUPPORTED", o3);
        await this.sendError(n3, i3, a2), this.logger.error(a2);
      } catch (a2) {
        await this.sendError(n3, i3, a2), this.logger.error(a2);
      }
    }), p$2(this, "onUnknownRpcMethodResponse", (i3) => {
      this.registeredMethods.includes(i3) || this.logger.error(Nt$1("WC_METHOD_UNSUPPORTED", i3));
    }), p$2(this, "isValidPair", (i3, s2) => {
      var n3;
      if (!ma(i3)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `pair() params: ${i3}`);
        throw s2.setError(Y$2.malformed_pairing_uri), new Error(a2);
      }
      if (!fa(i3.uri)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `pair() uri: ${i3.uri}`);
        throw s2.setError(Y$2.malformed_pairing_uri), new Error(a2);
      }
      const o3 = Gc(i3 == null ? void 0 : i3.uri);
      if (!((n3 = o3 == null ? void 0 : o3.relay) != null && n3.protocol)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw s2.setError(Y$2.malformed_pairing_uri), new Error(a2);
      }
      if (!(o3 != null && o3.symKey)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", "pair() uri#symKey");
        throw s2.setError(Y$2.malformed_pairing_uri), new Error(a2);
      }
      if (o3 != null && o3.expiryTimestamp && cjs$3.toMiliseconds(o3 == null ? void 0 : o3.expiryTimestamp) < Date.now()) {
        s2.setError(Y$2.pairing_expired);
        const { message: a2 } = ht$2("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a2);
      }
    }), p$2(this, "isValidPing", async (i3) => {
      if (!ma(i3)) {
        const { message: n3 } = ht$2("MISSING_OR_INVALID", `ping() params: ${i3}`);
        throw new Error(n3);
      }
      const { topic: s2 } = i3;
      await this.isValidPairingTopic(s2);
    }), p$2(this, "isValidDisconnect", async (i3) => {
      if (!ma(i3)) {
        const { message: n3 } = ht$2("MISSING_OR_INVALID", `disconnect() params: ${i3}`);
        throw new Error(n3);
      }
      const { topic: s2 } = i3;
      await this.isValidPairingTopic(s2);
    }), p$2(this, "isValidPairingTopic", async (i3) => {
      if (!nt$2(i3, false)) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `pairing topic should be a string: ${i3}`);
        throw new Error(s2);
      }
      if (!this.pairings.keys.includes(i3)) {
        const { message: s2 } = ht$2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i3}`);
        throw new Error(s2);
      }
      if (vi$1(this.pairings.get(i3).expiry)) {
        await this.deletePairing(i3);
        const { message: s2 } = ht$2("EXPIRED", `pairing topic: ${i3}`);
        throw new Error(s2);
      }
    }), this.core = e2, this.logger = E$5(t, this.name), this.pairings = new zi(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return y$3(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(C$2.message, async (e2) => {
      const { topic: t, message: i3, transportType: s2 } = e2;
      if (this.pairings.keys.includes(t) && s2 !== Q$2.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i3))) try {
        const n3 = await this.core.crypto.decode(t, i3);
        isJsonRpcRequest(n3) ? (this.core.history.set(t, n3), await this.onRelayEventRequest({ topic: t, payload: n3 })) : isJsonRpcResponse(n3) && (await this.core.history.resolve(n3), await this.onRelayEventResponse({ topic: t, payload: n3 }), this.core.history.delete(t, n3.id)), await this.core.relayer.messages.ack(t, i3);
      } catch (n3) {
        this.logger.error(n3);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(M$2.expired, async (e2) => {
      const { topic: t } = bi$1(e2.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, true), this.events.emit(re$1.expire, { topic: t }));
    });
  }
}
var ko = Object.defineProperty, jo2 = (r2, e2, t) => e2 in r2 ? ko(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, O$2 = (r2, e2, t) => jo2(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class ki extends I$2 {
  constructor(e2, t) {
    super(e2, t), this.core = e2, this.logger = t, O$2(this, "records", /* @__PURE__ */ new Map()), O$2(this, "events", new eventsExports.EventEmitter()), O$2(this, "name", Bt$1), O$2(this, "version", Vt$1), O$2(this, "cached", []), O$2(this, "initialized", false), O$2(this, "storagePrefix", B$2), O$2(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i3) => this.records.set(i3.id, i3)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), O$2(this, "set", (i3, s2, n3) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: i3, request: s2, chainId: n3 }), this.records.has(s2.id)) return;
      const o3 = { id: s2.id, topic: i3, request: { method: s2.method, params: s2.params || null }, chainId: n3, expiry: Ei$1(cjs$3.THIRTY_DAYS) };
      this.records.set(o3.id, o3), this.persist(), this.events.emit(F$2.created, o3);
    }), O$2(this, "resolve", async (i3) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: i3 }), !this.records.has(i3.id)) return;
      const s2 = await this.getRecord(i3.id);
      typeof s2.response > "u" && (s2.response = isJsonRpcError(i3) ? { error: i3.error } : { result: i3.result }, this.records.set(s2.id, s2), this.persist(), this.events.emit(F$2.updated, s2));
    }), O$2(this, "get", async (i3, s2) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: i3, id: s2 }), await this.getRecord(s2))), O$2(this, "delete", (i3, s2) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: s2 }), this.values.forEach((n3) => {
        if (n3.topic === i3) {
          if (typeof s2 < "u" && n3.id !== s2) return;
          this.records.delete(n3.id), this.events.emit(F$2.deleted, n3);
        }
      }), this.persist();
    }), O$2(this, "exists", async (i3, s2) => (this.isInitialized(), this.records.has(s2) ? (await this.getRecord(s2)).topic === i3 : false)), O$2(this, "on", (i3, s2) => {
      this.events.on(i3, s2);
    }), O$2(this, "once", (i3, s2) => {
      this.events.once(i3, s2);
    }), O$2(this, "off", (i3, s2) => {
      this.events.off(i3, s2);
    }), O$2(this, "removeListener", (i3, s2) => {
      this.events.removeListener(i3, s2);
    }), this.logger = E$5(t, this.name);
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e2 = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u") return;
      const i3 = { topic: t.topic, request: formatJsonRpcRequest(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e2.push(i3);
    }), e2;
  }
  async setJsonRpcRecords(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e2) {
    this.isInitialized();
    const t = this.records.get(e2);
    if (!t) {
      const { message: i3 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw new Error(i3);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(F$2.sync);
  }
  async restore() {
    try {
      const e2 = await this.getJsonRpcRecords();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.records.size) {
        const { message: t } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e2);
    }
  }
  registerEventListeners() {
    this.events.on(F$2.created, (e2) => {
      const t = F$2.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.events.on(F$2.updated, (e2) => {
      const t = F$2.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.events.on(F$2.deleted, (e2) => {
      const t = F$2.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.core.heartbeat.on(r$1.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e2 = false;
      this.records.forEach((t) => {
        cjs$3.toMiliseconds(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(F$2.deleted, t, false), e2 = true);
      }), e2 && this.persist();
    } catch (e2) {
      this.logger.warn(e2);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
}
var Uo = Object.defineProperty, Fo = (r2, e2, t) => e2 in r2 ? Uo(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, A$2 = (r2, e2, t) => Fo(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class ji extends S$3 {
  constructor(e2, t) {
    super(e2, t), this.core = e2, this.logger = t, A$2(this, "expirations", /* @__PURE__ */ new Map()), A$2(this, "events", new eventsExports.EventEmitter()), A$2(this, "name", qt$1), A$2(this, "version", Gt$1), A$2(this, "cached", []), A$2(this, "initialized", false), A$2(this, "storagePrefix", B$2), A$2(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i3) => this.expirations.set(i3.target, i3)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), A$2(this, "has", (i3) => {
      try {
        const s2 = this.formatTarget(i3);
        return typeof this.getExpiration(s2) < "u";
      } catch {
        return false;
      }
    }), A$2(this, "set", (i3, s2) => {
      this.isInitialized();
      const n3 = this.formatTarget(i3), o3 = { target: n3, expiry: s2 };
      this.expirations.set(n3, o3), this.checkExpiry(n3, o3), this.events.emit(M$2.created, { target: n3, expiration: o3 });
    }), A$2(this, "get", (i3) => {
      this.isInitialized();
      const s2 = this.formatTarget(i3);
      return this.getExpiration(s2);
    }), A$2(this, "del", (i3) => {
      if (this.isInitialized(), this.has(i3)) {
        const s2 = this.formatTarget(i3), n3 = this.getExpiration(s2);
        this.expirations.delete(s2), this.events.emit(M$2.deleted, { target: s2, expiration: n3 });
      }
    }), A$2(this, "on", (i3, s2) => {
      this.events.on(i3, s2);
    }), A$2(this, "once", (i3, s2) => {
      this.events.once(i3, s2);
    }), A$2(this, "off", (i3, s2) => {
      this.events.off(i3, s2);
    }), A$2(this, "removeListener", (i3, s2) => {
      this.events.removeListener(i3, s2);
    }), this.logger = E$5(t, this.name);
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e2) {
    if (typeof e2 == "string") return mi$1(e2);
    if (typeof e2 == "number") return wi$1(e2);
    const { message: t } = ht$2("UNKNOWN_TYPE", `Target type: ${typeof e2}`);
    throw new Error(t);
  }
  async setExpirations(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(M$2.sync);
  }
  async restore() {
    try {
      const e2 = await this.getExpirations();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.expirations.size) {
        const { message: t } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e2);
    }
  }
  getExpiration(e2) {
    const t = this.expirations.get(e2);
    if (!t) {
      const { message: i3 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw this.logger.warn(i3), new Error(i3);
    }
    return t;
  }
  checkExpiry(e2, t) {
    const { expiry: i3 } = t;
    cjs$3.toMiliseconds(i3) - Date.now() <= 0 && this.expire(e2, t);
  }
  expire(e2, t) {
    this.expirations.delete(e2), this.events.emit(M$2.expired, { target: e2, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e2, t) => this.checkExpiry(t, e2));
  }
  registerEventListeners() {
    this.core.heartbeat.on(r$1.pulse, () => this.checkExpirations()), this.events.on(M$2.created, (e2) => {
      const t = M$2.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    }), this.events.on(M$2.expired, (e2) => {
      const t = M$2.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    }), this.events.on(M$2.deleted, (e2) => {
      const t = M$2.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
}
var Mo = Object.defineProperty, Ko = (r2, e2, t) => e2 in r2 ? Mo(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, w$2 = (r2, e2, t) => Ko(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class Ui extends M$3 {
  constructor(e2, t, i3) {
    super(e2, t, i3), this.core = e2, this.logger = t, this.store = i3, w$2(this, "name", Wt$1), w$2(this, "abortController"), w$2(this, "isDevEnv"), w$2(this, "verifyUrlV3", Yt$1), w$2(this, "storagePrefix", B$2), w$2(this, "version", Le$2), w$2(this, "publicKey"), w$2(this, "fetchPromise"), w$2(this, "init", async () => {
      var s2;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && cjs$3.toMiliseconds((s2 = this.publicKey) == null ? void 0 : s2.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }), w$2(this, "register", async (s2) => {
      if (!Tt$2() || this.isDevEnv) return;
      const n3 = window.location.origin, { id: o3, decryptedId: a2 } = s2, c2 = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${n3}&id=${o3}&decryptedId=${a2}`;
      try {
        const h4 = getDocument_1(), l2 = this.startAbortTimer(cjs$3.ONE_SECOND * 5), d4 = await new Promise((g2, _3) => {
          const u2 = () => {
            window.removeEventListener("message", x2), h4.body.removeChild(b2), _3("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", u2);
          const b2 = h4.createElement("iframe");
          b2.src = c2, b2.style.display = "none", b2.addEventListener("error", u2, { signal: this.abortController.signal });
          const x2 = (I3) => {
            if (I3.data && typeof I3.data == "string") try {
              const D2 = JSON.parse(I3.data);
              if (D2.type === "verify_attestation") {
                if (sn$2(D2.attestation).payload.id !== o3) return;
                clearInterval(l2), h4.body.removeChild(b2), this.abortController.signal.removeEventListener("abort", u2), window.removeEventListener("message", x2), g2(D2.attestation === null ? "" : D2.attestation);
              }
            } catch (D2) {
              this.logger.warn(D2);
            }
          };
          h4.body.appendChild(b2), window.addEventListener("message", x2, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", d4), d4;
      } catch (h4) {
        this.logger.warn(h4);
      }
      return "";
    }), w$2(this, "resolve", async (s2) => {
      if (this.isDevEnv) return "";
      const { attestationId: n3, hash: o3, encryptedId: a2 } = s2;
      if (n3 === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (n3) {
        if (sn$2(n3).payload.id !== a2) return;
        const h4 = await this.isValidJwtAttestation(n3);
        if (h4) {
          if (!h4.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h4;
        }
      }
      if (!o3) return;
      const c2 = this.getVerifyUrl(s2 == null ? void 0 : s2.verifyUrl);
      return this.fetchAttestation(o3, c2);
    }), w$2(this, "fetchAttestation", async (s2, n3) => {
      this.logger.debug(`resolving attestation: ${s2} from url: ${n3}`);
      const o3 = this.startAbortTimer(cjs$3.ONE_SECOND * 5), a2 = await fetch(`${n3}/attestation/${s2}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o3), a2.status === 200 ? await a2.json() : void 0;
    }), w$2(this, "getVerifyUrl", (s2) => {
      let n3 = s2 || ue$1;
      return Jt$1.includes(n3) || (this.logger.info(`verify url: ${n3}, not included in trusted list, assigning default: ${ue$1}`), n3 = ue$1), n3;
    }), w$2(this, "fetchPublicKey", async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const s2 = this.startAbortTimer(cjs$3.FIVE_SECONDS), n3 = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(s2), await n3.json();
      } catch (s2) {
        this.logger.warn(s2);
      }
    }), w$2(this, "persistPublicKey", async (s2) => {
      this.logger.debug("persisting public key to local storage", s2), await this.store.setItem(this.storeKey, s2), this.publicKey = s2;
    }), w$2(this, "removePublicKey", async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }), w$2(this, "isValidJwtAttestation", async (s2) => {
      const n3 = await this.getPublicKey();
      try {
        if (n3) return this.validateAttestation(s2, n3);
      } catch (a2) {
        this.logger.error(a2), this.logger.warn("error validating attestation");
      }
      const o3 = await this.fetchAndPersistPublicKey();
      try {
        if (o3) return this.validateAttestation(s2, o3);
      } catch (a2) {
        this.logger.error(a2), this.logger.warn("error validating attestation");
      }
    }), w$2(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), w$2(this, "fetchAndPersistPublicKey", async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (n3) => {
        const o3 = await this.fetchPublicKey();
        o3 && (await this.persistPublicKey(o3), n3(o3));
      });
      const s2 = await this.fetchPromise;
      return this.fetchPromise = void 0, s2;
    }), w$2(this, "validateAttestation", (s2, n3) => {
      const o3 = zc(s2, n3.publicKey), a2 = { hasExpired: cjs$3.toMiliseconds(o3.exp) < Date.now(), payload: o3 };
      if (a2.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a2.payload.origin, isScam: a2.payload.isScam, isVerified: a2.payload.isVerified };
    }), this.logger = E$5(t, this.name), this.abortController = new AbortController(), this.isDevEnv = Ii$1(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return y$3(this.logger);
  }
  startAbortTimer(e2) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), cjs$3.toMiliseconds(e2));
  }
}
var Bo = Object.defineProperty, Vo = (r2, e2, t) => e2 in r2 ? Bo(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, Fi = (r2, e2, t) => Vo(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class Mi extends O$3 {
  constructor(e2, t) {
    super(e2, t), this.projectId = e2, this.logger = t, Fi(this, "context", Xt$1), Fi(this, "registerDeviceToken", async (i3) => {
      const { clientId: s2, token: n3, notificationType: o3, enableEncrypted: a2 = false } = i3, c2 = `${Zt$1}/${this.projectId}/clients`;
      await fetch(c2, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: s2, type: o3, token: n3, always_raw: a2 }) });
    }), this.logger = E$5(t, this.context);
  }
}
var qo = Object.defineProperty, Ki = Object.getOwnPropertySymbols, Go = Object.prototype.hasOwnProperty, Wo = Object.prototype.propertyIsEnumerable, Ze$1 = (r2, e2, t) => e2 in r2 ? qo(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, be$1 = (r2, e2) => {
  for (var t in e2 || (e2 = {})) Go.call(e2, t) && Ze$1(r2, t, e2[t]);
  if (Ki) for (var t of Ki(e2)) Wo.call(e2, t) && Ze$1(r2, t, e2[t]);
  return r2;
}, E$4 = (r2, e2, t) => Ze$1(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
class Bi extends R$2 {
  constructor(e2, t, i3 = true) {
    super(e2, t, i3), this.core = e2, this.logger = t, E$4(this, "context", ei), E$4(this, "storagePrefix", B$2), E$4(this, "storageVersion", Qt$1), E$4(this, "events", /* @__PURE__ */ new Map()), E$4(this, "shouldPersist", false), E$4(this, "init", async () => {
      if (!Ii$1()) try {
        const s2 = { eventId: Bi$1(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: Mn$1(this.core.relayer.protocol, this.core.relayer.version, _e$2) } } };
        await this.sendEvent([s2]);
      } catch (s2) {
        this.logger.warn(s2);
      }
    }), E$4(this, "createEvent", (s2) => {
      const { event: n3 = "ERROR", type: o3 = "", properties: { topic: a2, trace: c2 } } = s2, h4 = Bi$1(), l2 = this.core.projectId || "", d4 = Date.now(), g2 = be$1({ eventId: h4, timestamp: d4, props: { event: n3, type: o3, properties: { topic: a2, trace: c2 } }, bundleId: l2, domain: this.getAppDomain() }, this.setMethods(h4));
      return this.telemetryEnabled && (this.events.set(h4, g2), this.shouldPersist = true), g2;
    }), E$4(this, "getEvent", (s2) => {
      const { eventId: n3, topic: o3 } = s2;
      if (n3) return this.events.get(n3);
      const a2 = Array.from(this.events.values()).find((c2) => c2.props.properties.topic === o3);
      if (a2) return be$1(be$1({}, a2), this.setMethods(a2.eventId));
    }), E$4(this, "deleteEvent", (s2) => {
      const { eventId: n3 } = s2;
      this.events.delete(n3), this.shouldPersist = true;
    }), E$4(this, "setEventListeners", () => {
      this.core.heartbeat.on(r$1.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((s2) => {
          cjs$3.fromMiliseconds(Date.now()) - cjs$3.fromMiliseconds(s2.timestamp) > ti && (this.events.delete(s2.eventId), this.shouldPersist = true);
        });
      });
    }), E$4(this, "setMethods", (s2) => ({ addTrace: (n3) => this.addTrace(s2, n3), setError: (n3) => this.setError(s2, n3) })), E$4(this, "addTrace", (s2, n3) => {
      const o3 = this.events.get(s2);
      o3 && (o3.props.properties.trace.push(n3), this.events.set(s2, o3), this.shouldPersist = true);
    }), E$4(this, "setError", (s2, n3) => {
      const o3 = this.events.get(s2);
      o3 && (o3.props.type = n3, o3.timestamp = Date.now(), this.events.set(s2, o3), this.shouldPersist = true);
    }), E$4(this, "persist", async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = false;
    }), E$4(this, "restore", async () => {
      try {
        const s2 = await this.core.storage.getItem(this.storageKey) || [];
        if (!s2.length) return;
        s2.forEach((n3) => {
          this.events.set(n3.eventId, be$1(be$1({}, n3), this.setMethods(n3.eventId)));
        });
      } catch (s2) {
        this.logger.warn(s2);
      }
    }), E$4(this, "submit", async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const s2 = [];
      for (const [n3, o3] of this.events) o3.props.type && s2.push(o3);
      if (s2.length !== 0) try {
        if ((await this.sendEvent(s2)).ok) for (const n3 of s2) this.events.delete(n3.eventId), this.shouldPersist = true;
      } catch (n3) {
        this.logger.warn(n3);
      }
    }), E$4(this, "sendEvent", async (s2) => {
      const n3 = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${ii}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${_e$2}${n3}`, { method: "POST", body: JSON.stringify(s2) });
    }), E$4(this, "getAppDomain", () => Pn$1().url), this.logger = E$5(t, this.context), this.telemetryEnabled = i3, i3 ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}
var Ho = Object.defineProperty, Vi = Object.getOwnPropertySymbols, Yo = Object.prototype.hasOwnProperty, Jo = Object.prototype.propertyIsEnumerable, Qe$1 = (r2, e2, t) => e2 in r2 ? Ho(r2, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e2] = t, qi = (r2, e2) => {
  for (var t in e2 || (e2 = {})) Yo.call(e2, t) && Qe$1(r2, t, e2[t]);
  if (Vi) for (var t of Vi(e2)) Jo.call(e2, t) && Qe$1(r2, t, e2[t]);
  return r2;
}, v$3 = (r2, e2, t) => Qe$1(r2, typeof e2 != "symbol" ? e2 + "" : e2, t);
let Te$1 = class Te extends h$2 {
  constructor(e2) {
    var t;
    super(e2), v$3(this, "protocol", ze$1), v$3(this, "version", Le$2), v$3(this, "name", he$1), v$3(this, "relayUrl"), v$3(this, "projectId"), v$3(this, "customStoragePrefix"), v$3(this, "events", new eventsExports.EventEmitter()), v$3(this, "logger"), v$3(this, "heartbeat"), v$3(this, "relayer"), v$3(this, "crypto"), v$3(this, "storage"), v$3(this, "history"), v$3(this, "expirer"), v$3(this, "pairing"), v$3(this, "verify"), v$3(this, "echoClient"), v$3(this, "linkModeSupportedApps"), v$3(this, "eventClient"), v$3(this, "initialized", false), v$3(this, "logChunkController"), v$3(this, "on", (a2, c2) => this.events.on(a2, c2)), v$3(this, "once", (a2, c2) => this.events.once(a2, c2)), v$3(this, "off", (a2, c2) => this.events.off(a2, c2)), v$3(this, "removeListener", (a2, c2) => this.events.removeListener(a2, c2)), v$3(this, "dispatchEnvelope", ({ topic: a2, message: c2, sessionExists: h4 }) => {
      if (!a2 || !c2) return;
      const l2 = { topic: a2, message: c2, publishedAt: Date.now(), transportType: Q$2.link_mode };
      this.relayer.onLinkMessageEvent(l2, { sessionExists: h4 });
    });
    const i3 = this.getGlobalCore(e2 == null ? void 0 : e2.customStoragePrefix);
    if (i3) try {
      return this.customStoragePrefix = i3.customStoragePrefix, this.logger = i3.logger, this.heartbeat = i3.heartbeat, this.crypto = i3.crypto, this.history = i3.history, this.expirer = i3.expirer, this.storage = i3.storage, this.relayer = i3.relayer, this.pairing = i3.pairing, this.verify = i3.verify, this.echoClient = i3.echoClient, this.linkModeSupportedApps = i3.linkModeSupportedApps, this.eventClient = i3.eventClient, this.initialized = i3.initialized, this.logChunkController = i3.logChunkController, i3;
    } catch (a2) {
      console.warn("Failed to copy global core", a2);
    }
    this.projectId = e2 == null ? void 0 : e2.projectId, this.relayUrl = (e2 == null ? void 0 : e2.relayUrl) || Ue$2, this.customStoragePrefix = e2 != null && e2.customStoragePrefix ? `:${e2.customStoragePrefix}` : "";
    const s2 = k$4({ level: typeof (e2 == null ? void 0 : e2.logger) == "string" && e2.logger ? e2.logger : Et$1.logger, name: he$1 }), { logger: n3, chunkLoggerController: o3 } = A$3({ opts: s2, maxSizeInBytes: e2 == null ? void 0 : e2.maxLogBlobSizeInBytes, loggerOverride: e2 == null ? void 0 : e2.logger });
    this.logChunkController = o3, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var a2, c2;
      (a2 = this.logChunkController) != null && a2.downloadLogsBlobInBrowser && ((c2 = this.logChunkController) == null || c2.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = E$5(n3, this.name), this.heartbeat = new i$2(), this.crypto = new vi(this, this.logger, e2 == null ? void 0 : e2.keychain), this.history = new ki(this, this.logger), this.expirer = new ji(this, this.logger), this.storage = e2 != null && e2.storage ? e2.storage : new h$3(qi(qi({}, It$1), e2 == null ? void 0 : e2.storageOptions)), this.relayer = new Si({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Li(this, this.logger), this.verify = new Ui(this, this.logger, this.storage), this.echoClient = new Mi(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new Bi(this, this.logger, e2 == null ? void 0 : e2.telemetryEnabled), this.setGlobalCore(this);
  }
  static async init(e2) {
    const t = new Te(e2);
    await t.initialize();
    const i3 = await t.crypto.getClientId();
    return await t.storage.setItem(jt$1, i3), t;
  }
  get context() {
    return y$3(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e2;
    return (e2 = this.logChunkController) == null ? void 0 : e2.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e2) {
    this.linkModeSupportedApps.includes(e2) || (this.linkModeSupportedApps.push(e2), await this.storage.setItem(Fe$1, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(Fe$1) || [], this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e2) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e2), this.logger.error(e2.message), e2;
    }
  }
  getGlobalCore(e2 = "") {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const t = `_walletConnectCore_${e2}`, i3 = `${t}_count`;
      return globalThis[i3] = (globalThis[i3] || 0) + 1, globalThis[i3] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[i3]} times.`), globalThis[t];
    } catch (t) {
      console.warn("Failed to get global WalletConnect core", t);
      return;
    }
  }
  setGlobalCore(e2) {
    var t;
    try {
      if (this.isGlobalCoreDisabled()) return;
      const i3 = `_walletConnectCore_${((t = e2.opts) == null ? void 0 : t.customStoragePrefix) || ""}`;
      globalThis[i3] = e2;
    } catch (i3) {
      console.warn("Failed to set global WalletConnect core", i3);
    }
  }
  isGlobalCoreDisabled() {
    try {
      return typeof process < "u" && define_process_env_default.DISABLE_GLOBAL_CORE === "true";
    } catch {
      return true;
    }
  }
};
const Xo = Te$1;
const De$1 = "wc", Le$1 = 2, ke$1 = "client", we$1 = `${De$1}@${Le$1}:${ke$1}:`, me$1 = { name: ke$1, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.org" }, Me$1 = "WALLETCONNECT_DEEPLINK_CHOICE", pt$1 = "proposal", $e$1 = "Proposal expired", ht$1 = "session", J$1 = cjs$3.SEVEN_DAYS, dt$1 = "engine", N$1 = { wc_sessionPropose: { req: { ttl: cjs$3.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1101 }, reject: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1120 }, autoReject: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1121 } }, wc_sessionSettle: { req: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: cjs$3.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: cjs$3.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1114 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: cjs$3.ONE_HOUR, prompt: true, tag: 1116 }, res: { ttl: cjs$3.ONE_HOUR, prompt: false, tag: 1117 }, reject: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1118 }, autoReject: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1119 } } }, _e$1 = { min: cjs$3.FIVE_MINUTES, max: cjs$3.SEVEN_DAYS }, $$2 = { idle: "IDLE", active: "ACTIVE" }, Ke$1 = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" } }, ut$1 = "request", gt$1 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], yt$1 = "wc", wt$1 = "auth", mt$1 = "authKeys", _t$1 = "pairingTopics", Et = "requests", ae$1 = `${yt$1}@${1.5}:${wt$1}:`, ce$1 = `${ae$1}:PUB_KEY`;
var vs = Object.defineProperty, Is = Object.defineProperties, Ts = Object.getOwnPropertyDescriptors, ft$1 = Object.getOwnPropertySymbols, qs2 = Object.prototype.hasOwnProperty, Ps = Object.prototype.propertyIsEnumerable, Ue$1 = (S3, n3, e2) => n3 in S3 ? vs(S3, n3, { enumerable: true, configurable: true, writable: true, value: e2 }) : S3[n3] = e2, v$2 = (S3, n3) => {
  for (var e2 in n3 || (n3 = {})) qs2.call(n3, e2) && Ue$1(S3, e2, n3[e2]);
  if (ft$1) for (var e2 of ft$1(n3)) Ps.call(n3, e2) && Ue$1(S3, e2, n3[e2]);
  return S3;
}, b$2 = (S3, n3) => Is(S3, Ts(n3)), c$1 = (S3, n3, e2) => Ue$1(S3, typeof n3 != "symbol" ? n3 + "" : n3, e2);
class Ns extends V$3 {
  constructor(n3) {
    super(n3), c$1(this, "name", dt$1), c$1(this, "events", new Nt$3()), c$1(this, "initialized", false), c$1(this, "requestQueue", { state: $$2.idle, queue: [] }), c$1(this, "sessionRequestQueue", { state: $$2.idle, queue: [] }), c$1(this, "requestQueueDelay", cjs$3.ONE_SECOND), c$1(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), c$1(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), c$1(this, "recentlyDeletedLimit", 200), c$1(this, "relayMessageCache", []), c$1(this, "pendingSessions", /* @__PURE__ */ new Map()), c$1(this, "init", async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(N$1) }), this.initialized = true, setTimeout(async () => {
        await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, cjs$3.toMiliseconds(this.requestQueueDelay)));
    }), c$1(this, "connect", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const t = b$2(v$2({}, e2), { requiredNamespaces: e2.requiredNamespaces || {}, optionalNamespaces: e2.optionalNamespaces || {} });
      await this.isValidConnect(t), t.optionalNamespaces = aa(t.requiredNamespaces, t.optionalNamespaces), t.requiredNamespaces = {};
      const { pairingTopic: s2, requiredNamespaces: i3, optionalNamespaces: r2, sessionProperties: o3, scopedProperties: a2, relays: l2 } = t;
      let p2 = s2, h4, u2 = false;
      try {
        if (p2) {
          const T2 = this.client.core.pairing.pairings.get(p2);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), u2 = T2.active;
        }
      } catch (T2) {
        throw this.client.logger.error(`connect() -> pairing.get(${p2}) failed`), T2;
      }
      if (!p2 || !u2) {
        const { topic: T2, uri: K3 } = await this.client.core.pairing.create();
        p2 = T2, h4 = K3;
      }
      if (!p2) {
        const { message: T2 } = ht$2("NO_MATCHING_KEY", `connect() pairing topic: ${p2}`);
        throw new Error(T2);
      }
      const d4 = await this.client.core.crypto.generateKeyPair(), w2 = N$1.wc_sessionPropose.req.ttl || cjs$3.FIVE_MINUTES, m3 = Ei$1(w2), f5 = b$2(v$2(v$2({ requiredNamespaces: i3, optionalNamespaces: r2, relays: l2 ?? [{ protocol: xt$1 }], proposer: { publicKey: d4, metadata: this.client.metadata }, expiryTimestamp: m3, pairingTopic: p2 }, o3 && { sessionProperties: o3 }), a2 && { scopedProperties: a2 }), { id: payloadId() }), _3 = xi$1("session_connect", f5.id), { reject: g2, resolve: A2, done: D2 } = gi$1(w2, $e$1), I3 = ({ id: T2 }) => {
        T2 === f5.id && (this.client.events.off("proposal_expire", I3), this.pendingSessions.delete(f5.id), this.events.emit(_3, { error: { message: $e$1, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", I3), this.events.once(_3, ({ error: T2, session: K3 }) => {
        this.client.events.off("proposal_expire", I3), T2 ? g2(T2) : K3 && A2(K3);
      }), await this.sendRequest({ topic: p2, method: "wc_sessionPropose", params: f5, throwOnFailedPublish: true, clientRpcId: f5.id }), await this.setProposal(f5.id, f5), { uri: h4, approval: D2 };
    }), c$1(this, "pair", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(e2);
      } catch (t) {
        throw this.client.logger.error("pair() failed"), t;
      }
    }), c$1(this, "approve", async (e2) => {
      var t, s2, i3;
      const r2 = this.client.core.eventClient.createEvent({ properties: { topic: (t = e2 == null ? void 0 : e2.id) == null ? void 0 : t.toString(), trace: [er.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (q2) {
        throw r2.setError(tr.no_internet_connection), q2;
      }
      try {
        await this.isValidProposalId(e2 == null ? void 0 : e2.id);
      } catch (q2) {
        throw this.client.logger.error(`approve() -> proposal.get(${e2 == null ? void 0 : e2.id}) failed`), r2.setError(tr.proposal_not_found), q2;
      }
      try {
        await this.isValidApprove(e2);
      } catch (q2) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), r2.setError(tr.session_approve_namespace_validation_failure), q2;
      }
      const { id: o3, relayProtocol: a2, namespaces: l2, sessionProperties: p2, scopedProperties: h4, sessionConfig: u2 } = e2, d4 = this.client.proposal.get(o3);
      this.client.core.eventClient.deleteEvent({ eventId: r2.eventId });
      const { pairingTopic: w2, proposer: m3, requiredNamespaces: f5, optionalNamespaces: _3 } = d4;
      let g2 = (s2 = this.client.core.eventClient) == null ? void 0 : s2.getEvent({ topic: w2 });
      g2 || (g2 = (i3 = this.client.core.eventClient) == null ? void 0 : i3.createEvent({ type: er.session_approve_started, properties: { topic: w2, trace: [er.session_approve_started, er.session_namespaces_validation_success] } }));
      const A2 = await this.client.core.crypto.generateKeyPair(), D2 = m3.publicKey, I3 = await this.client.core.crypto.generateSharedKey(A2, D2), T2 = v$2(v$2(v$2({ relay: { protocol: a2 ?? "irn" }, namespaces: l2, controller: { publicKey: A2, metadata: this.client.metadata }, expiry: Ei$1(J$1) }, p2 && { sessionProperties: p2 }), h4 && { scopedProperties: h4 }), u2 && { sessionConfig: u2 }), K3 = Q$2.relay;
      g2.addTrace(er.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(I3, { transportType: K3 });
      } catch (q2) {
        throw g2.setError(tr.subscribe_session_topic_failure), q2;
      }
      g2.addTrace(er.subscribe_session_topic_success);
      const fe2 = b$2(v$2({}, T2), { topic: I3, requiredNamespaces: f5, optionalNamespaces: _3, pairingTopic: w2, acknowledged: false, self: T2.controller, peer: { publicKey: m3.publicKey, metadata: m3.metadata }, controller: A2, transportType: Q$2.relay });
      await this.client.session.set(I3, fe2), g2.addTrace(er.store_session);
      try {
        g2.addTrace(er.publishing_session_settle), await this.sendRequest({ topic: I3, method: "wc_sessionSettle", params: T2, throwOnFailedPublish: true }).catch((q2) => {
          throw g2 == null ? void 0 : g2.setError(tr.session_settle_publish_failure), q2;
        }), g2.addTrace(er.session_settle_publish_success), g2.addTrace(er.publishing_session_approve), await this.sendResult({ id: o3, topic: w2, result: { relay: { protocol: a2 ?? "irn" }, responderPublicKey: A2 }, throwOnFailedPublish: true }).catch((q2) => {
          throw g2 == null ? void 0 : g2.setError(tr.session_approve_publish_failure), q2;
        }), g2.addTrace(er.session_approve_publish_success);
      } catch (q2) {
        throw this.client.logger.error(q2), this.client.session.delete(I3, Nt$1("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(I3), q2;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: g2.eventId }), await this.client.core.pairing.updateMetadata({ topic: w2, metadata: m3.metadata }), await this.client.proposal.delete(o3, Nt$1("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: w2 }), await this.setExpiry(I3, Ei$1(J$1)), { topic: I3, acknowledged: () => Promise.resolve(this.client.session.get(I3)) };
    }), c$1(this, "reject", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(e2);
      } catch (r2) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), r2;
      }
      const { id: t, reason: s2 } = e2;
      let i3;
      try {
        i3 = this.client.proposal.get(t).pairingTopic;
      } catch (r2) {
        throw this.client.logger.error(`reject() -> proposal.get(${t}) failed`), r2;
      }
      i3 && (await this.sendError({ id: t, topic: i3, error: s2, rpcOpts: N$1.wc_sessionPropose.reject }), await this.client.proposal.delete(t, Nt$1("USER_DISCONNECTED")));
    }), c$1(this, "update", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(e2);
      } catch (h4) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), h4;
      }
      const { topic: t, namespaces: s2 } = e2, { done: i3, resolve: r2, reject: o3 } = gi$1(), a2 = payloadId(), l2 = getBigIntRpcId().toString(), p2 = this.client.session.get(t).namespaces;
      return this.events.once(xi$1("session_update", a2), ({ error: h4 }) => {
        h4 ? o3(h4) : r2();
      }), await this.client.session.update(t, { namespaces: s2 }), await this.sendRequest({ topic: t, method: "wc_sessionUpdate", params: { namespaces: s2 }, throwOnFailedPublish: true, clientRpcId: a2, relayRpcId: l2 }).catch((h4) => {
        this.client.logger.error(h4), this.client.session.update(t, { namespaces: p2 }), o3(h4);
      }), { acknowledged: i3 };
    }), c$1(this, "extend", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(e2);
      } catch (a2) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), a2;
      }
      const { topic: t } = e2, s2 = payloadId(), { done: i3, resolve: r2, reject: o3 } = gi$1();
      return this.events.once(xi$1("session_extend", s2), ({ error: a2 }) => {
        a2 ? o3(a2) : r2();
      }), await this.setExpiry(t, Ei$1(J$1)), this.sendRequest({ topic: t, method: "wc_sessionExtend", params: {}, clientRpcId: s2, throwOnFailedPublish: true }).catch((a2) => {
        o3(a2);
      }), { acknowledged: i3 };
    }), c$1(this, "request", async (e2) => {
      this.isInitialized();
      try {
        await this.isValidRequest(e2);
      } catch (_3) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), _3;
      }
      const { chainId: t, request: s2, topic: i3, expiry: r2 = N$1.wc_sessionRequest.req.ttl } = e2, o3 = this.client.session.get(i3);
      (o3 == null ? void 0 : o3.transportType) === Q$2.relay && await this.confirmOnlineStateOrThrow();
      const a2 = payloadId(), l2 = getBigIntRpcId().toString(), { done: p2, resolve: h4, reject: u2 } = gi$1(r2, "Request expired. Please try again.");
      this.events.once(xi$1("session_request", a2), ({ error: _3, result: g2 }) => {
        _3 ? u2(_3) : h4(g2);
      });
      const d4 = "wc_sessionRequest", w2 = this.getAppLinkIfEnabled(o3.peer.metadata, o3.transportType);
      if (w2) return await this.sendRequest({ clientRpcId: a2, relayRpcId: l2, topic: i3, method: d4, params: { request: b$2(v$2({}, s2), { expiryTimestamp: Ei$1(r2) }), chainId: t }, expiry: r2, throwOnFailedPublish: true, appLink: w2 }).catch((_3) => u2(_3)), this.client.events.emit("session_request_sent", { topic: i3, request: s2, chainId: t, id: a2 }), await p2();
      const m3 = { request: b$2(v$2({}, s2), { expiryTimestamp: Ei$1(r2) }), chainId: t }, f5 = this.shouldSetTVF(d4, m3);
      return await Promise.all([new Promise(async (_3) => {
        await this.sendRequest(v$2({ clientRpcId: a2, relayRpcId: l2, topic: i3, method: d4, params: m3, expiry: r2, throwOnFailedPublish: true }, f5 && { tvf: this.getTVFParams(a2, m3) })).catch((g2) => u2(g2)), this.client.events.emit("session_request_sent", { topic: i3, request: s2, chainId: t, id: a2 }), _3();
      }), new Promise(async (_3) => {
        var g2;
        if (!((g2 = o3.sessionConfig) != null && g2.disableDeepLink)) {
          const A2 = await Oi$1(this.client.core.storage, Me$1);
          await Si$1({ id: a2, topic: i3, wcDeepLink: A2 });
        }
        _3();
      }), p2()]).then((_3) => _3[2]);
    }), c$1(this, "respond", async (e2) => {
      this.isInitialized(), await this.isValidRespond(e2);
      const { topic: t, response: s2 } = e2, { id: i3 } = s2, r2 = this.client.session.get(t);
      r2.transportType === Q$2.relay && await this.confirmOnlineStateOrThrow();
      const o3 = this.getAppLinkIfEnabled(r2.peer.metadata, r2.transportType);
      isJsonRpcResult(s2) ? await this.sendResult({ id: i3, topic: t, result: s2.result, throwOnFailedPublish: true, appLink: o3 }) : isJsonRpcError(s2) && await this.sendError({ id: i3, topic: t, error: s2.error, appLink: o3 }), this.cleanupAfterResponse(e2);
    }), c$1(this, "ping", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(e2);
      } catch (s2) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), s2;
      }
      const { topic: t } = e2;
      if (this.client.session.keys.includes(t)) {
        const s2 = payloadId(), i3 = getBigIntRpcId().toString(), { done: r2, resolve: o3, reject: a2 } = gi$1();
        this.events.once(xi$1("session_ping", s2), ({ error: l2 }) => {
          l2 ? a2(l2) : o3();
        }), await Promise.all([this.sendRequest({ topic: t, method: "wc_sessionPing", params: {}, throwOnFailedPublish: true, clientRpcId: s2, relayRpcId: i3 }), r2()]);
      } else this.client.core.pairing.pairings.keys.includes(t) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: t }));
    }), c$1(this, "emit", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(e2);
      const { topic: t, event: s2, chainId: i3 } = e2, r2 = getBigIntRpcId().toString(), o3 = payloadId();
      await this.sendRequest({ topic: t, method: "wc_sessionEvent", params: { event: s2, chainId: i3 }, throwOnFailedPublish: true, relayRpcId: r2, clientRpcId: o3 });
    }), c$1(this, "disconnect", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(e2);
      const { topic: t } = e2;
      if (this.client.session.keys.includes(t)) await this.sendRequest({ topic: t, method: "wc_sessionDelete", params: Nt$1("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession({ topic: t, emitEvent: false });
      else if (this.client.core.pairing.pairings.keys.includes(t)) await this.client.core.pairing.disconnect({ topic: t });
      else {
        const { message: s2 } = ht$2("MISMATCHED_TOPIC", `Session or pairing topic not found: ${t}`);
        throw new Error(s2);
      }
    }), c$1(this, "find", (e2) => (this.isInitialized(), this.client.session.getAll().filter((t) => ua(t, e2)))), c$1(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), c$1(this, "authenticate", async (e2, t) => {
      var s2;
      this.isInitialized(), this.isValidAuthenticate(e2);
      const i3 = t && this.client.core.linkModeSupportedApps.includes(t) && ((s2 = this.client.metadata.redirect) == null ? void 0 : s2.linkMode), r2 = i3 ? Q$2.link_mode : Q$2.relay;
      r2 === Q$2.relay && await this.confirmOnlineStateOrThrow();
      const { chains: o3, statement: a2 = "", uri: l2, domain: p2, nonce: h4, type: u2, exp: d4, nbf: w2, methods: m3 = [], expiry: f5 } = e2, _3 = [...e2.resources || []], { topic: g2, uri: A2 } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: r2 });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: g2, uri: A2 } });
      const D2 = await this.client.core.crypto.generateKeyPair(), I3 = Pc(D2);
      if (await Promise.all([this.client.auth.authKeys.set(ce$1, { responseTopic: I3, publicKey: D2 }), this.client.auth.pairingTopics.set(I3, { topic: I3, pairingTopic: g2 })]), await this.client.core.relayer.subscribe(I3, { transportType: r2 }), this.client.logger.info(`sending request to new pairing topic: ${g2}`), m3.length > 0) {
        const { namespace: x2 } = Ne$1(o3[0]);
        let L3 = fs(x2, "request", m3);
        pe$2(_3) && (L3 = ls(L3, _3.pop())), _3.push(L3);
      }
      const T2 = f5 && f5 > N$1.wc_sessionAuthenticate.req.ttl ? f5 : N$1.wc_sessionAuthenticate.req.ttl, K3 = { authPayload: { type: u2 ?? "caip122", chains: o3, statement: a2, aud: l2, domain: p2, version: "1", nonce: h4, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: d4, nbf: w2, resources: _3 }, requester: { publicKey: D2, metadata: this.client.metadata }, expiryTimestamp: Ei$1(T2) }, fe2 = { eip155: { chains: o3, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m3])], events: ["chainChanged", "accountsChanged"] } }, q2 = { requiredNamespaces: {}, optionalNamespaces: fe2, relays: [{ protocol: "irn" }], pairingTopic: g2, proposer: { publicKey: D2, metadata: this.client.metadata }, expiryTimestamp: Ei$1(N$1.wc_sessionPropose.req.ttl), id: payloadId() }, { done: Rt2, resolve: je2, reject: Se2 } = gi$1(T2, "Request expired"), te2 = payloadId(), le2 = xi$1("session_connect", q2.id), Re2 = xi$1("session_request", te2), pe2 = async ({ error: x2, session: L3 }) => {
        this.events.off(Re2, ve2), x2 ? Se2(x2) : L3 && je2({ session: L3 });
      }, ve2 = async (x2) => {
        var L3, Fe2, Qe2;
        if (await this.deletePendingAuthRequest(te2, { message: "fulfilled", code: 0 }), x2.error) {
          const ie2 = Nt$1("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return x2.error.code === ie2.code ? void 0 : (this.events.off(le2, pe2), Se2(x2.error.message));
        }
        await this.deleteProposal(q2.id), this.events.off(le2, pe2);
        const { cacaos: He2, responder: Q2 } = x2.result, Te3 = [], ze2 = [];
        for (const ie2 of He2) {
          await is({ cacao: ie2, projectId: this.client.core.projectId }) || (this.client.logger.error(ie2, "Signature verification failed"), Se2(Nt$1("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: qe2 } = ie2, Pe2 = pe$2(qe2.resources), Ye2 = [dr$1(qe2.iss)], vt2 = De$2(qe2.iss);
          if (Pe2) {
            const Ne2 = ds(Pe2), It2 = hs(Pe2);
            Te3.push(...Ne2), Ye2.push(...It2);
          }
          for (const Ne2 of Ye2) ze2.push(`${Ne2}:${vt2}`);
        }
        const se2 = await this.client.core.crypto.generateSharedKey(D2, Q2.publicKey);
        let he2;
        Te3.length > 0 && (he2 = { topic: se2, acknowledged: true, self: { publicKey: D2, metadata: this.client.metadata }, peer: Q2, controller: Q2.publicKey, expiry: Ei$1(J$1), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: g2, namespaces: ca([...new Set(Te3)], [...new Set(ze2)]), transportType: r2 }, await this.client.core.relayer.subscribe(se2, { transportType: r2 }), await this.client.session.set(se2, he2), g2 && await this.client.core.pairing.updateMetadata({ topic: g2, metadata: Q2.metadata }), he2 = this.client.session.get(se2)), (L3 = this.client.metadata.redirect) != null && L3.linkMode && (Fe2 = Q2.metadata.redirect) != null && Fe2.linkMode && (Qe2 = Q2.metadata.redirect) != null && Qe2.universal && t && (this.client.core.addLinkModeSupportedApp(Q2.metadata.redirect.universal), this.client.session.update(se2, { transportType: Q$2.link_mode })), je2({ auths: He2, session: he2 });
      };
      this.events.once(le2, pe2), this.events.once(Re2, ve2);
      let Ie2;
      try {
        if (i3) {
          const x2 = formatJsonRpcRequest("wc_sessionAuthenticate", K3, te2);
          this.client.core.history.set(g2, x2);
          const L3 = await this.client.core.crypto.encode("", x2, { type: re$2, encoding: xe$1 });
          Ie2 = Xc(t, g2, L3);
        } else await Promise.all([this.sendRequest({ topic: g2, method: "wc_sessionAuthenticate", params: K3, expiry: e2.expiry, throwOnFailedPublish: true, clientRpcId: te2 }), this.sendRequest({ topic: g2, method: "wc_sessionPropose", params: q2, expiry: N$1.wc_sessionPropose.req.ttl, throwOnFailedPublish: true, clientRpcId: q2.id })]);
      } catch (x2) {
        throw this.events.off(le2, pe2), this.events.off(Re2, ve2), x2;
      }
      return await this.setProposal(q2.id, q2), await this.setAuthRequest(te2, { request: b$2(v$2({}, K3), { verifyContext: {} }), pairingTopic: g2, transportType: r2 }), { uri: Ie2 ?? A2, response: Rt2 };
    }), c$1(this, "approveSessionAuthenticate", async (e2) => {
      const { id: t, auths: s2 } = e2, i3 = this.client.core.eventClient.createEvent({ properties: { topic: t.toString(), trace: [ir.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (f5) {
        throw i3.setError(sr.no_internet_connection), f5;
      }
      const r2 = this.getPendingAuthRequest(t);
      if (!r2) throw i3.setError(sr.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${t}`);
      const o3 = r2.transportType || Q$2.relay;
      o3 === Q$2.relay && await this.confirmOnlineStateOrThrow();
      const a2 = r2.requester.publicKey, l2 = await this.client.core.crypto.generateKeyPair(), p2 = Pc(a2), h4 = { type: Ft$2, receiverPublicKey: a2, senderPublicKey: l2 }, u2 = [], d4 = [];
      for (const f5 of s2) {
        if (!await is({ cacao: f5, projectId: this.client.core.projectId })) {
          i3.setError(sr.invalid_cacao);
          const I3 = Nt$1("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: t, topic: p2, error: I3, encodeOpts: h4 }), new Error(I3.message);
        }
        i3.addTrace(ir.cacaos_verified);
        const { p: _3 } = f5, g2 = pe$2(_3.resources), A2 = [dr$1(_3.iss)], D2 = De$2(_3.iss);
        if (g2) {
          const I3 = ds(g2), T2 = hs(g2);
          u2.push(...I3), A2.push(...T2);
        }
        for (const I3 of A2) d4.push(`${I3}:${D2}`);
      }
      const w2 = await this.client.core.crypto.generateSharedKey(l2, a2);
      i3.addTrace(ir.create_authenticated_session_topic);
      let m3;
      if ((u2 == null ? void 0 : u2.length) > 0) {
        m3 = { topic: w2, acknowledged: true, self: { publicKey: l2, metadata: this.client.metadata }, peer: { publicKey: a2, metadata: r2.requester.metadata }, controller: a2, expiry: Ei$1(J$1), authentication: s2, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: r2.pairingTopic, namespaces: ca([...new Set(u2)], [...new Set(d4)]), transportType: o3 }, i3.addTrace(ir.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(w2, { transportType: o3 });
        } catch (f5) {
          throw i3.setError(sr.subscribe_authenticated_session_topic_failure), f5;
        }
        i3.addTrace(ir.subscribe_authenticated_session_topic_success), await this.client.session.set(w2, m3), i3.addTrace(ir.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: r2.pairingTopic, metadata: r2.requester.metadata });
      }
      i3.addTrace(ir.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: p2, id: t, result: { cacaos: s2, responder: { publicKey: l2, metadata: this.client.metadata } }, encodeOpts: h4, throwOnFailedPublish: true, appLink: this.getAppLinkIfEnabled(r2.requester.metadata, o3) });
      } catch (f5) {
        throw i3.setError(sr.authenticated_session_approve_publish_failure), f5;
      }
      return await this.client.auth.requests.delete(t, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: r2.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i3.eventId }), { session: m3 };
    }), c$1(this, "rejectSessionAuthenticate", async (e2) => {
      this.isInitialized();
      const { id: t, reason: s2 } = e2, i3 = this.getPendingAuthRequest(t);
      if (!i3) throw new Error(`Could not find pending auth request with id ${t}`);
      i3.transportType === Q$2.relay && await this.confirmOnlineStateOrThrow();
      const r2 = i3.requester.publicKey, o3 = await this.client.core.crypto.generateKeyPair(), a2 = Pc(r2), l2 = { type: Ft$2, receiverPublicKey: r2, senderPublicKey: o3 };
      await this.sendError({ id: t, topic: a2, error: s2, encodeOpts: l2, rpcOpts: N$1.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i3.requester.metadata, i3.transportType) }), await this.client.auth.requests.delete(t, { message: "rejected", code: 0 }), await this.client.proposal.delete(t, Nt$1("USER_DISCONNECTED"));
    }), c$1(this, "formatAuthMessage", (e2) => {
      this.isInitialized();
      const { request: t, iss: s2 } = e2;
      return hr$1(t, s2);
    }), c$1(this, "processRelayMessageCache", () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const e2 = this.relayMessageCache.shift();
          e2 && await this.onRelayMessage(e2);
        } catch (e2) {
          this.client.logger.error(e2);
        }
      }, 50);
    }), c$1(this, "cleanupDuplicatePairings", async (e2) => {
      if (e2.pairingTopic) try {
        const t = this.client.core.pairing.pairings.get(e2.pairingTopic), s2 = this.client.core.pairing.pairings.getAll().filter((i3) => {
          var r2, o3;
          return ((r2 = i3.peerMetadata) == null ? void 0 : r2.url) && ((o3 = i3.peerMetadata) == null ? void 0 : o3.url) === e2.peer.metadata.url && i3.topic && i3.topic !== t.topic;
        });
        if (s2.length === 0) return;
        this.client.logger.info(`Cleaning up ${s2.length} duplicate pairing(s)`), await Promise.all(s2.map((i3) => this.client.core.pairing.disconnect({ topic: i3.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (t) {
        this.client.logger.error(t);
      }
    }), c$1(this, "deleteSession", async (e2) => {
      var t;
      const { topic: s2, expirerHasDeleted: i3 = false, emitEvent: r2 = true, id: o3 = 0 } = e2, { self: a2 } = this.client.session.get(s2);
      await this.client.core.relayer.unsubscribe(s2), await this.client.session.delete(s2, Nt$1("USER_DISCONNECTED")), this.addToRecentlyDeleted(s2, "session"), this.client.core.crypto.keychain.has(a2.publicKey) && await this.client.core.crypto.deleteKeyPair(a2.publicKey), this.client.core.crypto.keychain.has(s2) && await this.client.core.crypto.deleteSymKey(s2), i3 || this.client.core.expirer.del(s2), this.client.core.storage.removeItem(Me$1).catch((l2) => this.client.logger.warn(l2)), this.getPendingSessionRequests().forEach((l2) => {
        l2.topic === s2 && this.deletePendingSessionRequest(l2.id, Nt$1("USER_DISCONNECTED"));
      }), s2 === ((t = this.sessionRequestQueue.queue[0]) == null ? void 0 : t.topic) && (this.sessionRequestQueue.state = $$2.idle), r2 && this.client.events.emit("session_delete", { id: o3, topic: s2 });
    }), c$1(this, "deleteProposal", async (e2, t) => {
      if (t) try {
        const s2 = this.client.proposal.get(e2), i3 = this.client.core.eventClient.getEvent({ topic: s2.pairingTopic });
        i3 == null ? void 0 : i3.setError(tr.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(e2, Nt$1("USER_DISCONNECTED")), t ? Promise.resolve() : this.client.core.expirer.del(e2)]), this.addToRecentlyDeleted(e2, "proposal");
    }), c$1(this, "deletePendingSessionRequest", async (e2, t, s2 = false) => {
      await Promise.all([this.client.pendingRequest.delete(e2, t), s2 ? Promise.resolve() : this.client.core.expirer.del(e2)]), this.addToRecentlyDeleted(e2, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i3) => i3.id !== e2), s2 && (this.sessionRequestQueue.state = $$2.idle, this.client.events.emit("session_request_expire", { id: e2 }));
    }), c$1(this, "deletePendingAuthRequest", async (e2, t, s2 = false) => {
      await Promise.all([this.client.auth.requests.delete(e2, t), s2 ? Promise.resolve() : this.client.core.expirer.del(e2)]);
    }), c$1(this, "setExpiry", async (e2, t) => {
      this.client.session.keys.includes(e2) && (this.client.core.expirer.set(e2, t), await this.client.session.update(e2, { expiry: t }));
    }), c$1(this, "setProposal", async (e2, t) => {
      this.client.core.expirer.set(e2, Ei$1(N$1.wc_sessionPropose.req.ttl)), await this.client.proposal.set(e2, t);
    }), c$1(this, "setAuthRequest", async (e2, t) => {
      const { request: s2, pairingTopic: i3, transportType: r2 = Q$2.relay } = t;
      this.client.core.expirer.set(e2, s2.expiryTimestamp), await this.client.auth.requests.set(e2, { authPayload: s2.authPayload, requester: s2.requester, expiryTimestamp: s2.expiryTimestamp, id: e2, pairingTopic: i3, verifyContext: s2.verifyContext, transportType: r2 });
    }), c$1(this, "setPendingSessionRequest", async (e2) => {
      const { id: t, topic: s2, params: i3, verifyContext: r2 } = e2, o3 = i3.request.expiryTimestamp || Ei$1(N$1.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(t, o3), await this.client.pendingRequest.set(t, { id: t, topic: s2, params: i3, verifyContext: r2 });
    }), c$1(this, "sendRequest", async (e2) => {
      const { topic: t, method: s2, params: i3, expiry: r2, relayRpcId: o3, clientRpcId: a2, throwOnFailedPublish: l2, appLink: p2, tvf: h4 } = e2, u2 = formatJsonRpcRequest(s2, i3, a2);
      let d4;
      const w2 = !!p2;
      try {
        const _3 = w2 ? xe$1 : qt$2;
        d4 = await this.client.core.crypto.encode(t, u2, { encoding: _3 });
      } catch (_3) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${t} failed`), _3;
      }
      let m3;
      if (gt$1.includes(s2)) {
        const _3 = kc(JSON.stringify(u2)), g2 = kc(d4);
        m3 = await this.client.core.verify.register({ id: g2, decryptedId: _3 });
      }
      const f5 = N$1[s2].req;
      if (f5.attestation = m3, r2 && (f5.ttl = r2), o3 && (f5.id = o3), this.client.core.history.set(t, u2), w2) {
        const _3 = Xc(p2, t, d4);
        await global.Linking.openURL(_3, this.client.name);
      } else {
        const _3 = N$1[s2].req;
        r2 && (_3.ttl = r2), o3 && (_3.id = o3), _3.tvf = b$2(v$2({}, h4), { correlationId: u2.id }), l2 ? (_3.internal = b$2(v$2({}, _3.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t, d4, _3)) : this.client.core.relayer.publish(t, d4, _3).catch((g2) => this.client.logger.error(g2));
      }
      return u2.id;
    }), c$1(this, "sendResult", async (e2) => {
      const { id: t, topic: s2, result: i3, throwOnFailedPublish: r2, encodeOpts: o3, appLink: a2 } = e2, l2 = formatJsonRpcResult(t, i3);
      let p2;
      const h4 = a2 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const w2 = h4 ? xe$1 : qt$2;
        p2 = await this.client.core.crypto.encode(s2, l2, b$2(v$2({}, o3 || {}), { encoding: w2 }));
      } catch (w2) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s2} failed`), w2;
      }
      let u2, d4;
      try {
        u2 = await this.client.core.history.get(s2, t);
        const w2 = u2.request;
        try {
          this.shouldSetTVF(w2.method, w2.params) && (d4 = this.getTVFParams(t, w2.params, i3));
        } catch (m3) {
          this.client.logger.warn("sendResult() -> getTVFParams() failed", m3);
        }
      } catch (w2) {
        throw this.client.logger.error(`sendResult() -> history.get(${s2}, ${t}) failed`), w2;
      }
      if (h4) {
        const w2 = Xc(a2, s2, p2);
        await global.Linking.openURL(w2, this.client.name);
      } else {
        const w2 = u2.request.method, m3 = N$1[w2].res;
        m3.tvf = b$2(v$2({}, d4), { correlationId: t }), r2 ? (m3.internal = b$2(v$2({}, m3.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s2, p2, m3)) : this.client.core.relayer.publish(s2, p2, m3).catch((f5) => this.client.logger.error(f5));
      }
      await this.client.core.history.resolve(l2);
    }), c$1(this, "sendError", async (e2) => {
      const { id: t, topic: s2, error: i3, encodeOpts: r2, rpcOpts: o3, appLink: a2 } = e2, l2 = formatJsonRpcError(t, i3);
      let p2;
      const h4 = a2 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const d4 = h4 ? xe$1 : qt$2;
        p2 = await this.client.core.crypto.encode(s2, l2, b$2(v$2({}, r2 || {}), { encoding: d4 }));
      } catch (d4) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s2} failed`), d4;
      }
      let u2;
      try {
        u2 = await this.client.core.history.get(s2, t);
      } catch (d4) {
        throw this.client.logger.error(`sendError() -> history.get(${s2}, ${t}) failed`), d4;
      }
      if (h4) {
        const d4 = Xc(a2, s2, p2);
        await global.Linking.openURL(d4, this.client.name);
      } else {
        const d4 = u2.request.method, w2 = o3 || N$1[d4].res;
        this.client.core.relayer.publish(s2, p2, w2);
      }
      await this.client.core.history.resolve(l2);
    }), c$1(this, "cleanup", async () => {
      const e2 = [], t = [];
      this.client.session.getAll().forEach((s2) => {
        let i3 = false;
        vi$1(s2.expiry) && (i3 = true), this.client.core.crypto.keychain.has(s2.topic) || (i3 = true), i3 && e2.push(s2.topic);
      }), this.client.proposal.getAll().forEach((s2) => {
        vi$1(s2.expiryTimestamp) && t.push(s2.id);
      }), await Promise.all([...e2.map((s2) => this.deleteSession({ topic: s2 })), ...t.map((s2) => this.deleteProposal(s2))]);
    }), c$1(this, "onProviderMessageEvent", async (e2) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(e2) : await this.onRelayMessage(e2);
    }), c$1(this, "onRelayEventRequest", async (e2) => {
      this.requestQueue.queue.push(e2), await this.processRequestsQueue();
    }), c$1(this, "processRequestsQueue", async () => {
      if (this.requestQueue.state === $$2.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = $$2.active;
        const e2 = this.requestQueue.queue.shift();
        if (e2) try {
          await this.processRequest(e2);
        } catch (t) {
          this.client.logger.warn(t);
        }
      }
      this.requestQueue.state = $$2.idle;
    }), c$1(this, "processRequest", async (e2) => {
      const { topic: t, payload: s2, attestation: i3, transportType: r2, encryptedId: o3 } = e2, a2 = s2.method;
      if (!this.shouldIgnorePairingRequest({ topic: t, requestMethod: a2 })) switch (a2) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: t, payload: s2, attestation: i3, encryptedId: o3 });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(t, s2);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(t, s2);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(t, s2);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(t, s2);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(t, s2);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: t, payload: s2, attestation: i3, encryptedId: o3, transportType: r2 });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(t, s2);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: t, payload: s2, attestation: i3, encryptedId: o3, transportType: r2 });
        default:
          return this.client.logger.info(`Unsupported request method ${a2}`);
      }
    }), c$1(this, "onRelayEventResponse", async (e2) => {
      const { topic: t, payload: s2, transportType: i3 } = e2, r2 = (await this.client.core.history.get(t, s2.id)).request.method;
      switch (r2) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(t, s2, i3);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(t, s2);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(t, s2);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(t, s2);
        case "wc_sessionPing":
          return this.onSessionPingResponse(t, s2);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(t, s2);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(t, s2);
        default:
          return this.client.logger.info(`Unsupported response method ${r2}`);
      }
    }), c$1(this, "onRelayEventUnknownPayload", (e2) => {
      const { topic: t } = e2, { message: s2 } = ht$2("MISSING_OR_INVALID", `Decoded payload on topic ${t} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(s2);
    }), c$1(this, "shouldIgnorePairingRequest", (e2) => {
      const { topic: t, requestMethod: s2 } = e2, i3 = this.expectedPairingMethodMap.get(t);
      return !i3 || i3.includes(s2) ? false : !!(i3.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), c$1(this, "onSessionProposeRequest", async (e2) => {
      const { topic: t, payload: s2, attestation: i3, encryptedId: r2 } = e2, { params: o3, id: a2 } = s2;
      try {
        const l2 = this.client.core.eventClient.getEvent({ topic: t });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l2 == null ? void 0 : l2.setError(Y$2.proposal_listener_not_found)), this.isValidConnect(v$2({}, s2.params));
        const p2 = o3.expiryTimestamp || Ei$1(N$1.wc_sessionPropose.req.ttl), h4 = v$2({ id: a2, pairingTopic: t, expiryTimestamp: p2 }, o3);
        await this.setProposal(a2, h4);
        const u2 = await this.getVerifyContext({ attestationId: i3, hash: kc(JSON.stringify(s2)), encryptedId: r2, metadata: h4.proposer.metadata });
        l2 == null ? void 0 : l2.addTrace(G$1.emit_session_proposal), this.client.events.emit("session_proposal", { id: a2, params: h4, verifyContext: u2 });
      } catch (l2) {
        await this.sendError({ id: a2, topic: t, error: l2, rpcOpts: N$1.wc_sessionPropose.autoReject }), this.client.logger.error(l2);
      }
    }), c$1(this, "onSessionProposeResponse", async (e2, t, s2) => {
      const { id: i3 } = t;
      if (isJsonRpcResult(t)) {
        const { result: r2 } = t;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r2 });
        const o3 = this.client.proposal.get(i3);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: o3 });
        const a2 = o3.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a2 });
        const l2 = r2.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l2 });
        const p2 = await this.client.core.crypto.generateSharedKey(a2, l2);
        this.pendingSessions.set(i3, { sessionTopic: p2, pairingTopic: e2, proposalId: i3, publicKey: a2 });
        const h4 = await this.client.core.relayer.subscribe(p2, { transportType: s2 });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: h4 }), await this.client.core.pairing.activate({ topic: e2 });
      } else if (isJsonRpcError(t)) {
        await this.client.proposal.delete(i3, Nt$1("USER_DISCONNECTED"));
        const r2 = xi$1("session_connect", i3);
        if (this.events.listenerCount(r2) === 0) throw new Error(`emitting ${r2} without any listeners, 954`);
        this.events.emit(r2, { error: t.error });
      }
    }), c$1(this, "onSessionSettleRequest", async (e2, t) => {
      const { id: s2, params: i3 } = t;
      try {
        this.isValidSessionSettleRequest(i3);
        const { relay: r2, controller: o3, expiry: a2, namespaces: l2, sessionProperties: p2, scopedProperties: h4, sessionConfig: u2 } = t.params, d4 = [...this.pendingSessions.values()].find((f5) => f5.sessionTopic === e2);
        if (!d4) return this.client.logger.error(`Pending session not found for topic ${e2}`);
        const w2 = this.client.proposal.get(d4.proposalId), m3 = b$2(v$2(v$2(v$2({ topic: e2, relay: r2, expiry: a2, namespaces: l2, acknowledged: true, pairingTopic: d4.pairingTopic, requiredNamespaces: w2.requiredNamespaces, optionalNamespaces: w2.optionalNamespaces, controller: o3.publicKey, self: { publicKey: d4.publicKey, metadata: this.client.metadata }, peer: { publicKey: o3.publicKey, metadata: o3.metadata } }, p2 && { sessionProperties: p2 }), h4 && { scopedProperties: h4 }), u2 && { sessionConfig: u2 }), { transportType: Q$2.relay });
        await this.client.session.set(m3.topic, m3), await this.setExpiry(m3.topic, m3.expiry), await this.client.core.pairing.updateMetadata({ topic: d4.pairingTopic, metadata: m3.peer.metadata }), this.client.events.emit("session_connect", { session: m3 }), this.events.emit(xi$1("session_connect", d4.proposalId), { session: m3 }), this.pendingSessions.delete(d4.proposalId), this.deleteProposal(d4.proposalId, false), this.cleanupDuplicatePairings(m3), await this.sendResult({ id: t.id, topic: e2, result: true, throwOnFailedPublish: true });
      } catch (r2) {
        await this.sendError({ id: s2, topic: e2, error: r2 }), this.client.logger.error(r2);
      }
    }), c$1(this, "onSessionSettleResponse", async (e2, t) => {
      const { id: s2 } = t;
      isJsonRpcResult(t) ? (await this.client.session.update(e2, { acknowledged: true }), this.events.emit(xi$1("session_approve", s2), {})) : isJsonRpcError(t) && (await this.client.session.delete(e2, Nt$1("USER_DISCONNECTED")), this.events.emit(xi$1("session_approve", s2), { error: t.error }));
    }), c$1(this, "onSessionUpdateRequest", async (e2, t) => {
      const { params: s2, id: i3 } = t;
      try {
        const r2 = `${e2}_session_update`, o3 = Ra.get(r2);
        if (o3 && this.isRequestOutOfSync(o3, i3)) {
          this.client.logger.warn(`Discarding out of sync request - ${i3}`), this.sendError({ id: i3, topic: e2, error: Nt$1("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(v$2({ topic: e2 }, s2));
        try {
          Ra.set(r2, i3), await this.client.session.update(e2, { namespaces: s2.namespaces }), await this.sendResult({ id: i3, topic: e2, result: true, throwOnFailedPublish: true });
        } catch (a2) {
          throw Ra.delete(r2), a2;
        }
        this.client.events.emit("session_update", { id: i3, topic: e2, params: s2 });
      } catch (r2) {
        await this.sendError({ id: i3, topic: e2, error: r2 }), this.client.logger.error(r2);
      }
    }), c$1(this, "isRequestOutOfSync", (e2, t) => t.toString().slice(0, -3) < e2.toString().slice(0, -3)), c$1(this, "onSessionUpdateResponse", (e2, t) => {
      const { id: s2 } = t, i3 = xi$1("session_update", s2);
      if (this.events.listenerCount(i3) === 0) throw new Error(`emitting ${i3} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(xi$1("session_update", s2), {}) : isJsonRpcError(t) && this.events.emit(xi$1("session_update", s2), { error: t.error });
    }), c$1(this, "onSessionExtendRequest", async (e2, t) => {
      const { id: s2 } = t;
      try {
        this.isValidExtend({ topic: e2 }), await this.setExpiry(e2, Ei$1(J$1)), await this.sendResult({ id: s2, topic: e2, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_extend", { id: s2, topic: e2 });
      } catch (i3) {
        await this.sendError({ id: s2, topic: e2, error: i3 }), this.client.logger.error(i3);
      }
    }), c$1(this, "onSessionExtendResponse", (e2, t) => {
      const { id: s2 } = t, i3 = xi$1("session_extend", s2);
      if (this.events.listenerCount(i3) === 0) throw new Error(`emitting ${i3} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(xi$1("session_extend", s2), {}) : isJsonRpcError(t) && this.events.emit(xi$1("session_extend", s2), { error: t.error });
    }), c$1(this, "onSessionPingRequest", async (e2, t) => {
      const { id: s2 } = t;
      try {
        this.isValidPing({ topic: e2 }), await this.sendResult({ id: s2, topic: e2, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_ping", { id: s2, topic: e2 });
      } catch (i3) {
        await this.sendError({ id: s2, topic: e2, error: i3 }), this.client.logger.error(i3);
      }
    }), c$1(this, "onSessionPingResponse", (e2, t) => {
      const { id: s2 } = t, i3 = xi$1("session_ping", s2);
      setTimeout(() => {
        if (this.events.listenerCount(i3) === 0) throw new Error(`emitting ${i3} without any listeners 2176`);
        isJsonRpcResult(t) ? this.events.emit(xi$1("session_ping", s2), {}) : isJsonRpcError(t) && this.events.emit(xi$1("session_ping", s2), { error: t.error });
      }, 500);
    }), c$1(this, "onSessionDeleteRequest", async (e2, t) => {
      const { id: s2 } = t;
      try {
        this.isValidDisconnect({ topic: e2, reason: t.params }), Promise.all([new Promise((i3) => {
          this.client.core.relayer.once(C$2.publish, async () => {
            i3(await this.deleteSession({ topic: e2, id: s2 }));
          });
        }), this.sendResult({ id: s2, topic: e2, result: true, throwOnFailedPublish: true }), this.cleanupPendingSentRequestsForTopic({ topic: e2, error: Nt$1("USER_DISCONNECTED") })]).catch((i3) => this.client.logger.error(i3));
      } catch (i3) {
        this.client.logger.error(i3);
      }
    }), c$1(this, "onSessionRequest", async (e2) => {
      var t, s2, i3;
      const { topic: r2, payload: o3, attestation: a2, encryptedId: l2, transportType: p2 } = e2, { id: h4, params: u2 } = o3;
      try {
        await this.isValidRequest(v$2({ topic: r2 }, u2));
        const d4 = this.client.session.get(r2), w2 = await this.getVerifyContext({ attestationId: a2, hash: kc(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", u2, h4))), encryptedId: l2, metadata: d4.peer.metadata, transportType: p2 }), m3 = { id: h4, topic: r2, params: u2, verifyContext: w2 };
        await this.setPendingSessionRequest(m3), p2 === Q$2.link_mode && (t = d4.peer.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp((s2 = d4.peer.metadata.redirect) == null ? void 0 : s2.universal), (i3 = this.client.signConfig) != null && i3.disableRequestQueue ? this.emitSessionRequest(m3) : (this.addSessionRequestToSessionRequestQueue(m3), this.processSessionRequestQueue());
      } catch (d4) {
        await this.sendError({ id: h4, topic: r2, error: d4 }), this.client.logger.error(d4);
      }
    }), c$1(this, "onSessionRequestResponse", (e2, t) => {
      const { id: s2 } = t, i3 = xi$1("session_request", s2);
      if (this.events.listenerCount(i3) === 0) throw new Error(`emitting ${i3} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(xi$1("session_request", s2), { result: t.result }) : isJsonRpcError(t) && this.events.emit(xi$1("session_request", s2), { error: t.error });
    }), c$1(this, "onSessionEventRequest", async (e2, t) => {
      const { id: s2, params: i3 } = t;
      try {
        const r2 = `${e2}_session_event_${i3.event.name}`, o3 = Ra.get(r2);
        if (o3 && this.isRequestOutOfSync(o3, s2)) {
          this.client.logger.info(`Discarding out of sync request - ${s2}`);
          return;
        }
        this.isValidEmit(v$2({ topic: e2 }, i3)), this.client.events.emit("session_event", { id: s2, topic: e2, params: i3 }), Ra.set(r2, s2);
      } catch (r2) {
        await this.sendError({ id: s2, topic: e2, error: r2 }), this.client.logger.error(r2);
      }
    }), c$1(this, "onSessionAuthenticateResponse", (e2, t) => {
      const { id: s2 } = t;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: e2, payload: t }), isJsonRpcResult(t) ? this.events.emit(xi$1("session_request", s2), { result: t.result }) : isJsonRpcError(t) && this.events.emit(xi$1("session_request", s2), { error: t.error });
    }), c$1(this, "onSessionAuthenticateRequest", async (e2) => {
      var t;
      const { topic: s2, payload: i3, attestation: r2, encryptedId: o3, transportType: a2 } = e2;
      try {
        const { requester: l2, authPayload: p2, expiryTimestamp: h4 } = i3.params, u2 = await this.getVerifyContext({ attestationId: r2, hash: kc(JSON.stringify(i3)), encryptedId: o3, metadata: l2.metadata, transportType: a2 }), d4 = { requester: l2, pairingTopic: s2, id: i3.id, authPayload: p2, verifyContext: u2, expiryTimestamp: h4 };
        await this.setAuthRequest(i3.id, { request: d4, pairingTopic: s2, transportType: a2 }), a2 === Q$2.link_mode && (t = l2.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp(l2.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: s2, params: i3.params, id: i3.id, verifyContext: u2 });
      } catch (l2) {
        this.client.logger.error(l2);
        const p2 = i3.params.requester.publicKey, h4 = await this.client.core.crypto.generateKeyPair(), u2 = this.getAppLinkIfEnabled(i3.params.requester.metadata, a2), d4 = { type: Ft$2, receiverPublicKey: p2, senderPublicKey: h4 };
        await this.sendError({ id: i3.id, topic: s2, error: l2, encodeOpts: d4, rpcOpts: N$1.wc_sessionAuthenticate.autoReject, appLink: u2 });
      }
    }), c$1(this, "addSessionRequestToSessionRequestQueue", (e2) => {
      this.sessionRequestQueue.queue.push(e2);
    }), c$1(this, "cleanupAfterResponse", (e2) => {
      this.deletePendingSessionRequest(e2.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = $$2.idle, this.processSessionRequestQueue();
      }, cjs$3.toMiliseconds(this.requestQueueDelay));
    }), c$1(this, "cleanupPendingSentRequestsForTopic", ({ topic: e2, error: t }) => {
      const s2 = this.client.core.history.pending;
      s2.length > 0 && s2.filter((i3) => i3.topic === e2 && i3.request.method === "wc_sessionRequest").forEach((i3) => {
        const r2 = i3.request.id, o3 = xi$1("session_request", r2);
        if (this.events.listenerCount(o3) === 0) throw new Error(`emitting ${o3} without any listeners`);
        this.events.emit(xi$1("session_request", i3.request.id), { error: t });
      });
    }), c$1(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === $$2.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e2 = this.sessionRequestQueue.queue[0];
      if (!e2) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = $$2.active, this.emitSessionRequest(e2);
      } catch (t) {
        this.client.logger.error(t);
      }
    }), c$1(this, "emitSessionRequest", (e2) => {
      this.client.events.emit("session_request", e2);
    }), c$1(this, "onPairingCreated", (e2) => {
      if (e2.methods && this.expectedPairingMethodMap.set(e2.topic, e2.methods), e2.active) return;
      const t = this.client.proposal.getAll().find((s2) => s2.pairingTopic === e2.topic);
      t && this.onSessionProposeRequest({ topic: e2.topic, payload: formatJsonRpcRequest("wc_sessionPropose", b$2(v$2({}, t), { requiredNamespaces: t.requiredNamespaces, optionalNamespaces: t.optionalNamespaces, relays: t.relays, proposer: t.proposer, sessionProperties: t.sessionProperties, scopedProperties: t.scopedProperties }), t.id) });
    }), c$1(this, "isValidConnect", async (e2) => {
      if (!ma(e2)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e2)}`);
        throw new Error(l2);
      }
      const { pairingTopic: t, requiredNamespaces: s2, optionalNamespaces: i3, sessionProperties: r2, scopedProperties: o3, relays: a2 } = e2;
      if (Et$2(t) || await this.isValidPairingTopic(t), !ga(a2)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", `connect() relays: ${a2}`);
        throw new Error(l2);
      }
      if (!Et$2(s2) && Oe$1(s2) !== 0) {
        const l2 = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
        ["fatal", "error", "silent"].includes(this.client.logger.level) ? console.warn(l2) : this.client.logger.warn(l2), this.validateNamespaces(s2, "requiredNamespaces");
      }
      if (!Et$2(i3) && Oe$1(i3) !== 0 && this.validateNamespaces(i3, "optionalNamespaces"), Et$2(r2) || this.validateSessionProps(r2, "sessionProperties"), !Et$2(o3)) {
        this.validateSessionProps(o3, "scopedProperties");
        const l2 = Object.keys(s2 || {}).concat(Object.keys(i3 || {}));
        if (!Object.keys(o3).every((p2) => l2.includes(p2))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(o3)}, required/optional namespaces: ${JSON.stringify(l2)}`);
      }
    }), c$1(this, "validateNamespaces", (e2, t) => {
      const s2 = pa(e2, "connect()", t);
      if (s2) throw new Error(s2.message);
    }), c$1(this, "isValidApprove", async (e2) => {
      if (!ma(e2)) throw new Error(ht$2("MISSING_OR_INVALID", `approve() params: ${e2}`).message);
      const { id: t, namespaces: s2, relayProtocol: i3, sessionProperties: r2, scopedProperties: o3 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidProposalId(t);
      const a2 = this.client.proposal.get(t), l2 = Bo$1(s2, "approve()");
      if (l2) throw new Error(l2.message);
      const p2 = No$1(a2.requiredNamespaces, s2, "approve()");
      if (p2) throw new Error(p2.message);
      if (!nt$2(i3, true)) {
        const { message: h4 } = ht$2("MISSING_OR_INVALID", `approve() relayProtocol: ${i3}`);
        throw new Error(h4);
      }
      if (Et$2(r2) || this.validateSessionProps(r2, "sessionProperties"), !Et$2(o3)) {
        this.validateSessionProps(o3, "scopedProperties");
        const h4 = new Set(Object.keys(s2));
        if (!Object.keys(o3).every((u2) => h4.has(u2))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(o3)}, approved namespaces: ${Array.from(h4).join(", ")}`);
      }
    }), c$1(this, "isValidReject", async (e2) => {
      if (!ma(e2)) {
        const { message: i3 } = ht$2("MISSING_OR_INVALID", `reject() params: ${e2}`);
        throw new Error(i3);
      }
      const { id: t, reason: s2 } = e2;
      if (this.checkRecentlyDeleted(t), await this.isValidProposalId(t), !wa(s2)) {
        const { message: i3 } = ht$2("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s2)}`);
        throw new Error(i3);
      }
    }), c$1(this, "isValidSessionSettleRequest", (e2) => {
      if (!ma(e2)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e2}`);
        throw new Error(l2);
      }
      const { relay: t, controller: s2, namespaces: i3, expiry: r2 } = e2;
      if (!Io$1(t)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l2);
      }
      const o3 = ha(s2, "onSessionSettleRequest()");
      if (o3) throw new Error(o3.message);
      const a2 = Bo$1(i3, "onSessionSettleRequest()");
      if (a2) throw new Error(a2.message);
      if (vi$1(r2)) {
        const { message: l2 } = ht$2("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l2);
      }
    }), c$1(this, "isValidUpdate", async (e2) => {
      if (!ma(e2)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `update() params: ${e2}`);
        throw new Error(a2);
      }
      const { topic: t, namespaces: s2 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const i3 = this.client.session.get(t), r2 = Bo$1(s2, "update()");
      if (r2) throw new Error(r2.message);
      const o3 = No$1(i3.requiredNamespaces, s2, "update()");
      if (o3) throw new Error(o3.message);
    }), c$1(this, "isValidExtend", async (e2) => {
      if (!ma(e2)) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `extend() params: ${e2}`);
        throw new Error(s2);
      }
      const { topic: t } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
    }), c$1(this, "isValidRequest", async (e2) => {
      if (!ma(e2)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() params: ${e2}`);
        throw new Error(a2);
      }
      const { topic: t, request: s2, chainId: i3, expiry: r2 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const { namespaces: o3 } = this.client.session.get(t);
      if (!xa(o3, i3)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() chainId: ${i3}`);
        throw new Error(a2);
      }
      if (!ba(s2)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() ${JSON.stringify(s2)}`);
        throw new Error(a2);
      }
      if (!Sa(o3, i3, s2.method)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() method: ${s2.method}`);
        throw new Error(a2);
      }
      if (r2 && !Ia(r2, _e$1)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() expiry: ${r2}. Expiry must be a number (in seconds) between ${_e$1.min} and ${_e$1.max}`);
        throw new Error(a2);
      }
    }), c$1(this, "isValidRespond", async (e2) => {
      var t;
      if (!ma(e2)) {
        const { message: r2 } = ht$2("MISSING_OR_INVALID", `respond() params: ${e2}`);
        throw new Error(r2);
      }
      const { topic: s2, response: i3 } = e2;
      try {
        await this.isValidSessionTopic(s2);
      } catch (r2) {
        throw (t = e2 == null ? void 0 : e2.response) != null && t.id && this.cleanupAfterResponse(e2), r2;
      }
      if (!Ea(i3)) {
        const { message: r2 } = ht$2("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i3)}`);
        throw new Error(r2);
      }
    }), c$1(this, "isValidPing", async (e2) => {
      if (!ma(e2)) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `ping() params: ${e2}`);
        throw new Error(s2);
      }
      const { topic: t } = e2;
      await this.isValidSessionOrPairingTopic(t);
    }), c$1(this, "isValidEmit", async (e2) => {
      if (!ma(e2)) {
        const { message: o3 } = ht$2("MISSING_OR_INVALID", `emit() params: ${e2}`);
        throw new Error(o3);
      }
      const { topic: t, event: s2, chainId: i3 } = e2;
      await this.isValidSessionTopic(t);
      const { namespaces: r2 } = this.client.session.get(t);
      if (!xa(r2, i3)) {
        const { message: o3 } = ht$2("MISSING_OR_INVALID", `emit() chainId: ${i3}`);
        throw new Error(o3);
      }
      if (!va(s2)) {
        const { message: o3 } = ht$2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s2)}`);
        throw new Error(o3);
      }
      if (!Oa(r2, i3, s2.name)) {
        const { message: o3 } = ht$2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s2)}`);
        throw new Error(o3);
      }
    }), c$1(this, "isValidDisconnect", async (e2) => {
      if (!ma(e2)) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `disconnect() params: ${e2}`);
        throw new Error(s2);
      }
      const { topic: t } = e2;
      await this.isValidSessionOrPairingTopic(t);
    }), c$1(this, "isValidAuthenticate", (e2) => {
      const { chains: t, uri: s2, domain: i3, nonce: r2 } = e2;
      if (!Array.isArray(t) || t.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!nt$2(s2, false)) throw new Error("uri is required parameter");
      if (!nt$2(i3, false)) throw new Error("domain is required parameter");
      if (!nt$2(r2, false)) throw new Error("nonce is required parameter");
      if ([...new Set(t.map((a2) => Ne$1(a2).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: o3 } = Ne$1(t[0]);
      if (o3 !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), c$1(this, "getVerifyContext", async (e2) => {
      const { attestationId: t, hash: s2, encryptedId: i3, metadata: r2, transportType: o3 } = e2, a2 = { verified: { verifyUrl: r2.verifyUrl || ue$1, validation: "UNKNOWN", origin: r2.url || "" } };
      try {
        if (o3 === Q$2.link_mode) {
          const p2 = this.getAppLinkIfEnabled(r2, o3);
          return a2.verified.validation = p2 && new URL(p2).origin === new URL(r2.url).origin ? "VALID" : "INVALID", a2;
        }
        const l2 = await this.client.core.verify.resolve({ attestationId: t, hash: s2, encryptedId: i3, verifyUrl: r2.verifyUrl });
        l2 && (a2.verified.origin = l2.origin, a2.verified.isScam = l2.isScam, a2.verified.validation = l2.origin === new URL(r2.url).origin ? "VALID" : "INVALID");
      } catch (l2) {
        this.client.logger.warn(l2);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(a2)}`), a2;
    }), c$1(this, "validateSessionProps", (e2, t) => {
      Object.values(e2).forEach((s2, i3) => {
        if (s2 == null) {
          const { message: r2 } = ht$2("MISSING_OR_INVALID", `${t} must contain an existing value for each key. Received: ${s2} for key ${Object.keys(e2)[i3]}`);
          throw new Error(r2);
        }
      });
    }), c$1(this, "getPendingAuthRequest", (e2) => {
      const t = this.client.auth.requests.get(e2);
      return typeof t == "object" ? t : void 0;
    }), c$1(this, "addToRecentlyDeleted", (e2, t) => {
      if (this.recentlyDeletedMap.set(e2, t), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let s2 = 0;
        const i3 = this.recentlyDeletedLimit / 2;
        for (const r2 of this.recentlyDeletedMap.keys()) {
          if (s2++ >= i3) break;
          this.recentlyDeletedMap.delete(r2);
        }
      }
    }), c$1(this, "checkRecentlyDeleted", (e2) => {
      const t = this.recentlyDeletedMap.get(e2);
      if (t) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `Record was recently deleted - ${t}: ${e2}`);
        throw new Error(s2);
      }
    }), c$1(this, "isLinkModeEnabled", (e2, t) => {
      var s2, i3, r2, o3, a2, l2, p2, h4, u2;
      return !e2 || t !== Q$2.link_mode ? false : ((i3 = (s2 = this.client.metadata) == null ? void 0 : s2.redirect) == null ? void 0 : i3.linkMode) === true && ((o3 = (r2 = this.client.metadata) == null ? void 0 : r2.redirect) == null ? void 0 : o3.universal) !== void 0 && ((l2 = (a2 = this.client.metadata) == null ? void 0 : a2.redirect) == null ? void 0 : l2.universal) !== "" && ((p2 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : p2.universal) !== void 0 && ((h4 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : h4.universal) !== "" && ((u2 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : u2.linkMode) === true && this.client.core.linkModeSupportedApps.includes(e2.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), c$1(this, "getAppLinkIfEnabled", (e2, t) => {
      var s2;
      return this.isLinkModeEnabled(e2, t) ? (s2 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : s2.universal : void 0;
    }), c$1(this, "handleLinkModeMessage", ({ url: e2 }) => {
      if (!e2 || !e2.includes("wc_ev") || !e2.includes("topic")) return;
      const t = Ai$1(e2, "topic") || "", s2 = decodeURIComponent(Ai$1(e2, "wc_ev") || ""), i3 = this.client.session.keys.includes(t);
      i3 && this.client.session.update(t, { transportType: Q$2.link_mode }), this.client.core.dispatchEnvelope({ topic: t, message: s2, sessionExists: i3 });
    }), c$1(this, "registerLinkModeListeners", async () => {
      var e2;
      if (Ii$1() || pt$2() && (e2 = this.client.metadata.redirect) != null && e2.linkMode) {
        const t = global == null ? void 0 : global.Linking;
        if (typeof t < "u") {
          t.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const s2 = await t.getInitialURL();
          s2 && setTimeout(() => {
            this.handleLinkModeMessage({ url: s2 });
          }, 50);
        }
      }
    }), c$1(this, "shouldSetTVF", (e2, t) => {
      if (!t || e2 !== "wc_sessionRequest") return false;
      const { request: s2 } = t;
      return Object.keys(Ke$1).includes(s2.method);
    }), c$1(this, "getTVFParams", (e2, t, s2) => {
      var i3, r2;
      try {
        const o3 = t.request.method, a2 = this.extractTxHashesFromResult(o3, s2);
        return b$2(v$2({ correlationId: e2, rpcMethods: [o3], chainId: t.chainId }, this.isValidContractData(t.request.params) && { contractAddresses: [(r2 = (i3 = t.request.params) == null ? void 0 : i3[0]) == null ? void 0 : r2.to] }), { txHashes: a2 });
      } catch (o3) {
        this.client.logger.warn("Error getting TVF params", o3);
      }
      return {};
    }), c$1(this, "isValidContractData", (e2) => {
      var t;
      if (!e2) return false;
      try {
        const s2 = (e2 == null ? void 0 : e2.data) || ((t = e2 == null ? void 0 : e2[0]) == null ? void 0 : t.data);
        if (!s2.startsWith("0x")) return false;
        const i3 = s2.slice(2);
        return /^[0-9a-fA-F]*$/.test(i3) ? i3.length % 2 === 0 : false;
      } catch {
      }
      return false;
    }), c$1(this, "extractTxHashesFromResult", (e2, t) => {
      try {
        const s2 = Ke$1[e2];
        if (typeof t == "string") return [t];
        const i3 = t[s2.key];
        if (se$2(i3)) return e2 === "solana_signAllTransactions" ? i3.map((r2) => Ji(r2)) : i3;
        if (typeof i3 == "string") return [i3];
      } catch (s2) {
        this.client.logger.warn("Error extracting tx hashes from result", s2);
      }
      return [];
    });
  }
  async processPendingMessageEvents() {
    try {
      const n3 = this.client.session.keys, e2 = this.client.core.relayer.messages.getWithoutAck(n3);
      for (const [t, s2] of Object.entries(e2)) for (const i3 of s2) try {
        await this.onProviderMessageEvent({ topic: t, message: i3, publishedAt: Date.now() });
      } catch {
        this.client.logger.warn(`Error processing pending message event for topic: ${t}, message: ${i3}`);
      }
    } catch (n3) {
      this.client.logger.warn("processPendingMessageEvents failed", n3);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: n3 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(n3);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(C$2.message, (n3) => {
      this.onProviderMessageEvent(n3);
    });
  }
  async onRelayMessage(n3) {
    const { topic: e2, message: t, attestation: s2, transportType: i3 } = n3, { publicKey: r2 } = this.client.auth.authKeys.keys.includes(ce$1) ? this.client.auth.authKeys.get(ce$1) : { responseTopic: void 0, publicKey: void 0 };
    try {
      const o3 = await this.client.core.crypto.decode(e2, t, { receiverPublicKey: r2, encoding: i3 === Q$2.link_mode ? xe$1 : qt$2 });
      isJsonRpcRequest(o3) ? (this.client.core.history.set(e2, o3), await this.onRelayEventRequest({ topic: e2, payload: o3, attestation: s2, transportType: i3, encryptedId: kc(t) })) : isJsonRpcResponse(o3) ? (await this.client.core.history.resolve(o3), await this.onRelayEventResponse({ topic: e2, payload: o3, transportType: i3 }), this.client.core.history.delete(e2, o3.id)) : await this.onRelayEventUnknownPayload({ topic: e2, payload: o3, transportType: i3 }), await this.client.core.relayer.messages.ack(e2, t);
    } catch (o3) {
      this.client.logger.error(o3);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(M$2.expired, async (n3) => {
      const { topic: e2, id: t } = bi$1(n3.target);
      if (t && this.client.pendingRequest.keys.includes(t)) return await this.deletePendingSessionRequest(t, ht$2("EXPIRED"), true);
      if (t && this.client.auth.requests.keys.includes(t)) return await this.deletePendingAuthRequest(t, ht$2("EXPIRED"), true);
      e2 ? this.client.session.keys.includes(e2) && (await this.deleteSession({ topic: e2, expirerHasDeleted: true }), this.client.events.emit("session_expire", { topic: e2 })) : t && (await this.deleteProposal(t, true), this.client.events.emit("proposal_expire", { id: t }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(re$1.create, (n3) => this.onPairingCreated(n3)), this.client.core.pairing.events.on(re$1.delete, (n3) => {
      this.addToRecentlyDeleted(n3.topic, "pairing");
    });
  }
  isValidPairingTopic(n3) {
    if (!nt$2(n3, false)) {
      const { message: e2 } = ht$2("MISSING_OR_INVALID", `pairing topic should be a string: ${n3}`);
      throw new Error(e2);
    }
    if (!this.client.core.pairing.pairings.keys.includes(n3)) {
      const { message: e2 } = ht$2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${n3}`);
      throw new Error(e2);
    }
    if (vi$1(this.client.core.pairing.pairings.get(n3).expiry)) {
      const { message: e2 } = ht$2("EXPIRED", `pairing topic: ${n3}`);
      throw new Error(e2);
    }
  }
  async isValidSessionTopic(n3) {
    if (!nt$2(n3, false)) {
      const { message: e2 } = ht$2("MISSING_OR_INVALID", `session topic should be a string: ${n3}`);
      throw new Error(e2);
    }
    if (this.checkRecentlyDeleted(n3), !this.client.session.keys.includes(n3)) {
      const { message: e2 } = ht$2("NO_MATCHING_KEY", `session topic doesn't exist: ${n3}`);
      throw new Error(e2);
    }
    if (vi$1(this.client.session.get(n3).expiry)) {
      await this.deleteSession({ topic: n3 });
      const { message: e2 } = ht$2("EXPIRED", `session topic: ${n3}`);
      throw new Error(e2);
    }
    if (!this.client.core.crypto.keychain.has(n3)) {
      const { message: e2 } = ht$2("MISSING_OR_INVALID", `session topic does not exist in keychain: ${n3}`);
      throw await this.deleteSession({ topic: n3 }), new Error(e2);
    }
  }
  async isValidSessionOrPairingTopic(n3) {
    if (this.checkRecentlyDeleted(n3), this.client.session.keys.includes(n3)) await this.isValidSessionTopic(n3);
    else if (this.client.core.pairing.pairings.keys.includes(n3)) this.isValidPairingTopic(n3);
    else if (nt$2(n3, false)) {
      const { message: e2 } = ht$2("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${n3}`);
      throw new Error(e2);
    } else {
      const { message: e2 } = ht$2("MISSING_OR_INVALID", `session or pairing topic should be a string: ${n3}`);
      throw new Error(e2);
    }
  }
  async isValidProposalId(n3) {
    if (!ya(n3)) {
      const { message: e2 } = ht$2("MISSING_OR_INVALID", `proposal id should be a number: ${n3}`);
      throw new Error(e2);
    }
    if (!this.client.proposal.keys.includes(n3)) {
      const { message: e2 } = ht$2("NO_MATCHING_KEY", `proposal id doesn't exist: ${n3}`);
      throw new Error(e2);
    }
    if (vi$1(this.client.proposal.get(n3).expiryTimestamp)) {
      await this.deleteProposal(n3);
      const { message: e2 } = ht$2("EXPIRED", `proposal id: ${n3}`);
      throw new Error(e2);
    }
  }
}
class Os extends zi {
  constructor(n3, e2) {
    super(n3, e2, pt$1, we$1), this.core = n3, this.logger = e2;
  }
}
let St$1 = class St extends zi {
  constructor(n3, e2) {
    super(n3, e2, ht$1, we$1), this.core = n3, this.logger = e2;
  }
};
class bs extends zi {
  constructor(n3, e2) {
    super(n3, e2, ut$1, we$1, (t) => t.id), this.core = n3, this.logger = e2;
  }
}
class As extends zi {
  constructor(n3, e2) {
    super(n3, e2, mt$1, ae$1, () => ce$1), this.core = n3, this.logger = e2;
  }
}
class xs extends zi {
  constructor(n3, e2) {
    super(n3, e2, _t$1, ae$1), this.core = n3, this.logger = e2;
  }
}
class Cs extends zi {
  constructor(n3, e2) {
    super(n3, e2, Et, ae$1, (t) => t.id), this.core = n3, this.logger = e2;
  }
}
var Vs = Object.defineProperty, Ds = (S3, n3, e2) => n3 in S3 ? Vs(S3, n3, { enumerable: true, configurable: true, writable: true, value: e2 }) : S3[n3] = e2, Ge$1 = (S3, n3, e2) => Ds(S3, typeof n3 != "symbol" ? n3 + "" : n3, e2);
class Ls {
  constructor(n3, e2) {
    this.core = n3, this.logger = e2, Ge$1(this, "authKeys"), Ge$1(this, "pairingTopics"), Ge$1(this, "requests"), this.authKeys = new As(this.core, this.logger), this.pairingTopics = new xs(this.core, this.logger), this.requests = new Cs(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
}
var ks = Object.defineProperty, Ms = (S3, n3, e2) => n3 in S3 ? ks(S3, n3, { enumerable: true, configurable: true, writable: true, value: e2 }) : S3[n3] = e2, E$3 = (S3, n3, e2) => Ms(S3, typeof n3 != "symbol" ? n3 + "" : n3, e2);
let Ee$1 = class Ee extends J$2 {
  constructor(n3) {
    super(n3), E$3(this, "protocol", De$1), E$3(this, "version", Le$1), E$3(this, "name", me$1.name), E$3(this, "metadata"), E$3(this, "core"), E$3(this, "logger"), E$3(this, "events", new eventsExports.EventEmitter()), E$3(this, "engine"), E$3(this, "session"), E$3(this, "proposal"), E$3(this, "pendingRequest"), E$3(this, "auth"), E$3(this, "signConfig"), E$3(this, "on", (t, s2) => this.events.on(t, s2)), E$3(this, "once", (t, s2) => this.events.once(t, s2)), E$3(this, "off", (t, s2) => this.events.off(t, s2)), E$3(this, "removeListener", (t, s2) => this.events.removeListener(t, s2)), E$3(this, "removeAllListeners", (t) => this.events.removeAllListeners(t)), E$3(this, "connect", async (t) => {
      try {
        return await this.engine.connect(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "pair", async (t) => {
      try {
        return await this.engine.pair(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "approve", async (t) => {
      try {
        return await this.engine.approve(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "reject", async (t) => {
      try {
        return await this.engine.reject(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "update", async (t) => {
      try {
        return await this.engine.update(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "extend", async (t) => {
      try {
        return await this.engine.extend(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "request", async (t) => {
      try {
        return await this.engine.request(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "respond", async (t) => {
      try {
        return await this.engine.respond(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "ping", async (t) => {
      try {
        return await this.engine.ping(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "emit", async (t) => {
      try {
        return await this.engine.emit(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "disconnect", async (t) => {
      try {
        return await this.engine.disconnect(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "find", (t) => {
      try {
        return this.engine.find(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }), E$3(this, "authenticate", async (t, s2) => {
      try {
        return await this.engine.authenticate(t, s2);
      } catch (i3) {
        throw this.logger.error(i3.message), i3;
      }
    }), E$3(this, "formatAuthMessage", (t) => {
      try {
        return this.engine.formatAuthMessage(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "approveSessionAuthenticate", async (t) => {
      try {
        return await this.engine.approveSessionAuthenticate(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$3(this, "rejectSessionAuthenticate", async (t) => {
      try {
        return await this.engine.rejectSessionAuthenticate(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), this.name = (n3 == null ? void 0 : n3.name) || me$1.name, this.metadata = oi$1(n3 == null ? void 0 : n3.metadata), this.signConfig = n3 == null ? void 0 : n3.signConfig;
    const e2 = typeof (n3 == null ? void 0 : n3.logger) < "u" && typeof (n3 == null ? void 0 : n3.logger) != "string" ? n3.logger : Ot$1(k$4({ level: (n3 == null ? void 0 : n3.logger) || me$1.logger }));
    this.core = (n3 == null ? void 0 : n3.core) || new Xo(n3), this.logger = E$5(e2, this.name), this.session = new St$1(this.core, this.logger), this.proposal = new Os(this.core, this.logger), this.pendingRequest = new bs(this.core, this.logger), this.engine = new Ns(this), this.auth = new Ls(this.core, this.logger);
  }
  static async init(n3) {
    const e2 = new Ee(n3);
    return await e2.initialize(), e2;
  }
  get context() {
    return y$3(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
        this.engine.processRelayMessageCache();
      }, cjs$3.toMiliseconds(cjs$3.ONE_SECOND));
    } catch (n3) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(n3.message), n3;
    }
  }
};
var browserPonyfill = { exports: {} };
(function(module, exports) {
  var __global__ = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof commonjsGlobal !== "undefined" && commonjsGlobal;
  var __globalThis__ = function() {
    function F2() {
      this.fetch = false;
      this.DOMException = __global__.DOMException;
    }
    F2.prototype = __global__;
    return new F2();
  }();
  (function(globalThis2) {
    (function(exports2) {
      var g2 = typeof globalThis2 !== "undefined" && globalThis2 || typeof self !== "undefined" && self || // eslint-disable-next-line no-undef
      typeof commonjsGlobal !== "undefined" && commonjsGlobal || {};
      var support = {
        searchParams: "URLSearchParams" in g2,
        iterable: "Symbol" in g2 && "iterator" in Symbol,
        blob: "FileReader" in g2 && "Blob" in g2 && function() {
          try {
            new Blob();
            return true;
          } catch (e2) {
            return false;
          }
        }(),
        formData: "FormData" in g2,
        arrayBuffer: "ArrayBuffer" in g2
      };
      function isDataView(obj) {
        return obj && DataView.prototype.isPrototypeOf(obj);
      }
      if (support.arrayBuffer) {
        var viewClasses = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ];
        var isArrayBufferView = ArrayBuffer.isView || function(obj) {
          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
      }
      function normalizeName(name) {
        if (typeof name !== "string") {
          name = String(name);
        }
        if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === "") {
          throw new TypeError('Invalid character in header field name: "' + name + '"');
        }
        return name.toLowerCase();
      }
      function normalizeValue(value) {
        if (typeof value !== "string") {
          value = String(value);
        }
        return value;
      }
      function iteratorFor(items) {
        var iterator = {
          next: function() {
            var value = items.shift();
            return { done: value === void 0, value };
          }
        };
        if (support.iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator;
          };
        }
        return iterator;
      }
      function Headers(headers) {
        this.map = {};
        if (headers instanceof Headers) {
          headers.forEach(function(value, name) {
            this.append(name, value);
          }, this);
        } else if (Array.isArray(headers)) {
          headers.forEach(function(header) {
            if (header.length != 2) {
              throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + header.length);
            }
            this.append(header[0], header[1]);
          }, this);
        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function(name) {
            this.append(name, headers[name]);
          }, this);
        }
      }
      Headers.prototype.append = function(name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + ", " + value : value;
      };
      Headers.prototype["delete"] = function(name) {
        delete this.map[normalizeName(name)];
      };
      Headers.prototype.get = function(name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null;
      };
      Headers.prototype.has = function(name) {
        return this.map.hasOwnProperty(normalizeName(name));
      };
      Headers.prototype.set = function(name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
      };
      Headers.prototype.forEach = function(callback, thisArg) {
        for (var name in this.map) {
          if (this.map.hasOwnProperty(name)) {
            callback.call(thisArg, this.map[name], name, this);
          }
        }
      };
      Headers.prototype.keys = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push(name);
        });
        return iteratorFor(items);
      };
      Headers.prototype.values = function() {
        var items = [];
        this.forEach(function(value) {
          items.push(value);
        });
        return iteratorFor(items);
      };
      Headers.prototype.entries = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push([name, value]);
        });
        return iteratorFor(items);
      };
      if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
      }
      function consumed(body) {
        if (body._noBody) return;
        if (body.bodyUsed) {
          return Promise.reject(new TypeError("Already read"));
        }
        body.bodyUsed = true;
      }
      function fileReaderReady(reader) {
        return new Promise(function(resolve, reject) {
          reader.onload = function() {
            resolve(reader.result);
          };
          reader.onerror = function() {
            reject(reader.error);
          };
        });
      }
      function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise;
      }
      function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
        var encoding = match ? match[1] : "utf-8";
        reader.readAsText(blob, encoding);
        return promise;
      }
      function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);
        for (var i3 = 0; i3 < view.length; i3++) {
          chars[i3] = String.fromCharCode(view[i3]);
        }
        return chars.join("");
      }
      function bufferClone(buf) {
        if (buf.slice) {
          return buf.slice(0);
        } else {
          var view = new Uint8Array(buf.byteLength);
          view.set(new Uint8Array(buf));
          return view.buffer;
        }
      }
      function Body() {
        this.bodyUsed = false;
        this._initBody = function(body) {
          this.bodyUsed = this.bodyUsed;
          this._bodyInit = body;
          if (!body) {
            this._noBody = true;
            this._bodyText = "";
          } else if (typeof body === "string") {
            this._bodyText = body;
          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString();
          } else if (support.arrayBuffer && support.blob && isDataView(body)) {
            this._bodyArrayBuffer = bufferClone(body.buffer);
            this._bodyInit = new Blob([this._bodyArrayBuffer]);
          } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
            this._bodyArrayBuffer = bufferClone(body);
          } else {
            this._bodyText = body = Object.prototype.toString.call(body);
          }
          if (!this.headers.get("content-type")) {
            if (typeof body === "string") {
              this.headers.set("content-type", "text/plain;charset=UTF-8");
            } else if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set("content-type", this._bodyBlob.type);
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
            }
          }
        };
        if (support.blob) {
          this.blob = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as blob");
            } else {
              return Promise.resolve(new Blob([this._bodyText]));
            }
          };
        }
        this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var isConsumed = consumed(this);
            if (isConsumed) {
              return isConsumed;
            } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
              return Promise.resolve(
                this._bodyArrayBuffer.buffer.slice(
                  this._bodyArrayBuffer.byteOffset,
                  this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                )
              );
            } else {
              return Promise.resolve(this._bodyArrayBuffer);
            }
          } else if (support.blob) {
            return this.blob().then(readBlobAsArrayBuffer);
          } else {
            throw new Error("could not read as ArrayBuffer");
          }
        };
        this.text = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }
          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob);
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
          } else if (this._bodyFormData) {
            throw new Error("could not read FormData body as text");
          } else {
            return Promise.resolve(this._bodyText);
          }
        };
        if (support.formData) {
          this.formData = function() {
            return this.text().then(decode2);
          };
        }
        this.json = function() {
          return this.text().then(JSON.parse);
        };
        return this;
      }
      var methods = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
      function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return methods.indexOf(upcased) > -1 ? upcased : method;
      }
      function Request(input, options) {
        if (!(this instanceof Request)) {
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        }
        options = options || {};
        var body = options.body;
        if (input instanceof Request) {
          if (input.bodyUsed) {
            throw new TypeError("Already read");
          }
          this.url = input.url;
          this.credentials = input.credentials;
          if (!options.headers) {
            this.headers = new Headers(input.headers);
          }
          this.method = input.method;
          this.mode = input.mode;
          this.signal = input.signal;
          if (!body && input._bodyInit != null) {
            body = input._bodyInit;
            input.bodyUsed = true;
          }
        } else {
          this.url = String(input);
        }
        this.credentials = options.credentials || this.credentials || "same-origin";
        if (options.headers || !this.headers) {
          this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || "GET");
        this.mode = options.mode || this.mode || null;
        this.signal = options.signal || this.signal || function() {
          if ("AbortController" in g2) {
            var ctrl = new AbortController();
            return ctrl.signal;
          }
        }();
        this.referrer = null;
        if ((this.method === "GET" || this.method === "HEAD") && body) {
          throw new TypeError("Body not allowed for GET or HEAD requests");
        }
        this._initBody(body);
        if (this.method === "GET" || this.method === "HEAD") {
          if (options.cache === "no-store" || options.cache === "no-cache") {
            var reParamSearch = /([?&])_=[^&]*/;
            if (reParamSearch.test(this.url)) {
              this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
            } else {
              var reQueryString = /\?/;
              this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
            }
          }
        }
      }
      Request.prototype.clone = function() {
        return new Request(this, { body: this._bodyInit });
      };
      function decode2(body) {
        var form = new FormData();
        body.trim().split("&").forEach(function(bytes) {
          if (bytes) {
            var split2 = bytes.split("=");
            var name = split2.shift().replace(/\+/g, " ");
            var value = split2.join("=").replace(/\+/g, " ");
            form.append(decodeURIComponent(name), decodeURIComponent(value));
          }
        });
        return form;
      }
      function parseHeaders(rawHeaders) {
        var headers = new Headers();
        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
        preProcessedHeaders.split("\r").map(function(header) {
          return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
        }).forEach(function(line) {
          var parts = line.split(":");
          var key = parts.shift().trim();
          if (key) {
            var value = parts.join(":").trim();
            try {
              headers.append(key, value);
            } catch (error) {
              console.warn("Response " + error.message);
            }
          }
        });
        return headers;
      }
      Body.call(Request.prototype);
      function Response(bodyInit, options) {
        if (!(this instanceof Response)) {
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        }
        if (!options) {
          options = {};
        }
        this.type = "default";
        this.status = options.status === void 0 ? 200 : options.status;
        if (this.status < 200 || this.status > 599) {
          throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
        }
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
        this.headers = new Headers(options.headers);
        this.url = options.url || "";
        this._initBody(bodyInit);
      }
      Body.call(Response.prototype);
      Response.prototype.clone = function() {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        });
      };
      Response.error = function() {
        var response = new Response(null, { status: 200, statusText: "" });
        response.ok = false;
        response.status = 0;
        response.type = "error";
        return response;
      };
      var redirectStatuses = [301, 302, 303, 307, 308];
      Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError("Invalid status code");
        }
        return new Response(null, { status, headers: { location: url } });
      };
      exports2.DOMException = g2.DOMException;
      try {
        new exports2.DOMException();
      } catch (err) {
        exports2.DOMException = function(message, name) {
          this.message = message;
          this.name = name;
          var error = Error(message);
          this.stack = error.stack;
        };
        exports2.DOMException.prototype = Object.create(Error.prototype);
        exports2.DOMException.prototype.constructor = exports2.DOMException;
      }
      function fetch2(input, init) {
        return new Promise(function(resolve, reject) {
          var request = new Request(input, init);
          if (request.signal && request.signal.aborted) {
            return reject(new exports2.DOMException("Aborted", "AbortError"));
          }
          var xhr = new XMLHttpRequest();
          function abortXhr() {
            xhr.abort();
          }
          xhr.onload = function() {
            var options = {
              statusText: xhr.statusText,
              headers: parseHeaders(xhr.getAllResponseHeaders() || "")
            };
            if (request.url.indexOf("file://") === 0 && (xhr.status < 200 || xhr.status > 599)) {
              options.status = 200;
            } else {
              options.status = xhr.status;
            }
            options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
            var body = "response" in xhr ? xhr.response : xhr.responseText;
            setTimeout(function() {
              resolve(new Response(body, options));
            }, 0);
          };
          xhr.onerror = function() {
            setTimeout(function() {
              reject(new TypeError("Network request failed"));
            }, 0);
          };
          xhr.ontimeout = function() {
            setTimeout(function() {
              reject(new TypeError("Network request timed out"));
            }, 0);
          };
          xhr.onabort = function() {
            setTimeout(function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function fixUrl(url) {
            try {
              return url === "" && g2.location.href ? g2.location.href : url;
            } catch (e2) {
              return url;
            }
          }
          xhr.open(request.method, fixUrl(request.url), true);
          if (request.credentials === "include") {
            xhr.withCredentials = true;
          } else if (request.credentials === "omit") {
            xhr.withCredentials = false;
          }
          if ("responseType" in xhr) {
            if (support.blob) {
              xhr.responseType = "blob";
            } else if (support.arrayBuffer) {
              xhr.responseType = "arraybuffer";
            }
          }
          if (init && typeof init.headers === "object" && !(init.headers instanceof Headers || g2.Headers && init.headers instanceof g2.Headers)) {
            var names = [];
            Object.getOwnPropertyNames(init.headers).forEach(function(name) {
              names.push(normalizeName(name));
              xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
            });
            request.headers.forEach(function(value, name) {
              if (names.indexOf(name) === -1) {
                xhr.setRequestHeader(name, value);
              }
            });
          } else {
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
          }
          if (request.signal) {
            request.signal.addEventListener("abort", abortXhr);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                request.signal.removeEventListener("abort", abortXhr);
              }
            };
          }
          xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
        });
      }
      fetch2.polyfill = true;
      if (!g2.fetch) {
        g2.fetch = fetch2;
        g2.Headers = Headers;
        g2.Request = Request;
        g2.Response = Response;
      }
      exports2.Headers = Headers;
      exports2.Request = Request;
      exports2.Response = Response;
      exports2.fetch = fetch2;
      Object.defineProperty(exports2, "__esModule", { value: true });
      return exports2;
    })({});
  })(__globalThis__);
  __globalThis__.fetch.ponyfill = true;
  delete __globalThis__.fetch.polyfill;
  var ctx = __global__.fetch ? __global__ : __globalThis__;
  exports = ctx.fetch;
  exports.default = ctx.fetch;
  exports.fetch = ctx.fetch;
  exports.Headers = ctx.Headers;
  exports.Request = ctx.Request;
  exports.Response = ctx.Response;
  module.exports = exports;
})(browserPonyfill, browserPonyfill.exports);
var browserPonyfillExports = browserPonyfill.exports;
const o2 = /* @__PURE__ */ getDefaultExportFromCjs(browserPonyfillExports);
var P$1 = Object.defineProperty, w$1 = Object.defineProperties, E$2 = Object.getOwnPropertyDescriptors, c = Object.getOwnPropertySymbols, L$2 = Object.prototype.hasOwnProperty, O$1 = Object.prototype.propertyIsEnumerable, l$1 = (r2, t, e2) => t in r2 ? P$1(r2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : r2[t] = e2, p$1 = (r2, t) => {
  for (var e2 in t || (t = {})) L$2.call(t, e2) && l$1(r2, e2, t[e2]);
  if (c) for (var e2 of c(t)) O$1.call(t, e2) && l$1(r2, e2, t[e2]);
  return r2;
}, v$1 = (r2, t) => w$1(r2, E$2(t));
const j$1 = { Accept: "application/json", "Content-Type": "application/json" }, T$1 = "POST", d$1 = { headers: j$1, method: T$1 }, g = 10;
let f$1 = class f3 {
  constructor(t, e2 = false) {
    if (this.url = t, this.disableProviderPing = e2, this.events = new eventsExports.EventEmitter(), this.isAvailable = false, this.registering = false, !isHttpUrl(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
    this.url = t, this.disableProviderPing = e2;
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(t, e2) {
    this.events.on(t, e2);
  }
  once(t, e2) {
    this.events.once(t, e2);
  }
  off(t, e2) {
    this.events.off(t, e2);
  }
  removeListener(t, e2) {
    this.events.removeListener(t, e2);
  }
  async open(t = this.url) {
    await this.register(t);
  }
  async close() {
    if (!this.isAvailable) throw new Error("Connection already closed");
    this.onClose();
  }
  async send(t) {
    this.isAvailable || await this.register();
    try {
      const e2 = safeJsonStringify(t), s2 = await (await o2(this.url, v$1(p$1({}, d$1), { body: e2 }))).json();
      this.onPayload({ data: s2 });
    } catch (e2) {
      this.onError(t.id, e2);
    }
  }
  async register(t = this.url) {
    if (!isHttpUrl(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
    if (this.registering) {
      const e2 = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= e2 || this.events.listenerCount("open") >= e2) && this.events.setMaxListeners(e2 + 1), new Promise((s2, i3) => {
        this.events.once("register_error", (n3) => {
          this.resetMaxListeners(), i3(n3);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.isAvailable > "u") return i3(new Error("HTTP connection is missing or invalid"));
          s2();
        });
      });
    }
    this.url = t, this.registering = true;
    try {
      if (!this.disableProviderPing) {
        const e2 = safeJsonStringify({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
        await o2(t, v$1(p$1({}, d$1), { body: e2 }));
      }
      this.onOpen();
    } catch (e2) {
      const s2 = this.parseError(e2);
      throw this.events.emit("register_error", s2), this.onClose(), s2;
    }
  }
  onOpen() {
    this.isAvailable = true, this.registering = false, this.events.emit("open");
  }
  onClose() {
    this.isAvailable = false, this.registering = false, this.events.emit("close");
  }
  onPayload(t) {
    if (typeof t.data > "u") return;
    const e2 = typeof t.data == "string" ? safeJsonParse(t.data) : t.data;
    this.events.emit("payload", e2);
  }
  onError(t, e2) {
    const s2 = this.parseError(e2), i3 = s2.message || s2.toString(), n3 = formatJsonRpcError(t, i3);
    this.events.emit("payload", n3);
  }
  parseError(t, e2 = this.url) {
    return parseConnectionError(t, e2, "HTTP");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > g && this.events.setMaxListeners(g);
  }
};
const et$1 = "error", St2 = "wss://relay.walletconnect.org", Dt = "wc", qt = "universal_provider", U$1 = `${Dt}@2:${qt}:`, st$1 = "https://rpc.walletconnect.org/v1/", I$1 = "generic", jt = `${st$1}bundler`, u = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function Rt() {
}
function k$1(s2) {
  return s2 == null || typeof s2 != "object" && typeof s2 != "function";
}
function W$1(s2) {
  return ArrayBuffer.isView(s2) && !(s2 instanceof DataView);
}
function _t(s2) {
  if (k$1(s2)) return s2;
  if (Array.isArray(s2) || W$1(s2) || s2 instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s2 instanceof SharedArrayBuffer) return s2.slice(0);
  const t = Object.getPrototypeOf(s2), e2 = t.constructor;
  if (s2 instanceof Date || s2 instanceof Map || s2 instanceof Set) return new e2(s2);
  if (s2 instanceof RegExp) {
    const i3 = new e2(s2);
    return i3.lastIndex = s2.lastIndex, i3;
  }
  if (s2 instanceof DataView) return new e2(s2.buffer.slice(0));
  if (s2 instanceof Error) {
    const i3 = new e2(s2.message);
    return i3.stack = s2.stack, i3.name = s2.name, i3.cause = s2.cause, i3;
  }
  if (typeof File < "u" && s2 instanceof File) return new e2([s2], s2.name, { type: s2.type, lastModified: s2.lastModified });
  if (typeof s2 == "object") {
    const i3 = Object.create(t);
    return Object.assign(i3, s2);
  }
  return s2;
}
function it(s2) {
  return typeof s2 == "object" && s2 !== null;
}
function rt(s2) {
  return Object.getOwnPropertySymbols(s2).filter((t) => Object.prototype.propertyIsEnumerable.call(s2, t));
}
function nt$1(s2) {
  return s2 == null ? s2 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s2);
}
const Ut = "[object RegExp]", at = "[object String]", ct = "[object Number]", ot = "[object Boolean]", ht = "[object Arguments]", Ft = "[object Symbol]", Lt = "[object Date]", Mt = "[object Map]", xt = "[object Set]", Bt = "[object Array]", Gt = "[object ArrayBuffer]", Jt = "[object Object]", zt = "[object DataView]", kt = "[object Uint8Array]", Wt = "[object Uint8ClampedArray]", Kt = "[object Uint16Array]", Vt = "[object Uint32Array]", Xt = "[object Int8Array]", Yt = "[object Int16Array]", Qt = "[object Int32Array]", Zt = "[object Float32Array]", Tt = "[object Float64Array]";
function te(s2, t) {
  return $$1(s2, void 0, s2, /* @__PURE__ */ new Map(), t);
}
function $$1(s2, t, e2, i3 = /* @__PURE__ */ new Map(), n3 = void 0) {
  const a2 = n3 == null ? void 0 : n3(s2, t, e2, i3);
  if (a2 != null) return a2;
  if (k$1(s2)) return s2;
  if (i3.has(s2)) return i3.get(s2);
  if (Array.isArray(s2)) {
    const r2 = new Array(s2.length);
    i3.set(s2, r2);
    for (let c2 = 0; c2 < s2.length; c2++) r2[c2] = $$1(s2[c2], c2, e2, i3, n3);
    return Object.hasOwn(s2, "index") && (r2.index = s2.index), Object.hasOwn(s2, "input") && (r2.input = s2.input), r2;
  }
  if (s2 instanceof Date) return new Date(s2.getTime());
  if (s2 instanceof RegExp) {
    const r2 = new RegExp(s2.source, s2.flags);
    return r2.lastIndex = s2.lastIndex, r2;
  }
  if (s2 instanceof Map) {
    const r2 = /* @__PURE__ */ new Map();
    i3.set(s2, r2);
    for (const [c2, o3] of s2) r2.set(c2, $$1(o3, c2, e2, i3, n3));
    return r2;
  }
  if (s2 instanceof Set) {
    const r2 = /* @__PURE__ */ new Set();
    i3.set(s2, r2);
    for (const c2 of s2) r2.add($$1(c2, void 0, e2, i3, n3));
    return r2;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(s2)) return s2.subarray();
  if (W$1(s2)) {
    const r2 = new (Object.getPrototypeOf(s2)).constructor(s2.length);
    i3.set(s2, r2);
    for (let c2 = 0; c2 < s2.length; c2++) r2[c2] = $$1(s2[c2], c2, e2, i3, n3);
    return r2;
  }
  if (s2 instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s2 instanceof SharedArrayBuffer) return s2.slice(0);
  if (s2 instanceof DataView) {
    const r2 = new DataView(s2.buffer.slice(0), s2.byteOffset, s2.byteLength);
    return i3.set(s2, r2), y2(r2, s2, e2, i3, n3), r2;
  }
  if (typeof File < "u" && s2 instanceof File) {
    const r2 = new File([s2], s2.name, { type: s2.type });
    return i3.set(s2, r2), y2(r2, s2, e2, i3, n3), r2;
  }
  if (s2 instanceof Blob) {
    const r2 = new Blob([s2], { type: s2.type });
    return i3.set(s2, r2), y2(r2, s2, e2, i3, n3), r2;
  }
  if (s2 instanceof Error) {
    const r2 = new s2.constructor();
    return i3.set(s2, r2), r2.message = s2.message, r2.name = s2.name, r2.stack = s2.stack, r2.cause = s2.cause, y2(r2, s2, e2, i3, n3), r2;
  }
  if (typeof s2 == "object" && ee(s2)) {
    const r2 = Object.create(Object.getPrototypeOf(s2));
    return i3.set(s2, r2), y2(r2, s2, e2, i3, n3), r2;
  }
  return s2;
}
function y2(s2, t, e2 = s2, i3, n3) {
  const a2 = [...Object.keys(t), ...rt(t)];
  for (let r2 = 0; r2 < a2.length; r2++) {
    const c2 = a2[r2], o3 = Object.getOwnPropertyDescriptor(s2, c2);
    (o3 == null || o3.writable) && (s2[c2] = $$1(t[c2], c2, e2, i3, n3));
  }
}
function ee(s2) {
  switch (nt$1(s2)) {
    case ht:
    case Bt:
    case Gt:
    case zt:
    case ot:
    case Lt:
    case Zt:
    case Tt:
    case Xt:
    case Yt:
    case Qt:
    case Mt:
    case ct:
    case Jt:
    case Ut:
    case xt:
    case at:
    case Ft:
    case kt:
    case Wt:
    case Kt:
    case Vt:
      return true;
    default:
      return false;
  }
}
function se(s2, t) {
  return te(s2, (e2, i3, n3, a2) => {
    if (typeof s2 == "object") switch (Object.prototype.toString.call(s2)) {
      case ct:
      case at:
      case ot: {
        const c2 = new s2.constructor(s2 == null ? void 0 : s2.valueOf());
        return y2(c2, s2), c2;
      }
      case ht: {
        const c2 = {};
        return y2(c2, s2), c2.length = s2.length, c2[Symbol.iterator] = s2[Symbol.iterator], c2;
      }
      default:
        return;
    }
  });
}
function pt(s2) {
  return se(s2);
}
function dt(s2) {
  return s2 !== null && typeof s2 == "object" && nt$1(s2) === "[object Arguments]";
}
function ie(s2) {
  return W$1(s2);
}
function re(s2) {
  var _a;
  if (typeof s2 != "object" || s2 == null) return false;
  if (Object.getPrototypeOf(s2) === null) return true;
  if (Object.prototype.toString.call(s2) !== "[object Object]") {
    const e2 = s2[Symbol.toStringTag];
    return e2 == null || !((_a = Object.getOwnPropertyDescriptor(s2, Symbol.toStringTag)) == null ? void 0 : _a.writable) ? false : s2.toString() === `[object ${e2}]`;
  }
  let t = s2;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(s2) === t;
}
function ne(s2, ...t) {
  const e2 = t.slice(0, -1), i3 = t[t.length - 1];
  let n3 = s2;
  for (let a2 = 0; a2 < e2.length; a2++) {
    const r2 = e2[a2];
    n3 = F$1(n3, r2, i3, /* @__PURE__ */ new Map());
  }
  return n3;
}
function F$1(s2, t, e2, i3) {
  if (k$1(s2) && (s2 = Object(s2)), t == null || typeof t != "object") return s2;
  if (i3.has(t)) return _t(i3.get(t));
  if (i3.set(t, s2), Array.isArray(t)) {
    t = t.slice();
    for (let a2 = 0; a2 < t.length; a2++) t[a2] = t[a2] ?? void 0;
  }
  const n3 = [...Object.keys(t), ...rt(t)];
  for (let a2 = 0; a2 < n3.length; a2++) {
    const r2 = n3[a2];
    let c2 = t[r2], o3 = s2[r2];
    if (dt(c2) && (c2 = { ...c2 }), dt(o3) && (o3 = { ...o3 }), typeof Buffer < "u" && Buffer.isBuffer(c2) && (c2 = pt(c2)), Array.isArray(c2)) if (typeof o3 == "object" && o3 != null) {
      const w2 = [], v2 = Reflect.ownKeys(o3);
      for (let P3 = 0; P3 < v2.length; P3++) {
        const p2 = v2[P3];
        w2[p2] = o3[p2];
      }
      o3 = w2;
    } else o3 = [];
    const m3 = e2(o3, c2, r2, s2, t, i3);
    m3 != null ? s2[r2] = m3 : Array.isArray(c2) || it(o3) && it(c2) ? s2[r2] = F$1(o3, c2, e2, i3) : o3 == null && re(c2) ? s2[r2] = F$1({}, c2, e2, i3) : o3 == null && ie(c2) ? s2[r2] = pt(c2) : (o3 === void 0 || c2 !== void 0) && (s2[r2] = c2);
  }
  return s2;
}
function ae(s2, ...t) {
  return ne(s2, ...t, Rt);
}
var ce = Object.defineProperty, oe = Object.defineProperties, he = Object.getOwnPropertyDescriptors, ut = Object.getOwnPropertySymbols, pe = Object.prototype.hasOwnProperty, de = Object.prototype.propertyIsEnumerable, lt = (s2, t, e2) => t in s2 ? ce(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, L$1 = (s2, t) => {
  for (var e2 in t || (t = {})) pe.call(t, e2) && lt(s2, e2, t[e2]);
  if (ut) for (var e2 of ut(t)) de.call(t, e2) && lt(s2, e2, t[e2]);
  return s2;
}, ue = (s2, t) => oe(s2, he(t));
function d3(s2, t, e2) {
  var i3;
  const n3 = Ne$1(s2);
  return ((i3 = t.rpcMap) == null ? void 0 : i3[n3.reference]) || `${st$1}?chainId=${n3.namespace}:${n3.reference}&projectId=${e2}`;
}
function b$1(s2) {
  return s2.includes(":") ? s2.split(":")[1] : s2;
}
function ft(s2) {
  return s2.map((t) => `${t.split(":")[0]}:${t.split(":")[1]}`);
}
function le(s2, t) {
  const e2 = Object.keys(t.namespaces).filter((n3) => n3.includes(s2));
  if (!e2.length) return [];
  const i3 = [];
  return e2.forEach((n3) => {
    const a2 = t.namespaces[n3].accounts;
    i3.push(...a2);
  }), i3;
}
function M$1(s2 = {}, t = {}) {
  const e2 = mt(s2), i3 = mt(t);
  return ae(e2, i3);
}
function mt(s2) {
  var t, e2, i3, n3, a2;
  const r2 = {};
  if (!Oe$1(s2)) return r2;
  for (const [c2, o3] of Object.entries(s2)) {
    const m3 = yn$1(c2) ? [c2] : o3.chains, w2 = o3.methods || [], v2 = o3.events || [], P3 = o3.rpcMap || {}, p2 = yo$1(c2);
    r2[p2] = ue(L$1(L$1({}, r2[p2]), o3), { chains: ot$1(m3, (t = r2[p2]) == null ? void 0 : t.chains), methods: ot$1(w2, (e2 = r2[p2]) == null ? void 0 : e2.methods), events: ot$1(v2, (i3 = r2[p2]) == null ? void 0 : i3.events) }), (Oe$1(P3) || Oe$1(((n3 = r2[p2]) == null ? void 0 : n3.rpcMap) || {})) && (r2[p2].rpcMap = L$1(L$1({}, P3), (a2 = r2[p2]) == null ? void 0 : a2.rpcMap));
  }
  return r2;
}
function vt(s2) {
  return s2.includes(":") ? s2.split(":")[2] : s2;
}
function gt(s2) {
  const t = {};
  for (const [e2, i3] of Object.entries(s2)) {
    const n3 = i3.methods || [], a2 = i3.events || [], r2 = i3.accounts || [], c2 = yn$1(e2) ? [e2] : i3.chains ? i3.chains : ft(i3.accounts);
    t[e2] = { chains: c2, methods: n3, events: a2, accounts: r2 };
  }
  return t;
}
function K$1(s2) {
  return typeof s2 == "number" ? s2 : s2.includes("0x") ? parseInt(s2, 16) : (s2 = s2.includes(":") ? s2.split(":")[1] : s2, isNaN(Number(s2)) ? s2 : Number(s2));
}
const Pt = {}, h3 = (s2) => Pt[s2], V$1 = (s2, t) => {
  Pt[s2] = t;
};
var fe = Object.defineProperty, me = (s2, t, e2) => t in s2 ? fe(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, O3 = (s2, t, e2) => me(s2, typeof t != "symbol" ? t + "" : t, e2);
class ve {
  constructor(t) {
    O3(this, "name", "polkadot"), O3(this, "client"), O3(this, "httpProviders"), O3(this, "events"), O3(this, "namespace"), O3(this, "chainId"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i3;
      const n3 = b$1(e2);
      t[n3] = this.createHttpProvider(n3, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || d3(t, this.namespace, this.client.core.projectId);
    if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o$1(new f$1(i3, h3("disableProviderPing")));
  }
}
var ge = Object.defineProperty, Pe = Object.defineProperties, we = Object.getOwnPropertyDescriptors, wt = Object.getOwnPropertySymbols, ye = Object.prototype.hasOwnProperty, be = Object.prototype.propertyIsEnumerable, X$1 = (s2, t, e2) => t in s2 ? ge(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, yt = (s2, t) => {
  for (var e2 in t || (t = {})) ye.call(t, e2) && X$1(s2, e2, t[e2]);
  if (wt) for (var e2 of wt(t)) be.call(t, e2) && X$1(s2, e2, t[e2]);
  return s2;
}, bt = (s2, t) => Pe(s2, we(t)), A$1 = (s2, t, e2) => X$1(s2, typeof t != "symbol" ? t + "" : t, e2);
class Ie {
  constructor(t) {
    A$1(this, "name", "eip155"), A$1(this, "client"), A$1(this, "chainId"), A$1(this, "namespace"), A$1(this, "httpProviders"), A$1(this, "events"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
  }
  async request(t) {
    switch (t.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(t);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
      case "wallet_getCapabilities":
        return await this.getCapabilities(t);
      case "wallet_getCallsStatus":
        return await this.getCallStatus(t);
    }
    return this.namespace.methods.includes(t.request.method) ? await this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(parseInt(t), e2), this.chainId = parseInt(t), this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || d3(`${this.name}:${t}`, this.namespace, this.client.core.projectId);
    if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o$1(new f$1(i3, h3("disableProviderPing")));
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i3;
      const n3 = parseInt(b$1(e2));
      t[n3] = this.createHttpProvider(n3, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[e2]);
    }), t;
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const t = this.chainId, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  async handleSwitchChain(t) {
    var e2, i3;
    let n3 = t.request.params ? (e2 = t.request.params[0]) == null ? void 0 : e2.chainId : "0x0";
    n3 = n3.startsWith("0x") ? n3 : `0x${n3}`;
    const a2 = parseInt(n3, 16);
    if (this.isChainApproved(a2)) this.setDefaultChain(`${a2}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({ topic: t.topic, request: { method: t.request.method, params: [{ chainId: n3 }] }, chainId: (i3 = this.namespace.chains) == null ? void 0 : i3[0] }), this.setDefaultChain(`${a2}`);
    else throw new Error(`Failed to switch to chain 'eip155:${a2}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(t) {
    return this.namespace.chains.includes(`${this.name}:${t}`);
  }
  async getCapabilities(t) {
    var e2, i3, n3, a2, r2;
    const c2 = (i3 = (e2 = t.request) == null ? void 0 : e2.params) == null ? void 0 : i3[0], o3 = ((a2 = (n3 = t.request) == null ? void 0 : n3.params) == null ? void 0 : a2[1]) || [], m3 = `${c2}${o3.join(",")}`;
    if (!c2) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const w2 = this.client.session.get(t.topic), v2 = ((r2 = w2 == null ? void 0 : w2.sessionProperties) == null ? void 0 : r2.capabilities) || {};
    if (v2 != null && v2[m3]) return v2 == null ? void 0 : v2[m3];
    const P3 = await this.client.request(t);
    try {
      await this.client.session.update(t.topic, { sessionProperties: bt(yt({}, w2.sessionProperties || {}), { capabilities: bt(yt({}, v2 || {}), { [m3]: P3 }) }) });
    } catch (p2) {
      console.warn("Failed to update session with capabilities", p2);
    }
    return P3;
  }
  async getCallStatus(t) {
    var e2, i3;
    const n3 = this.client.session.get(t.topic), a2 = (e2 = n3.sessionProperties) == null ? void 0 : e2.bundler_name;
    if (a2) {
      const c2 = this.getBundlerUrl(t.chainId, a2);
      try {
        return await this.getUserOperationReceipt(c2, t);
      } catch (o3) {
        console.warn("Failed to fetch call status from bundler", o3, c2);
      }
    }
    const r2 = (i3 = n3.sessionProperties) == null ? void 0 : i3.bundler_url;
    if (r2) try {
      return await this.getUserOperationReceipt(r2, t);
    } catch (c2) {
      console.warn("Failed to fetch call status from custom bundler", c2, r2);
    }
    if (this.namespace.methods.includes(t.request.method)) return await this.client.request(t);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(t, e2) {
    var i3;
    const n3 = new URL(t), a2 = await fetch(n3, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formatJsonRpcRequest("eth_getUserOperationReceipt", [(i3 = e2.request.params) == null ? void 0 : i3[0]])) });
    if (!a2.ok) throw new Error(`Failed to fetch user operation receipt - ${a2.status}`);
    return await a2.json();
  }
  getBundlerUrl(t, e2) {
    return `${jt}?projectId=${this.client.core.projectId}&chainId=${t}&bundler=${e2}`;
  }
}
var $e = Object.defineProperty, Oe = (s2, t, e2) => t in s2 ? $e(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, C$1 = (s2, t, e2) => Oe(s2, typeof t != "symbol" ? t + "" : t, e2);
class Ae {
  constructor(t) {
    C$1(this, "name", "solana"), C$1(this, "client"), C$1(this, "httpProviders"), C$1(this, "events"), C$1(this, "namespace"), C$1(this, "chainId"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i3;
      const n3 = b$1(e2);
      t[n3] = this.createHttpProvider(n3, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || d3(t, this.namespace, this.client.core.projectId);
    if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o$1(new f$1(i3, h3("disableProviderPing")));
  }
}
var Ce = Object.defineProperty, He = (s2, t, e2) => t in s2 ? Ce(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, H$1 = (s2, t, e2) => He(s2, typeof t != "symbol" ? t + "" : t, e2);
class Ee2 {
  constructor(t) {
    H$1(this, "name", "cosmos"), H$1(this, "client"), H$1(this, "httpProviders"), H$1(this, "events"), H$1(this, "namespace"), H$1(this, "chainId"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i3;
      const n3 = b$1(e2);
      t[n3] = this.createHttpProvider(n3, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || d3(t, this.namespace, this.client.core.projectId);
    if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o$1(new f$1(i3, h3("disableProviderPing")));
  }
}
var Ne = Object.defineProperty, Se = (s2, t, e2) => t in s2 ? Ne(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, E$1 = (s2, t, e2) => Se(s2, typeof t != "symbol" ? t + "" : t, e2);
class De {
  constructor(t) {
    E$1(this, "name", "algorand"), E$1(this, "client"), E$1(this, "httpProviders"), E$1(this, "events"), E$1(this, "namespace"), E$1(this, "chainId"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    if (!this.httpProviders[t]) {
      const i3 = e2 || d3(`${this.name}:${t}`, this.namespace, this.client.core.projectId);
      if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
      this.setHttpProvider(t, i3);
    }
    this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i3;
      t[e2] = this.createHttpProvider(e2, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || d3(t, this.namespace, this.client.core.projectId);
    return typeof i3 > "u" ? void 0 : new o$1(new f$1(i3, h3("disableProviderPing")));
  }
}
var qe = Object.defineProperty, je = (s2, t, e2) => t in s2 ? qe(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, N = (s2, t, e2) => je(s2, typeof t != "symbol" ? t + "" : t, e2);
class Re {
  constructor(t) {
    N(this, "name", "cip34"), N(this, "client"), N(this, "httpProviders"), N(this, "events"), N(this, "namespace"), N(this, "chainId"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      const i3 = this.getCardanoRPCUrl(e2), n3 = b$1(e2);
      t[n3] = this.createHttpProvider(n3, i3);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  getCardanoRPCUrl(t) {
    const e2 = this.namespace.rpcMap;
    if (e2) return e2[t];
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || this.getCardanoRPCUrl(t);
    if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o$1(new f$1(i3, h3("disableProviderPing")));
  }
}
var _e = Object.defineProperty, Ue = (s2, t, e2) => t in s2 ? _e(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, S$1 = (s2, t, e2) => Ue(s2, typeof t != "symbol" ? t + "" : t, e2);
class Fe {
  constructor(t) {
    S$1(this, "name", "elrond"), S$1(this, "client"), S$1(this, "httpProviders"), S$1(this, "events"), S$1(this, "namespace"), S$1(this, "chainId"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i3;
      const n3 = b$1(e2);
      t[n3] = this.createHttpProvider(n3, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || d3(t, this.namespace, this.client.core.projectId);
    if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o$1(new f$1(i3, h3("disableProviderPing")));
  }
}
var Le = Object.defineProperty, Me = (s2, t, e2) => t in s2 ? Le(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, D$1 = (s2, t, e2) => Me(s2, typeof t != "symbol" ? t + "" : t, e2);
class xe {
  constructor(t) {
    D$1(this, "name", "multiversx"), D$1(this, "client"), D$1(this, "httpProviders"), D$1(this, "events"), D$1(this, "namespace"), D$1(this, "chainId"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i3;
      const n3 = b$1(e2);
      t[n3] = this.createHttpProvider(n3, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || d3(t, this.namespace, this.client.core.projectId);
    if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o$1(new f$1(i3, h3("disableProviderPing")));
  }
}
var Be = Object.defineProperty, Ge = (s2, t, e2) => t in s2 ? Be(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, q$1 = (s2, t, e2) => Ge(s2, typeof t != "symbol" ? t + "" : t, e2);
class Je {
  constructor(t) {
    q$1(this, "name", "near"), q$1(this, "client"), q$1(this, "httpProviders"), q$1(this, "events"), q$1(this, "namespace"), q$1(this, "chainId"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    if (this.chainId = t, !this.httpProviders[t]) {
      const i3 = e2 || d3(`${this.name}:${t}`, this.namespace);
      if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
      this.setHttpProvider(t, i3);
    }
    this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i3;
      t[e2] = this.createHttpProvider(e2, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || d3(t, this.namespace);
    return typeof i3 > "u" ? void 0 : new o$1(new f$1(i3, h3("disableProviderPing")));
  }
}
var ze = Object.defineProperty, ke2 = (s2, t, e2) => t in s2 ? ze(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, j = (s2, t, e2) => ke2(s2, typeof t != "symbol" ? t + "" : t, e2);
class We {
  constructor(t) {
    j(this, "name", "tezos"), j(this, "client"), j(this, "httpProviders"), j(this, "events"), j(this, "namespace"), j(this, "chainId"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    if (this.chainId = t, !this.httpProviders[t]) {
      const i3 = e2 || d3(`${this.name}:${t}`, this.namespace);
      if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
      this.setHttpProvider(t, i3);
    }
    this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      t[e2] = this.createHttpProvider(e2);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || d3(t, this.namespace);
    return typeof i3 > "u" ? void 0 : new o$1(new f$1(i3));
  }
}
var Ke = Object.defineProperty, Ve = (s2, t, e2) => t in s2 ? Ke(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, R$1 = (s2, t, e2) => Ve(s2, typeof t != "symbol" ? t + "" : t, e2);
class Xe {
  constructor(t) {
    R$1(this, "name", I$1), R$1(this, "client"), R$1(this, "httpProviders"), R$1(this, "events"), R$1(this, "namespace"), R$1(this, "chainId"), this.namespace = t.namespace, this.events = h3("events"), this.client = h3("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(t.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(t.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(t.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(t.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider(t.chainId).request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    var t, e2;
    const i3 = {};
    return (e2 = (t = this.namespace) == null ? void 0 : t.accounts) == null || e2.forEach((n3) => {
      const a2 = Ne$1(n3);
      i3[`${a2.namespace}:${a2.reference}`] = this.createHttpProvider(n3);
    }), i3;
  }
  getHttpProvider(t) {
    const e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i3 = this.createHttpProvider(t, e2);
    i3 && (this.httpProviders[t] = i3);
  }
  createHttpProvider(t, e2) {
    const i3 = e2 || d3(t, this.namespace, this.client.core.projectId);
    if (!i3) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o$1(new f$1(i3, h3("disableProviderPing")));
  }
}
var Ye = Object.defineProperty, Qe = Object.defineProperties, Ze = Object.getOwnPropertyDescriptors, It = Object.getOwnPropertySymbols, Te2 = Object.prototype.hasOwnProperty, ts = Object.prototype.propertyIsEnumerable, Y$1 = (s2, t, e2) => t in s2 ? Ye(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, x = (s2, t) => {
  for (var e2 in t || (t = {})) Te2.call(t, e2) && Y$1(s2, e2, t[e2]);
  if (It) for (var e2 of It(t)) ts.call(t, e2) && Y$1(s2, e2, t[e2]);
  return s2;
}, Q$1 = (s2, t) => Qe(s2, Ze(t)), l = (s2, t, e2) => Y$1(s2, typeof t != "symbol" ? t + "" : t, e2);
let B$1 = class B2 {
  constructor(t) {
    l(this, "client"), l(this, "namespaces"), l(this, "optionalNamespaces"), l(this, "sessionProperties"), l(this, "scopedProperties"), l(this, "events", new Nt$3()), l(this, "rpcProviders", {}), l(this, "session"), l(this, "providerOpts"), l(this, "logger"), l(this, "uri"), l(this, "disableProviderPing", false), this.providerOpts = t, this.logger = typeof (t == null ? void 0 : t.logger) < "u" && typeof (t == null ? void 0 : t.logger) != "string" ? t.logger : Ot$1(k$4({ level: (t == null ? void 0 : t.logger) || et$1 })), this.disableProviderPing = (t == null ? void 0 : t.disableProviderPing) || false;
  }
  static async init(t) {
    const e2 = new B2(t);
    return await e2.initialize(), e2;
  }
  async request(t, e2, i3) {
    const [n3, a2] = this.validateChain(e2);
    if (!this.session) throw new Error("Please call connect() before request()");
    return await this.getProvider(n3).request({ request: x({}, t), chainId: `${n3}:${a2}`, topic: this.session.topic, expiry: i3 });
  }
  sendAsync(t, e2, i3, n3) {
    const a2 = (/* @__PURE__ */ new Date()).getTime();
    this.request(t, i3, n3).then((r2) => e2(null, formatJsonRpcResult(a2, r2))).catch((r2) => e2(r2, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var t;
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (t = this.session) == null ? void 0 : t.topic, reason: Nt$1("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(t) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (this.setNamespaces(t), await this.cleanupPendingPairings(), !t.skipPairing) return await this.pair(t.pairingTopic);
  }
  async authenticate(t, e2) {
    if (!this.client) throw new Error("Sign Client not initialized");
    this.setNamespaces(t), await this.cleanupPendingPairings();
    const { uri: i3, response: n3 } = await this.client.authenticate(t, e2);
    i3 && (this.uri = i3, this.events.emit("display_uri", i3));
    const a2 = await n3();
    if (this.session = a2.session, this.session) {
      const r2 = gt(this.session.namespaces);
      this.namespaces = M$1(this.namespaces, r2), await this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return a2;
  }
  on(t, e2) {
    this.events.on(t, e2);
  }
  once(t, e2) {
    this.events.once(t, e2);
  }
  removeListener(t, e2) {
    this.events.removeListener(t, e2);
  }
  off(t, e2) {
    this.events.off(t, e2);
  }
  get isWalletConnect() {
    return true;
  }
  async pair(t) {
    const { uri: e2, approval: i3 } = await this.client.connect({ pairingTopic: t, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties });
    e2 && (this.uri = e2, this.events.emit("display_uri", e2));
    const n3 = await i3();
    this.session = n3;
    const a2 = gt(n3.namespaces);
    return this.namespaces = M$1(this.namespaces, a2), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
  }
  setDefaultChain(t, e2) {
    try {
      if (!this.session) return;
      const [i3, n3] = this.validateChain(t), a2 = this.getProvider(i3);
      a2.name === I$1 ? a2.setDefaultChain(`${i3}:${n3}`, e2) : a2.setDefaultChain(n3, e2);
    } catch (i3) {
      if (!/Please call connect/.test(i3.message)) throw i3;
    }
  }
  async cleanupPendingPairings(t = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const e2 = this.client.pairing.getAll();
    if (se$2(e2)) {
      for (const i3 of e2) t.deletePairings ? this.client.core.expirer.set(i3.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(i3.topic);
      this.logger.info(`Inactive pairings cleared: ${e2.length}`);
    }
  }
  abortPairingAttempt() {
    this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
  }
  async checkStorage() {
    this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.session && this.createProviders();
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    var t, e2;
    if (this.client = this.providerOpts.client || await Ee$1.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || et$1, relayUrl: this.providerOpts.relayUrl || St2, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.providerOpts.session) try {
      this.session = this.client.session.get(this.providerOpts.session.topic);
    } catch (i3) {
      throw this.logger.error("Failed to get session", i3), new Error(`The provided session: ${(e2 = (t = this.providerOpts) == null ? void 0 : t.session) == null ? void 0 : e2.topic} doesn't exist in the Sign client`);
    }
    else {
      const i3 = this.client.session.getAll();
      this.session = i3[0];
    }
    this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
    const t = [...new Set(Object.keys(this.session.namespaces).map((e2) => yo$1(e2)))];
    V$1("client", this.client), V$1("events", this.events), V$1("disableProviderPing", this.disableProviderPing), t.forEach((e2) => {
      if (!this.session) return;
      const i3 = le(e2, this.session), n3 = ft(i3), a2 = M$1(this.namespaces, this.optionalNamespaces), r2 = Q$1(x({}, a2[e2]), { accounts: i3, chains: n3 });
      switch (e2) {
        case "eip155":
          this.rpcProviders[e2] = new Ie({ namespace: r2 });
          break;
        case "algorand":
          this.rpcProviders[e2] = new De({ namespace: r2 });
          break;
        case "solana":
          this.rpcProviders[e2] = new Ae({ namespace: r2 });
          break;
        case "cosmos":
          this.rpcProviders[e2] = new Ee2({ namespace: r2 });
          break;
        case "polkadot":
          this.rpcProviders[e2] = new ve({ namespace: r2 });
          break;
        case "cip34":
          this.rpcProviders[e2] = new Re({ namespace: r2 });
          break;
        case "elrond":
          this.rpcProviders[e2] = new Fe({ namespace: r2 });
          break;
        case "multiversx":
          this.rpcProviders[e2] = new xe({ namespace: r2 });
          break;
        case "near":
          this.rpcProviders[e2] = new Je({ namespace: r2 });
          break;
        case "tezos":
          this.rpcProviders[e2] = new We({ namespace: r2 });
          break;
        default:
          this.rpcProviders[I$1] ? this.rpcProviders[I$1].updateNamespace(r2) : this.rpcProviders[I$1] = new Xe({ namespace: r2 });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (t) => {
      var e2;
      const { topic: i3 } = t;
      i3 === ((e2 = this.session) == null ? void 0 : e2.topic) && this.events.emit("session_ping", t);
    }), this.client.on("session_event", (t) => {
      var e2;
      const { params: i3, topic: n3 } = t;
      if (n3 !== ((e2 = this.session) == null ? void 0 : e2.topic)) return;
      const { event: a2 } = i3;
      if (a2.name === "accountsChanged") {
        const r2 = a2.data;
        r2 && se$2(r2) && this.events.emit("accountsChanged", r2.map(vt));
      } else if (a2.name === "chainChanged") {
        const r2 = i3.chainId, c2 = i3.event.data, o3 = yo$1(r2), m3 = K$1(r2) !== K$1(c2) ? `${o3}:${K$1(c2)}` : r2;
        this.onChainChanged(m3);
      } else this.events.emit(a2.name, a2.data);
      this.events.emit("session_event", t);
    }), this.client.on("session_update", ({ topic: t, params: e2 }) => {
      var i3, n3;
      if (t !== ((i3 = this.session) == null ? void 0 : i3.topic)) return;
      const { namespaces: a2 } = e2, r2 = (n3 = this.client) == null ? void 0 : n3.session.get(t);
      this.session = Q$1(x({}, r2), { namespaces: a2 }), this.onSessionUpdate(), this.events.emit("session_update", { topic: t, params: e2 });
    }), this.client.on("session_delete", async (t) => {
      var e2;
      t.topic === ((e2 = this.session) == null ? void 0 : e2.topic) && (await this.cleanup(), this.events.emit("session_delete", t), this.events.emit("disconnect", Q$1(x({}, Nt$1("USER_DISCONNECTED")), { data: t.topic })));
    }), this.on(u.DEFAULT_CHAIN_CHANGED, (t) => {
      this.onChainChanged(t, true);
    });
  }
  getProvider(t) {
    return this.rpcProviders[t] || this.rpcProviders[I$1];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((t) => {
      var e2;
      this.getProvider(t).updateNamespace((e2 = this.session) == null ? void 0 : e2.namespaces[t]);
    });
  }
  setNamespaces(t) {
    const { namespaces: e2 = {}, optionalNamespaces: i3 = {}, sessionProperties: n3, scopedProperties: a2 } = t;
    this.optionalNamespaces = M$1(e2, i3), this.sessionProperties = n3, this.scopedProperties = a2;
  }
  validateChain(t) {
    const [e2, i3] = (t == null ? void 0 : t.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [e2, i3];
    if (e2 && !Object.keys(this.namespaces || {}).map((r2) => yo$1(r2)).includes(e2)) throw new Error(`Namespace '${e2}' is not configured. Please call connect() first with namespace config.`);
    if (e2 && i3) return [e2, i3];
    const n3 = yo$1(Object.keys(this.namespaces)[0]), a2 = this.rpcProviders[n3].getDefaultChain();
    return [n3, a2];
  }
  async requestAccounts() {
    const [t] = this.validateChain();
    return await this.getProvider(t).requestAccounts();
  }
  async onChainChanged(t, e2 = false) {
    if (!this.namespaces) return;
    const [i3, n3] = this.validateChain(t);
    if (!n3) return;
    this.updateNamespaceChain(i3, n3), this.events.emit("chainChanged", n3);
    const a2 = this.getProvider(i3).getDefaultChain();
    e2 || this.getProvider(i3).setDefaultChain(n3), this.emitAccountsChangedOnChainChange({ namespace: i3, previousChainId: a2, newChainId: t }), await this.persist("namespaces", this.namespaces);
  }
  emitAccountsChangedOnChainChange({ namespace: t, previousChainId: e2, newChainId: i3 }) {
    var n3, a2;
    try {
      if (e2 === i3) return;
      const r2 = (a2 = (n3 = this.session) == null ? void 0 : n3.namespaces[t]) == null ? void 0 : a2.accounts;
      if (!r2) return;
      const c2 = r2.filter((o3) => o3.includes(`${i3}:`)).map(vt);
      if (!se$2(c2)) return;
      this.events.emit("accountsChanged", c2);
    } catch (r2) {
      this.logger.warn("Failed to emit accountsChanged on chain change", r2);
    }
  }
  updateNamespaceChain(t, e2) {
    if (!this.namespaces) return;
    const i3 = this.namespaces[t] ? t : `${t}:${e2}`, n3 = { chains: [], methods: [], events: [], defaultChain: e2 };
    this.namespaces[i3] ? this.namespaces[i3] && (this.namespaces[i3].defaultChain = e2) : this.namespaces[i3] = n3;
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, await this.cleanupPendingPairings({ deletePairings: true }), await this.cleanupStorage();
  }
  async persist(t, e2) {
    var i3;
    const n3 = ((i3 = this.session) == null ? void 0 : i3.topic) || "";
    await this.client.core.storage.setItem(`${U$1}/${t}${n3}`, e2);
  }
  async getFromStore(t) {
    var e2;
    const i3 = ((e2 = this.session) == null ? void 0 : e2.topic) || "";
    return await this.client.core.storage.getItem(`${U$1}/${t}${i3}`);
  }
  async deleteFromStore(t) {
    var e2;
    const i3 = ((e2 = this.session) == null ? void 0 : e2.topic) || "";
    await this.client.core.storage.removeItem(`${U$1}/${t}${i3}`);
  }
  async cleanupStorage() {
    var t;
    try {
      if (((t = this.client) == null ? void 0 : t.session.length) > 0) return;
      const e2 = await this.client.core.storage.getKeys();
      for (const i3 of e2) i3.startsWith(U$1) && await this.client.core.storage.removeItem(i3);
    } catch (e2) {
      this.logger.warn("Failed to cleanup storage", e2);
    }
  }
};
const es = B$1;
const $ = "wc", k = "ethereum_provider", q = `${$}@2:${k}:`, U = "https://rpc.walletconnect.org/v1/", f4 = ["eth_sendTransaction", "personal_sign"], A = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode", "wallet_sendCalls", "wallet_getCapabilities", "wallet_getCallsStatus", "wallet_showCallsStatus"], C = ["chainChanged", "accountsChanged"], P2 = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"], D = async () => {
  const { createAppKit: s2 } = await __vitePreload(() => import("./core-CqoQ9szM.js").then((n3) => n3.X), true ? __vite__mapDeps([5,1,2,3,4]) : void 0);
  return s2;
};
var z = Object.defineProperty, L2 = Object.defineProperties, K2 = Object.getOwnPropertyDescriptors, M2 = Object.getOwnPropertySymbols, Q = Object.prototype.hasOwnProperty, V2 = Object.prototype.propertyIsEnumerable, _2 = (s2, t, e2) => t in s2 ? z(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, v = (s2, t) => {
  for (var e2 in t || (t = {})) Q.call(t, e2) && _2(s2, e2, t[e2]);
  if (M2) for (var e2 of M2(t)) V2.call(t, e2) && _2(s2, e2, t[e2]);
  return s2;
}, w = (s2, t) => L2(s2, K2(t)), p = (s2, t, e2) => _2(s2, typeof t != "symbol" ? t + "" : t, e2);
function I2(s2) {
  return Number(s2[0].split(":")[1]);
}
function E(s2) {
  return `0x${s2.toString(16)}`;
}
function G(s2) {
  const { chains: t, optionalChains: e2, methods: n3, optionalMethods: i3, events: a2, optionalEvents: o3, rpcMap: u2 } = s2;
  if (!se$2(t)) throw new Error("Invalid chains");
  const c2 = { chains: t, methods: n3 || f4, events: a2 || C, rpcMap: v({}, t.length ? { [I2(t)]: u2[I2(t)] } : {}) }, l2 = a2 == null ? void 0 : a2.filter((d4) => !C.includes(d4)), r2 = n3 == null ? void 0 : n3.filter((d4) => !f4.includes(d4));
  if (!e2 && !o3 && !i3 && !(l2 != null && l2.length) && !(r2 != null && r2.length)) return { required: t.length ? c2 : void 0 };
  const m3 = (l2 == null ? void 0 : l2.length) && (r2 == null ? void 0 : r2.length) || !e2, h4 = { chains: [...new Set(m3 ? c2.chains.concat(e2 || []) : e2)], methods: [...new Set(c2.methods.concat(i3 != null && i3.length ? i3 : A))], events: [...new Set(c2.events.concat(o3 != null && o3.length ? o3 : P2))], rpcMap: u2 };
  return { required: t.length ? c2 : void 0, optional: e2.length ? h4 : void 0 };
}
class b {
  constructor() {
    p(this, "events", new eventsExports.EventEmitter()), p(this, "namespace", "eip155"), p(this, "accounts", []), p(this, "signer"), p(this, "chainId", 1), p(this, "modal"), p(this, "rpc"), p(this, "STORAGE_KEY", q), p(this, "on", (t, e2) => (this.events.on(t, e2), this)), p(this, "once", (t, e2) => (this.events.once(t, e2), this)), p(this, "removeListener", (t, e2) => (this.events.removeListener(t, e2), this)), p(this, "off", (t, e2) => (this.events.off(t, e2), this)), p(this, "parseAccount", (t) => this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t), this.signer = {}, this.rpc = {};
  }
  static async init(t) {
    const e2 = new b();
    return await e2.initialize(t), e2;
  }
  async request(t, e2) {
    return await this.signer.request(t, this.formatChainId(this.chainId), e2);
  }
  sendAsync(t, e2, n3) {
    this.signer.sendAsync(t, e2, this.formatChainId(this.chainId), n3);
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : false;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : false;
  }
  async enable() {
    return this.session || await this.connect(), await this.request({ method: "eth_requestAccounts" });
  }
  async connect(t) {
    var e2;
    if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(t);
    const { required: n3, optional: i3 } = G(this.rpc);
    try {
      const a2 = await new Promise(async (u2, c2) => {
        var l2, r2;
        this.rpc.showQrModal && ((l2 = this.modal) == null || l2.open(), (r2 = this.modal) == null || r2.subscribeState((h4) => {
          !h4.open && !this.signer.session && (this.signer.abortPairingAttempt(), c2(new Error("Connection request reset. Please try again.")));
        }));
        const m3 = t != null && t.scopedProperties ? { [this.namespace]: t.scopedProperties } : void 0;
        await this.signer.connect(w(v({ namespaces: v({}, n3 && { [this.namespace]: n3 }) }, i3 && { optionalNamespaces: { [this.namespace]: i3 } }), { pairingTopic: t == null ? void 0 : t.pairingTopic, scopedProperties: m3 })).then((h4) => {
          u2(h4);
        }).catch((h4) => {
          var d4;
          (d4 = this.modal) == null || d4.showErrorMessage("Unable to connect"), c2(new Error(h4.message));
        });
      });
      if (!a2) return;
      const o3 = Ko$1(a2.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : o3), this.setAccounts(o3), this.events.emit("connect", { chainId: E(this.chainId) });
    } catch (a2) {
      throw this.signer.logger.error(a2), a2;
    } finally {
      (e2 = this.modal) == null || e2.close();
    }
  }
  async authenticate(t, e2) {
    var n3;
    if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts({ chains: t == null ? void 0 : t.chains });
    try {
      const i3 = await new Promise(async (o3, u2) => {
        var c2, l2;
        this.rpc.showQrModal && ((c2 = this.modal) == null || c2.open(), (l2 = this.modal) == null || l2.subscribeState((r2) => {
          !r2.open && !this.signer.session && (this.signer.abortPairingAttempt(), u2(new Error("Connection request reset. Please try again.")));
        })), await this.signer.authenticate(w(v({}, t), { chains: this.rpc.chains }), e2).then((r2) => {
          o3(r2);
        }).catch((r2) => {
          var m3;
          (m3 = this.modal) == null || m3.showErrorMessage("Unable to connect"), u2(new Error(r2.message));
        });
      }), a2 = i3.session;
      if (a2) {
        const o3 = Ko$1(a2.namespaces, [this.namespace]);
        this.setChainIds(this.rpc.chains.length ? this.rpc.chains : o3), this.setAccounts(o3), this.events.emit("connect", { chainId: E(this.chainId) });
      }
      return i3;
    } catch (i3) {
      throw this.signer.logger.error(i3), i3;
    } finally {
      (n3 = this.modal) == null || n3.close();
    }
  }
  async disconnect() {
    this.session && await this.signer.disconnect(), this.reset();
  }
  get isWalletConnect() {
    return true;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (t) => {
      const { params: e2 } = t, { event: n3 } = e2;
      n3.name === "accountsChanged" ? (this.accounts = this.parseAccounts(n3.data), this.events.emit("accountsChanged", this.accounts)) : n3.name === "chainChanged" ? this.setChainId(this.formatChainId(n3.data)) : this.events.emit(n3.name, n3.data), this.events.emit("session_event", t);
    }), this.signer.on("accountsChanged", (t) => {
      this.accounts = this.parseAccounts(t), this.events.emit("accountsChanged", this.accounts);
    }), this.signer.on("chainChanged", (t) => {
      const e2 = parseInt(t);
      this.chainId = e2, this.events.emit("chainChanged", E(this.chainId)), this.persist();
    }), this.signer.on("session_update", (t) => {
      this.events.emit("session_update", t);
    }), this.signer.on("session_delete", (t) => {
      this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", w(v({}, Nt$1("USER_DISCONNECTED")), { data: t.topic, name: "USER_DISCONNECTED" }));
    }), this.signer.on("display_uri", (t) => {
      this.events.emit("display_uri", t);
    });
  }
  switchEthereumChain(t) {
    this.request({ method: "wallet_switchEthereumChain", params: [{ chainId: t.toString(16) }] });
  }
  isCompatibleChainId(t) {
    return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : false;
  }
  formatChainId(t) {
    return `${this.namespace}:${t}`;
  }
  parseChainId(t) {
    return Number(t.split(":")[1]);
  }
  setChainIds(t) {
    const e2 = t.filter((n3) => this.isCompatibleChainId(n3)).map((n3) => this.parseChainId(n3));
    e2.length && (this.chainId = e2[0], this.events.emit("chainChanged", E(this.chainId)), this.persist());
  }
  setChainId(t) {
    if (this.isCompatibleChainId(t)) {
      const e2 = this.parseChainId(t);
      this.chainId = e2, this.switchEthereumChain(e2);
    }
  }
  parseAccountId(t) {
    const [e2, n3, i3] = t.split(":");
    return { chainId: `${e2}:${n3}`, address: i3 };
  }
  setAccounts(t) {
    this.accounts = t.filter((e2) => this.parseChainId(this.parseAccountId(e2).chainId) === this.chainId).map((e2) => this.parseAccountId(e2).address), this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(t) {
    var e2, n3;
    const i3 = (e2 = t == null ? void 0 : t.chains) != null ? e2 : [], a2 = (n3 = t == null ? void 0 : t.optionalChains) != null ? n3 : [], o3 = i3.concat(a2);
    if (!o3.length) throw new Error("No chains specified in either `chains` or `optionalChains`");
    const u2 = i3.length ? (t == null ? void 0 : t.methods) || f4 : [], c2 = i3.length ? (t == null ? void 0 : t.events) || C : [], l2 = (t == null ? void 0 : t.optionalMethods) || [], r2 = (t == null ? void 0 : t.optionalEvents) || [], m3 = (t == null ? void 0 : t.rpcMap) || this.buildRpcMap(o3, t.projectId), h4 = (t == null ? void 0 : t.qrModalOptions) || void 0;
    return { chains: i3 == null ? void 0 : i3.map((d4) => this.formatChainId(d4)), optionalChains: a2.map((d4) => this.formatChainId(d4)), methods: u2, events: c2, optionalMethods: l2, optionalEvents: r2, rpcMap: m3, showQrModal: !!(t != null && t.showQrModal), qrModalOptions: h4, projectId: t.projectId, metadata: t.metadata };
  }
  buildRpcMap(t, e2) {
    const n3 = {};
    return t.forEach((i3) => {
      n3[i3] = this.getRpcUrl(i3, e2);
    }), n3;
  }
  async initialize(t) {
    if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? I2(this.rpc.chains) : I2(this.rpc.optionalChains), this.signer = await es.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: t.disableProviderPing, relayUrl: t.relayUrl, storage: t.storage, storageOptions: t.storageOptions, customStoragePrefix: t.customStoragePrefix, telemetryEnabled: t.telemetryEnabled, logger: t.logger }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
      let e2;
      try {
        const n3 = await D(), { convertWCMToAppKitOptions: i3 } = await Promise.resolve().then(function() {
          return nt;
        }), a2 = i3(w(v({}, this.rpc.qrModalOptions), { chains: [.../* @__PURE__ */ new Set([...this.rpc.chains, ...this.rpc.optionalChains])], metadata: this.rpc.metadata, projectId: this.rpc.projectId }));
        if (!a2.networks.length) throw new Error("No networks found for WalletConnect·");
        e2 = n3(w(v({}, a2), { universalProvider: this.signer, manualWCControl: true }));
      } catch (n3) {
        throw console.warn(n3), new Error("To use QR modal, please install @reown/appkit package");
      }
      if (e2) try {
        this.modal = e2;
      } catch (n3) {
        throw this.signer.logger.error(n3), new Error("Could not generate WalletConnectModal Instance");
      }
    }
  }
  loadConnectOpts(t) {
    if (!t) return;
    const { chains: e2, optionalChains: n3, rpcMap: i3 } = t;
    e2 && se$2(e2) && (this.rpc.chains = e2.map((a2) => this.formatChainId(a2)), e2.forEach((a2) => {
      this.rpc.rpcMap[a2] = (i3 == null ? void 0 : i3[a2]) || this.getRpcUrl(a2);
    })), n3 && se$2(n3) && (this.rpc.optionalChains = [], this.rpc.optionalChains = n3 == null ? void 0 : n3.map((a2) => this.formatChainId(a2)), n3.forEach((a2) => {
      this.rpc.rpcMap[a2] = (i3 == null ? void 0 : i3[a2]) || this.getRpcUrl(a2);
    }));
  }
  getRpcUrl(t, e2) {
    var n3;
    return ((n3 = this.rpc.rpcMap) == null ? void 0 : n3[t]) || `${U}?chainId=eip155:${t}&projectId=${e2 || this.rpc.projectId}`;
  }
  async loadPersistedSession() {
    if (this.session) try {
      const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), e2 = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
      this.setChainIds(t ? [this.formatChainId(t)] : e2 == null ? void 0 : e2.accounts), this.setAccounts(e2 == null ? void 0 : e2.accounts);
    } catch (t) {
      this.signer.logger.error("Failed to load persisted session, clearing state..."), this.signer.logger.error(t), await this.disconnect().catch((e2) => this.signer.logger.warn(e2));
    }
  }
  reset() {
    this.chainId = 1, this.accounts = [];
  }
  persist() {
    this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
  }
  parseAccounts(t) {
    return typeof t == "string" || t instanceof String ? [this.parseAccount(t)] : t.map((e2) => this.parseAccount(e2));
  }
}
const Y = b;
var H = Object.defineProperty, B3 = Object.defineProperties, F = Object.getOwnPropertyDescriptors, S2 = Object.getOwnPropertySymbols, X = Object.prototype.hasOwnProperty, J2 = Object.prototype.propertyIsEnumerable, T = (s2, t, e2) => t in s2 ? H(s2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t] = e2, R2 = (s2, t) => {
  for (var e2 in t || (t = {})) X.call(t, e2) && T(s2, e2, t[e2]);
  if (S2) for (var e2 of S2(t)) J2.call(t, e2) && T(s2, e2, t[e2]);
  return s2;
}, Z = (s2, t) => B3(s2, F(t));
function tt(s2) {
  if (s2) return { "--w3m-font-family": s2["--wcm-font-family"], "--w3m-accent": s2["--wcm-accent-color"], "--w3m-color-mix": s2["--wcm-background-color"], "--w3m-z-index": s2["--wcm-z-index"] ? Number(s2["--wcm-z-index"]) : void 0, "--w3m-qr-color": s2["--wcm-accent-color"], "--w3m-font-size-master": s2["--wcm-text-medium-regular-size"], "--w3m-border-radius-master": s2["--wcm-container-border-radius"], "--w3m-color-mix-strength": 0 };
}
const et = (s2) => {
  const [t, e2] = s2.split(":");
  return W({ id: e2, caipNetworkId: s2, chainNamespace: t, name: "", nativeCurrency: { name: "", symbol: "", decimals: 8 }, rpcUrls: { default: { http: ["https://rpc.walletconnect.org/v1"] } } });
};
function st(s2) {
  var t, e2, n3, i3, a2, o3, u2;
  const c2 = (t = s2.chains) == null ? void 0 : t.map(et).filter(Boolean);
  if (c2.length === 0) throw new Error("At least one chain must be specified");
  const l2 = c2.find((m3) => {
    var h4;
    return m3.id === ((h4 = s2.defaultChain) == null ? void 0 : h4.id);
  }), r2 = { projectId: s2.projectId, networks: c2, themeMode: s2.themeMode, themeVariables: tt(s2.themeVariables), chainImages: s2.chainImages, connectorImages: s2.walletImages, defaultNetwork: l2, metadata: Z(R2({}, s2.metadata), { name: ((e2 = s2.metadata) == null ? void 0 : e2.name) || "WalletConnect", description: ((n3 = s2.metadata) == null ? void 0 : n3.description) || "Connect to WalletConnect-compatible wallets", url: ((i3 = s2.metadata) == null ? void 0 : i3.url) || "https://walletconnect.org", icons: ((a2 = s2.metadata) == null ? void 0 : a2.icons) || ["https://walletconnect.org/walletconnect-logo.png"] }), showWallets: true, featuredWalletIds: s2.explorerRecommendedWalletIds === "NONE" ? [] : Array.isArray(s2.explorerRecommendedWalletIds) ? s2.explorerRecommendedWalletIds : [], excludeWalletIds: s2.explorerExcludedWalletIds === "ALL" ? [] : Array.isArray(s2.explorerExcludedWalletIds) ? s2.explorerExcludedWalletIds : [], enableEIP6963: false, enableInjected: false, enableCoinbase: true, enableWalletConnect: true, features: { email: false, socials: false } };
  if ((o3 = s2.mobileWallets) != null && o3.length || (u2 = s2.desktopWallets) != null && u2.length) {
    const m3 = [...(s2.mobileWallets || []).map((g2) => ({ id: g2.id, name: g2.name, links: g2.links })), ...(s2.desktopWallets || []).map((g2) => ({ id: g2.id, name: g2.name, links: { native: g2.links.native, universal: g2.links.universal } }))], h4 = [...r2.featuredWalletIds || [], ...r2.excludeWalletIds || []], d4 = m3.filter((g2) => !h4.includes(g2.id));
    d4.length && (r2.customWallets = d4);
  }
  return r2;
}
function W(s2) {
  return R2({ formatters: void 0, fees: void 0, serializers: void 0 }, s2);
}
var nt = Object.freeze({ __proto__: null, convertWCMToAppKitOptions: st, defineChain: W });
const index_es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EthereumProvider: Y,
  OPTIONAL_EVENTS: P2,
  OPTIONAL_METHODS: A,
  REQUIRED_EVENTS: C,
  REQUIRED_METHODS: f4,
  default: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  A$3 as A,
  o$1 as B,
  C$4 as C,
  f$3 as D,
  E$5 as E,
  isJsonRpcRequest as F,
  isJsonRpcResponse as G,
  Hash as H,
  IEvents as I,
  formatJsonRpcResult as J,
  r$1 as K,
  formatJsonRpcRequest as L,
  Qo as M,
  getBigIntRpcId as N,
  Ot$1 as O,
  Po$1 as P,
  Qe$3 as Q,
  formatJsonRpcError as R,
  isJsonRpcResult as S,
  isJsonRpcError as T,
  payloadId as U,
  f$1 as V,
  index_es as W,
  aexists as a,
  aoutput as b,
  createView as c,
  ahash as d,
  abytes as e,
  concatBytes as f,
  randomBytes as g,
  destr as h,
  safeJsonParse as i,
  getWindowMetadata_1 as j,
  cjs$3 as k,
  fromString as l,
  toString as m,
  getDocument_1 as n,
  getNavigator_1 as o,
  detect as p,
  getLocation_1 as q,
  rotr as r,
  safeJsonStringify as s,
  toBytes as t,
  concat as u,
  sn$2 as v,
  wrapConstructor as w,
  k$4 as x,
  y$3 as y,
  i$2 as z
};
