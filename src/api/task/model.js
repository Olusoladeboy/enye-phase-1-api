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
import Joi from 'joi';
import mongoose from 'mongoose';
// eslint-disable-next-line camelcase
import { DATABASE } from '../../constants';
import table from './table';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const FREQUENCY = ['DAILY, WEEKLY, MONTHLY, QUARTERLY, ANNUALLY'];

export const validateCreate = Joi.object({
  name: Joi.string().required(),
  tags: Joi.string().optional(),
  code: Joi.string().required(),
  status: Joi.string().optional(),
  title: Joi.string().required(),
  description: Joi.string().required(), // Explanation and expectations
  manhour: Joi.number().optional(),
  completion: Joi.number().optional(), // Percent
  feedbacks: Joi.array().optional(), // By User assignedTo
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  assignedDate: Joi.date().optional(),
  assignedTo: Joi.string().optional(),
  assignedBy: Joi.string().optional(),
  score: Joi.number().optional(), // By User assignedBy
  remark: Joi.string().optional(), // By User assignedBy
  voucher: Joi.string().optional(),
  recurring: Joi.boolean().optional(),
  frequency: Joi.string().valid(...Object.values(FREQUENCY)).optional(),
  assignments: Joi.array().optional(),
  office: Joi.string().optional(),
  createdBy: Joi.string().trim().length(24).required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().optional(),
  tags: Joi.string().optional(),
  code: Joi.string().optional(),
  status: Joi.string().optional(),
  title: Joi.string().optional(),
  description: Joi.string().optional(), // Explanation and expectations
  manhour: Joi.number().optional(),
  completion: Joi.number().optional(), // Percent
  feedbacks: Joi.array().optional(), // By User assignedTo
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  assignedDate: Joi.date().optional(),
  assignedTo: Joi.string().optional(),
  assignedBy: Joi.string().optional(),
  score: Joi.number().optional(), // By User assignedBy
  remark: Joi.string().optional(), // By User assignedBy
  voucher: Joi.string().optional(),
  recurring: Joi.boolean().optional(),
  frequency: Joi.string().valid(...Object.values(FREQUENCY)).optional(),
  assignments: Joi.array().optional(),
  office: Joi.string().optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const schema = {
  code: { type: String, required: true, trim: true, index: true },
  name: { type: String },
  tags: { type: String }, // Keywords
  category: { type: ObjectId, ref: 'Category' },
  status: { type: String },
  title: { type: String },
  description: { type: String }, // Explanation and expectations
  manhour: { type: Number },
  completion: { type: Number }, // Percent
  feedbacks: [{ type: String }], // By User assignedTo
  startDate: { type: Date },
  endDate: { type: Date },
  assignedDate: { type: Date },
  assignedTo: { type: ObjectId, ref: 'User' },
  assignedBy: { type: ObjectId, ref: 'User' },
  score: { type: Number }, // By User assignedBy
  remark: { type: String }, // By User assignedBy
  voucher: { type: ObjectId, ref: 'Voucher' },
  recurring: { type: Boolean, default: false },
  frequency: { type: String, enum: Object.values(FREQUENCY) },
  assignments: [{ type: ObjectId, ref: 'Assignment' }],
  office: { type: ObjectId, ref: 'Office' },
  createdBy: { type: ObjectId, ref: 'User', required: true },
  updatedBy: { type: ObjectId, ref: 'User' },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: ObjectId, ref: 'User' },
};
const preload = DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set('collection', 'task');

const Task = mongoose.model('Task', newSchema);

if (preload) { Task.insertMany(table); }

export default Task;
