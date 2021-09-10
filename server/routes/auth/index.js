const router = require("express").Router();
const { User } = require("../../db/models");
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res, next) => {
    const { username, password, email } = req.body
    if (!username || !password || !email) {
        return res.status(400).json({ error: "Username, password and email are required" })
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" })
    }
})