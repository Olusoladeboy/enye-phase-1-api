"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  exRequest: true,
  myRequest: true,
  getData: true,
  postData: true,
  putData: true,
  patchData: true,
  deleteData: true
};
exports.exRequest = exRequest;
exports.myRequest = myRequest;
exports.getData = getData;
exports.postData = postData;
exports.putData = putData;
exports.patchData = patchData;
exports.deleteData = deleteData;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _util = require("../util");

var _paymentGateway = require("./payment-gateway");

Object.keys(_paymentGateway).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _paymentGateway[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var apiUrl = process.env.GATEWAY_URL;
/**
 * @description exRequest external request function executes foreign http request
 * @param {String} jwtToken token string
 * @param {Enum} httpMethod request method GET|POST|PUT|PATCH|DELETE
 * @param {String} httpUrl url sting
 * @param {Object} data payload object
 */

function exRequest(httpMethod) {
  var httpUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var jwtToken = arguments.length > 3 ? arguments[3] : undefined;
  // const token = getToken(jwtToken);
  var headersObj = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    json: true
  };
  var payload = (0, _util.cleanObject)(data);
  var options = {
    method: httpMethod,
    uri: httpUrl,
    body: payload,
    headers: headersObj,
    auth: {
      bearer: jwtToken
    },
    // { 'user': 'myusername', 'pass': 'mypassword' },
    json: true // Automatically stringifies the body to JSON

  };
  return (0, _requestPromise["default"])(options).then(function (response) {
    return response;
  })["catch"](function (err) {
    return err;
  });
}
/**
 * @description function to execute external http request
 * @param {String} jwtToken token string
 * @param {Enum} httpMethod request method GET|POST|PUT|PATCH|DELETE
 * @param {String} path url path string
 * @param {Object} data payload object
 */


function myRequest(httpMethod) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var jwtToken = arguments.length > 3 ? arguments[3] : undefined;
  // const token = getToken(req);
  var headersObj = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    json: true
  };
  var payload = (0, _util.cleanObject)(data);
  var options = {
    method: httpMethod,
    uri: apiUrl + path,
    body: payload,
    headers: headersObj,
    auth: {
      bearer: jwtToken
    },
    // { 'user': 'myusername', 'pass': 'mypassword' },
    json: true // Automatically stringifies the body to JSON

  };
  return (0, _requestPromise["default"])(options).then(function (response) {
    return response;
  })["catch"](function (err) {
    return err;
  });
}

function getData(_x, _x2) {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, jwtToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return myRequest('GET', url, {}, jwtToken);

          case 3:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0.message);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getData.apply(this, arguments);
}

function postData(_x3, _x4, _x5) {
  return _postData.apply(this, arguments);
}

function _postData() {
  _postData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, data, jwtToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return myRequest('POST', url, data, jwtToken);

          case 3:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0.message);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _postData.apply(this, arguments);
}

function putData(_x6, _x7, _x8) {
  return _putData.apply(this, arguments);
}

function _putData() {
  _putData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url, data, jwtToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return myRequest('PUT', url, data, jwtToken);

          case 3:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0.message);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _putData.apply(this, arguments);
}

function patchData(_x9, _x10, _x11) {
  return _patchData.apply(this, arguments);
}

function _patchData() {
  _patchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url, data, jwtToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return myRequest('PATCH', url, data, jwtToken);

          case 3:
            result = _context4.sent;
            return _context4.abrupt("return", result);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0.message);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _patchData.apply(this, arguments);
}

function deleteData(_x12, _x13) {
  return _deleteData.apply(this, arguments);
}

function _deleteData() {
  _deleteData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(url, jwtToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return myRequest('DELETE', url, {}, jwtToken);

          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", result);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            throw new Error(_context5.t0.message);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return _deleteData.apply(this, arguments);
}
//# sourceMappingURL=index.js.map