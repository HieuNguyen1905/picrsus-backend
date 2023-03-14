const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        } || {
            username: req.body.username
        }
    })
    if (user) {
        return res.status(409).json("User already exist!")
    }
    const newUser = await User.create(req.body)
    const token = jwt.sign(
        {
            username: newUser.username,
            id: newUser.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "6h",
        }
    );
    //separated password so it wont be included
    const { password, ...other } = newUser
    res.status(200).json({
        token,
        user: other,
      });
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if (!user) {
        res.status(403).json("Username not found")
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(403).json("Wrong username or password")
    } else {
        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, process.env.JWT_SECRET, {
            expiresIn: "6h"
        })
        const { password, ...other } = user
        if (typeof window !== 'undefined') {
            localStorage.setItem("token", data.token)
          }
        res.status(200).json({
            token,
            user: other,
          });
    }
})

module.exports = router;