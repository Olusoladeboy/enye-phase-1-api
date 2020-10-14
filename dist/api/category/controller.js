"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchHandler = fetchHandler;
exports.createHandler = createHandler;
exports.updateHandler = updateHandler;
exports.patchHandler = patchHandler;
exports.deleteHandler = deleteHandler;

var _service = require("./service");

var _util = require("../../util");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Logging
var _module = 'Category';

var logger = _util.log4js.getLogger("[".concat(_module, "]"));

function log(req, err) {
  logger.error("[400] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, 'email'), "] - [").concat(req.path, "], [").concat(_module, "], ").concat(err.message));
}

function fetchHandler(_x, _x2) {
  return _fetchHandler.apply(this, arguments);
}

function _fetchHandler() {
  _fetchHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var query, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = req.query;
            _context.prev = 1;
            _context.next = 4;
            return (0, _service.fetchService)(query);

          case 4:
            result = _context.sent;
            logger.info("[200] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, 'email'), "] - [").concat(req.path, "]"));
            return _context.abrupt("return", (0, _util.success)(res, 200, result, "".concat(result.length, " ").concat(_module, " record(s) retrieved successfully!")));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            log(req, _context.t0);
            return _context.abrupt("return", (0, _util.fail)(res, 400, "Error retrieving ".concat(_module, " record. ").concat(_context.t0.message)));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _fetchHandler.apply(this, arguments);
}

function createHandler(_x3, _x4) {
  return _createHandler.apply(this, arguments);
}

function _createHandler() {
  _createHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var data, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            data = req.body;
            _context2.next = 4;
            return (0, _service.createService)(data);

          case 4:
            result = _context2.sent;
            return _context2.abrupt("return", (0, _util.success)(res, 201, result, "".concat(_module, " record(s) created successfully!")));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            log(req, _context2.t0);
            return _context2.abrupt("return", (0, _util.fail)(res, 400, "Error creating ".concat(_module, " record. ").concat(_context2.t0.message)));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _createHandler.apply(this, arguments);
}

function updateHandler(_x5, _x6) {
  return _updateHandler.apply(this, arguments);
}

function _updateHandler() {
  _updateHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var data, recordId, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            data = req.body;
            recordId = req.params.recordId;
            _context3.next = 5;
            return (0, _service.updateService)(recordId, data);

          case 5:
            result = _context3.sent;
            return _context3.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) updated successfully!")));

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            log(req, _context3.t0);
            return _context3.abrupt("return", (0, _util.fail)(res, 400, "Error updating ".concat(_module, " record. ").concat(_context3.t0.message)));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return _updateHandler.apply(this, arguments);
}

function patchHandler(_x7, _x8) {
  return _patchHandler.apply(this, arguments);
}

function _patchHandler() {
  _patchHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var data, recordId, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = req.body;
            recordId = req.params.recordId;
            _context4.prev = 2;
            _context4.next = 5;
            return (0, _service.patchService)(recordId, data);

          case 5:
            result = _context4.sent;
            return _context4.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) patched successfully!")));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](2);
            log(req, _context4.t0);
            return _context4.abrupt("return", (0, _util.fail)(res, 400, "Error patching ".concat(_module, " record. ").concat(_context4.t0.message)));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 9]]);
  }));
  return _patchHandler.apply(this, arguments);
}

function deleteHandler(_x9, _x10) {
  return _deleteHandler.apply(this, arguments);
}

function _deleteHandler() {
  _deleteHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var recordId, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            recordId = req.params.recordId;
            _context5.prev = 1;
            _context5.next = 4;
            return (0, _service.deleteService)(recordId);

          case 4:
            result = _context5.sent;
            return _context5.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) deleted successfully!")));

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            log(req, _context5.t0);
            return _context5.abrupt("return", (0, _util.fail)(res, 400, "Error deleting ".concat(_module, " record. ").concat(_context5.t0.message)));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return _deleteHandler.apply(this, arguments);
}
//# sourceMappingURL=controller.js.map