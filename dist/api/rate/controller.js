"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRecord = fetchRecord;

var _util = require("../../util");

var _service = require("./service");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Logging
var _module = 'Rates';

function fetchRecord(_x, _x2) {
  return _fetchRecord.apply(this, arguments);
}

function _fetchRecord() {
  _fetchRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _service.fetchService)(req.query);

          case 3:
            result = _context.sent;
            return _context.abrupt("return", (0, _util.success)(res, 200, result, "".concat(result.length, " ").concat(_module, " record(s) retrieved successfully!")));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", (0, _util.fail)(res, 400, "Error retrieving ".concat(_module, " record. ").concat(_context.t0.message)));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _fetchRecord.apply(this, arguments);
}
//# sourceMappingURL=controller.js.map