import bcryptjs from "bcryptjs";
import { JWT } from "../constants";

export function isRealValue(object) {
    return typeof object !== "undefined" || object !== null;
}

export function hasProp(obj, prop) {
    if (!isRealValue(obj)) return false;
    return (obj[ prop ] !== undefined);
    // return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function getRequestIp(request) {
    let ipAddr = request.connection.remoteAddress;
    if (request.headers && request.headers[ "x-forwarded-for" ]) {
        [ipAddr] = request.headers[ "x-forwarded-for" ].split(",");
    }
    return ipAddr;
}

export function hash(str = "") {
    return bcryptjs.hashSync(str, JWT.saltRounds);
}