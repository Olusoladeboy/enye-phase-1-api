/**
 * @author Nditah
 * @property {ObjectId} id MediaCategory primaryKey
 * @property {String} code MediaCategory code of category used by the system
 * @property {String} name MediaCategory name of category as displayed
 * @property {String} image MediaCategory image or icon of category as displayed
 * @property {String} description MediaCategory description of category as displayed
 * @property {String} parent MediaCategory parent category (from which category is a subcategory)
 * @description MediaCategory records user define classification of system records
 */
import Joi from 'joi';
import mongoose from 'mongoose';
import { DATABASE } from '../../../constants';
import table from './table';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  parent: Joi.string().trim().length(24).optional(),
  image: Joi.string().trim().length(24).optional(),
  createdBy: Joi.string().trim().length(24).required(),
});

export const validateUpdate = Joi.object({
  code: Joi.string().optional(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  parent: Joi.string().trim().length(24).optional(),
  image: Joi.string().trim().length(24).optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const schema = {
  code: {
    type: String, required: true, trim: true, index: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true, index: true },
  parent: { type: ObjectId, ref: 'MediaCategory' },
  image: { type: ObjectId, ref: 'Image' },
  createdBy: { type: ObjectId, required: true },
  updatedBy: { type: ObjectId },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: ObjectId },
};

const preload = DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set('collection', 'category');

const MediaCategory = mongoose.model('MediaCategory', newSchema);

if (preload) { MediaCategory.insertMany(table); }

export default MediaCategory;
