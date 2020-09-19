"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.schema = exports.validateUpdate = exports.validateCreate = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("../../constants");

var _table = _interopRequireDefault(require("./table"));

var _Joi$string, _Joi$string2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;
var FREQUENCY = ['DAILY, WEEKLY, MONTHLY, QUARTERLY, ANNUALLY'];

var validateCreate = _joi["default"].object({
  name: _joi["default"].string().required(),
  tags: _joi["default"].string().optional(),
  code: _joi["default"].string().required(),
  status: _joi["default"].string().optional(),
  title: _joi["default"].string().required(),
  description: _joi["default"].string().required(),
  // Explanation and expectations
  manhour: _joi["default"].number().optional(),
  completion: _joi["default"].number().optional(),
  // Percent
  feedbacks: _joi["default"].array().optional(),
  // By User assignedTo
  startDate: _joi["default"].date().optional(),
  endDate: _joi["default"].date().optional(),
  assignedDate: _joi["default"].date().optional(),
  assignedTo: _joi["default"].string().optional(),
  assignedBy: _joi["default"].string().optional(),
  score: _joi["default"].number().optional(),
  // By User assignedBy
  remark: _joi["default"].string().optional(),
  // By User assignedBy
  voucher: _joi["default"].string().optional(),
  recurring: _joi["default"]["boolean"]().optional(),
  frequency: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(FREQUENCY))).optional(),
  assignments: _joi["default"].array().optional(),
  office: _joi["default"].string().optional(),
  createdBy: _joi["default"].string().trim().length(24).required()
});

exports.validateCreate = validateCreate;

var validateUpdate = _joi["default"].object({
  name: _joi["default"].string().optional(),
  tags: _joi["default"].string().optional(),
  code: _joi["default"].string().optional(),
  status: _joi["default"].string().optional(),
  title: _joi["default"].string().optional(),
  description: _joi["default"].string().optional(),
  // Explanation and expectations
  manhour: _joi["default"].number().optional(),
  completion: _joi["default"].number().optional(),
  // Percent
  feedbacks: _joi["default"].array().optional(),
  // By User assignedTo
  startDate: _joi["default"].date().optional(),
  endDate: _joi["default"].date().optional(),
  assignedDate: _joi["default"].date().optional(),
  assignedTo: _joi["default"].string().optional(),
  assignedBy: _joi["default"].string().optional(),
  score: _joi["default"].number().optional(),
  // By User assignedBy
  remark: _joi["default"].string().optional(),
  // By User assignedBy
  voucher: _joi["default"].string().optional(),
  recurring: _joi["default"]["boolean"]().optional(),
  frequency: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(FREQUENCY))).optional(),
  assignments: _joi["default"].array().optional(),
  office: _joi["default"].string().optional(),
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
    type: String
  },
  tags: {
    type: String
  },
  // Keywords
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  status: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  // Explanation and expectations
  manhour: {
    type: Number
  },
  completion: {
    type: Number
  },
  // Percent
  feedbacks: [{
    type: String
  }],
  // By User assignedTo
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  assignedDate: {
    type: Date
  },
  assignedTo: {
    type: ObjectId,
    ref: 'User'
  },
  assignedBy: {
    type: ObjectId,
    ref: 'User'
  },
  score: {
    type: Number
  },
  // By User assignedBy
  remark: {
    type: String
  },
  // By User assignedBy
  voucher: {
    type: ObjectId,
    ref: 'Voucher'
  },
  recurring: {
    type: Boolean,
    "default": false
  },
  frequency: {
    type: String,
    "enum": Object.values(FREQUENCY)
  },
  assignments: [{
    type: ObjectId,
    ref: 'Assignment'
  }],
  office: {
    type: ObjectId,
    ref: 'Office'
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
newSchema.set('collection', 'task');

var Task = _mongoose["default"].model('Task', newSchema);

if (preload) {
  Task.insertMany(_table["default"]);
}

var _default = Task;
exports["default"] = _default;
//# sourceMappingURL=model.js.map