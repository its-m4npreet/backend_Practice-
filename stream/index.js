const express = require("express");
const fs = require("fs");
const statusMonitor = require("express-status-monitor");
// const Stream = require("node:stream");

const app = express();

// Correct status monitor usage
app.use(statusMonitor());

app.use(express.json());

// Example: return JSON from file on root route
app.get("/", (req, res) => {
   const readStream = fs.createReadStream("data.json", "utf8");
   readStream.pipe(res);
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
    console.log(`Status dashboard: http://localhost:3000/status`);
});