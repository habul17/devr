const mongoose = require('mongoose');


const connectDb = async () => {
    await mongoose.connect('mongodb+srv://AB:AQJtTU423bVf0GWY@cluster-0.yumyiew.mongodb.net/')
}

module.exports = connectDb;

