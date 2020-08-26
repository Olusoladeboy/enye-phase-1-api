import express from "express";
import { checkAuth, isValidUser } from "../../../middleware/authorization";
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
}
from "./controller";

const router = express.Router();

/**
 * @api {get} /api/user?id={recordId} Retrieve User records
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/user?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records of User distributed across terminals.
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/user", [checkAuth, isValidUser], fetchHandler);

/**
 * @api {post} /api/user Create a User record
 * @apiName CreateUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} serial User serial (optional)
 * @apiParam {ObjectId} category User Category (optional)
 * @apiParam {String} title User title (optional)
 * @apiParam {String} surname User surname (required)
 * @apiParam {String} otherName User other name (required)
 * @apiParam {String} gender User gender (required)
 * @apiParam {Date} birthDate User birth date (required)
 * @apiParam {String} maritalStatus User marital status (required)
 * @apiParam {Number} children User Number of children (optional)
 * @apiParam {String} phone User office phone (required)
 * @apiParam {String} phoneHome User phone personal (optional)
 * @apiParam {String} emailPersonal User personal email Address (optional)
 * @apiParam {String} address User address (optional)
 * @apiParam {String} village User village (optional)
 * @apiParam {ObjectId} state User state (required)
 * @apiParam {ObjectId} county User county (required)
 * @apiParam {String} country User country (required)
 * @apiParam {String} email User email (optional)
 * @apiParam {String} password User password (optional)
 * @apiParam {String} otp User otp (optional)
 * @apiParam {Number} otpCount User otp count (optional)
 * @apiParam {Boolean} otpAccess User OTP Access Status
 * @apiParam {String} kin User kin (required)
 * @apiParam {String} kinPhone User kin phone (required)
 * @apiParam {String} kinAddress User kin address (required)
 * @apiParam {String} guarantor1 User guarantor1 (required)
 * @apiParam {String} guarantor1Phone User guarantor1 phone (required)
 * @apiParam {String} guarantor1Address User guarantor1 address (required)
 * @apiParam {String} guarantor2 User guarantor2 (optional)
 * @apiParam {String} guarantor2Phone User guarantor2 phone (optional)
 * @apiParam {String} guarantor2Address User guarantor2 address (optional)
 * @apiParam {String} profession User profession (optional)
 * @apiParam {String} qualification User qualification (optional)
 * @apiParam {String} institution User institution (optional)
 * @apiParam {String} employment User employment status (required)
 * @apiParam {String} tin User tin Tax Identification Number
 * @apiParam {Number} annualIncome User annualIncome is Gross Annual  Income
 * @apiParam {Number} basicSalary User basicSalary is basic net monthly salary
 * @apiParam {Number} bonus User bonus non-recurrent monthly bonus added to salary
 * @apiParam {Number} entertainmentAllowance User entertainment allowance (optional)
 * @apiParam {Number} houseAllowance User house allowance (optional)
 * @apiParam {Number} lunchAllowance User lunch allowance (optional)
 * @apiParam {Number} medicalAllowance User medical allowance (optional)
 * @apiParam {Number} transportAllowance User transport allowance (optional)
 * @apiParam {Number} utilityAllowance User utility allowance (optional)
 * @apiParam {Number} welfareAllowance User welfare allowance (optional)
 * @apiParam {Number} pension User pension To encourage pension contribution the
 *  Government allows employees to contribute more than 8% of your basic, housing,
 *  and transport as a pension contribution.
 *  By doing so, you get more tax reliefs, thus lower taxable income.
 * @apiParam {Number} assurance User Life Assurance premiums are those premiums you pay
 *  towards insuring an immediate family member in the event that you die.
 *  There is no limit to how much you can contribute and how much relief you can get from it.
 * @apiParam {ObjectId} bank User bank (optional)
 * @apiParam {String} bankAccountNumber User bank account number (optional)
 * @apiParam {String} bankAccountName User bank account name (optional)
 * @apiParam {String} rank User rank (optional)
 * @apiParam {ObjectId} office User office
 * @apiParam {ObjectId} role User role is an array of permissions the office demands
 * @apiParam {ObjectId} superior User superior id (required)
 * @apiParam {String} subsidiary User subsidiary (required)
 * @apiParam {ObjectId} terminal User terminal (required)
 * @apiParam {ObjectId} currentVehicle User currentVehicle (optional)
 * @apiParam {Array} assignments array of Objects of Asset Assigmnet History
 * managed my Asset Manager (prohibited)
 * @apiParam {Boolean} isAssignedVehicle User is assigned a vehicle
 * @apiParam {String} notice User notice (optional)
 * @apiParam {Array} ratings User ratings (optional)
 * @apiParam {Array} notifications User notifications
 * @apiParam {String} remark User remark (optional)
 * @apiParam {String} photo User photo (optional)
 * @apiParam {Boolean} isSalaryPayable User is salary payable (optional)
 * @apiParam {Boolean} isDocumentComplete User is document complete (optional)
 * @apiParam {Number} accessLevel User access level 0 - 9 Max. Zero implies No access (optional)
 * @apiParam {ObjectId} approvedBy User approved by (optional)
 * @apiParam {Date} approvedDate User approved date (optional)
 * @apiParam {Date} employedDate User employed date (optional)
 * @apiParam {ObjectId} employedBy User employed by (optional)
 * @apiParam {Date} parttimedDate User parttimed date (optional)
 * @apiParam {ObjectId} parttimedBy User parttimed by (optional)
 * @apiParam {Date} fulltimedDate User fulltimed date (optional)
 * @apiParam {ObjectId} fulltimedBy User fulltimed by (optional)
 * @apiParam {Date} leaveDate User leave date (optional)
 * @apiParam {ObjectId} leaveBy User leave by (optional)
 * @apiParam {Date} probatedDate User probated date (optional)
 * @apiParam {ObjectId} probatedBy User probated by (optional)
 * @apiParam {Date} suspendedDate User suspended date (optional)
 * @apiParam {ObjectId} suspendedBy User suspended by (optional)
 * @apiParam {Date} retiredDate User retired date (optional)
 * @apiParam {ObjectId} retiredBy User retired by (optional)
 * @apiParam {ObjectId} disengagedBy User disengaged by (optional)
 * @apiParam {Date} disengagedDate User disengaged date (optional)
 * @apiParam {String} employmentRemark User employment Remark (optional)
 * @apiParam {String} approvalRemark User approval Remark (optional)
 * @apiParam {String} status User employment approval status (optional)
 * @apiParam {Date} rejectedDate User employment rejected date (optional)
 * @apiParam {ObjectId} rejectedBy User employment rejected By (optional)
 * @apiParam {Date} lastLogin User lastLogin (optional)
 * @apiParam {Date} currentLogin User currentLogin (optional)
 * @apiParam {String} lastIp User lastIp (optional)
 * @apiParam {String} currentIp User currentIp (optional)
 * @apiParam {ObjectId} createdBy User record created by
 * @apiParam {ObjectId} updatedBy User record modified by
 * @apiSuccess {Object} User User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.post("/user", [checkAuth, isValidUser], createHandler);

/**
 * @api {put} /api/user/{recordId} Update a User record
 * @apiName UpdateUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} serial User serial (optional)
 * @apiParam {ObjectId} category User Category (optional)
 * @apiParam {String} title User title (optional)
 * @apiParam {String} surname User surname (required)
 * @apiParam {String} otherName User other name (required)
 * @apiParam {String} gender User gender (required)
 * @apiParam {Date} birthDate User birth date (required)
 * @apiParam {String} maritalStatus User marital status (required)
 * @apiParam {Number} children User Number of children (optional)
 * @apiParam {String} phone User office phone (required)
 * @apiParam {String} phoneHome User phone personal (optional)
 * @apiParam {String} emailPersonal User personal email Address (optional)
 * @apiParam {String} address User address (optional)
 * @apiParam {String} village User village (optional)
 * @apiParam {ObjectId} state User state (required)
 * @apiParam {ObjectId} county User county (required)
 * @apiParam {String} country User country (required)
 * @apiParam {String} email User email (optional)
 * @apiParam {String} password User password (optional)
 * @apiParam {String} otp User otp (optional)
 * @apiParam {Number} otpCount User otp count (optional)
 * @apiParam {Boolean} otpAccess User OTP Access Status
 * @apiParam {String} kin User kin (required)
 * @apiParam {String} kinPhone User kin phone (required)
 * @apiParam {String} kinAddress User kin address (required)
 * @apiParam {String} guarantor1 User guarantor1 (required)
 * @apiParam {String} guarantor1Phone User guarantor1 phone (required)
 * @apiParam {String} guarantor1Address User guarantor1 address (required)
 * @apiParam {String} guarantor2 User guarantor2 (optional)
 * @apiParam {String} guarantor2Phone User guarantor2 phone (optional)
 * @apiParam {String} guarantor2Address User guarantor2 address (optional)
 * @apiParam {String} profession User profession (optional)
 * @apiParam {String} qualification User qualification (optional)
 * @apiParam {String} institution User institution (optional)
 * @apiParam {String} employment User employment status (required)
 * @apiParam {String} tin User tin Tax Identification Number
 * @apiParam {Number} annualIncome User annualIncome is Gross Annual  Income
 * @apiParam {Number} basicSalary User basicSalary is basic net monthly salary
 * @apiParam {Number} bonus User bonus non-recurrent monthly bonus added to salary
 * @apiParam {Number} entertainmentAllowance User entertainment allowance (optional)
 * @apiParam {Number} houseAllowance User house allowance (optional)
 * @apiParam {Number} lunchAllowance User lunch allowance (optional)
 * @apiParam {Number} medicalAllowance User medical allowance (optional)
 * @apiParam {Number} transportAllowance User transport allowance (optional)
 * @apiParam {Number} utilityAllowance User utility allowance (optional)
 * @apiParam {Number} welfareAllowance User welfare allowance (optional)
 * @apiParam {Number} pension User pension To encourage pension contribution the
 *  Government allows employees to contribute more than 8% of your basic, housing,
 *  and transport as a pension contribution.
 *  By doing so, you get more tax reliefs, thus lower taxable income.
 * @apiParam {Number} assurance User Life Assurance premiums are those premiums you pay
 *  towards insuring an immediate family member in the event that you die.
 *  There is no limit to how much you can contribute and how much relief you can get from it.
 * @apiParam {ObjectId} bank User bank (optional)
 * @apiParam {String} bankAccountNumber User bank account number (optional)
 * @apiParam {String} bankAccountName User bank account name (optional)
 * @apiParam {String} rank User rank (optional)
 * @apiParam {ObjectId} office User office
 * @apiParam {ObjectId} role User role is an array of permissions the office demands
 * @apiParam {ObjectId} superior User superior id (required)
 * @apiParam {String} subsidiary User subsidiary (required)
 * @apiParam {ObjectId} terminal User terminal (required)
 * @apiParam {ObjectId} currentVehicle User currentVehicle (optional)
 * @apiParam {Array} assignments array of Objects of Asset Assigmnet History
 * managed my Asset Manager (prohibited)
 * @apiParam {Boolean} isAssignedVehicle User is assigned a vehicle
 * @apiParam {String} notice User notice (optional)
 * @apiParam {Array} ratings User ratings (optional)
 * @apiParam {Array} notifications User notifications
 * @apiParam {String} remark User remark (optional)
 * @apiParam {String} photo User photo (optional)
 * @apiParam {Boolean} isSalaryPayable User is salary payable (optional)
 * @apiParam {Boolean} isDocumentComplete User is document complete (optional)
 * @apiParam {Number} accessLevel User access level 0 - 9 Max. Zero implies No access (optional)
 * @apiParam {ObjectId} approvedBy User approved by (optional)
 * @apiParam {Date} approvedDate User approved date (optional)
 * @apiParam {Date} employedDate User employed date (optional)
 * @apiParam {ObjectId} employedBy User employed by (optional)
 * @apiParam {Date} parttimedDate User parttimed date (optional)
 * @apiParam {ObjectId} parttimedBy User parttimed by (optional)
 * @apiParam {Date} fulltimedDate User fulltimed date (optional)
 * @apiParam {ObjectId} fulltimedBy User fulltimed by (optional)
 * @apiParam {Date} leaveDate User leave date (optional)
 * @apiParam {ObjectId} leaveBy User leave by (optional)
 * @apiParam {Date} probatedDate User probated date (optional)
 * @apiParam {ObjectId} probatedBy User probated by (optional)
 * @apiParam {Date} suspendedDate User suspended date (optional)
 * @apiParam {ObjectId} suspendedBy User suspended by (optional)
 * @apiParam {Date} retiredDate User retired date (optional)
 * @apiParam {ObjectId} retiredBy User retired by (optional)
 * @apiParam {ObjectId} disengagedBy User disengaged by (optional)
 * @apiParam {Date} disengagedDate User disengaged date (optional)
 * @apiParam {String} employmentRemark User employment Remark (optional)
 * @apiParam {String} approvalRemark User approval Remark (optional)
 * @apiParam {String} status User employment approval status (optional)
 * @apiParam {Date} rejectedDate User employment rejected date (optional)
 * @apiParam {ObjectId} rejectedBy User employment rejected By (optional)
 * @apiParam {Date} lastLogin User lastLogin (optional)
 * @apiParam {Date} currentLogin User currentLogin (optional)
 * @apiParam {String} lastIp User lastIp (optional)
 * @apiParam {String} currentIp User currentIp (optional)
 * @apiParam {ObjectId} createdBy User record created by
 * @apiParam {ObjectId} updatedBy User record modified by
 * @apiSuccess {Object} User User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.put("/user/:recordId", [checkAuth, isValidUser], updateHandler);

/**
 * @api {patch} /api/user/{recordId} Patch User
 * @apiName PatchUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.patch("/user/:recordId", [checkAuth, isValidUser], patchHandler);

/**
 * @api {delete} /api/user/{recordId} Delete a User record
 * @apiName DeleteUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required User ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.delete("/user/:recordId", [checkAuth, isValidUser], deleteHandler);

/**
 * @api {post} /api/user/login Login User
 * @apiName LoginUser
 * @apiGroup User
 * @apiParam {String} recordId User Id (required)
 * @apiParam {String} email User email address (optional)
 * @apiParam {String} password User password (optional)
 * @apiParam {String} officePhone User official phone number (optional)
 * @apiParam {String} otp User One-Time-Password sent to phone (optional)
 * @apiParam {String} type Login type "EMAIL", "PHONE", "OTP" (required)
 * @apiSuccess (Success 200) 200 Login Successful.
 * @apiError 404 User not found.
 */
