"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRecord = fetchRecord;
exports.createRecord = createRecord;
exports.updateRecord = updateRecord;
exports.patchRecord = patchRecord;
exports.deleteRecord = deleteRecord;

var _apiQueryParams = _interopRequireDefault(require("api-query-params"));

var _model = _interopRequireWildcard(require("./model"));

var _util = require("../../../util");

var _constants = require("../../../constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import { weatherService } from '../../../services';
// Logging
var _module = 'City';

var logger = _util.log4js.getLogger("[".concat(_module, "]"));

function log(req, err) {
  logger.error("[400] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, 'email'), "] - [").concat(req.path, "], [").concat(_module, "], ").concat(err.message));
}

function fetchRecord(_x, _x2) {
  return _fetchRecord.apply(this, arguments);
} // export async function fetchWeather(req, res) {
//   const { type, city, country } = req.query;
//   try {
//     const result = await weatherService(type, city, country) || [];
//     if (!result) {
//       return fail(res, 200, 404, `${module} record not found.`);
//     }
//     if (result.length > 0) {
//       return success(res, 201, result, `${module} record(s) fetched successfully!`);
//     }
//     return success(res, 201, [result], `${module} record(s) fetched successfully!`);
//   } catch (err) {
//     log(req, err);
//     return fail(res, 400, `Error fetching ${module} record. ${err.message}`);
//   }
// }


function _fetchRecord() {
  _fetchRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var query, _aqp, filter, skip, limit, sort, projection, population, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = req.query;
            _aqp = (0, _apiQueryParams["default"])(query), filter = _aqp.filter, skip = _aqp.skip, limit = _aqp.limit, sort = _aqp.sort, projection = _aqp.projection, population = _aqp.population;
            _context.prev = 2;
            _context.next = 5;
            return _model["default"].find(filter).populate(population).skip(skip).limit(limit).sort(sort).select(projection).exec();

          case 5:
            result = _context.sent;

            if (result) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", (0, _util.fail)(res, 404, "".concat(_module, " record not found.")));

          case 8:
            logger.info("[200] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, 'email'), "] - [").concat(req.path, "]"));
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
    var data, _validateCreate$valid, error, newRecord, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = req.body;
            _validateCreate$valid = _model.validateCreate.validate(data), error = _validateCreate$valid.error;

            if (!error) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", (0, _util.fail)(res, 422, "Error validating ".concat(_module, " data. ").concat(error.message)));

          case 4:
            newRecord = new _model["default"](data);
            _context2.prev = 5;
            _context2.next = 8;
            return newRecord.save();

          case 8:
            result = _context2.sent;

            if (result) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", (0, _util.fail)(res, 404, "".concat(_module, " record not found.")));

          case 11:
            return _context2.abrupt("return", (0, _util.success)(res, 201, result, "".concat(_module, " record(s) created successfully!")));

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](5);
            log(req, _context2.t0);
            return _context2.abrupt("return", (0, _util.fail)(res, 400, "Error creating ".concat(_module, " record. ").concat(_context2.t0.message)));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 14]]);
  }));
  return _createRecord.apply(this, arguments);
}

function updateRecord(_x5, _x6) {
  return _updateRecord.apply(this, arguments);
}

function _updateRecord() {
  _updateRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var data, recordId, _validateUpdate$valid, error, result;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = req.body;
            recordId = req.params.recordId;
            _validateUpdate$valid = _model.validateUpdate.validate(data), error = _validateUpdate$valid.error;

            if (!error) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", (0, _util.fail)(res, 422, "Error validating ".concat(_module, " data. ").concat(error.message)));

          case 5:
            _context3.prev = 5;
            _context3.next = 8;
            return _model["default"].findOneAndUpdate({
              _id: recordId
            }, data, {
              "new": true
            });

          case 8:
            result = _context3.sent;

            if (result) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", (0, _util.fail)(res, 404, "".concat(_module, " record not found.")));

          case 11:
            return _context3.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) updated successfully!")));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](5);
            log(req, _context3.t0);
            return _context3.abrupt("return", (0, _util.fail)(res, 400, "Error updating ".concat(_module, " record. ").concat(_context3.t0.message)));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 14]]);
  }));
  return _updateRecord.apply(this, arguments);
}

function patchRecord(_x7, _x8) {
  return _patchRecord.apply(this, arguments);
}

function _patchRecord() {
  _patchRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var data, recordId, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = req.body;
            recordId = req.params.recordId;
            _context4.prev = 2;
            _context4.next = 5;
            return _model["default"].findOneAndUpdate({
              _id: recordId
            }, data, {
              "new": true
            });

          case 5:
            result = _context4.sent;

            if (result) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", (0, _util.fail)(res, 404, "".concat(_module, " record not found.")));

          case 8:
            return _context4.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) patched successfully!")));

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](2);
            log(req, _context4.t0);
            return _context4.abrupt("return", (0, _util.fail)(res, 400, "Error patching ".concat(_module, " record. ").concat(_context4.t0.message)));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 11]]);
  }));
  return _patchRecord.apply(this, arguments);
}

function deleteRecord(_x9, _x10) {
  return _deleteRecord.apply(this, arguments);
}

function _deleteRecord() {
  _deleteRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var recordId, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            recordId = req.params.recordId;
            _context5.prev = 1;
            _context5.next = 4;
            return _model["default"].findOneAndRemove({
              _id: recordId
            });

          case 4:
            result = _context5.sent;

            if (result) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", (0, _util.fail)(res, 404, "".concat(_module, " record not found.")));

          case 7:
            return _context5.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) deleted successfully!")));

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](1);
            log(req, _context5.t0);
            return _context5.abrupt("return", (0, _util.fail)(res, 400, "Error deleting ".concat(_module, " record. ").concat(_context5.t0.message)));

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 10]]);
  }));
  return _deleteRecord.apply(this, arguments);
}
//# sourceMappingURL=controller.js.map