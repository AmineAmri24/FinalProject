const mongoose = require("mongoose");

const {Schema , model} = mongoose

const UserSchema = new Schema ({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required: true,
        unique: true, 
    },

    role : {
        type : String,
        required: true,
    },

    password : {
        type : String,
        required: true,
        // unique: true,
    },

    phone : {
        type : Number,
    },

    // type: { 
    //     type: String, 
    //     enum: ['user', 'admin'], 
    //     default: 'user' },
});

module.exports = User = model("user", UserSchema);