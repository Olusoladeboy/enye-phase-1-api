/* eslint-disable object-shorthand */
import aqp from 'api-query-params';
import Media, { validateCreate, validateUpdate } from './model';

const module = 'Media';

export async function fetchService(query) {
  try {
    const {
      filter, skip, limit, sort, projection,
    } = aqp(query);
    const result = await Media.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .exec();
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    const total = await Media.find(filter).estimatedDocumentCount().exec();
    const metadata = {
      total, skip, limit, page: 0,
    };
    return { result, metadata };
  } catch (err) {
    throw new Error(`Error retrieving ${module} record. ${err.message}`);
  }
}

export async function createService(data) {
  try {
    const { error } = validateCreate.validate(data);
    if (error) throw new Error(`Error validating ${module} data. ${error.message}`);
    const newRecord = new Media(data);
    const result = await newRecord.save();
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error ${module} createService. ${err.message}`);
  }
}

export async function updateService(recordId, data) {
  try {
    const { error } = validateUpdate.validate(data);
    if (error) throw new Error(`Error validating ${module} data. ${error.message}`);
    const result = await Media.findOneAndUpdate({ _id: recordId }, data, { new: true });
    if (!result) {
      throw new Error(`${module} record with Id ${recordId} not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error updating ${module} record. ${err.message}`);
  }
}

export async function patchService(recordId, data) {
  try {
    const result = await Media.findOneAndUpdate({ _id: recordId }, data, { new: true });
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error patching ${module} record. ${err.message}`);
  }
}

export async function deleteService(recordId) {
  try {
    const result = await Media.findOneAndRemove({ _id: recordId });
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error deleting ${module} record. ${err.message}`);
  }
}