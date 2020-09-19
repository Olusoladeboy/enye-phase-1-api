"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _middleware = require("../../../middleware");

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable object-curly-newline */
var router = _express["default"].Router();
/**
 * @api {get} /api/states?id={recordId} Retrieve State records
 * @apiName RetrieveState
 * @apiGroup State
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/states?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records of Geographical entities housing terminals
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */


router.get('/states', _controller.fetchRecord);
/**
 * @api {post} /api/states Create a State record
 * @apiName CreateState
 * @apiGroup State
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} name State name
 * @apiParam {String} country The Country where the state is located
 * @apiParam {ObjectId} createdBy State record created by
 * @apiParam {ObjectId} updatedBy State record modified by
 * @apiSuccess {Object} State State's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 State not found.
 * @apiError 401 master access only.
 */

router.post('/states', [_middleware.checkAuth, _middleware.isValidUser], _controller.createRecord);
/**
 * @api {put} /api/states/{recordId} Update a State record
 * @apiName UpdateState
 * @apiGroup State
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} name State name
 * @apiParam {String} country The Country where the state is located
 * @apiParam {ObjectId} createdBy State record created by
 * @apiParam {ObjectId} updatedBy State record modified by
 * @apiSuccess {Object} State State's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 State not found.
 * @apiError 401 master access only.
 */

router.put('/states/:recordId', [_middleware.checkAuth, _middleware.isValidUser], _controller.updateRecord);
/**
 * @api {patch} /api/states/{recordId} Patch states
 * @apiName PatchState
 * @apiGroup State
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 State not found.
 * @apiError 401 master access only.
 */

router.patch('/states/:recordId', [_middleware.checkAuth, _middleware.isValidUser], _controller.patchRecord);
/**
 * @api {delete} /api/states/{recordId} Delete a State record
 * @apiName DeleteState
 * @apiGroup State
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 State not found.
 * @apiError 401 master access only.
 */

router["delete"]('/states/:recordId', [_middleware.checkAuth, _middleware.isValidUser], _controller.deleteRecord);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=routes.js.map