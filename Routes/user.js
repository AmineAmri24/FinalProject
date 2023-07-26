const express = require("express");

const {register, login} = require("../Controllers/user");
const { registerValidation, validation, loginValidation } = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");

const router = express.Router();




// register

router.post ('/register',registerValidation(), validation, register )



// login


router.post('/login', loginValidation(), validation, login)


// current user 

router.get('/current', isAuth,(req,res) => {
    res.send("you are authorized")
})



module.exports = router;

