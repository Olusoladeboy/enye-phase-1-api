import express from "express";

const app = express()

const hostname = "localhost"; // "127.0.0.1";
const port = process.env.PORT || 5000;

app.get('', (req, res) => {
    res.json({
        api_status: "coming soon"
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