// /* eslint-disable object-curly-newline */
// /* eslint-disable import/no-cycle */
// /**
//  * @author Emmanuel Olusola
//  * @property {ObjectId} id Task primaryKey
//  * @property {String} name Task short name
//  * @property {String} tags Task tags are keywords
//  * @property {String} code Task code
//  * @property {ObjectId} category Task category
//  * @property {String} status Task status "PENDING|ASSIGNED|ONGOING|STARTED|ENDING|CLOSED"
//  * @property {String} title Task title
//  * @property {String} description Task description explanation and expectations
//  * @property {Number} manhour Task manhour estimated manhour required
//  * @property {Number} completion Task completion current Percent executed
//  * @property {Array} feedbacks Task feedbacks by User assignedTo
//  * @property {Date} startDate Task startDate assignedTo mark as started
//  * @property {Date} endDate Task endDate User assignedTo mark as ended
//  * @property {Date} assignedDate Task assignedDate
//  * @property {ObjectId} assignedTo Task assignedTo User performing the task
//  * @property {ObjectId} assignedBy Task assignedBy User created the task
//  * @property {Number} score Task score by User assignedBy
//  * @property {String} remark Task remark by User assignedBy
//  * @property {ObjectId} voucher Task voucher for needed funds by User assignedTo
//  * @property {Array} assignments Task array of Assignment resources User assignedTo
//  * @property {Boolean} recurring Task recurring status
//  * @property {String} recurring Task frequency
//  * @property {String} subsidiary Task subsidiary conducting the task
//  * @property {ObjectId} office Task office id conducting the task
//  * @description Task model holds record of all projects and assignments
//  */
// import Joi from 'joi';
// import mongoose from 'mongoose';
// // eslint-disable-next-line camelcase
// import { DATABASE } from '../../constants';
// import table from './table';
// const { Schema } = mongoose;
// const { ObjectId } = Schema.Types;
// const STATUS = ['UNASSIGNED', 'PENDING', 'ACCEPTED', 'STARTED', 'COMPLETED'];
// export const validateCreate = Joi.object({
//   code: Joi.string().trim().required(),
//   name: Joi.string().required(),
//   category: Joi.string().trim().length(24).required(),
//   description: Joi.string().required(), // Explanation and expectations
//   manhour: Joi.number().optional(),
//   location: Joi.object().required(),
//   createdBy: Joi.string().trim().length(24).required(),
// });
// export const validateUpdate = Joi.object({
//   name: Joi.string().optional(),
//   category: Joi.string().trim().length(24).optional(),
//   description: Joi.string().optional(), // Explanation and expectations
//   manhour: Joi.number().optional(),
//   location: Joi.object().optional(),
//   tags: Joi.string().optional(),
//   status: Joi.string().optional(),
//   completion: Joi.number().optional(), // Percent
//   feedbacks: Joi.string().optional(), // By User assignedTo
//   startDate: Joi.date().optional(),
//   endDate: Joi.date().optional(),
//   acceptedDate: Joi.date().optional(),
//   acceptedBy: Joi.string().optional(),
//   remark: Joi.string().optional(), // By User assignedBy
//   updatedBy: Joi.string().trim().length(24).required(),
// });
// export const schema = {
//   code: { type: String, required: true, trim: true, index: true },
//   name: { type: String },
//   tags: { type: String }, // Keywords
//   category: { type: ObjectId, ref: 'Category' },
//   status: { type: String, enum: Object.values(STATUS), default: 'UNASSIGNED' },
//   description: { type: String }, // Explanation and expectations
//   manhour: { type: Number },
//   completion: { type: Number, default: 0 }, // Percent
//   feedback: { type: String }, // By User Attended To
//   startDate: { type: Date },
//   endDate: { type: Date },
//   acceptedDate: { type: Date },
//   acceptedBy: { type: ObjectId, ref: 'User' }, // User who accepted the task
//   remark: { type: String }, // By User assignedBy
//   location: {
//     latitude: { type: String },
//     longitude: { type: String },
//     address: { type: String },
//     county: { type: ObjectId, ref: 'County' },
//     city: { type: ObjectId, ref: 'City' },
//     state: { type: ObjectId, ref: 'State' },
//   },
//   createdBy: { type: ObjectId, ref: 'User', required: true },
//   updatedBy: { type: ObjectId, ref: 'User' },
//   deleted: { type: Boolean, default: false },
//   deletedAt: { type: Date },
//   deletedBy: { type: ObjectId, ref: 'User' },
// };
// const preload = DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
// const options = DATABASE.OPTIONS;
// const newSchema = new Schema(schema, options);
// newSchema.set('collection', 'task');
// const Task = mongoose.model('Task', newSchema);
// if (preload) { Task.insertMany(table); }
// export default Task;
"use strict";
//# sourceMappingURL=model.js.map