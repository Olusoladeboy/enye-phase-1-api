import { fetchService, createService, updateService, patchService, deleteService, loginService, sendOTPService, updateApprovalService } from "./service";
import { success, fail, safeGet, log4js, getRequestIp } from "../../../util";
import { getToken } from "../../../middleware";
import { photoUpload } from "../../../services";

// Logging
const module = "User";

export async function fetchHandler(req, res) {
    try {
        const jwtToken = getToken(req);
        const result = await fetchService(req.query, jwtToken);
        return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`);
    } catch (err) {
        log(req, err);
        return fail(res, 400, err.message);
    }
}

export async function createHandler(req, res) {
    try {
        const jwtToken = getToken(req);
        const result = await createService(req.body, jwtToken);
        return success(res, 201, result, `${module} record(s) created successfully!`);
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error creating ${module} record. ${err.message}`);
    }
}

// eslint-disable-next-line complexity
export async function updateHandler(req, res) {
    try {
        const data = req.body;
        const { recordId } = req.params;
        const jwtToken = getToken(req);
        const result = await updateService(recordId, data, jwtToken);
        return success(res, 200, result, `${module} record updated successfully`);
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error updating ${module} record. ${err.message}`);
    }
}

export async function patchHandler(req, res) {
    try {
        const { recordId } = req.params;
        const jwtToken = getToken(req);
        const result = await patchService(recordId, req.body, jwtToken);
        return success(res, 200, result, `${module} record(s) patched successfully!`);
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error patching ${module} record. ${err.message}`);
    }
}

export async function deleteHandler(req, res) {
    try {
        const jwtToken = getToken(req);
        const result = await deleteService(req.params.recordId, jwtToken);
        return success(res, 200, result, `${module} record(s) deleted successfully!`);
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error patching ${module} record. ${err.message}`);
    }
}

export async function loginHandler(req, res) {
    try {
        // if (!req.body.currentIp) req.body.currentIp = getRequestIp(req);
        if (!req.body.type) req.body.type = getLoginType(req.body);
        const result = await loginService(req.body);
        return success(res, 201, result, "Login was successful!");
    } catch (err) {
        log(req, err);
        return fail(res, 403, `Error login ${module}. ${err.message}`);
    }
}

export async function sendOTPHandler(req, res) {
    try {
        const jwtToken = getToken(req);
        await sendOTPService(req.body, jwtToken);
        return success(res, 200, {}, "OTP sent successfully!");
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error sending ${module} record. ${err.message}`);
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

export async function updatePhotoHandler(req, res) {
    try {
        return photoUpload(req, res, async (err) => {
            const data = {};
            const { recordId } = req.params;
            data.updatedBy = req.user.id;
            const jwtToken = getToken(req);
            if (err || req.file === undefined) return fail(res, 422, `Error processing file. ${err.message}`);
            const fullPath = `upload/photo/${req.file.filename}`;
            data.photo = fullPath;
            const result = await updateService(recordId, data, jwtToken);
            if (!result) {
                return fail(res, 404, `${module} record not found.`);
            }
            return success(res, 200, result, `${result.length} ${module} record(s) retrieved successfully!`);
        });
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error creating ${module} record. ${err.message}`);
    }
}

// eslint-disable-next-line complexity
export async function updateApprovalHandler(req, res) {
    try {
        const data = req.body;
        const { recordId } = req.params;
        const jwtToken = getToken(req);
        const result = await updateApprovalService(recordId, data, jwtToken);
        return success(res, 200, result, `${module} record updated successfully`);
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error updating ${module} record. ${err.message}`);
    }
}

// eslint-disable-next-line complexity
export async function updateEmploymentHandler(req, res) {
    try {
        const data = req.body;
        const { recordId } = req.params;
        const jwtToken = getToken(req);
        const result = await updateApprovalService(recordId, data, jwtToken);
        return success(res, 200, result, `${module} employment record has been updated successfully!`);
    } catch (err) {
        log(req, err);
        return fail(res, 400, `Error updating ${module} record. ${err.message}`);
    }
}
