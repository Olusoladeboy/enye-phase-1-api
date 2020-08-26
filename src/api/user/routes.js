import express from "express";
import { checkAuth, isValidStaff } from "../../../middleware/authorization";
import {
    fetchHandler,
    createHandler,
    updateHandler,
    deleteHandler,
    loginHandler,
    patchHandler,
    sendOTPHandler,
    updatePhotoHandler,
    updateApprovalHandler,
    updateEmploymentHandler,
// eslint-disable-next-line import/named
} from "./controller";

const router = express.Router();

/**
 * @api {get} /api/staff?id={recordId} Retrieve Staff records
 * @apiName RetrieveStaff
 * @apiGroup Staff
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/staff?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records of staff distributed across terminals.
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/staff", [checkAuth, isValidStaff], fetchHandler);

/**
 * @api {post} /api/staff Create a Staff record
 * @apiName CreateStaff
 * @apiGroup Staff
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} serial Staff serial (optional)
 * @apiParam {ObjectId} category Staff Category (optional)
 * @apiParam {String} title Staff title (optional)
 * @apiParam {String} surname Staff surname (required)
 * @apiParam {String} otherName Staff other name (required)
 * @apiParam {String} gender Staff gender (required)
 * @apiParam {Date} birthDate Staff birth date (required)
 * @apiParam {String} maritalStatus Staff marital status (required)
 * @apiParam {Number} children Staff Number of children (optional)
 * @apiParam {String} phone Staff office phone (required)
 * @apiParam {String} phoneHome Staff phone personal (optional)
 * @apiParam {String} emailPersonal Staff personal email Address (optional)
 * @apiParam {String} address Staff address (optional)
 * @apiParam {String} village Staff village (optional)
 * @apiParam {ObjectId} state Staff state (required)
 * @apiParam {ObjectId} county Staff county (required)
 * @apiParam {String} country Staff country (required)
 * @apiParam {String} email Staff email (optional)
 * @apiParam {String} password Staff password (optional)
 * @apiParam {String} otp Staff otp (optional)
 * @apiParam {Number} otpCount Staff otp count (optional)
 * @apiParam {Boolean} otpAccess Staff OTP Access Status
 * @apiParam {String} kin Staff kin (required)
 * @apiParam {String} kinPhone Staff kin phone (required)
 * @apiParam {String} kinAddress Staff kin address (required)
 * @apiParam {String} guarantor1 Staff guarantor1 (required)
 * @apiParam {String} guarantor1Phone Staff guarantor1 phone (required)
 * @apiParam {String} guarantor1Address Staff guarantor1 address (required)
 * @apiParam {String} guarantor2 Staff guarantor2 (optional)
 * @apiParam {String} guarantor2Phone Staff guarantor2 phone (optional)
 * @apiParam {String} guarantor2Address Staff guarantor2 address (optional)
 * @apiParam {String} profession Staff profession (optional)
 * @apiParam {String} qualification Staff qualification (optional)
 * @apiParam {String} institution Staff institution (optional)
 * @apiParam {String} employment Staff employment status (required)
 * @apiParam {String} tin Staff tin Tax Identification Number
 * @apiParam {Number} annualIncome Staff annualIncome is Gross Annual  Income
 * @apiParam {Number} basicSalary Staff basicSalary is basic net monthly salary
 * @apiParam {Number} bonus Staff bonus non-recurrent monthly bonus added to salary
 * @apiParam {Number} entertainmentAllowance Staff entertainment allowance (optional)
 * @apiParam {Number} houseAllowance Staff house allowance (optional)
 * @apiParam {Number} lunchAllowance Staff lunch allowance (optional)
 * @apiParam {Number} medicalAllowance Staff medical allowance (optional)
 * @apiParam {Number} transportAllowance Staff transport allowance (optional)
 * @apiParam {Number} utilityAllowance Staff utility allowance (optional)
 * @apiParam {Number} welfareAllowance Staff welfare allowance (optional)
 * @apiParam {Number} pension Staff pension To encourage pension contribution the
 *  Government allows employees to contribute more than 8% of your basic, housing,
 *  and transport as a pension contribution.
 *  By doing so, you get more tax reliefs, thus lower taxable income.
 * @apiParam {Number} assurance Staff Life Assurance premiums are those premiums you pay
 *  towards insuring an immediate family member in the event that you die.
 *  There is no limit to how much you can contribute and how much relief you can get from it.
 * @apiParam {ObjectId} bank Staff bank (optional)
 * @apiParam {String} bankAccountNumber Staff bank account number (optional)
 * @apiParam {String} bankAccountName Staff bank account name (optional)
 * @apiParam {String} rank Staff rank (optional)
 * @apiParam {ObjectId} office Staff office
 * @apiParam {ObjectId} role Staff role is an array of permissions the office demands
 * @apiParam {ObjectId} superior Staff superior id (required)
 * @apiParam {String} subsidiary Staff subsidiary (required)
 * @apiParam {ObjectId} terminal Staff terminal (required)
 * @apiParam {ObjectId} currentVehicle Staff currentVehicle (optional)
 * @apiParam {Array} assignments array of Objects of Asset Assigmnet History
 * managed my Asset Manager (prohibited)
 * @apiParam {Boolean} isAssignedVehicle Staff is assigned a vehicle
 * @apiParam {String} notice Staff notice (optional)
 * @apiParam {Array} ratings Staff ratings (optional)
 * @apiParam {Array} notifications Staff notifications
 * @apiParam {String} remark Staff remark (optional)
 * @apiParam {String} photo Staff photo (optional)
 * @apiParam {Boolean} isSalaryPayable Staff is salary payable (optional)
 * @apiParam {Boolean} isDocumentComplete Staff is document complete (optional)
 * @apiParam {Number} accessLevel Staff access level 0 - 9 Max. Zero implies No access (optional)
 * @apiParam {ObjectId} approvedBy Staff approved by (optional)
 * @apiParam {Date} approvedDate Staff approved date (optional)
 * @apiParam {Date} employedDate Staff employed date (optional)
 * @apiParam {ObjectId} employedBy Staff employed by (optional)
 * @apiParam {Date} parttimedDate Staff parttimed date (optional)
 * @apiParam {ObjectId} parttimedBy Staff parttimed by (optional)
 * @apiParam {Date} fulltimedDate Staff fulltimed date (optional)
 * @apiParam {ObjectId} fulltimedBy Staff fulltimed by (optional)
 * @apiParam {Date} leaveDate Staff leave date (optional)
 * @apiParam {ObjectId} leaveBy Staff leave by (optional)
 * @apiParam {Date} probatedDate Staff probated date (optional)
 * @apiParam {ObjectId} probatedBy Staff probated by (optional)
 * @apiParam {Date} suspendedDate Staff suspended date (optional)
 * @apiParam {ObjectId} suspendedBy Staff suspended by (optional)
 * @apiParam {Date} retiredDate Staff retired date (optional)
 * @apiParam {ObjectId} retiredBy Staff retired by (optional)
 * @apiParam {ObjectId} disengagedBy Staff disengaged by (optional)
 * @apiParam {Date} disengagedDate Staff disengaged date (optional)
 * @apiParam {String} employmentRemark Staff employment Remark (optional)
 * @apiParam {String} approvalRemark Staff approval Remark (optional)
 * @apiParam {String} status Staff employment approval status (optional)
 * @apiParam {Date} rejectedDate Staff employment rejected date (optional)
 * @apiParam {ObjectId} rejectedBy Staff employment rejected By (optional)
 * @apiParam {Date} lastLogin Staff lastLogin (optional)
 * @apiParam {Date} currentLogin Staff currentLogin (optional)
 * @apiParam {String} lastIp Staff lastIp (optional)
 * @apiParam {String} currentIp Staff currentIp (optional)
 * @apiParam {ObjectId} createdBy Staff record created by
 * @apiParam {ObjectId} updatedBy Staff record modified by
 * @apiSuccess {Object} Staff Staff's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Staff not found.
 * @apiError 401 master access only.
 */
