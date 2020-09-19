/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-object-spread */
import { DATABASE } from '../../../constants';
import { toObjectId } from '../../../util';

const table = [
  { code: 'User', name: 'User', description: 'User Profile Pictures' },
  { code: 'DRIVER', name: 'Driver', description: 'Driver Profile Pictures' },
  { code: 'PARTNER', name: 'Partner', description: 'Partner Profile Pictures' },
  { code: 'ECOMMERCE', name: 'Ecommerce', description: 'Ecommerce Pictures for products and categories' },
  { code: 'BLOG', name: 'Blog', description: 'Blogpost image  content' },
];

const UserBaseId = DATABASE.BASE_ID.User;
const baseId = DATABASE.BASE_ID.IMAGE;

const result = table.map((record, index) => {
  const obj = Object.assign({}, record);
  const id = index + 1;
  obj._id = toObjectId(baseId, id);
  if (record.parent) obj.parent = toObjectId(baseId, record.parent);
  obj.createdBy = toObjectId(UserBaseId, 1);
  return obj;
});

export default result;
