const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('../Models/admin');






exports.registerAdmin = async(req, res) => {
    try {
        const { email, password} = req.body
        const foundAdmin= await admin.findOne({email})
        if (foundAdmin) {
            return res.status(400).send({msg : "try with another email!"})
        }
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const newAdmin = new admin({...req.body})
        newAdmin.password = hashPassword;

        await newAdmin.save()

        const token = jwt.sign(
            {
                id: newAdmin._id
            },
            process.env.SECRET_KEY,
            {expiresIn : "1h"}
        )
        res.status(200).send ({msg : 'admin registred successfully !', admin: newAdmin, token})
    } catch (error) {
       res.status(400).send({msg : "cannot register the admin!"}) 
    }
};


exports.loginAdmin = async(req,res) => {
    try {
        const {email, password} = req.body;
        // checking email existance

        const foundAdmin = await admin.findOne({email});
        if(!foundAdmin) {
            return res.status(400).send({error : [{msg : "bad credential!!"}]})
        }
        const checkPassword = await bcrypt.compare(password, foundAdmin.password);
        if (!checkPassword){
            return res.status(400).send({error: [{msg:"bad credential!!"}]});
        }
        const token = jwt.sign(
            {
                id: foundAdmin._id
            },
            process.env.SECRET_KEY,
            {expiresIn : "1h"}
        )
        res.status(200).send({msg:"login successfully", admin : foundAdmin, token});
    } catch (error) {
        res.status(400).send({msg : "cannot login the admin!"})  
    }
};