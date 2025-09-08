const express = require("express");

const app = express();

const User = require("./models/user")

const connectDb = require("./config/database");


app.post("/signup", async (req,res) => {
    const user = new User({
        firstName : "Abul",
        lastName : "Hassan",
        emailId : "abul@gmail.com",
        password : "abul@123",
    })

    try {
        await user.save();
        res.send("User Saved Successfully");
    } catch (err) {
        res.status(400).send("There is an error saving user" + err.message);
    }

})



connectDb()
    .then(() => {
        console.log("Database connected Successfully");
        app.listen(7777, () => {
            console.log("Sever is running on port 7777");
        });

    })
    .catch(() => {
        console.error("Database cannot be connected");
    })


