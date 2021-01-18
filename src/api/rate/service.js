/* eslint-disable template-curly-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
import aqp from 'api-query-params';
import request from 'request';
import axios from 'axios';
// import Task, { validateCreate, validateUpdate } from './model';
// Logging
const module = 'Rate';
const url = 'https://api.exchangeratesapi.io/latest';

// eslint-disable-next-line import/prefer-default-export
export async function fetchService(query) {
  try {
    const { base, currency } = query;
    let result;
    await axios.get(`${url}?base=${base}&symbols=${currency}`)
      .then((response) => {
        // const {base, date, rates} = response.data;
        // result = {base, date, rates};
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return [result];
  } catch (err) {
    throw new Error(`Error retrieving ${module} record. ${err.message}`);
  }
}
