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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */

/**
 * @author Olusola
 * @property {ObjectId} id City primaryKey
 * @property {String} name City name (required)
 * @property {String} abbreviation City 2 or 3 letter-abbreviation
 * @property {ObjectId} state City state (required)
 * @property {String} country City country unique ISO 2-letter code
 * @property {String} photo City photo url
 * @property {Array} terminals City array of terminal ObjectIds (prohibited)
 * @property {ObjectId} createdBy (required) id of the User who created the record
 * @property {ObjectId} updatedBy id of the User who created the record
 * @description Records of all Peace Group cities.
 */
// eslint-disable-next-line camelcase
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;

var validateCreate = _joi["default"].object({
  name: _joi["default"].string().trim().required(),
  abbreviation: _joi["default"].string().trim().optional(),
  state: _joi["default"].string().required(),
  country: _joi["default"].string().optional(),
  photo: _joi["default"].string().optional(),
  createdBy: _joi["default"].string().trim().length(24).required()
});

exports.validateCreate = validateCreate;

var validateUpdate = _joi["default"].object({
  name: _joi["default"].string().trim().optional(),
  abbreviation: _joi["default"].string().trim().optional(),
  state: _joi["default"].string().optional(),
  country: _joi["default"].string().optional(),
  photo: _joi["default"].string().optional(),
  updatedBy: _joi["default"].string().trim().length(24).required()
});

exports.validateUpdate = validateUpdate;
var schema = {
  name: {
    type: String
  },
  abbreviation: {
    type: String
  },
  country: {
    type: String,
    "default": 'ng'
  },
  photo: {
    type: String
  },
  state: {
    type: ObjectId,
    ref: 'State',
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
newSchema.set('collection', 'city');
newSchema.plugin(_mongooseCsv["default"]);

var City = _mongoose["default"].model('City', newSchema);

if (preload) {
  City.insertMany(_table["default"]);
}

var _default = City;
exports["default"] = _default;
//# sourceMappingURL=model.js.map