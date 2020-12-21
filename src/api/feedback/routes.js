/* eslint-disable object-curly-newline */
import express from 'express';
import { checkAuth, isValidUser } from '../../middleware';
import { fetchHandler, createHandler, updateHandler, deleteHandler, patchHandler } from './controller';

const router = express.Router();

/**
 * @api {get} /api/feedbacks?id={recordId} Retrieve one or all records
 * @apiName Retrievefeedbackss
 * @apiGroup feedbacks
  * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/feedbacks?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of permissible api routes staff can access
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/feedbacks', [checkAuth], fetchHandler);

/**
 * @api {post} /api/feedbacks Create feedbacks
 * @apiName Createfeedbacks
 * @apiGroup feedbacks
 * @apiParam {ObjectId} id Feedback primaryKey
 * @apiParam {ObjectId} user Rated User subject ObjectId
 * @apiParam {String} feedback Feedback review comment
 * @apiDescription Feedback model holds record of customer feedback
 * @apiSuccess {Object} Feedback Feedback's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 feedbacks not found.
 * @apiError 401 master access only.
 */
router.post('/feedbacks', [checkAuth, isValidUser], createHandler);

/**
 * @api {put} /api/feedbacks/{recordId} Update feedbacks
 * @apiName Updatefeedbacks
 * @apiGroup feedbacks
 * @apiPermission master
 * @apiParam {ObjectId} id Feedback primaryKey
 * @apiParam {ObjectId} user Rated User subject ObjectId
 * @apiParam {String} feedback Feedback review comment
 * @apiDescription Feedback model holds record of customer feedback
 * @apiSuccess {Object} Feedback Feedback's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 feedbacks not found.
 * @apiError 401 master access only.
 */
router.put('/feedbacks/:recordId', [checkAuth, isValidUser], updateHandler);

/**
 * @api {patch} /api/feedbacks/{recordId} Patch feedbacks
 * @apiName Patchfeedbacks
 * @apiGroup feedbacks
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 feedbacks not found.
 * @apiError 401 master access only.
 */
router.patch('/feedbacks/:recordId', [checkAuth, isValidUser], patchHandler);

/**
 * @api {delete} /api/feedbacks/{recordId} Delete feedbacks
 * @apiName Deletefeedbacks
 * @apiGroup feedbacks
 * @apiPermission master
 * @apiParam {ObjectId} recordId record ObjectId.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 feedbacks not found.
 * @apiError 401 master access only.
 */
router.delete('/feedbacks/:recordId', [checkAuth, isValidUser], deleteHandler);

export default router;
