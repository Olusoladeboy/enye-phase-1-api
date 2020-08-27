import express from "express";
import { checkAuth, isValidStaff } from "../../middleware";
import { fetchRecord, createRecord, deleteRecord } from "./controller";

const router = express.Router();

/**
 * @api {get} /api/accesses?id={recordId} Retrieve one or all records
 * @apiName RetrieveAccess
 * @apiGroup Access
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/accesses?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of account headings belonging to one classification
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/accesses", [checkAuth, isValidStaff], fetchRecord);

/**
 * @api {post} /api/accesses Create accesses
 * @apiName CreateAccess
 * @apiGroup Access
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} ipaddress Access IP address
 * @apiParam {String} software Access software
 * @apiParam {String} agent Access agent description
 * @apiParam {String} method Access GET|POST|PUT|OPTLETE
 * @apiParam {String} baseUrl Access base Url
 * @apiParam {String} version Access version
 * @apiParam {String} status Access statusENGR (required)
 * @apiSuccess {Object} Access Access's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Access not found.
 * @apiError 401 master access only.
 */
router.post("/accesses", [checkAuth, isValidStaff], createRecord);

/**
 * @api {delete} /api/accesses/{recordId} Delete accesses
 * @apiName DeleteAccess
 * @apiGroup Access
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Access not found.
 * @apiError 401 master access only.
 */
router.delete("/accesses/:recordId", [checkAuth, isValidStaff], deleteRecord);

export default router;
