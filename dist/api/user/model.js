"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.schema = exports.schemaApproval = exports.schemaUpdate = exports.schemaCreate = exports.schemaLogin = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("../../constants");

var _Joi$string$trim;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;
var STATUS = ["PENDING", "APPROVED", "REJECTED"]; // Record Status

var schemaLogin = _joi["default"].object({
  email: _joi["default"].string().trim().email().optional(),
  phone: _joi["default"].string().min(11).max(14).optional(),
  otp: _joi["default"].string().optional(),
  password: _joi["default"].string().optional(),
  type: _joi["default"].string().valid("EMAIL", "PHONE", "OTP").optional()
});

exports.schemaLogin = schemaLogin;

var schemaCreate = _joi["default"].object({
  title: _joi["default"].string().optional(),
  lastName: _joi["default"].string().required(),
  firstName: _joi["default"].string().required(),
  otherName: _joi["default"].string().optional(),
  gender: _joi["default"].string().required(),
  birthDate: _joi["default"].date().required(),
  maritalStatus: _joi["default"].string().required(),
  phone: _joi["default"].string().required(),
  email: _joi["default"].string().trim().email().optional(),
  address: _joi["default"].string().optional(),
  state: _joi["default"].string().required(),
  county: _joi["default"].string().required(),
  country: _joi["default"].string().optional(),
  password: _joi["default"].string().optional(),
  otp: _joi["default"].string().optional(),
  otpCount: _joi["default"].number().optional(),
  kin: _joi["default"].string().required(),
  kinPhone: _joi["default"].string().required(),
  kinAddress: _joi["default"].string().required(),
  profession: _joi["default"].string().optional(),
  bank: _joi["default"].string().optional(),
  bankAccountNumber: _joi["default"].string().optional(),
  bankAccountName: _joi["default"].string().optional(),
  ratings: _joi["default"].array().optional(),
  photo: _joi["default"].string().optional(),
  createdBy: _joi["default"].string().trim().length(24).required()
});

exports.schemaCreate = schemaCreate;

var schemaUpdate = _joi["default"].object({
  title: _joi["default"].string().optional(),
  lastName: _joi["default"].string().required(),
  firstName: _joi["default"].string().required(),
  otherName: _joi["default"].string().optional(),
  gender: _joi["default"].string().required(),
  birthDate: _joi["default"].date().required(),
  maritalStatus: _joi["default"].string().required(),
  phone: _joi["default"].string().required(),
  email: _joi["default"].string().trim().email().optional(),
  address: _joi["default"].string().optional(),
  state: _joi["default"].string().required(),
  county: _joi["default"].string().required(),
  country: _joi["default"].string().optional(),
  password: _joi["default"].string().optional(),
  otp: _joi["default"].string().optional(),
  otpCount: _joi["default"].number().optional(),
  kin: _joi["default"].string().required(),
  kinPhone: _joi["default"].string().required(),
  kinAddress: _joi["default"].string().required(),
  profession: _joi["default"].string().optional(),
  bank: _joi["default"].string().optional(),
  bankAccountNumber: _joi["default"].string().optional(),
  bankAccountName: _joi["default"].string().optional(),
  ratings: _joi["default"].array().optional(),
  photo: _joi["default"].string().optional(),
  updatedBy: _joi["default"].string().trim().length(24).required()
});

exports.schemaUpdate = schemaUpdate;

var schemaApproval = _joi["default"].object({
  status: (_Joi$string$trim = _joi["default"].string().trim()).valid.apply(_Joi$string$trim, STATUS).required(),
  accessLevel: _joi["default"].number().min(0).max(5).optional(),
  approvedBy: _joi["default"].string().optional(),
  approvedDate: _joi["default"].date().optional(),
  rejectedBy: _joi["default"].string().optional(),
  rejectedDate: _joi["default"].date().optional(),
  approvalRemark: _joi["default"].string().optional(),
  updatedBy: _joi["default"].string().trim().length(24).required()
});

exports.schemaApproval = schemaApproval;
var schema = {
  title: {
    type: String
  },
  lastName: {
    type: String,
    required: true,
    text: true
  },
  firstName: {
    type: String,
    required: true,
    text: true
  },
  otherName: {
    type: String,
    required: true,
    text: true
  },
  gender: {
    type: String,
    "enum": Object.values(_constants.GENDER),
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  maritalStatus: {
    type: String,
    "enum": Object.values(_constants.MARITAL_STATUS)
  },
  phone: {
    type: String,
    required: true,
    text: true
  },
  address: {
    type: String
  },
  state: {
    type: ObjectId,
    ref: "State",
    required: true
  },
  county: {
    type: ObjectId,
    ref: "County",
    required: true
  },
  country: {
    type: String,
    required: true,
    "default": "ng"
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    text: true,
    unique: true,
    // eslint-disable-next-line no-useless-escape
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
  },
  password: {
    type: String
  },
  otp: {
    type: String
  },
  otpCount: {
    type: Number,
    "default": 0
  },
  otpAccess: {
    type: Boolean,
    "default": false
  },
  kin: {
    type: String,
    required: true
  },
  kinPhone: {
    type: String
  },
  kinAddress: {
    type: String
  },
  bank: {
    type: ObjectId,
    ref: "Bank"
  },
  bankAccountNumber: {
    type: String
  },
  bankAccountName: {
    type: String
  },
  ratings: [{
    type: ObjectId,
    ref: "Rating"
  }],
  notifications: [{
    type: ObjectId,
    ref: "Notification"
  }],
  photo: {
    type: String
  },
  //* Approval
  status: {
    type: String,
    "enum": STATUS,
    "default": "PENDING"
  },
  approvedDate: {
    type: Date
  },
  approvedBy: {
    type: ObjectId,
    ref: "User"
  },
  rejectedDate: {
    type: Date
  },
  rejectedBy: {
    type: ObjectId,
    ref: "User"
  },
  approvalRemark: {
    type: String
  },
  //* Authentication
  lastLogin: {
    type: Date
  },
  currentLogin: {
    type: Date
  },
  lastIp: {
    type: String
  },
  currentIp: {
    type: String
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  updatedBy: {
    type: ObjectId,
    ref: "User"
  },
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: {
    type: Date
  },
  deletedBy: {
    type: ObjectId,
    ref: "User"
  }
};
exports.schema = schema;
var options = _constants.DATABASE.OPTIONS;
var newSchema = new Schema(schema, options);
newSchema.virtual("fullName").get(function () {
  var title = this.title ? this.title : "";
  return "".concat(title, " ").concat(this.firstName, " ").concat(this.lastName);
}).set(function (v) {
  // `v` is the value being set, so use the value to set
  // `surname` and `otherName`.
  var lastName = v.substring(0, v.indexOf(" "));
  var firstName = v.substring(v.indexOf(" ") + 1);
  this.set({
    lastName: lastName,
    firstName: firstName
  });
});
newSchema.index({
  phone: 1,
  email: 1
}, {
  unique: true
});
newSchema.index({
  phone: "text",
  lastName: "text",
  firstName: "text",
  email: "text"
});
newSchema.set("collection", "user"); // newSchema.plugin(mongoose_csv);

var User = _mongoose["default"].model("User", newSchema);

User.createIndexes({
  phone: "text",
  lastName: "text",
  firstName: "text",
  email: "text"
});
var _default = User;
exports["default"] = _default;