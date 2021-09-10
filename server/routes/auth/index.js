const router = require("express").Router();
const { User } = require("../../db/models");
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res, next) => {
    const { username, password, email } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, password and email are required" })
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" })
    }

    const registerData = {
        username: username,
        email: email,
        password: password
    }

    const registerUser = await User.create(registerData)
    if (!registerUser.id) {
        console.log({ error: `Sorry failed to create entry for ${registerUser.username}` })
        res.status(401).json({ error: `Sorry failed to create entry for ${registerUser.username}` })
    }

    return {
        status: true,
        message: `Success! ${registerUser.username} was successfully registered`,
        savedUserData: {
            id: registerUser.id,
            username: registerUser.username,
            email: registerUser.email,
        }
    }
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    const userData = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (!userData) {
        console.log({ error: `${username} was not found` })
        res.status(401).json({ error: `${username} was not found` })
    } else if (!userData.checkCorrectPassword(password, userData.password())) {
        console.log({ error: `Wrong username or password` })
        res.status(401).json({ error: `Wrong username or password` })
    } else {
        const token = jwt.sign(
            { id: userData.dataValues.id },
            process.env.SESSION_SECRET,
            { expiresIn: 86400 }
        );
        res.json({ ...userData, token })
    }
})