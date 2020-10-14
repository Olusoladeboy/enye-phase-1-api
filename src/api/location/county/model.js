/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/**
 * @author 4Decoder
 * @property {ObjectId} id County primaryKey
 * @property {String} name County short name
 * @property {ObjectId} state County State Id
 * @property {ObjectId} createdBy County record created by
 * @property {ObjectId} updatedBy County record modified by
 * @description County holds record of all cities with terminalList
 */
import Joi from 'joi';
import mongoose from 'mongoose';
// eslint-disable-next-line camelcase
import mongoose_csv from 'mongoose-csv';
import { DATABASE } from '../../../constants';
import table from './table';
import State from '../state/model';
import User from '../../user/model';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  name: Joi.string().trim().required(),
  state: Joi.string().required(),
  createdBy: Joi.string().trim().length(24).required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  state: Joi.string().optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const schema = {
  name: { type: String },
  state: { type: ObjectId, ref: 'State' },
  createdBy: { type: ObjectId, required: true },
  updatedBy: { type: ObjectId, allowNull: true },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: ObjectId, ref: 'User' },
};

const preload = DATABASE.PRELOAD_TABLE_DATA.DEFAULT;
const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set('collection', 'county');
newSchema.plugin(mongoose_csv);

const County = mongoose.model('County', newSchema);
if (preload) { County.insertMany(table); }

export default County;
