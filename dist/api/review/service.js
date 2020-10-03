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

var _model2 = _interopRequireDefault(require("../user/model"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Logging
var _module = 'Review';

function fetchService(_x) {
  return _fetchService.apply(this, arguments);
} // eslint-disable-next-line complexity


function _fetchService() {
  _fetchService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
    var _aqp, filter, skip, limit, sort, projection, population, result;

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
            return _context.abrupt("return", result);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            throw new Error("Error retrieving ".concat(_module, " record. ").concat(_context.t0.message));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return _fetchService.apply(this, arguments);
}

function createService() {
  return _createService.apply(this, arguments);
}

function _createService() {
  _createService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var data,
        _validateCreate$valid,
        error,
        newRecord,
        result,
        result2,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
            _context2.prev = 1;
            _validateCreate$valid = _model.validateCreate.validate(data), error = _validateCreate$valid.error;

            if (!error) {
              _context2.next = 5;
              break;
            }

            throw new Error("Error validating request data. ".concat(error.message));

          case 5:
            newRecord = new _model["default"](data);
            _context2.next = 8;
            return newRecord.save();

          case 8:
            result = _context2.sent;

            if (result) {
              _context2.next = 11;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 11:
            _context2.next = 13;
            return _model2["default"].updateOne({
              _id: result.user
            }, {
              $push: {
                reviews: result._id
              }
            }).exec();

          case 13:
            result2 = _context2.sent;
            return _context2.abrupt("return", result);

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](1);
            throw new Error("Error creating ".concat(_module, " record. ").concat(_context2.t0.message));

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 17]]);
  }));
  return _createService.apply(this, arguments);
}

function updateService() {
  return _updateService.apply(this, arguments);
}

function _updateService() {
  _updateService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var recordId,
        data,
        _validateUpdate$valid,
        error,
        result,
        _args3 = arguments;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            recordId = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : '';
            data = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            _context3.prev = 2;
            _validateUpdate$valid = _model.validateUpdate.validate(data), error = _validateUpdate$valid.error;

            if (!error) {
              _context3.next = 6;
              break;
            }

            throw new Error("Error validating request data. ".concat(error.message));

          case 6:
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

            throw new Error("".concat(_module, " record not found."));

          case 11:
            return _context3.abrupt("return", result);

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](2);
            throw new Error("Error updating ".concat(_module, " record. ").concat(_context3.t0.message));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 14]]);
  }));
  return _updateService.apply(this, arguments);
}

function patchService() {
  return _patchService.apply(this, arguments);
} // eslint-disable-next-line complexity


function _patchService() {
  _patchService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var recordId,
        data,
        result,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            recordId = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : '';
            data = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
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

            throw new Error("".concat(_module, " record not found."));

          case 8:
            return _context4.abrupt("return", result);

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](2);
            throw new Error("Error patching ".concat(_module, " record. ").concat(_context4.t0.message));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 11]]);
  }));
  return _patchService.apply(this, arguments);
}

function deleteService() {
  return _deleteService.apply(this, arguments);
}

function _deleteService() {
  _deleteService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var recordId,
        result,
        result2,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            recordId = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : '';
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

            throw new Error("".concat(_module, " record not found."));

          case 7:
            _context5.next = 9;
            return _model2["default"].updateOne({
              _id: result.user
            }, // eslint-disable-next-line no-underscore-dangle
            {
              $pull: {
                reviews: result._id
              }
            }).exec();

          case 9:
            result2 = _context5.sent;
            return _context5.abrupt("return", result2);

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](1);
            throw new Error("Error deleting ".concat(_module, " record. ").concat(_context5.t0.message));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 13]]);
  }));
  return _deleteService.apply(this, arguments);
}
//# sourceMappingURL=service.js.map