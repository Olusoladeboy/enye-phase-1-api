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
var _module = "User";

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
            searchString = filter.q || "";

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
            return _model["default"].find(filter).populate(population) // .populate({ path: "notifications", select: "message", match: { status: "UNREAD" } })
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
        jwtToken,
        password,
        email,
        phone,
        _schemaCreate$validat,
        error,
        duplicate,
        newRecord,
        result,
        subject,
        body,
        title,
        surname,
        otherName,
        gender,
        birthDate,
        photo,
        phoneHome,
        address,
        state,
        county,
        country,
        kin,
        kinPhone,
        kinAddress,
        terminal,
        customerData,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
            jwtToken = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : "";
            _context2.prev = 2;
            data.password = data.password || "peace"; //! Random password

            password = data.password, email = data.email, phone = data.phone;
            if ((0, _util.hasProp)(data, "password")) data.password = (0, _util.hash)(data.password);
            _schemaCreate$validat = _model.schemaCreate.validate(data), error = _schemaCreate$validat.error;

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
            //* Send Login credentials to User via email
            subject = "Welcome, ".concat(data.otherName, " to Peacegroup ERP Dove2.0");
            body = "Your email is ".concat(data.email, " and your password is ").concat(password); // await sendEmailAsync(data.email, "no-reply@peacegroup.ng", subject, body);
            //* Create Customer Credentials for User

            title = data.title, surname = data.surname, otherName = data.otherName, gender = data.gender, birthDate = data.birthDate, photo = data.photo, phoneHome = data.phoneHome, address = data.address, state = data.state, county = data.county, country = data.country, kin = data.kin, kinPhone = data.kinPhone, kinAddress = data.kinAddress, terminal = data.terminal;
            customerData = {
              title: title,
              surname: surname,
              otherName: otherName,
              gender: gender,
              birthDate: birthDate,
              photo: photo,
              password: password,
              phoneHome: phoneHome,
              address: address,
              state: state,
              county: county,
              country: country,
              isUser: true,
              email: email,
              phone: phone,
              terminal: terminal
            };
            customerData.contactPerson = "".concat(kin, ", ").concat(kinAddress);
            customerData.contactPersonPhone = kinPhone; // const customer = postData(jwtToken, "/erp/customers", customerData);
            // console.log(customer);

            _context2.next = 31;
            break;

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2["catch"](2);
            throw new Error("Error creating ".concat(_module, " record. ").concat(_context2.t0.message));

          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 28]]);
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
        _schemaUpdate$validat,
        error,
        result,
        _args3 = arguments;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            jwtToken = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : "";
            _context3.prev = 2;

            // eslint-disable-next-line max-len
            // if (recordId === "5a51bc91860d8b5ba0001000") return fail(res, 422, `Cannot update record. ${recordId}`);
            if ((0, _util.hasProp)(data, "password")) {
              data.password = (0, _util.hash)(data.password);
            }

            _schemaUpdate$validat = _model.schemaUpdate.validate(data), error = _schemaUpdate$validat.error;
            data.status = "PENDING";

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
            _context3.next = 18;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](2);
            throw new Error("Error updating ".concat(_module, " record. ").concat(_context3.t0.message));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 15]]);
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
            jwtToken = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : "";
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
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](2);
            throw new Error("Error patching ".concat(_module, " record. ").concat(_context4.t0.message));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 10]]);
  }));
  return _patchService.apply(this, arguments);
}

function deleteService(_x5) {
  return _deleteService.apply(this, arguments);
} // export async function sendOTPService(data = {}, jwtToken = "") {
//     try {
//         const { error } = schemaLogin.validate(data);
//         if (error) throw new Error("Invalid paramater: require both Email & Phone for OTP");
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
            jwtToken = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : "";
            _context5.prev = 1;

            if (!(recordId === "5a51bc91860d8b5ba0001000")) {
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
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](1);
            throw new Error("Error deleting ".concat(_module, " record. ").concat(_context5.t0.message));

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 11]]);
  }));
  return _deleteService.apply(this, arguments);
}

