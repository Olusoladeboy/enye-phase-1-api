"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.schema = exports.validateUpdate = exports.validateCreate = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("../../../constants");

var _table = _interopRequireDefault(require("./table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @author Olusola
 * @property {ObjectId} id MediaCategory primaryKey
 * @property {String} code MediaCategory code of category used by the system
 * @property {String} name MediaCategory name of category as displayed
 * @property {String} image MediaCategory image or icon of category as displayed
 * @property {String} description MediaCategory description of category as displayed
 * @property {String} parent MediaCategory parent category (from which category is a subcategory)
 * @description MediaCategory records user define classification of system records
 */
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;

var validateCreate = _joi["default"].object({
  code: _joi["default"].string().required(),
  name: _joi["default"].string().required(),
  description: _joi["default"].string().optional(),
  parent: _joi["default"].string().trim().length(24).optional(),
  image: _joi["default"].string().trim().length(24).optional(),
  createdBy: _joi["default"].string().trim().length(24).required()
});

exports.validateCreate = validateCreate;

var validateUpdate = _joi["default"].object({
  code: _joi["default"].string().optional(),
  name: _joi["default"].string().optional(),
  description: _joi["default"].string().optional(),
  parent: _joi["default"].string().trim().length(24).optional(),
  image: _joi["default"].string().trim().length(24).optional(),
  updatedBy: _joi["default"].string().trim().length(24).required()
});

exports.validateUpdate = validateUpdate;
var schema = {
  code: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    index: true
  },
  parent: {
    type: ObjectId,
    ref: 'MediaCategory'
  },
  image: {
    type: ObjectId,
    ref: 'Image'
  },
  createdBy: {
    type: ObjectId,
    required: true
  },
  updatedBy: {
    type: ObjectId
  },
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: {
    type: Date
  },
  deletedBy: {
    type: ObjectId
  }
};
exports.schema = schema;
var preload = _constants.DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
var options = _constants.DATABASE.OPTIONS;
var newSchema = new Schema(schema, options);
newSchema.set('collection', 'category');

var MediaCategory = _mongoose["default"].model('MediaCategory', newSchema);

if (preload) {
  MediaCategory.insertMany(_table["default"]);
}

var _default = MediaCategory;
exports["default"] = _default;
//# sourceMappingURL=model.js.map