"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gatewayRequest = gatewayRequest;
exports.verifyOnlineTnx = verifyOnlineTnx;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var FLUTTERWAVE_KEY = {
  PUBLIC: process.env.FLUTTERWAVE_PUBLIC_KEY,
  SECRET: process.env.FLUTTERWAVE_SECRET_KEY,
  ENCRYPT: process.env.FLUTTERWAVE_ENCRYPTION,
  HASH: process.env.FLUTTERWAVE_HASH
};
var PAYSTACK_KEY = {
  LIVE_PUBLIC: process.env.PAYSTACK_LIVE_PUBLIC_KEY,
  LIVE_SECRET: process.env.PAYSTACK_LIVE_SECRET_KEY,
  TEST_PUBLIC: process.env.PAYSTACK_TEST_PUBLIC_KEY,
  TEST_SECRET: process.env.PAYSTACK_TEST_SECRET_KEY
};
/**
 * @description gatewayRequest external request function executes foreign http request
 * @param {String} jwtToken token string
 * @param {Enum} httpMethod request method GET|POST|PUT|PATCH|DELETE
 * @param {String} httpUrl url sting
 * @param {Object} payload object
 */

function gatewayRequest(httpMethod) {
  var httpUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var jwtToken = arguments.length > 3 ? arguments[3] : undefined;
  var headersObj = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    json: true
  };
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

function verifyOnlineTnx(_x, _x2) {
  return _verifyOnlineTnx.apply(this, arguments);
}

function _verifyOnlineTnx() {
  _verifyOnlineTnx = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(paymentGateway, trxref) {
    var result, httpUrl, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = {};
            httpUrl = '';
            _context.prev = 2;
            _context.t0 = paymentGateway;
            _context.next = _context.t0 === 'FLUTTERWAVE' ? 6 : _context.t0 === 'PAYSTACK' ? 12 : 17;
            break;

          case 6:
            httpUrl = "".concat(_constants.FLUTTERWAVE.LIVE_URL).concat(_constants.FLUTTERWAVE.VERIFY);
            data = {
              SECKEY: FLUTTERWAVE_KEY.SECRET,
              txref: trxref
            };
            _context.next = 10;
            return gatewayRequest('POST', httpUrl, data, FLUTTERWAVE_KEY.SECRET);

          case 10:
            result = _context.sent;
            return _context.abrupt("break", 18);

          case 12:
            httpUrl = "".concat(_constants.PAYSTACK.LIVE_URL).concat(_constants.PAYSTACK.VERIFY, "/").concat(trxref);
            _context.next = 15;
            return gatewayRequest('GET', httpUrl, {}, PAYSTACK_KEY.LIVE_SECRET);

          case 15:
            result = _context.sent;
            return _context.abrupt("break", 18);

          case 17:
            throw new Error("paymentGateway '".concat(paymentGateway, "' not allowed"));

          case 18:
            return _context.abrupt("return", result);

          case 21:
            _context.prev = 21;
            _context.t1 = _context["catch"](2);
            throw new Error(_context.t1.message);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 21]]);
  }));
  return _verifyOnlineTnx.apply(this, arguments);
}
//# sourceMappingURL=payment-gateway.js.map