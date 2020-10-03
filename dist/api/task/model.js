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

/* eslint-disable object-curly-newline */

/* eslint-disable import/no-cycle */

/**
 * @author Emmanuel Olusola
 * @property {ObjectId} id Task primaryKey
 * @property {String} name Task short name
 * @property {String} tags Task tags are keywords
 * @property {String} code Task code
 * @property {ObjectId} category Task category
 * @property {String} status Task status "PENDING|ASSIGNED|ONGOING|STARTED|ENDING|CLOSED"
 * @property {String} title Task title
 * @property {String} description Task description explanation and expectations
 * @property {Number} manhour Task manhour estimated manhour required
 * @property {Number} completion Task completion current Percent executed
 * @property {Array} feedbacks Task feedbacks by User assignedTo
 * @property {Date} startDate Task startDate assignedTo mark as started
 * @property {Date} endDate Task endDate User assignedTo mark as ended
 * @property {Date} assignedDate Task assignedDate
 * @property {ObjectId} assignedTo Task assignedTo User performing the task
 * @property {ObjectId} assignedBy Task assignedBy User created the task
 * @property {Number} score Task score by User assignedBy
 * @property {String} remark Task remark by User assignedBy
 * @property {ObjectId} voucher Task voucher for needed funds by User assignedTo
 * @property {Array} assignments Task array of Assignment resources User assignedTo
 * @property {Boolean} recurring Task recurring status
 * @property {String} recurring Task frequency
 * @property {String} subsidiary Task subsidiary conducting the task
 * @property {ObjectId} office Task office id conducting the task
 * @description Task model holds record of all projects and assignments
 */
// eslint-disable-next-line camelcase
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;
var STATUS = ['UNASSIGNED', 'PENDING', 'ACCEPTED', 'STARTED', 'COMPLETED'];

var validateCreate = _joi["default"].object({
  code: _joi["default"].string().trim().required(),
  name: _joi["default"].string().required(),
  category: _joi["default"].string().trim().length(24).required(),
  description: _joi["default"].string().required(),
  // Explanation and expectations
  manhour: _joi["default"].number().optional(),
  location: _joi["default"].object().required(),
  createdBy: _joi["default"].string().trim().length(24).required()
});

exports.validateCreate = validateCreate;

var validateUpdate = _joi["default"].object({
  name: _joi["default"].string().optional(),
  category: _joi["default"].string().trim().length(24).optional(),
  description: _joi["default"].string().optional(),
  // Explanation and expectations
  manhour: _joi["default"].number().optional(),
  location: _joi["default"].object().optional(),
  tags: _joi["default"].string().optional(),
  status: _joi["default"].string().optional(),
  completion: _joi["default"].number().optional(),
  // Percent
  feedbacks: _joi["default"].string().optional(),
  // By User assignedTo
  startDate: _joi["default"].date().optional(),
  endDate: _joi["default"].date().optional(),
  acceptedDate: _joi["default"].date().optional(),
  acceptedBy: _joi["default"].string().optional(),
  remark: _joi["default"].string().optional(),
  // By User assignedBy
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
    type: String,
    "enum": Object.values(STATUS),
    "default": 'UNASSIGNED'
  },
  description: {
    type: String
  },
  // Explanation and expectations
  manhour: {
    type: Number
  },
  completion: {
    type: Number,
    "default": 0
  },
  // Percent
  feedback: {
    type: String
  },
  // By User Attended To
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  acceptedDate: {
    type: Date
  },
  acceptedBy: {
    type: ObjectId,
    ref: 'User'
  },
  // User who accepted the task
  remark: {
    type: String
  },
  // By User assignedBy
  location: {
    latitude: {
      type: String
    },
    longitude: {
      type: String
    },
    address: {
      type: String
    },
    county: {
      type: ObjectId,
      ref: 'County'
    },
    city: {
      type: ObjectId,
      ref: 'City'
    },
    state: {
      type: ObjectId,
      ref: 'State'
    }
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