const mongoose = require("mongoose");

const connectDB= async() => {
    try {
        await mongoose.connect(process.env.BD_URI);
        console.log("DataBase connected...")
    } catch(error){
        console.log("cannot connect!", error);
    }
};

module.exports = connectDB;