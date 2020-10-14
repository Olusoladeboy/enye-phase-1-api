"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.schema = exports.validateUpdate = exports.validateCreate = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable object-curly-newline */

/* eslint-disable import/no-cycle */

/**
 * @author Nditah
 * @property {ObjectId} id Review primaryKey
 * @property {Number} star Review star from 0 to 5 (required)
 * @property {ObjectId} user Rated User subject ObjectId
 * @property {String} review Review review comment
 * @property {String} task Task reviewed (ObjectId)
 * @description Review model holds record of customer feedback about serveice rendered
 * by User, Partner or experience about a Terminal or Vehicle
 */
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;

var validateCreate = _joi["default"].object({
  star: _joi["default"].number().required(),
  user: _joi["default"].string().trim().required(),
  review: _joi["default"].string().trim().required(),
  task: _joi["default"].string().trim().length(24).optional(),
  createdBy: _joi["default"].string().trim().length(24).required()
});

exports.validateCreate = validateCreate;

var validateUpdate = _joi["default"].object({
  star: _joi["default"].number().min(1).max(5).optional(),
  user: _joi["default"].string().trim().optional(),
  review: _joi["default"].string().trim().optional(),
  updatedBy: _joi["default"].string().trim().length(24).required()
});

exports.validateUpdate = validateUpdate;
var schema = {
  star: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Why no star?']
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  review: {
    type: String
  },
  task: {
    type: ObjectId,
    ref: 'Task'
  },
  createdBy: {
    type: ObjectId,
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
var options = _constants.DATABASE.OPTIONS;
var newSchema = new Schema(schema, options);
newSchema.set('collection', 'review');

var Review = _mongoose["default"].model('Review', newSchema);

var _default = Review;
exports["default"] = _default;
//# sourceMappingURL=model.js.map