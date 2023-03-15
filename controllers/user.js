const express = require('express');
const router = express.Router();
const { User, Post } = require("../models");

router.get("/:id", async(req,res)=>{
    try{
    const data = await User.findByPk(req.params.id,{include:[Post]})
    res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;