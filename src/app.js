/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
import express from 'express';
import 'babel-polyfill';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import compression from 'compression';
import path from 'path';
import helmet from 'helmet';

// import routes
import { userRoutes, locationRoutes, multimediaRoutes } from './api';
import database from './config';

import Access from './api/access/model';

dotenv.config();
const app = express();

const hostname = 'localhost'; // "127.0.0.1";
const port = process.env.PORT || 5000;
const defaultPath = path.join(__dirname, '/public');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(express.static(defaultPath));
app.set('trust proxy', true);

database.once('open', () => {
  console.log('Successfully connected to the database!');
});

database.on('close', () => {
  database.removeAllListeners();
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    payload: [],
    message: 'Hello, from GoWorkR API',
  });
});

app.use((req, res, next) => {
  const agent = req.headers['user-agent'];
  const { method } = req;
  const baseUrl = req.originalUrl;
  const version = `HTTP/${req.httpVersion}`;
  const status = res.statusCode;
  // const software = req.headers["user-agent"].match(/\((.+?)\)/)[1];
  const ipaddress = req.headers.origin;
  // getRequestIp(req);
  const allData = { ipaddress, agent, method, baseUrl, version, status };
  // console.log(allData);
  const newRecord = new Access(allData);
  newRecord.save().then().catch((err) => console.log(err.message));
  next();
});

// Use Routes
app.use('/api', userRoutes);
app.use('/api', locationRoutes);
app.use('/api', multimediaRoutes);

app.get('/api/*', (req, res) => {
  res.status(404);
  res.json({
    success: false,
    payload: null,
    message: `GOWORKR API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    payload: null,
    message: `GOWORKR API SAYS: ${error.message} for path: ${req.path}`,
  });
  next();
});

// import { User } from "./api/user/model"
// console.log("User==>", User);

// listen for requests
const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.sayHello = _ => 'Hello GoWorkR!';

setInterval(() => server.getConnections((err, connections) => {
  if (err) {
    console.log(err);
  }
  console.log(`${connections} connections currently open`);
}), 10000);

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.on('SIGQUIT', shutDown);

let connections = [];

server.on('connection', (connection) => {
  connections.push(connection);
  // eslint-disable-next-line no-return-assign
  connection.on('close', () => connections = connections.filter((curr) => curr !== connection));
});

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    database.close(() => {
      console.log('Mongoose connection disconnected');
      process.exit(0);
    });
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach((curr) => curr.end());
  setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
}

export default app;
