/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import multer from 'multer';
import appRoot from 'app-root-path';
import dotenv from 'dotenv';

import {
  fetchService, createService, updateService, patchService, deleteService,
} from './service';
import {
  success, fail, safeGet, log4js, getRequestIp,
} from '../../../util';

dotenv.config();

// Logging
const module = 'Media';
const logger = log4js.getLogger(`[${module}]`);
function log(req, err) {
  logger.error(`[400] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, 'email')}] - [${req.path}], [${module}], ${err.message}`);
}

let imageUrl;
let videoUrl;

const imageStoredLocally = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, `${appRoot}/src/upload/Images`);
    console.log(`${appRoot}/src/upload/Images`);
  },
  filename(req, file, callback) {
    // eslint-disable-next-line no-useless-escape
    imageUrl = `${file.fieldname}_${new Date().toISOString().replace(/[\/\\:]/g, '_')}_${file.originalname}`;
    callback(null, imageUrl);
  },
});

const videoStoredLocally = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, `${appRoot}/src/upload/Videos`);
  },
  filename(req, file, callback) {
    // eslint-disable-next-line no-useless-escape
    videoUrl = `${file.fieldname}_${new Date().toISOString().replace(/[\/\\:]/g, '_')}_${file.originalname}`;
    callback(null, videoUrl);
  },
});

const uploadImageLocally = multer({ storage: imageStoredLocally }).array('image', 3); // Field name and max count
const uploadVideoLocally = multer({ storage: videoStoredLocally }).array('video', 3); // Field name and max count

export async function createImageHandler(req, res) {
  return uploadImageLocally(req, res, async (err) => {
    try {
      if (err) return fail(res, 422, `Error uploading media. ${err.message}`);
      const {
        name,
        type,
      } = req.body;
      const {
        id: createdBy,
      } = req.user;
      const url = req.files[0].path;
      const data = {
        type, name, url, createdBy,
      };
      console.log(data);
      const result = await createService(data);
      return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`, null);
    } catch (error) {
      logger.error(error);
      return fail(res, 400, `Error creating ${module} record. ${error.message}`);
    }
  });
}

export async function createVideoHandler(req, res) {
  return uploadVideoLocally(req, res, async (err) => {
    try {
      if (err) return fail(res, 422, `Error uploading media. ${err.message}`);
      const {
        name,
        description,
        category,
        type,
      } = req.body;
      const url = req.files[0].path;
      const data = {
        type, name, url, description, category, createdBy: '5a51bc91860d8b5ba0001000',
      };
      console.log(data);
      const result = await createService(data);
      return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`, null);
    } catch (error) {
      logger.error(error);
      return fail(res, 400, `Error creating ${module} record. ${error.message}`);
    }
  });
}

export async function fetchHandler(req, res) {
  try {
    const { result, metadata } = await fetchService(req.query);
    logger.info(`[200] [${getRequestIp(req)}] [${req.method}] [${safeGet(req.user, 'email')}] - [${req.path}]`);
    return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`, metadata);
  } catch (err) {
    log(req, err);
    return fail(res, 400, `Error retrieving ${module} record. ${err.message}`);
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
