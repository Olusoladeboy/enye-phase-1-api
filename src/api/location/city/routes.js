/* eslint-disable object-curly-newline */
import express from 'express';
import { checkAuth, isValidUser } from '../../../middleware';
import { fetchRecord, createRecord, updateRecord, deleteRecord, patchRecord } from './controller';

const router = express.Router();

/**
 * @api {get} /api/cities?id={recordId} Retrieve one or all records
 * @apiName RetrieveCity
 * @apiGroup City
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/cities?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records of Cities where terminals are located found in States
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/cities', fetchRecord);

/**
 * @api {get} /api/cities/weather Retrieve weather and map info for a city
 * @apiName RetrieveCityWeather
 * @apiGroup City
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/weather?type=forecast&city=Enugu
 * @apiParam {String} city City name
 * @apiParam {String} country City country
 * @apiParam {String} type of info "forecast"|"weather" records
 * @apiDescription Records of City map and weather
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 */
// router.get('/cities/weather', fetchWeather);

/**
 * @api {post} /api/cities Create cities
 * @apiName CreateCity
 * @apiGroup City
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} name City name (required)
 * @apiParam {String} abbreviation City 2 or 3 letter-abbreviation
 * @apiParam {ObjectId} state City state (required)
 * @apiParam {String} country City country unique ISO 2-letter code
 * @apiParam {String} photo City photo url
 * @apiParam {Array} terminals City array of terminal ObjectIds (prohibited)
 * @apiParam {ObjectId} createdBy (required) id of the User who created the record
 * @apiParam {ObjectId} updatedBy id of the User who created the record
 * @apiSuccess {Object} City City's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 City not found.
 * @apiError 500 Server error
 */
router.post('/cities', [checkAuth, isValidUser], createRecord);

/**
 * @api {put} /api/cities/{recordId} Update cities
 * @apiName UpdateCity
 * @apiGroup City
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} name City name (required)
 * @apiParam {String} abbreviation City 2 or 3 letter-abbreviation
 * @apiParam {ObjectId} state City state (required)
 * @apiParam {String} country City country unique ISO 2-letter code
 * @apiParam {String} photo City photo url
 * @apiParam {Array} terminals City array of terminal ObjectIds (prohibited)
 * @apiParam {ObjectId} createdBy (required) id of the User who created the record
 * @apiParam {ObjectId} updatedBy id of the User who created the record
 * @apiSuccess {Object} City City's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 City not found.
 * @apiError 500 Server error
 */
router.put('/cities/:recordId', [checkAuth, isValidUser], updateRecord);

/**
 * @api {patch} /api/cities/{recordId} Patch cities
 * @apiName PatchCity
 * @apiGroup City
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 City not found.
 * @apiError 401 master access only.
 */
router.patch('/cities/:recordId', [checkAuth, isValidUser], patchRecord);

/**
 * @api {delete} /api/cities/{recordId} Delete cities
 * @apiName DeleteCity
 * @apiGroup City
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 City not found.
 * @apiError 401 master access only.
 */
router.delete('/cities/:recordId', [checkAuth, isValidUser], deleteRecord);

export default router;