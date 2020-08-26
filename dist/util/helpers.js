"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRealValue = isRealValue;
exports.hasProp = hasProp;
exports.getRequestIp = getRequestIp;
exports.hash = hash;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isRealValue(object) {
  return typeof object !== "undefined" || object !== null;
}

function hasProp(obj, prop) {
  if (!isRealValue(obj)) return false;
  return obj[prop] !== undefined; // return Object.prototype.hasOwnProperty.call(obj, prop);
}

function getRequestIp(request) {
  var ipAddr = request.connection.remoteAddress;

  if (request.headers && request.headers["x-forwarded-for"]) {
    var _request$headers$xFo = request.headers["x-forwarded-for"].split(",");

    var _request$headers$xFo2 = _slicedToArray(_request$headers$xFo, 1);

    ipAddr = _request$headers$xFo2[0];
  }

  return ipAddr;
}

function hash() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return _bcryptjs["default"].hashSync(str, _constants.JWT.saltRounds);
}