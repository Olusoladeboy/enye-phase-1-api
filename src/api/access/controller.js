import aqp from "api-query-params";
import Access from "./model";
import { success, fail, safeGet, getRequestIp, log4js } from "../../../util";

// Logging
const module = "Access";
const logger = log4js.getLogger(`[${module}]`);
function log(req, err) {
    logger.error(`[400] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, "email")}] - [${req.path}], [${module}], ${err.message}`);
}

export async function fetchRecord(req, res) {
    const { query } = req;
    const { filter, skip, limit, sort, projection } = aqp(query);
    try {
        const result = await Access.find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .select(projection)
            .exec();
        if (!result) {
            return fail(res, 404, `${module} record not found.`);
        }
        logger.info(`[200] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, "email")}] - [${req.path}]`);
        return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`);
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error retrieving ${module} record. ${err.message}`);
    }
}

export async function createRecord(req, res) {
    try {
        const data = req.body;
        const newRecord = new Access(data);
        const result = await newRecord.save();
        if (!result) {
            return fail(res, 404, `${module} record not found.`);
        }
        return success(res, 201, result, `${module} record(s) created successfully!`);
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error creating ${module} record. ${err.message}`);
    }
}

export async function deleteRecord(req, res) {
    const { recordId } = req.params;
    try {
        const result = await Access.findOneAndRemove({ _id: recordId });
        if (!result) {
            return fail(res, 404, `${module} record not found.`);
        }
        return success(res, 200, result, `${module} record(s) deleted successfully!`);
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error deleting ${module} record. ${err.message}`);
    }
}
