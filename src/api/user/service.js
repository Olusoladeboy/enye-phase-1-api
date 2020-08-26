/* eslint-disable camelcase */
/* eslint-disable object-property-newline */
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import aqp from "api-query-params";
import Staff, { schemaCreate, schemaUpdate, schemaLogin, schemaApproval, schemaEmployment } from "./model";
import { hasProp, hash, generateOtp } from "../../../util";
import { sendSmsAsync, emailForgotPassword, sendEmailAsync, postData } from "../../../services";
import { JWT } from "../../../constants";

// Logging
const module = "Staff";

export async function fetchService(query, jwtToken) {
    try {
        const { limit, filter, skip, sort, projection, population } = aqp(query);
        const searchString = filter.q || "";
        if (searchString) {
            // filter.$text = { $search: searchString, $caseSensitive: false };
            filter.$or = [{ phone: searchString },
                { phoneHome: searchString },
                { surname: searchString }];
            delete filter.q;
        }
        // filter.deleted = false;
        const result = await Staff.find(filter)
            .populate(population)
            // .populate({ path: "notifications", select: "message", match: { status: "UNREAD" } })
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
export async function createService(data = {}, jwtToken = "") {
    try {
        data.password = data.password || "peace"; //! Random password
        const { password, email, phone } = data;
        if (hasProp(data, "password")) data.password = hash(data.password);
        const { error } = schemaCreate.validate(data);
        if (error) throw new Error(`Error validating ${module} data. ${error.message}`);
        const duplicate = await Staff.findOne({ $or: [{ email }, { phone }] }).exec();
        if (duplicate) {
            throw new Error(`Error! Record already exist for ${email} or ${phone}`);
        }
        const newRecord = new Staff(data);
        const result = await newRecord.save();
        if (!result) {
            throw new Error(`${module} record not found.`);
        }
        //* Send Login credentials to Staff via email
        const subject = `Welcome, ${data.otherName} to Peacegroup ERP Dove2.0`;
        const body = `Your email is ${data.email} and your password is ${password}`;
        await sendEmailAsync(data.email, "no-reply@peacegroup.ng", subject, body);
        //* Create Customer Credentials for Staff
        const {
            title, surname, otherName, gender, birthDate, photo, phoneHome,
            address, state, county, country, kin, kinPhone, kinAddress, terminal,
        } = data;
        const customerData = {
            title, surname, otherName, gender, birthDate, photo, password, phoneHome,
            address, state, county, country, isStaff: true, email, phone, terminal,
        };
        customerData.contactPerson = `${kin}, ${kinAddress}`;
        customerData.contactPersonPhone = kinPhone;
        const customer = postData(jwtToken, "/erp/customers", customerData);
        console.log(customer);
    } catch (err) {
        throw new Error(`Error creating ${module} record. ${err.message}`);
    }
}

// eslint-disable-next-line complexity
export async function updateService(recordId, data = {}, jwtToken = "") {
    try {
        // eslint-disable-next-line max-len
        // if (recordId === "5a51bc91860d8b5ba0001000") return fail(res, 422, `Cannot update record. ${recordId}`);
        if (hasProp(data, "password")) {
            data.password = hash(data.password);
        }
        const { error } = schemaUpdate.validate(data);
        data.status = "PENDING";
        if (error) throw new Error(`Error validating ${module} data. ${error.message}`);

        const result = await Staff.findOneAndUpdate({ _id: recordId }, data, { new: true });
        if (!result) {
            throw new Error(`${module} record not found.`);
        }
    } catch (err) {
        throw new Error(`Error updating ${module} record. ${err.message}`);
    }
}

export async function patchService(recordId, data = {}, jwtToken = "") {
    try {
        const result = await Staff.findOneAndUpdate({ _id: recordId }, data, { new: true });
        if (!result) {
            throw new Error(`${module} record not found.`);
        }
    } catch (err) {
        throw new Error(`Error patching ${module} record. ${err.message}`);
    }
}

// eslint-disable-next-line consistent-return
export async function deleteService(recordId, jwtToken = "") {
    try {
        if (recordId === "5a51bc91860d8b5ba0001000") throw new Error(`Cannot delete record. ${recordId}`);
        const result = await Staff.findOneAndRemove({ _id: recordId });
        if (!result) {
            throw new Error(`${module} record not found.`);
        }
    } catch (err) {
        throw new Error(`Error deleting ${module} record. ${err.message}`);
    }
}

export async function sendOTPService(data = {}, jwtToken = "") {
    try {
        const { error } = schemaLogin.validate(data);
        if (error) throw new Error("Invalid paramater: require both Email & Phone for OTP");
        const { phone, email } = data;
        const otp = generateOtp();
        const update = {
            otp: hash(otp.toString()),
            $inc: { otpCount: 1 },
            otpAccess: true,
        };
        const q = { $and: [{ email }, { phone }] };
        const result = await Staff.findOneAndUpdate(q, update, { new: true }).exec();
        if (!result) {
            throw new Error(`User not found with phone ${phone} & email ${email}`);
        }
        const msg = `Login to the App using this phone number and the OTP ${otp} -PEACEGROUP`;
        const sentSmsObject = await sendSmsAsync(msg, phone);
        const sentEmailObject = await emailForgotPassword(email, msg);
        // eslint-disable-next-line no-undef
        logger.info(sentSmsObject, sentEmailObject);
        return { sentSmsObject, sentEmailObject };
    } catch (err) {
        throw new Error(`Error sending ${module} record. ${err.message}`);
    }
}

// eslint-disable-next-line complexity
function getLoginType(data) {
    const { email, phone, otp, password } = data;
    let loginType = "";
    if (email && password) {
        loginType = "EMAIL";
    } else if (phone && password) {
        loginType = "PHONE";
    } else if (phone && otp) {
        loginType = "OTP";
    }
    return loginType;
}

// eslint-disable-next-line complexity
export async function updateApprovalService(recordId, data = {}, jwtToken = "") {
    try {
        const userId = data.updatedBy;
        const { status, approvalRemark, accessLevel } = data;
        const record = { status, approvalRemark, accessLevel };
        if (recordId === "5a51bc91860d8b5ba0001000") throw new Error("Cannot alter staff record");
        const { error } = schemaApproval.validate(data);
        if (error) throw new Error(`Error validating ${module} data. ${error.message}`);
        const staff = await Staff.findById(recordId).exec();
        if (staff.deleted) throw new Error(`Error approving ${module} record. It was deleted since ${staff.deletedAt}`);
        switch (data.status) {
        case "APPROVED":
            record.approvedBy = userId;
            record.approvedDate = Date.now();
            break;
        case "REJECTED":
            record.rejectedBy = userId;
            record.rejectedDate = Date.now();
            break;
        default:
        }
        const result = await Staff.findOneAndUpdate({ _id: recordId }, record, { new: true });
        if (!result) {
            throw new Error(`${module} record not found.`);
        }
    } catch (err) {
        throw new Error(`Error updating ${module} record. ${err.message}`);
    }
}

// eslint-disable-next-line consistent-return
// eslint-disable-next-line complexity
export async function updateEmploymentService(recordId, data = {}, jwtToken = "") {
    try {
        const userId = data.updatedBy;
        const { employment, employmentRemark } = data;
        const record = { employment, employmentRemark };
        if (recordId === "5a51bc91860d8b5ba0001000") throw new Error("Cannot alter staff record");
        const { error } = schemaEmployment.validate(data);
        if (error) throw new Error(`Error validating ${module} data. ${error.message}`);
        const staff = await Staff.findById(recordId).exec();
        if (staff.deleted) throw new Error(`Error approving ${module} record. It was deleted since ${staff.deletedAt}`);
        switch (data.employment) {
        case "EMPLOYED":
            record.employedBy = userId;
            record.employedDate = Date.now();
            record.accessLevel = 1;
            break;
        case "FULLTIME":
            record.fulltimedBy = userId;
            record.fulltimedDate = Date.now();
            break;
        case "PARTTIME":
            record.parttimedBy = userId;
            record.parttimedDate = Date.now();
            break;
        case "LEAVE":
            record.leaveBy = userId;
            record.leaveDate = Date.now();
            record.accessLevel = 1;
            break;
        case "PROBATED":
            record.probatedBy = userId;
            record.probatedDate = Date.now();
            record.accessLevel = 1;
            break;
        case "SUSPENDED":
            record.suspendedBy = userId;
            record.suspendedDate = Date.now();
            record.isSalaryPayable = false;
            record.accessLevel = 0;
            break;
        case "RETIRED":
            record.retiredBy = userId;
            record.retiredDate = Date.now();
            record.isSalaryPayable = false;
            record.accessLevel = 0;
            break;
        case "DISENGAGED":
            record.disengagedBy = userId;
            record.disengagedDate = Date.now();
            record.isSalaryPayable = false;
            record.accessLevel = 0;
            break;
        default:
        }
        const result = await updateService(recordId, data);
        if (!result) {
            throw new Error(`${module} record not found.`);
        }
    } catch (err) {
        throw new Error(`Error updating ${module} record. ${err.message}`);
    }
}

/*
export async function createRecord(req, res) {
    try {
        return upload(req, res, async (err) => {
            const data = req.body;
            data.createdBy = req.user.id;
            const { error } = schemaCreate.validate(data);
            if (error) return fail(res, 422, `Error validating request data. ${error.message}`);
            if (err || req.file === undefined) {
                return fail(res, 422, `Error processing file. ${err.message}`);
            }
            const fullPath = `upload/photo/${req.file.filename}`;
            data.photo = fullPath;
            const newRecord = new Item(data);
            const result = await newRecord.save();
            if (!result) {
                return fail(res, "Error: Bad Request: Model not found");
            }
            return success(res, 201, result, "Record created successfully!");
        });
    } catch (err) {
        logger.error(`[400] [${getRequestIp(req)}] [${req.method}]
        [${safeGet(req.user, "email")}] - [${req.path}], [${module}], ${err.message}`);
        return fail(res, 400, `Error creating record. ${err.message}`);
    }
}
 */

// eslint-disable-next-line complexity
export async function loginService(loginPayload) {
    try {
        const { error } = schemaLogin.validate(loginPayload);
        if (error) throw new Error(`Invalid ${module} login data. ${error.message}`);
        if (!getLoginType(loginPayload)) throw new Error("Invlaid login parameters");
        const { email, phone, otp, password, type } = loginPayload;
        const filter = {};
        if (type === "PHONE" || type === "OTP") {
            filter.phone = phone;
        } else {
            filter.email = email;
        }
        const user = await Staff
            .findOne(filter)
            .populate({ path: "role", select: "name permissions", populate: { path: "permissions", select: "name action" } })
            .populate({ path: "office" })
            .populate({ path: "terminal", select: "name" })
            .populate({ path: "notifications", select: "message", match: { status: "UNREAD" } })
            .select("-createdBy -updatedBy")
            .exec();

        if (!user) {
            throw new Error("User not found.");
        }
        if (!(user.accessLevel > 1)) throw new Error("Insufficient Access Level");
        if (type === "OTP") {
            if (!user.otpAccess) {
                throw new Error(`Authentication failed. OTP Access is ${user.otpAccess}`);
            }
            if (!bcryptjs.compareSync(otp, user.otp.toString())) {
                throw new Error("Invalid OTP credentials.");
            }
        } else if (!bcryptjs.compareSync(password, user.password)) {
            throw new Error("Wrong password.");
        }

        const update = {
            otpAccess: false,
            currentLogin: Date.now(),
            currentIp: loginPayload.currentIp,
            lastLogin: user.currentLogin,
            lastIp: user.currentIp,
        };
        await Staff.findOneAndUpdate({ _id: user._id }, update, { new: true }).exec();
        // Delete private attributes
        user.password = null;
        user.otp = null;
        delete user.password;
        delete user.otp;
        const payload = {
            id: user.id,
            userType: "staff",
            terminal: user.terminal,
            subsidiary: user.subsidiary,
            role: user.role,
            accessLevel: user.accessLevel,
            email: user.email,
            phone: user.phone,
            time: new Date(),
        };

        const token = jwt.sign(payload, JWT.jwtSecret, {
            expiresIn: "240h", // JWT.tokenExpireTime,
        });
        return { token, user };
    } catch (err) {
        throw new Error(`Authentication failed: ${err.message}`);
    }
}

function remakeId(id) {
    return id.replace(id.substring(15, 18), "ac0");
}

export async function updateTerminalIdService() {
    try {
        const list = await Staff.find({}).exec();
        const resolvedArray = await Promise.all(list.map(async (data) => {
            if (data.subsidiary === "PMT") {
                console.log("\nOld Staff ===> ", data);
                data.terminal = remakeId(data.terminal.toString());
                console.log("\nNew Staff ===> ", data);
                const rec = await Staff.findOneAndUpdate({ _id: data.id }, data, { new: true });
                return rec;
            }
            return data;
        }));
    } catch (err) {
        throw new Error(`Error creating ${module} record. ${err.message}`);
    }
}
