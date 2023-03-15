const express = require('express');
const { Post, User } = require('../models');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    try {
        const data = await Post.findAll({
            where: {
                gallery: req.query.gallery
            }
        })
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})

router.get("/:id", async (req, res) => {
    const data = await Post.findByPk(req.params.id, { include: [User] })
    res.status(200).json(data)
})

router.post("/", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    console.log(token)
    if (!token) {
        return res
            .status(403)
            .json("you must be logged in to post");
    }
    try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        try{
            const data = Post.create({
                title:req.body.title,
                description:req.body.description,
                img:req.body.img,
                gallery:req.body.gallery,
                UserId:tokenData.id
            })
            res.json("Post has been created")
        }catch(err){
            return res.status(500).json(err)
        }
        
    }catch(err){
        return res.status(403).json( "invalid token" );
    }
})

router.delete("/:id", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(403)
            .json({ msg: "you must be logged in delete" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const foundPost = await Post.findByPk(req.params.id)

        if (!foundPost) {
            return res.status(404).json( "no such post!" );
        }
        if (foundPost.UserId !== tokenData.id) {
            return res
                .status(403)
                .json("you can only delete posts you created!" );
        }
        const data = await Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        res.json(data);
    } catch (err) {
        return res.status(403).json( "invalid token" );
    }
})

router.put("/:id", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(403)
            .json("you must be logged in to post");
    }
    try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        try{
            const data = Post.update({
                where:{
                    id:req.params.id,
                    UserId:tokenData.id
                }
            },{
                title:req.body.title,
                description:req.body.description,
                img:req.body.img,
                gallery:req.body.gallery,
            })
            res.json("Post has been updated")
        }catch(err){
            return res.status(500).json(err)
        }
        
    }catch(err){
        return res.status(403).json( "invalid token" );
    }
})

module.exports = router;