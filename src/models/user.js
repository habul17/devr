const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10,
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 10,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
    },
    about: {
        type: String,
        default: "This is a default Value",
        maxLength: 50,
    },
    skills: {
        type: [String],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);