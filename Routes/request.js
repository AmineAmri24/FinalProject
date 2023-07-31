const express = require("express");

const request = require("../Models/request");

const router = express.Router();


// get all requests

router.get('/allrequest', async(req,res)=>{
    try {
        const listRequests = await request.find();
        res.status(200).send ({msg : "all the requests", listRequests})
        
    } catch (error) {
        res.status(400).send({msg : "cannot show the requests", error});
    }
});

// get one Request 
router.get('/:id', async(req,res) =>{
    try {
        const requestToGet = await request.findOne({_id : req.params.id});
        res.status (200).send ({msg : "the request is...", requestToGet});
    
    } catch (error) {
        res.status (400).send ({msg: "cannot get request ", error})
    }
})


// add request 

router.post('/addrequest', async(req,res)=> {
    try {
        const {requestSubject, fullName, role, requestDetails} = req.body;
        const newRequest = new request({requestSubject, fullName, role, requestDetails});
        await newRequest.save();
        res.status(200).send ({msg:"request added successfully", newRequest})
    } catch (error) {
       res.status(400).send({msg: "request not added", error}) ;
    }
});


//delete request 


router.delete('/:_id', async (req,res)=>{
    try {
        const {_id} = req.params;
        await request.findOneAndDelete({_id});
        res.status(200).send ({msg: "the request is deleted!"})
    } catch (error){
        res.status(400).send({msg:"cannot delete request", error});
    }
});

// edit request

router.put('/:_id', async(req,res)=>{
    try {
        const {_id} = req.params;
        const result = await request.updateOne({_id}, {$set : {...req.body}});
        res.status(200).send ({msg:"the request is updated "})   
    } catch (error) {
       res.status(400).send({msg : "cannot update the request", error}) 
    }
})

module.exports = router ; 






