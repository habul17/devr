const express = require("express")

const app = express();

// use -> Accept all the request (GET, POST, DELETE, PATCH, etc..)
app.use("/user", (req,res,next) => {
    console.log("Inside Route Handler");
    // res.send("Route Handler 1");
    next();
},
(req,res) => {
    res.send("Route Handler 2");
}
)

//To specify a method you can specify it instead of use

app.listen(7777, () => {
    console.log("Server is Successfully running on the port 7777");
    
})