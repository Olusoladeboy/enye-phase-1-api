"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchHandler = fetchHandler;
exports.createHandler = createHandler;
exports.updateHandler = updateHandler;
exports.patchHandler = patchHandler;
exports.deleteHandler = deleteHandler;
exports.loginHandler = loginHandler;
exports.sendOTPHandler = sendOTPHandler;
exports.updatePhotoHandler = updatePhotoHandler;
exports.updateApprovalHandler = updateApprovalHandler;
exports.updateEmploymentHandler = updateEmploymentHandler;

var _service = require("./service");

var _util = require("../../util");

var _middleware = require("../../middleware");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import { photoUpload } from "../../services";
// Logging
var _module = "User";

var logger = _util.log4js.getLogger("[".concat(_module, "]"));

function log(req, err) {
  logger.error("[400] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, "email"), "] - [").concat(req.path, "], [").concat(_module, "], ").concat(err.message));
}

function fetchHandler(_x, _x2) {
  return _fetchHandler.apply(this, arguments);
}

function _fetchHandler() {
  _fetchHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var jwtToken, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            jwtToken = (0, _middleware.getToken)(req);
            _context.next = 4;
            return (0, _service.fetchService)(req.query, jwtToken);

          case 4:
            result = _context.sent;
            return _context.abrupt("return", (0, _util.success)(res, 200, result, "".concat(result.length, " ").concat(_module, " record(s) retrieved successfully!")));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            log(req, _context.t0);
            return _context.abrupt("return", (0, _util.fail)(res, 400, _context.t0.message));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _fetchHandler.apply(this, arguments);
}

function createHandler(_x3, _x4) {
  return _createHandler.apply(this, arguments);
} // eslint-disable-next-line complexity


function _createHandler() {
  _createHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var jwtToken, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            jwtToken = (0, _middleware.getToken)(req);
            _context2.next = 4;
            return (0, _service.createService)(req.body, jwtToken);

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
    var data, recordId, jwtToken, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            data = req.body;
            recordId = req.params.recordId;
            jwtToken = (0, _middleware.getToken)(req);
            _context3.next = 6;
            return (0, _service.updateService)(recordId, data, jwtToken);

          case 6:
            result = _context3.sent;
            return _context3.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record updated successfully")));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            log(req, _context3.t0);
            return _context3.abrupt("return", (0, _util.fail)(res, 400, "Error updating ".concat(_module, " record. ").concat(_context3.t0.message)));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return _updateHandler.apply(this, arguments);
}

function patchHandler(_x7, _x8) {
  return _patchHandler.apply(this, arguments);
}

function _patchHandler() {
  _patchHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var recordId, jwtToken, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            recordId = req.params.recordId;
            jwtToken = (0, _middleware.getToken)(req);
            _context4.next = 5;
            return (0, _service.patchService)(recordId, req.body, jwtToken);

          case 5:
            result = _context4.sent;
            return _context4.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) patched successfully!")));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            log(req, _context4.t0);
            return _context4.abrupt("return", (0, _util.fail)(res, 400, "Error patching ".concat(_module, " record. ").concat(_context4.t0.message)));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return _patchHandler.apply(this, arguments);
}

function deleteHandler(_x9, _x10) {
  return _deleteHandler.apply(this, arguments);
}

function _deleteHandler() {
  _deleteHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var jwtToken, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            jwtToken = (0, _middleware.getToken)(req);
            _context5.next = 4;
            return (0, _service.deleteService)(req.params.recordId, jwtToken);

          case 4:
            result = _context5.sent;
            return _context5.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record(s) deleted successfully!")));

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            log(req, _context5.t0);
            return _context5.abrupt("return", (0, _util.fail)(res, 400, "Error patching ".concat(_module, " record. ").concat(_context5.t0.message)));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return _deleteHandler.apply(this, arguments);
}

function loginHandler(_x11, _x12) {
  return _loginHandler.apply(this, arguments);
}

function _loginHandler() {
  _loginHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            // if (!req.body.currentIp) req.body.currentIp = getRequestIp(req);
            if (!req.body.type) req.body.type = getLoginType(req.body);
            _context6.next = 4;
            return (0, _service.loginService)(req.body);

          case 4:
            result = _context6.sent;
            return _context6.abrupt("return", (0, _util.success)(res, 201, result, "Login was successful!"));

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            log(req, _context6.t0);
            return _context6.abrupt("return", (0, _util.fail)(res, 403, "Error login ".concat(_module, ". ").concat(_context6.t0.message)));

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return _loginHandler.apply(this, arguments);
}

