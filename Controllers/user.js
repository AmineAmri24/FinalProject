const user = require("../Models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    try {
        const {name, email, role,  password, phone} = req.body
        const foundUser= await user.findOne({email})
        if (foundUser) {
            return res.status(400).send({msg : "try with another email!"})
        }
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new user({...req.body})
        newUser.password = hashPassword;

        await newUser.save()

        const token = jwt.sign(
            {
                id: newUser._id
            },
            process.env.SECRET_KEY,
            {expiresIn : "1h"}
        )
        res.status(200).send ({msg : 'user registred successfully !', user: newUser, token})
    } catch (error) {
       res.status(400).send({msg : "cannot register the user!"}) 
    }
};


exports.login = async(req,res) => {
    try {
        const {email, password} = req.body;
        // checking email existance

        const foundUser = await user.findOne({email});
        if(!foundUser) {
            return res.status(400).send({error : [{msg : "bad credential!!"}]})
        }
        const checkPassword = await bcrypt.compare(password, foundUser.password);
        if (!checkPassword){
            return res.status(400).send({error: [{msg:"bad credential!!"}]});
        }
        const token = jwt.sign(
            {
                id: foundUser._id
            },
            process.env.SECRET_KEY,
            {expiresIn : "1h"}
        )
        res.status(200).send({msg:"login successfully", user : foundUser, token});
    } catch (error) {
        res.status(400).send({msg : "cannot login the user!"})  
    }
};