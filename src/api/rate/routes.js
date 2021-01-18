/* eslint-disable object-curly-newline */
import express from 'express';
import { fetchRecord } from './controller';

const router = express.Router();

/**
 * @api {get} /api/rates?id={recordId} Retrieve Rates records
 * @apiName RetrieveRates
 * @apiGroup Rates
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/rates?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of Rates
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/rates', fetchRecord);

export default router;
