const express = require("express");

const app = express();

require("dotenv").config();


const connectDB = require("./config/connectDB");
connectDB();

app.use(express.json());


app.use('/api/user',require('./Routes/user'))




const PORT = process.env.PORT;


app.listen (PORT,(err) => {
    err ? console.log (err) : console.log (`this server is running on port ${PORT}`);
});