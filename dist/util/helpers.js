"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeGet = safeGet;
exports.toObjectId = toObjectId;
exports.generateObjectId = generateObjectId;
exports.setLimit = setLimit;
exports.pmtName = pmtName;
exports.timestamp = timestamp;
exports.dateDaysAgo = dateDaysAgo;
exports.randomNum = randomNum;
exports.cloneObject = cloneObject;
exports.getObjectByKey = getObjectByKey;
exports.getSettings = getSettings;
exports["default"] = addToArrayOfObjects;
exports.getClientAccess = getClientAccess;
exports.isRealValue = isRealValue;
exports.hasProp = hasProp;
exports.isObjecId = isObjecId;
exports.generateOtp = generateOtp;
exports.hash = hash;
exports.cleanDeepObject = cleanDeepObject;
exports.cleanObject = cleanObject;
exports.removeDuplicates = removeDuplicates;
exports.nextDate = nextDate;
exports.genCode = genCode;
exports.generateCode = generateCode;
exports.hasNull = hasNull;
exports.formatPhone = formatPhone;
exports.stringToArrayPhone = stringToArrayPhone;
exports.getRequestIp = getRequestIp;
exports.getFullname = getFullname;
exports.titleCase = titleCase;
exports.calcTax = calcTax;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function safeGet() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prop = arguments.length > 1 ? arguments[1] : undefined;
  return Object.assign({}, obj)[prop] || '';
}

function toObjectId() {
  var baseId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '5951bc91860d8b5ba';
  var mysqlId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var oldId = mysqlId.toString(10);
  var a = oldId.length < 7 ? '0'.repeat(7 - oldId.length) : '0';
  return baseId + a + oldId;
}
/**
 * generateObjectId() creates a uuid for a record using the terminalId
 * @param {string} terminal ObjectId
 */


function generateObjectId() {
  var terminal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '5c51bc91860d8b5bc0000001';
  var presently = Date.now();
  var last3Chars = terminal.substr(terminal.length - 3);
  var str1 = genString(4, 'abcdef');
  var str2 = genString(4, 'abcdef');
  var id = str1 + presently + str2 + last3Chars;
  return id;
}

function setLimit(inputlimit) {
  var limit = parseInt(inputlimit, 10); // eslint-disable-next-line no-restricted-globals

  return isNaN(limit) || limit == null || limit > 5000 || limit === 0 ? 5000 : limit;
}

function pmtName(mysqlId) {
  if (mysqlId) {
    var oldId = mysqlId.toString(10);
    var a = '0'.repeat(4 - oldId.length);
    return a + oldId;
  }

  return mysqlId;
}

function timestamp() {
  return "".concat(new Date().toISOString().slice(0, 22), "Z"); //   return new Date().toISOString().slice(0, 19).replace("T", " ")+"Z";
}

function dateDaysAgo() {
  var since = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var today = new Date();
  today.setDate(today.getDate() - since);
  return today.toISOString();
}

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

function cloneObject() {
  var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var source = arguments.length > 1 ? arguments[1] : undefined;
  return Object.assign(model, source);
}
/**
 * @description getObjectByKey returns the object from an Array of
 * Objects that has the key with a given value or undefined!
 * @param {Array} arrayObject Array of Objects
 * @param {String} key Object key could be a String or Integer
 * @param {String} value Object value could be a String or Integer
 */


function getObjectByKey(arrayObject, key, value) {
  return arrayObject.find(function (obj) {
    return obj[key] === value;
  });
}

function getSettings() {
  var arrObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var Obj = arrObj.find(function (item) {
    return item.name === value;
  });

  if (Obj) {
    return Obj.value;
  }

  return 0;
}
/**
 * @description addToArrayOfObjects add a new object item to an array of objects
 * @param {Object} arrayOfObjects the array of object
 * @param {Number} limit maximum number of objects the array should not exceed
 * @param {Object} newObjectElement the new item to be added to the array of objects
 * @returns {Object} the new array of Objects
 */


function addToArrayOfObjects(arrayOfObjects, limit, newObjectElement) {
  var size = Object.keys(arrayOfObjects).length;

  if (size < limit) {
    arrayOfObjects.push(newObjectElement);
  } else {
    // arr.splice(indexToRemove, numToRemove)
    arrayOfObjects.splice(0, 1);
    arrayOfObjects.push(newObjectElement);
  }

  return arrayOfObjects;
}
/**
 * @description getClientAccess get the Ip Address and TimeSTamp of a request object.
 * @param {String} req the request object
 * @returns {Object} { accessDate, ipAddress } access date and the ip address
 */


function getClientAccess(req) {
  var ipAddress = req.ip || req._remoteAddress; // const lang = req.get("accept-language");

  var accessDate = req._startTime || '';
  return {
    accessDate: accessDate,
    ipAddress: ipAddress
  };
}

function isRealValue(object) {
  return typeof object !== 'undefined' || object !== null;
}

function hasProp(obj, prop) {
  if (!isRealValue(obj)) return false;
  return obj[prop] !== undefined; // return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isObjecId(id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) return true;
  return false;
}
/**
 * @returns a six-digit random number
 */


function generateOtp() {
  var num = Math.floor(Math.random() * 900000) + 100000;
  return num;
}

function hash() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return _bcryptjs["default"].hashSync(str, _constants.JWT.saltRounds);
}

