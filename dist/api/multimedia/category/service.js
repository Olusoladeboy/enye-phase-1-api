"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchService = fetchService;
exports.createService = createService;
exports.updateService = updateService;
exports.patchService = patchService;
exports.deleteService = deleteService;

var _apiQueryParams = _interopRequireDefault(require("api-query-params"));

var _model = _interopRequireWildcard(require("./model"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _module = 'Category';

function fetchService(_x) {
  return _fetchService.apply(this, arguments);
}

function _fetchService() {
  _fetchService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
    var _aqp, filter, skip, limit, sort, projection, population, result, total, metadata;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _aqp = (0, _apiQueryParams["default"])(query), filter = _aqp.filter, skip = _aqp.skip, limit = _aqp.limit, sort = _aqp.sort, projection = _aqp.projection, population = _aqp.population;
            _context.next = 4;
            return _model["default"].find(filter).populate(population).skip(skip).limit(limit).sort(sort).select(projection).exec();

          case 4:
            result = _context.sent;

            if (result) {
              _context.next = 7;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 7:
            _context.next = 9;
            return _model["default"].find(filter).estimatedDocumentCount().exec();

          case 9:
            total = _context.sent;
            metadata = {
              total: total,
              skip: skip,
              limit: limit,
              page: 0
            };
            return _context.abrupt("return", {
              result: result,
              metadata: metadata
            });

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            throw new Error("Error retrieving ".concat(_module, " record. ").concat(_context.t0.message));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));
  return _fetchService.apply(this, arguments);
}

function createService(_x2) {
  return _createService.apply(this, arguments);
}

function _createService() {
  _createService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
    var _validateCreate$valid, error, newRecord, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _validateCreate$valid = _model.validateCreate.validate(data), error = _validateCreate$valid.error;

            if (!error) {
              _context2.next = 4;
              break;
            }

            throw new Error("Error validating ".concat(_module, " data. ").concat(error.message));

          case 4:
            newRecord = new _model["default"](data);
            _context2.next = 7;
            return newRecord.save();

          case 7:
            result = _context2.sent;

            if (result) {
              _context2.next = 10;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 10:
            return _context2.abrupt("return", result);

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            throw new Error("Error creating ".concat(_module, " record. ").concat(_context2.t0.message));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return _createService.apply(this, arguments);
}

function updateService(_x3, _x4) {
  return _updateService.apply(this, arguments);
}

function _updateService() {
  _updateService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(recordId, data) {
    var _validateUpdate$valid, error, result;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _validateUpdate$valid = _model.validateUpdate.validate(data), error = _validateUpdate$valid.error;

            if (!error) {
              _context3.next = 4;
              break;
            }

            throw new Error("Error validating ".concat(_module, " data. ").concat(error.message));

          case 4:
            _context3.next = 6;
            return _model["default"].findOneAndUpdate({
              _id: recordId
            }, data, {
              "new": true
            });

          case 6:
            result = _context3.sent;

            if (result) {
              _context3.next = 9;
              break;
            }

            throw new Error("".concat(_module, " record with Id ").concat(recordId, " not found."));

          case 9:
            return _context3.abrupt("return", result);

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            throw new Error("Error updating ".concat(_module, " record. ").concat(_context3.t0.message));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return _updateService.apply(this, arguments);
}

function patchService(_x5, _x6) {
  return _patchService.apply(this, arguments);
}

function _patchService() {
  _patchService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(recordId, data) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _model["default"].findOneAndUpdate({
              _id: recordId
            }, data, {
              "new": true
            });

          case 3:
            result = _context4.sent;

            if (result) {
              _context4.next = 6;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 6:
            return _context4.abrupt("return", result);

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            throw new Error("Error patching ".concat(_module, " record. ").concat(_context4.t0.message));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return _patchService.apply(this, arguments);
}

function deleteService(_x7) {
  return _deleteService.apply(this, arguments);
}

function _deleteService() {
  _deleteService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(recordId) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _model["default"].findOneAndRemove({
              _id: recordId
            });

          case 3:
            result = _context5.sent;

            if (result) {
              _context5.next = 6;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 6:
            return _context5.abrupt("return", result);

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            throw new Error("Error deleting ".concat(_module, " record. ").concat(_context5.t0.message));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return _deleteService.apply(this, arguments);
}
//# sourceMappingURL=service.js.map