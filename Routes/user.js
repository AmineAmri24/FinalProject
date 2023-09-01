const express = require("express");

const {register, login} = require("../Controllers/user");
const { registerValidation, validation, loginValidation } = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");
const user = require("../Models/user");

const router = express.Router();


// get all users 

router.get('/getall', async(req,res)=>{
    try {
        const listUsers = await user.find();
        res.status(200).send ({msg : "all users", listUsers})
        
    } catch (error) {
        res.status(400).send({msg : "cannot show users", error});
    }
});



// register

router.post ('/register',registerValidation(), validation, register )



// login


router.post('/login', loginValidation(), validation, login)


// current user 

router.get('/current', isAuth,(req,res) => {
    res.send("you are authorized")
})

// delete user

router.delete('/:_id', async (req,res) => {
    try {
        const {_id} = req.params;
        await user.findOneAndDelete({_id});
        res.status (200).send ({msg : "the user is deleted .."})
    } catch (error){
        res.status (400).send ({msg : "cannot delete user", error});
    }
});



module.exports = router;

