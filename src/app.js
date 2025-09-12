const express = require("express");
const app = express();
const User = require("./models/user")
const connectDb = require("./config/database");
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt")

app.use(express.json());


// Signup or save the user to db

app.post("/signup", async (req, res) => {

    try {

        //validating signup data 

        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        // hashing the password

        const passwordHash = await bcrypt.hash(password, 10);

        console.log(passwordHash);


        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });


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

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );

        if (!isUpdateAllowed) {
            throw new Error("Update Not Allowed")
        }

        if (data.skills && Array.isArray(data.skills) && data.skills.length > 5) {
            throw new Error("Skill cant be more tha 5")
        }
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


