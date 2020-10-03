import express from 'express';
import { checkAuth, isValidUser } from '../../../middleware';
import {
  fetchHandler, createHandler, updateHandler, deleteHandler, patchHandler,
} from './controller';

const router = express.Router();

/**
 * @api {get} /api/media-categories?id={recordId} Retrieve one or all records
 * @apiName RetrieveCategory
 * @apiGroup Category
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/media-categories?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of account headings belonging to one classification
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/media-categories', [checkAuth, isValidUser], fetchHandler);

/**
 * @api {post} /api/media-categories Create media-categories
 * @apiName CreateCategory
 * @apiGroup Category
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} type Category type of resource
 * @apiParam {String} code Category code of resource
 * @apiParam {String} name Category name
 * @apiParam {String} description Category description
 * @apiParam {String} parent Category parent category
 * @apiSuccess {Object} Category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */
router.post('/media-categories', [checkAuth, isValidUser], createHandler);

/**
 * @api {put} /api/media-categories/{recordId} Update media-categories
 * @apiName UpdateCategory
 * @apiGroup Category
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} type Category type of resource
 * @apiParam {String} code Category code of resource
 * @apiParam {String} name Category name
 * @apiParam {String} description Category description
 * @apiParam {String} parent Category parent category
 * @apiSuccess {Object} Category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */

router.put('/media-categories/:recordId', [checkAuth, isValidUser], updateHandler);

/**
 * @api {patch} /api/media-categories/{recordId} Patch media-categories
 * @apiName PatchCategory
 * @apiGroup Category
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */
router.patch('/media-categories/:recordId', [checkAuth, isValidUser], patchHandler);

/**
 * @api {delete} /api/media-categories/{recordId} Delete media-categories
 * @apiName DeleteCategory
 * @apiGroup Category
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */
router.delete('/media-categories/:recordId', [checkAuth, isValidUser], deleteHandler);

export default router;
