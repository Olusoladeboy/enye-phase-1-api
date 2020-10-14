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
exports.updateApprovalHandler = updateApprovalHandler;
exports.updateVerificationStatusHandler = updateVerificationStatusHandler;

var _service = require("./service");

var _util = require("../../util");

var _middleware = require("../../middleware");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import { photoUpload } from "../../services";
// Logging
var _module = 'User';

var logger = _util.log4js.getLogger("[".concat(_module, "]"));

function log(req, err) {
  logger.error("[400] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, 'email'), "] - [").concat(req.path, "], [").concat(_module, "], ").concat(err.message));
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
}

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
} // eslint-disable-next-line complexity


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

function getLoginType(data) {
  var email = data.email,
      phone = data.phone,
      otp = data.otp,
      password = data.password;
  var loginType = '';

  if (email && password) {
    loginType = 'EMAIL';
  } else if (phone && password) {
    loginType = 'PHONE';
  } else if (phone && otp) {
    loginType = 'OTP';
  }

  return loginType;
}

function loginHandler(_x11, _x12) {
  return _loginHandler.apply(this, arguments);
} // export async function sendOTPHandler(req, res) {
//   try {
//     const jwtToken = getToken(req);
//     await sendOTPService(req.body, jwtToken);
//     return success(res, 200, {}, 'OTP sent successfully!');
//   } catch (err) {
//     log(req, err);
//     return fail(res, 400, `Error sending ${module} record. ${err.message}`);
//   }
// }
// export async function updatePhotoHandler(req, res) {
//   try {
//     return photoUpload(req, res, async(err) => {
//       const data = {};
//       const { recordId } = req.params;
//       data.updatedBy = req.user.id;
//       const jwtToken = getToken(req);
//       if (err || req.file === undefined) return fail(res, 422,
// `Error processing file. ${err.message}`);
//       const fullPath = `upload/photo/${req.file.filename}`;
//       data.photo = fullPath;
//       const result = await updateService(recordId, data, jwtToken);
//       if (!result) {
//         return fail(res, 404, `${module} record not found.`);
//       }
//       return success(res, 200, result, `${result.length} ${module} record(s)
//        retrieved successfully!`);
//     });
//   } catch (err) {
//     log(req, err);
//     return fail(res, 400, `Error creating ${module} record. ${err.message}`);
//   }
// }
// eslint-disable-next-line complexity


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
            return _context6.abrupt("return", (0, _util.success)(res, 201, result, 'Login was successful!'));

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

function updateApprovalHandler(_x13, _x14) {
  return _updateApprovalHandler.apply(this, arguments);
} // eslint-disable-next-line complexity


function _updateApprovalHandler() {
  _updateApprovalHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var data, recordId, jwtToken, result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            data = req.body;
            recordId = req.params.recordId;
            jwtToken = (0, _middleware.getToken)(req);
            _context7.next = 6;
            return (0, _service.updateApprovalService)(recordId, data, jwtToken);

          case 6:
            result = _context7.sent;
            return _context7.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " record updated successfully")));

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            log(req, _context7.t0);
            return _context7.abrupt("return", (0, _util.fail)(res, 400, "Error updating ".concat(_module, " record. ").concat(_context7.t0.message)));

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return _updateApprovalHandler.apply(this, arguments);
}

function updateVerificationStatusHandler(_x15, _x16) {
  return _updateVerificationStatusHandler.apply(this, arguments);
}

function _updateVerificationStatusHandler() {
  _updateVerificationStatusHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var data, recordId, jwtToken, result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            data = req.body;
            recordId = req.params.recordId;
            jwtToken = (0, _middleware.getToken)(req);
            _context8.next = 6;
            return (0, _service.updateVerificationStatusService)(recordId, data, jwtToken);

          case 6:
            result = _context8.sent;
            return _context8.abrupt("return", (0, _util.success)(res, 200, result, "".concat(_module, " employment record has been updated successfully!")));

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](0);
            log(req, _context8.t0);
            return _context8.abrupt("return", (0, _util.fail)(res, 400, "Error updating ".concat(_module, " record. ").concat(_context8.t0.message)));

          case 14:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return _updateVerificationStatusHandler.apply(this, arguments);
}
//# sourceMappingURL=controller.js.map