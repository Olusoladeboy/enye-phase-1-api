"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFound = exports.fail = exports.success = void 0;

var _constants = require("../constants");

var success = function success(res) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.STATUS_MSG.SUCCESS.NO_RESULT_FOUND.statusCode;
  var entity = arguments.length > 2 ? arguments[2] : undefined;
  var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.STATUS_MSG.SUCCESS.DEFAULT.customMessage;
  return res.status(status || 200).json({
    success: true,
    message: msg || 'Operation Successful(s)',
    count: entity ? entity.length : 0,
    payload: entity || []
  });
};

exports.success = success;

var fail = function fail(res) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.STATUS_MSG.ERROR.NO_RESULT_FOUND.statusCode;
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.STATUS_MSG.ERROR.NO_RESULT_FOUND.customMessage;
  return res.status(status || 500).json({
    success: false,
    payload: [],
    message: msg || 'Operation failed!'
  });
};

exports.fail = fail;

var notFound = function notFound(res) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.STATUS_MSG.SUCCESS.NO_RESULT_FOUND.customMessage;
  return res.status(_constants.STATUS_MSG.SUCCESS.NO_RESULT_FOUND.statusCode || 404).json({
    success: false,
    payload: [],
    message: msg || 'Record not found!'
  });
};

exports.notFound = notFound;
//# sourceMappingURL=response.js.map