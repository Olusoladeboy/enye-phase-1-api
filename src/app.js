import express from "express";
import "babel-polyfill";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import compression from "compression";
import path from "path";
import helmet from "helmet";

// import routes
import { user } from "./api";
import database from "./config";

dotenv.config();
const app = express();

const hostname = "localhost"; // "127.0.0.1";
const port = process.env.PORT || 5000;
const defaultPath = path.join(__dirname, "/public");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(express.static(defaultPath));
app.set("trust proxy", true);

database.once("open", () => {
    console.log("Successfully connected to the database!");
});

database.on("close", () => {
    database.removeAllListeners();
});

app.get('/api', (req, res) => {
    res.json({
        success: true,
        payload: [],
        message: "Hello, from GoWorkR API",
    })
})

// listen for requests
const server = app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

setInterval(() => server.getConnections((err, connections) => console.log(`${connections} connections currently open`)), 10000);

let connections = [];

server.on("connection", (connection) => {
    connections.push(connection);
    connection.on("close", () => connections = connections.filter(curr => curr !== connection));
});

export default app;
