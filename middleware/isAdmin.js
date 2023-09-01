const jwt= require('jsonwebtoken');
const admin = require('../Models/admin');

const isAuthAdmin = async(req, res, next) => {
    try {

        const token = req.headers["authorization"]

        if (!token){
            return res.status(401).send({error: [{msg : "not authorized"}]})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const foundAdmin = await admin.findOne({_id : decoded.id})
        if(!foundAdmin){
            return res.status(401).send({error: [{msg : "not authorized"}]})
        }
        req.admin = foundAdmin;
        next();
        
    } catch (error) {
        return res.status(401).send({error: [{msg : "not authorized"}]})
    }
}

module.exports = isAuthAdmin;

// const user = require("../Models/user")


// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.type === 'admin') {
//       next();
//     } else {
//       return res.status(403).json({ message: 'Forbidden - Admin access required.' });
//     }
//   };
  
//   module.exports = isAdmin;