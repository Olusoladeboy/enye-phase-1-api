"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("../../../util");

var _constants = require("../../../constants");

/* eslint-disable no-underscore-dangle */

/* eslint-disable prefer-object-spread */
var table = [{
  name: 'Abia State',
  country: 'ng'
}, {
  name: 'Adamawa State',
  country: 'ng'
}, {
  name: 'Akwa Ibom State',
  country: 'ng'
}, {
  name: 'Anambra State',
  country: 'ng'
}, {
  name: 'Bauchi State',
  country: 'ng'
}, {
  name: 'Bayelsa State',
  country: 'ng'
}, {
  name: 'Benue State',
  country: 'ng'
}, {
  name: 'Borno State',
  country: 'ng'
}, {
  name: 'Cross River State',
  country: 'ng'
}, {
  name: 'Delta State',
  country: 'ng'
}, {
  name: 'Ebonyi State',
  country: 'ng'
}, {
  name: 'Edo State',
  country: 'ng'
}, {
  name: 'Ekiti State',
  country: 'ng'
}, {
  name: 'Enugu State',
  country: 'ng'
}, {
  name: 'FCT',
  country: 'ng'
}, {
  name: 'Gombe State',
  country: 'ng'
}, {
  name: 'Imo State',
  country: 'ng'
}, {
  name: 'Jigawa State',
  country: 'ng'
}, {
  name: 'Kaduna State',
  country: 'ng'
}, {
  name: 'Kano State',
  country: 'ng'
}, {
  name: 'Katsina State',
  country: 'ng'
}, {
  name: 'Kebbi State',
  country: 'ng'
}, {
  name: 'Kogi State',
  country: 'ng'
}, {
  name: 'Kwara State',
  country: 'ng'
}, {
  name: 'Lagos State',
  country: 'ng'
}, {
  name: 'Nasarawa State',
  country: 'ng'
}, {
  name: 'Niger State',
  country: 'ng'
}, {
  name: 'Ogun State',
  country: 'ng'
}, {
  name: 'Ondo State',
  country: 'ng'
}, {
  name: 'Osun State',
  country: 'ng'
}, {
  name: 'Oyo State',
  country: 'ng'
}, {
  name: 'Plateau State',
  country: 'ng'
}, {
  name: 'Rivers State',
  country: 'ng'
}, {
  name: 'Sokoto State',
  country: 'ng'
}, {
  name: 'Taraba State',
  country: 'ng'
}, {
  name: 'Yobe State',
  country: 'ng'
}, {
  name: 'Zamfara State',
  country: 'ng'
}];
var stateBaseId = _constants.DATABASE.BASE_ID.STATE;
var UserBaseId = _constants.DATABASE.BASE_ID.User;
var result = table.map(function (record, index) {
  var obj = Object.assign({}, record);
  var id = index + 1;
  obj._id = (0, _util.toObjectId)(stateBaseId, id);
  obj.createdBy = (0, _util.toObjectId)(UserBaseId, '1');
  return obj;
});
var _default = result;
exports["default"] = _default;
//# sourceMappingURL=table.js.map