"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRecord = fetchRecord;
exports.createRecord = createRecord;
exports.deleteRecord = deleteRecord;

var _apiQueryParams = _interopRequireDefault(require("api-query-params"));

var _model = _interopRequireDefault(require("./model"));

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Logging
var _module = "Access";

var logger = _util.log4js.getLogger("[".concat(_module, "]"));

function log(req, err) {
  logger.error("[400] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, "email"), "] - [").concat(req.path, "], [").concat(_module, "], ").concat(err.message));
}

function fetchRecord(_x, _x2) {
  return _fetchRecord.apply(this, arguments);
}

function _fetchRecord() {
  _fetchRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var query, _aqp, filter, skip, limit, sort, projection, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = req.query;
            _aqp = (0, _apiQueryParams["default"])(query), filter = _aqp.filter, skip = _aqp.skip, limit = _aqp.limit, sort = _aqp.sort, projection = _aqp.projection;
            _context.prev = 2;
            _context.next = 5;
            return _model["default"].find(filter).skip(skip).limit(limit).sort(sort).select(projection).exec();

          case 5:
            result = _context.sent;

            if (result) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", (0, _util.fail)(res, 404, "".concat(_module, " record not found.")));

          case 8:
            logger.info("[200] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, "email"), "] - [").concat(req.path, "]"));
            return _context.abrupt("return", (0, _util.success)(res, 200, result, "".concat(result.length, " ").concat(_module, " record(s) retrieved successfully!")));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            log(req, _context.t0);
            return _context.abrupt("return", (0, _util.fail)(res, 400, "Error retrieving ".concat(_module, " record. ").concat(_context.t0.message)));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12]]);
  }));
  return _fetchRecord.apply(this, arguments);
}

function createRecord(_x3, _x4) {
  return _createRecord.apply(this, arguments);
}

function _createRecord() {
  _createRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var data, newRecord, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            data = req.body;
            newRecord = new _model["default"](data);
            _context2.next = 5;
            return newRecord.save();

          case 5:
            result = _context2.sent;

            if (result) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", (0, _util.fail)(res, 404, "".concat(_module, " record not found.")));

          case 8:
            return _context2.abrupt("return", (0, _util.success)(res, 201, result, "".concat(_module, " record(s) created successfully!")));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            log(req, _context2.t0);
            return _context2.abrupt("return", (0, _util.fail)(res, 400, "Error creating ".concat(_module, " record. ").concat(_context2.t0.message)));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return _createRecord.apply(this, arguments);
}

function deleteRecord(_x5, _x6) {
  return _deleteRecord.apply(this, arguments);
}

function _deleteRecord() {
  _deleteRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var recordId, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            recordId = req.params.recordId;
            _context3.prev = 1;
            _context3.next = 4;
            return _model["default"].findOneAndRemove({
              _id: recordId
            });

          case 4:
            result = _context3.sent;

            if (result) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", (0, _util.fail)(res, 404, "".concat(_module, " record not found.")));

          case 7:
            return _context3.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) deleted successfully!")));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            log(req, _context3.t0);
            return _context3.abrupt("return", (0, _util.fail)(res, 400, "Error deleting ".concat(_module, " record. ").concat(_context3.t0.message)));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return _deleteRecord.apply(this, arguments);
}