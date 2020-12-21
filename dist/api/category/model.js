"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.schema = exports.validateUpdate = exports.validateCreate = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("../../constants");

var _table = _interopRequireDefault(require("./table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @author Olusola
 * @property {ObjectId} id Category primaryKey
 * @property {String} type Category type of resource
 * @property {String} code Category code of resource
 * @property {String} name Category name
 * @property {String} description Category description
 * @property {String} subsidiary Category PET|CHEM|PLANT|ENGR
 * @description Category model holds categories for raw materials, projects,
 * finished products for all the subsidiaries.
 */
// eslint-disable-next-line camelcase
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;

var validateCreate = _joi["default"].object({
  name: _joi["default"].string().required(),
  description: _joi["default"].string().optional(),
  createdBy: _joi["default"].string().trim().length(24).required()
});

exports.validateCreate = validateCreate;

var validateUpdate = _joi["default"].object({
  name: _joi["default"].string().optional(),
  description: _joi["default"].string().optional(),
  updatedBy: _joi["default"].string().trim().length(24).required()
});

exports.validateUpdate = validateUpdate;
var schema = {
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: ObjectId,
    ref: 'User'
  },
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: {
    type: Date
  },
  deletedBy: {
    type: ObjectId,
    ref: 'User'
  }
};
exports.schema = schema;
var preload = _constants.DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
var options = _constants.DATABASE.OPTIONS;
var newSchema = new Schema(schema, options);
newSchema.set('collection', 'category');

var Category = _mongoose["default"].model('Category', newSchema);

if (preload) {
  Category.insertMany(_table["default"]);
}

var _default = Category;
exports["default"] = _default;
//# sourceMappingURL=model.js.map