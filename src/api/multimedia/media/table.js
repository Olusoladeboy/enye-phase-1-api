/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-object-spread */
import { DATABASE } from '../../../constants';
import { toObjectId } from '../../../util';

const table = [
  { name: 'airwheel-segway', url: 'airwheel-segway.jpg' },
];

const staffBaseId = DATABASE.BASE_ID.STAFF;
const baseId = DATABASE.BASE_ID.IMAGE;

const result = table.map((record, index) => {
  const obj = Object.assign({}, record);
  const id = index + 1;
  obj._id = toObjectId(baseId, id);
  obj.createdBy = toObjectId(staffBaseId, 1);
  return obj;
});

export default result;
