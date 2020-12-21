/* eslint-disable object-curly-newline */
/* eslint-disable import/no-cycle */
/**
 * @author Olusola
 * @property {ObjectId} id Feedback primaryKey
 * @property {ObjectId} user Rated User subject ObjectId
 * @property {String} feedback Feedback review comment
 * @description Feedback model holds record of customer feedback
 */
import Joi from 'joi';
import mongoose from 'mongoose';
import { DATABASE } from '../../constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  user: Joi.string().trim().required(),
  feedback: Joi.string().trim().required(),
  createdBy: Joi.string().trim().length(24).required(),
});

export const validateUpdate = Joi.object({
  user: Joi.string().trim().optional(),
  review: Joi.string().trim().optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const schema = {
  code: { type: String },
  user: { type: ObjectId, ref: 'User' },
  feedback: { type: String },
  createdBy: { type: ObjectId, required: true },
  updatedBy: { type: ObjectId, ref: 'User' },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: ObjectId, ref: 'User' },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set('collection', 'feedback');

const Feedback = mongoose.model('Feedback', newSchema);

export default Feedback;
