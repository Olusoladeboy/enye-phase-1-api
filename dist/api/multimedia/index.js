"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _category = _interopRequireDefault(require("./category"));

var _media = _interopRequireDefault(require("./media"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Routes
var router = _express["default"].Router(); // Use Routes


router.use(_category["default"]);
router.use(_media["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map