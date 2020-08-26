"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var hostname = "localhost"; // "127.0.0.1";

var port = process.env.PORT || 5000;
app.get('', function (req, res) {
  res.json({
    api_status: "coming soon"
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