function cleanDeepObject(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (var propName in obj) {
    if (!obj[propName] || obj[propName].length === 0) {
      delete obj[propName];
    } else if (_typeof(obj) === 'object') {
      cleanDeepObject(obj[propName]);
    }
  }

  return obj;
}

var depth = 0; // eslint-disable-next-line complexity

function cleanObject(obj) {
  depth += 1; // eslint-disable-next-line no-restricted-syntax

  for (var propName in obj) {
    if (!obj[propName] || obj[propName].length === 0) {
      delete obj[propName];
    } else if (_typeof(obj) === 'object') {
      if (depth <= 3) cleanObject(obj[propName]);
    }
  }

  return obj;
}
/**
 * @description a function that removes duplicates from an array of objects
 * @param {Array} arrayOfObj an array of objects with duplicate value for
 *  a given property
 * @param {String} prop the property with duplicate values that renneds to be filtered by
 */


function removeDuplicates(arrayOfObj, prop) {
  var setOfSeenObj = new Set();
  var filteredArr = arrayOfObj.filter(function (item) {
    var duplicate = setOfSeenObj.has(item[prop]);
    setOfSeenObj.add(item[prop]);
    return !duplicate;
  });
  return filteredArr;
}

function nextDate() {
  var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var givenDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().toISOString();
  return new Date(new Date(givenDate).setDate(new Date(givenDate).getDate() + d));
}

function genString(length) {
  var possible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var text = '';
  var str = possible || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // eslint-disable-next-line no-plusplus

  for (var i = 0; i < length; i++) {
    text += str.charAt(Math.floor(Math.random() * str.length));
  }

  return text;
}

function daysIntoYear() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  // eslint-disable-next-line max-len
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

function genCode() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9;
  var d = new Date().getFullYear().toString().substr(-2);
  d += daysIntoYear();

  if (len - d.length > 0) {
    return d + genString(len - d.length);
  }

  return genString(len);
}

function generateCode(terminalId) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var d = new Date().getFullYear().toString().substr(-1);
  d += daysIntoYear();
  d += terminalId.substr(-2);

  if (len - d.length > 0) {
    return d + genString(len - d.length, '0987654321');
  }

  return genString(len, '0987654321');
}

function hasNull() {
  var Obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var val = Object.values(Obj);
  if (val.includes(null) || val.includes(undefined) || val.includes('')) return true;
  return false;
}

function formatPhone(phone) {
  if (!phone) return null;
  var str = phone.trim();

  if (str.length === 11 && str[0] === '0') {
    str = "+234".concat(str.slice(1));
  }

  if (str.length === 10) {
    str = "+234".concat(str);
  }

  return str;
}

function stringToArrayPhone(str) {
  var arr = str.split(',').map(function (st) {
    return st.trim();
  }) || []; // remove spaces
  // eslint-disable-next-line no-unused-vars

  var filtered = arr.filter(function (value, index) {
    return value.length >= 11 && value.length < 15;
  });
  return _toConsumableArray(new Set(filtered)); // Remove duplicates
}

function getRequestIp(request) {
  var ipAddr = request.connection.remoteAddress;

  if (request.headers && request.headers['x-forwarded-for']) {
    var _request$headers$xFo = request.headers['x-forwarded-for'].split(',');

    var _request$headers$xFo2 = _slicedToArray(_request$headers$xFo, 1);

    ipAddr = _request$headers$xFo2[0];
  }

  return ipAddr;
} // eslint-disable-next-line complexity


function getFullname(record) {
  if (!record) return '';
  var title = hasProp(record, 'title') ? record.title : '';
  var gender = hasProp(record, 'gender') ? "(".concat(record.gender.charAt(0).toLowerCase(), ")") : '';
  var surname = hasProp(record, 'surname') ? record.surname : '';
  var otherName = hasProp(record, 'otherName') ? record.otherName : '';
  return "".concat(titleCase("".concat(title, " ").concat(surname, " ").concat(otherName)), " ").concat(gender).trim();
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
} // eslint-disable-next-line complexity


function calcTax(taxableIncome) {
  var income = taxableIncome;
  var taxTotal = 0;

  if (income >= 1) {
    var taxable = income - 300000 >= 0 ? 300000 : income;
    var tax = taxable * 7 / 100;
    taxTotal += tax;
    income -= taxable;
  }

  if (income >= 1) {
    var _taxable = income - 300000 >= 0 ? 300000 : income;

    var _tax = _taxable * 11 / 100;

    taxTotal += _tax;
    income -= _taxable;
  }

  if (income >= 1) {
    var _taxable2 = income - 500000 >= 0 ? 500000 : income;

    var _tax2 = _taxable2 * 15 / 100;

    taxTotal += _tax2;
    income -= _taxable2;
  }

  if (income >= 1) {
    var _taxable3 = income - 500000 >= 0 ? 500000 : income;

    var _tax3 = _taxable3 * 19 / 100;

    taxTotal += _tax3;
    income -= _taxable3;
  }

  if (income >= 1) {
    var _taxable4 = income - 1600000 >= 0 ? 1600000 : income;

    var _tax4 = _taxable4 * 21 / 100;

    taxTotal += _tax4;
    income -= _taxable4;
  }

  if (income >= 1) {
    var _tax5 = income * 24 / 100;

    taxTotal += _tax5;
  }

  return taxTotal;
}
//# sourceMappingURL=helpers.js.map