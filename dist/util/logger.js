"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _log4js = _interopRequireDefault(require("log4js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _log4js["default"].configure({
  appenders: {
    file: {
      type: "file",
      filename: "logs/error.log"
    }
  },
  categories: {
    "default": {
      appenders: ["file"],
      level: "DEBUG"
    }
  }
});

exports["default"] = _default;