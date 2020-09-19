/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable import/named */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable object-property-newline */
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import aqp from 'api-query-params';
import User, {
  validateCreate, validateUpdate, validateLogin, validateApproval, validateVerify,
} from './model';
import { hasProp, hash, generateOtp } from '../../util';
// import { sendSmsAsync, emailForgotPassword, sendEmailAsync, postData } from '../../services';
import { JWT } from '../../constants';

// Logging
const module = 'User';

export async function fetchService(query, jwtToken) {
  try {
    const {
      limit, filter, skip, sort, projection, population,
    } = aqp(query);
    const searchString = filter.q || '';
    if (searchString) {
      // filter.$text = { $search: searchString, $caseSensitive: false };
      filter.$or = [{ phone: searchString },
        { phoneHome: searchString },
        { surname: searchString }];
      delete filter.q;
    }
    // filter.deleted = false;
    const result = await User.find(filter)
      .populate(population)
    // .populate({ path: 'notifications', select: 'message', match: { status: 'UNREAD' } })
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
export async function createService(data = {}, jwtToken = '') {
  try {
    data.password = data.password || 'peace'; //! Random password
    const { password, email, phone } = data;
    if (hasProp(data, 'password')) data.password = hash(data.password);
    const { error } = validateCreate.validate(data);
    if (error) throw new Error(`Error validating ${module} data. ${error.message}`);
    const duplicate = await User.findOne({ $or: [{ email }, { phone }] }).exec();
    if (duplicate) {
      throw new Error(`Error! Record already exist for ${email} or ${phone}`);
    }
    const newRecord = new User(data);
    const result = await newRecord.save();
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
    //* Send Login credentials to User via email
    // const subject = `Welcome, ${data.otherName} to Peacegroup ERP Dove2.0`;
    // const body = `Your email is ${data.email} and your password is ${password}`;
    // await sendEmailAsync(data.email, 'no-reply@peacegroup.ng', subject, body);
    //* Create Customer Credentials for User
    // const {
    //   title,
    //   surname,
    //   otherName,
    //   gender,
    //   birthDate,
    //   photo,
    //   phoneHome,
    //   address,
    //   state,
    //   county,
    //   country,
    //   kin,
    //   kinPhone,
    //   kinAddress,
    //   terminal,
    // } = data;
    // const customerData = {
    //   title,
    //   surname,
    //   otherName,
    //   gender,
    //   birthDate,
    //   photo,
    //   password,
    //   phoneHome,
    //   address,
    //   state,
    //   county,
    //   country,
    //   isUser: true,
    //   email,
    //   phone,
    //   terminal,
    // };
    // customerData.contactPerson = `${kin}, ${kinAddress}`;
    // customerData.contactPersonPhone = kinPhone;
    // const customer = postData(jwtToken, '/erp/customers', customerData);
    // console.log(customer);
  } catch (err) {
    throw new Error(`Error creating ${module} record. ${err.message}`);
  }
}

// eslint-disable-next-line complexity
export async function updateService(recordId, data = {}, jwtToken = '') {
  try {
    // eslint-disable-next-line max-len
    // if (recordId === '5a51bc91860d8b5ba0001000') return fail(res, 422, `Cannot update record. ${recordId}`);
    if (hasProp(data, 'password')) {
      data.password = hash(data.password);
    }
    const { error } = validateUpdate.validate(data);
    data.status = 'PENDING';
    if (error) throw new Error(`Error validating ${module} data. ${error.message}`);

    const result = await User.findOneAndUpdate({ _id: recordId }, data, { new: true });
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error updating ${module} record. ${err.message}`);
  }
}

export async function patchService(recordId, data = {}, jwtToken = '') {
  try {
    const result = await User.findOneAndUpdate({ _id: recordId }, data, { new: true });
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error patching ${module} record. ${err.message}`);
  }
}

// eslint-disable-next-line consistent-return
export async function deleteService(recordId, jwtToken = '') {
  try {
    if (recordId === '5a51bc91860d8b5ba0001000') throw new Error(`Cannot delete record. ${recordId}`);
    const result = await User.findOneAndRemove({ _id: recordId });
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error deleting ${module} record. ${err.message}`);
  }
}

// export async function sendOTPService(data = {}, jwtToken = '') {
//     try {
//         const { error } = validateLogin.validate(data);
//         if (error) throw new Error('Invalid paramater: require both Email & Phone for OTP');
//         const { phone, email } = data;
//         const otp = generateOtp();
//         const update = {
//             otp: hash(otp.toString()),
//             $inc: { otpCount: 1 },
//             otpAccess: true,
//         };
//         const q = { $and: [{ email }, { phone }] };
//         const result = await User.findOneAndUpdate(q, update, { new: true }).exec();
//         if (!result) {
//             throw new Error(`User not found with phone ${phone} & email ${email}`);
//         }
//         const msg = `Login to the App using this phone number and the OTP ${otp} -PEACEGROUP`;
//         const sentSmsObject = await sendSmsAsync(msg, phone);
//         const sentEmailObject = await emailForgotPassword(email, msg);
//         // eslint-disable-next-line no-undef
//         logger.info(sentSmsObject, sentEmailObject);
//         return { sentSmsObject, sentEmailObject };
//     } catch (err) {
//         throw new Error(`Error sending ${module} record. ${err.message}`);
//     }
// }

// eslint-disable-next-line complexity
function getLoginType(data) {
  const { email, phone, password } = data;
  let loginType = '';
  if (email && password) {
    loginType = 'EMAIL';
  } else if (phone && password) {
    loginType = 'PHONE';
  }
  // else if (phone && otp) {
  //     loginType = 'OTP';
  // }
  return loginType;
}

// eslint-disable-next-line complexity
export async function updateApprovalService(recordId, data = {}, jwtToken = '') {
  try {
    const userId = data.updatedBy;
    const { status } = data;
    const record = { status };
    console.log(recordId);
    if (recordId === '5a51bc91860d8b5ba0001000') throw new Error('Cannot alter User record');
    const { error } = validateApproval.validate(data);
    if (error) throw new Error(`Error validating ${module} data. ${error.message}`);
    const user = await User.findById(recordId).exec();
    if (user.deleted) throw new Error(`Error approving ${module} record. It was deleted since ${user.deletedAt}`);
    switch (data.status) {
      case 'APPROVED':
        record.approvedBy = userId;
        record.approvedDate = Date.now();
        break;
      case 'REJECTED':
        record.rejectedBy = userId;
        record.rejectedDate = Date.now();
        break;
      default:
    }
    const result = await User.findOneAndUpdate({ _id: recordId }, record, { new: true });
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
  } catch (err) {
    throw new Error(`Error updating ${module} record. ${err.message}`);
  }
}

// eslint-disable-next-line consistent-return
// eslint-disable-next-line complexity
export async function updateVerificationStatusService(recordId, data = {}, jwtToken = '') {
  try {
    // const userId = data.updatedBy;
    console.log('record =>', recordId);
    const { verificationDate, verificationVideo } = data;
    const record = { verificationDate, verificationVideo };
    if (recordId === '5a51bc91860d8b5ba0001000') throw new Error('Cannot alter User record');
    const { error } = validateVerify.validate(data);
    if (error) throw new Error(`Error validating ${module} data. ${error.message}`);
    const user = await User.findById(recordId).exec();
    console.log(user);
    if (user.deleted) throw new Error(`Error verifying ${module} record. It was deleted since ${user.deletedAt}`);
    record.verificationDate = Date.now();
    const result = await updateService(recordId, data);
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
  } catch (err) {
    throw new Error(`Error updating ${module} record. ${err.message}`);
  }
}

// eslint-disable-next-line complexity
export async function loginService(loginPayload) {
  try {
    const { error } = validateLogin.validate(loginPayload);
    if (error) throw new Error(`Invalid ${module} login data. ${error.message}`);
    if (!getLoginType(loginPayload)) throw new Error('Invlaid login parameters');
    const {
      email, phone, otp, password, type,
    } = loginPayload;
    const filter = {};
    if (type === 'PHONE' || type === 'OTP') {
      filter.phone = phone;
    } else {
      filter.email = email;
    }
    const user = await User
      .findOne(filter)
      .select('-createdBy -updatedBy')
      .exec();

    if (!user) {
      throw new Error('User not found.');
    }
    if (type === 'OTP') {
      if (!user.otpAccess) {
        throw new Error(`Authentication failed. OTP Access is ${user.otpAccess}`);
      }
      if (!bcryptjs.compareSync(otp, user.otp.toString())) {
        throw new Error('Invalid OTP credentials.');
      }
    } else if (!bcryptjs.compareSync(password, user.password)) {
      throw new Error('Wrong password.');
    }

    const update = {
      otpAccess: false,
      currentLogin: Date.now(),
      currentIp: loginPayload.currentIp,
      lastLogin: user.currentLogin,
      lastIp: user.currentIp,
    };
    await User.findOneAndUpdate({ _id: user._id }, update, { new: true }).exec();
    // Delete private attributes
    user.password = null;
    user.otp = null;
    delete user.password;
    delete user.otp;
    const payload = {
      id: user.id,
      userType: 'User',
      role: user.role,
      accessLevel: user.accessLevel,
      email: user.email,
      phone: user.phone,
      time: new Date(),
    };

    const token = jwt.sign(payload, JWT.jwtSecret, {
      expiresIn: '240h', // JWT.tokenExpireTime,
    });
    return { token, user };
  } catch (err) {
    throw new Error(`Authentication failed: ${err.message}`);
  }
}

function remakeId(id) {
  return id.replace(id.substring(15, 18), 'ac0');
}

export async function updateTerminalIdService() {
  try {
    const list = await User.find({}).exec();
    const resolvedArray = await Promise.all(list.map(async (data) => {
      if (data.subsidiary === 'PMT') {
        console.log('\nOld User ===> ', data);
        data.terminal = remakeId(data.terminal.toString());
        console.log('\nNew User ===> ', data);
        const rec = await User.findOneAndUpdate({ _id: data.id }, data, { new: true });
        return rec;
      }
      return data;
    }));
  } catch (err) {
    throw new Error(`Error creating ${module} record. ${err.message}`);
  }
}
