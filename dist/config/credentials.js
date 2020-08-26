"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

var getCredentials = function getCredentials() {
  var development = {
    uri: process.env.MONGODB_URI_DEV,
    options: Object.assign(mongooseOptions, {})
  };
  var production = {
    uri: process.env.MONGODB_URI_PROD,
    options: Object.assign(mongooseOptions, {})
  };
  var test = {
    uri: process.env.MONGODB_URI_TEST,
    options: Object.assign(mongooseOptions, {
      poolSize: 10
    })
  };

  switch (process.env.NODE_ENV) {
    case "development":
      return development;

    case "production":
      return production;

    case "test":
      return test;

    default:
      return production;
  }
};

var credentials = getCredentials();
var _default = credentials;
exports["default"] = _default;