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
exports.updateApprovalService = updateApprovalService;
exports.updateVerificationStatusService = updateVerificationStatusService;
exports.loginService = loginService;
exports.updateTerminalIdService = updateTerminalIdService;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apiQueryParams = _interopRequireDefault(require("api-query-params"));

var _model = _interopRequireWildcard(require("./model"));

var _util = require("../../util");

var _constants = require("../../constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Logging
var _module = 'User';

function fetchService(_x, _x2) {
  return _fetchService.apply(this, arguments);
} // eslint-disable-next-line complexity


function _fetchService() {
  _fetchService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query, jwtToken) {
    var _aqp, limit, filter, skip, sort, projection, population, searchString, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _aqp = (0, _apiQueryParams["default"])(query), limit = _aqp.limit, filter = _aqp.filter, skip = _aqp.skip, sort = _aqp.sort, projection = _aqp.projection, population = _aqp.population;
            searchString = filter.q || '';

            if (searchString) {
              // filter.$text = { $search: searchString, $caseSensitive: false };
              filter.$or = [{
                phone: searchString
              }, {
                phoneHome: searchString
              }, {
                surname: searchString
              }];
              delete filter.q;
            } // filter.deleted = false;


            _context.next = 6;
            return _model["default"].find(filter).populate(population) // .populate({ path: 'notifications', select: 'message', match: { status: 'UNREAD' } })
            .skip(skip).limit(limit).sort(sort).select(projection).exec();

          case 6:
            result = _context.sent;

            if (result) {
              _context.next = 9;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 9:
            return _context.abrupt("return", result);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            throw new Error("Error retrieving ".concat(_module, " record. ").concat(_context.t0.message));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _fetchService.apply(this, arguments);
}

function createService() {
  return _createService.apply(this, arguments);
} // eslint-disable-next-line complexity


function _createService() {
  _createService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var data,
        password,
        email,
        phone,
        _validateCreate$valid,
        error,
        duplicate,
        newRecord,
        result,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
            _context2.prev = 1;
            data.password = data.password || 'peace'; //! Random password

            password = data.password, email = data.email, phone = data.phone;
            console.log(data);
            if ((0, _util.hasProp)(data, 'password')) data.password = (0, _util.hash)(data.password);
            _validateCreate$valid = _model.validateCreate.validate(data), error = _validateCreate$valid.error;

            if (!error) {
              _context2.next = 9;
              break;
            }

            throw new Error("Error validating ".concat(_module, " data. ").concat(error.message));

          case 9:
            _context2.next = 11;
            return _model["default"].findOne({
              $or: [{
                email: email
              }, {
                phone: phone
              }]
            }).exec();

          case 11:
            duplicate = _context2.sent;

            if (!duplicate) {
              _context2.next = 14;
              break;
            }

            throw new Error("Error! Record already exist for ".concat(email, " or ").concat(phone));

          case 14:
            newRecord = new _model["default"](data);
            _context2.next = 17;
            return newRecord.save();

          case 17:
            result = _context2.sent;

            if (result) {
              _context2.next = 20;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 20:
            return _context2.abrupt("return", result);

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](1);
            throw new Error("Error creating ".concat(_module, " record. ").concat(_context2.t0.message));

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 23]]);
  }));
  return _createService.apply(this, arguments);
}

function updateService(_x3) {
  return _updateService.apply(this, arguments);
}

function _updateService() {
  _updateService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(recordId) {
    var data,
        jwtToken,
        _validateUpdate$valid,
        error,
        result,
        _args3 = arguments;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            jwtToken = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : '';
            _context3.prev = 2;

            // eslint-disable-next-line max-len
            // if (recordId === '5a51bc91860d8b5ba0001000') return fail(res, 422, `Cannot update record. ${recordId}`);
            if ((0, _util.hasProp)(data, 'password')) {
              data.password = (0, _util.hash)(data.password);
            }

            _validateUpdate$valid = _model.validateUpdate.validate(data), error = _validateUpdate$valid.error;
            data.status = 'PENDING';

            if (!error) {
              _context3.next = 8;
              break;
            }

            throw new Error("Error validating ".concat(_module, " data. ").concat(error.message));

          case 8:
            _context3.next = 10;
            return _model["default"].findOneAndUpdate({
              _id: recordId
            }, data, {
              "new": true
            });

          case 10:
            result = _context3.sent;

            if (result) {
              _context3.next = 13;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 13:
            return _context3.abrupt("return", result);

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](2);
            throw new Error("Error updating ".concat(_module, " record. ").concat(_context3.t0.message));

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 16]]);
  }));
  return _updateService.apply(this, arguments);
}

