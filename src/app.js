const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/admin")


// app.use(
//     "/user",
//     (req, res, next) => {
//         // res.send("Response");
//         next();
//     },
//     (req, res) => {
//         res.send("2nd response")
//         console.log("Response 2");
//     })

// Instead of giving it as a parameter you can also do it seperately

// app.use("/user", (req,res,next) => {
//     console.log("Response 1");
//     next();
// })
// app.use("/user", (req,res,next) => {
//     console.log("Response 2");
//     res.send("From Response 2")
// })


// How Express Works
//It will keep on checking api's and whatever api is matched it will send the response

// app.use("/", (req, res, next) => {
//     next()
// })

// app.get("/user", (req, res, next) => {
//     next()
// })
// app.get("/user", (req, res, next) => {
//     res.send("Response from last api");
// })

app.post("/admin/login", (req, res) => {
    res.send("Admin Logged in")
})

app.use("/admin", adminAuth);

app.use("/getUserData", (req,res) => {
    try {
        // if logic failed
        throw new error("befdsjfedskfdj") // mimicking a error
        res.send("user Data Send")
    } catch (err) {
        res.status(500).send("Something Went Wrong")
    }
})


app.use("/admin/getAllData", (req, res) => {
    res.send("Recieved All Data")
})

app.use("/admin/deleteData", (req, res) => {
    res.send("Deleted Data")
})

app.use("/user", (req, res) => {
    res.send("User data send");
})

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something Went Wrong")
    }
})

app.listen(7777, () => {
    console.log("Sever is running on port 7777");
});