router.post("/staff", [checkAuth, isValidStaff], createHandler);

/**
 * @api {put} /api/staff/{recordId} Update a Staff record
 * @apiName UpdateStaff
 * @apiGroup Staff
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} serial Staff serial (optional)
 * @apiParam {ObjectId} category Staff Category (optional)
 * @apiParam {String} title Staff title (optional)
 * @apiParam {String} surname Staff surname (required)
 * @apiParam {String} otherName Staff other name (required)
 * @apiParam {String} gender Staff gender (required)
 * @apiParam {Date} birthDate Staff birth date (required)
 * @apiParam {String} maritalStatus Staff marital status (required)
 * @apiParam {Number} children Staff Number of children (optional)
 * @apiParam {String} phone Staff office phone (required)
 * @apiParam {String} phoneHome Staff phone personal (optional)
 * @apiParam {String} emailPersonal Staff personal email Address (optional)
 * @apiParam {String} address Staff address (optional)
 * @apiParam {String} village Staff village (optional)
 * @apiParam {ObjectId} state Staff state (required)
 * @apiParam {ObjectId} county Staff county (required)
 * @apiParam {String} country Staff country (required)
 * @apiParam {String} email Staff email (optional)
 * @apiParam {String} password Staff password (optional)
 * @apiParam {String} otp Staff otp (optional)
 * @apiParam {Number} otpCount Staff otp count (optional)
 * @apiParam {Boolean} otpAccess Staff OTP Access Status
 * @apiParam {String} kin Staff kin (required)
 * @apiParam {String} kinPhone Staff kin phone (required)
 * @apiParam {String} kinAddress Staff kin address (required)
 * @apiParam {String} guarantor1 Staff guarantor1 (required)
 * @apiParam {String} guarantor1Phone Staff guarantor1 phone (required)
 * @apiParam {String} guarantor1Address Staff guarantor1 address (required)
 * @apiParam {String} guarantor2 Staff guarantor2 (optional)
 * @apiParam {String} guarantor2Phone Staff guarantor2 phone (optional)
 * @apiParam {String} guarantor2Address Staff guarantor2 address (optional)
 * @apiParam {String} profession Staff profession (optional)
 * @apiParam {String} qualification Staff qualification (optional)
 * @apiParam {String} institution Staff institution (optional)
 * @apiParam {String} employment Staff employment status (required)
 * @apiParam {String} tin Staff tin Tax Identification Number
 * @apiParam {Number} annualIncome Staff annualIncome is Gross Annual  Income
 * @apiParam {Number} basicSalary Staff basicSalary is basic net monthly salary
 * @apiParam {Number} bonus Staff bonus non-recurrent monthly bonus added to salary
 * @apiParam {Number} entertainmentAllowance Staff entertainment allowance (optional)
 * @apiParam {Number} houseAllowance Staff house allowance (optional)
 * @apiParam {Number} lunchAllowance Staff lunch allowance (optional)
 * @apiParam {Number} medicalAllowance Staff medical allowance (optional)
 * @apiParam {Number} transportAllowance Staff transport allowance (optional)
 * @apiParam {Number} utilityAllowance Staff utility allowance (optional)
 * @apiParam {Number} welfareAllowance Staff welfare allowance (optional)
 * @apiParam {Number} pension Staff pension To encourage pension contribution the
 *  Government allows employees to contribute more than 8% of your basic, housing,
 *  and transport as a pension contribution.
 *  By doing so, you get more tax reliefs, thus lower taxable income.
 * @apiParam {Number} assurance Staff Life Assurance premiums are those premiums you pay
 *  towards insuring an immediate family member in the event that you die.
 *  There is no limit to how much you can contribute and how much relief you can get from it.
 * @apiParam {ObjectId} bank Staff bank (optional)
 * @apiParam {String} bankAccountNumber Staff bank account number (optional)
 * @apiParam {String} bankAccountName Staff bank account name (optional)
 * @apiParam {String} rank Staff rank (optional)
 * @apiParam {ObjectId} office Staff office
 * @apiParam {ObjectId} role Staff role is an array of permissions the office demands
 * @apiParam {ObjectId} superior Staff superior id (required)
 * @apiParam {String} subsidiary Staff subsidiary (required)
 * @apiParam {ObjectId} terminal Staff terminal (required)
 * @apiParam {ObjectId} currentVehicle Staff currentVehicle (optional)
 * @apiParam {Array} assignments array of Objects of Asset Assigmnet History
 * managed my Asset Manager (prohibited)
 * @apiParam {Boolean} isAssignedVehicle Staff is assigned a vehicle
 * @apiParam {String} notice Staff notice (optional)
 * @apiParam {Array} ratings Staff ratings (optional)
 * @apiParam {Array} notifications Staff notifications
 * @apiParam {String} remark Staff remark (optional)
 * @apiParam {String} photo Staff photo (optional)
 * @apiParam {Boolean} isSalaryPayable Staff is salary payable (optional)
 * @apiParam {Boolean} isDocumentComplete Staff is document complete (optional)
 * @apiParam {Number} accessLevel Staff access level 0 - 9 Max. Zero implies No access (optional)
 * @apiParam {ObjectId} approvedBy Staff approved by (optional)
 * @apiParam {Date} approvedDate Staff approved date (optional)
 * @apiParam {Date} employedDate Staff employed date (optional)
 * @apiParam {ObjectId} employedBy Staff employed by (optional)
 * @apiParam {Date} parttimedDate Staff parttimed date (optional)
 * @apiParam {ObjectId} parttimedBy Staff parttimed by (optional)
 * @apiParam {Date} fulltimedDate Staff fulltimed date (optional)
 * @apiParam {ObjectId} fulltimedBy Staff fulltimed by (optional)
 * @apiParam {Date} leaveDate Staff leave date (optional)
 * @apiParam {ObjectId} leaveBy Staff leave by (optional)
 * @apiParam {Date} probatedDate Staff probated date (optional)
 * @apiParam {ObjectId} probatedBy Staff probated by (optional)
 * @apiParam {Date} suspendedDate Staff suspended date (optional)
 * @apiParam {ObjectId} suspendedBy Staff suspended by (optional)
 * @apiParam {Date} retiredDate Staff retired date (optional)
 * @apiParam {ObjectId} retiredBy Staff retired by (optional)
 * @apiParam {ObjectId} disengagedBy Staff disengaged by (optional)
 * @apiParam {Date} disengagedDate Staff disengaged date (optional)
 * @apiParam {String} employmentRemark Staff employment Remark (optional)
 * @apiParam {String} approvalRemark Staff approval Remark (optional)
 * @apiParam {String} status Staff employment approval status (optional)
 * @apiParam {Date} rejectedDate Staff employment rejected date (optional)
 * @apiParam {ObjectId} rejectedBy Staff employment rejected By (optional)
 * @apiParam {Date} lastLogin Staff lastLogin (optional)
 * @apiParam {Date} currentLogin Staff currentLogin (optional)
 * @apiParam {String} lastIp Staff lastIp (optional)
 * @apiParam {String} currentIp Staff currentIp (optional)
 * @apiParam {ObjectId} createdBy Staff record created by
 * @apiParam {ObjectId} updatedBy Staff record modified by
 * @apiSuccess {Object} Staff Staff's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Staff not found.
 * @apiError 401 master access only.
 */
