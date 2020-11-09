/* eslint-disable func-names */
import Joi from 'joi';
import mongoose from 'mongoose';
import { DATABASE, GENDER, MARITAL_STATUS } from '../../constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const STATUS = ['PENDING', 'APPROVED', 'REJECTED']; // Record Status

export const validateLogin = Joi.object({
  email: Joi.string().trim().email().optional(),
  phone: Joi.string().min(11).max(14).optional(),
  otp: Joi.string().optional(),
  password: Joi.string().optional(),
  type: Joi.string().valid('EMAIL', 'PHONE', 'OTP').optional(),
});

export const validateCreate = Joi.object({
  title: Joi.string().optional(),
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  otherName: Joi.string().optional(),
  gender: Joi.string().optional(),
  birthDate: Joi.date().optional(),
  maritalStatus: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().trim().email().required(),
  address: Joi.string().optional(),
  state: Joi.string().optional(),
  county: Joi.string().optional(),
  country: Joi.string().optional(),
  password: Joi.string().required(),
  otp: Joi.string().optional(),
  otpCount: Joi.number().optional(),
  kin: Joi.string().optional(),
  kinPhone: Joi.string().optional(),
  kinAddress: Joi.string().optional(),
  profession: Joi.string().optional(),
  bank: Joi.string().optional(),
  bankAccountNumber: Joi.string().optional(),
  bankAccountName: Joi.string().optional(),
  reviews: Joi.array().optional(),
  photo: Joi.string().optional(),
  userType: Joi.string().required(),
  createdBy: Joi.string().trim().length(24).optional(),
});

export const validateUpdate = Joi.object({
  title: Joi.string().optional(),
  lastName: Joi.string().optional(),
  firstName: Joi.string().optional(),
  otherName: Joi.string().optional(),
  gender: Joi.string().optional(),
  birthDate: Joi.date().optional(),
  maritalStatus: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().trim().email().optional(),
  address: Joi.string().optional(),
  state: Joi.string().optional(),
  county: Joi.string().optional(),
  country: Joi.string().optional(),
  password: Joi.string().optional(),
  otp: Joi.string().optional(),
  otpCount: Joi.number().optional(),
  kin: Joi.string().optional(),
  kinPhone: Joi.string().optional(),
  kinAddress: Joi.string().optional(),
  profession: Joi.string().optional(),
  bank: Joi.string().optional(),
  bankAccountNumber: Joi.string().optional(),
  bankAccountName: Joi.string().optional(),
  reviews: Joi.array().optional(),
  photo: Joi.string().optional(),
  userType: Joi.string().optional(),
  verificationVideo: Joi.string().trim().length(24).optional(),
  verificationDate: Joi.date().optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const validateApproval = Joi.object({
  status: Joi.string().trim().valid(...STATUS).required(),
  verified: Joi.boolean().required(),
  approvedBy: Joi.string().optional(),
  approvedDate: Joi.date().optional(),
  rejectedBy: Joi.string().optional(),
  rejectedDate: Joi.date().optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const validateVerify = Joi.object({
  verificationVideo: Joi.string().trim().length(24).optional(),
  verificationDate: Joi.date().optional(),
  updatedBy: Joi.string().trim().length(24).required(),
});

export const schema = {
  title: { type: String },
  lastName: { type: String, required: true, text: true },
  firstName: { type: String, required: true, text: true },
  otherName: { type: String, text: true },
  gender: {
    type: String,
    enum: Object.values(GENDER),
    required: false,
  },
  birthDate: { type: Date, required: false },
  maritalStatus: {
    type: String,
    enum: Object.values(MARITAL_STATUS),
  },
  phone: { type: String, required: false, text: true },
  address: { type: String },
  state: { type: ObjectId, ref: 'State', required: false },
  county: { type: ObjectId, ref: 'County', required: false },
  country: { type: String, required: false, default: 'ng' },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    text: true,
    unique: true,
    required: true,
    // eslint-disable-next-line no-useless-escape
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: { type: String, required: true },
  otp: { type: String },
  otpCount: { type: Number, default: 0 },
  otpAccess: { type: Boolean, default: false },
  kin: { type: String, required: false },
  kinPhone: { type: String },
  kinAddress: { type: String },
  bank: { type: ObjectId, ref: 'Bank' },
  bankAccountNumber: { type: String },
  bankAccountName: { type: String },
  reviews: [{ type: ObjectId, ref: 'Reviews' }],
  notifications: [{ type: ObjectId, ref: 'Notification' }],
  photo: { type: String },
  userType: { type: String },
  verificationVideo: { type: ObjectId, ref: 'Media' },
  verificationDate: { type: Date },
  //* Approval
  verified: { type: Boolean, default: false },
  status: { type: String, enum: STATUS, default: 'PENDING' },
  approvedDate: { type: Date },
  approvedBy: { type: ObjectId, ref: 'User' },
  rejectedDate: { type: Date },
  rejectedBy: { type: ObjectId, ref: 'User' },
  approvalRemark: { type: String },
  //* Authentication
  lastLogin: { type: Date },
  currentLogin: { type: Date },
  lastIp: { type: String },
  currentIp: { type: String },
  createdBy: { type: ObjectId, ref: 'User', required: false },
  updatedBy: { type: ObjectId, ref: 'User' },

  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: ObjectId, ref: 'User' },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);

newSchema.virtual('fullName')
  .get(function () {
    const title = this.title ? this.title : '';
    return `${title} ${this.firstName} ${this.lastName}`;
  })
  .set(function (v) {
    // `v` is the value being set, so use the value to set
    // `surname` and `otherName`.
    const lastName = v.substring(0, v.indexOf(' '));
    const firstName = v.substring(v.indexOf(' ') + 1);
    this.set({ lastName, firstName });
  });

newSchema.index({ phone: 1, email: 1 }, { unique: true });
// newSchema.index({
//   phone: 'text',
//   lastName: 'text',
//   firstName: 'text',
//   email: 'text',
// }, {
//   unique: true,
// });

newSchema.set('collection', 'user');
// newSchema.plugin(mongoose_csv);

const User = mongoose.model('User', newSchema);
User.createIndexes({
  phone: 'text', lastName: 'text', firstName: 'text', email: 'text',
});

export default User;
