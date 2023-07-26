const mongoose = require("mongoose");

const {Schema, model} = mongoose

const RequestSchema = new Schema ({
    requestSubject : {
        type : String,   
    },
    fullName : {
        type : String,   
    },
    role : {
        type : String,  
    },

    requestDetails : {
        type : String,
        
    },

    
});

module.exports = request = model("request", RequestSchema);