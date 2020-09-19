"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("../../../util");

var _constants = require("../../../constants");

/* eslint-disable no-underscore-dangle */

/* eslint-disable prefer-object-spread */

/* eslint-disable object-curly-newline */
var table = [{
  name: 'Aba',
  abbreviation: 'AB',
  state: 1,
  country: 'ng'
}, {
  name: 'Abakaliki',
  abbreviation: 'AK',
  state: 11,
  country: 'ng'
}, {
  name: 'Abuja',
  abbreviation: 'AJ',
  state: 15,
  country: 'ng'
}, {
  name: 'Afikpo',
  abbreviation: 'AF',
  state: 11,
  country: 'ng'
}, {
  name: 'Akure',
  abbreviation: 'AR',
  state: 29,
  country: 'ng'
}, {
  name: 'Asaba',
  abbreviation: 'AS',
  state: 10,
  country: 'ng'
}, {
  name: 'Awka',
  abbreviation: 'AW',
  state: 4,
  country: 'ng'
}, {
  name: 'Benin',
  abbreviation: 'BN',
  state: 12,
  country: 'ng'
}, {
  name: 'Calabar',
  abbreviation: 'CB',
  state: 9,
  country: 'ng'
}, {
  name: 'Ekiti',
  abbreviation: 'EK',
  state: 12,
  country: 'ng'
}, {
  name: 'Enugu',
  abbreviation: 'EN',
  state: 14,
  country: 'ng'
}, {
  name: 'Enugu Ezike',
  abbreviation: 'EZ',
  state: 14,
  country: 'ng'
}, {
  name: 'Ibadan',
  abbreviation: 'IB',
  state: 30,
  country: 'ng'
}, {
  name: 'Ibafo',
  abbreviation: 'IF',
  state: 28,
  country: 'ng'
}, {
  name: 'Ikom',
  abbreviation: 'IK',
  state: 9,
  country: 'ng'
}, {
  name: 'Ilorin',
  abbreviation: 'IR',
  state: 24,
  country: 'ng'
}, {
  name: 'Jos',
  abbreviation: 'JS',
  state: 32,
  country: 'ng'
}, {
  name: 'Kaduna',
  abbreviation: 'KD',
  state: 19,
  country: 'ng'
}, {
  name: 'Kano',
  abbreviation: 'KN',
  state: 20,
  country: 'ng'
}, {
  name: 'Katsina',
  abbreviation: 'KS',
  state: 21,
  country: 'ng'
}, {
  name: 'Lagos',
  abbreviation: 'LG',
  state: 25,
  country: 'ng'
}, {
  name: 'Mararaba',
  abbreviation: 'MR',
  state: 26,
  country: 'ng'
}, {
  name: 'Minna',
  abbreviation: 'MN',
  state: 27,
  country: 'ng'
}, {
  name: 'Nnewi',
  abbreviation: 'NW',
  state: 4,
  country: 'ng'
}, {
  name: 'Nsukka',
  abbreviation: 'NK',
  state: 14,
  country: 'ng'
}, {
  name: 'Obollo Afor',
  abbreviation: '',
  state: 14,
  country: 'ng'
}, {
  name: 'Onitsha',
  abbreviation: '',
  state: 4,
  country: 'ng'
}, {
  name: 'Owerri',
  abbreviation: '',
  state: 17,
  country: 'ng'
}, {
  name: 'Port Harcourt',
  abbreviation: '',
  state: 33,
  country: 'ng'
}, {
  name: 'Suleja',
  abbreviation: '',
  state: 27,
  country: 'ng'
}, {
  name: 'Umuahia',
  abbreviation: '',
  state: 1,
  country: 'ng'
}, {
  name: 'Uyo',
  abbreviation: '',
  state: 3,
  country: 'ng'
}, {
  name: 'Warri',
  abbreviation: '',
  state: 10,
  country: 'ng'
}, {
  name: 'Yenagoa',
  abbreviation: '',
  state: 6,
  country: 'ng'
}];
var stateBaseId = _constants.DATABASE.BASE_ID.STATE;
var UserBaseId = _constants.DATABASE.BASE_ID.User;
var cityBaseId = _constants.DATABASE.BASE_ID.CITY;
var result = table.map(function (record, index) {
  var obj = Object.assign({}, record);
  var id = index + 1;
  obj._id = (0, _util.toObjectId)(cityBaseId, id);
  obj.state = (0, _util.toObjectId)(stateBaseId, record.state);
  obj.createdBy = (0, _util.toObjectId)(UserBaseId, '1');
  return obj;
});
var _default = result;
exports["default"] = _default;
//# sourceMappingURL=table.js.map