function patchService(_x4) {
  return _patchService.apply(this, arguments);
} // eslint-disable-next-line consistent-return


function _patchService() {
  _patchService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(recordId) {
    var data,
        jwtToken,
        result,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            jwtToken = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : '';
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

function deleteService(_x5) {
  return _deleteService.apply(this, arguments);
} // export async function sendOTPService(data = {}, jwtToken = '') {
//     try {
//         const { error } = validateLogin.validate(data);
//         if (error) throw new Error('Invalid paramater: require both Email & Phone for OTP');
//         const { phone, email } = data;
//         const otp = generateOtp();
//         const update = {
//             otp: hash(otp.toString()),
//             $inc: { otpCount: 1 },
//             otpAccess: true,
//         };
//         const q = { $and: [{ email }, { phone }] };
//         const result = await User.findOneAndUpdate(q, update, { new: true }).exec();
//         if (!result) {
//             throw new Error(`User not found with phone ${phone} & email ${email}`);
//         }
//         const msg = `Login to the App using this phone number and the OTP ${otp} -PEACEGROUP`;
//         const sentSmsObject = await sendSmsAsync(msg, phone);
//         const sentEmailObject = await emailForgotPassword(email, msg);
//         // eslint-disable-next-line no-undef
//         logger.info(sentSmsObject, sentEmailObject);
//         return { sentSmsObject, sentEmailObject };
//     } catch (err) {
//         throw new Error(`Error sending ${module} record. ${err.message}`);
//     }
// }
// eslint-disable-next-line complexity


function _deleteService() {
  _deleteService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(recordId) {
    var jwtToken,
        result,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            jwtToken = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : '';
            _context5.prev = 1;

            if (!(recordId === '5a51bc91860d8b5ba0001000')) {
              _context5.next = 4;
              break;
            }

            throw new Error("Cannot delete record. ".concat(recordId));

          case 4:
            _context5.next = 6;
            return _model["default"].findOneAndRemove({
              _id: recordId
            });

          case 6:
            result = _context5.sent;

            if (result) {
              _context5.next = 9;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 9:
            return _context5.abrupt("return", result);

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            throw new Error("Error deleting ".concat(_module, " record. ").concat(_context5.t0.message));

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return _deleteService.apply(this, arguments);
}

function getLoginType(data) {
  var email = data.email,
      phone = data.phone,
      password = data.password;
  var loginType = '';

  if (email && password) {
    loginType = 'EMAIL';
  } else if (phone && password) {
    loginType = 'PHONE';
  } // else if (phone && otp) {
  //     loginType = 'OTP';
  // }


  return loginType;
} // eslint-disable-next-line complexity


function updateApprovalService(_x6) {
  return _updateApprovalService.apply(this, arguments);
} // eslint-disable-next-line consistent-return
// eslint-disable-next-line complexity


function _updateApprovalService() {
  _updateApprovalService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(recordId) {
    var data,
        jwtToken,
        userId,
        status,
        record,
        _validateApproval$val,
        error,
        user,
        result,
        _args6 = arguments;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            data = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
            jwtToken = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : '';
            _context6.prev = 2;
            userId = data.updatedBy;
            status = data.status;
            record = {
              status: status
            };
            console.log(recordId);

            if (!(recordId === '5a51bc91860d8b5ba0001000')) {
              _context6.next = 9;
              break;
            }

            throw new Error('Cannot alter User record');

          case 9:
            _validateApproval$val = _model.validateApproval.validate(data), error = _validateApproval$val.error;

            if (!error) {
              _context6.next = 12;
              break;
            }

            throw new Error("Error validating ".concat(_module, " data. ").concat(error.message));

          case 12:
            _context6.next = 14;
            return _model["default"].findById(recordId).exec();

          case 14:
            user = _context6.sent;

            if (!user.deleted) {
              _context6.next = 17;
              break;
            }

            throw new Error("Error approving ".concat(_module, " record. It was deleted since ").concat(user.deletedAt));

          case 17:
            _context6.t0 = data.status;
            _context6.next = _context6.t0 === 'APPROVED' ? 20 : _context6.t0 === 'REJECTED' ? 23 : 26;
            break;

          case 20:
            record.approvedBy = userId;
            record.approvedDate = Date.now();
            return _context6.abrupt("break", 26);

          case 23:
            record.rejectedBy = userId;
            record.rejectedDate = Date.now();
            return _context6.abrupt("break", 26);

          case 26:
            _context6.next = 28;
            return _model["default"].findOneAndUpdate({
              _id: recordId
            }, record, {
              "new": true
            });

          case 28:
            result = _context6.sent;

            if (result) {
              _context6.next = 31;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 31:
            _context6.next = 36;
            break;

          case 33:
            _context6.prev = 33;
            _context6.t1 = _context6["catch"](2);
            throw new Error("Error updating ".concat(_module, " record. ").concat(_context6.t1.message));

          case 36:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 33]]);
  }));
  return _updateApprovalService.apply(this, arguments);
}

