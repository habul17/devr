const express = require("express");
const app = express();
const User = require("./models/user")
const connectDb = require("./config/database");

app.use(express.json());



app.post("/signup", async (req,res) => {
    

    const user = new User(req.body);

    try {
        await user.save();
        res.send("User Saved Successfully");
    } catch (err) {
        res.status(400).send("There is an error saving user" + err.message);
    }

})

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.find({ emailId: userEmail });
        res.send(user)
    } catch (err) {
        req.status(400).send("Something went wrong");
    }

})

app.get("/feed" , async (req,res) => {
    
    try {
        const users = await User.find({});
        if(!users) {
            res.status(400).send("Something went wrong")
        } else {
            res.send(users) ;
        }
    } catch (err) {
        req.status(400).send("Something went wrong")
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


