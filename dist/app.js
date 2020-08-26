"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

require("babel-polyfill");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _compression = _interopRequireDefault(require("compression"));

var _path = _interopRequireDefault(require("path"));

var _helmet = _interopRequireDefault(require("helmet"));

var _api = require("./api");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import routes
_dotenv["default"].config();

var app = (0, _express["default"])();
var hostname = "localhost"; // "127.0.0.1";

var port = process.env.PORT || 5000;

var defaultPath = _path["default"].join(__dirname, "/public");

app.use((0, _helmet["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true,
  limit: "50mb"
}));
app.use(_bodyParser["default"].json({
  limit: "50mb"
}));
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])());
app.use((0, _compression["default"])());
app.use(_express["default"]["static"](defaultPath));
app.set("trust proxy", true);

_config["default"].once("open", function () {
  console.log("Successfully connected to the database!");
});

_config["default"].on("close", function () {
  _config["default"].removeAllListeners();
});

app.get('/api', function (req, res) {
  res.json({
    success: true,
    payload: [],
    message: "Hello, from GoWorkR API"
  });
}); // listen for requests

var server = app.listen(port, hostname, function () {
  console.log("Server running at http://".concat(hostname, ":").concat(port, "/"));
});
setInterval(function () {
  return server.getConnections(function (err, connections) {
    return console.log("".concat(connections, " connections currently open"));
  });
}, 10000);
var connections = [];
server.on("connection", function (connection) {
  connections.push(connection);
  connection.on("close", function () {
    return connections = connections.filter(function (curr) {
      return curr !== connection;
    });
  });
});
var _default = app;
exports["default"] = _default;