function updateVerificationStatusService(_x7) {
  return _updateVerificationStatusService.apply(this, arguments);
} // eslint-disable-next-line complexity


function _updateVerificationStatusService() {
  _updateVerificationStatusService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(recordId) {
    var data,
        jwtToken,
        verificationDate,
        verificationVideo,
        record,
        _validateVerify$valid,
        error,
        user,
        result,
        _args7 = arguments;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            data = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
            jwtToken = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : '';
            _context7.prev = 2;
            // const userId = data.updatedBy;
            console.log('record =>', recordId);
            verificationDate = data.verificationDate, verificationVideo = data.verificationVideo;
            record = {
              verificationDate: verificationDate,
              verificationVideo: verificationVideo
            };

            if (!(recordId === '5a51bc91860d8b5ba0001000')) {
              _context7.next = 8;
              break;
            }

            throw new Error('Cannot alter User record');

          case 8:
            _validateVerify$valid = _model.validateVerify.validate(data), error = _validateVerify$valid.error;

            if (!error) {
              _context7.next = 11;
              break;
            }

            throw new Error("Error validating ".concat(_module, " data. ").concat(error.message));

          case 11:
            _context7.next = 13;
            return _model["default"].findById(recordId).exec();

          case 13:
            user = _context7.sent;
            console.log(user);

            if (!user.deleted) {
              _context7.next = 17;
              break;
            }

            throw new Error("Error verifying ".concat(_module, " record. It was deleted since ").concat(user.deletedAt));

          case 17:
            record.verificationDate = Date.now();
            _context7.next = 20;
            return updateService(recordId, data);

          case 20:
            result = _context7.sent;

            if (result) {
              _context7.next = 23;
              break;
            }

            throw new Error("".concat(_module, " record not found."));

          case 23:
            _context7.next = 28;
            break;

          case 25:
            _context7.prev = 25;
            _context7.t0 = _context7["catch"](2);
            throw new Error("Error updating ".concat(_module, " record. ").concat(_context7.t0.message));

          case 28:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 25]]);
  }));
  return _updateVerificationStatusService.apply(this, arguments);
}

function loginService(_x8) {
  return _loginService.apply(this, arguments);
}