router.put("/staff/:recordId", [checkAuth, isValidStaff], updateHandler);

/**
 * @api {patch} /api/staff/{recordId} Patch staff
 * @apiName PatchStaff
 * @apiGroup Staff
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Staff not found.
 * @apiError 401 master access only.
 */
router.patch("/staff/:recordId", [checkAuth, isValidStaff], patchHandler);

/**
 * @api {delete} /api/staff/{recordId} Delete a Staff record
 * @apiName DeleteStaff
 * @apiGroup Staff
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required staff ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Staff not found.
 * @apiError 401 master access only.
 */
router.delete("/staff/:recordId", [checkAuth, isValidStaff], deleteHandler);

/**
 * @api {post} /api/staff/login Login Staff
 * @apiName LoginStaff
 * @apiGroup Staff
 * @apiParam {String} recordId Staff Id (required)
 * @apiParam {String} email Staff email address (optional)
 * @apiParam {String} password Staff password (optional)
 * @apiParam {String} officePhone Staff official phone number (optional)
 * @apiParam {String} otp Staff One-Time-Password sent to phone (optional)
 * @apiParam {String} type Login type "EMAIL", "PHONE", "OTP" (required)
 * @apiSuccess (Success 200) 200 Login Successful.
 * @apiError 404 Staff not found.
 */
