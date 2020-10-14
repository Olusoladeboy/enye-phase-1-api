import {
  fetchService, createService, updateService, patchService, deleteService,
} from './service';
import {
  success, fail, safeGet, getRequestIp, log4js,
} from '../../util';

// Logging
const module = 'Category';
const logger = log4js.getLogger(`[${module}]`);
function log(req, err) {
  logger.error(`[400] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, 'email')}] - [${req.path}], [${module}], ${err.message}`);
}

export async function fetchHandler(req, res) {
  const { query } = req;
  try {
    const result = await fetchService(query);
    logger.info(`[200] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, 'email')}] - [${req.path}]`);
    return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error retrieving ${module} record. ${err.message}`);
  }
}

export async function createHandler(req, res) {
  try {
    const data = req.body;
    const result = await createService(data);
    return success(res, 201, result, `${module} record(s) created successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error creating ${module} record. ${err.message}`);
  }
}

export async function updateHandler(req, res) {
  try {
    const data = req.body;
    const { recordId } = req.params;
    const result = await updateService(recordId, data);
    return success(res, 200, result, `${module} record(s) updated successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error updating ${module} record. ${err.message}`);
  }
}

export async function patchHandler(req, res) {
  const data = req.body;
  const { recordId } = req.params;
  try {
    const result = await patchService(recordId, data);
    return success(res, 200, result, `${module} record(s) patched successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error patching ${module} record. ${err.message}`);
  }
}

export async function deleteHandler(req, res) {
  const { recordId } = req.params;
  try {
    const result = await deleteService(recordId);
    return success(res, 200, result, `${module} record(s) deleted successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error deleting ${module} record. ${err.message}`);
  }
}