function _loginService() {
  _loginService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(loginPayload) {
    var _validateLogin$valida, error, email, phone, otp, password, type, filter, user, update, payload, token;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _validateLogin$valida = _model.validateLogin.validate(loginPayload), error = _validateLogin$valida.error;

            if (!error) {
              _context8.next = 4;
              break;
            }

            throw new Error("Invalid ".concat(_module, " login data. ").concat(error.message));

          case 4:
            if (getLoginType(loginPayload)) {
              _context8.next = 6;
              break;
            }

            throw new Error('Invlaid login parameters');

          case 6:
            email = loginPayload.email, phone = loginPayload.phone, otp = loginPayload.otp, password = loginPayload.password, type = loginPayload.type;
            filter = {};

            if (type === 'PHONE' || type === 'OTP') {
              filter.phone = phone;
            } else {
              filter.email = email;
            }

            _context8.next = 11;
            return _model["default"].findOne(filter).select('-createdBy -updatedBy').exec();

          case 11:
            user = _context8.sent;

            if (user) {
              _context8.next = 14;
              break;
            }

            throw new Error('User not found.');

          case 14:
            if (!(type === 'OTP')) {
              _context8.next = 21;
              break;
            }

            if (user.otpAccess) {
              _context8.next = 17;
              break;
            }

            throw new Error("Authentication failed. OTP Access is ".concat(user.otpAccess));

          case 17:
            if (_bcryptjs["default"].compareSync(otp, user.otp.toString())) {
              _context8.next = 19;
              break;
            }

            throw new Error('Invalid OTP credentials.');

          case 19:
            _context8.next = 23;
            break;

          case 21:
            if (_bcryptjs["default"].compareSync(password, user.password)) {
              _context8.next = 23;
              break;
            }

            throw new Error('Wrong password.');

          case 23:
            update = {
              otpAccess: false,
              currentLogin: Date.now(),
              currentIp: loginPayload.currentIp,
              lastLogin: user.currentLogin,
              lastIp: user.currentIp
            };
            _context8.next = 26;
            return _model["default"].findOneAndUpdate({
              _id: user._id
            }, update, {
              "new": true
            }).exec();

          case 26:
            // Delete private attributes
            user.password = null;
            user.otp = null;
            delete user.password;
            delete user.otp;
            payload = {
              id: user.id,
              userType: 'User',
              role: user.role,
              accessLevel: user.accessLevel,
              email: user.email,
              phone: user.phone,
              time: new Date()
            };
            token = _jsonwebtoken["default"].sign(payload, _constants.JWT.jwtSecret, {
              expiresIn: '240h' // JWT.tokenExpireTime,

            });
            return _context8.abrupt("return", {
              token: token,
              user: user
            });

          case 35:
            _context8.prev = 35;
            _context8.t0 = _context8["catch"](0);
            throw new Error("Authentication failed: ".concat(_context8.t0.message));

          case 38:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 35]]);
  }));
  return _loginService.apply(this, arguments);
}

function remakeId(id) {
  return id.replace(id.substring(15, 18), 'ac0');
}

function updateTerminalIdService() {
  return _updateTerminalIdService.apply(this, arguments);
}

function _updateTerminalIdService() {
  _updateTerminalIdService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var list, resolvedArray;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _model["default"].find({}).exec();

          case 3:
            list = _context10.sent;
            _context10.next = 6;
            return Promise.all(list.map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(data) {
                var rec;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        if (!(data.subsidiary === 'PMT')) {
                          _context9.next = 8;
                          break;
                        }

                        console.log('\nOld User ===> ', data);
                        data.terminal = remakeId(data.terminal.toString());
                        console.log('\nNew User ===> ', data);
                        _context9.next = 6;
                        return _model["default"].findOneAndUpdate({
                          _id: data.id
                        }, data, {
                          "new": true
                        });

                      case 6:
                        rec = _context9.sent;
                        return _context9.abrupt("return", rec);

                      case 8:
                        return _context9.abrupt("return", data);

                      case 9:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x9) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 6:
            resolvedArray = _context10.sent;
            _context10.next = 12;
            break;

          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](0);
            throw new Error("Error creating ".concat(_module, " record. ").concat(_context10.t0.message));

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 9]]);
  }));
  return _updateTerminalIdService.apply(this, arguments);
}
//# sourceMappingURL=service.js.map