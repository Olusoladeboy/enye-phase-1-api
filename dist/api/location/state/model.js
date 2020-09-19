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

var _model = _interopRequireDefault(require("../../user/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */

/* eslint-disable import/no-cycle */

/**
 * @author 4Decoder
 * @property {ObjectId} id State primaryKey
 * @property {String} name State name
 * @property {String} country The Country where the state is located
 * @property {ObjectId} createdBy State record created by
 * @property {ObjectId} updatedBy State record modified by
 * @description State holds record of all cities with terminalList
 */
// eslint-disable-next-line camelcase
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;

var validateCreate = _joi["default"].object({
  name: _joi["default"].string().trim().required(),
  country: _joi["default"].string().trim().max(2).required(),
  createdBy: _joi["default"].string().trim().length(24).required()
});

exports.validateCreate = validateCreate;

var validateUpdate = _joi["default"].object({
  name: _joi["default"].string().trim().optional(),
  country: _joi["default"].string().trim().max(2).optional(),
  updatedBy: _joi["default"].string().trim().length(24).required()
});

exports.validateUpdate = validateUpdate;
var schema = {
  name: {
    type: String,
    required: true
  },
  country: {
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
newSchema.set('collection', 'state');
newSchema.plugin(_mongooseCsv["default"]);

var State = _mongoose["default"].model('State', newSchema);

if (preload) {
  State.insertMany(_table["default"]);
}

var _default = State;
exports["default"] = _default;
//# sourceMappingURL=model.js.map