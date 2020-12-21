/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
import aqp from 'api-query-params';
import Feedback, { validateCreate, validateUpdate } from './model';
import User from '../user/model';
// Logging
const module = 'Feedback';

export async function fetchService(query) {
  try {
    const { filter, skip, limit, sort, projection, population } = aqp(query);
    const result = await Feedback.find(filter)
      .populate(population)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .exec();
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error retrieving ${module} record. ${err.message}`);
  }
}

// eslint-disable-next-line complexity
export async function createService(data = {}) {
  try {
    const { error } = validateCreate.validate(data);
    if (error) throw new Error(`Error validating request data. ${error.message}`);
    const newRecord = new Feedback(data);
    const result = await newRecord.save();
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    const result2 = await User.updateOne({ _id: result.user },
      { $push: { reviews: result._id } }).exec();
    return result;
  } catch (err) {
    throw new Error(`Error creating ${module} record. ${err.message}`);
  }
}

export async function updateService(recordId = '', data = {}) {
  try {
    const { error } = validateUpdate.validate(data);
    if (error) throw new Error(`Error validating request data. ${error.message}`);
    const result = await Feedback.findOneAndUpdate({ _id: recordId }, data, { new: true });
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error updating ${module} record. ${err.message}`);
  }
}

export async function patchService(recordId = '', data = {}) {
  try {
    const result = await Feedback.findOneAndUpdate({ _id: recordId }, data, { new: true });
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error patching ${module} record. ${err.message}`);
  }
}

// eslint-disable-next-line complexity
export async function deleteService(recordId = '') {
  try {
    const result = await Feedback.findOneAndRemove({ _id: recordId });
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    const result2 = await User.updateOne({ _id: result.user },
      // eslint-disable-next-line no-underscore-dangle
      { $pull: { reviews: result._id } }).exec();
    return result2;
  } catch (err) {
    throw new Error(`Error deleting ${module} record. ${err.message}`);
  }
}
