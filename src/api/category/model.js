/**
 * @author Nditah
 * @property {ObjectId} id Category primaryKey
 * @property {String} type Category type of resource
 * @property {String} code Category code of resource
 * @property {String} name Category name
 * @property {String} description Category description
 * @property {String} subsidiary Category PET|CHEM|PLANT|ENGR
 * @description Category model holds categories for raw materials, projects,
 * finished products for all the subsidiaries.
 */
import Joi from 'joi';
import mongoose from 'mongoose';
// eslint-disable-next-line camelcase
import { DATABASE } from '../../constants';
import table from './table';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  createdBy: Joi.string().trim().length(24).required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const schema = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: ObjectId, ref: 'User', required: true },
  updatedBy: { type: ObjectId, ref: 'User' },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: ObjectId, ref: 'User' },
};

const preload = DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set('collection', 'category');

const Category = mongoose.model('Category', newSchema);

if (preload) { Category.insertMany(table); }

export default Category;
