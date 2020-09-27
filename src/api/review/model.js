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
import Joi from 'joi';
import mongoose from 'mongoose';
import { DATABASE } from '../../constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  star: Joi.number().required(),
  user: Joi.string().trim().required(),
  review: Joi.string().trim().required(),
  task: Joi.string().trim().length(24).optional(),
  createdBy: Joi.string().trim().length(24).required(),
});

export const validateUpdate = Joi.object({
  star: Joi.number().min(1).max(5).optional(),
  user: Joi.string().trim().optional(),
  review: Joi.string().trim().optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const schema = {
  star: { type: Number, min: 1, max: 5, required: [true, 'Why no star?'] },
  user: { type: ObjectId, ref: 'User' },
  review: { type: String },
  task: { type: ObjectId, ref: 'Task' },
  createdBy: { type: ObjectId, required: true },
  updatedBy: { type: ObjectId, ref: 'User' },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: ObjectId, ref: 'User' },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set('collection', 'review');

const Review = mongoose.model('Review', newSchema);

export default Review;
