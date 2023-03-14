const express = require('express');
const router = express.Router();

const postRoutes = require("./post")
router.use("/api/post",postRoutes)

const userRoutes = require("./user")
router.use("/api/user",userRoutes)

const authRoutes = require("./auth")
router.use("/api/auth",authRoutes)

module.exports = router;