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
  name: 'airwheel-segway',
  url: 'airwheel-segway.jpg'
}];
var UserBaseId = _constants.DATABASE.BASE_ID.User;
var baseId = _constants.DATABASE.BASE_ID.IMAGE;
var result = table.map(function (record, index) {
  var obj = Object.assign({}, record);
  var id = index + 1;
  obj._id = (0, _util.toObjectId)(baseId, id);
  obj.createdBy = (0, _util.toObjectId)(UserBaseId, 1);
  return obj;
});
var _default = result;
exports["default"] = _default;
//# sourceMappingURL=table.js.map