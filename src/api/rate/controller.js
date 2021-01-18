/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
import { success, fail } from '../../util';
import { fetchService } from './service';

// Logging
const module = 'Rates';

export async function fetchRecord(req, res) {
  try {
    const result = await fetchService(req.query);
    return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`);
  } catch (err) {
    return fail(res, 400, `Error retrieving ${module} record. ${err.message}`);
  }
}
