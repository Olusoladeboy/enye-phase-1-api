"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _middleware = require("../../../middleware");

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
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


router.get('/media-categories', [_middleware.checkAuth, _middleware.isValidUser], _controller.fetchHandler);
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

router.post('/media-categories', [_middleware.checkAuth, _middleware.isValidUser], _controller.createHandler);
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

router.put('/media-categories/:recordId', [_middleware.checkAuth, _middleware.isValidUser], _controller.updateHandler);
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

router.patch('/media-categories/:recordId', [_middleware.checkAuth, _middleware.isValidUser], _controller.patchHandler);
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

router["delete"]('/media-categories/:recordId', [_middleware.checkAuth, _middleware.isValidUser], _controller.deleteHandler);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=routes.js.map