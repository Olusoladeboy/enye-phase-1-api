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

var _model = _interopRequireDefault(require("./api/access/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable arrow-parens */

/* eslint-disable no-unused-vars */

/* eslint-disable no-use-before-define */

/* eslint-disable object-curly-newline */

/* eslint-disable no-console */
// import routes
_dotenv["default"].config();

var app = (0, _express["default"])();
var hostname = process.env.HOSTNAME || '0.0.0.0'; // "127.0.0.1";

var port = process.env.PORT;

var defaultPath = _path["default"].join(__dirname, '/public');

app.use((0, _helmet["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use((0, _morgan["default"])('dev'));
app.use((0, _cors["default"])());
app.use((0, _compression["default"])());
app.use(_express["default"]["static"](defaultPath));
app.set('trust proxy', true);

_config["default"].once('open', function () {
  console.log('Successfully connected to the database!');
});

_config["default"].on('close', function () {
  _config["default"].removeAllListeners();
});

app.get('/api', function (req, res) {
  res.json({
    success: true,
    payload: [],
    message: 'Hello, from GoWorkR API'
  });
});
app.use(function (req, res, next) {
  var agent = req.headers['user-agent'];
  var method = req.method;
  var baseUrl = req.originalUrl;
  var version = "HTTP/".concat(req.httpVersion);
  var status = res.statusCode; // const software = req.headers["user-agent"].match(/\((.+?)\)/)[1];

  var ipaddress = req.headers.origin; // getRequestIp(req);

  var allData = {
    ipaddress: ipaddress,
    agent: agent,
    method: method,
    baseUrl: baseUrl,
    version: version,
    status: status
  }; // console.log(allData);

  var newRecord = new _model["default"](allData);
  newRecord.save().then()["catch"](function (err) {
    return console.log(err.message);
  });
  next();
});
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
  next();
}); // Use Routes

app.use('/api', _api.taskRoutes);
app.use('/api', _api.userRoutes);
app.use('/api', _api.categoryRoutes);
app.use('/api', _api.locationRoutes);
app.use('/api', _api.multimediaRoutes);
app.use('/api', _api.reviewRoutes);
app.get('/api/*', function (req, res) {
  res.status(404);
  res.json({
    success: false,
    payload: null,
    message: "GOWORKR API SAYS: Endpoint not found for path: ".concat(req.path)
  });
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    success: false,
    payload: null,
    message: "GOWORKR API SAYS: ".concat(error.message, " for path: ").concat(req.path)
  });
  next();
}); // import { User } from "./api/user/model"
// console.log("User==>", User);
// listen for requests

var server = app.listen(process.env.PORT, hostname, function () {
  console.log("Server running at http://".concat(hostname, ":").concat(process.env.PORT, "/"));
});

app.sayHello = function (_) {
  return 'Hello GoWorkR!';
};

setInterval(function () {
  return server.getConnections(function (err, connections) {
    if (err) {
      console.log(err);
    }

    console.log("".concat(connections, " connections currently open"));
  });
}, 10000);
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.on('SIGQUIT', shutDown);
var connections = [];
server.on('connection', function (connection) {
  connections.push(connection); // eslint-disable-next-line no-return-assign

  connection.on('close', function () {
    return connections = connections.filter(function (curr) {
      return curr !== connection;
    });
  });
});

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    _config["default"].close(function () {
      console.log('Mongoose connection disconnected');
      process.exit(0);
    });

    console.log('Closed out remaining connections');
    process.exit(0);
  });
  setTimeout(function () {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
  connections.forEach(function (curr) {
    return curr.end();
  });
  setTimeout(function () {
    return connections.forEach(function (curr) {
      return curr.destroy();
    });
  }, 5000);
}

var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map