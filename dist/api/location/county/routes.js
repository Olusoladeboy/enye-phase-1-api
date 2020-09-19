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
 * @api {get} /api/counties?id={recordId} Retrieve one or all records
 * @apiName RetrieveCounty
 * @apiGroup County
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/counties?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records counties (or local government areas) of operation
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */


router.get('/counties', _controller.fetchRecord);
/**
 * @api {post} /api/counties Create counties
 * @apiName CreateCounty
 * @apiGroup County
 * @apiParam {ObjectId} id County primaryKey
 * @apiParam {String} name County short name
 * @apiParam {ObjectId} state County State Id
 * @apiParam {ObjectId} createdBy County record created by
 * @apiParam {ObjectId} updatedBy County record modified by
 * @apiSuccess {Object} County County's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 County not found.
 * @apiError 401 master access only.
 */

router.post('/counties', [_middleware.checkAuth, _middleware.isValidUser], _controller.createRecord);
/**
 * @api {put} /api/counties/{recordId} Update counties
 * @apiName UpdateCounty
 * @apiGroup County
 * @apiPermission master
 * @apiParam {ObjectId} id County primaryKey
 * @apiParam {String} name County short name
 * @apiParam {ObjectId} state County State Id
 * @apiParam {ObjectId} createdBy County record created by
 * @apiParam {ObjectId} updatedBy County record modified by
 * @apiSuccess {Object} County County's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 County not found.
 * @apiError 401 master access only.
 */

router.put('/counties/:recordId', [_middleware.checkAuth, _middleware.isValidUser], _controller.updateRecord);
/**
 * @api {patch} /api/counties/{recordId} Patch counties
 * @apiName PatchCounty
 * @apiGroup County
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Country not found.
 * @apiError 401 master access only.
 */

router.patch('/counties/:recordId', [_middleware.checkAuth, _middleware.isValidUser], _controller.patchRecord);
/**
 * @api {delete} /api/counties/{recordId} Delete counties
 * @apiName DeleteCounty
 * @apiGroup County
 * @apiPermission master
 * @apiParam {String} accessToken master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 County not found.
 * @apiError 401 master access only.
 */

router["delete"]('/counties/:recordId', [_middleware.checkAuth, _middleware.isValidUser], _controller.deleteRecord);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=routes.js.map