function getLoginType(data) {
  var email = data.email,
      phone = data.phone,
      password = data.password;
  var loginType = "";

  if (email && password) {
    loginType = "EMAIL";
  } else if (phone && password) {
    loginType = "PHONE";
  } // else if (phone && otp) {
  //     loginType = "OTP";
  // }


  return loginType;
} // eslint-disable-next-line complexity
// export async function updateApprovalService(recordId, data = {}, jwtToken = "") {
//     try {
//         const userId = data.updatedBy;
//         const { status, approvalRemark, accessLevel } = data;
//         const record = { status, approvalRemark, accessLevel };
//         if (recordId === "5a51bc91860d8b5ba0001000") throw new Error("Cannot alter User record");
//         const { error } = schemaApproval.validate(data);
//         if (error) throw new Error(`Error validating ${module} data. ${error.message}`);
//         const User = await User.findById(recordId).exec();
//         if (User.deleted) throw new Error(`Error approving ${module} record. It was deleted since ${User.deletedAt}`);
//         switch (data.status) {
//         case "APPROVED":
//             record.approvedBy = userId;
//             record.approvedDate = Date.now();
//             break;
//         case "REJECTED":
//             record.rejectedBy = userId;
//             record.rejectedDate = Date.now();
//             break;
//         default:
//         }
//         const result = await User.findOneAndUpdate({ _id: recordId }, record, { new: true });
//         if (!result) {
//             throw new Error(`${module} record not found.`);
//         }
//     } catch (err) {
//         throw new Error(`Error updating ${module} record. ${err.message}`);
//     }
// }
// eslint-disable-next-line consistent-return
// eslint-disable-next-line complexity
// export async function updateEmploymentService(recordId, data = {}, jwtToken = "") {
//     try {
//         const userId = data.updatedBy;
//         const { employment, employmentRemark } = data;
//         const record = { employment, employmentRemark };
//         if (recordId === "5a51bc91860d8b5ba0001000") throw new Error("Cannot alter User record");
//         const { error } = schemaEmployment.validate(data);
//         if (error) throw new Error(`Error validating ${module} data. ${error.message}`);
//         const User = await User.findById(recordId).exec();
//         if (User.deleted) throw new Error(`Error approving ${module} record. It was deleted since ${User.deletedAt}`);
//         switch (data.employment) {
//         case "EMPLOYED":
//             record.employedBy = userId;
//             record.employedDate = Date.now();
//             record.accessLevel = 1;
//             break;
//         case "FULLTIME":
//             record.fulltimedBy = userId;
//             record.fulltimedDate = Date.now();
//             break;
//         case "PARTTIME":
//             record.parttimedBy = userId;
//             record.parttimedDate = Date.now();
//             break;
//         case "LEAVE":
//             record.leaveBy = userId;
//             record.leaveDate = Date.now();
//             record.accessLevel = 1;
//             break;
//         case "PROBATED":
//             record.probatedBy = userId;
//             record.probatedDate = Date.now();
//             record.accessLevel = 1;
//             break;
//         case "SUSPENDED":
//             record.suspendedBy = userId;
//             record.suspendedDate = Date.now();
//             record.isSalaryPayable = false;
//             record.accessLevel = 0;
//             break;
//         case "RETIRED":
//             record.retiredBy = userId;
//             record.retiredDate = Date.now();
//             record.isSalaryPayable = false;
//             record.accessLevel = 0;
//             break;
//         case "DISENGAGED":
//             record.disengagedBy = userId;
//             record.disengagedDate = Date.now();
//             record.isSalaryPayable = false;
//             record.accessLevel = 0;
//             break;
//         default:
//         }
//         const result = await updateService(recordId, data);
//         if (!result) {
//             throw new Error(`${module} record not found.`);
//         }
//     } catch (err) {
//         throw new Error(`Error updating ${module} record. ${err.message}`);
//     }
// }

/*
export async function createRecord(req, res) {
    try {
        return upload(req, res, async (err) => {
            const data = req.body;
            data.createdBy = req.user.id;
            const { error } = schemaCreate.validate(data);
            if (error) return fail(res, 422, `Error validating request data. ${error.message}`);
            if (err || req.file === undefined) {
                return fail(res, 422, `Error processing file. ${err.message}`);
            }
            const fullPath = `upload/photo/${req.file.filename}`;
            data.photo = fullPath;
            const newRecord = new Item(data);
            const result = await newRecord.save();
            if (!result) {
                return fail(res, "Error: Bad Request: Model not found");
            }
            return success(res, 201, result, "Record created successfully!");
        });
    } catch (err) {
        logger.error(`[400] [${getRequestIp(req)}] [${req.method}]
        [${safeGet(req.user, "email")}] - [${req.path}], [${module}], ${err.message}`);
        return fail(res, 400, `Error creating record. ${err.message}`);
    }
}
 */
// eslint-disable-next-line complexity


function loginService(_x6) {
  return _loginService.apply(this, arguments);
}

