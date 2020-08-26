"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATABASE = exports.MARITAL_STATUS = exports.GENDER = exports.JWT = void 0;
var JWT = {
  saltRounds: 7,
  //GOWORKR
  jwtSecret: "yo, it's a go fucking work -r hidden fucking secret|| Why you wanna know this shit!!!! Fuck You If You Ever Get Here",
  //BITCH
  tokenExpireTime: "1h" // The approximate time a login token would expire ====//

};
exports.JWT = JWT;
var GENDER = {
  MALE: "MALE",
  FEMALE: "FEMALE"
};
exports.GENDER = GENDER;
var MARITAL_STATUS = {
  SINGLE: "SINGLE",
  MARRIED: "MARRIED",
  DIVORSED: "DIVORSED",
  SEPARATED: "SEPARATED",
  WIDOWED: "WIDOWED",
  UNKNOWN: "UNKNOWN"
};
exports.MARITAL_STATUS = MARITAL_STATUS;
var DATABASE = {
  TABLES: ["STAFF", "PARTNER", "OWNER", "VEHICLE", "ASSET"],
  PRELOAD_TABLE_DATA: {
    TRUE: true,
    FALSE: false,
    DEFAULT: false
  },
  RECORD_STATUS: {
    PENDING: "PENDING",
    REJECTED: "REJECTED",
    ACKNOWLEDGED: "ACKNOWLEDGED",
    APPROVED: "APPROVED",
    AUTHORIZED: "AUTHORIZED",
    AUDITED: "AUDITED",
    CLOSED: "CLOSED"
  },
  BASE_ID: {
    TABLE: "5a51bc91860d8b5aa",
    STAFF: "5a51bc91860d8b5ba",
    PARTNER: "5b51bc91860d8b5bb",
    SUPPLIER: "5b52bc92860d8b5bb",
    TERMINAL: "5c51bc91860d8b5bc",
    VEHICLE: "5d51bc91860d8b5bd",
    SPARES: "5e51bc91860d8b5be",
    ASSET: "5f51bc91860d8b5bf",
    COUNTRY: "5951bc91860d8b5b9",
    HUB: "5951bc91860d8b5c9",
    STATE: "5851bc91860d8b5a7",
    COUNTY: "5851bc91860d8b5b7",
    CITY: "5851bc91860d8b5c7",
    OFFICE: "5651bc91860d8b5b6",
    ROLE: "5751bc91860d8b5b6",
    ACCOUNT: "5851bc91860d8b5b6",
    BANK: "5951bc91860d8b5b6",
    BANK_ACCOUNT: "5651bc91860d8b5ba",
    CUSTOMER: "5a51bc91860d8b5a5",
    PMT_SCHEDULE: "5451bc91860d8b545",
    PMT_ROUTE: "5351bc91860d8b535",
    SETTING: "5051bc91860d8b505",
    PML_BILLING: "5651bd91860d8b5bd",
    OFFENCE: "5651bc91860d8b5bc",
    DOCUMENT: "5651bb91860d8b5bb",
    ACCIDENT_CAUSE: "5651ab91860d8b5ab",
    VOUCHER_STAGE: "565bab91860d8b5bb"
  },
  OPTIONS: {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    },
    autoIndex: true,
    minimize: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
      // eslint-disable-next-line object-shorthand
      transform: function transform(doc, ret) {
        ret.id = ret._id; // ret.createdAt = ret.created_at;
        // ret.updatedAt = ret.updated_at;

        delete ret._id;
        delete ret.updated_at;
        delete ret.created_at;
        delete ret.__v;
      }
    },
    toObject: {
      virtuals: true
    }
  }
};
exports.DATABASE = DATABASE;