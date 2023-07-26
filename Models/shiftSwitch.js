const mongoose = require("mongoose");

const {Schema , model} = mongoose

const shiftSchema = new Schema ({
    Department : {
        type : String,
        required : true
    },
    Identity : {
        type : String,
        required: true,
        unique: true, 
    },

    shift : {
        type : String,
        required: true,
    },


    
});

module.exports = shift = model("shift", shiftSchema);