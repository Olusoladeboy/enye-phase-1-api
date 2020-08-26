"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;
exports.checkAuth = checkAuth;
exports.isValidUser = isValidUser;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = require("jsonwebtoken");

var _constants = require("../constants");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // const logger = log4js.getLogger(`[${module}]`);
// Retrieve token from request header


function getToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }

  if (req.query && (0, _util.hasProp)(req.query, "token")) {
    return req.query.token;
  }

  return null;
}

function checkAuth(req, res, next) {
  try {
    var token = getToken(req);
    if (!token) return (0, _util.fail)(res, 403, "No token found in request header!"); // eslint-disable-next-line complexity

    return (0, _jsonwebtoken.verify)(token, _constants.JWT.jwtSecret, function (err, decoded) {
      if (err) return (0, _util.fail)(res, 403, "Failed to authenticate token.!");
      req.user = {
        id: decoded.id,
        email: decoded.email,
        phone: decoded.phone,
        currentIp: (0, _util.getRequestIp)(req)
      };

      if (req.method === "POST") {
        req.body.createdBy = req.user.id;
      } else if (req.method === "PUT") {
        req.body.updatedBy = req.user.id;
      } else if (req.method === "PATCH") {
        if (req.body.deleted === true || req.body.deleted === "true") {
          req.body = {};
          req.body.deleted = true;
          req.body.deletedAt = Date.now();
          req.body.deletedBy = req.user.id;
        }
      } else if (req.method === "DELETE") {
        req.body = {};
      }

      return next();
    });
  } catch (err) {
    return (0, _util.fail)(res, 403, "user not Authenticated! ".concat(err.message));
  }
}

function isValidUser(req, res, next) {
  try {
    var _req$user = req.user,
        userType = _req$user.userType,
        id = _req$user.id,
        email = _req$user.email,
        phone = _req$user.phone;
    if (userType !== "User") return (0, _util.fail)(res, 403, "Invalid User credentials!");
    console.log("\nValidating userType ".concat(userType, ", id ").concat(id, ", email ").concat(email, ", phone ").concat(phone)); // if (email === "admin@peacegroup.ng" || safeGet(role, "name") === "SUPER_ADMIN") return next();
    // if (!role) return fail(res, 403, "Invalid User credentials! No user-role found");

    return next(); // return isAuthorized(req, res,next);
  } catch (err) {
    // logger.error(`[400] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, "email")}] - [${req.path}], [Authentication], ${err.message}`);
    return (0, _util.fail)(res, 403, "User not Validated! ".concat(err.message));
  }
} // export function isAuthorized(req, res, next) {
//     try {
//         let reqAction;
//         const { path, method } = req;
//         switch (method) {
//             case "POST":
//                 reqAction = "CREATE";
//                 break;
//             case "PUT":
//                 reqAction = "UPDATE";
//                 break;
//             case "PATCH":
//                 reqAction = "HIDE";
//                 break;
//             case "DELETE":
//                 reqAction = "DELETE";
//                 break;
//             case "GET":
//                 reqAction = "READ";
//                 break;
//             default:
//                 reqAction = "READ";
//                 break;
//         }
//         const { name: roleName, permissions: permissionArray } = req.user.role;
//         if (roleName === "SUPER_ADMIN") return next();
//         const resource = path.split("/", 2)[1].replace(/-/g, "").replace(/s$/, "").toUpperCase();
//         const requiredPermission = `${reqAction}_${resource}`;
//         if (!permissionArray) return fail(res, 403, "Invalid User credentials! No permission found - 101");
//         const permissionRecords = permissionArray.find(item => item.name === requiredPermission);
//         const msg = `Invalid credentials! Role ${roleName} lacks permission ${requiredPermission}`;
//         if (!permissionRecords) return fail(res, 403, msg);
//         return next();
//     }
//     catch (err) {
//         logger.error(`[400] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, "email")}] - [${req.path}], [Authentication], ${err.message}`);
//         return fail(res, 403, `User not Authorized! ${err.message}`);
//     }
// }