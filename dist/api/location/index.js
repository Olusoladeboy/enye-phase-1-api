"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _city = _interopRequireDefault(require("./city"));

var _county = _interopRequireDefault(require("./county"));

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Routes
var router = _express["default"].Router(); // Use Routes


router.use(_city["default"]);
router.use(_county["default"]);
router.use(_state["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map