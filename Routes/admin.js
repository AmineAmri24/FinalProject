const express = require("express");

// const admin = require("../Models/admin");

const { registerValidation, validation, loginValidation } = require("../middleware/validator");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const { registerAdmin, loginAdmin } = require("../Controllers/admin");




// register

router.post ('/registeradmin',registerValidation(), validation, registerAdmin )



// login


router.post('/loginadmin', loginValidation(), validation, loginAdmin)


// current user 

router.get('/currentadmin', isAuth,(req,res) => {
    res.send("you are authorized")
})



module.exports = router;