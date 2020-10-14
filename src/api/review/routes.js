/* eslint-disable object-curly-newline */
import express from 'express';
import { checkAuth, isValidUser } from '../../middleware';
import { fetchHandler, createHandler, updateHandler, deleteHandler, patchHandler } from './controller';

const router = express.Router();

/**
 * @api {get} /api/reviews?id={recordId} Retrieve one or all records
 * @apiName RetrieveRatings
 * @apiGroup Rating
  * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/reviews?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of permissible api routes staff can access
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/reviews', [checkAuth], fetchHandler);

/**
 * @api {post} /api/reviews Create reviews
 * @apiName CreateRating
 * @apiGroup Rating
 * @apiParam {Number} star Rating star from 0 to 5 (required)
 * @apiParam {String} subject Rating subject ["STAFF", "PARTNER", "TERMINAL", "VEHICLE"] (required)
 * @apiParam {ObjectId} staff Rated User subject ObjectId
 * @apiParam {ObjectId} partner Rated Partner subject ObjectId
 * @apiParam {ObjectId} terminal Rated Terminal subject ObjectId
 * @apiParam {ObjectId} vehicle Rated Vehicle subject ObjectId
 * @apiParam {ObjectId} ticket Rated Ticket subject O
 * @apiSuccess {Object} Rating Rating's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rating not found.
 * @apiError 401 master access only.
 */
router.post('/reviews', [checkAuth, isValidUser], createHandler);

/**
 * @api {put} /api/reviews/{recordId} Update reviews
 * @apiName UpdateRating
 * @apiGroup Rating
 * @apiPermission master
 * @apiParam {Number} star Rating star from 0 to 5 (required)
 * @apiParam {String} subject Rating subject ["STAFF", "PARTNER", "TERMINAL", "VEHICLE"] (required)
 * @apiParam {ObjectId} staff Rated User subject ObjectId
 * @apiParam {ObjectId} partner Rated Partner subject ObjectId
 * @apiParam {ObjectId} terminal Rated Terminal subject ObjectId
 * @apiParam {ObjectId} vehicle Rated Vehicle subject ObjectId
 * @apiParam {ObjectId} ticket Rated Ticket subject O
 * @apiSuccess {Object} Rating Rating's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rating not found.
 * @apiError 401 master access only.
 */
router.put('/reviews/:recordId', [checkAuth, isValidUser], updateHandler);

/**
 * @api {patch} /api/reviews/{recordId} Patch reviews
 * @apiName PatchRating
 * @apiGroup Rating
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Rating not found.
 * @apiError 401 master access only.
 */
router.patch('/reviews/:recordId', [checkAuth, isValidUser], patchHandler);

/**
 * @api {delete} /api/reviews/{recordId} Delete reviews
 * @apiName DeleteRating
 * @apiGroup Rating
 * @apiPermission master
 * @apiParam {ObjectId} recordId record ObjectId.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Rating not found.
 * @apiError 401 master access only.
 */
router.delete('/reviews/:recordId', [checkAuth, isValidUser], deleteHandler);

export default router;
