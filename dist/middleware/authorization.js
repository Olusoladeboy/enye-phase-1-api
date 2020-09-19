"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;
exports.checkAuth = checkAuth;
exports.isValidUser = isValidUser;
exports.isAuthorized = isAuthorized;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = require("jsonwebtoken");

var _constants = require("../constants");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/* eslint-disable object-curly-newline */

/* eslint-disable no-console */

/* eslint-disable arrow-parens */
_dotenv["default"].config();

var logger = _util.log4js.getLogger("[".concat(module, "]")); // Retrieve token from request header


function getToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  if (req.query && (0, _util.hasProp)(req.query, 'token')) {
    return req.query.token;
  }

  return null;
}

function checkAuth(req, res, next) {
  try {
    var token = getToken(req);
    if (!token) return (0, _util.fail)(res, 403, 'No token found in request header!'); // eslint-disable-next-line complexity

    return (0, _jsonwebtoken.verify)(token, _constants.JWT.jwtSecret, function (err, decoded) {
      console.log(decoded);
      if (err) return (0, _util.fail)(res, 403, 'Failed to authenticate token.!');
      req.user = {
        id: decoded.id,
        userType: decoded.userType,
        email: decoded.email,
        phone: decoded.phone,
        currentIp: (0, _util.getRequestIp)(req)
      };

      if (req.method === 'POST') {
        req.body.createdBy = req.user.id;
      } else if (req.method === 'PUT') {
        req.body.updatedBy = req.user.id;
      } else if (req.method === 'PATCH') {
        if (req.body.deleted === true || req.body.deleted === 'true') {
          req.body = {};
          req.body.deleted = true;
          req.body.deletedAt = Date.now();
          req.body.deletedBy = req.user.id;
        }
      } else if (req.method === 'DELETE') {
        req.body = {};
      }

      return next();
    });
  } catch (err) {
    console.log('Error from check authorization');
    return (0, _util.fail)(res, 403, "user not Authenticated! ".concat(err.message));
  }
}

function isValidUser(req, res, next) {
  try {
    console.log('User ==> ', req.user);
    var _req$user = req.user,
        userType = _req$user.userType,
        id = _req$user.id,
        email = _req$user.email,
        phone = _req$user.phone;
    if (userType !== 'User') return (0, _util.fail)(res, 403, 'Invalid User credentials!');
    console.log("\nValidating userType ".concat(userType, ", id ").concat(id, ", email ").concat(email, ", phone ").concat(phone)); // if (email === 'admin@peacegroup.ng' || safeGet(role, 'name') === 'SUPER_ADMIN') return next();
    // if (!role) return fail(res, 403, 'Invalid User credentials! No user-role found');

    return next(); // return isAuthorized(req, res,next);
  } catch (err) {
    logger.error("[400] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, 'email'), "] - [").concat(req.path, "], [Authentication], ").concat(err.message));
    return (0, _util.fail)(res, 403, "User not Validated! ".concat(err.message));
  }
}

function isAuthorized(req, res, next) {
  try {
    var reqAction;
    var path = req.path,
        method = req.method;

    switch (method) {
      case 'POST':
        reqAction = 'CREATE';
        break;

      case 'PUT':
        reqAction = 'UPDATE';
        break;

      case 'PATCH':
        reqAction = 'HIDE';
        break;

      case 'DELETE':
        reqAction = 'DELETE';
        break;

      case 'GET':
        reqAction = 'READ';
        break;

      default:
        reqAction = 'READ';
        break;
    }

    var _req$user$role = req.user.role,
        roleName = _req$user$role.name,
        permissionArray = _req$user$role.permissions;
    if (roleName === 'SUPER_ADMIN') return next();
    var resource = path.split('/', 2)[1].replace(/-/g, '').replace(/s$/, '').toUpperCase();
    var requiredPermission = "".concat(reqAction, "_").concat(resource);
    if (!permissionArray) return (0, _util.fail)(res, 403, 'Invalid User credentials! No permission found - 101');
    var permissionRecords = permissionArray.find(function (item) {
      return item.name === requiredPermission;
    });
    var msg = "Invalid credentials! Role ".concat(roleName, " lacks permission ").concat(requiredPermission);
    if (!permissionRecords) return (0, _util.fail)(res, 403, msg);
    return next();
  } catch (err) {
    logger.error("[400] [".concat((0, _util.getRequestIp)(req), "] [").concat(req.method, "] [").concat((0, _util.safeGet)(req.user, 'email'), "] - [").concat(req.path, "], [Authentication], ").concat(err.message));
    return (0, _util.fail)(res, 403, "User not Authorized! ".concat(err.message));
  }
}
//# sourceMappingURL=authorization.js.map