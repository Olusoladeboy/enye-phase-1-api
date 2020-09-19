"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.schema = exports.validateUpdate = exports.validateCreate = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseCsv = _interopRequireDefault(require("mongoose-csv"));

var _constants = require("../../../constants");

var _table = _interopRequireDefault(require("./table"));

var _model = _interopRequireDefault(require("../state/model"));

var _model2 = _interopRequireDefault(require("../../user/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */

/* eslint-disable import/no-cycle */

/**
 * @author 4Decoder
 * @property {ObjectId} id County primaryKey
 * @property {String} name County short name
 * @property {ObjectId} state County State Id
 * @property {ObjectId} createdBy County record created by
 * @property {ObjectId} updatedBy County record modified by
 * @description County holds record of all cities with terminalList
 */
// eslint-disable-next-line camelcase
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;

var validateCreate = _joi["default"].object({
  name: _joi["default"].string().trim().required(),
  state: _joi["default"].string().required(),
  createdBy: _joi["default"].string().trim().length(24).required()
});

exports.validateCreate = validateCreate;

var validateUpdate = _joi["default"].object({
  name: _joi["default"].string().trim().optional(),
  state: _joi["default"].string().optional(),
  updatedBy: _joi["default"].string().trim().length(24).required()
});

exports.validateUpdate = validateUpdate;
var schema = {
  name: {
    type: String
  },
  state: {
    type: ObjectId,
    ref: 'State'
  },
  createdBy: {
    type: ObjectId,
    required: true
  },
  updatedBy: {
    type: ObjectId,
    allowNull: true
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
newSchema.set('collection', 'county');
newSchema.plugin(_mongooseCsv["default"]);

var County = _mongoose["default"].model('County', newSchema);

if (preload) {
  County.insertMany(_table["default"]);
}

var _default = County;
exports["default"] = _default;
//# sourceMappingURL=model.js.map