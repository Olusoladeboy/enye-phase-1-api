"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchService = fetchService;

var _apiQueryParams = _interopRequireDefault(require("api-query-params"));

var _request = _interopRequireDefault(require("request"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import Task, { validateCreate, validateUpdate } from './model';
// Logging
var _module = 'Rate';
var url = 'https://api.exchangeratesapi.io/latest'; // eslint-disable-next-line import/prefer-default-export

function fetchService(_x) {
  return _fetchService.apply(this, arguments);
}

function _fetchService() {
  _fetchService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
    var base, currency, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            base = query.base, currency = query.currency;
            _context.next = 4;
            return _axios["default"].get("".concat(url, "?base=").concat(base, "&symbols=").concat(currency)).then(function (response) {
              // const {base, date, rates} = response.data;
              // result = {base, date, rates};
              result = response.data;
            })["catch"](function (error) {
              console.log(error);
              throw new Error(error);
            });

          case 4:
            if (result) {
              _context.next = 6;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 6:
            return _context.abrupt("return", [result]);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            throw new Error("Error retrieving ".concat(_module, " record. ").concat(_context.t0.message));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _fetchService.apply(this, arguments);
}
//# sourceMappingURL=service.js.map