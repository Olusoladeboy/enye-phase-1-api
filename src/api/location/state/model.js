/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/**
 * @author 4Decoder
 * @property {ObjectId} id State primaryKey
 * @property {String} name State name
 * @property {String} country The Country where the state is located
 * @property {ObjectId} createdBy State record created by
 * @property {ObjectId} updatedBy State record modified by
 * @description State holds record of all cities with terminalList
 */
import Joi from 'joi';
import mongoose from 'mongoose';
// eslint-disable-next-line camelcase
import mongoose_csv from 'mongoose-csv';
import { DATABASE } from '../../../constants';
import table from './table';
import User from '../../user/model';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  name: Joi.string().trim().required(),
  country: Joi.string().trim().max(2).required(),
  createdBy: Joi.string().trim().length(24).required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  country: Joi.string().trim().max(2).optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const schema = {
  name: { type: String, required: true },
  country: { type: String, required: true },
  createdBy: { type: ObjectId, ref: 'User', required: true },
  updatedBy: { type: ObjectId, ref: 'User' },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: ObjectId, ref: 'User' },
};

const preload = DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set('collection', 'state');
newSchema.plugin(mongoose_csv);

const State = mongoose.model('State', newSchema);

if (preload) { State.insertMany(table); }

export default State;
