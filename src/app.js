const express = require("express");
const app = express();
const User = require("./models/user")
const connectDb = require("./config/database");

app.use(express.json());


// Signup or save the user to db

app.post("/signup", async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
        res.send("User Saved Successfully");
    } catch (err) {
        res.status(400).send("There is an error saving user" + err.message);
    }

})

// find user by email id

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.find({ emailId: userEmail });
        res.send(user)
    } catch (err) {
        req.status(400).send("Something went wrong");
    }

})

// feed - to get all the user in the db

app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});
        if (!users) {
            res.status(400).send("Something went wrong")
        } else {
            res.send(users);
        }
    } catch (err) {
        req.status(400).send("Something went wrong")
    }

})

// delete - delete the user from db from emailId

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const deleteUser = await User.findByIdAndDelete(userId);
        res.send("Deleted User");
    } catch (err) {
        res.status(400).send("Something Went Wrong")
    }
})

// update the user

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, data, { returnDocument: "after", runValidators: true });
        console.log(user);
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("UPDATE FAILED:" + err.message);
    }
})


// Connecting db and creating a server

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


