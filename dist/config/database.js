"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _credentials = _interopRequireDefault(require("./credentials"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].Promise = global.Promise;
var uri = _credentials["default"].uri,
    options = _credentials["default"].options;

_mongoose["default"].connect(uri, options).then(function () {
  console.log("Connected to database!");
})["catch"](function (error) {
  console.error("Connection failed!");
  console.error(error.message);
  process.exit(1);
});

var database = _mongoose["default"].connection; // database.on("error", console.error.bind(console, "Database Connection Error:"));

var _default = database;
exports["default"] = _default;
//# sourceMappingURL=database.js.map