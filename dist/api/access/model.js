"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.schema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @author 4Dcoder
 * @property {String} ipaddress Access IP address
 * @property {String} software Access software
 * @property {String} agent Access agent description
 * @property {String} method Access GET|POST|PUT|OPTLETE
 * @property {String} baseUrl Access base Url
 * @property {String} version Access version
 * @property {String} status Access status
 * @description Access model holds api access
 */
// eslint-disable-next-line camelcase
// eslint-disable-next-line import/no-cycle
var Schema = _mongoose["default"].Schema; // const allData = { ipaddress, software, agent, method, baseUrl, version, status };

var schema = {
  ipaddress: {
    type: String,
    trim: true,
    index: true
  },
  software: {
    type: String,
    trim: true
  },
  agent: {
    type: String,
    trim: true
  },
  method: {
    type: String,
    trim: true
  },
  baseUrl: {
    type: String,
    trim: true
  },
  version: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    trim: true
  }
};
exports.schema = schema;
var options = _constants.DATABASE.OPTIONS;
var newSchema = new Schema(schema, options);
newSchema.set("collection", "access");

var Access = _mongoose["default"].model("Access", newSchema);

var _default = Access;
exports["default"] = _default;