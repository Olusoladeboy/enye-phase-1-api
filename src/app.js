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
import {
  rateRoutes } from './api';

dotenv.config();
const app = express();

const hostname = process.env.HOSTNAME || '0.0.0.0'; // "127.0.0.1";
const port = process.env.PORT;
const defaultPath = path.join(__dirname, '/public');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(express.static(defaultPath));
app.set('trust proxy', true);

app.get('/api', (req, res) => {
  res.json({
    success: true,
    payload: [],
    message: 'Hello, from Rates API',
  });
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
  next();
});

// Use Routes
app.use('/api', rateRoutes);

app.get('/api/*', (req, res) => {
  res.status(404);
  res.json({
    success: false,
    payload: null,
    message: `ENYE API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    payload: null,
    message: `ENYE API SAYS: ${error.message} for path: ${req.path}`,
  });
  next();
});

// import { User } from "./api/user/model"
// console.log("User==>", User);

// listen for requests
const server = app.listen(process.env.PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${process.env.PORT}/`);
});

app.sayHello = _ => 'Hello ENYE!';

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