router.post("/staff/login", loginHandler);

/**
 * @api {post} /api/staff/otp ForgotPassword Staff
 * @apiName ForgotStaff
 * @apiGroup Staff
 * @apiParam {String} email Staff email address (required)
 * @apiParam {String} phone Staff official phone # (required)
 * @apiSuccess (Success 200) 200 Login Successful.
 * @apiError 404 Staff not found.
 */
router.post("/staff/otp", sendOTPHandler);

/**
 * @api {post} /api/staff/photo/{recordId} updatePhoto Staff
 * @apiName UpdatePhoto
 * @apiGroup Staff
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId Staff Id (required)
 * @apiParam {String} phone Staff official phone # (required)
 * @apiSuccess (Success 200) 200 Login Successful.
 * @apiError 404 Staff not found.
 */
router.post("/staff/photo/:recordId", updatePhotoHandler);

/**
 * @api {put} /api/staff/employment/{recordId}
 *  Update Staff employement status
 * @apiName UpdateStaffEmployment
 * @apiGroup Staff
 * @apiParam {String} recordId Staff record id (primaryKey)
 * @apiParam {Enum} employment Staff  EMPLOYED,FULLTIME,PARTTIME,LEAVE,
 *  PROBATED,SUSPENDED,RETIRED, DISENGAGED,UNKNOWN,
 * @apiParam {String} employmentRemark Staff employment status remark
 * @apiSuccess {Object} Staff record's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Staff not found.
 * @apiError 401 master access only.
 */
router.put("/staff/employment/:recordId", [checkAuth, isValidStaff], updateEmploymentHandler);

/**
 * @api {put} /api/staff/approval/{recordId}
 *  Update Staff approval status
 * @apiName UpdateStaffApproval
 * @apiGroup Staff
 * @apiParam {String} recordId Staff record id (primaryKey)
 * @apiParam {Enum} status Staff PENDING, APPROVED, REJECTED
 * @apiParam {String} approvalRemark Staff approval status remark
 * @apiSuccess {Object} Staff record's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Staff not found.
 * @apiError 401 master access only.
 */
router.put("/staff/approval/:recordId", [checkAuth, isValidStaff], updateApprovalHandler);

export default router;