function _loginService() {
  _loginService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(loginPayload) {
    var _schemaLogin$validate, error, email, phone, otp, password, type, filter, user, update, payload, token;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _schemaLogin$validate = _model.schemaLogin.validate(loginPayload), error = _schemaLogin$validate.error;

            if (!error) {
              _context6.next = 4;
              break;
            }

            throw new Error("Invalid ".concat(_module, " login data. ").concat(error.message));

          case 4:
            if (getLoginType(loginPayload)) {
              _context6.next = 6;
              break;
            }

            throw new Error("Invlaid login parameters");

          case 6:
            email = loginPayload.email, phone = loginPayload.phone, otp = loginPayload.otp, password = loginPayload.password, type = loginPayload.type;
            filter = {};

            if (type === "PHONE" || type === "OTP") {
              filter.phone = phone;
            } else {
              filter.email = email;
            }

            _context6.next = 11;
            return _model["default"].findOne(filter).populate({
              path: "role",
              select: "name permissions",
              populate: {
                path: "permissions",
                select: "name action"
              }
            }).populate({
              path: "office"
            }).populate({
              path: "terminal",
              select: "name"
            }).populate({
              path: "notifications",
              select: "message",
              match: {
                status: "UNREAD"
              }
            }).select("-createdBy -updatedBy").exec();

          case 11:
            user = _context6.sent;

            if (user) {
              _context6.next = 14;
              break;
            }

            throw new Error("User not found.");

          case 14:
            if (user.accessLevel > 1) {
              _context6.next = 16;
              break;
            }

            throw new Error("Insufficient Access Level");

          case 16:
            if (!(type === "OTP")) {
              _context6.next = 23;
              break;
            }

            if (user.otpAccess) {
              _context6.next = 19;
              break;
            }

            throw new Error("Authentication failed. OTP Access is ".concat(user.otpAccess));

          case 19:
            if (_bcryptjs["default"].compareSync(otp, user.otp.toString())) {
              _context6.next = 21;
              break;
            }

            throw new Error("Invalid OTP credentials.");

          case 21:
            _context6.next = 25;
            break;

          case 23:
            if (_bcryptjs["default"].compareSync(password, user.password)) {
              _context6.next = 25;
              break;
            }

            throw new Error("Wrong password.");

          case 25:
            update = {
              otpAccess: false,
              currentLogin: Date.now(),
              currentIp: loginPayload.currentIp,
              lastLogin: user.currentLogin,
              lastIp: user.currentIp
            };
            _context6.next = 28;
            return _model["default"].findOneAndUpdate({
              _id: user._id
            }, update, {
              "new": true
            }).exec();

          case 28:
            // Delete private attributes
            user.password = null;
            user.otp = null;
            delete user.password;
            delete user.otp;
            payload = {
              id: user.id,
              userType: "User",
              terminal: user.terminal,
              subsidiary: user.subsidiary,
              role: user.role,
              accessLevel: user.accessLevel,
              email: user.email,
              phone: user.phone,
              time: new Date()
            };
            token = _jsonwebtoken["default"].sign(payload, _constants.JWT.jwtSecret, {
              expiresIn: "240h" // JWT.tokenExpireTime,

            });
            return _context6.abrupt("return", {
              token: token,
              user: user
            });

          case 37:
            _context6.prev = 37;
            _context6.t0 = _context6["catch"](0);
            throw new Error("Authentication failed: ".concat(_context6.t0.message));

          case 40:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 37]]);
  }));
  return _loginService.apply(this, arguments);
}

function remakeId(id) {
  return id.replace(id.substring(15, 18), "ac0");
}

function updateTerminalIdService() {
  return _updateTerminalIdService.apply(this, arguments);
}

function _updateTerminalIdService() {
  _updateTerminalIdService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var list, resolvedArray;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _model["default"].find({}).exec();

          case 3:
            list = _context8.sent;
            _context8.next = 6;
            return Promise.all(list.map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(data) {
                var rec;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        if (!(data.subsidiary === "PMT")) {
                          _context7.next = 8;
                          break;
                        }

                        console.log("\nOld User ===> ", data);
                        data.terminal = remakeId(data.terminal.toString());
                        console.log("\nNew User ===> ", data);
                        _context7.next = 6;
                        return _model["default"].findOneAndUpdate({
                          _id: data.id
                        }, data, {
                          "new": true
                        });

                      case 6:
                        rec = _context7.sent;
                        return _context7.abrupt("return", rec);

                      case 8:
                        return _context7.abrupt("return", data);

                      case 9:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x7) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 6:
            resolvedArray = _context8.sent;
            _context8.next = 12;
            break;

          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](0);
            throw new Error("Error creating ".concat(_module, " record. ").concat(_context8.t0.message));

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return _updateTerminalIdService.apply(this, arguments);
}