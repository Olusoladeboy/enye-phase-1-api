/**
 * @author Nditah
 * @property {ObjectId} id Media primaryKey
 * @property {String} type Media type "DOC|PDF|IMAGE|AUDIO|VIDEO|DATA"
 * @property {String} name Media name or title
 * @property {String} url The Media url absolute-path
 * @property {ObjectId} category Media Category
 * @property {String} description Media description
 * @property {Number} length Media length dimension in mm
 * @property {Number} width Media width dimension in mm
 * @property {Number} duration Media duration in minutes for audio/visual
 * @property {Number} extension Media extension
 * @description Media record of all multimedia assets
 */
import Joi from 'joi';
import mongoose from 'mongoose';
import table from './table';
import { DATABASE } from '../../../constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const TYPE = ['DOC', 'PDF', 'IMAGE', 'AUDIO', 'VIDEO', 'DATA'];

export const validateCreate = Joi.object({
  type: Joi.string().valid(...TYPE).required(),
  name: Joi.string().trim().required(),
  description: Joi.string().optional(),
  category: Joi.string().trim().length(24).optional(),
  length: Joi.number().positive().optional(),
  width: Joi.number().positive().optional(),
  duration: Joi.number().positive().optional(),
  url: Joi.string().trim().required(),
  // image: Joi.any().meta({ swaggerType: "file" }).required(),
  extension: Joi.string().trim().optional(),
  createdBy: Joi.string().trim().length(24).required(),
});

export const validateUpdate = Joi.object({
  type: Joi.string().valid(...TYPE).optional(),
  name: Joi.string().trim().optional(),
  description: Joi.string().optional(),
  category: Joi.string().trim().length(24).optional(),
  length: Joi.number().positive().optional(),
  width: Joi.number().positive().optional(),
  duration: Joi.number().positive().optional(),
  url: Joi.string().trim().optional(),
  extension: Joi.string().trim().optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const schema = {
  type: { type: String, enum: TYPE },
  name: {
    type: String, alias: 'title', trim: true, required: true, index: true,
  },
  url: {
    type: String, trim: true, required: true, unique: true,
  },
  description: { type: String },
  category: { type: ObjectId, ref: 'Category', index: true },
  length: { type: Number, comment: 'mm', index: true },
  width: { type: Number, comment: 'mm', index: true },
  duration: { type: Number, comment: 'minute', index: true },
  extension: { type: String, comment: 'minute', index: true },
  createdBy: { type: ObjectId, required: true },
  updatedBy: { type: ObjectId },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: ObjectId },
};

const preload = DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set('collection', 'media');

const Media = mongoose.model('Media', newSchema);

if (preload) { Media.insertMany(table); }

export default Media;
