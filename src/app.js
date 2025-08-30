const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")


app.post('/signup', async (req, res) => {
    const user = new User({
        firstName: "subasni",
        lastName: "G",
        emailId: "subasni@G.com",
        password: "subasni@123",
    });


    try {
        await user.save();
        res.send("User Added Successfully")
    } catch (err) {
        res.status(400).send("Error saving the user : " + err.message)
    }

});



connectDB().then(() => {
    console.log('Database Connection established');
    app.listen(7777, () => {
        console.log("Server is Successfully running on the port 7777");

    })

}).catch((err) => console.error("Database cannot be connected"))

