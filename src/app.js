const express = require("express");

const app = express();

const connectDb = require("./config/database");

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


