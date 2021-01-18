/* eslint-disable no-case-declarations */
import rp from 'request-promise';
import dotenv from 'dotenv';

import { FLUTTERWAVE, PAYSTACK } from '../constants';

dotenv.config();

const FLUTTERWAVE_KEY = {
  PUBLIC: process.env.FLUTTERWAVE_PUBLIC_KEY,
  SECRET: process.env.FLUTTERWAVE_SECRET_KEY,
  ENCRYPT: process.env.FLUTTERWAVE_ENCRYPTION,
  HASH: process.env.FLUTTERWAVE_HASH,
};

const PAYSTACK_KEY = {
  LIVE_PUBLIC: process.env.PAYSTACK_LIVE_PUBLIC_KEY,
  LIVE_SECRET: process.env.PAYSTACK_LIVE_SECRET_KEY,
  TEST_PUBLIC: process.env.PAYSTACK_TEST_PUBLIC_KEY,
  TEST_SECRET: process.env.PAYSTACK_TEST_SECRET_KEY,
};

/**
 * @description gatewayRequest external request function executes foreign http request
 * @param {String} jwtToken token string
 * @param {Enum} httpMethod request method GET|POST|PUT|PATCH|DELETE
 * @param {String} httpUrl url sting
 * @param {Object} payload object
 */
export function gatewayRequest(httpMethod, httpUrl = '', payload = {}, jwtToken) {
  const headersObj = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    json: true,
  };
  const options = {
    method: httpMethod,
    uri: httpUrl,
    body: payload,
    headers: headersObj,
    auth: { bearer: jwtToken }, // { 'user': 'myusername', 'pass': 'mypassword' },
    json: true, // Automatically stringifies the body to JSON
  };
  return rp(options).then((response) => response).catch((err) => err);
}

export async function verifyOnlineTnx(paymentGateway, trxref) {
  let result = {};
  let httpUrl = '';
  try {
    switch (paymentGateway) {
      case 'FLUTTERWAVE':
        httpUrl = `${FLUTTERWAVE.LIVE_URL}${FLUTTERWAVE.VERIFY}`;
        const data = {
          SECKEY: FLUTTERWAVE_KEY.SECRET,
          txref: trxref,
        };
        result = await gatewayRequest('POST', httpUrl, data, FLUTTERWAVE_KEY.SECRET);
        break;
      case 'PAYSTACK':
        httpUrl = `${PAYSTACK.LIVE_URL}${PAYSTACK.VERIFY}/${trxref}`;
        result = await gatewayRequest('GET', httpUrl, {}, PAYSTACK_KEY.LIVE_SECRET);
        break;

      default: throw new Error(`paymentGateway '${paymentGateway}' not allowed`);
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}
