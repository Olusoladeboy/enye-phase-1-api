import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import { JWT } from "../constants";
import { fail, hasProp, safeGet, log4js, getRequestIp } from "../util";

dotenv.config();


const logger = log4js.getLogger(`[${module}]`);


// Retrieve token from request header
export function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
    if (req.query && hasProp(req.query, "token")) {
        return req.query.token;
    }
    return null;
}

export function checkAuth(req, res, next) {
    try {
        const token = getToken(req);
        if (!token) return fail(res, 403, "No token found in request header!");
        // eslint-disable-next-line complexity
        return verify(token, JWT.jwtSecret, (err, decoded) => {
            if (err) return fail(res, 403, "Failed to authenticate token.!");
            req.user = {
                id: decoded.id,
                email: decoded.email,
                phone: decoded.phone,
                currentIp: getRequestIp(req),

            };
            if (req.method === "POST") {
                req.body.createdBy = req.user.id;
            }
            else if (req.method === "PUT") {
                req.body.updatedBy = req.user.id;
            }
            else if (req.method === "PATCH") {
                if (req.body.deleted === true || req.body.deleted === "true") {
                    req.body = {};
                    req.body.deleted = true;
                    req.body.deletedAt = Date.now();
                    req.body.deletedBy = req.user.id;
                }
            }
            else if (req.method === "DELETE") {
                req.body = {};
            }
            return next();
        });
    }
    catch (err) {
        return fail(res, 403, `user not Authenticated! ${err.message}`);
    }
}

export function isValidUser(req, res, next) {
    try {
        const { userType, id, email, phone } = req.user;
        if (userType !== "User") return fail(res, 403, "Invalid User credentials!");
        console.log(`\nValidating userType ${userType}, id ${id}, email ${email}, phone ${phone}`);
        // if (email === "admin@peacegroup.ng" || safeGet(role, "name") === "SUPER_ADMIN") return next();
        // if (!role) return fail(res, 403, "Invalid User credentials! No user-role found");
        return next();
        // return isAuthorized(req, res,next);
    }
    catch (err) {
        logger.error(`[400] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, "email")}] - [${req.path}], [Authentication], ${err.message}`);
        return fail(res, 403, `User not Validated! ${err.message}`);
    }
}

// export function isAuthorized(req, res, next) {
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
