/* eslint-disable object-curly-newline */
import { success, fail, safeGet, log4js, getRequestIp } from '../../util';
import { fetchService, createService, updateService, patchService, deleteService } from './service';

const module = 'Reviews';
const logger = log4js.getLogger(`[${module}]`);
function log(req, err) {
  logger.error(`[400] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, 'email')}] - [${req.path}], [${module}], ${err.message}`);
}

export async function fetchHandler(req, res) {
  try {
    const result = await fetchService(req.query);
    return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`);
  } catch (err) {
    log(req, err);
    return fail(res, 400, err.message);
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
  try {
    const { recordId } = req.params;
    const result = await patchService(recordId, req.body);
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
