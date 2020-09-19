"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createImageHandler = createImageHandler;
exports.createVideoHandler = createVideoHandler;
exports.fetchHandler = fetchHandler;
exports.updateHandler = updateHandler;
exports.patchHandler = patchHandler;
exports.deleteHandler = deleteHandler;

var _multer = _interopRequireDefault(require("multer"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _service = require("./service");

var _util = require("../../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config(); // Logging


var _module = 'Media';

var logger = _util.log4js.getLogger("[".concat(_module, "]"));

function log(req, err) {
  logger.error("[400] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, 'email'), "] - [").concat(req.path, "], [").concat(_module, "], ").concat(err.message));
}

var imageUrl;
var videoUrl;

var imageStoredLocally = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, "".concat(_appRootPath["default"], "/src/upload/Images"));
    console.log("".concat(_appRootPath["default"], "/src/upload/Images"));
  },
  filename: function filename(req, file, callback) {
    // eslint-disable-next-line no-useless-escape
    imageUrl = "".concat(file.fieldname, "_").concat(new Date().toISOString().replace(/[\/\\:]/g, '_'), "_").concat(file.originalname);
    callback(null, imageUrl);
  }
});

var videoStoredLocally = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, "".concat(_appRootPath["default"], "/src/upload/Videos"));
  },
  filename: function filename(req, file, callback) {
    // eslint-disable-next-line no-useless-escape
    videoUrl = "".concat(file.fieldname, "_").concat(new Date().toISOString().replace(/[\/\\:]/g, '_'), "_").concat(file.originalname);
    callback(null, videoUrl);
  }
});

var uploadImageLocally = (0, _multer["default"])({
  storage: imageStoredLocally
}).array('image', 3); // Field name and max count

var uploadVideoLocally = (0, _multer["default"])({
  storage: videoStoredLocally
}).array('video', 3); // Field name and max count

function createImageHandler(_x, _x2) {
  return _createImageHandler.apply(this, arguments);
}

function _createImageHandler() {
  _createImageHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", uploadImageLocally(req, res, /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err) {
                var _req$body, name, type, createdBy, url, data, result;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;

                        if (!err) {
                          _context.next = 3;
                          break;
                        }

                        return _context.abrupt("return", (0, _util.fail)(res, 422, "Error uploading media. ".concat(err.message)));

                      case 3:
                        _req$body = req.body, name = _req$body.name, type = _req$body.type;
                        createdBy = req.user.id;
                        url = req.files[0].path;
                        data = {
                          type: type,
                          name: name,
                          url: url,
                          createdBy: createdBy
                        };
                        console.log(data);
                        _context.next = 10;
                        return (0, _service.createService)(data);

                      case 10:
                        result = _context.sent;
                        return _context.abrupt("return", (0, _util.success)(res, 200, result, "".concat(result.length, " ").concat(_module, " record(s) retrieved successfully!"), null));

                      case 14:
                        _context.prev = 14;
                        _context.t0 = _context["catch"](0);
                        logger.error(_context.t0);
                        return _context.abrupt("return", (0, _util.fail)(res, 400, "Error creating ".concat(_module, " record. ").concat(_context.t0.message)));

                      case 18:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[0, 14]]);
              }));

              return function (_x13) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createImageHandler.apply(this, arguments);
}

function createVideoHandler(_x3, _x4) {
  return _createVideoHandler.apply(this, arguments);
}

function _createVideoHandler() {
  _createVideoHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", uploadVideoLocally(req, res, /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err) {
                var _req$body2, name, description, category, type, url, data, result;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;

                        if (!err) {
                          _context3.next = 3;
                          break;
                        }

                        return _context3.abrupt("return", (0, _util.fail)(res, 422, "Error uploading media. ".concat(err.message)));

                      case 3:
                        _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, category = _req$body2.category, type = _req$body2.type;
                        url = req.files[0].path;
                        data = {
                          type: type,
                          name: name,
                          url: url,
                          description: description,
                          category: category,
                          createdBy: '5a51bc91860d8b5ba0001000'
                        };
                        console.log(data);
                        _context3.next = 9;
                        return (0, _service.createService)(data);

                      case 9:
                        result = _context3.sent;
                        return _context3.abrupt("return", (0, _util.success)(res, 200, result, "".concat(result.length, " ").concat(_module, " record(s) retrieved successfully!"), null));

                      case 13:
                        _context3.prev = 13;
                        _context3.t0 = _context3["catch"](0);
                        logger.error(_context3.t0);
                        return _context3.abrupt("return", (0, _util.fail)(res, 400, "Error creating ".concat(_module, " record. ").concat(_context3.t0.message)));

                      case 17:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[0, 13]]);
              }));

              return function (_x14) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createVideoHandler.apply(this, arguments);
}

function fetchHandler(_x5, _x6) {
  return _fetchHandler.apply(this, arguments);
}

function _fetchHandler() {
  _fetchHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _yield$fetchService, result, metadata;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _service.fetchService)(req.query);

          case 3:
            _yield$fetchService = _context5.sent;
            result = _yield$fetchService.result;
            metadata = _yield$fetchService.metadata;
            logger.info("[200] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, 'email'), "] - [").concat(req.path, "]"));
            return _context5.abrupt("return", (0, _util.success)(res, 200, result, "".concat(result.length, " ").concat(_module, " record(s) retrieved successfully!"), metadata));

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            log(req, _context5.t0);
            return _context5.abrupt("return", (0, _util.fail)(res, 400, "Error retrieving ".concat(_module, " record. ").concat(_context5.t0.message)));

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return _fetchHandler.apply(this, arguments);
}

function updateHandler(_x7, _x8) {
  return _updateHandler.apply(this, arguments);
}

function _updateHandler() {
  _updateHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _service.updateService)(req.params.recordId, req.body);

          case 3:
            result = _context6.sent;
            return _context6.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) updated successfully!")));

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            log(req, _context6.t0);
            return _context6.abrupt("return", (0, _util.fail)(res, 400, "Error updating ".concat(_module, " record. ").concat(_context6.t0.message)));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return _updateHandler.apply(this, arguments);
}

function patchHandler(_x9, _x10) {
  return _patchHandler.apply(this, arguments);
}

function _patchHandler() {
  _patchHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _service.patchService)(req.params.recordId, req.body);

          case 3:
            result = _context7.sent;
            return _context7.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) patched successfully!")));

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            log(req, _context7.t0);
            return _context7.abrupt("return", (0, _util.fail)(res, 400, "Error patching ".concat(_module, " record. ").concat(_context7.t0.message)));

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return _patchHandler.apply(this, arguments);
}

function deleteHandler(_x11, _x12) {
  return _deleteHandler.apply(this, arguments);
}

function _deleteHandler() {
  _deleteHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return (0, _service.deleteService)(req.params.recordId);

          case 3:
            result = _context8.sent;
            return _context8.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) deleted successfully!")));

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            log(req, _context8.t0);
            return _context8.abrupt("return", (0, _util.fail)(res, 400, "Error deleting ".concat(_module, " record. ").concat(_context8.t0.message)));

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return _deleteHandler.apply(this, arguments);
}
//# sourceMappingURL=controller.js.map