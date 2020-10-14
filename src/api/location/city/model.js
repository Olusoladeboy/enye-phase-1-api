/* eslint-disable no-unused-vars */
/**
 * @author Nditah
 * @property {ObjectId} id City primaryKey
 * @property {String} name City name (required)
 * @property {String} abbreviation City 2 or 3 letter-abbreviation
 * @property {ObjectId} state City state (required)
 * @property {String} country City country unique ISO 2-letter code
 * @property {String} photo City photo url
 * @property {Array} terminals City array of terminal ObjectIds (prohibited)
 * @property {ObjectId} createdBy (required) id of the User who created the record
 * @property {ObjectId} updatedBy id of the User who created the record
 * @description Records of all Peace Group cities.
 */
import Joi from 'joi';
import mongoose from 'mongoose';
// eslint-disable-next-line camelcase
import mongoose_csv from 'mongoose-csv';
import { DATABASE } from '../../../constants';
import table from './table';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  name: Joi.string().trim().required(),
  abbreviation: Joi.string().trim().optional(),
  state: Joi.string().required(),
  country: Joi.string().optional(),
  photo: Joi.string().optional(),
  createdBy: Joi.string().trim().length(24).required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  abbreviation: Joi.string().trim().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  photo: Joi.string().optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const schema = {
  name: { type: String },
  abbreviation: { type: String },
  country: { type: String, default: 'ng' },
  photo: { type: String },
  state: { type: ObjectId, ref: 'State', required: true },
  createdBy: { type: ObjectId, ref: 'User', required: true },
  updatedBy: { type: ObjectId, ref: 'User' },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: ObjectId, ref: 'User' },
};

const preload = DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set('collection', 'city');
newSchema.plugin(mongoose_csv);

const City = mongoose.model('City', newSchema);
if (preload) { City.insertMany(table); }

export default City;
