/**
 * @author 4Dcoder
 * @property {String} ipaddress Access IP address
 * @property {String} software Access software
 * @property {String} agent Access agent description
 * @property {String} method Access GET|POST|PUT|OPTLETE
 * @property {String} baseUrl Access base Url
 * @property {String} version Access version
 * @property {String} status Access status
 * @description Access model holds api access
 */
import mongoose from "mongoose";
// eslint-disable-next-line camelcase
import mongoose_csv from "mongoose-csv";
import { DATABASE } from "../../../constants";
// eslint-disable-next-line import/no-cycle

const { Schema } = mongoose;

// const allData = { ipaddress, software, agent, method, baseUrl, version, status };
export const schema = {
    ipaddress: { type: String, trim: true, index: true },
    software: { type: String, trim: true },
    agent: { type: String, trim: true },
    method: { type: String, trim: true },
    baseUrl: { type: String, trim: true },
    version: { type: String, trim: true },
    status: { type: String, trim: true },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "access");

const Access = mongoose.model("Access", newSchema);

export default Access;
