const express = require("express");

const shift = require("../Models/shiftSwitch");
const shiftSwitch = require("../Models/shiftSwitch");

const router = express.Router();


// get all shifts

router.get('/getallshift', async(req,res)=>{
    try {
        const listShifts = await shift.find();
        res.status(200).send ({msg : "all shifts switch", listShifts})
        
    } catch (error) {
        res.status(400).send({msg : "cannot show the shifts", error});
    }
});

// get one shift
router.get('/:id', async(req,res) =>{
    try {
        const shiftToGet = await shift.findOne({_id : req.params.id});
        res.status (200).send ({msg : "the shift is...", shiftToGet});
    
    } catch (error) {
        res.status (400).send ({msg: "cannot get the specific shift ", error})
    }
})


// add shift 

router.post('/addswitch', async(req,res)=> {
    try {
        const {Department, Identity, shift} = req.body;
        const newShift = new shiftSwitch({Department, Identity, shift});
        await newShift.save();
        res.status(200).send ({msg:"shift added successfully", newShift})
    } catch (error) {
       res.status(400).send({msg: "shift not added", error}) ;
    }
});


//delete request 


router.delete('/:_id', async (req,res)=>{
    try {
        const {_id} = req.params;
        await shift.findOneAndDelete({_id});
        res.status(200).send ({msg: "the shift is deleted!"})
    } catch (error){
        res.status(400).send({msg:"cannot delete shift", error});
    }
});

// edit request

router.put('/:_id', async(req,res)=>{
    try {
        const {_id} = req.params;
        const result = await shift.updateOne({_id}, {$set : {...req.body}});
        res.status(200).send ({msg:"the shift is updated "})   
    } catch (error) {
       res.status(400).send({msg : "cannot update the shift", error}) 
    }
})

module.exports = router ; 