router.post("/user/login", loginHandler);

/**
 * @api {post} /api/user/otp ForgotPassword User
 * @apiName ForgotUser
 * @apiGroup User
 * @apiParam {String} email User email address (required)
 * @apiParam {String} phone User official phone # (required)
 * @apiSuccess (Success 200) 200 Login Successful.
 * @apiError 404 User not found.
 */
router.post("/user/otp", sendOTPHandler);

/**
 * @api {post} /api/user/photo/{recordId} updatePhoto User
 * @apiName UpdatePhoto
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId User Id (required)
 * @apiParam {String} phone User official phone # (required)
 * @apiSuccess (Success 200) 200 Login Successful.
 * @apiError 404 User not found.
 */
router.post("/user/photo/:recordId", updatePhotoHandler);

/**
 * @api {put} /api/user/employment/{recordId}
 *  Update User employement status
 * @apiName UpdateUserEmployment
 * @apiGroup User
 * @apiParam {String} recordId User record id (primaryKey)
 * @apiParam {Enum} employment User  EMPLOYED,FULLTIME,PARTTIME,LEAVE,
 *  PROBATED,SUSPENDED,RETIRED, DISENGAGED,UNKNOWN,
 * @apiParam {String} employmentRemark User employment status remark
 * @apiSuccess {Object} User record's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.put("/user/employment/:recordId", [checkAuth, isValidUser], updateEmploymentHandler);

/**
 * @api {put} /api/user/approval/{recordId}
 *  Update User approval status
 * @apiName UpdateUserApproval
 * @apiGroup User
 * @apiParam {String} recordId User record id (primaryKey)
 * @apiParam {Enum} status User PENDING, APPROVED, REJECTED
 * @apiParam {String} approvalRemark User approval status remark
 * @apiSuccess {Object} User record's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.put("/user/approval/:recordId", [checkAuth, isValidUser], updateApprovalHandler);

export default router;
