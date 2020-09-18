import {
  fetchService, createService, updateService, patchService, deleteService,
} from './service';
import {
  success, fail, safeGet, getRequestIp, log4js,
} from '../../../util';

// Logging
const module = 'Category';
const logger = log4js.getLogger(`[${module}]`);
function log(req, err) {
  logger.error(`[400] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, 'email')}] - [${req.path}], [${module}], ${err.message}`);
}

export async function fetchHandler(req, res) {
  try {
    const { result, metadata } = await fetchService(req.query);
    return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`, metadata);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error retrieving ${module} record. ${err.message}`);
  }
}

export async function createHandler(req, res) {
  try {
    const result = await createService(req.body);
    return success(res, 201, result, `${module} record(s) created successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error creating ${module} record. ${err.message}`);
  }
}

export async function updateHandler(req, res) {
  try {
    const result = await updateService(req.params.recordId, req.body);
    return success(res, 200, result, `${module} record(s) updated successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error updating ${module} record. ${err.message}`);
  }
}

export async function patchHandler(req, res) {
  try {
    const result = await patchService(req.params.recordId, req.body);
    return success(res, 200, result, `${module} record(s) patched successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error patching ${module} record. ${err.message}`);
  }
}

export async function deleteHandler(req, res) {
  try {
    const result = await deleteService(req.params.recordId);
    return success(res, 200, result, `${module} record(s) deleted successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error deleting ${module} record. ${err.message}`);
  }
}
