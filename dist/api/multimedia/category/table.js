"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../../../constants");

var _util = require("../../../util");

/* eslint-disable no-underscore-dangle */

/* eslint-disable prefer-object-spread */
var table = [{
  code: 'User',
  name: 'User',
  description: 'User Profile Pictures'
}, {
  code: 'DRIVER',
  name: 'Driver',
  description: 'Driver Profile Pictures'
}, {
  code: 'PARTNER',
  name: 'Partner',
  description: 'Partner Profile Pictures'
}, {
  code: 'ECOMMERCE',
  name: 'Ecommerce',
  description: 'Ecommerce Pictures for products and categories'
}, {
  code: 'BLOG',
  name: 'Blog',
  description: 'Blogpost image  content'
}];
var UserBaseId = _constants.DATABASE.BASE_ID.User;
var baseId = _constants.DATABASE.BASE_ID.IMAGE;
var result = table.map(function (record, index) {
  var obj = Object.assign({}, record);
  var id = index + 1;
  obj._id = (0, _util.toObjectId)(baseId, id);
  if (record.parent) obj.parent = (0, _util.toObjectId)(baseId, record.parent);
  obj.createdBy = (0, _util.toObjectId)(UserBaseId, 1);
  return obj;
});
var _default = result;
exports["default"] = _default;
//# sourceMappingURL=table.js.map