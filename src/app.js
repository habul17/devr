const express = require("express"); // importing express

const app = express(); // creating an application / Server

// We should handle the incoming request
// for that we should create a request handlers

// app.use((req,res) => {
//     res.send("Hello from the server!"); // Whatever request came we response only tihs
// }) // Request handlers

// To handle routes
app.use("/test",(req,res) => {
    res.send("Hello from the server!"); // Whatever request came we response only tihs
}) // Request handlers


app.listen(3000, () => {
    console.log("Server is succeessfully listening on port 3000...");
    
}); // This listen the incoming request from the port 3000;


