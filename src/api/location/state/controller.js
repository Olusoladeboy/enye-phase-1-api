/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import aqp from 'api-query-params';
import State, { validateCreate, validateUpdate } from './model';
import { success, fail, safeGet, log4js, getRequestIp } from '../../../util';
import { STATUS_MSG } from '../../../constants';

// Logging
const module = 'State';
const logger = log4js.getLogger(`[${module}]`);
function log(req, err) {
  logger.error(`[400] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, 'email')}] - [${req.path}], [${module}], ${err.message}`);
}

export async function fetchRecord(req, res) {
  const { query } = req;
  const { filter, skip, limit, sort, projection } = aqp(query);
  try {
    const result = await State.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .exec();
    if (!result) {
      return fail(res, 404, `${module} record not found.`);
    }
    logger.info(`[200] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, 'email')}] - [${req.path}]`);
    return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error retrieving ${module} record. ${err.message}`);
  }
}

export async function createRecord(req, res) {
  const data = req.body;
  const { error } = validateCreate.validate(data);
  if (error) return fail(res, 422, `Error validating ${module} data. ${error.message}`);
  const newRecord = new State(data);
  try {
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

export async function updateRecord(req, res) {
  const data = req.body;
  const { recordId } = req.params;
  const { error } = validateUpdate.validate(data);
  if (error) return fail(res, 422, `Error validating ${module} data. ${error.message}`);
  try {
    const result = await State.findOneAndUpdate({ _id: recordId }, data, { new: true });
    if (!result) {
      return fail(res, 404, `${module} record not found.`);
    }
    return success(res, 200, result, `${module} record(s) updated successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error updating ${module} record. ${err.message}`);
  }
}

export async function patchRecord(req, res) {
  const data = req.body;
  const { recordId } = req.params;
  try {
    const result = await State.findOneAndUpdate({ _id: recordId }, data, { new: true });
    if (!result) {
      return fail(res, 404, `${module} record not found.`);
    }
    return success(res, 200, result, `${module} record(s) patched successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error patching ${module} record. ${err.message}`);
  }
}

export async function deleteRecord(req, res) {
  const { recordId } = req.params;
  try {
    const result = await State.findOneAndRemove({ _id: recordId });
    if (!result) {
      return fail(res, 404, `${module} record not found.`);
    }
    return success(res, 200, result, `${module} record(s) deleted successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error deleting ${module} record. ${err.message}`);
  }
}
