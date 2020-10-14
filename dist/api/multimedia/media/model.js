"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.schema = exports.validateUpdate = exports.validateCreate = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _table = _interopRequireDefault(require("./table"));

var _constants = require("../../../constants");

var _Joi$string, _Joi$string2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;
var TYPE = ['DOC', 'PDF', 'IMAGE', 'AUDIO', 'VIDEO', 'DATA'];

var validateCreate = _joi["default"].object({
  type: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, TYPE).required(),
  name: _joi["default"].string().trim().required(),
  description: _joi["default"].string().optional(),
  category: _joi["default"].string().trim().length(24).optional(),
  length: _joi["default"].number().positive().optional(),
  width: _joi["default"].number().positive().optional(),
  duration: _joi["default"].number().positive().optional(),
  url: _joi["default"].string().trim().required(),
  // image: Joi.any().meta({ swaggerType: 'file' }).required(),
  extension: _joi["default"].string().trim().optional(),
  createdBy: _joi["default"].string().trim().length(24).required()
});

exports.validateCreate = validateCreate;

var validateUpdate = _joi["default"].object({
  type: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, TYPE).optional(),
  name: _joi["default"].string().trim().optional(),
  description: _joi["default"].string().optional(),
  category: _joi["default"].string().trim().length(24).optional(),
  length: _joi["default"].number().positive().optional(),
  width: _joi["default"].number().positive().optional(),
  duration: _joi["default"].number().positive().optional(),
  url: _joi["default"].string().trim().optional(),
  extension: _joi["default"].string().trim().optional(),
  updatedBy: _joi["default"].string().trim().length(24).required()
});

exports.validateUpdate = validateUpdate;
var schema = {
  type: {
    type: String,
    "enum": TYPE
  },
  name: {
    type: String,
    alias: 'title',
    trim: true,
    required: true,
    index: true
  },
  url: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  category: {
    type: ObjectId,
    ref: 'MediaCategory',
    index: true
  },
  length: {
    type: Number,
    comment: 'mm',
    index: true
  },
  width: {
    type: Number,
    comment: 'mm',
    index: true
  },
  duration: {
    type: Number,
    comment: 'minute',
    index: true
  },
  extension: {
    type: String,
    comment: 'minute',
    index: true
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
newSchema.set('collection', 'media');

var Media = _mongoose["default"].model('Media', newSchema);

if (preload) {
  Media.insertMany(_table["default"]);
}

var _default = Media;
exports["default"] = _default;
//# sourceMappingURL=model.js.map