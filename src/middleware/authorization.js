import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import { JWT } from "../constants";
import { fail, hasProp, getRequestIp } from "../util";

dotenv.config();

// Retrieve token from request header
export function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[ 0 ] === "Bearer") {
        return req.headers.authorization.split(" ")[ 1 ];
    } if (req.query && hasProp(req.query, "token")) {
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
        return fail(res, 403, `user not Authenticated! ${err.message}`);
    }
}