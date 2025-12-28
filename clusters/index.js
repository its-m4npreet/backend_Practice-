const express = require("express");
const os = require("os");
const cluster = require("cluster");

const app = express();
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }   
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
    }
    );
} else {
    console.log(`Worker ${process.pid} started`);
}

app.get("/", (req, res) => {
    res.send(`Hello from cluster with ${numCPUs} CPUs!`);
});

app.listen(3000,()=>{
    console.log(`Server is running on http://localhost:3000`);
})