function sendOTPHandler(_x13, _x14) {
  return _sendOTPHandler.apply(this, arguments);
} // eslint-disable-next-line complexity


function _sendOTPHandler() {
  _sendOTPHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var jwtToken;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            jwtToken = (0, _middleware.getToken)(req);
            _context7.next = 4;
            return (0, _service.sendOTPService)(req.body, jwtToken);

          case 4:
            return _context7.abrupt("return", (0, _util.success)(res, 200, {}, "OTP sent successfully!"));

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            log(req, _context7.t0);
            return _context7.abrupt("return", (0, _util.fail)(res, 400, "Error sending ".concat(_module, " record. ").concat(_context7.t0.message)));

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return _sendOTPHandler.apply(this, arguments);
}

function getLoginType(data) {
  var email = data.email,
      phone = data.phone,
      otp = data.otp,
      password = data.password;
  var loginType = "";

  if (email && password) {
    loginType = "EMAIL";
  } else if (phone && password) {
    loginType = "PHONE";
  } else if (phone && otp) {
    loginType = "OTP";
  }

  return loginType;
}

function updatePhotoHandler(_x15, _x16) {
  return _updatePhotoHandler.apply(this, arguments);
} // eslint-disable-next-line complexity


function _updatePhotoHandler() {
  _updatePhotoHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            return _context9.abrupt("return", photoUpload(req, res, /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(err) {
                var data, recordId, jwtToken, fullPath, result;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        data = {};
                        recordId = req.params.recordId;
                        data.updatedBy = req.user.id;
                        jwtToken = (0, _middleware.getToken)(req);

                        if (!(err || req.file === undefined)) {
                          _context8.next = 6;
                          break;
                        }

                        return _context8.abrupt("return", (0, _util.fail)(res, 422, "Error processing file. ".concat(err.message)));

                      case 6:
                        fullPath = "upload/photo/".concat(req.file.filename);
                        data.photo = fullPath;
                        _context8.next = 10;
                        return (0, _service.updateService)(recordId, data, jwtToken);

                      case 10:
                        result = _context8.sent;

                        if (result) {
                          _context8.next = 13;
                          break;
                        }

                        return _context8.abrupt("return", (0, _util.fail)(res, 404, "".concat(_module, " record not found.")));

                      case 13:
                        return _context8.abrupt("return", (0, _util.success)(res, 200, result, "".concat(result.length, " ").concat(_module, " record(s) retrieved successfully!")));

                      case 14:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x21) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 4:
            _context9.prev = 4;
            _context9.t0 = _context9["catch"](0);
            log(req, _context9.t0);
            return _context9.abrupt("return", (0, _util.fail)(res, 400, "Error creating ".concat(_module, " record. ").concat(_context9.t0.message)));

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 4]]);
  }));
  return _updatePhotoHandler.apply(this, arguments);
}

function updateApprovalHandler(_x17, _x18) {
  return _updateApprovalHandler.apply(this, arguments);
} // eslint-disable-next-line complexity


function _updateApprovalHandler() {
  _updateApprovalHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var data, recordId, jwtToken, result;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            data = req.body;
            recordId = req.params.recordId;
            jwtToken = (0, _middleware.getToken)(req);
            _context10.next = 6;
            return (0, _service.updateApprovalService)(recordId, data, jwtToken);

          case 6:
            result = _context10.sent;
            return _context10.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record updated successfully")));

          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](0);
            log(req, _context10.t0);
            return _context10.abrupt("return", (0, _util.fail)(res, 400, "Error updating ".concat(_module, " record. ").concat(_context10.t0.message)));

          case 14:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 10]]);
  }));
  return _updateApprovalHandler.apply(this, arguments);
}

function updateEmploymentHandler(_x19, _x20) {
  return _updateEmploymentHandler.apply(this, arguments);
}

function _updateEmploymentHandler() {
  _updateEmploymentHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var data, recordId, jwtToken, result;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            data = req.body;
            recordId = req.params.recordId;
            jwtToken = (0, _middleware.getToken)(req);
            _context11.next = 6;
            return (0, _service.updateApprovalService)(recordId, data, jwtToken);

          case 6:
            result = _context11.sent;
            return _context11.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " employment record has been updated successfully!")));

          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11["catch"](0);
            log(req, _context11.t0);
            return _context11.abrupt("return", (0, _util.fail)(res, 400, "Error updating ".concat(_module, " record. ").concat(_context11.t0.message)));

          case 14:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return _updateEmploymentHandler.apply(this, arguments);
}