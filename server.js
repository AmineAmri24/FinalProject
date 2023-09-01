const express = require("express");


const app = express();

app.use(express.json());

require("dotenv").config();


const connectDB = require("./config/connectDB");
connectDB();




app.use('/api/user',require('./Routes/user'))

app.use('/api/switch', require('./Routes/shifts'))

app.use('/api/request', require('./Routes/request'))

app.use('/api/admin', require('./Routes/admin'))

app.use((req,res) => {
    res.send("api is running")
})




const PORT = process.env.PORT || 7676


app.listen (PORT,(err) => {
    err ? console.log (err) : console.log (`this server is running on port ${PORT}`);
});